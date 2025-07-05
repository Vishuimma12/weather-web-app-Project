import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 border-4 border-white/20 border-t-white/60 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-l-white/40 rounded-full animate-spin animation-delay-150"></div>
        <div className="absolute inset-2 w-12 h-12 border-2 border-white/10 border-r-white/30 rounded-full animate-spin animation-delay-300"></div>
        
        <motion.p
          className="text-white text-lg font-medium mt-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Loading weather data...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;