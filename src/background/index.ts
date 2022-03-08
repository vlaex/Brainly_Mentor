import storage from "@lib/storage";
import ext from "webextension-polyfill";

class Background {
  constructor() {
    this.Init();
  }

  private async Init() {
    await this.CheckIfAuthed();
  }

  private async CheckIfAuthed() {
    const userToken = await storage.get("authToken");

    if (!userToken) {
      await ext.action.setBadgeBackgroundColor({ color: "#ff2828" });
      await ext.action.setBadgeText({ text: "!" });

      //throw Error("Could not find auth token");
    }

  }
  
}

new Background();