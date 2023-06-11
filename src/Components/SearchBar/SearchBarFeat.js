import React, { useEffect, useState } from "react";

function SearchBarFeat() {
  const [selectedOption, setSelectedOption] = useState("Artist");
  const [fetchSongs, setFetchSongs] = useState(selectedOption);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const 
  })

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
      />
      <button className="buttonStyle" type="button" onClick={}>
        Search
      </button>
    </div>
  );
}

export default SearchBarFeat;
