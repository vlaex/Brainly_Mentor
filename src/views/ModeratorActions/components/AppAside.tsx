import React from "react";
import {
  HomeButton,
  Flex
} from "brainly-style-guide";

import locales from "@locales";

export default class AppAside extends React.Component {
  render() {
    return (
      <Flex className="layout-aside-container" direction="column" alignItems="center">
        <HomeButton href={locales.marketURL} type="brainly-mobile" />
      </Flex>
    )
  }
}