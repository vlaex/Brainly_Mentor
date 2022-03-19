/* eslint-disable react/jsx-key */
import React from "react";
import { Spinner } from "brainly-style-guide";
import { createPortal } from "react-dom";
import { runtime } from "webextension-polyfill";

import { Flex, Headline, Icon, Button, ContentBox, Media, Avatar, Link } from "brainly-style-guide";

import OverlayContainer from "./OverlayContainer";

type InspectionModeProps = {
  taskId: number;
  onClose: () => void;
}

type InspectionModeState = {
  error?: string;
  loading: boolean;
}

export default class InspectionMode extends React.Component<
  InspectionModeProps,
  InspectionModeState
> {
  private data: {
    task: unknown;
  };
  
  constructor(props: InspectionModeProps) {
    super(props);

    this.state = {loading: true};
    this.RenderTask();
  }

  private async RenderTask() {
    try {
      const data = await fetch(`/api/28/api_tasks/main_view/${this.props.taskId}`)
        .then(r => r.json());
      this.data = data;

      console.debug(data);
    } catch (err) {
      this.setState({ error: err.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  private CloseModal() {
    this.props.onClose();
  }

  render() {
    const modalRoot = document.getElementById("inspection-mode-modal-container");

    if (this.state.loading) {
      return createPortal(
        <OverlayContainer>
          <Spinner />
        </OverlayContainer>,
        modalRoot
      );
    }

    return createPortal(
      <OverlayContainer>
        <Button className="close-modal-button" onClick={this.CloseModal.bind(this)} type="transparent" iconOnly icon={<Icon type="close" />} />
        {this.state.error ? 
          <Flex direction="column" className="error-container-with-image">
            <img src={runtime.getURL("assets/loading-cat.gif")} />
            <Headline extraBold size="medium" color="text-red-60">{this.state.error}</Headline>
          </Flex> :
          <div>
            <iframe src={`/question/${this.props.taskId}`} className="question-frame"></iframe>
          </div>
        }
      </OverlayContainer>,
      modalRoot
    );
  }
}