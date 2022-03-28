import locales from "@locales";
import moment from "moment";

export interface UserBanDetails {
  banCount: number;
  active?: {
    givenBy: {
      link: string;
      nick: string;
    };
    type: string;
    expiresIn: Date;
  }
}

export default async function (userId: number): Promise<UserBanDetails> {
  const res = await fetch(`
    ${locales.marketURL}/${locales.profilePath}/__nick__-${userId}
  `);

  if (res.status === 410) throw Error(locales.errors.accountDeleted);

  let profileHTML = await res.text();
  let doc = new DOMParser().parseFromString(profileHTML, "text/html");

  const modPanel = doc.querySelector(".mod-profile-panel");
  const cancelBanElement = doc.querySelector(`a[href^="/bans/cancel"]`)
    ?.parentElement?.parentElement;

  const activeBanDetails = {} as UserBanDetails["active"];
  const banDetails = {} as UserBanDetails;

  if (cancelBanElement) {
    activeBanDetails.type = cancelBanElement.nextElementSibling
      ?.querySelector(".orange")
      ?.textContent;

    const moderatorLink = cancelBanElement.nextElementSibling
      ?.nextElementSibling
      ?.querySelector("a");

    activeBanDetails.givenBy = {
      link: moderatorLink.href,
      nick: moderatorLink.textContent,
    };

    const expiresDateText = cancelBanElement.nextElementSibling
      ?.nextElementSibling?.nextElementSibling
      ?.querySelector(".orange")
      ?.textContent;

    if (expiresDateText)
      activeBanDetails.expiresIn = moment(expiresDateText).tz(locales.timezone, true).toDate();

    banDetails.active = activeBanDetails;
  }

  banDetails.banCount = +modPanel.querySelectorAll(".fright > .orange")?.[1]?.textContent;

  return banDetails;
}