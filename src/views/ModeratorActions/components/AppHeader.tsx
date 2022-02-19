import React from "react";
import {
  Header,
  Flex,
  HomeButton
} from "brainly-style-guide";

export default class AppHeader extends React.Component {
  render() {
    return (
      <Header fixed={true} withDivider={true}>
        <Flex margin="s" justifyContent="space-between" alignItems="center">
          <HomeButton href="/" type="znanija" />
        </Flex>
      </Header>
    )
  }
}