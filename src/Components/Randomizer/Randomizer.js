import { React, useState, useEffect } from "react";
import { Card } from "react-bootstrap";

function Randomizer() {
  return (
    <div className="background_color_gradient">
      <div className="word_layout">
        <p className="word_layout_genre">Genres</p>
      </div>
      <div className="card_layout" onClick={handleOnClick}>
        {cards.map((card) => (
          <Card
            key={card.id}
            style={{ width: "18rem" }}
            className="card_layout_bgcolor"
            onMouseEnter={() =>
              setCards(
                cards.map((c) =>
                  c.id === card.id ? { ...c, isHovered: true } : c
                )
              )
            }
            onMouseLeave={() =>
              setCards(
                cards.map((c) =>
                  c.id === card.id ? { ...c, isHovered: false } : c
                )
              )
            }
          >
            <div className="image-container">
              <div className={`base-image ${card.isHovered ? "dimmed" : ""}`}>
                <Card.Img
                  variant="bottom"
                  src={card.image}
                  className="card_img_genre"
                />
              </div>
              {card.isHovered && (
                <div className="overlay-image">
                  <Card.Img
                    variant="top"
                    src={card.hoverImage}
                    className="hover-image"
                  />
                </div>
              )}
            </div>
            <Card.Body>
              <Card.Title style={{ justifyContent: "center", color: "white" }}>
                {card.genre}
              </Card.Title>
              <Card.Text className="text_alter">{card.description}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Randomizer;
