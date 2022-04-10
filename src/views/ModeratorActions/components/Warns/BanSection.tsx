import React from "react";
import { Flex, Text, SeparatorVertical, Link } from "brainly-style-guide";
import moment from "moment";

import GetUserBanDetails, { UserBanDetails } from "@lib/api/brainly/GetUserBanDetails";
import { Flash } from "@utils/Flashes";
import locales from "@locales";

type BanSectionState = {
  banDetails?: UserBanDetails;
  expiresIn?: Date;
  left: string;
}

export default class BanSection extends React.Component<{ userId: number }, BanSectionState> {
  private intervalId: number;

  state: BanSectionState = { banDetails: null, expiresIn: null, left: "" };
  
  private leftTimer() {
    const expiresIn = this.state.expiresIn;
    const now = moment().tz(locales.timezone).toDate();
    
    let ms = +expiresIn - +now;
    let msInSecond = 1000;
    let msInMinute = 60 * msInSecond;
    let msInHour = 60 * msInMinute;
    let h = Math.floor(ms / msInHour);
    ms %= msInHour;
    let m = Math.floor(ms / msInMinute);
    ms %= msInMinute;
    let s = Math.floor(ms / msInSecond);

    let left = `
      ${locales.common.bans_LEFT}: ${h}:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}
    `;

    this.setState({ left: left });
  }

  componentDidMount() {
    GetUserBanDetails(this.props.userId)
      .then(data => {
        this.setState({ 
          banDetails: data,
          expiresIn: data.active?.expiresIn
        });
          
        if (data.active?.expiresIn) {
          setInterval(this.leftTimer.bind(this), 1000);
          this.leftTimer();
        }

      })
      .catch(err =>
        Flash({
          type: "error",
          text: err.message
        })
      );
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    let banDetails = this.state.banDetails;

    return (
      <Flex fullWidth marginBottom="xxs">
        {banDetails && 
          <Flex fullWidth alignItems="center">
            <Text className="sg-flex--no-shrink">
              {locales.common.bans}:
              <Text type="span" inherited weight="bold" color="text-red-60"> {banDetails.banCount}</Text>
            </Text>
            {!!banDetails.active && <>
              <SeparatorVertical color="gray-50" />
              <Flex direction="column"className="ban-active" fullWidth>
                <Text size="small">
                  <Text weight="bold" inherited type="span">{banDetails.active.type}</Text>
                  . {locales.common.givenBy}
                  <Link inherited weight="bold" target="_blank" href={banDetails.active.givenBy.link}> {banDetails.active.givenBy.nick}</Link>
                </Text>
                <Text size="xsmall">
                  {this.state.left || locales.common.hasNotStartedYet}
                </Text>
              </Flex>
            </>}
          </Flex>
        }
      </Flex>
    );
  }
}