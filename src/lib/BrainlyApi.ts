import locales from "@locales";
import type { 
  GetConversationResponse,
  GetMessagesResponse
} from "@typings/brainly";

class BrainlyApi {
  private graphqlURL = `https://brainly.com/graphql/${locales.market}`;
  private legacyApiURL = `https://${locales.marketHost}/api/28`;

  private async LegacyApiReq(
    method: "GET" | "POST",
    apiMethod: string,
    body?
  ) {
    const res = await fetch(`${this.legacyApiURL}/${apiMethod}`, {
      method,
      body: method === "GET" ? null : JSON.stringify(body)
    }).then(data => data.json());

    if (!res.success) throw Error(res.message || locales.errors.brainlyError);

    return res.data;
  }

  public async GQL(
    query: string, 
    variables?: unknown
  ) {
    return await fetch(this.graphqlURL, {
      method: "POST",
      body: JSON.stringify({ query, variables }),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }).then(data => data.json());
  }

  /* eslint-disable */
  public async GetDM(userId: number): Promise<GetMessagesResponse> {
    const conversation: GetConversationResponse = await this.LegacyApiReq(
      "POST", 
      "api_messages/check", 
      {
        user_id: userId
      }
    );

    return await this.LegacyApiReq("GET", `api_messages/get_messages/${conversation.conversation_id}`);
  }
  
}

export default new BrainlyApi();