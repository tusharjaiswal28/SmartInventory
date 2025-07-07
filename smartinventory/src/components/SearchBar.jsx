import React from 'react';

function SearchBar({ setSearch }) {
  return (
    <input placeholder="Search items..." onChange={e => setSearch(e.target.value)} />
  );
}

export default SearchBar;