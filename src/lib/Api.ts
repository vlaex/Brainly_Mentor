import {
	Action,
	Market, 
	Mentee, 
	BasicSuccessResponse,
	ActionFilters
} from "@typings";
import locales from "@locales";

class Api {
	private extApiURL = process.env.NODE_ENV === "development" ?
		"http://localhost:8080" :
		"https://mentors.br-helper.com";

	private market: string = locales.market;
	private authToken = "test";

	get Market() {
		return this.market;
	}

	set SetMarket(market: Market) {
		this.market = market;
	}

	private async Req(
		method: "GET" | "POST" | "PUT" | "DELETE",
		apiMethod: string,
		data?: unknown,
		queryParams?: {[key: string]: unknown}
	) {
		let url = `${this.extApiURL}/${this.market}/${apiMethod}`;
		for (let queryKey in queryParams) {
			let startSymbol = url.split("?")[1] ? "&" : "?";
			let value = queryParams[queryKey];

			if (!value) continue;

			url += startSymbol + `${queryKey}=${value}`;
		}

		const res = await fetch(url, {
			method: method,
			body: data ? JSON.stringify(data) : null,
			headers: {
				"Authorization": `Bearer ${this.authToken}`
			}
		});
		
		if (!res.ok) throw Error(locales.errors.internalError);
		
		const resData = await res.json();

		if (resData.error) {
			let errorMessage = locales.errors[resData.error] || locales.errors.internalError;
			throw Error(errorMessage);
		}

		return resData;
	}

	public async GetActions(
		userId: number, 
		pageId: number,
		filters?: ActionFilters
	): Promise<{
		actions: Action[],
		hasMore: boolean;
	}> {
		return await this.Req("GET", `actions/${userId}/${pageId}`, null, filters);
	}

	public async GetMentees(): Promise<{
		mentees: Mentee[];
	}> {
		return await this.Req("GET", "mentees");
	}

	public async AddMentee(userId: number): Promise<{
		mentee: Mentee;
	}> {
		return await this.Req("POST", "mentees", { id: userId });
	}
	
	public async EditMentee(userId: number, data: {
		nick: string;
		note: string;
	}): Promise<BasicSuccessResponse> {
		return await this.Req("PUT", `mentees/${userId}`, data);
	}

	public async DeleteMentee(userId: number): Promise<BasicSuccessResponse> {
		return await this.Req("DELETE", `mentees/${userId}`);
	}

	public async ReviewAction(data: {
		userId: number;
		pageId: number;
		hash: string;
		status: Action["reviewStatus"];
	}): Promise<BasicSuccessResponse> {
		return await this.Req("POST", "actions/review", data);
	}

}

const _API = new Api();
export default _API;