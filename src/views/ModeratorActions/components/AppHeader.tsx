import React from "react";
import {
  Header,
  Flex,
  HomeButton,
  LogoType
} from "brainly-style-guide";
import locales from "@locales";

export default class AppHeader extends React.Component {
  render() {
    return (
      <Header fixed={true} withDivider={true}>
        <Flex margin="s" justifyContent="space-between" alignItems="center">
          <HomeButton href="/" type={locales.marketName as LogoType} />
        </Flex>
      </Header>
    )
  }
}