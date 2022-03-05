import React from "react";
import {
	Flex,
	Button,
	Text,
	Icon,
	HomeButton,
	LogoType
} from "brainly-style-guide";

import locales from "@locales";

export default class AppHeader extends React.Component {
	props: {
		onChange: (number) => Promise<void>;
		pageId: number;
		loading: boolean;
		hasNextPage: boolean;
	} = this.props;

	private UpdatePage(
		page: "previous" | "next" | "current"
	) {
		let pageId = this.props.pageId;

		if (page !== "current") {
			pageId = page === "previous" ? pageId - 1 : pageId + 1;
		}

		this.props.onChange(pageId);
	}

	render() {
		return (
			<Flex className="actions-header" alignItems="center" justifyContent="space-between">
				<HomeButton type={locales.marketName as LogoType} href="/" />
				<Flex alignItems="center" className="actions-pagination" disabled={this.props.loading}>
					<Button disabled={this.props.pageId === 1} onClick={() => this.UpdatePage("previous")} title={locales.messages.previousPage} type="transparent" iconOnly icon={<Icon type="arrow_left" color="icon-black" size={24} />} size="s" />
					<Text weight="bold" size="small">{this.props.pageId}</Text>
					<Button disabled={!this.props.hasNextPage} onClick={() => this.UpdatePage("next")} title={locales.messages.nextPage} type="transparent" iconOnly icon={<Icon type="arrow_right" color="icon-black" size={24} />} size="s" />
				</Flex>
			</Flex>
		);
	}
}