import React from "react";
import { Button, Flex, Icon, TextBit, Spinner, Headline } from "brainly-style-guide";

import _API from "@lib/api/extension";
import type { Mentor } from "@typings";

import Overlay from "../components/Overlay";
import MentorContainer from "./components/MentorContainer";
import { AddMentorBox } from "./components/AddMentorBox";
import locales from "@locales";
import { DashboardScreens } from "@typings";

type DashboardState = {
  addMentorBoxVisible: boolean;
  mentors: Mentor[];
  loading: boolean;
  error?: string;
}

export default class MentorsDashboard extends React.Component
  <{ switchScreen: (screen: DashboardScreens) => void }, DashboardState> {
  state: DashboardState = {
    addMentorBoxVisible: false,
    mentors: [],
    loading: false,
    error: null
  };

  componentDidMount() {
    this.RenderMentors();
  }

  private async RenderMentors() {
    this.setState({
      loading: true,
      error: null,
      mentors: [],
      addMentorBoxVisible: false
    });

    try {
      const data = await _API.GetMentors();
      const mentors = data.mentors;
      this.setState({ mentors: mentors });

    } catch (err) {
      this.setState({ error: err.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  private ToggleAddMentorBoxVisibility() {
    this.setState({ addMentorBoxVisible: !this.state.addMentorBoxVisible });
  }

  render() {
    if (this.state.error) {
      return (
        <Overlay>
          <Flex className="error-container" justifyContent="center">
            <Headline extraBold color="text-red-60">{this.state.error}</Headline>
            <Button onClick={this.RenderMentors.bind(this)} type="outline"
              toggle="peach">{locales.common.tryAgain}</Button>
          </Flex>
        </Overlay>
      );
    }

    return (
      <Overlay>
        {this.state.loading ? <Spinner/> : (
          <Flex direction="column" fullWidth>
            <Flex justifyContent="space-between" alignItems="center"
              className="mentees-dashboard-header">
              <Flex>
                <TextBit color="text-blue-60">{locales.common.mentors} [{this.state.mentors.length}]</TextBit>
                <Button onClick={this.ToggleAddMentorBoxVisibility.bind(this)} type="solid-mint"
                  icon={<Icon type="plus"/>} iconOnly/>
              </Flex>
              <Flex>
                <Button
                  onClick={() => this.props.switchScreen("MyMentees")}
                  icon={<Icon type="friends" color="icon-black" size={24}/>}
                  type="outline">
                  {locales.common.toUMentees}
                </Button>
                <Button title={locales.common.reload} onClick={this.RenderMentors.bind(this)}
                  icon={<Icon type="reload" color="icon-black" size={24}/>} iconOnly
                  type="outline"/>
              </Flex>
            </Flex>
            <div className="grid-items-container">
              {this.state.mentors.map(mentor =>
                <MentorContainer
                  mentor={mentor}
                  key={mentor.id}
                  switchScreen={this.props.switchScreen}
                  deleteHandler={this.RenderMentors.bind(this)}/>
              )}
            </div>
            {this.state.addMentorBoxVisible &&
                <AddMentorBox handler={this.RenderMentors.bind(this)}/>}
          </Flex>
        )}
      </Overlay>
    );
  }
}