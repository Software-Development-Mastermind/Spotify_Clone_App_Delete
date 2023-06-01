import React from "react";
import spotifyImg from "../../Icons/spotifylogo.png";
import houseImg from "../../Icons/houseimg.png";
import magGlass from "../../Icons/magnifyingGlass.png";
import library from "../../Icons/albumLibrary.png";
import plus from "../../Icons/plusNew.png";
import heart from "../../Icons/heart.png";

function Sidebar() {
  return (
    <div className="list">
      <ul className="unorderedList">
        <li>
          <img src={spotifyImg} className="btnSizeOne"></img>
        </li>
        <li>
          <div className="option">
            <img src={houseImg} className="btnSizeTwo"></img>
            <p className="text-white">Home</p>
          </div>
        </li>
        <li>
          <div className="option">
            <img src={magGlass} className="btnSizeTwo"></img>
            <p className="text-white">Search</p>
          </div>
        </li>
        <li>
          <div className="option">
            <img src={library} className="btnSizeTwo"></img>
            <p className="text-white">My Library</p>
          </div>
        </li>
        <li>
          <div className="option">
            <img src={plus} className="btnSizeTwo"></img>
            <p className="text-white">Create Playlist</p>
          </div>
        </li>
        <li>
          <div className="option">
            <img src={heart} className="btnSizeTwo"></img>
            <p className="text-white">Favorites</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
