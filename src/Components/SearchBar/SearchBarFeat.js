import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

function SearchBarFeat() {
  const [selectedOption, setSelectedOption] = useState("Artist"); // default to 'Artist'
  const [searchQuery, setSearchQuery] = useState(""); // store the search query
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery === "") return;

    const getData = async () => {
      const response = await axios.get(
        `/${selectedOption.toLowerCase()}?name=${searchQuery}`
      );
      setSearchResults(response.data);
    };

    getData();
  }, [searchQuery, selectedOption]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    setSearchQuery(""); // this will trigger the useEffect
  };

  return (
    <div className="containerStyle">
      <select
        className="selectStyle"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="Artist">Artist</option>
        <option value="Album">Album</option>
        <option value="Song">Song</option>
      </select>
      <input
        className="inputStyle"
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={handleSearchChange}
      />
      <button className="buttonStyle" type="button" onClick={handleSearchClick}>
        Search
      </button>
      <div className="searchResults">
        {searchResults && (
          <a
            href={searchResults.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card>
              <Card.Img variant="top" src={searchResults.imageUrl} />
              <Card.Body>
                <Card.Title>{searchResults.name}</Card.Title>
              </Card.Body>
            </Card>
          </a>
        )}
      </div>
    </div>
  );
}

export default SearchBarFeat;
