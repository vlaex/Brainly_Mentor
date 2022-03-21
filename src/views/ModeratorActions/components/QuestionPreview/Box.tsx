/* eslint-disable react/jsx-key */
import React from "react";
import {
  Spinner,
  Flex,
  Icon,
  Text,
  Button,
  Link,
  Headline
} from "brainly-style-guide";
import { createPortal } from "react-dom";

import ContentBox from "./ContentBox";
import OverlayContainer from "./OverlayContainer";

import type { QuestionData, UsersData } from "@typings/brainly";
import locales from "@locales";

type QuestionPreviewProps = {
  taskId: number;
  onClose: () => void;
}

type QuestionPreviewState = {
  error?: string;
  loading: boolean;
  data?: QuestionData;
  usersData?: UsersData;
}

export default class QuestionPreview extends React.Component<
  QuestionPreviewProps,
  QuestionPreviewState
> {
  constructor(props: QuestionPreviewProps) {
    super(props);

    this.state = {loading: true};
    this.RenderTask();
  }

  private async RenderTask() {
    try {
      const data = await fetch(`/api/28/api_tasks/main_view/${this.props.taskId}`)
        .then(r => r.json());

      this.setState({
        data: data.data,
        usersData: data.users_data
      });

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
    const modalRoot = document.getElementById("question-preview-modal-container");
    const { data, usersData } = this.state;

    if (!data) {
      return createPortal(
        <OverlayContainer>
          {this.state.loading ?
            <Spinner /> :
            <Flex direction="column" className="error-container">
              <Headline>{this.state.error}</Headline>
              <Button onClick={this.CloseModal.bind(this)} type="outline" toggle="blue">
                {locales.common.close}
              </Button>
            </Flex>
          }
        </OverlayContainer>,
        modalRoot
      );
    }

    return createPortal(
      <OverlayContainer>
        <Flex direction="column" fullHeight>
          <Flex fullWidth justifyContent="space-between"className="question-preview-header">
            <Flex fullWidth alignItems="center">
              <Link color="text-black" target="_blank" href={`${locales.taskPath}/${data.task.id}`}>{locales.common.question}</Link>
              <Text color="text-gray-70" size="small">
                <b>Геометрия</b> • {data.task.points.ptsForTask} {locales.common.pts}
              </Text>
            </Flex>
            <Button className="close-modal-button" onClick={this.CloseModal.bind(this)} type="transparent" iconOnly icon={<Icon color="icon-black" type="close" />} />
          </Flex>
          <ContentBox 
            users={usersData} 
            task={{ id: data.task.id, deleted: data.task.settings.is_deleted }} 
            data={data.task}
          />
        </Flex>
      </OverlayContainer>,
      modalRoot
    );
  }
}