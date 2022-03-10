import React from "react";
import {
  Flex,
  Button,
  Link,
  Text,
  Icon,
  Box,
  Avatar,
} from "brainly-style-guide";

import Tooltip from "./Tooltip";
import locales from "@locales";
import _API from "@lib/Api";
import { Flash } from "@utils/Flashes";
import BeautifyISO from "@utils/BeautifyISODate";

import type { IconPropsType, IconType } from "brainly-style-guide";
import type { Action } from "@typings";

export default class ActionContainer extends React.Component<{
  data: Action,
  moderator: number;
  page: number;
}> {
  state = {
    reviewStatus: this.props.data.reviewStatus,
    loading: false,
    reasonTooltipVisible: false
  }

  private async ReviewAction(status: Action["reviewStatus"]) {
    this.setState({ loading: true });

    await _API.ReviewAction({
      userId: this.props.moderator,
      pageId: this.props.page,
      id: this.props.data.id,
      status
    })
      .then(() => this.setState({ reviewStatus: status }))
      .catch(err => {
        Flash({
          type: "error",
          text: err.message
        });
      })
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const action = this.props.data;

    const iconColor: IconPropsType["color"] = action.type === "ACCEPTED" ? "icon-green-50" :
      action.type === "REPORTED_FOR_CORRECTION" ? "icon-blue-50" : 
      `icon-${action.contentType === "answer" ? "blue" : "indigo"}-50`;

    return (
      <Box color="white" padding="s" className={
        "action " +
        `Action-ReviewStatus-${this.state.reviewStatus} ` +
        `Action-ContentType-${action.contentType} ` +
        `Action-Type-${action.type} ` + 
        `Action-DeleteReason-${action.reason.id}`
      }>
        <Flex alignItems="center" className="sg-flex--relative">
          <Link href={action.taskLink} target="_blank">
            <Icon title={action.localizedType} type={action.frontIcon as IconType} size={24} color={iconColor}></Icon>
          </Link>
          <Link 
            onMouseEnter={() => this.setState({ reasonTooltipVisible: true })} 
            onMouseLeave={() => this.setState({ reasonTooltipVisible: false })} 
            href={action.taskLink} 
            target="_blank"
            className="action-type">{action.localizedType}
          </Link>

          <Tooltip visible={this.state.reasonTooltipVisible}>
            {action.reason.fullText ?
              <span>{action.reason.fullText}</span> :
              <i>{locales.common.noReason}</i>
            }
          </Tooltip>

          <Flex className="action-operations">
            <Button loading={this.state.loading} onClick={() => this.ReviewAction("APPROVED")} className="approve-action" title={locales.common.approveAction} type="transparent" iconOnly icon={<Icon type="thumb_up" color="icon-green-50" size={24} />}></Button>
            <Button loading={this.state.loading} onClick={() => this.ReviewAction("DISAPPROVED")} className="disapprove-action" title={locales.common.disapproveAction} type="transparent" iconOnly icon={<Icon type="thumb_down" color="icon-red-50" size={24} />}></Button>
            <Button loading={this.state.loading} onClick={() => this.ReviewAction("NONE")} className="revert-action" title={locales.common.revertAction} type="solid-inverted" iconOnly icon={<Icon type="reload" color="icon-black" size={24} />}></Button>
          </Flex>
        </Flex>
        <div className="action-content">
          <Text size="small" type="div" breakWords={true}>{action.content}</Text>
        </div>
        <Flex justifyContent="space-between" alignItems="center" className="sg-flex--margin-top-auto">
          <Link href={`/users/redirect_user/${action.user.id}`} target="_blank">
            <Flex alignItems="center" className={action.isModerator ? "user-is-moderator user" : "user"}>
              <Avatar imgSrc={action.user.avatar} size="xs" />
              <Text size="small" weight="bold" className="sg-flex--margin-left-xs">{action.user.nick}</Text>
            </Flex>
          </Link>
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