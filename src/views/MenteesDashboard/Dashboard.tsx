import React from "react";
import { Button, Flex, Icon, TextBit, Spinner, Headline } from "brainly-style-guide";

import _API from "@lib/Api";
import type { Mentee } from "@typings";

import Overlay from "./components/Overlay";
import MenteeContainer from "./components/MenteeContainer";
import { AddMenteeBox } from "./components/AddMenteeBox";
import locales from "@locales";

type DashboardState = {
  addMenteeBoxVisible: boolean;
  mentees: Mentee[];
  loading: boolean;
  error?: string;
}

export default class Dashboard extends React.Component {
  state: DashboardState = {
    addMenteeBoxVisible: false,
    mentees: [],
    loading: false,
    error: null
  }

  componentDidMount() {
    this.RenderMentees();
  }

  private async RenderMentees() {
    this.setState({ 
      loading: true, 
      error: null, 
      mentees: [],
      addMenteeBoxVisible: false
    });

    try {
      const data = await _API.GetMentees(54380193);
      const mentees = data.mentees;

      this.setState({ mentees });
    } catch (err) {
      this.setState({ error: err.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  private CloseDashboard() {
    document.querySelector(".overlay").classList.add("hidden");
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
        <Button className="close-modal-button" title={locales.common.close} onClick={this.CloseDashboard} icon={<Icon type="close" size={24} />} type="transparent" iconOnly />
        {this.state.loading ? <Spinner /> : (
          <Flex direction="column" fullWidth>
            <Flex justifyContent="space-between" alignItems="center" className="mentees-dashboard-header">
              <Flex>
                <TextBit color="text-blue-60">{locales.common.yourMentees} [{this.state.mentees.length}]</TextBit>
                <Button onClick={this.ToggleAddMenteeBoxVisibility.bind(this)} type="solid-mint" icon={<Icon type="plus" />} iconOnly/>
              </Flex>
              <Flex>
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