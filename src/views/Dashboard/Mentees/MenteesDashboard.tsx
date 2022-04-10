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

type DashboardProps = {
  mentor?: Mentor;
  switchScreen: (screen: DashboardScreens) => void
}

export default class MenteesDashboard extends React.Component<DashboardProps, DashboardState> {
  constructor(props: DashboardProps) {
    super(props);

    this.state = {
      addMenteeBoxVisible: false,
      mentees: [],
      loading: false,
      error: null,
      me: null
    };

    this.RenderMentees = this.RenderMentees.bind(this);
    this.ToggleAddMenteeBoxVisibility = this.ToggleAddMenteeBoxVisibility.bind(this);
  }

  componentDidMount() {
    this.GetMe();
    this.RenderMentees();
  }

  private async GetMe() {
    try {
      const meData = await _API.GetMe();
      this.setState({ me: meData.mentor });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  private async RenderMentees() {
    this.setState({
      loading: true,
      error: null,
      mentees: [],
      addMenteeBoxVisible: false
    });

    try {
      const data = await _API.GetMentees(this.props.mentor && this.props.mentor.id);
      this.setState({ 
        mentees: data.mentees 
      });
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
            <Button onClick={this.RenderMentees} type="outline" toggle="peach">{locales.common.tryAgain}</Button>
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
                {(!this.props.mentor && this.state.me?.senior) &&
                  <Button onClick={this.ToggleAddMenteeBoxVisibility} type="solid-mint" icon={<Icon type="plus" />} iconOnly />}
              </Flex>
              <Flex>
                {this.state.me?.senior && 
                  <Button 
                    onClick={() => this.props.switchScreen("Mentors")}
                    icon={<Icon type="friends" color="icon-black" size={24} />} 
                    type="outline">{locales.common.toMentors}
                  </Button> 
                }
                <Button title={locales.common.reload} onClick={this.RenderMentees} icon={<Icon type="reload" color="icon-black" size={24} />} iconOnly type="outline" />
              </Flex>
            </Flex>
            <div className="grid-items-container">
              {this.state.mentees.map(mentee =>
                <MenteeContainer 
                  data={mentee}
                  key={mentee.id} 
                  deleteHandler={this.RenderMentees}
                  canDelete={this.state.me?.senior}
                />
              )}
            </div>
            {this.state.addMenteeBoxVisible && <AddMenteeBox handler={this.RenderMentees} />}
          </Flex>
        )}
      </Overlay>
    );
  }
}