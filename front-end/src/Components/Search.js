import React, { useState } from "react";

const Search = ({ onSearch, onShowFullList }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form className="d-flex align-items-center" onSubmit={handleSearch}>
      <input
        className="form-control me-2"
        type="text"
        placeholder="Search by ID or Name"
        aria-label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="btn btn-outline-success mx-2" type="submit">
        Search
      </button>
      <button
        className="btn btn-outline-primary mx-2"
        type="button"
        onClick={onShowFullList}
        style={{
          padding: "0.375rem 1.5rem",
          minWidth: "150px",
        }}
      >
        Show Full List
      </button>
    </form>
  );
};

export default Search;
