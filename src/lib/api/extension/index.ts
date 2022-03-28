import type {
  Action,
  Mentee, 
  BasicSuccessResponse,
  Mentor,
  Candidate
} from "@typings";
import locales from "@locales";
import storage from "@lib/storage";

const ERRORS = locales.errors;

class Api {
  private serverUrl = "https://mentors.br-helper.com";
  private market: string = locales.market;

  get serverURL() {
    return this.serverUrl;
  }

  private async Request(
    method: "GET" | "POST" | "PUT" | "DELETE",
    apiMethod: string,
    body?
  ) {
    const authToken = await storage.get("authToken");
    if (!authToken) throw Error(ERRORS.notAuthed);

    let url = `${this.serverURL}/${this.market}/${apiMethod}`;
    let headers = {
      "Authorization": `Bearer ${authToken}`
    };
    
    if (body) {
      body = JSON.stringify(body);
      headers["Content-Type"] = "application/json; charset=utf-8";
    }

    const res = await fetch(url, {
      method, 
      body, 
      headers 
    }).then(r => r.json());
    
    if (res.error) {
      let errorMessage = ERRORS[res.error || "internalError"];

      throw Error(errorMessage);
    }

    return res;
  }

  async GetReviewedActions(mentorId: number): Promise<{
    approved: string[];
    disapproved: string[];
  }> {
    return await this.Request("GET", `actions/reviewed/${mentorId}`);
  }

  async ReviewActions(
    hash: string | string[],
    moderatorId: number,
    status: Action["reviewStatus"]
  ) {
    let hashList = hash as string[];

    if (typeof hash === "string")
      hashList = [hash];

    return await this.Request("PUT", "actions/review", { 
      hashList, 
      status, 
      moderatorId 
    });
  }

  async GetMentees(mentorId?: number): Promise<{
    mentees: Mentee[];
  }> {
    let path = "mentees";
    if (mentorId) path += `?id=${mentorId}`;

    return await this.Request("GET", path);
  }

  async GetMenteesNicks(): Promise<{ mentees: string[] }> {
    return await this.Request("GET", "mentees?nicksOnly=true");
  }

  async AddMentee(userId: number): Promise<{
    mentee: Mentee;
  }> {
    return await this.Request("POST", "mentees", { id: userId });
  }
  
  async EditMentee(mentorId: number, menteeId: number, data: {
    note: string;
  }): Promise<BasicSuccessResponse> {
    return await this.Request("PUT", `mentees/${mentorId}/${menteeId}`, data);
  }

  async DeleteMentee(mentorId: number, userId: number): Promise<BasicSuccessResponse> {
    return await this.Request("DELETE", `mentees/${mentorId}/${userId}`);
  }

  async GetMentors(): Promise<{
    mentors: Mentor[]
  }> {
    return await this.Request("GET", "mentors");
  }

  async AddMentor(data: {
    mentorId: boolean;
    senior: boolean;
  }): Promise<{
    mentor: Mentor
  }> {
    return await this.Request("POST", "mentors", data);
  }

  async DeleteMentor(mentorId: number): Promise<BasicSuccessResponse> {
    return await this.Request("DELETE", `mentors/${mentorId}`);
  }

  async EditMentor(mentorId: number, data: {
    nick: string;
    senior: boolean;
  }): Promise<BasicSuccessResponse> {
    return await this.Request("PUT", `mentors/${mentorId}`, data);
  }

  async GetCandidates(id?: number): Promise<{
    candidates: Candidate[];
  }> {
    let path = "candidates";
    if (id) path += `?id=${id}`;

    return await this.Request("GET", path);
  }

  async ReviewCandidate(id: number): Promise<{ warnings: string[] }> {
    return await this.Request("POST", `candidates/review/${id}`);
  }

}

const _API = new Api();
export default _API;