import React, { useState } from "react";
import Sidebar from "../SideBar/Sidebar";
import LogSignIn from "../Singup_login/Signup_login";
import SearchBarFeat from "../SearchBar/SearchBarFeat";
import SearchLogin from "../Singup_login/SearchLogIn";
import SearchBarResults from "./SearchBarResults";
import SearchBarLayout from "./SearchBarLayout";
import LoginSearchBar from "../Singup_login/SearchLogIn";

function SearchBar() {
  const [searchResults, setSearchResults] = useState();
  const [config, setConfig] = useState();
  return (
    <div className="background_color_gradient">
      <SearchLogin setSearchResults={setSearchResults} setConfig={setConfig} />
      <LoginSearchBar searchResults={searchResults} config={config} />
    </div>
  );
}

export default SearchBar;
