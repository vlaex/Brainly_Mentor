import BrainlyApi from "@lib/api/brainly";
import storage from "@lib/storage";
import locales from "@locales";
import { Flash } from "@utils/Flashes";

storage.get(`authToken_${locales.market}`).then(async function(token) {
  if (token) return;

  try {
    const userConversation = await BrainlyApi.GetDM(locales.botUserId);

    const mentorTokenRegex = /(?<=\[).+(?=__brainly-mentor]$)/;

    const lastMessage = userConversation.data.messages
      .reverse()
      .find(message => 
        message.user_id === locales.botUserId &&
        message.content.match(mentorTokenRegex)
      );

    const mentorToken = lastMessage.content
      .split("\n")
      .pop()
      .match(mentorTokenRegex)?.[0];
    
    if (!mentorToken) throw Error(locales.errors.couldNotFindAuthTokenInDM);

    await storage.set(`authToken_${locales.market}`, mentorToken);

    Flash({
      type: "success",
      text: locales.common.youHaveBeenAuthorized,
      withIcon: true
    });

  } catch (err) {
    Flash({
      type: "info",
      sticky: true,
      text: `${locales.errors.couldNotAuthorizeYou}: ${err.message}`,
      withIcon: true
    });
  }

});