import React from "react";
import Randomizer from "./Randomizer";
import Sidebar from "../SideBar/Sidebar";
import LogSignIn from "../Singup_login/Signup_login";

function RandomizerLayout() {
  return (
    <div className="d-flex">
      <LogSignIn />
      <Randomizer />
      <Sidebar />
    </div>
  );
}

export default RandomizerLayout;
