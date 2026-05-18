import { motion } from 'framer-motion';
import { X, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // Ensure react-markdown is installed, or we can use regular text formatting

const AIRecommendationModal = ({ isOpen, onClose, recommendation, loading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col"
            >
                <div className="flex justify-between items-center p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <div className="flex items-center space-x-2">
                        <Sparkles className="h-6 w-6 text-yellow-300" />
                        <h2 className="text-xl font-bold">AI Performance Analysis</h2>
                    </div>
                    <button onClick={onClose} className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/20">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                
                <div className="p-8 overflow-y-auto bg-slate-50 flex-grow">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
                            <p className="text-gray-600 font-medium animate-pulse">Generating AI insights...</p>
                            <p className="text-sm text-gray-500 mt-2 text-center max-w-md">Our AI is analyzing performance metrics, skills, and experience to provide personalized recommendations.</p>
                        </div>
                    ) : recommendation ? (
                        <div className="prose prose-indigo max-w-none">
                            {/* Simple text formatting since react-markdown might not be installed */}
                            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                {recommendation}
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No recommendation available.</p>
                    )}
                </div>
                
                <div className="p-4 bg-white border-t border-gray-100 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
                    >
                        Close
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AIRecommendationModal;
