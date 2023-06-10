import React from "react";

function ArtistList(props) {
  return (
    <div>
      const artistListData ={" "}
      {props.genreslists.map((genrelist, index) => (
        <div key={index}></div>
      ))}
    </div>
  );
}

export default ArtistList;
