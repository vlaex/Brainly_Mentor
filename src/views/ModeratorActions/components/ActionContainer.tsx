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

import { Action } from "@typings";
import locales from "@locales";
import moment from "moment";
import _API from "@lib/Api";

export default class ActionContainer extends React.Component<
  {data: Action}
> {
  state = {
    reviewStatus: this.props.data.reviewStatus,
  };

  private async SetReviewStatus(status?: Action["reviewStatus"]) {
    await _API.ReviewAction(this.props.data.hash, status)
      .then(() => this.setState({ reviewStatus: status }))
      .catch((err) => console.error(err));
  }

  render() {
    const action = this.props.data;

    const iconColor = action.type === "ACCEPTED" ? "icon-green-50" :
      action.type === "REPORTED_FOR_CORRECTION" ? "icon-blue-50" : "icon-red-50";

    let date = moment(action.date);
    let dateDiff = moment().diff(date, "days");

    let beautifiedDate = dateDiff > 7 ?
      date.format(locales.dateTimeFormat) :
      `${date.fromNow()}, ${date.format("hh:mm:ss")}`;

    return (
      <Box color="white" padding="s" className={
        "action " + 
        (!this.state.reviewStatus ? "" : `action-${this.state.reviewStatus} `) +
        `Action-ContentType-${action.contentType} ` +
        `Action-Type-${action.type}`
      }>
        <Flex alignItems="center">
          <Link href={action.taskLink} target="_blank">
            <Icon title={action.localizedType} type={action.frontIcon as any} size={32} color={iconColor}></Icon>
          </Link>
          <Link href={action.taskLink} target="_blank" className="sg-text sg-text--bold sg-flex--margin-left-xs">{action.localizedType}</Link>
          <Flex className="action-operations">
            <Button className="approve-action" onClick={() => this.SetReviewStatus("approved")} title={locales.messages.approveAction} type="transparent" iconOnly icon={<Icon type="thumb_up" color="icon-green-50" size={24} />}></Button>
            <Button className="disapprove-action" onClick={() => this.SetReviewStatus("disapproved")} title={locales.messages.disapproveAction} type="transparent" iconOnly icon={<Icon type="thumb_down" color="icon-red-50" size={24} />}></Button>
            <Button className="revert-action" onClick={() => this.SetReviewStatus(null)} title={locales.messages.revertAction} type="solid-inverted" iconOnly icon={<Icon type="reload" color="icon-black" size={24} />}></Button>
          </Flex>
        </Flex>
        <Text size="small" type="div" className="action-content" breakWords={true}>{action.content}</Text>
        <Flex justifyContent="space-between" alignItems="center" className="sg-flex--margin-top-auto">
          <Link href={action.user.link} target="_blank">
            <Flex alignItems="center">
              <Avatar imgSrc={action.user.avatar} size="xs" />
              <Text size="small" weight="bold" className="sg-flex--margin-left-xs">{action.user.nick}</Text>
            </Flex>
          </Link>
          <Flex alignItems="center" className="action-date-container">
            <Icon type="counter" color="icon-gray-50" size={16} />
            <Text title={action.date} weight="bold" size="xsmall" color="text-gray-70" className="sg-flex--margin-left-xxs">
              {beautifiedDate}
            </Text>
          </Flex>
        </Flex>
      </Box>
    );
  }
}