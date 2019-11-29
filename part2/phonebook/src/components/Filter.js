import React from 'react';

const Filter = ({ filter, handleFilterInputChange }) => {
  return (
    <div>
      <span style={{ fontStyle: 'italic' }}>Search for </span>
      <input value={filter} onChange={handleFilterInputChange} />
    </div>
  );
};

export default Filter;
