import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import './Search.css';
const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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

  return (
    <div className="search-container">
        <img src="data:image/png;base64,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" alt="logo" className="logo" />
      <form onSubmit={handleSearch} className="search-form">
     
        <input
          type="text"
          placeholder="Search for a word..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="search-button-container">
  <button type="submit" className="search-button">
    {/* <SearchIcon sx={{ fontSize: 25, color: 'white', marginRight: '10px' }} /> */}
    Search
  </button>
</div>

      </form>
    </div>
  );
};

export default Search;
