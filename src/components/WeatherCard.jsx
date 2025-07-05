import { motion } from 'framer-motion';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge,
  Sunrise,
  Sunset
} from 'lucide-react';
import { getWeatherIcon, formatTime, capitalizeWords } from '../utils/weatherHelpers';

const WeatherCard = ({ weather, isDay }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main Weather Info */}
          <div className="text-center md:text-left">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-8xl mb-4"
            >
              {getWeatherIcon(weather.main, isDay)}
            </motion.div>
            
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {weather.name}
              </h1>
              <p className="text-lg text-gray-300">{weather.country}</p>
              
              <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
                <span className="text-5xl md:text-6xl font-bold text-white">
                  {weather.temp}°C
                </span>
                <div className="text-left">
                  <p className="text-lg text-gray-300">
                    Feels like {weather.feelsLike}°C
                  </p>
                  <p className="text-sm text-gray-400 capitalize">
                    {capitalizeWords(weather.description)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Weather Stats */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              variants={statVariants}
              initial="hidden"
              animate="visible"
              className="bg-white/5 rounded-2xl p-4 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-2">
                <Droplets className="h-5 w-5 text-blue-400" />
                <span className="text-sm text-gray-300">Humidity</span>
              </div>
              <p className="text-2xl font-bold text-white">{weather.humidity}%</p>
            </motion.div>

            <motion.div
              variants={statVariants}
              initial="hidden"
              animate="visible"
              className="bg-white/5 rounded-2xl p-4 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-2">
                <Wind className="h-5 w-5 text-green-400" />
                <span className="text-sm text-gray-300">Wind Speed</span>
              </div>
              <p className="text-2xl font-bold text-white">{weather.windSpeed} km/h</p>
            </motion.div>

            <motion.div
              variants={statVariants}
              initial="hidden"
              animate="visible"
              className="bg-white/5 rounded-2xl p-4 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-2">
                <Eye className="h-5 w-5 text-purple-400" />
                <span className="text-sm text-gray-300">Visibility</span>
              </div>
              <p className="text-2xl font-bold text-white">{(weather.visibility / 1000).toFixed(1)} km</p>
            </motion.div>

            <motion.div
              variants={statVariants}
              initial="hidden"
              animate="visible"
              className="bg-white/5 rounded-2xl p-4 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-2">
                <Gauge className="h-5 w-5 text-orange-400" />
                <span className="text-sm text-gray-300">Pressure</span>
              </div>
              <p className="text-2xl font-bold text-white">{weather.pressure} hPa</p>
            </motion.div>
          </div>
        </div>

        {/* Sun Times */}
        <div className="mt-8 flex justify-center gap-8">
          <motion.div
            variants={statVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-2"
          >
            <Sunrise className="h-5 w-5 text-yellow-400" />
            <div className="text-center">
              <p className="text-sm text-gray-300">Sunrise</p>
              <p className="text-lg font-semibold text-white">
                {formatTime(weather.sunrise)}
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={statVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-2"
          >
            <Sunset className="h-5 w-5 text-orange-400" />
            <div className="text-center">
              <p className="text-sm text-gray-300">Sunset</p>
              <p className="text-lg font-semibold text-white">
                {formatTime(weather.sunset)}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;