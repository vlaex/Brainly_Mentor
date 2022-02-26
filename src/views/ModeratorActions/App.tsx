import { Component } from "react";
import {
  Flex,
  Button,
  Headline,
  Spinner
} from "brainly-style-guide";

import BrainlyApi from "@lib/BrainlyApi";
import _API from "@lib/Api";
import { Action } from "@typings";
import locales from "@locales";

import AppAside from "./components/AppAside";
import ActionContainer from "./components/ActionContainer";
import AppPagination from "./components/AppPagination";

type AppState = {
  userId: number;
  currentPageId: number;
  nextPageId?: number;
  error?: string;
  actions: Action[];
  loading: boolean;
  hasMore: boolean;
}

export default class App extends Component {
  state: AppState = {
    userId: +window.location.href.match(/(?<=view_moderator\/)\d+/),
    currentPageId: 1,
    nextPageId: null,
    actions: [],
    error: null,
    loading: true,
    hasMore: true,
  };

  private async FetchActions(pageId?: number) {
    if(!pageId) pageId = this.state.currentPageId;

    this.setState({ error: null, loading: true, actions: [] });

    try {
      const data = await _API.GetActions(this.state.userId, pageId);
      if(data.actions.length < 1)
        throw Error(locales.errors.noActions);

      this.setState({ 
        hasMore: data.pagination.hasMore,
        nextPageId: data.pagination.nextPage,
        actions: data.actions,
        currentPageId: pageId
      });

      await this.UpdateUserAvatars();
    } catch(err) {
      this.setState({ error: err.message });
    }

    this.setState({ loading: false });
  }

  private async UpdateUserAvatars() {
    let actions = this.state.actions;
    let users = await BrainlyApi.GetUserAvatars(actions.map(action => action.user.id));

    for(let user of users) {
      actions.find(action => action.user.id === user.id).user.avatar = user.avatar;
    }

    this.setState({ actions });
  }

  componentDidMount() {
    this.FetchActions();
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
        <AppAside />
        {this.state.loading ? 
          <Flex className="js-react-loading-container" alignItems="center">
            <Spinner color="yellow-40" />
            <Headline size="medium">{locales.messages.loading}</Headline>
          </Flex> :
          <Flex direction="column">
            <AppPagination 
              onChange={(pageId) => this.FetchActions(pageId)} 
              loading={this.state.loading} 
              pageId={this.state.currentPageId}
              hasNextPage={this.state.hasMore}
            />
            <div className="actions">{this.state.actions.map(
              data => <ActionContainer key={data.hash} data={data} />
            )}</div>
          </Flex>
        }
      </div>
    )
  }
}