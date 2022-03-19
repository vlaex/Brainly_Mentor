import React from "react";
import { Box } from "brainly-style-guide";

export default class Overlay extends React.Component<{ children: React.ReactNode }> {
  render() {
    return (
      <Box color="white" border={false} shadow className="overlay-container mentees-dashboard">
        {this.props.children}
      </Box>
    );
  }
}