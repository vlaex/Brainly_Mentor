import React, { ChangeEvent } from "react";
import {
  Box, Flex, Avatar, Headline, Text, Icon, Button, Link, Media, Checkbox, SeparatorHorizontal
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
      <Box color="white"
        className="mentee-container grid-item sg-flex--relative">
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
        <Checkbox defaultChecked={mentor.senior} onChange={(e: ChangeEvent<HTMLInputElement>) => this.editSenior(e)}>{locales.common.senior}</Checkbox>
        <SeparatorHorizontal className="sg-flex--margin-xs" />
        <Headline >{mentees.length ? locales.common.mentees : locales.common.noMentees }</Headline>
        {mentees.map(mentee => {
          const key = mentee.id;
          return (
            <Media key={key} contentArray={[
              <Link key={key} href={`/users/redirect_user/${mentee.id}`} color="text-gray-70">{mentee.nick}</Link>,
              <span key={key}>{mentee.rank}</span>
            ]} aside={
              <Avatar imgSrc={mentee.avatar} />} />);
        })}

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
      </Box>
    );
  }
}