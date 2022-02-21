import locales from "@locales";
import { Action } from "@typings";
import { GetShortDeleteReason } from "@utils/GetDeleteReason";

import moment from "moment";

const regexps = locales.regexps;

export default async function GetActions(moderatorId: number, pageId: number): Promise<{
  actions: Action[];
  hasNextPage: boolean;
}> {
  let url = `${locales.marketURL}/moderation_new/view_moderator/${moderatorId}/page:${pageId}`;

  let r = await fetch(url);
  if(r.status !== 200) throw Error(locales.errors.couldNotLoadActions);

  let text = await r.text();
  let doc = new DOMParser().parseFromString(text, "text/html");

  let actions: Action[] = [];

  for(let activity of doc.querySelectorAll("table.activities tr")) {
    let date = /(?<=\s).*/.exec(activity.querySelector(".dataTime").textContent.trim())[0];

    let userLink: HTMLLinkElement = activity.querySelector("td:nth-child(2) > a");
    let user = { 
      nick: userLink.innerText.trim(), 
      id: +userLink.href.match(/\d+$/)
    };

    let taskId = +activity.querySelector(".dataTime > a").textContent;
    let content = activity.querySelector("td:nth-child(2)").childNodes[6].textContent;

    let hashData = `${locales.market}:${moderatorId}:${pageId}:${taskId}`;

    let actionType = activity.querySelector(".reason").textContent;
    let reason: string;

    let data: {
      localizedType?: string;
      type?: Action["type"];
      contentType?: Action["contentType"];
      icon?: string;
    } = {};

    reason = activity.querySelector("td:nth-child(2)")
      ?.childNodes[12]
      ?.textContent
      ?.replace(/^:\s?/, "");

    if (content === "\n" && !regexps.accepted.test(actionType)) {
      data = { 
        type: "deleted",
        contentType: "attachment",
        localizedType: locales.messages.attachmentDeleted,
        icon: "attachment"
      };
    } else if (regexps.accepted.test(actionType)) {
      data = {
        type: "accepted",
        contentType: "unknown",
        localizedType: locales.messages.contentAccepted,
        icon: "check"
      };
    } else if (regexps.deleted.test(actionType)) {
      let isAnswer = /решение/i.test(actionType);
      data = {
        type: "deleted",
        contentType: isAnswer ? "answer" : "question",
        localizedType: locales.messages[isAnswer ? "answerDeleted" : "questionDeleted"],
        icon: isAnswer ? "answer" : "ask_bubble"
      };
    } else if (regexps.sentForCorrection.test(actionType)) {
      data = {
        type: "sentForCorrection",
        contentType: "answer",
        localizedType: locales.messages.toCorrect,
        icon: "pencil"
      };
    } else {
      data = {
        type: "deleted",
        contentType: "comment",
        localizedType: locales.messages.commentDeleted,
        icon: "comment"
      };
    };
    
    let action: Action = {
      user,
      taskId,
      content,
      reason,
      beautifiedDate: moment(date).format(locales.dateTimeFormat),
      hash: btoa(hashData),
      taskLink: `${locales.taskPathFormat}/${taskId}`,
      approved: false,
      disapproved: false,
      contentType: data.contentType,
      localizedType: data.localizedType,
      type: data.type,
      icon: data.icon,
      reasonShort: GetShortDeleteReason(reason).name
    };
    actions.push(action);
  }

  let hasNextPage = !!doc.querySelector("span.current")?.nextElementSibling;
  
  return {actions, hasNextPage};
}