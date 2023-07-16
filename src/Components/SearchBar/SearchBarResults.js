import React from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import playbtn from "../../Icons/play-button.png";

function SearchBarResults(searchResults, config) {
  const [singers, setSingers] = useState([
    {
      id: 1,
      isHovered: false,
      image: searchResults[config?.imageField],
      name: searchResults[config?.titleField],
      hoverImage: playbtn,
    },
  ]);
  return (
    <div className="background_color_gradient">
      <div className="card_layout">
        {singers.map((singer) => (
          <Card
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
      <div>
        <li>
          <a
            href={searchResults[config?.linkField]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ul className="d-flex flex-row">
              <img
                className="top_track_image_size"
                style={{ marginRight: "2%", marginLeft: "2%" }}
                src={searchResults[config?.imageField]}
              />
              <p className="d-flex align-items-center mt-1, text-white">
                {searchResults[config?.titleField]}
              </p>
            </ul>
          </a>
        </li>
      </div>
    </div>
  );
}

export default SearchBarResults;
