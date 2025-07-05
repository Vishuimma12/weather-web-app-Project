import { motion } from 'framer-motion';
import { ForecastData } from '../utils/weatherApi';
import { getWeatherIcon, capitalizeWords } from '../utils/weatherHelpers';

interface ForecastCardProps {
  forecast: ForecastData[];
}

const ForecastCard = ({ forecast }: ForecastCardProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto mt-8"
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          5-Day Forecast
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {forecast.map((day, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center hover:bg-white/10 transition-colors duration-200"
            >
              <p className="text-sm text-gray-300 mb-2">{day.date}</p>
              
              <div className="text-4xl mb-2">
                {getWeatherIcon(day.main, true)}
              </div>
              
              <div className="space-y-1 mb-3">
                <p className="text-lg font-bold text-white">{day.temp}°C</p>
                <p className="text-sm text-gray-400">
                  {day.tempMax}° / {day.tempMin}°
                </p>
              </div>
              
              <p className="text-xs text-gray-400 capitalize mb-2">
                {capitalizeWords(day.description)}
              </p>
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>💧 {day.humidity}%</span>
                <span>💨 {day.windSpeed}km/h</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ForecastCard;