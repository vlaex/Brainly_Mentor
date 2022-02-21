import React from "react";

import { Action } from "@typings";
import locales from "@locales";

import ActionContainer from "./ActionContainer";
import { 
  Flex,
  Spinner,
  Headline,
  Button
} from "brainly-style-guide";

import GetActions from "@lib/GetActions";

type ActionsContainerState = {
  userId: number;
  pageId: number;
  loading: boolean;
  error?: string;
  actions: Action[];
  hasNextPage: boolean;
};

export default class ActionsContainer extends React.Component<
  {}, 
  ActionsContainerState
> {
  constructor(props) {
    super(props);

    this.state = {
      userId: +window.location.href.match(/(?<=view_moderator\/)\d+/),
      pageId: 1,
      loading: true,
      error: null,
      actions: [],
      hasNextPage: true
    }
  }

  componentDidMount() {
    this.renderActions();
  }

  private async renderActions() {
    this.setState({
      error: null, 
      loading: true, 
      actions: [] 
    });

    try {
      const data = await GetActions(
        this.state.userId,
        this.state.pageId
      );
      this.setState(data);
    } catch(e) {
      this.setState({ error: e.toString() });
    }

    this.setState({ loading: false });
  }

  render() {
    if(this.state.loading) {
      return (
        <Flex className="js-react-loading-container">
          <Spinner color="yellow-40" />
          <Headline size="medium">{locales.messages.loading}</Headline>
        </Flex>
      )
    } else if(this.state.error) {
      return (
        <Flex className="js-react-error-container">
          <Headline color="text-red-60" extraBold size="medium">{this.state.error}</Headline>
          <Button onClick={this.renderActions.bind(this)} type="outline">{locales.messages.tryAgain}</Button>
        </Flex>
      )
    }
    
    return (
      <div className="actions">
        {this.state.actions.map(action => <ActionContainer key={action.hash} data={action} />)}
      </div>
    )
  }
}