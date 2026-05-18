import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import EmployeeCard from '../components/EmployeeCard';
import AIRecommendationModal from '../components/AIRecommendationModal';
import { Search, Filter, TrendingUp, Users, Star, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDept, setFilterDept] = useState('');

    // AI Modal
    const [isAIModalOpen, setIsAIModalOpen] = useState(false);
    const [aiRecommendation, setAiRecommendation] = useState('');
    const [aiLoading, setAiLoading] = useState(false);

    // Edit Modal (simplified for scope)
    const [editEmployee, setEditEmployee] = useState(null);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            
            let url = 'http://localhost:5000/api/employees';
            if (filterDept) {
                url = `http://localhost:5000/api/employees/search?department=${filterDept}`;
            }
            
            const res = await axios.get(url, config);
            setEmployees(res.data);
        } catch (error) {
            toast.error('Failed to fetch employees');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchEmployees();
        }
    }, [user, filterDept]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.delete(`http://localhost:5000/api/employees/${id}`, config);
                toast.success('Employee deleted successfully');
                setEmployees(employees.filter(emp => emp._id !== id));
            } catch (error) {
                toast.error('Failed to delete employee');
            }
        }
    };

    const handleGetAI = async (id) => {
        setIsAIModalOpen(true);
        setAiLoading(true);
        setAiRecommendation('');
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const res = await axios.post('http://localhost:5000/api/ai/recommend', { employeeId: id }, config);
            setAiRecommendation(res.data.recommendation);
        } catch (error) {
            setAiRecommendation('Failed to fetch AI recommendation. Please check if your API key is correctly configured in the backend.');
            toast.error('AI request failed');
        } finally {
            setAiLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const res = await axios.put(`http://localhost:5000/api/employees/${editEmployee._id}`, editEmployee, config);
            toast.success('Employee updated successfully');
            setEmployees(employees.map(emp => emp._id === editEmployee._id ? res.data : emp));
            setEditEmployee(null);
        } catch (error) {
            toast.error('Failed to update employee');
        }
    };

    // Derived stats
    const avgScore = employees.length > 0 ? (employees.reduce((acc, curr) => acc + curr.performanceScore, 0) / employees.length).toFixed(1) : 0;
    const topPerformers = employees.filter(e => e.performanceScore >= 80).length;
    const needsImprovement = employees.filter(e => e.performanceScore < 60).length;

    const filteredEmployees = employees.filter(emp => 
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        emp.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Users className="h-8 w-8" /></div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Employees</p>
                        <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                    <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg"><TrendingUp className="h-8 w-8" /></div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Average Score</p>
                        <p className="text-2xl font-bold text-gray-900">{avgScore}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-lg"><Star className="h-8 w-8" /></div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Top Performers</p>
                        <p className="text-2xl font-bold text-gray-900">{topPerformers}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
                    <div className="p-3 bg-red-100 text-red-600 rounded-lg"><AlertCircle className="h-8 w-8" /></div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Needs Improvement</p>
                        <p className="text-2xl font-bold text-gray-900">{needsImprovement}</p>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-1/2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Search by name or skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center w-full sm:w-auto">
                    <Filter className="h-5 w-5 text-gray-400 mr-2" />
                    <select
                        className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
                        value={filterDept}
                        onChange={(e) => setFilterDept(e.target.value)}
                    >
                        <option value="">All Departments</option>
                        <option value="Development">Development</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="HR">HR</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
            </div>

            {/* Employee List */}
            {loading ? (
                <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>
            ) : filteredEmployees.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                    <Users className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No employees found</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new employee or adjusting your search filters.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEmployees.map(employee => (
                        <EmployeeCard 
                            key={employee._id} 
                            employee={employee} 
                            onDelete={handleDelete}
                            onGetAI={handleGetAI}
                            setEditEmployee={setEditEmployee}
                        />
                    ))}
                </div>
            )}

            <AIRecommendationModal 
                isOpen={isAIModalOpen}
                onClose={() => setIsAIModalOpen(false)}
                recommendation={aiRecommendation}
                loading={aiLoading}
            />

            {/* Edit Modal */}
            {editEmployee && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Edit Performance Score</h3>
                        <form onSubmit={handleUpdate}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Score (0-100)</label>
                                <input 
                                    type="number" min="0" max="100" required
                                    value={editEmployee.performanceScore}
                                    onChange={(e) => setEditEmployee({...editEmployee, performanceScore: Number(e.target.value)})}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button type="button" onClick={() => setEditEmployee(null)} className="px-4 py-2 border rounded-md">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
