import React from "react";
import LogSignIn from "../Singup_login/Signup_login";
import Sidebar from "../SideBar/Sidebar";
import SearchBarFeat from "./SearchBarFeat";
import SearchBar from "./SearchBar";
import SearchBarResults from "./SearchBarResults";

function SearchBarLayout({ searchResults, config, select_option }) {
  return (
    <div className="main-layout">
      <Sidebar />
      <SearchBarResults
        searchResults={searchResults}
        config={config}
        select_option={select_option}
      />
    </div>
  );
}

export default SearchBarLayout;
