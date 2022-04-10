import _API from "./api/extension";

export function GetShortDeleteReason(fullReason: string) {
  return _API.config.deletionReasons.find(reason => 
    fullReason?.includes(reason.regex)
  ) || { id: 0, name: "", regex: "" };
}