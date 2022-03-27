import locales from "@locales";

export interface UserBanDetails {
  banCount: number;
}

export default async function (userId: number): Promise<UserBanDetails> {
  const res = await fetch(`
    ${locales.marketURL}/users/redirect_user/${userId}
  `);

  if (res.status === 410) throw Error(locales.errors.accountDeleted);

  let profileHTML = await res.text();
  let doc = new DOMParser().parseFromString(profileHTML, "text/html");

  let modPanel = doc.querySelector(".mod-profile-panel");

  return {
    banCount: +modPanel.querySelectorAll(".fright > .orange")?.[1]?.textContent,
  };
}