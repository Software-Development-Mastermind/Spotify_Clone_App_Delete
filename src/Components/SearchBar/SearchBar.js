import React, { useState } from "react";
import SearchBarLayout from "./SearchBarLayout";
import LoginSearchBar from "../Singup_login/SearchLogIn";

function SearchBar() {
  const [searchResults, setSearchResults] = useState(null);
  const [config, setConfig] = useState(null);
  return (
    <div className="background_color_gradient">
      <LoginSearchBar
        setSearchResults={setSearchResults}
        setConfig={setConfig}
      />
      <SearchBarLayout searchResults={searchResults} config={config} />
    </div>
  );
}

export default SearchBar;
