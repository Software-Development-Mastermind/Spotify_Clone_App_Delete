import React from "react";
import { Card } from "react-bootstrap";
import HipHop from "../../Images/Hip_Hop.jpg";
import Jazz from "../../Images/Jazz.jpg";
import Metal from "../../Images/Metal.jpg";
import Pop from "../../Images/Pop.jpg";

function Musicbar() {
  return (
    <div className="background_color_gradient">
      <div className="word_layout">
        <p className="word_layout_genre">Genres</p>
      </div>
      <div className="card_layout">
        <Card style={{ width: "18rem", backgroundColor: "dimgray" }}>
          <Card.Img variant="top" src={HipHop} />
          <Card.Body>
            <Card.Title className="justify-content: center">Hip Hop</Card.Title>
            <Card.Text>
              Dive into the vibrant beats of Hip Hop, where expressive lyrics
              and pulsating rhythms weave an unmistakable urban narrative
            </Card.Text>
            {/* Add more Card subcomponents as needed */}
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={Jazz} className="image_height" />
          <Card.Body>
            <Card.Title className="justify-content: center">Jazz</Card.Title>
            <Card.Text>
              Experience the timeless essence of improvisation and syncopated
              rhythms that breathe life into the soulful world of Jazz.
            </Card.Text>
            {/* Add more Card subcomponents as needed */}
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={Metal} className="image_height" />
          <Card.Body>
            <Card.Title className="justify-content: center">Metal</Card.Title>
            <Card.Text>
              Feel the intensity of Metal, a genre that combines powerful vocals
              and aggressive guitars to create a soundscape that's as relentless
              as it is passionate.
            </Card.Text>
            {/* Add more Card subcomponents as needed */}
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={Pop} />
          <Card.Body>
            <Card.Title className="justify-content: center">Pop</Card.Title>
            <Card.Text>
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
