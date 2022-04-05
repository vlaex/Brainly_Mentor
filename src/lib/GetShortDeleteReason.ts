export function GetShortDeleteReason(fullReason: string) {
  return window.deletionReasons.find(reason => 
    fullReason?.includes(reason.regex)
  ) || { id: 0, name: "", regex: "" };
}