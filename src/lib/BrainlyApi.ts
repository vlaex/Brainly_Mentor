import locales from "@locales";

class BrainlyApi {
  private graphqlURL = `https://brainly.com/graphql/${locales.market}`;
  private legacyApiURL = `https://${locales.marketHost}/api/28`;

  private async GQL(
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

  public async GetUsers(userIds: number[]): Promise<{
    id: number;
    avatar: string;
    specialRanks: {
      name: string;
      id: string;
    }[];
  }[]> {
    if (!userIds.length) return [];

    let query = "";

    userIds.forEach(id => {
      let userGlobalId = btoa(`user:${id}`);

      query += `_${id}: user(id: "${userGlobalId}") {
        avatar {thumbnailUrl}
        specialRanks {name id}
      } `;
    });

    let data = await this.GQL(`{ ${query} }`);
    data = data.data;

    let users = [];
    
    for (let key of Object.keys(data)) {
      users.push({
        id: +key.replace(/_/, ""),
        avatar: data[key]?.avatar?.thumbnailUrl || "",
        specialRanks: data[key]?.specialRanks || []
      });
    }
    
    return users;
  }
  
}

export default new BrainlyApi();