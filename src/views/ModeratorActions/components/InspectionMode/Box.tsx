/* eslint-disable react/jsx-key */
import React from "react";
import {
  Header,
  HeaderContainer,
  HeaderContent,
  HeaderLeft, HeaderRight,
  Spinner,
  TopLayer,
  Flex,
  Headline,
  Icon,
  Text,
  Button,
  ContentBox,
  Media,
  Avatar,
  Link, HeaderMiddle, Box, SeparatorHorizontal
} from "brainly-style-guide";

import { createPortal } from "react-dom";
import { runtime } from "webextension-polyfill";


import OverlayContainer from "./OverlayContainer";
import BeautifyISO from "@utils/BeautifyISODate";

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

    } catch (err) {
      this.setState({ error: err.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  private CloseModal() {
    this.props.onClose();
  }

  private renderTaskSection() {
    return <Box padding="s">
      {InspectionMode.renderViewProfileBox(this.data["users_data"][0])}
      <Box className="task-content">{this.data["data"]["task"]["content"]}</Box>
    </Box>;
  }

  private renderAnswerSection(answer) {
    return <><SeparatorHorizontal/><Text weight="bold">Ответ ▪ опубликован Сегодня, 20:01:53</Text><SeparatorHorizontal/><Box
        padding="s">
      {InspectionMode.renderViewProfileBox(this.data["users_data"][1])}
      <Box className="task-content">{answer["content"]}</Box>
    </Box></>;
  }

  private static renderViewProfileBox(user) {
    return <Flex justifyContent="space-between" alignItems="center" className="sg-flex--margin-top-auto">
      <Flex alignItems="center">
        <Avatar imgSrc={user["avatar"]["64"]} size="m" />
        <div className="user-data">
          <Link href={`/users/redirect_user/${user["id"]}`} target="_blank"><Text size="small" weight="bold" className="sg-flex--margin-left-xs">{user["nick"]}</Text></Link>
          <Text size="small" className="sg-flex--margin-left-xs">Предупреджений: 1</Text>
        </div>
      </Flex>
    </Flex>;
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
    console.log(this.data);

    return createPortal(
      <OverlayContainer>
        <Header>
          <HeaderContainer>
            <HeaderContent autoHeight>
              <HeaderLeft><Text>Вопрос <Link as="a" target="_blank" href={"/task/" + this.data["data"]["task"]["id"]}>#{this.data["data"]["task"]["id"]}</Link></Text></HeaderLeft>
              <HeaderMiddle><Text>Геометрия ▪ задан Сегодня, 20:01:53</Text></HeaderMiddle>
              <HeaderRight><Button className="close-modal-button" onClick={this.CloseModal.bind(this)} type="solid" size="s" iconOnly icon={<Icon type="close" />} /></HeaderRight>
            </HeaderContent>
            </HeaderContainer>
        </Header>
        <SeparatorHorizontal/>
        <Text weight="bold">Вопрос</Text>
        <SeparatorHorizontal/>
        {this.renderTaskSection()}
        {this.renderAnswerSection(this.data["data"]["responses"][0])}
      </OverlayContainer>,
      modalRoot
    );
  }
}