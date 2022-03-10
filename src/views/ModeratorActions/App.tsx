import React from "react";
import { Flex, Button, Headline, Spinner } from "brainly-style-guide";

import BrainlyApi from "@lib/BrainlyApi";
import _API from "@lib/Api";
import type { Action } from "@typings";
import locales from "@locales";

import ActionContainer from "./components/ActionContainer";
import AppHeader from "./components/AppHeader";

type AppState = {
  userId: number;
  currentPageId: number;
  nextPageId?: number;
  error?: string;
  actions: Action[];
  loading: boolean;
  hasMore: boolean;
}

export default class App extends React.Component {
  state: AppState = {
    userId: +window.location.href.match(/(?<=view_moderator\/)\d+/),
    currentPageId: +window.location.href.match(/(?<=\/page:)\d+$/) || 1,
    nextPageId: null,
    actions: [],
    error: null,
    loading: true,
    hasMore: true
  };

  componentDidMount() {
    this.FetchActions();
  }

  private async FetchActions(pageId?: number) {
    if (!pageId) pageId = this.state.currentPageId;

    this.setState({ error: null, loading: true });

    try {
      const data = await _API.GetActions(this.state.userId, pageId);

      this.setState({ 
        currentPageId: pageId,
        hasMore: data.hasMore,
        nextPageId: pageId + 1,
        actions: data.actions,
      });

      await this.GetExtraData();
    } catch (err) {
      this.setState({ error: err.message });
    }

    this.setState({ loading: false });
  }

  private async GetExtraData() {
    let actions = this.state.actions;
    let users = await BrainlyApi.GetUsers(actions.map(action => action.user.id));

    for (let user of users) {
      let thisAction = actions.find(action => action.user.id === user.id);

      thisAction.user.avatar = user.avatar;
      thisAction.isModerator = !!user.specialRanks.length;
    }

    this.setState({ actions });
  }
  
  render() {
    if (this.state.error) {
      return (
        <Flex className="js-react-error-container">
          <Headline color="text-red-60" extraBold size="medium">{this.state.error}</Headline>
          <Button onClick={() => this.FetchActions()} type="outline">{locales.common.tryAgain}</Button>
        </Flex>
      );
    }

    return (
      <div className="layout">
        <Flex direction="column">
          <AppHeader 
            onChange={(pageId) => this.FetchActions(pageId)} 
            loading={this.state.loading} 
            pageId={this.state.currentPageId}
            hasNextPage={this.state.hasMore}
          />
          {(!this.state.actions.length && !this.state.nextPageId) ? 
            <Spinner /> :
            <div className="actions">{this.state.actions.map(data => 
              <ActionContainer key={data.id} data={data} moderator={this.state.userId} page={this.state.currentPageId} />
            )}</div>
          }
        </Flex>
      </div>
    );
  }
}