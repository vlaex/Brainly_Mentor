import ext from "webextension-polyfill";

export default async function ToBackground(
  messageType: string,
  data?
) {
  return await ext.runtime.sendMessage({
    type: messageType,
    data: data
  });
}