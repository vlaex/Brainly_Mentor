import React from "react";
import { Button, Flex, Icon, Checkbox, Text, Input, Select } from "brainly-style-guide";

import locales from "@locales";
import { HideElement, ShowElement } from "@utils/ElementsVisibility";
import type { Action } from "@typings";

type FiltersState = {
  filtersHidden: boolean;
  hideComments: boolean;
  contentType: Action["contentType"] | "ALL";
  actionType: Action["type"] | "ALL";
  userNick: string;
  dateNotBefore: string;
  dateNotAfter: string;
  deletionReason: string;
}
type FilterChangeEvent = React.FormEvent<HTMLElement & HTMLInputElement>;

const DefaultFiltersState: FiltersState = {
  filtersHidden: true,
  hideComments: false,
  contentType: "ALL",
  actionType: "ALL",
  userNick: "",
  dateNotBefore: "1-12-12",
  dateNotAfter: "9999-12-12",
  deletionReason: "ALL"
};

const SelectFilter = (props: {
  onChange: (event: FilterChangeEvent) => void;
  id: string;
  options: {
    value: string;
    text: string;
  }[]
}) => {
  return (
    <Select options={[
      { value: "ALL", text: locales.common.all },
      ...props.options
    ]} defaultValue="ALL" id={props.id} onChange={props.onChange} />
  );
};

export default class Filters extends React.Component {
  state: FiltersState = DefaultFiltersState;

  private ToggleVisibility() {
    this.setState({
      filtersHidden: !this.state.filtersHidden
    });
  }

  private Filter(element: HTMLDivElement) {
    ShowElement(element);

    let hideComments = this.state.hideComments && 
      element.classList.contains("Action-ContentType-comment");

    let userNickMatch = true;
    try {
      let userNickRegex = new RegExp(this.state.userNick || ".+");
      userNickMatch = userNickRegex.test(
        element.querySelector(".user > .sg-text").textContent
      );
    } catch (err) {
      if (!(err instanceof SyntaxError)) throw Error(err);
    }

    let actionTimestamp = +new Date(
      element.querySelector(".action-date-container > .sg-text").getAttribute("data-date")
    );

    let { contentType, actionType, deletionReason } = this.state;
      
    let contentTypeMatch = contentType === "ALL" ? true :
      element.classList.contains(`Action-ContentType-${contentType}`);
        
    let actionTypeMatch = actionType === "ALL" ? true : 
      element.classList.contains(`Action-Type-${actionType}`);

    let deletionReasonMatch = deletionReason === "ALL" ? true :
      element.classList.contains(`Action-DeleteReason-${deletionReason}`);

    if (
      hideComments || 
      !userNickMatch ||
      (
        actionTimestamp < +new Date(this.state.dateNotBefore) ||
        actionTimestamp > +new Date(this.state.dateNotAfter) 
      ) ||
      !actionTypeMatch ||
      !contentTypeMatch ||
      !deletionReasonMatch
    ) HideElement(element);

  }

  private FilterActions() {
    Array.from(
      document.querySelectorAll(".actions > .action")
    )
      .forEach((e: HTMLDivElement) => this.Filter(e));
  }

  componentDidMount() {
    this.componentDidUpdate = () => this.FilterActions();
  }

  handleFilterChange = (event: FilterChangeEvent) => {
    this.setState({ [event.currentTarget.id]: event.currentTarget.value });
  }

  render() {
    return (
      <Flex className="sg-flex--relative filters" marginLeft="s">
        <Button onClick={this.ToggleVisibility.bind(this)} title={locales.common.filters} type="solid-blue" icon={<Icon type="filters" color="adaptive" size={24} />} iconOnly />
        <Flex hidden={this.state.filtersHidden} direction="column" className="filters-box">
          <Flex>
            <Text size="small" weight="bold">{locales.common.contentType}</Text>
            <SelectFilter onChange={this.handleFilterChange} id="contentType" options={locales.common.actionFilters.contentTypes} />
          </Flex>
          <Flex>
            <Text size="small" weight="bold">{locales.common.actionType}</Text>
            <SelectFilter onChange={this.handleFilterChange} id="actionType" options={locales.common.actionFilters.actionTypes} />
          </Flex>
          <Flex>
            <Text size="small" weight="bold">{locales.common.deletionReason}</Text>
            <SelectFilter onChange={this.handleFilterChange} id="deletionReason" options={locales.common.actionFilters.deletionReasons} />
          </Flex>
          <Flex>
            <Text size="small" weight="bold">{locales.common.user}</Text>
            <Input placeholder={locales.common.nick.toLowerCase()} onChange={this.handleFilterChange} id="userNick" />
          </Flex>
          <Flex>
            <Text size="small" weight="bold">{locales.common.dateBetween}</Text>
            <Input type="date" onChange={this.handleFilterChange} id="dateNotBefore" />
            <Input type="date" onChange={this.handleFilterChange} id="dateNotAfter" />
          </Flex>
          <Checkbox onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
            this.setState({ hideComments: event.currentTarget.checked })
          }>{locales.common.hideComments}</Checkbox>
        </Flex>
      </Flex>
    );
  }
}