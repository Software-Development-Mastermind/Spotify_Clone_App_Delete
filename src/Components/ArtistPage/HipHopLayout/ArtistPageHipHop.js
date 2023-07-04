import React from "react";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import playbtn from "../../../Icons/play-button.png";
import jayz from "../../../Images/jayz.jpg";
import iceCube from "../../../Images/ice_cube.jpg";
import travisScott from "../../../Images/travis_scott.jpg";
import kdot from "../../../Images/kdot.jpg";
import axios from "axios";

function ArtistPageHipHop() {
  const [singers, setSingers] = useState([
    {
      id: 1,
      isHovered: false,
      image: jayz,
      name: "JAY-Z",
      hoverImage: playbtn,
    },
    {
      id: 2,
      isHovered: false,
      image: iceCube,
      name: "Ice Cube",
      hoverImage: playbtn,
    },
    {
      id: 3,
      isHovered: false,
      image: travisScott,
      name: "Travis Scott",
      hoverImage: playbtn,
    },
    {
      id: 4,
      isHovered: false,
      image: kdot,
      name: "Kendrick Lamar",
      hoverImage: playbtn,
    },
  ]);

  const [fetchData, setFetchData] = useState(false);

  const [genres, setGenres] = useState(null);

  useEffect(() => {
    if (!fetchData) return;
    const getData = async () => {
      const response = await axios.get(`/artist?artist_name=${fetchData}`);
      setGenres(response.data);
      setFetchData(false);
    };

    getData();
  }, [fetchData]);

  const handleOnClick = (artist_name) => {
    setFetchData(artist_name);
  };

  return (
    <div className="background_color_gradient">
      <div className="word_layout">
        <p className="word_layout_genre">Hip Hop</p>
      </div>
      <div className="card_layout" onClick={handleOnClick}>
        {singers.map((singer) => (
          <Card
            key={singer.id} // Don't forget to provide a unique 'key' for each element in a list
            style={{ width: "18rem" }}
            className="card_layout_bgcolor"
            onClick={() => handleOnClick(singer.name)}
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

export default ArtistPageHipHop;
