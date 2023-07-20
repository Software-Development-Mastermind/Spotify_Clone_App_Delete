import React, { useState } from "react";
import Sidebar from "../SideBar/Sidebar";
import LogSignIn from "../Singup_login/Signup_login";
import SearchBarFeat from "../SearchBar/SearchBarFeat";
import SearchBarResults from "./SearchBarResults";
import SearchBarLayout from "./SearchBarLayout";

function SearchBar() {
  return (
    <div className="background_color_gradient">
      <LogSignIn />
      <SearchBarLayout />
      <SearchBarResults searchResults={searchResults} config={config} />
    </div>
  );
}

export default SearchBar;
