import ext from "webextension-polyfill";

export default {
  get: async (key: string) => {
    let obj = await ext.storage.local.get(key);
    return obj?.[key];
  },
  set: async (key: string, data) => {
    return await ext.storage.local.set({ [key]: data });
  }
};