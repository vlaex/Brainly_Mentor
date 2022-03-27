import React from "react";
import {
  Flex,
  Button,
  Link,
  Text,
  Icon,
  Box,
  Avatar
} from "brainly-style-guide";

import Tooltip from "./Tooltip";
import _API from "@lib/api/extension";
import { Flash } from "@utils/Flashes";
import BeautifyISO from "@utils/BeautifyISODate";

import type { Action } from "@typings";
import ReplaceLatexWithURL from "@utils/ReplaceTextWithLinks";

import QuestionPreview from "./QuestionPreview";
import Warns from "./Warns";

export default class ActionContainer extends React.Component<{
  data: Action,
  moderator: number;
  page: number;
}> {
  state = {
    reviewStatus: this.props.data.reviewStatus,
    loading: false,
    reasonTooltipVisible: false,
    warnsVisible: false,
    showQuestionPreview: false
  };

  private async ReviewAction(status: Action["reviewStatus"]) {
    this.setState({ loading: true });

    let hash = this.props.data.hash;

    await _API.ReviewActions(hash, this.props.moderator, status)
      .then(() => this.setState({ reviewStatus: status }))
      .catch(err => {
        Flash({
          type: "error",
          text: err.message
        });
      })
      .finally(() => this.setState({ loading: false }));
  }

  private ShowQuestionPreview() {
    this.setState({ showQuestionPreview: true });
  }

  render() {
    let action = this.props.data;

    let boxClasses = [
      "grid-item", "action",
      `Action-ReviewStatus-${this.state.reviewStatus}`,
      `Action-ContentType-${action.contentType}`,
      `Action-Type-${action.type}`,
      `Action-DeleteReason-${action.reason.id}`
    ];

    return (
      <Box color="white" padding="s" className={boxClasses.join(" ")}>
        <Flex alignItems="center" className="sg-flex--relative">
          <Link href={action.task.link} target="_blank">
            <Icon title={action.localizedType} type={action.icon} size={24} color={action.iconColor}/>
          </Link>
          <Link
            onMouseEnter={_ => this.setState({ reasonTooltipVisible: true })}
            onMouseLeave={_ => this.setState({ reasonTooltipVisible: false })}
            href={action.task.link}
            target="_blank"
            className="action-type">{action.localizedType}
          </Link>

          {action.reason.fullText &&
            <Tooltip visible={this.state.reasonTooltipVisible}>
              <span>{action.reason.fullText}</span>
            </Tooltip>
          }
          {this.state.showQuestionPreview &&
            <QuestionPreview
              taskId={action.task.id}
              onClose={() => this.setState({ showQuestionPreview: false })}
            />
          }

          <Flex className="action-operations" disabled={this.state.loading}>
            <Button onClick={this.ReviewAction.bind(this, "APPROVED")} className="approve-action" type="transparent" iconOnly icon={<Icon type="thumb_up" color="icon-green-50" size={24} />} />
            <Button onClick={this.ShowQuestionPreview.bind(this)} type="transparent" iconOnly icon={<Icon type="seen" size={24} color="icon-gray-70" />} />
            <Button onClick={this.ReviewAction.bind(this, "DISAPPROVED")} className="disapprove-action" type="transparent" iconOnly icon={<Icon type="thumb_down" color="icon-red-50" size={24} />} />
            <Button onClick={this.ReviewAction.bind(this, "NONE")} className="revert-action" type="solid-inverted" iconOnly icon={<Icon type="reload" color="icon-black" size={24} />} />
          </Flex>
        </Flex>
        <div className="action-content">
          <Text size="small" type="div" breakWords={true} dangerouslySetInnerHTML={{
            __html: ReplaceLatexWithURL(action.content)
          }} />
        </div>
        <Flex 
          justifyContent="space-between" 
          alignItems="center" 
          className="sg-flex--margin-top-auto sg-flex--relative"
          onMouseEnter={_ => this.setState({ warnsVisible: true })}
          onMouseLeave={_ => this.setState({ warnsVisible: false })}
        >
          <Link
            href={`/users/redirect_user/${action.user.id}`} target="_blank">
            <Flex alignItems="center" className={action.user.isModerator ? "user-is-moderator user" : "user"}>
              <Avatar imgSrc={action.user.avatar} size="xs" />
              <Text size="small" weight="bold" className="sg-flex--margin-left-xs">{action.user.nick}</Text>
            </Flex>
          </Link>

          {this.state.warnsVisible && <Warns
            key={action.hash}
            onMouseEnter={_ => this.setState({ warnsVisible: true })}
            onMouseOut={_ => this.setState({ warnsVisible: false })}
            userId={action.user.id} />}

          <Flex alignItems="center" className="action-date-container">
            <Icon type="counter" color="icon-gray-50" size={16} />
            <Text data-date={action.date} weight="bold" size="xsmall" color="text-gray-70" className="sg-flex--margin-left-xxs">
              {BeautifyISO(action.date)}
            </Text>
          </Flex>
        </Flex>
      </Box>
    );
  }

}