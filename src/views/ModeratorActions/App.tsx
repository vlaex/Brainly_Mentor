import React from "react";
import {
  Flex,
  Button,
  Headline,
  Spinner
} from "brainly-style-guide";

import BrainlyApi from "@lib/BrainlyApi";
import _API from "@lib/Api";
import { Action, ActionFilters } from "@typings";
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

    this.setState({ error: null, loading: true, actions: [] });

    try {
      const data = await _API.GetActions(this.state.userId, pageId);

      this.setState({ 
        hasMore: data.hasMore,
        nextPageId: pageId + 1,
        actions: data.actions,
        currentPageId: pageId,
      });

      await this.UpdateUsers();
    } catch(err) {
      this.setState({ error: err.message });
    }

    this.setState({ loading: false });
  }

  private async UpdateUsers() {
    let actions = this.state.actions;
    let users = await BrainlyApi.GetUsers(actions.map(action => action.user.id));

    for(let user of users) {
      let thisAction = actions.find(action => action.user.id === user.id);

      thisAction.user.avatar = user.avatar;
      thisAction.isModerator = !!user.specialRanks.length;
    }

    this.setState({ actions });
  }
  
  render() {
    if(this.state.error) {
      return (
        <Flex className="js-react-error-container">
          <Headline color="text-red-60" extraBold size="medium">{this.state.error}</Headline>
          <Button onClick={() => this.FetchActions()} type="outline">{locales.messages.tryAgain}</Button>
        </Flex>
      )
    }

    return (
      <div className="layout">
        {this.state.loading ? 
          <Flex className="js-react-loading-container" alignItems="center">
            <Spinner color="yellow-40" />
            <Headline size="medium">{locales.messages.loading}</Headline>
          </Flex> :
          <Flex direction="column">
            <AppHeader 
              onChange={(pageId) => this.FetchActions(pageId)} 
              loading={this.state.loading} 
              pageId={this.state.currentPageId}
              hasNextPage={this.state.hasMore}
            />
            {!this.state.actions.length ? 
              <Headline className="js-react-no-actions-container" size="medium" color="text-yellow-60">
                {locales.messages.noActionsMatchingFilters}
              </Headline> :
              <div className="actions">{this.state.actions.map(
                data => <ActionContainer key={data.hash} data={data} />
              )}</div>
            }
          </Flex>
        }
      </div>
    )
  }
}