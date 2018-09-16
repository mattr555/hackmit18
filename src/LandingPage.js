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
    </Segment>
  </div>
);

export default LandingPage;
