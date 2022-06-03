import React from "react";
import { Flex, Headline, Button, Input, Text, Select } from "brainly-style-guide";
import locales from "@locales";
import type { Mentee } from "@typings";
import _API from "@lib/api/extension";

type AddMenteeBoxState = {
  error?: string;
  loading: boolean;
  userId?: number;
  mentors: {id: number; nick: string}[];
  mentorId?: number;
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

    this.state = { loading: false, mentors: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    _API.GetCommonMentorsData().then(data => {
      this.setState({
        mentors: data.mentors
      });
    });
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.currentTarget.value;
    let userIdMatch = /(?<=\/profile?\/[A-Za-z0-9]+-)\d+/;

    this.setState({ 
      error: !userIdMatch.test(value) ?
        locales.errors.invalidUser :
        null,
      userId: +value.match(userIdMatch)
    });
  }

  async handleClick() {
    let { userId, mentorId } = this.state;
    if (!userId || !mentorId) return;

    this.setState({ loading: true });

    try {
      const data = await _API.AddMentee(userId, mentorId);
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
        <Flex marginTop="s" alignItems="center" alignSelf="center" fullWidth>
          <Flex marginRight="s" direction="column" className="sg-flex--gap-s" fullWidth>
            <Input 
              onChange={this.handleChange} 
              placeholder={locales.common.linkToUserProfile} 
              fullWidth
              disabled={this.state.loading}
            />
            <Select className="add-mentee-select" options={[
              { value: "0", text: locales.common.chooseMentor },
              ...this.state.mentors.map(mentor => (
                { value: mentor.id.toString(), text: mentor.nick }
              ))
            ]} color="default" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
              this.setState({ mentorId: +e.currentTarget.value })
            } />
          </Flex>
          <Button onClick={this.handleClick} loading={this.state.loading} type="solid-light" size="s">OK</Button>
        </Flex>
        {this.state.error && 
          <Text color="text-red-60" weight="bold" size="medium" align="to-center">{this.state.error}</Text>}
      </Flex>
    );
  }
}