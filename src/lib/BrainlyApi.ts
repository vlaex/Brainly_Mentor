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

  public async GetUserAvatars(userIds: number[]): Promise<{
    id: number;
    avatar: string;
  }[]> {
    let queries = {};

    userIds.forEach(id => {
      let key = `_${id}`;
      queries[key] = `userById(id: ${id}) { avatar {thumbnailUrl} }`;
    })

    let data = await this.GQLMultiple(queries)
    data = data.data;

    let users: {
      id: number;
      avatar: string;
    }[] = [];
    
    for(let key of Object.keys(data)) {
      users.push({
        id: +key.replace(/_/, ""),
        avatar: data[key]?.avatar?.thumbnailUrl || "/img/avatars/100-ON.png"
      });
    }
    
    return users;
  }
}

export default new BrainlyApi();