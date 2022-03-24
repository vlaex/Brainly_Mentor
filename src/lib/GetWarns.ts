import type {
    Warn
} from "@typings";
import locales from "@locales";
const ERRORS = locales.errors;

export default async function GetWarns(userId: number): Promise<Warn[]> {
    let url = `${locales.marketURL}/users/view_user_warns/${userId}`;
    let res = await fetch(url);

    if (res.status !== 200) throw Error(ERRORS.brainlyError);

    const htmlData = await res.text();
    const doc = new DOMParser().parseFromString(htmlData, "text/html");

    const warns: Warn[] = [];

    for (
        let row of Array.from(doc.querySelectorAll("tr"))
        ) {
        const fields = row.querySelectorAll("td");
        if (fields.length == 7) {
            const warnObject = {} as Warn;
            warnObject.time = fields[0].innerText;
            warnObject.reason = fields[1].innerHTML;
            warnObject.content = fields[2].innerHTML;
            warnObject.taskId = parseInt(fields[3].querySelector("a")?.href.match(/\d+/)[0]);
            warnObject.warner = fields[4].innerText.trim();
            warnObject.active = fields[5].innerText.trim() == "Отменить";
            warns.push(warnObject);
        }
    }
    return warns;
}