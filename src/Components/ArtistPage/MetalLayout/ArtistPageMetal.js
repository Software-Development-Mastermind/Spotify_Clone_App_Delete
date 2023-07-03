import React from "react";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import playbtn from "../../../Icons/play-button.png";
import Metallica from "../../../Images/Metallica.jpg";
import Gojira from "../../../Images/Gojira.jpg";
import Korn from "../../../Images/Korn.jpg";
import Vildhjarta from "../../../Images/Vildhjarta.jpg";

function ArtistPageMetal() {
  const [singers, setSingers] = useState([
    {
      id: 1,
      isHovered: false,
      image: Metallica,
      name: "Metallica",
      hoverImage: playbtn,
    },
    {
      id: 2,
      isHovered: false,
      image: Gojira,
      name: "Gojira",
      hoverImage: playbtn,
    },
    {
      id: 3,
      isHovered: false,
      image: Korn,
      name: "Korn",
      hoverImage: playbtn,
    },
    {
      id: 4,
      isHovered: false,
      image: Vildhjarta,
      name: "Vildhjarta",
      hoverImage: playbtn,
    },
  ]);

  const [fetchData, setFetchData] = useState(false);

  const handleOnClick = () => {
    setFetchData(true);
  };

  return (
    <div className="background_color_gradient">
      <div className="word_layout">
        <p className="word_layout_genre">Metal</p>
      </div>
      <div className="card_layout" onClick={handleOnClick}>
        {singers.map((singer) => (
          <Card
            key={singer.id} // Don't forget to provide a unique 'key' for each element in a list
            style={{ width: "18rem" }}
            className="card_layout_bgcolor"
            onMouseEnter={() =>
              setSingers(
                singers.map((c) =>
                  c.id === singer.id ? { ...c, isHovered: true } : c
                )
              )
            }
            onMouseLeave={() =>
              setSingers(
                singers.map((c) =>
                  c.id === singer.id ? { ...c, isHovered: false } : c
                )
              )
            }
          >
            <div className="image-container">
              <div className={`base-image ${singer.isHovered ? "dimmed" : ""}`}>
                <Card.Img
                  variant="bottom"
                  src={singer.image}
                  className="card_img_genre"
                />
              </div>
              {singer.isHovered && (
                <div className="overlay-image">
                  <Card.Img
                    variant="top"
                    src={singer.hoverImage}
                    className="hover-image"
                  />
                </div>
              )}
            </div>
            <Card.Body>
              <Card.Title style={{ justifyContent: "center", color: "white" }}>
                {singer.name}
              </Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ArtistPageMetal;
