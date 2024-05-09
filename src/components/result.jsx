import React from 'react';
import { useLocation } from 'react-router-dom'; 
import './Result.css';

const Result = () => {
  const location = useLocation();
  const { word, definition } = location.state || {};

  if (!word || !definition) {
    return <div className="error-message">Data not found</div>;
  }

  return (
    <div className="result-wrapper">
      <table className="result-table">
        <tbody>
          <tr>
            <th>Word</th>
            <td>{word}</td>
          </tr>
          <tr>
            <th>Definition</th>
            <td>{definition}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Result;
