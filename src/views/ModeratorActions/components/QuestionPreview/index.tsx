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
import QuestionLog from "../Log";

import type { QuestionData, User } from "@typings/brainly";
import locales from "@locales";
import BrainlyApi from "@lib/api/brainly";

type QuestionPreviewProps = {
  taskId: number;
  onClose: () => void;
}

type QuestionPreviewState = {
  error?: string;
  loading: boolean;
  data?: QuestionData;
  usersData?: User[];
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
      const data = await BrainlyApi.GetQuestion(this.props.taskId);
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
        <div className="overlay">
          <div className="overlay-container">
            {this.state.loading ?
              <Spinner /> :
              <Flex direction="column" className="error-container">
                <Headline>{this.state.error}</Headline>
                <Button onClick={this.CloseModal.bind(this)} type="outline" toggle="blue">
                  {locales.common.close}
                </Button>
              </Flex>
            }
          </div>
        </div>,
        modalRoot
      );
    }

    return createPortal(
      <div className="overlay">
        <div className="overlay-container">
          <Flex direction="column" fullHeight>
            <Flex fullWidth justifyContent="space-between"className="question-preview-header">
              <Flex fullWidth alignItems="center">
                <Link color="text-black" target="_blank" href={`${locales.taskPath}/${data.task.id}`}>{locales.common.question}</Link>
                <Text color="text-gray-70" size="small">
                  <b>{locales.subjects.find(subject => subject.id === data.task.subject_id)?.name} </b> 
                  • {data.task.points.ptsForTask} {locales.common.pts}
                </Text>
              </Flex>
              <Button className="close-modal-button" onClick={this.CloseModal.bind(this)} type="transparent" iconOnly icon={<Icon color="icon-black" type="close" />} />
            </Flex>
            <Flex direction="column">
              {[data.task, ...data.responses].map(x => 
                <ContentBox
                  key={x.id}
                  users={usersData} 
                  task={{ id: data.task.id, deleted: data.task.settings.is_deleted }} 
                  data={x}
                />
              )}
            </Flex>
          </Flex>
        </div>
        <QuestionLog questionId={data.task.id} />
      </div>,
      modalRoot
    );
  }
}