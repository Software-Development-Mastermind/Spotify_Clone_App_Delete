import React, { useState, useEffect } from "react";
import axios from "axios";

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
      setConfig(selectedOption);
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
    setStartQuery(searchQuery);
  };
  console.log(startQuery);

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
    </div>
  );
}

export default SearchBarFeat;
