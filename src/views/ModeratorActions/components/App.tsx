import React from "react";

import AppHeader from "./AppHeader";
import ActionsContainer from "./ActionsContainer";

export default class App extends React.Component {
  render() {
    return (
      <div className="js-react-container">
        <AppHeader />
        <ActionsContainer />
      </div>
    );
  }
}