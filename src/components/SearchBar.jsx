import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { searchCities } from '../utils/weatherApi';

const SearchBar = ({ onLocationSelect, onCurrentLocation, isLoading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.length >= 2) {
        setSearchLoading(true);
        try {
          const cities = await searchCities(query);
          setSuggestions(cities);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Search error:', error);
          setSuggestions([]);
        } finally {
          setSearchLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleLocationSelect = (location) => {
    setQuery(`${location.name}, ${location.country}`);
    setShowSuggestions(false);
    onLocationSelect(location.lat, location.lon);
  };

  const handleCurrentLocation = () => {
    setQuery('');
    setShowSuggestions(false);
    onCurrentLocation();
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {searchLoading ? (
            <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200"
        />
        
        <button
          onClick={handleCurrentLocation}
          disabled={isLoading}
          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:scale-110 transition-transform duration-200"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
          ) : (
            <MapPin className="h-5 w-5 text-gray-400 hover:text-white transition-colors duration-200" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-lg z-50"
          >
            {suggestions.map((location, index) => (
              <motion.button
                key={`${location.lat}-${location.lon}`}
                onClick={() => handleLocationSelect(location)}
                className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors duration-200 border-b border-white/10 last:border-b-0"
                whileHover={{ x: 4 }}
              >
                <div className="font-medium">{location.name}</div>
                <div className="text-sm text-gray-300">{location.country}</div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;