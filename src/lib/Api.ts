import {
  Action,
  Candidate, 
  Market, 
  Mentee, 
  BasicSuccessResponse
} from "@typings";

class Api {
  private extApiURL = process.env.NODE_ENV === "development" ? 
    "http://localhost:8080" :
    "https://mentors.br-helper.com";

  private market: "ru" | "us" = "us";
  private authToken: string = "test";

  get Market() {
    return this.market;
  }

  set SetMarket(market: Market) {
    this.market = market;
  }

  private async Req(
    method: "GET" | "POST",
    apiMethod: string,
    data?: any,
  ) {
    const url: string = `${this.extApiURL}/${this.market}/${apiMethod}`;

    const res = await fetch(url, {
      method: method,
      body: data ? JSON.stringify(data) : null,
      headers: {
        "Authorization": `Bearer ${this.authToken}`
      }
    }).then(r => r.json());

    if(res.error) throw Error(res.error);

    return res;
  }

  public async GetActions(userId: number, pageId: number): Promise<{
    actions: Action[],
    pagination: {
      hasMore: boolean;
      nextPage?: number;
    }
  }> {
    return await this.Req("GET", `actions/${userId}/${pageId}`);
  }

  public async GetMentees(): Promise<{
    mentors: Mentee[];
  }> {
    return await this.Req("GET", "mentees");
  }

  public async ReviewAction(
    actionHash: string,
    actionStatus?: "approved" | "disapproved"
  ): Promise<BasicSuccessResponse> {
    return await this.Req("POST", "actions/review", {
      hash: actionHash,
      status: actionStatus
    })
  }

  /** Candidates - ru market only */
  public async GetCandidates(): Promise<{
    candidates: Candidate[];
  }> {
    return await this.Req("GET", "candidates");
  }

  public async GetCandidate(userId: number): Promise<{
    candidate: Candidate;
  }> {
    return await this.Req("GET", `candidate/${userId}`);
  }

  public async CheckCandidate(userId: number): Promise<{
    checked: true;
    errors: string[];
  }> {
    return await this.Req("POST", `candidates/${userId}/check`);
  }

}

const _API = new Api();
export default _API;