import React from "react";
import {
  Card,
  Flex,
  Button,
  CardHole,
  Link,
  Text,
  Icon
} from "brainly-style-guide";

import { Action } from "@typings";
import locales from "@locales";

type ActionState = {
  approved: boolean;
  disapproved: boolean;
}

export default class ActionContainer extends React.Component<
  {data: Action},
  ActionState
> {
  state: ActionState = {
    approved: this.props.data.approved,
    disapproved: this.props.data.disapproved
  };

  render() {
    const action = this.props.data;

    return (
      <Card padding="padding-small" className={
        "Action" + 
        (this.state.approved ? " Action-Approved" : 
          this.state.disapproved ? " Action-Disapproved" : "")
      } data-hash={action.hash}>
        <CardHole>
          <Flex justifyContent="space-between" alignItems="center">
            <Link href={action.taskLink} target="_blank">
              <Icon title={action.localizedType} type={action.icon as any} size={32} color="icon-red-50"></Icon>
            </Link>
            <Flex direction="column" marginLeft="xs">
              <Link href={action.taskLink} target="_blank" className="sg-text sg-text--bold">{action.localizedType}</Link>
              <Text size="small">{action.reasonShort}</Text>
            </Flex>
            <Flex className="Action-Operations">
              <Button onClick={
                () => this.setState({approved: true})
              } title={locales.messages.approveAction} size="s" type="solid-mint" icon={<Icon type="thumb_up" color="adaptive" size={16} />} iconOnly className="approve-action"></Button>
              <Button onClick={
                () => this.setState({disapproved: true})
              } title={locales.messages.disapproveAction} size="s" type="solid" icon={<Icon type="thumb_down" color="adaptive" size={16} />} iconOnly className="disapprove-action"></Button>
              <Button onClick={
                () => this.setState({disapproved: false, approved: false})
              } title={locales.messages.revertAction} size="s" type="solid-inverted" icon={<Icon type="reload" color="adaptive" size={16} />} iconOnly className="revert-action"></Button>
            </Flex>
          </Flex>
          <Text size="small" type="div" className="Action-Content">{action.content}</Text>
        </CardHole>
        {action.reason && <CardHole color="gray-20">
          <Text size="small" type="div" className="Action-Reason">{action.reason}</Text>
        </CardHole>}
        <CardHole>
          <Flex justifyContent="space-between" alignItems="center">
            <Link href={`/users/redirect_user/${action.user.id}`} size="small" className="sg-text--bold sg-text Action-ProfileLink">{action.user.nick}</Link>
            <Flex alignItems="center">
              <Icon type="calendar" size={24} color="icon-gray-50"></Icon>
              <Text color="text-gray-70" size="small" className="sg-flex--margin-left-xxs Action-Date">{action.beautifiedDate}</Text>
            </Flex>
          </Flex>
        </CardHole>
      </Card>
    );
  }
}