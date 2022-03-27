import React from "react";
import {
  Box,
  AccordionItem,
  SeparatorHorizontal,
  Flex,
  Text,
  Link
} from "brainly-style-guide";

import { GetShortDeleteReason } from "@lib/GetShortDeleteReason";
import ReplaceTextWithLinks from "@utils/ReplaceTextWithLinks";
import type { Warn } from "@typings";
import locales from "@locales";

export default class WarnEntry extends React.Component<{ warn: Warn }> {
  render() {
    let warn = this.props.warn;

    let beautifiedReason = GetShortDeleteReason(warn.reason)?.name;

    return (
      <AccordionItem
        className={`warn-${warn.active ? "active" : "inactive"}`}
        padding="xxs"
        title={<Flex direction="column">
          <Link color="text-black" target="_blank" href={`${locales.taskPath}/${warn.taskId}`} size="small" weight="bold">
            {beautifiedReason}
          </Link>
          <Text color="text-gray-70" size="xsmall">
            {warn.time}
            <Text type="span" weight="bold" inherited color="text-blue-60"> • {warn.warner}</Text>
          </Text>
        </Flex>}
        titleSize="small"
      >
        <Box padding="xs">
          <div className="warn-reason" dangerouslySetInnerHTML={{ 
            __html: ReplaceTextWithLinks(warn.reason)
          }} />
        </Box>
        <SeparatorHorizontal />
        <Box padding="xs">
          <div className="warn-content" dangerouslySetInnerHTML={{ 
            __html: ReplaceTextWithLinks(warn.content)
          }} />
        </Box>
      </AccordionItem>
    );
  }
}