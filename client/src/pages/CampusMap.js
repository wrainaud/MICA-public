import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
import MonmouthCampusMap from "../images/MonmouthCampusMap.jpg";
import Zoom from 'react-img-zoom'
const CampusMap = () => {
  return (
    <div>
      <Jumbotron>
        <Container>
          <h1>Campus Map</h1>
          <h3> Hover over map to zoom</h3>
          <p>
           
              <Zoom
             
                img={MonmouthCampusMap}
                zoomScale={2}
                  width={800}
                  height={400}
                  paddingTop={6}
                 
                  transitionTime={1.0}
                alt="#"
              />
           
          </p>

          <p></p>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default CampusMap;
