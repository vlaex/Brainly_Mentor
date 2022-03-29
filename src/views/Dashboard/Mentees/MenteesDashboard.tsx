import React from "react";
import { Button, Flex, Icon, TextBit, Spinner, Headline } from "brainly-style-guide";

import _API from "@lib/api/extension";
import type { Mentee, Mentor } from "@typings";

import Overlay from "../components/Overlay";
import MenteeContainer from "./components/MenteeContainer";
import { AddMenteeBox } from "./components/AddMenteeBox";
import locales from "@locales";
import { DashboardScreens } from "@typings";

type DashboardState = {
    addMenteeBoxVisible: boolean;
    mentees: Mentee[];
    me: Mentor;
    loading: boolean;
    error?: string;
}

export default class MenteesDashboard extends React.Component
  <{ mentor?: Mentor, switchScreen: (screen: DashboardScreens) => void },
  DashboardState> {
    state: DashboardState = {
      addMenteeBoxVisible: false,
      mentees: [],
      loading: false,
      error: null,
      me: null
    }

    componentDidMount() {
      this.RenderMentees();
    }

    private async RenderMentees() {
      this.setState({
        loading: true,
        error: null,
        mentees: [],
        addMenteeBoxVisible: false,
        me: null
      });

      try {
        const meData = await _API.GetMe();
        const data = await _API.GetMentees(this.props.mentor && this.props.mentor.id);

        const me = meData.mentor;
        const mentees = data.mentees;

        this.setState({ mentees: mentees, me: me });
      } catch (err) {
        this.setState({ error: err.message });
      } finally {
        this.setState({ loading: false });
      }
    }

    private ToggleAddMenteeBoxVisibility() {
      this.setState({ addMenteeBoxVisible: !this.state.addMenteeBoxVisible });
    }

    render() {
      if (this.state.error) {
        return (
          <Overlay>
            <Flex className="error-container" justifyContent="center">
              <Headline extraBold color="text-red-60">{this.state.error}</Headline>
              <Button onClick={this.RenderMentees.bind(this)} type="outline" toggle="peach">{locales.common.tryAgain}</Button>
            </Flex>
          </Overlay>
        );
      }

      return (
        <Overlay>
          {this.state.loading ? <Spinner /> : (
            <Flex direction="column" fullWidth>
              <Flex justifyContent="space-between" alignItems="center" className="mentees-dashboard-header">
                <Flex>
                  <TextBit color="text-blue-60">
                    {this.props.mentor ? `${locales.common.mentees} ${this.props.mentor.nick}` :
                      locales.common.yourMentees} &#32;
                    [{this.state.mentees.length}]
                  </TextBit>
                  {!this.props.mentor &&
                      <Button onClick={this.ToggleAddMenteeBoxVisibility.bind(this)} type="solid-mint" icon={<Icon type="plus" />} iconOnly/>}
                </Flex>
                <Flex>
                  {this.state.me && <Button onClick={() => this.props.switchScreen("Mentors")}
                    icon={<Icon type="friends" color="icon-black" size={24} />} 
                    type="outline">{locales.common.toMentors}</Button> }
                  <Button title={locales.common.reload} onClick={this.RenderMentees.bind(this)} icon={<Icon type="reload" color="icon-black" size={24} />} iconOnly type="outline" />
                </Flex>
              </Flex>
              <div className="grid-items-container">
                {this.state.mentees.map(mentee =>
                  <MenteeContainer data={mentee} key={mentee.id} deleteHandler={this.RenderMentees.bind(this)} />
                )}
              </div>
              {this.state.addMenteeBoxVisible &&
        <AddMenteeBox handler={this.RenderMentees.bind(this)} />}
            </Flex>
          )}
        </Overlay>
      );
    }
}