import React from "react";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import HipHop from "../../Images/Hip_Hop.jpg";
import Jazz from "../../Images/Jazz.jpg";
import Metal from "../../Images/Metal.jpg";
import Pop from "../../Images/Pop.jpg";
import playbtn from "../../Icons/play-button.png";
import axios from "axios";

function Musicbar() {
  const [cards, setCards] = useState([
    {
      id: 1,
      isHovered: false,
      image: HipHop,
      hoverImage: playbtn,
      genre: "Hip Hop",
      description:
        "Dive into the vibrant beats of Hip Hop, where expressive lyrics and pulsating rhythms weave an unmistakable urban narrative",
    },
    {
      id: 2,
      isHovered: false,
      image: Jazz,
      hoverImage: playbtn,
      genre: "Jazz",
      description:
        "Experience the timeless essence of improvisation and syncopated rhythms that breathe life into the soulful world of Jazz.",
    },
    {
      id: 3,
      isHovered: false,
      image: Metal,
      hoverImage: playbtn,
      genre: "Metal",
      description:
        "Feel the intensity of Metal, a genre that combines powerful vocals and aggressive guitars to create a soundscape that's as relentless as it is passionate.",
    },
    {
      id: 4,
      isHovered: false,
      image: Pop,
      hoverImage: playbtn,
      genre: "Pop",
      description:
        "Immerse yourself in the infectious rhythms of Pop, where catchy melodies and contemporary styles make you move to the beat.",
    },
  ]);

  const GetGenre = () => {
    const [genres, setGenres] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.post("/genre");
        setGenres(response.data);
      };

      fetchData();
    }, []);

    if (!genres) {
      return "Loading...";
    }
  };
  return (
    <div className="background_color_gradient">
      <div className="word_layout">
        <p className="word_layout_genre">Genres</p>
      </div>
      <div className="card_layout" onClick={GetGenre}>
        {cards.map((card) => (
          <Card
            key={card.id} // Don't forget to provide a unique 'key' for each element in a list
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

export default Musicbar;
