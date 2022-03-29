import React from "react";
import { Flex, Headline, Button, Input, Text, Checkbox } from "brainly-style-guide";
import locales from "@locales";
import type { Mentor } from "@typings";
import _API from "@lib/api/extension";

type AddMentorBoxState = {
  error?: string;
  loading: boolean;
  userId?: number;
  senior?: boolean;
}

type AddMentorBoxProps = {
  handler: (mentor: Mentor) => void;
}

export class AddMentorBox extends React.Component<
  AddMentorBoxProps,
  AddMentorBoxState
> {
  constructor(props: AddMentorBoxProps) {
    super(props);
    this.state = { loading: false, senior: false };
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.currentTarget.value;
    let userIdMatch = /(?<=(?<=brainly|znanija)\.com\/[a-zA-Z/\d]+-).+/;

    this.setState({ 
      error: !userIdMatch.test(value) ?
        locales.errors.invalidUser :
        null,
      userId: +value.match(userIdMatch)
    });
  }

  handleChangeCheckBox(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.currentTarget.checked;

    this.setState({
      senior: value
    });
  }

  async handleClick() {
    this.setState({ loading: true });

    try {
      const data = await _API.AddMentor({ 
        mentorId: this.state.userId, 
        senior: this.state.senior 
      });
      this.props.handler(data.mentor);
    } catch (err) {
      this.setState({ error: err.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <Flex direction="column" className="add-mentee-box">
        <Headline extraBold color="text-green-60">{locales.common.addMentor}</Headline>
        <Flex marginTop="s" marginBottom="xs" alignItems="center" className="sg-flex--gap-s">
          <Input 
            onChange={this.handleChange.bind(this)} 
            placeholder={locales.common.linkToUserProfile} 
            fullWidth
            disabled={this.state.loading}
          />
          <Checkbox onChange={this.handleChangeCheckBox.bind(this)} disabled={this.state.loading}>{locales.common.senior}</Checkbox>
          <Button onClick={this.handleClick.bind(this)} loading={this.state.loading} type="solid-mint" size="s">OK</Button>
        </Flex>
        {this.state.error && 
          <Text color="text-red-60" weight="bold" size="medium" align="to-center">{this.state.error}</Text>}
      </Flex>
    );
  }
}