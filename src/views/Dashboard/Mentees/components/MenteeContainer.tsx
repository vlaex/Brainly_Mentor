import React, { FocusEvent } from "react";
import {
  Flex, Avatar, Headline, Text, Icon, Button, Link
} from "brainly-style-guide";

import { LineChart } from "./Charts";
import locales from "@locales";
import type { Mentee } from "@typings";
import _API from "@lib/api/extension";

const MENTEE_CHART_TYPES = ["daily", "weekly", "monthly"] as const;
type MenteeChartsType = typeof MENTEE_CHART_TYPES[number];

type MenteeContainerProps = {
  data: Mentee;
  deleteHandler: () => void;
  canDelete: boolean;
}

type MenteeContainerState = {
  error?: string;
  chartsType: MenteeChartsType;
}

export default class MenteeContainer extends React.Component<
  MenteeContainerProps,
  MenteeContainerState
> {
  constructor(props: MenteeContainerProps) {
    super(props);

    this.state = { chartsType: "daily" };

    this.DeleteMentee = this.DeleteMentee.bind(this);
    this.EditNote = this.EditNote.bind(this);
  }

  private async DeleteMentee() {
    // eslint-disable-next-line no-alert
    if (!confirm(locales.common.areYouSureToDeleteMentee)) return;

    await _API.DeleteMentee(this.props.data.mentorId, this.props.data.id)
      .then(this.props.deleteHandler)
      .catch(err => 
        this.setState({ error: err.message }) 
      );
  }

  private async EditNote(event: FocusEvent<HTMLInputElement>) {
    let mentee = this.props.data;
    let note = event.target.value;

    if (!note.length) return;

    try {
      await _API.EditMentee(mentee.mentorId, mentee.id, { note });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  private ChangeChartsType(type: MenteeChartsType) {
    this.setState({ chartsType: type });
  }

  render() {
    const mentee = this.props.data;
    const chartsType = this.state.chartsType;

    return (
      <Flex direction="column" className="mentee-container grid-item sg-flex--relative">
        <Flex alignItems="center" className="sg-flex--gap-s user-info">
          <Avatar size="m" border={false} imgSrc={mentee.avatar} />
          <Flex direction="column" fullWidth>
            <Link target="_blank" size="large" color="text-black" href={`/users/redirect_user/${mentee.id}`}>{mentee.nick}</Link>
            <Flex direction="column" className="user-ranks">
              {mentee.rank.split("\n").map(rank =>
                <Headline key={rank} transform="uppercase" size="small" color="text-blue-60">{rank}</Headline>
              )}
            </Flex>
            <input onBlur={this.EditNote} type="text" className="user-note" placeholder={locales.common.note} defaultValue={mentee.note} />
          </Flex>
        </Flex>
        <Flex justifyContent="space-between" marginTop="s">
          <Flex direction="column">
            <Headline extraBold transform="uppercase" size="medium" color="text-gray-70" type="h3">{mentee.charts[chartsType].count}</Headline>
            <Flex className="sg-flex--gap-xs mentee-stats-options">
              {MENTEE_CHART_TYPES.map(chartType => 
                <Text 
                  key={chartType} 
                  onClick={_ => this.ChangeChartsType(chartType)} 
                  size="small" 
                  weight={chartsType === chartType ? "bold" : "regular"}
                >{locales.common[chartType]}</Text>
              )}
            </Flex>
          </Flex>
          <Flex className="sg-flex--gap-xs">
            <Link href={`/moderation_new/view_moderator/${mentee.id}`} target="_blank">
              <Button icon={<Icon type="open_in_new_tab" size={16} />} size="s" iconOnly type="facebook" title={locales.common.viewActions} />
            </Link>
            {this.props.canDelete &&
              <Button onClick={this.DeleteMentee} icon={<Icon type="trash" color="adaptive" size={16} />} size="s" iconOnly type="outline" title={locales.common.deleteMentee} />
            }
          </Flex>
        </Flex>
        <LineChart dataset={mentee.charts[chartsType].dataset} type={chartsType} />
        {this.state.error && <Flex alignItems="center" className="mentee-container-bottom-error">
          <Icon type="info" color="icon-red-50" size={24} />
          <Text size="small" weight="bold">{this.state.error}</Text>
          <Button 
            onClick={() => this.setState({ error: null })} 
            type="transparent" 
            iconOnly 
            icon={<Icon type="close" size={16} color="icon-black" />} 
            size="s" 
          />
        </Flex>}
      </Flex>
    );
  }
}