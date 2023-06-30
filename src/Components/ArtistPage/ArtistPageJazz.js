import React from "react";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import playbtn from "../../Icons/play-button.png";
import CharlieParker from "../../Images/Charlie_Parker.jpg";
import FrankSinatra from "../../Images/Frank_Sintara.jpg";
import BillieHoliday from "../../Images/Billie_Holiday.jpg";
import LouisArmstrong from "../../Images/Louis_Armstrong.jpg";

function ArtistPageJazz() {
  const [singers, setSingers] = useState([
    {
      id: 1,
      isHovered: false,
      image: CharlieParker,
      name: "CharlieParker",
      hoverImage: playbtn,
    },
    {
      id: 2,
      isHovered: false,
      image: FrankSinatra,
      name: "FrankSinatra",
      hoverImage: playbtn,
    },
    {
      id: 3,
      isHovered: false,
      image: BillieHoliday,
      name: "BillieHoliday",
      hoverImage: playbtn,
    },
    {
      id: 4,
      isHovered: false,
      image: LouisArmstrong,
      name: "LouisArmstrong",
      hoverImage: playbtn,
    },
  ]);

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
                singer.map((c) =>
                  c.id === singer.id ? { ...c, isHovered: true } : c
                )
              )
            }
            onMouseLeave={() =>
              setSingers(
                singer.map((c) =>
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
      {genres && <ArtistList genreslists={genres} />}
    </div>
  );
}

export default ArtistPageJazz;
