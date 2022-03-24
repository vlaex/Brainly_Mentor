import BrainlyApi from ".";
import type {
  GetActionsDataType,
  GetReviewedActionsDataType
} from "@typings";
import _API from "../extension";
import GetBrainlyActions from "./GetBrainlyActions";

export default async function GetActions(moderatorId: number, pageId: number): Promise<
  GetActionsDataType
> {
  let promises: [
    Promise<GetActionsDataType>,
    Promise<GetReviewedActionsDataType>
  ] = [
    GetBrainlyActions(moderatorId, pageId),
    _API.GetReviewedActions(moderatorId)
  ];

  let data = await Promise.all(promises);
  let actions = data[0].actions;

  // Get extra data
  let extraDataQuery = "";
  actions.forEach(action => {
    let userId = action.user.id;
    let userGlobalId = btoa(`user:${userId}`);

    extraDataQuery += `_${userId}: user(id: "${userGlobalId}") {
      avatar {thumbnailUrl url}
      specialRanks {name id}
    } `;
  });

  let extraData = await BrainlyApi.GQL(`query GetUsers { ${extraDataQuery} }`);
  let users = Object.keys(extraData.data).map(x => (
    { ...extraData.data[x], id: +x.replace(/_/, "") }
  ));

  for (let action of actions) {
    action.reviewStatus = data[1].approved.includes(action.hash) ? 
      "APPROVED" :
      data[1].disapproved.includes(action.hash) ? 
      "DISAPPROVED" : 
      "NONE";

    let userData = users.find(user => user.id === action.user.id);

    action.user.avatar = userData?.avatar?.url || "";
    action.user.isModerator = !!userData?.specialRanks?.length;
  }

  return data[0];
}