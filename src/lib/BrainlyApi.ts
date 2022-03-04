import locales from "@locales";

class BrainlyApi {
  private grapgqlURL = `https://brainly.com/graphql/${locales.market}`;

  private async GQL(
    query: string, 
    variables?: any
  ) {
    return await fetch(this.grapgqlURL, {
      method: "POST",
      body: JSON.stringify({ query, variables }),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }).then(data => data.json());
  }

  private async GQLMultiple(operations: {
    [key: string]: string
  }) {
    let q = ``;
    for(let operationKey in operations) {
      q += `${operationKey}: ${operations[operationKey]} `;
    };

    return await this.GQL(`{ ${q} }`);
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

    let queries = {};

    userIds.forEach(id => {
      let key = `_${id}`;
      queries[key] = `userById(id: ${id}) { 
        avatar {thumbnailUrl}
        specialRanks {name id}
      }`;
    })

    let data = await this.GQLMultiple(queries)
    data = data.data;

    let users = [];
    
    for(let key of Object.keys(data)) {
      users.push({
        id: +key.replace(/_/, ""),
        avatar: data[key]?.avatar?.thumbnailUrl || "/img/avatars/100-ON.png",
        specialRanks: data[key]?.specialRanks || []
      });
    }
    
    return users;
  }
}

export default new BrainlyApi();