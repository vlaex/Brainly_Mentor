import locales from "@locales";
import type { 
  CommonResponse,
  GetConversationResponse,
  GetMessagesResponse,
  GetQuestionLogResponse,
  GetQuestionResponse
} from "@typings/brainly";

class BrainlyApi {
  private graphqlURL = `https://${locales.marketHost}/graphql/${locales.market}`;
  private legacyApiURL = `https://${locales.marketHost}/api/28`;
  private tokenLong: string;

  constructor() {
    this.SetAuthToken();
  }

  private SetAuthToken() {
    let cookie = document.cookie.split("; ").find(cookie => /\[Token\]\[Long\]/i.test(cookie));
    this.tokenLong = cookie?.split("=")?.pop();
  }

  private async LegacyApiReq<T>(
    method: "GET" | "POST",
    apiMethod: string,
    body?
  ): Promise<CommonResponse<T>> {
    const res = await fetch(`${this.legacyApiURL}/${apiMethod}`, {
      method,
      body: method === "GET" ? null : JSON.stringify(body)
    }).then(data => data.json());

    if (!res.success) throw Error(res.message || locales.errors.brainlyError);

    return res;
  }

  public async GQL(
    query: string, 
    variables?
  ) {
    return await fetch(this.graphqlURL, {
      method: "POST",
      body: JSON.stringify({ query, variables }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "X-B-Token-Long": this.tokenLong
      }
    }).then(data => data.json());
  }

  /* eslint-disable camelcase, max-len */
  public async GetDM(userId: number): Promise<GetMessagesResponse> {
    const conversation: GetConversationResponse = await this.LegacyApiReq(
      "POST", 
      "api_messages/check", 
      { user_id: userId }
    );

    return await this.LegacyApiReq(
      "GET", 
      `api_messages/get_messages/${conversation.data.conversation_id}`
    );
  }

  public async GetQuestion(id: number): Promise<GetQuestionResponse> {
    return await this.LegacyApiReq("GET", `api_tasks/main_view/${id}`);
  }

  public async GetQuestionLog(id: number): Promise<GetQuestionLogResponse> {
    return await this.LegacyApiReq("GET", `api_task_lines/big/${id}`);
  }
}

export default new BrainlyApi();