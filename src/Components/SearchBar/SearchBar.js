import React, { useState } from "react";
import Sidebar from "../SideBar/Sidebar";
import LoginSearchBar from "../Singup_login/SearchLogIn";
import SearchBarResults from "./SearchBarResults";

function SearchBar() {
  return (
    <div className="background_color_gradient">
      <LoginSearchBar />
      <Sidebar />
      <SearchBarResults />
    </div>
  );
}

export default SearchBar;
