import locales from "@locales";

export function GetShortDeleteReason(reason: string) {
  let deleteReason = locales.deleteReasons.find(
    r => r.regex.test(reason)
  );

  return deleteReason || {id: 1, regex: null, name: ""};
}