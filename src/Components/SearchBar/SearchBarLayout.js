import React from "react";
import LogSignIn from "../Singup_login/Signup_login";
import Sidebar from "../SideBar/Sidebar";
import SearchBar from "./SearchBar";

function SearchBarLayout() {
  return (
    <div>
      <LogSignIn />
      <Sidebar />
      <SearchBar />
    </div>
  );
}

export default SearchBarLayout;
