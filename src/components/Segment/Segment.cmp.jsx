import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import "./Segment.style.scss";
const SegmentCmp = () => {
  return (
    <Segment placeholder className="segment-container">
      <Header icon>
        <Icon name="heart" className="segment-icon"/>
        No Favorite Cities Yet
      </Header>
      <Link to={"./"}>
        <Button basic color="teal">
          Search For Cities
        </Button>
      </Link>
    </Segment>
  );
};

export default SegmentCmp;
