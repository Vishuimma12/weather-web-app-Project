import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import WeatherScene3D from './three/WeatherScene';
import { 
  getCurrentWeather, 
  getForecast, 
  getCurrentLocation
} from './utils/weatherApi';
import { getWeatherBackground, isNightTime } from './utils/weatherHelpers';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDay, setIsDay] = useState(true);

  const fetchWeatherData = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);
      
      const [currentWeather, forecastData] = await Promise.all([
        getCurrentWeather(lat, lon),
        getForecast(lat, lon)
      ]);
      
      setWeather(currentWeather);
      setForecast(forecastData);
      setIsDay(!isNightTime(currentWeather.sunrise, currentWeather.sunset));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (lat, lon) => {
    fetchWeatherData(lat, lon);
  };

  const handleCurrentLocation = async () => {
    try {
      setLoading(true);
      const location = await getCurrentLocation();
      await fetchWeatherData(location.lat, location.lon);
    } catch (err) {
      setError('Unable to get your location. Please search for a city instead.');
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCurrentLocation();
  }, []);

  const backgroundClass = weather 
    ? `bg-gradient-to-br ${getWeatherBackground(weather.main, isDay)}`
    : 'bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400';

  if (loading) {
    return (
      <div className={`min-h-screen ${backgroundClass} transition-all duration-1000`}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${backgroundClass} transition-all duration-1000`}>
        <ErrorMessage 
          message={error} 
          onRetry={() => {
            setError(null);
            handleCurrentLocation();
          }} 
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${backgroundClass} transition-all duration-1000 relative overflow-hidden`}>
      {/* 3D Weather Scene Background */}
      <div className="absolute inset-0 opacity-30">
        {weather && (
          <WeatherScene3D condition={weather.main} isDay={isDay} />
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header 
          className="p-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Live Weather Insights
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            Real-time forecasts with stunning 3D visuals
          </p>
          
          <SearchBar 
            onLocationSelect={handleLocationSelect}
            onCurrentLocation={handleCurrentLocation}
            isLoading={loading}
          />
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-8">
          {weather && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <WeatherCard weather={weather} isDay={isDay} />
            </motion.div>
          )}

          {forecast.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ForecastCard forecast={forecast} />
            </motion.div>
          )}
        </main>

        {/* Footer */}
        <motion.footer 
          className="p-6 text-center text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-sm">
           © 2025 • Powered by OpenWeatherMap API • Developed by Vishal Singh.
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;