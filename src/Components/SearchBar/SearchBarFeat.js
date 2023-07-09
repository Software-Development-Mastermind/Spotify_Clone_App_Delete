import React, { useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

function SearchBarFeat() {
  const [selectedOption, setSelectedOption] = useState();
  const [searchResults, setSearchResults] = useState(false);

  useEffect(() => {
    if (!searchResults) return;
    const getData = async () => {
      const response = await axios.get(`/artist?artist_name=${searchResults}`);
      setSelectedOption(response.data);
      setSearchResults(false);
    };

    getData();
  }, [searchResults]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchClick = (artist_info) => {
    setSearchResults(artist_info);
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
        onChange={handleOptionChange}
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
