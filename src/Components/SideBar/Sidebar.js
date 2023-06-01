import React from "react";
import spotifyImg from "../../Icons/spotifylogo.png";

function Sidebar() {
  return (
    <div className="list">
      <ul className="unorderedList">
        <li>
          <img src={spotifyImg} className="btnSize"></img>
        </li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}

export default Sidebar;
