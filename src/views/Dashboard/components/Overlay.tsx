import React from "react";
import { Box, Button, Icon } from "brainly-style-guide";

import locales from "@locales";
import { HideElement } from "@utils/ElementsVisibility";

export default class Overlay extends React.Component<{ children: React.ReactNode }> {
  render() {
    return (
      <Box color="white" border={false} shadow className="overlay-container mentees-dashboard">
        <Button className="close-modal-button" title={locales.common.close} onClick={Overlay.CloseOverlay} icon={<Icon type="close" size={24} />} type="transparent" iconOnly />
        {this.props.children}
      </Box>
    );
  }

  private static CloseOverlay() {
    HideElement(document.querySelector(".overlay"));
    document.body.style.overflow = "auto";
  }
}