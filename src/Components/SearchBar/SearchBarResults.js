import React from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import playbtn from "../../Icons/play-button.png";

function SearchBarResults({ searchResults, config, select_option }) {
  //console.log("searchResults:", searchResults);
  // console.log("Config", config);
  // console.log("Config link", config?.linkField);
  //console.log("select_option", select_option);
  console.log(
    "aritst_link",
    searchResults?.[select_option?.["linkField"]][select_option?.["linkField"]]
  );
  //console.log("select_option.linkfield", searchResults?.artist_page);
  const [singers, setSingers] = useState([
    {
      id: 1,
      isHovered: false,
      image: searchResults ? searchResults[config?.imageField] : null,
      name: searchResults ? searchResults[config?.titleField] : null,
      link: searchResults ? searchResults[config?.linkField] : null,
      hoverImage: playbtn,
    },
  ]);

  if (searchResults || config) {
    return (
      <div className="card_layout">
        {singers.map((singer) => (
          <Card
            style={{
              width: "18rem",
              height: "23rem",
              display: "flex",
              transform: "translate(6rem, 9rem)",
            }}
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
                  src={searchResults[select_option.imageField]}
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
                    href={
                      searchResults?.[select_option?.["linkField"]][
                        select_option?.["linkField"]
                      ]
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <ul
                      className="d-flex flex-row justify-content-center fs-1"
                      style={{
                        marginRight: "11%",
                        transform: "translate(0px, 70px)",
                        textAlign: "center",
                      }}
                    >
                      <p className="d-flex align-items-center mt-1, text-white">
                        {searchResults[select_option.titleField]}
                      </p>
                    </ul>
                  </a>
                </li>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

export default SearchBarResults;
