import React from "react";
import {
  Flex,
  Button,
  Icon,
  HomeButton,
  LogoType,
  Text,
  Select
} from "brainly-style-guide";

import locales from "@locales";
import Filters from "./Filters";

type AppHeaderProps = {
  onChange: (number) => Promise<void>;
  pageId: number;
  loading: boolean;
  hasNextPage: boolean;
  mentees: string[];
  userId: number;
}

export default class AppHeader extends React.Component<AppHeaderProps> {
  constructor(props: AppHeaderProps) {
    super(props);
  }

  private UpdatePage(
    page: "previous" | "next" | "current" | number
  ) {
    let pageId = this.props.pageId;

    if (typeof page === "number") {
      pageId = page;
    } else if (page !== "current") {
      pageId = page === "previous" ? --pageId : ++pageId;
    }

    this.props.onChange(pageId);
  }

  render() {
    return (
      <Flex className="actions-header" alignItems="center" justifyContent="space-between" disabled={this.props.loading}>
        <HomeButton type={locales.marketName as LogoType} href="/" />
        <Flex alignItems="center" className="actions-pagination">
          <Button disabled={this.props.pageId === 1} onClick={_ => this.UpdatePage("previous")} title={locales.common.previousPage} type="transparent" iconOnly icon={<Icon type="arrow_left" color="icon-black" size={24} />} size="s" />
          <Text weight="bold" type="span" size="small" className="actions-pagination-number">{this.props.pageId}</Text>
          <Button disabled={!this.props.hasNextPage} onClick={_ => this.UpdatePage("next")} title={locales.common.nextPage} type="transparent" iconOnly icon={<Icon type="arrow_right" color="icon-black" size={24} />} size="s" />
        </Flex>
        <Flex alignItems="center">
          {!!this.props.mentees.length && 
            <Select value={this.props.userId.toString()} options={this.props.mentees.map(mentee => {
              return { value: mentee, text: mentee };
            })}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const newURL = `/moderation_new/view_moderator/${e.currentTarget.value}/`;
              window.location.href = newURL;
            }}
            />
          }
          <Filters />
        </Flex>
      </Flex>
    );
  }
}