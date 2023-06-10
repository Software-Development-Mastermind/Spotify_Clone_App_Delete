import React, { useState, useEffect } from "react";

function ArtistList({ genrelists }) {
  const [cards, setCards] = useState(genrelists);

  useEffect(() => {
    setCards(genrelists);
  }, [genrelists]);

  return (
    <div className="background_color_gradient">
      <div className="word_layout">
        <p className="word_layout_genre">Genres</p>
      </div>
      <div className="card_layout" onClick={GetGenre}>
        {cards.map((card, index) => (
          <Card
            key={index} // Don't forget to provide a unique 'key' for each element in a list
            style={{ width: "18rem" }}
            className="card_layout_bgcolor"
            onMouseEnter={() =>
              setCards(
                cards.map((c, i) =>
                  i === index ? { ...c, isHovered: true } : c
                )
              )
            }
            onMouseLeave={() =>
              setCards(
                cards.map((c, i) =>
                  i === index ? { ...c, isHovered: false } : c
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
                    src={card.hoverImage} // make sure to provide hover image from your api response if it exists
                    className="hover-image"
                  />
                </div>
              )}
            </div>
            <Card.Body>
              <Card.Title style={{ justifyContent: "center", color: "white" }}>
                {card.name}
              </Card.Title>
              <Card.Text className="text_alter">
                Popularity: {card.popularity}, Followers: {card.followers}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ArtistList;
