import { React, useState, useEffect } from "react";
import { Card } from "react-bootstrap";

function Randomizer() {
  return (
    <div className="background_color_gradient">
      <div className="word_layout">
        <p className="word_layout_genre"></p>
      </div>
      <div className="card_layout">
        <Card style={{ width: "18rem" }} className="card_layout_bgcolor">
          <div className="image-container">
            <div>
              <Card.Img variant="bottom" className="card_img_genre" />
            </div>
            (
            <div className="overlay-image">
              <Card.Img variant="top" className="hover-image" />
            </div>
            )
          </div>
          <Card.Body>
            <Card.Title
              style={{ justifyContent: "center", color: "white" }}
            ></Card.Title>
            <Card.Text className="text_alter"></Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Randomizer;
