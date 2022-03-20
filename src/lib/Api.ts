import type {
  Action,
  Mentee, 
  BasicSuccessResponse,
  Mentor
} from "@typings";
import locales from "@locales";
import storage from "./storage";

class Api {
  private extApiURL = "https://mentors.br-helper.com";
  private market: string = locales.market;

  private async Request(
    method: "GET" | "POST" | "PUT" | "DELETE",
    apiMethod: string,
    body?
  ) {
    const authToken = await storage.get("authToken");
    if (!authToken) throw Error(locales.errors.notAuthed);

    let url = `${this.extApiURL}/${this.market}/${apiMethod}`;
    let headers = {
      "Authorization": `Bearer ${authToken}`
    };
    
    if (body) {
      body = JSON.stringify(body);
      headers["Content-Type"] = "application/json; charset=utf-8";
    }

    const res = await fetch(url, { method, body, headers }).then(r => r.json());
    
    if (res.error) {
      let errorMessage = locales.errors[res.error] || locales.errors.internalError;
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

  async GetMentees(mentorId: number): Promise<{
    mentees: Mentee[];
  }> {
    return await this.Request("GET", `mentees/${mentorId}`);
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

}

const _API = new Api();
export default _API;