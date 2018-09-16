import React from "react";
import { Link } from "react-router-dom";
import { Segment, Button } from "semantic-ui-react";

const LandingPage = () => (
  <div>
    <Segment vertical textAlign="center">
      <h1>Modular Tailored Resumes, Fast</h1>
      <Link to="/edit">
        <Button size="huge">Get Started</Button>
      </Link>
      <br />
      <br />
      <img src="landing_photo.jpg" height="50%" width="50%"/>
    </Segment>
  </div>
);

export default LandingPage;
