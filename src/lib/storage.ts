import ext from "webextension-polyfill";

export default {
  get: async (key) => {
    let obj = await ext.storage.local.get(key);
    return obj?.[key];
  },
  set: async (key, data) => {
    return await ext.storage.local.set({ [key]: data });
  }
};