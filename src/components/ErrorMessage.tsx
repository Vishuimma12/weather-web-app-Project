import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 max-w-md w-full text-center shadow-xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4"
        >
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-white mb-4">
          Oops! Something went wrong
        </h2>
        
        <p className="text-gray-300 mb-6">
          {message}
        </p>
        
        <motion.button
          onClick={onRetry}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 flex items-center gap-2 mx-auto"
        >
          <RefreshCw className="h-5 w-5" />
          Try Again
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ErrorMessage;