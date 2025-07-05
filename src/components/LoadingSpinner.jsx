import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const LoadingSpinner = ({ onComplete }) => {
  const [currentWeatherIndex, setCurrentWeatherIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const weatherStates = [
    { icon: '☀️', name: 'sunny', color: 'from-yellow-400 to-orange-400' },
    { icon: '☁️', name: 'cloudy', color: 'from-gray-400 to-gray-600' },
    { icon: '🌧️', name: 'rainy', color: 'from-blue-400 to-blue-600' },
    { icon: '❄️', name: 'snowy', color: 'from-cyan-300 to-blue-400' },
    { icon: '🌙', name: 'night', color: 'from-indigo-400 to-purple-500' }
  ];

  useEffect(() => {
    const weatherCycle = setInterval(() => {
      setCurrentWeatherIndex((prev) => (prev + 1) % weatherStates.length);
    }, 1500);

    const timeout = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 5000); // Ensures 3s minimum loading time

    return () => {
      clearInterval(weatherCycle);
      clearTimeout(timeout);
    };
  }, []);

  const currentWeather = weatherStates[currentWeatherIndex];

  if (!isVisible) return null;

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-black/10 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Rotating ring with weather icon */}
        <div className="relative w-24 h-24">
          <motion.div
            className={`absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r ${currentWeather.color} p-1`}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full rounded-full bg-white/10" />
          </motion.div>
          <div className="relative w-24 h-24 flex items-center justify-center text-5xl">
            {currentWeather.icon}
          </div>
        </div>

        {/* Weather name */}
        <h3 className={`text-xl font-semibold bg-gradient-to-r ${currentWeather.color} bg-clip-text text-transparent`}>
          {currentWeather.name.charAt(0).toUpperCase() + currentWeather.name.slice(1)} Weather
        </h3>

        {/* Loading text */}
        <p className="text-white text-base">Gathering weather insights...</p>

        {/* Indicator dots */}
        <div className="flex space-x-2">
          {weatherStates.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentWeatherIndex
                  ? `bg-gradient-to-r ${currentWeather.color}`
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;
