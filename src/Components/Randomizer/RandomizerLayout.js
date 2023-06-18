import React from "react";
import Randomizer from "./Randomizer";
import Sidebar from "../SideBar/Sidebar";
import LogSignIn from "../Singup_login/Signup_login";

function RandomizerLayout() {
  return (
    <div className="d-flex">
      <LogSignIn />
      <Sidebar />
      <Randomizer />
    </div>
  );
}

export default RandomizerLayout;
