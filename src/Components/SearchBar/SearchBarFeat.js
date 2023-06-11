import React, { useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

function SearchBarFeat() {
  const [selectedOption, setSelectedOption] = useState("Artist");
  const [searchResults, setSearchResults] = useState([]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchClick = async () => {
    const response = await axios.get(`/${selectedOption}`);
    setSearchResults(response.data);
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
      />
      <button className="buttonStyle" type="button" onClick={handleSearchClick}>
        Search
      </button>
      <div className="searchResults">
        {searchResults.map((result, index) => (
          <Card key={index}>
            <Card.Img variant="top" src={result.imageUrl} />
            <Card.Body>
              <Card.Title>{result.name}</Card.Title>
              <Card.Link href={result.spotifyUrl}>Go to Spotify</Card.Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default SearchBarFeat;
