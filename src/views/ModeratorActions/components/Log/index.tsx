import React from "react";
import { Flex, Headline, Spinner, Button, Icon } from "brainly-style-guide";

import locales from "@locales";
import BrainlyApi from "@lib/api/brainly";
import { GetQuestionLogResponse, QuestionLogEntry } from "@typings/brainly";

import EntriesSection from "./EntriesSection";

type QuestionLogProps = {
  questionId: number;
}

type QuestionLogState = {
  hidden: boolean;
  loading: boolean;
  logEntries: {
    [x: string]: QuestionLogEntry[];
  };
  users: GetQuestionLogResponse["users_data"];
}

export default class QuestionLog extends React.Component<
  QuestionLogProps,
  QuestionLogState
> {
  constructor(props: QuestionLogProps) {
    super(props);

    this.state = {
      hidden: !!JSON.parse(localStorage.getItem("questionLogHidden")),
      loading: true,
      logEntries: {},
      users: []
    };

    this.ToggleVisibility = this.ToggleVisibility.bind(this);
    this.FetchLog();
  }

  private ToggleVisibility() {
    let hidden = !this.state.hidden;

    this.setState({ hidden });
    localStorage.setItem("questionLogHidden", JSON.stringify(hidden));
  }

  private async FetchLog() {
    try {
      let data = await BrainlyApi.GetQuestionLog(this.props.questionId);
      let logEntries = data.data;

      let entriesByDate: {
        [x: string]: typeof logEntries
      } = {};
  
      logEntries.forEach(logEntry => {
        let date = logEntry.date;
  
        entriesByDate[date] = (entriesByDate[date] || []).concat(logEntry);
      });

      this.setState({ 
        loading: false, 
        users: data.users_data, 
        logEntries: entriesByDate
      });

    } catch (err) {
      console.error(err);
    }
  }

  render() {
    let { loading, logEntries, users } = this.state;

    return (<>
      <Flex className="question-log" fullHeight data-log-hidden={this.state.hidden}>
        {loading ? <Spinner size="xsmall" /> : <>
          <Flex alignItems="center" className="question-log-header">
            <Button onClick={this.ToggleVisibility} type="outline" iconOnly icon={<Icon type="arrow_left" color="adaptive" size={24} />} />
            <Headline type="h2" size="medium" extraBold color="text-gray-70">{locales.common.questionLog}</Headline>
          </Flex>
          <Flex direction="column" className="question-log-list" fullHeight>
            {Object.keys(logEntries).map((date, i) => 
              <EntriesSection users={users} date={date} key={i} entries={logEntries[date]} />
            )}
          </Flex>
        </>}
      </Flex>
      <Flex onClick={this.ToggleVisibility} alignItems="center" direction="column" className="open-question-log" hidden={!this.state.hidden}>
        <Headline transform="uppercase">{locales.common.questionLog}</Headline>
        <Icon type="arrow_right" color="adaptive" size={24} />
      </Flex>
    </>);
  }
}