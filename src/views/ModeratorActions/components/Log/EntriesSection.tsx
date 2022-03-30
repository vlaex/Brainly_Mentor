import React from "react";
import {
  Flex,
  Text,
  Button,
  Icon
} from "brainly-style-guide";
import moment from "moment-timezone";
import locales from "@locales";

import { QuestionLogEntry, User } from "@typings/brainly";
import LogEntry from "./LogEntry";

type EntriesSectionProps = {
  date: string;
  entries: QuestionLogEntry[];
  users: User[];
}

type EntriesSectionState = {
  visible: boolean;
}

export default class EntriesSection extends React.Component<
  EntriesSectionProps, 
  EntriesSectionState
> {
  constructor(props) {
    super(props);

    this.state = { visible: true };
    this.ToggleVisibility = this.ToggleVisibility.bind(this);
  }

  private ToggleVisibility() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    let { date, entries, users } = this.props;

    date = moment(date).tz(locales.timezone, true).format(locales.dateFormat);

    return (
      <Flex direction="column" fullWidth marginBottom="xs">
        <Flex alignItems="center">
          <Text weight="bold" size="small">{date}</Text>
          <Button 
            type="solid-light" 
            iconOnly 
            size="s" 
            icon={<Icon type={this.state.visible ? "arrow_up" : "arrow_down"} size={16} />}
            onClick={this.ToggleVisibility}
          />
        </Flex>
        <Flex direction="column" hidden={!this.state.visible}>
          {entries.map((logEntry, i) => <LogEntry usersData={users} key={i} entry={logEntry} />)}
        </Flex>
      </Flex>
    );
  }
}