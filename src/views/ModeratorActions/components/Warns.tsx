/* eslint-disable react/jsx-key */
import React from "react";
import {
  Spinner,
  Box,
  Accordion,
  AccordionItem,
  SeparatorHorizontal,
  Bubble,
  Flex,
  Headline,
  Text
} from "brainly-style-guide";

import locales from "@locales";
import { Warn } from "@typings";
import GetWarns from "@lib/GetWarns";
import { GetShortDeleteReason } from "@lib/GetShortDeleteReason";
import md5 from "md5";


type WarnsProps = {
  userId: number;
}

type WarnsState = {
  loading: boolean;
  warns?: Warn[];
}

export default class Warns extends React.Component<WarnsProps & React.HTMLAttributes<HTMLElement>,
  WarnsState> {
  constructor(props: WarnsProps) {
    super(props);

    this.state = { loading: true };

    this.RenderWarns();
  }

  private async RenderWarns() {
    try {
      const data = await GetWarns(this.props.userId);
      this.setState({ warns: data });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { warns, loading } = this.state;

    if (loading) {
      return (
        <Bubble direction="left" className="warnsBox">
          <Spinner />
        </Bubble>
      );
    }

    return (
      <Bubble direction="left" className="warnsBox">
        {warns?.length < 1 && <Flex direction="column">
          <Headline color="text-red-60" size="small" align="to-center">{locales.common.noWarns}</Headline>
        </Flex>}
        <Accordion spacing="none" allowMultiple>{warns?.map(warn => {
          let beautifiedReason = GetShortDeleteReason(warn.reason)?.name.toLowerCase();
          return (
            <AccordionItem
              key={`${md5(warn.reason + warn.time + warn.content + warn.taskId)}`}
              padding="xxs"
              title={beautifiedReason + " | " + warn.time + " | " + warn.warner}
              titleSize="small"
            >
              <Box padding="xs">
                <Text size="small">{warn.reason}</Text>
              </Box>
              <SeparatorHorizontal/>
              <Box padding="xs">
                <Text size="small"><div dangerouslySetInnerHTML={{ __html: warn.content }}/> </Text>
              </Box>
            </AccordionItem>
          );
        })}
        </Accordion>
      </Bubble>
    );
  }
}