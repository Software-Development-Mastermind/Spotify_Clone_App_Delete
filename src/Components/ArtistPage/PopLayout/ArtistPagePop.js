import React from "react";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import playbtn from "../../Icons/play-button.png";
import LadyGaga from "../../Images/Lady_Gaga.jpg";
import MichaelJackson from "../../Images/Michael_Jackson.jpeg";
import ColdPlay from "../../Images/Coldplay.jpg";
import Rhianna from "../../Images/Rhianna.jpg";

function ArtistPagePop() {
  const [singers, setSingers] = useState([
    {
      id: 1,
      isHovered: false,
      image: LadyGaga,
      name: "LadyGaga",
      hoverImage: playbtn,
    },
    {
      id: 2,
      isHovered: false,
      image: MichaelJackson,
      name: "MichaelJackson",
      hoverImage: playbtn,
    },
    {
      id: 3,
      isHovered: false,
      image: ColdPlay,
      name: "ColdPlay",
      hoverImage: playbtn,
    },
    {
      id: 4,
      isHovered: false,
      image: Rhianna,
      name: "Rhianna",
      hoverImage: playbtn,
    },
  ]);

  const [fetchData, setFetchData] = useState(false);

  const handleOnClick = () => {
    setFetchData(true);
  };

  return (
    <div className="background_color_gradient">
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

export default ArtistPagePop;
