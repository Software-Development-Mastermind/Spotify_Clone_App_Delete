import { React, useState, useEffect } from "react";
import { Card } from "react-bootstrap";

function Randomizer() {
  const [cards, setCards] = useState();
  const [pictures, getPictures] = useState();
  const [names, getNames] = useEffect();
  const dataLists = { pictures, names };
  return (
    <div className="background_color_gradient">
      <div className="word_layout">
        <p className="word_layout_genre"></p>
      </div>
      <div className="card_layout">
        {dataLists.map((data) => (
          <Card
            key={data.id} // Don't forget to provide a unique 'key' for each element in a list
            style={{ width: "18rem" }}
            className="card_layout_bgcolor"
            onMouseEnter={() =>
              setCards(
                dataLists.map((c) =>
                  c.id === data.id ? { ...c, isHovered: true } : c
                )
              )
            }
            onMouseLeave={() =>
              setCards(
                data.map((c) =>
                  c.id === data.id ? { ...c, isHovered: false } : c
                )
              )
            }
          >
            <div className="image-container">
              <div className={`base-image ${data.isHovered ? "dimmed" : ""}`}>
                <Card.Img
                  variant="bottom"
                  src={data.pictures}
                  className="card_img_genre"
                />
              </div>
              {data.isHovered && (
                <div className="overlay-image">
                  <Card.Img
                    variant="top"
                    src={data.hoverImage}
                    className="hover-image"
                  />
                </div>
              )}
            </div>
            <Card.Body>
              <Card.Title style={{ justifyContent: "center", color: "white" }}>
                {data.names}
              </Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Randomizer;
