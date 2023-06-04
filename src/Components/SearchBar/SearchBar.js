import React from "react";
import LogSignIn from "../Singup_login/Signup_login";
import Sidebar from "../SideBar/Sidebar";

function SearchBar() {
  return (
    <div className="background_color_gradient">
      <LogSignIn />
      <Sidebar />
      <form class="d-flex">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
