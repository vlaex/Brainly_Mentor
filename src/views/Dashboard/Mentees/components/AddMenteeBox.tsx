import React from "react";
import { Flex, Headline, Button, Input, Text } from "brainly-style-guide";
import locales from "@locales";
import type { Mentee } from "@typings";
import _API from "@lib/api/extension";

type AddMenteeBoxState = {
  error?: string;
  loading: boolean;
  userId?: number;
}

type AddMenteeBoxProps = {
  handler: (mentee: Mentee) => void;
}

export class AddMenteeBox extends React.Component<
  AddMenteeBoxProps,
  AddMenteeBoxState
> {
  constructor(props: AddMenteeBoxProps) {
    super(props);

    this.state = { loading: false };
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

  async handleClick() {
    this.setState({ loading: true });

    try {
      const data = await _API.AddMentee(this.state.userId);
      this.props.handler(data.mentee);
    } catch (err) {
      this.setState({ error: err.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <Flex direction="column" className="add-mentee-box">
        <Headline extraBold color="text-green-60">{locales.common.addMentee}</Headline>
        <Flex marginTop="s" marginBottom="xs" alignItems="center" className="sg-flex--gap-s">
          <Input 
            onChange={this.handleChange.bind(this)} 
            placeholder={locales.common.linkToUserProfile} 
            fullWidth
            disabled={this.state.loading}
          />
          <Button onClick={this.handleClick.bind(this)} loading={this.state.loading} type="solid-mint" size="s">OK</Button>
        </Flex>
        {this.state.error && 
          <Text color="text-red-60" weight="bold" size="medium" align="to-center">{this.state.error}</Text>}
      </Flex>
    );
  }
}