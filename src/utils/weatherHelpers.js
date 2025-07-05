export const getWeatherIcon = (condition, isDay = true) => {
  const icons = {
    'Clear': isDay ? '☀️' : '🌙',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Smoke': '🌫️',
    'Haze': '🌫️',
    'Dust': '🌫️',
    'Fog': '🌫️',
    'Sand': '🌫️',
    'Ash': '🌫️',
    'Squall': '💨',
    'Tornado': '🌪️',
  };
  
  return icons[condition] || '🌤️';
};

export const getWeatherBackground = (condition, isDay = true) => {
  if (!isDay) {
    return 'from-indigo-900 via-purple-900 to-pink-900';
  }
  
  const backgrounds = {
    'Clear': 'from-blue-400 via-purple-400 to-pink-400',
    'Clouds': 'from-gray-400 via-gray-500 to-gray-600',
    'Rain': 'from-gray-600 via-gray-700 to-gray-800',
    'Drizzle': 'from-gray-500 via-gray-600 to-gray-700',
    'Thunderstorm': 'from-gray-800 via-gray-900 to-black',
    'Snow': 'from-blue-100 via-blue-200 to-blue-300',
    'Mist': 'from-gray-300 via-gray-400 to-gray-500',
    'Fog': 'from-gray-300 via-gray-400 to-gray-500',
  };
  
  return backgrounds[condition] || 'from-blue-400 via-purple-400 to-pink-400';
};

export const isNightTime = (sunrise, sunset) => {
  const now = Date.now() / 1000;
  return now < sunrise || now > sunset;
};

export const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getWindDirection = (degrees) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(degrees / 45) % 8];
};

export const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};