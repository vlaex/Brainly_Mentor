import BrainlyApi from "@lib/api/brainly";
import storage from "@lib/storage";
import locales from "@locales";
import { Flash } from "@utils/Flashes";

storage.get("authToken").then(async function(token) {
  if (token) return;

  try {
    const userConversation = await BrainlyApi.GetDM(locales.botUserId);

    const lastMessage = userConversation.data.messages
      .reverse()
      .find(message => message.user_id === locales.botUserId);
    
    const mentorToken = lastMessage?.content.match(/(?<=\[).+(?=__brainly-mentor]$)/)?.[0];
    if (!mentorToken) throw Error(locales.errors.couldNotFindAuthTokenInDM);

    await storage.set("authToken", mentorToken);

    Flash({
      type: "success",
      text: locales.common.youHaveBeenAuthorized
    });

  } catch (err) {
    Flash({
      type: "info",
      sticky: true,
      text: `${locales.errors.couldNotAuthorizeYou}: ${err.message}`
    });
  }

});