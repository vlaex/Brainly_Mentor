import React from "react";

export default class RelativeTooltip extends React.Component {
  props: {visible: boolean, children: any} = this.props;

  render() {
    return (
      <div 
        className={`action-relative-tooltip ${this.props.visible ? "" : "tooltip-hidden"}`} 
        children={this.props.children}
      />
    );
  }
}