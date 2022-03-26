import locales from "@locales";
import moment from "moment-timezone";

export default function BeautifyISO (isoDate: string): string {
  const now = moment().tz(locales.timezone);
  const splittedISO = isoDate.split("T");

  let date = moment(splittedISO.shift()).tz(locales.timezone, true);
  let beautifiedDate = "";

  let daysDifference = now.diff(date.startOf("day"), "days");
  
  if (daysDifference === 0) {
    beautifiedDate = `${locales.common.today},`;
  } else if (daysDifference === 1) {
    beautifiedDate = `${locales.common.yesterday},`;
  } else if (daysDifference < 7) {
    beautifiedDate = `
      ${locales.common.nDaysAgo.
    replace("%{days}", String(daysDifference))
},
    `;
  } else {
    beautifiedDate = date.format(locales.dateFormat);
  }

  const time = splittedISO.pop().replace(/[-+](\d{2}:?)*$/, "");

  return `${beautifiedDate} ${time}`;
}