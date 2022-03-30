import React from "react";
import {
  Spinner,
  Accordion,
  Bubble,
  Flex,
  Headline
} from "brainly-style-guide";
import md5 from "md5";

import type { Warn } from "@typings";
import locales from "@locales";
import GetWarns from "@lib/GetWarns";
import _API from "@lib/api/extension";

import BanSection from "./BanSection";
import WarnEntry from "./WarnEntry";

type WarnsProps = {
  userId: number;
} & React.HTMLAttributes<HTMLElement>;

type WarnsState = {
  loading: boolean;
  warns?: Warn[];
}

export default class Warns extends React.Component<WarnsProps, WarnsState> {
  state: WarnsState = { loading: true };

  componentDidMount() {
    GetWarns(this.props.userId)
      .then(data => 
        this.setState({ warns: data })
      )
      .finally(() =>
        this.setState({ loading: false })
      );
  }

  render() {
    const { warns, loading } = this.state;

    if (!warns?.length) {
      return (
        <Bubble direction="left" className="warnsBox">
          {loading && <Spinner size="xsmall" />}
          {warns?.length < 1 && 
            <Flex direction="column">
              <img draggable="false" className="no-warns-meme" src={`${_API.serverURL}/static/travolta.gif`} />
              <Headline color="text-red-60" size="small" align="to-center">{locales.common.noWarns}</Headline>
            </Flex>
          }
        </Bubble>
      );
    }

    return (
      <Bubble direction="left" className="warnsBox">
        <BanSection userId={this.props.userId} />
        <Accordion spacing="none" allowMultiple>
          {warns.map(warn => 
            <WarnEntry warn={warn} key={md5(warn.reason + warn.time + warn.content)} />)
          }
        </Accordion>
      </Bubble>
    );
  }
}