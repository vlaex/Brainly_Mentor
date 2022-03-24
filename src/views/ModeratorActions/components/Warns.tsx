/* eslint-disable react/jsx-key */
import React from "react";
import {
    Spinner,
    Flex,
    Button,
    Headline,
    Box,
    Accordion,
    AccordionItem,
    SeparatorHorizontal
} from "brainly-style-guide";

import locales from "@locales";
import {Warn} from "@typings";
import GetWarns from "@lib/GetWarns";
import {GetShortDeleteReason} from "@lib/GetShortDeleteReason";


type WarnsProps = {
    userId: number;
}

type WarnsState = {
    error?: string;
    loading: boolean;
    warns?: Warn[];
}

export default class Warns extends React.Component<WarnsProps,
    WarnsState> {
    constructor(props: WarnsProps) {
        super(props);

        this.state = {loading: true};

        this.RenderWarns();
    }

    private async RenderWarns() {
        try {
            const data = await GetWarns(this.props.userId);
            this.setState({
                warns: data
            });

        } catch (err) {
            this.setState({error: err.message});
        } finally {
            this.setState({loading: false});
        }
    }

    render() {
        const {warns} = this.state;

        if (!warns) {
            return (
                this.state.loading ?
                    <Spinner/> :
                    <Flex direction="column" className="error-container">
                        <Headline>{this.state.error}</Headline>
                        <Button type="outline" toggle="blue">
                            {locales.common.close}
                        </Button>
                    </Flex>
            );
        }

        return <Accordion spacing="none" allowMultiple>{
            warns.map(warn => {
                let beautifiedReason = GetShortDeleteReason(warn.reason)?.name.toLowerCase();
                return <AccordionItem
                    padding="xxs"
                    title={beautifiedReason + " | " + warn.time + " | от " + warn.warner}
                    titleSize="small">
                    <Box padding="xs">{warn.reason}</Box>
                    <SeparatorHorizontal />
                    <Box padding="xs"><div dangerouslySetInnerHTML={{__html: warn.content}}/></Box>
                </AccordionItem>;
            })
        }</Accordion>;
    }
}