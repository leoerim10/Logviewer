import React, { useState } from 'react';
import { Button, Input } from '@mui/material';

/**
 * A component for a search box that includes an input field and a search button.
 *
 * @param {Object} props - The props object.
 * @param {function} props.handleSearch - The function to be called when the search button is clicked or the Enter key is pressed. This function should take the current search query as its argument.
 * @param {string} props.placeholder - The text to display in the input field when it is empty.
 * @returns {JSX.Element} - The search box component.
 */
function SearchBox({ handleSearch, placeholder }) {
  // The current search query, stored in state.
  const [query, setQuery] = useState("");

  // A handler function to update the query state when the input value changes.
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // A handler function to call the handleSearch function when the search button is clicked.
  const handleClick = () => {
    handleSearch(query);
  };

  // A handler function to call the handleSearch function when the Enter key is pressed.
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(query);
    }
  };

  return (
    <div>
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleClick}>Search</Button>
    </div>
  );
}


export default SearchBox;
