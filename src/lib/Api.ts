import {
  ApiFailedResponse, 
  ApiSuccessResponse, 
  Candidate, 
  Market, 
  Mentee 
} from "@typings";

class Api {
  private extApiURL = process.env.NODE_ENV === "development" ? 
    "http://localhost:8000" :
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

    return res.data;
  }

  public async GetMentees(): Promise<{
    data: Mentee[]
  }> {
    return await this.Req("GET", "mentees");
  }

  public async AddMentee(data: {
    privileges: number[];
    id: number;
  }): Promise<ApiFailedResponse | ApiSuccessResponse> {
    return await this.Req("POST", "mentees", data);
  }

  public async ReviewAction(
    actionHash: string,
    actionStatus: "approved" | "disapproved"
  ): Promise<ApiSuccessResponse | ApiFailedResponse> {
    return await this.Req("POST", "actions/review", {
      hash: actionHash,
      status: actionStatus
    })
  }

  /** Candidates - ru market only */
  public async GetCandidates(): Promise<ApiFailedResponse | {
    data: Candidate[]
  }> {
    return await this.Req("GET", "candidates");
  }

  public async GetCandidate(userId: number): Promise<ApiFailedResponse | {
    data: Candidate
  }> {
    return await this.Req("GET", `candidate/${userId}`);
  }

  public async CheckCandidate(userId: number): Promise<ApiFailedResponse | {
    data: { errors: string[] }
  }> {
    return await this.Req("POST", `candidates/${userId}/check`);
  }

}

const _API = new Api();
export default _API;