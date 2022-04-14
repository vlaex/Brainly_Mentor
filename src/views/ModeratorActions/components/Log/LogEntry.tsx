import React from "react";
import {
  Flex,
  Button,
  Icon,
  Text,
  Link,
  IconPropsType,
  IconType
} from "brainly-style-guide";

import type { QuestionLogEntry, User } from "@typings/brainly";
import { GetShortDeleteReason } from "@lib/GetShortDeleteReason";
import locales from "@locales";
import ReplaceTextWithLinks from "@utils/ReplaceTextWithLinks";

const ENTRY_ICONS: Record<QuestionLogEntry["class"], {
  color: IconPropsType["color"],
  type: IconType;
}> = {
  "accepted": { color: "icon-green-50", type: "check" },
  "deleted": { color: "icon-red-50", type: "trash" },
  "best": { color: "icon-yellow-50", type: "crown" },
  "added": { color: "icon-green-50", type: "plus" },
  "edited": { color: "icon-blue-50", type: "pencil" },
  "info": { color: "icon-blue-50", type: "info" },
  "reported": { color: "icon-red-50", type: "report_flag" }
};

type LogEntryProps = {
  entry: QuestionLogEntry;
  usersData: User[];
}

type LogEntryState = {
  detailsVisible: boolean;
}

export default class LogEntry extends React.Component<LogEntryProps, LogEntryState> {
  constructor(props) {
    super(props);

    this.state = { detailsVisible: false };
    this.ToggleDetailsVisibility = this.ToggleDetailsVisibility.bind(this);
  }
  //state: LogEntryProps = { detailsVisible: false };

  get EntryText() {
    let entry = this.props.entry;

    let textPieces = entry.text
      .split(/(%\d\$s)/)
      .map(piece => {
        if (piece !== "%1$s" && piece !== "%3$s") return piece;

        let user = this.props.usersData.find(
          userData => userData.id === entry[piece === "%1$s" ? "user_id" : "owner_id"]
        );
        
        let userLink = `/users/redirect_user/${user.id}`;
        
        return (
          <Link size="small" weight="bold" key={`user-${user.id}`} target="_blank" href={userLink}>
            {user.nick}
          </Link>
        );
      });

    if (entry.class === "deleted") {
      let deleteReason = GetShortDeleteReason(entry.descriptions?.[0]?.text)?.name;

      if (deleteReason) 
        textPieces.push(` ${locales.common.as} `,
          <Text weight="bold" inherited type="span">{deleteReason}</Text>
        );

      if (entry.warn)
        textPieces.push(" ",
          <Text weight="bold" inherited color="text-red-60" type="span">{locales.common.withWarn}</Text>
        );
    }

    return textPieces;
  }

  private ToggleDetailsVisibility() {
    this.setState({ detailsVisible: !this.state.detailsVisible });
  }

  render() {
    let entry = this.props.entry;

    let entryIcon = ENTRY_ICONS[entry.class];

    return (
      <Flex direction="column" className="question-log-entry">
        <div className="question-log-entry-header">
          <Flex marginRight="xxs">
            <Icon size={16} color={entryIcon.color} type={entryIcon.type} />
          </Flex>
          <Text size="small" type="div">
            {...this.EntryText}
          </Text>
          <Text className="question-log-entry-time" weight="bold" color="text-gray-50">
            {entry.time}
          </Text>
          <Button
            size="s"
            type="transparent" 
            icon={
              <Icon type={this.state.detailsVisible ? "arrow_up" : "more"} color="icon-black" size={16} />
            } 
            iconOnly
            onClick={this.ToggleDetailsVisibility}
            className={!!entry.descriptions === false ? "opacity-0" : ""}
          />
        </div>
        <Flex hidden={!this.state.detailsVisible} direction="column" marginTop="xs" marginBottom="s">
          {entry.descriptions?.map((description, i) =>
            <Flex direction="column" key={i}>
              <Text size="small" weight="bold">{description.subject}</Text>
              <Text breakWords size="small" dangerouslySetInnerHTML={{
                __html: ReplaceTextWithLinks(description.text)
              }} />
            </Flex>
          )}
        </Flex>
      </Flex>
    );
  }
}