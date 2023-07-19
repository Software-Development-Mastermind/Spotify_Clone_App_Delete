import React, { useState } from "react";
import Sidebar from "../SideBar/Sidebar";
import LogSignIn from "../Singup_login/Signup_login";
import SearchBarFeat from "../SearchBar/SearchBarFeat";
import SearchBarResults from "./SearchBarResults";

function SearchBar() {
  const [searchResults, setSearchResults] = useState();
  const [config, setConfig] = useState();
  return (
    <div className="background_color_gradient">
      <LogSignIn />
      <Sidebar />
      <SearchBarFeat
        setSearchResults={setSearchResults}
        setConfig={setConfig}
      />
      <SearchBarResults searchResults={searchResults} config={config} />
    </div>
  );
}

export default SearchBar;
