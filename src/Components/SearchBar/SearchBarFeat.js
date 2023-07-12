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

  const OPTION_CONFIG = {
    artist: {
      titleField: "name",
      imageField: "image",
      linkField: "artist_page",
    },
    song: { titleField: "track_name", imageField: "track_image" },
  };

  const config = OPTION_CONFIG[selectedOption];

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
        <a href={searchResults[config.linkField]}>
          <>
            <Card.Img variant="top" src={searchResults[config.imageField]} />
            <Card.Body>
              <Card.Title>{searchResults[config.titleField]}</Card.Title>
            </Card.Body>
          </>
        </a>
      </div>
    </div>
  );
}

export default SearchBarFeat;
