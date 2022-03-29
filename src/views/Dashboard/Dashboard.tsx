import React from "react";

import MenteesDashboard from "./Mentees/MenteesDashboard";
import MentorsDashboard from "./Mentors/MentorsDashboard";
import { Mentor, DashboardScreens } from "@typings";

type DashboardState = {
  whatRender: DashboardScreens;
  mentor?: Mentor;
}

export default class Dashboard extends React.Component {
  state: DashboardState = {
    whatRender: "MyMentees"
  }

  switchScreen = (state: DashboardScreens, mentor?: Mentor) => {
    this.setState({ whatRender: state, mentor: mentor });
  }

  render() {
    switch (this.state.whatRender) {
    case "MyMentees":
      return <MenteesDashboard switchScreen={this.switchScreen} />;
    case "Mentees":
      return <MenteesDashboard mentor={this.state.mentor} switchScreen={this.switchScreen} />;
    default:
      return <MentorsDashboard switchScreen={this.switchScreen}/>;
    }
  }
}