import React from "react";
import { Button, Flex, Icon, Checkbox, Text, Input, Select } from "brainly-style-guide";

import locales from "@locales";
import { HideElement, ShowElement } from "@utils/ElementsVisibility";
import type { Action } from "@typings";
import { Flash } from "@utils/Flashes";
import _API from "@lib/api/extension";

type FiltersState = {
  filtersHidden: boolean;
  hideComments: boolean;
  contentType: Action["contentType"] | "ALL";
  actionType: Action["type"] | "ALL";
  userNick: string;
  deletionReason: string;
}

type FilterChangeEvent = React.FormEvent<HTMLElement & HTMLInputElement>;

const DefaultFiltersState: FiltersState = {
  filtersHidden: true,
  hideComments: false,
  contentType: "ALL",
  actionType: "ALL",
  userNick: "",
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
        element.querySelector(".user .user-nick").textContent
      );
    } catch (err) {
      if (!(err instanceof SyntaxError)) throw Error(err);
    }

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
      !actionTypeMatch ||
      !contentTypeMatch ||
      !deletionReasonMatch
    ) HideElement(element);

  }

  private FilterActions() {
    const actions = document.querySelectorAll(".actions > .action");
    if (!actions.length) return;

    actions.forEach(this.Filter.bind(this));

    if (!document.querySelectorAll(".action:not(.hidden)").length)
      Flash({ type: "info", text: locales.common.nextPagesMayContainActions });
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
        <Button onClick={_ => this.ToggleVisibility()} title={locales.common.filters} type="solid-blue" icon={<Icon type="filters" color="adaptive" size={24} />} iconOnly />
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
            <SelectFilter onChange={this.handleFilterChange} id="deletionReason" options={_API.config.deletionReasons.map(reason =>
              ({ value: reason.id.toString(), text: reason.name })
            )} />
          </Flex>
          <Flex>
            <Text size="small" weight="bold">{locales.common.user}</Text>
            <Input placeholder={locales.common.nick.toLowerCase()} onChange={this.handleFilterChange} id="userNick" />
          </Flex>
          <Checkbox onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            this.setState({ hideComments: event.currentTarget.checked })
          }>{locales.common.hideComments}</Checkbox>
        </Flex>
      </Flex>
    );
  }
}