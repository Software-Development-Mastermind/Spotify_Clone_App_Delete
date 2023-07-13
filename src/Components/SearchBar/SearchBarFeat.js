import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

function SearchBarFeat() {
  const [selectedOption, setSelectedOption] = useState("Artist"); // default to 'Artist'
  const [searchQuery, setSearchQuery] = useState(""); // store the search query
  const [startQuery, setStartQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (startQuery === "") return;

    const getData = async () => {
      const response = await axios.get(
        `/${selectedOption.toLowerCase()}?artist_name=${startQuery}`
      );
      setSearchResults(response.data);
    };

    getData();
  }, [startQuery, selectedOption]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    setStartQuery(searchQuery); // this will trigger the useEffect
  };
  console.log(startQuery);
  const OPTION_CONFIG = {
    artist: {
      titleField: "name",
      imageField: "image",
      linkField: "artist_page",
    },
    song: {
      titleField: "track_name",
      imageField: "track_image",
      linkField: "song_page",
    },
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
        {searchResults.map((result, index) => (
          <a href={result[config.linkField]} key={index}>
            <Card.Img variant="top" src={result[config.imageField]} />
            <Card.Body>
              <Card.Title>{result[config.titleField]}</Card.Title>
            </Card.Body>
          </a>
        ))}
      </div>
    </div>
  );
}

export default SearchBarFeat;
