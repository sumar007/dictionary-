import React, { useState, useEffect } from 'react';
import './suggestions.css';
import { useNavigate } from 'react-router-dom';

const SearchWithSuggestions = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length > 0) {
        setIsLoading(true);
        try {
          const response = await fetch(`http://localhost:4000/suggestions?pre=${query}`);
          const data = await response.json();
          setSuggestions(data.suggestions);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    };

    const debounceTimeout = setTimeout(fetchSuggestions, 300);

    return () => clearTimeout(debounceTimeout);
  }, [query]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/search?word=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Word not found');
      }
      const data = await response.json();
      navigate('/result', { state: { word: data.word, definition: data.definition } });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion); 
    setSearchTerm(suggestion); 
    setSuggestions([]); 
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}> 
        <input
          id="search-box"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {isLoading && <div>Loading suggestions...</div>}
      <div id="suggestions-list" className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <div 
            key={index} 
            className="suggestion" 
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchWithSuggestions;
