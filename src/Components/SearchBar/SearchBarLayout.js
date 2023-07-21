import React from "react";
import LogSignIn from "../Singup_login/Signup_login";
import Sidebar from "../SideBar/Sidebar";
import SearchBarFeat from "./SearchBarFeat";
import SearchBar from "./SearchBar";
import SearchBarResults from "./SearchBarResults";

function SearchBarLayout() {
  return (
    <div className="background_color_gradient">
      <Sidebar />
      <SearchBarResults />
    </div>
  );
}

export default SearchBarLayout;
