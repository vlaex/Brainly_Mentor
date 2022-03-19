import React from "react";
import { Flex, Button, Headline, Spinner } from "brainly-style-guide";

//import _API from "@lib/Api";
import type { Action } from "@typings";
import locales from "@locales";

import ActionContainer from "./components/ActionContainer";
import AppHeader from "./components/AppHeader";
import GetActions from "@lib/GetActions";

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
      const moderatorId = this.state.userId;
      const data = await GetActions(moderatorId, pageId);

      this.setState({ 
        currentPageId: pageId,
        hasMore: data.hasMore,
        nextPageId: pageId + 1,
        actions: data.actions,
      });
      
      const newURL = `/moderation_new/view_moderator/${moderatorId}/page:${pageId}`;
      window.history.pushState(null, null, newURL);

    } catch (err) {
      console.error(err);
      this.setState({ error: err.message });
    } finally {
      this.setState({ loading: false });
    }
  }
  
  render() {
    if (this.state.error) {
      return (
        <Flex className="js-react-error-container">
          <Headline color="text-red-60" extraBold size="medium">{this.state.error}</Headline>
          <Button onClick={this.FetchActions.bind(this)} type="outline">{locales.common.tryAgain}</Button>
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
            <div className="actions grid-items-container">{this.state.actions.map(action => 
              <ActionContainer 
                key={action.hash} 
                data={action} 
                moderator={this.state.userId} 
                page={this.state.currentPageId} 
              />
            )}</div>
          }
        </Flex>
      </div>
    );
  }
}