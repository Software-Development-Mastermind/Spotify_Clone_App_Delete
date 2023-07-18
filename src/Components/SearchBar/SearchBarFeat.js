import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import SearchBarResults from "./SearchBarResults";

function SearchBarFeat({ setSearchResults, setConfig }) {
  const [selectedOption, setSelectedOption] = useState("artist"); // default to 'Artist'
  const [searchQuery, setSearchQuery] = useState(""); // store the search query
  const [startQuery, setStartQuery] = useState("");

  useEffect(() => {
    if (startQuery === "") return;

    const getData = async () => {
      const response = await axios.get(
        `/${selectedOption.toLowerCase()}?artist_name=${startQuery}`
      );
      setSearchResults(response.data);
      setConfig(config);
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
    album: {
      titleField: "album_name",
      imageField: "album_image",
      linkField: "album_page",
    },
  };
  const config = OPTION_CONFIG[selectedOption];
  console.log(OPTION_CONFIG.artist?.linkField);
  console.log("selectedOption:", selectedOption);
  //console.log("searchResults:", searchResults);
  console.log("config:", config);

  return (
    <div className="containerStyle">
      <select
        className="selectStyle"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="artist">Artist</option>
        <option value="album">Album</option>
        <option value="song">Song</option>
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
      {/* <div>
        {searchResults[config?.linkField] &&
          searchResults[config?.imageField] &&
          searchResults[config?.titleField] && (
            <a href={searchResults[config?.linkField]}>
              <Card.Img variant="top" src={searchResults[config?.imageField]} />
              <Card.Body>
                <Card.Title>{searchResults[config?.titleField]}</Card.Title>
              </Card.Body>
            </a>
          )}
      </div> */}
    </div>
  );
}

export default SearchBarFeat;
