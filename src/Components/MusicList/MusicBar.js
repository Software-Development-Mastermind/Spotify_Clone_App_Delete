import React from "react";
import { Card } from "react-bootstrap";

function Musicbar() {
  return (
    <div className="background_color_gradient">
      <div className="word_layout">
        <p className="word_layout_genre">Genres</p>
      </div>
      <div>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </div>
  );
}

export default Musicbar;
