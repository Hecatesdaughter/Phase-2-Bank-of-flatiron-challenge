import React from "react";

function Search({ searchTerm, setSearchTerm }) {
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button
        className="ui grey button"
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        <i className="search icon"></i>
      </button>
    </div>
  );
}

export default Search;
