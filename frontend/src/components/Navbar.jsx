import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Users, UserPlus, Activity } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    if (!user) return null;

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Activity className="h-8 w-8 text-indigo-600 mr-2" />
                        <Link to="/" className="text-xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                            PerformAI
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors">
                            <Users className="h-5 w-5 mr-1" />
                            <span className="hidden sm:inline">Dashboard</span>
                        </Link>
                        <Link to="/add-employee" className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors">
                            <UserPlus className="h-5 w-5 mr-1" />
                            <span className="hidden sm:inline">Add Employee</span>
                        </Link>
                        <div className="h-6 w-px bg-gray-300 mx-2"></div>
                        <span className="text-sm text-gray-600 font-medium hidden md:inline">Welcome, {user.name}</span>
                        <button 
                            onClick={logout}
                            className="flex items-center text-red-600 hover:text-red-800 transition-colors bg-red-50 px-3 py-1.5 rounded-lg"
                        >
                            <LogOut className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
