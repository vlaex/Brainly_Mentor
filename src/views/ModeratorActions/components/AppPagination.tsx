import React from "react";
import {
  Flex,
  Button,
  Text,
  Icon
} from "brainly-style-guide";

import locales from "@locales";

export default class AppPagination extends React.Component {
  props: {
    onChange: Function;
    pageId: number;
    loading: boolean;
    hasNextPage: boolean;
  } = this.props;

  private UpdatePage(page: "previous" | "next") {
    let pageId = page === "previous" ?
      this.props.pageId - 1 :
      this.props.pageId + 1;

    this.props.onChange(pageId);
  }

  render() {
    return (
      <Flex justifyContent="center" alignItems="center" className="actions-pagination" disabled={this.props.loading}>
        <Button disabled={this.props.pageId === 1} onClick={() => this.UpdatePage("previous")} title={locales.messages.previousPage} type="transparent" iconOnly icon={<Icon type="arrow_left" color="icon-black" size={24} />} size="s" />
          <Text weight="bold">{this.props.pageId}</Text>
        <Button disabled={!this.props.hasNextPage} onClick={() => this.UpdatePage("next")} title={locales.messages.nextPage} type="transparent" iconOnly icon={<Icon type="arrow_right" color="icon-black" size={24} />} size="s" />
      </Flex>
    )
  }
}