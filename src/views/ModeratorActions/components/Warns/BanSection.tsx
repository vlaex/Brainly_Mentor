import React from "react";
import {
  Flex,
  Text,
  Link
} from "brainly-style-guide";
import GetUserBanDetails, { UserBanDetails } from "@lib/api/brainly/GetUserBanDetails";
import { Flash } from "@utils/Flashes";

type BanSectionState = {
  banDetails?: UserBanDetails;
}

export default class BanSection extends React.Component<{ userId: number }, BanSectionState> {
  state: BanSectionState = { banDetails: null };

  componentDidMount() {
    GetUserBanDetails(this.props.userId)
      .then(data => {
        this.setState({ banDetails: data });
      })
      .catch(err =>
        Flash({
          type: "error",
          text: err.message
        })
      );
  }

  render() {
    let banDetails = this.state.banDetails;

    return (
      <Flex>
        {banDetails && 
          <Flex>
            <Text>
              Баны: <Link href="sdds" inherited weight="bold">{banDetails.banCount}</Link>
            </Text>
          </Flex>
        }
      </Flex>
    );
  }
}