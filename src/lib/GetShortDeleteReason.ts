import locales from "@locales";

export function GetShortDeleteReason(fullReason: string) {
  return locales.deletionReasons.find(reason => 
    fullReason?.includes(reason.regex)
  ) || { id: 0, name: "", regex: "" };
}