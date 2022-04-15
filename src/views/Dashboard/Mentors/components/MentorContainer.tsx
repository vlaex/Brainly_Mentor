import React, { ChangeEvent } from "react";
import {
  Flex, Avatar, Headline, Text, Icon, Button, Link, Media, Checkbox, SeparatorHorizontal
} from "brainly-style-guide";

import locales from "@locales";
import type { Mentor, DashboardScreens } from "@typings";
import _API from "@lib/api/extension";

type MentorContainerProps = {
  mentor: Mentor;
  deleteHandler: () => void;
  switchScreen: (screen: DashboardScreens, mentor: Mentor) => void;
}

type MentorContainerState = {
  error?: string;
}

export default class MentorContainer extends React.Component<MentorContainerProps,
  MentorContainerState> {

  constructor(props: MentorContainerProps) {
    super(props);

    this.state = { error: null };
    this.DeleteMentor = this.DeleteMentor.bind(this);
    this.editSenior = this.editSenior.bind(this);
  }

  private async DeleteMentor() {
    // eslint-disable-next-line no-alert
    if (!confirm(locales.common.areYouSureToDeleteMentor)) return;

    await _API.DeleteMentor(this.props.mentor.id)
      .then(this.props.deleteHandler)
      .catch(err =>
        this.setState({ error: err.message })
      );
  }

  private async editSenior(event: ChangeEvent<HTMLInputElement>) {
    const mentor = this.props.mentor;
    let senior = event.target.checked;

    try {
      await _API.EditMentor(mentor.id, { senior: senior });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  render() {
    const mentor = this.props.mentor;
    const mentees = this.props.mentor.mentees;

    return (
      <Flex direction="column" className="mentor-container grid-item sg-flex--relative">
        <Flex alignItems="center" className="sg-flex--gap-s user-info">
          <Flex direction="column" fullWidth>
            <Link target="_blank" size="large" color="text-black"
              href={`/users/redirect_user/${mentor.id}`}>{mentor.nick}</Link>
          </Flex>
          <Flex justifyContent="space-between">
            <Flex className="sg-flex--gap-xs">
              <Button onClick={() => this.props.switchScreen("Mentees", mentor)} icon={<Icon type="seen" size={16} />} size="s" iconOnly
                type="solid-blue" title={locales.common.viewMentor} />
              <Button onClick={this.DeleteMentor}
                icon={<Icon type="trash" color="adaptive" size={16} />} size="s" iconOnly
                toggle="peach" type="outline" title={locales.common.deleteMentor} />
            </Flex>
          </Flex>
        </Flex>
        <Checkbox defaultChecked={mentor.senior} onChange={this.editSenior}>{locales.common.senior}</Checkbox>
        <SeparatorHorizontal className="sg-flex--margin-xs" />
        <Flex justifyContent="space-between">
          <Headline>
            {mentees.length ? locales.common.mentees : locales.common.noMentees}
          </Headline>
          <Text size="small" weight="bold" color="text-gray-70" align="to-right" type="span">{mentees.length.toString()}</Text>
        </Flex>
        <Flex direction="column" className="mentor-mentees-list">
          {mentees.map(mentee => {
            const menteeId = mentee.id;

            return (
              <Media key={menteeId} contentArray={[
                <Link key={menteeId} href={`/users/redirect_user/${mentee.id}`} target="_blank" color="text-gray-70">{mentee.nick}</Link>,
                <span key={menteeId}>{mentee.rank}</span>
              ]} aside={<Avatar imgSrc={mentee.avatar} />} />);
          })}
        </Flex>

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