import React from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import playbtn from "../../Icons/play-button.png";

function SearchBarResults({ searchResults, config }) {
  console.log("searchResults:", searchResults);
  console.log("Config", config);
  const [singers, setSingers] = useState([
    {
      id: 1,
      isHovered: false,
      image: searchResults ? searchResults[config?.imageField] : null,
      name: searchResults ? searchResults[config?.titleField] : null,
      hoverImage: playbtn,
    },
  ]);
  if (searchResults || config) {
    return (
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
                  src={searchResults[config?.imageField]}
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
              <div>
                <li>
                  <a
                    href={searchResults[config?.linkField]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ul
                      className="d-flex flex-row justify-content-center fs-1"
                      style={{ marginRight: "11%" }}
                    >
                      <p className="d-flex align-items-center mt-1, text-white">
                        {searchResults[config?.titleField]}
                      </p>
                    </ul>
                  </a>
                </li>
              </div>
              <Card.Title style={{ justifyContent: "center", color: "white" }}>
                {singer.name}
              </Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

export default SearchBarResults;
