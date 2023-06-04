import React, { useState } from "react";
import Sidebar from "../SideBar/Sidebar";
import LoginSearchBar from "../Singup_login/SearchLogIn";

function SearchBar() {
  return (
    <div className="background_color_gradient">
      <LoginSearchBar />
      <Sidebar />
    </div>
  );
}

export default SearchBar;
