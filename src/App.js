import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import Result from './components/result';
import SearchWithSuggestions from './components/suggestions';

function App() {
  <h1>Hello</h1>
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/result" element={<Result />} />
        <Route path="/search" element={<SearchWithSuggestions />} />
      </Routes>
    </Router>
  );
}

export default App;
