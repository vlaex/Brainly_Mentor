import React from "react";

export default class RelativeTooltip extends React.Component {
	props: {visible: boolean, children} = this.props;

	render() {
		return (
			<div 
				className={`action-relative-tooltip ${this.props.visible ? "" : "tooltip-hidden"}`}
			>{this.props.children}</div>
		);
	}
}