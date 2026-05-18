import { motion } from 'framer-motion';
import { User, Briefcase, Award, Trash2, Edit, Sparkles, Activity } from 'lucide-react';

const EmployeeCard = ({ employee, onDelete, onGetAI, setEditEmployee }) => {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                        <div className="bg-indigo-100 p-2.5 rounded-lg mr-4">
                            <User className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                            <p className="text-sm text-gray-500">{employee.email}</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button onClick={() => setEditEmployee(employee)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition-colors" title="Edit Employee">
                            <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => onDelete(employee._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors" title="Delete Employee">
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center text-gray-700">
                        <Briefcase className="h-4 w-4 mr-2 text-purple-500" />
                        <span>{employee.department}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                        <Activity className="h-4 w-4 mr-2 text-teal-500" />
                        <span>{employee.experience} Years Exp.</span>
                    </div>
                    <div className="flex items-center text-gray-700 col-span-2">
                        <Award className="h-4 w-4 mr-2 text-yellow-500" />
                        <div className="flex items-center w-full">
                            <span className="mr-2">Score: {employee.performanceScore}/100</span>
                            <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                                <div 
                                    className={`h-2 rounded-full ${employee.performanceScore >= 80 ? 'bg-green-500' : employee.performanceScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                    style={{ width: `${employee.performanceScore}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                        {employee.skills.map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-md font-medium border border-indigo-100">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={() => onGetAI(employee._id)}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 py-2.5 rounded-lg border border-indigo-100 font-medium transition-colors"
                >
                    <Sparkles className="h-4 w-4" />
                    <span>Get AI Insights</span>
                </button>
            </div>
        </motion.div>
    );
};

export default EmployeeCard;
