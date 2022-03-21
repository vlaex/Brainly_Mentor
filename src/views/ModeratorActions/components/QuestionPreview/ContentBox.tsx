/* eslint-disable camelcase */
import React from "react";
import BeautifyISO from "@utils/BeautifyISODate";
import {
  Flex,
  Text,
  Avatar,
  Link,
  Box
} from "brainly-style-guide";
import type { QuestionData, UsersData } from "@typings/brainly";

type ContentBoxProps = {
  users: UsersData,
  data: QuestionData["task"];
  task: {
    deleted: boolean;
    id: number;
  }
}

export default class ContentBox extends React.Component<ContentBoxProps> {
  constructor(props: ContentBoxProps) {
    super(props);
  }

  private FindUserById(userId: number) {
    return this.props.users.find(user => user.id === userId);
  }

  render() {
    let { data, task } = this.props;

    let user = this.FindUserById(data.user_id);

    return (
      <Flex direction="column">
        <Box color={task.deleted ? "red-20" : "white"} border borderColor="gray-20" className="question-preview-content-box">
          <Flex justifyContent="space-between" className="question-preview-content-box-header">
            <Text size="small" weight="bold">
              Question
            </Text>
            <Text color="text-gray-70" size="small">
              {BeautifyISO(data.created).replace(/\+[\d:]+$/, "")}
            </Text>
          </Flex>
          <Flex direction="column" className="question-preview-content-box-content">
            <Flex alignItems="center" className="sg-flex--gap-s">
              <Avatar size="s" imgSrc={user.avatars?.[64]} />
                <Flex direction="column">
                    <Link weight="bold" size="small" color="text-black">{user.nick}</Link>
                    <Flex direction="column">
                      {user.ranks.names.map((rank, i) => 
                        <Text key={i} size="small" type="span" style={{color: user.ranks.color}}>{rank}</Text>
                      )}
                    </Flex>
                  </Flex>
                </Flex>
                <Text className="sg-flex--margin-top-s" size="small" dangerouslySetInnerHTML={{__html: data.content}} />
              </Flex>
            </Box>
          </Flex>
    );
  }
}