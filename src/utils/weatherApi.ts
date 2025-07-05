export interface WeatherData {
  name: string;
  country: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  main: string;
  icon: string;
  sunrise: number;
  sunset: number;
  visibility: number;
  pressure: number;
}

export interface ForecastData {
  date: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  description: string;
  main: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface LocationData {
  lat: number;
  lon: number;
  name: string;
  country: string;
}

const API_KEY = '948ff544a58a6c67440c3dc2aa8294dd';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export const getCurrentWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather data not found');
    }
    
    const data = await response.json();
    
    return {
      name: data.name,
      country: data.sys.country,
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      description: data.weather[0].description,
      main: data.weather[0].main,
      icon: data.weather[0].icon,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      visibility: data.visibility,
      pressure: data.main.pressure,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getForecast = async (lat: number, lon: number): Promise<ForecastData[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Forecast data not found');
    }
    
    const data = await response.json();
    
    // Get daily forecast (one per day at 12:00)
    const dailyData = data.list.filter((_: any, index: number) => index % 8 === 0).slice(0, 5);
    
    return dailyData.map((item: any) => ({
      date: new Date(item.dt * 1000).toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      }),
      temp: Math.round(item.main.temp),
      tempMin: Math.round(item.main.temp_min),
      tempMax: Math.round(item.main.temp_max),
      description: item.weather[0].description,
      main: item.weather[0].main,
      icon: item.weather[0].icon,
      humidity: item.main.humidity,
      windSpeed: Math.round(item.wind.speed * 3.6),
    }));
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};

export const searchCities = async (query: string): Promise<LocationData[]> => {
  try {
    if (query.length < 2) return [];
    
    const response = await fetch(
      `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('City search failed');
    }
    
    const data = await response.json();
    
    return data.map((city: any) => ({
      lat: city.lat,
      lon: city.lon,
      name: city.name,
      country: city.country,
    }));
  } catch (error) {
    console.error('Error searching cities:', error);
    throw error;
  }
};

export const getCurrentLocation = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
};