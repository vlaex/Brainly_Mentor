import React from "react";
import { Flex, Button, Headline, Spinner } from "brainly-style-guide";

import type { Action, Mentor } from "@typings";
import locales from "@locales";

import ActionContainer from "./components/ActionContainer";
import AppHeader from "./components/AppHeader";
import GetActions from "@lib/api/brainly/GetActions";
import _API from "@lib/api/extension";
import { Flash } from "@utils/Flashes";

type AppState = {
  userId: number;
  currentPageId: number;
  nextPageId?: number;
  error?: string;
  actions: Action[];
  loading: boolean;
  hasMore: boolean;
  mentees: string[];
  me: Mentor;
}

export default class App extends React.Component {
  state: AppState = {
    userId: +window.location.href.match(/(?<=view_moderator\/)\d+/),
    currentPageId: +window.location.href.match(/(?<=\/page:)\d+$/) || 1,
    nextPageId: null,
    actions: [],
    error: null,
    loading: true,
    hasMore: true,
    mentees: [],
    me: null
  };

  constructor(props) {
    super(props);

    this.SetPageSwitcher();
  }

  componentDidMount() {
    this.FetchUsers();
    this.FetchActions();
  }

  private SetPageSwitcher() {
    document.addEventListener("keyup", (event: KeyboardEvent) => {
      if (this.state.loading) return;

      let pageId = this.state.currentPageId;

      if (
        pageId > 1 &&
        (event.code === "ArrowLeft" || event.code === "KeyA")
      )
        this.FetchActions(--pageId);
      else if (
        this.state.hasMore &&
        (event.code === "ArrowRight" || event.code === "KeyD")
      )
        this.FetchActions(++pageId);

    });
  }

  private async FetchUsers() {
    try {
      const [menteesData, meData] = await Promise.all([
        _API.GetMenteesNicks(),
        _API.GetMe()
      ]);

      this.setState({
        mentees: menteesData.mentees,
        me: meData.mentor,
      });
    } catch (err) {
      Flash({
        type: "error",
        text: err.message
      });
    }
  }

  private async FetchActions(pageId?: number) {
    if (!pageId) pageId = this.state.currentPageId;

    this.setState({ error: null, loading: true });

    try {
      const moderatorId = this.state.userId;
      const data = await GetActions(moderatorId, pageId);

      this.setState({
        currentPageId: data.pageId,
        hasMore: data.hasMore,
        nextPageId: pageId + 1,
        actions: data.actions
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
          <Button onClick={this.FetchActions.bind(this)}
            type="outline">{locales.common.tryAgain}</Button>
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
            mentees={this.state.mentees}
            userId={this.state.userId}
            me={this.state.me}
          />
          {(!this.state.actions.length && !this.state.nextPageId) ?
            <Spinner/> :
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