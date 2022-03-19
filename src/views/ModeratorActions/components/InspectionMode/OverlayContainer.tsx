import React from "react";

export default class OverlayContainer extends React.Component<{
  children: React.ReactNode
}> {
  render() {
    return (
      <div className="overlay">
        <div className="overlay-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}