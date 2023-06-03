import React from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import HipHop from "../../Images/Hip_Hop.jpg";
import Jazz from "../../Images/Jazz.jpg";
import Metal from "../../Images/Metal.jpg";
import Pop from "../../Images/Pop.jpg";
import playbtn from "../../Icons/play-button.png";

function Musicbar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="background_color_gradient">
      <div className="word_layout">
        <p className="word_layout_genre">Genres</p>
      </div>
      <div className="card_layout">
        <Card
          style={{ width: "18rem" }}
          className="card_layout_bgcolor"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="image-container">
            <div className={`base-image ${isHovered ? "dimmed" : ""}`}>
              <Card.Img
                variant="bottom"
                src={HipHop}
                className="card_img_genre"
              />
            </div>
            {isHovered && (
              <div className="overlay-image">
                <Card.Img variant="top" src={playbtn} className="hover-image" />
              </div>
            )}
          </div>
          <Card.Body>
            <Card.Title className="justify-content: center; text-white">
              Hip Hop
            </Card.Title>
            <Card.Text className="text_alter">
              Dive into the vibrant beats of Hip Hop, where expressive lyrics
              and pulsating rhythms weave an unmistakable urban narrative
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }} className="card_layout_bgcolor">
          <Card.Img
            variant="top"
            src={Jazz}
            className="image_height; card_img_genre"
          />
          <Card.Body>
            <Card.Title className="justify-content: center; text-white">
              Jazz
            </Card.Title>
            <Card.Text className="text_alter">
              Experience the timeless essence of improvisation and syncopated
              rhythms that breathe life into the soulful world of Jazz.
            </Card.Text>
            {/* Add more Card subcomponents as needed */}
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }} className="card_layout_bgcolor">
          <Card.Img
            variant="top"
            src={Metal}
            className="image_height; card_img_genre"
          />
          <Card.Body>
            <Card.Title className="justify-content: center; text-white">
              Metal
            </Card.Title>
            <Card.Text className="text_alter">
              Feel the intensity of Metal, a genre that combines powerful vocals
              and aggressive guitars to create a soundscape that's as relentless
              as it is passionate.
            </Card.Text>
            {/* Add more Card subcomponents as needed */}
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }} className="card_layout_bgcolor">
          <Card.Img variant="top" src={Pop} className="card_img_genre" />
          <Card.Body>
            <Card.Title className="justify-content: center; text-white">
              Pop
            </Card.Title>
            <Card.Text className="text_alter">
              Immerse yourself in the infectious rhythms of Pop, where catchy
              melodies and contemporary styles make you move to the beat.
            </Card.Text>
            {/* Add more Card subcomponents as needed */}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Musicbar;
