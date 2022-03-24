/* eslint-disable camelcase */
import React from "react";
import BeautifyISO from "@utils/BeautifyISODate";
import {
  Flex,
  Text,
  Avatar,
  Link,
  Box,
  Icon
} from "brainly-style-guide";

import type { Response, Task, User } from "@typings/brainly";
import locales from "@locales";
import ReplaceLatexWithURL from "@utils/ReplaceLatexWithURL";

type ContentBoxProps = {
  users: User[],
  data: Task | Response;
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
    let isAnswer = typeof data.points === "number";
    let answer = data as Response;

    return (
      <Box color={answer.approved?.date ? "green-20" : "white"} border borderColor="gray-20" className="question-preview-content-box">
        <Flex justifyContent="space-between" className="question-preview-content-box-header">
          <Text size="small" weight="bold">
            {locales.common[isAnswer ? "answer" : "question"]}
          </Text>
          <Text color="text-gray-70" size="small">{BeautifyISO(data.created)}</Text>
          {isAnswer &&
            <Flex alignItems="center">
              <Flex>
                <Icon type="heart" color="icon-red-50" size={16} />
                <Text size="small" weight="bold">{answer.thanks}</Text>
              </Flex>
              {answer.best && <Icon type="crown" color="icon-yellow-50" size={16} />}
            </Flex>
          }
        </Flex>
        <Flex direction="column" className="question-preview-content-box-content" data-is-deleted={!isAnswer && task.deleted}>
          <Flex alignItems="center" className="sg-flex--gap-s">
            <Avatar size="s" imgSrc={user.avatars?.[64]} />
            <Flex direction="column">
              <Link target="_blank" href={`/users/redirect_user/${user.id}`} weight="bold" size="small" color="text-black">{user.nick}</Link>
              <Flex direction="column">
                {user.ranks.names.map((rank, i) => 
                  <Text key={i} size="small" type="span" style={{color: user.ranks.color}}>{rank}</Text>
                )}
              </Flex>
            </Flex>
          </Flex>
          <Text className="sg-flex--margin-top-s" size="small" dangerouslySetInnerHTML={{
            __html: ReplaceLatexWithURL(data.content)
          }} />
          {!!data.attachments.length &&
            <Flex marginTop="s" alignItems="center" className="question-preview-content-box-attachments">
              <a target="_blank" href={data.attachments[0].full} rel="noreferrer" style={{margin: "auto"}}>
                <img src={data.attachments[0].full} style={{ width: "200px", height: "auto" }} />
              </a>
            </Flex>
          }
        </Flex>
        {data.settings.is_marked_abuse && 
          <Icon className="question-preview-report-flag" type="report_flag" color="icon-red-50" size={32} />
        }
      </Box>
    );
  }
}