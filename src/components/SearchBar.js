import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

function SearchBar(props) {
  const [input, setInput] = useState("");
  const [clearDisable, setclearDisable] = useState(true);
  const [searchDisable, setSearchDisable] = useState(true);

  useEffect(() => {
    if (props.searchInput !== null) {
      setInput(props.searchInput);
      if (props.searchInput !== "") {
        setclearDisable(false);
      }
    }
  }, [props.searchInput]);

  function handleChange(event) {
    event.preventDefault();
    setInput(event.target.value);
    event.target.value !== ""
      ? setSearchDisable(false)
      : setSearchDisable(true);
  }

  function handleSearchClick() {
    props.handleSearchButton(input);
  }

  function handleClearClick() {
    setclearDisable(true);
    props.handleClearButton();
  }

  return (
    <div id="search-bar-div">
      <Form.Control
        required
        id="search-bar"
        placeholder="Search"
        onChange={handleChange}
        value={input}
        autoComplete="off"
      ></Form.Control>
      <div id="buttons-div">
        <Button
          id="search-button"
          disabled={searchDisable}
          onClick={handleSearchClick}
        >
          Search
        </Button>
        <Button
          id="clear-button"
          disabled={clearDisable}
          onClick={handleClearClick}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}

export default SearchBar;
