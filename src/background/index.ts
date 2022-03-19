import type { 
  BackgroundMessage
} from "@typings/extension";
import ext from "webextension-polyfill";

class BackgroundListener {
  private tabId: number;
  private messageData;

  constructor() {
    this.BindListeners();
  }

  private BindListeners() {
    this.BindListener("InjectStyles", this.InjectStyles);
    this.BindListener("InjectScripts", this.InjectScripts);
  }

  private BindListener(type: string, func: () => Promise<unknown>) {
    ext.runtime.onMessage.addListener((message: BackgroundMessage, sender) => {
      if (message.type !== type) return;

      this.messageData = message.data;
      this.tabId = sender.tab.id;
    
      return func.bind(this)();
    });
  }

  private async InjectStyles() {
    return await ext.scripting.insertCSS({ 
      files: this.messageData, 
      target: {tabId: this.tabId}
    });
  }

  private async InjectScripts() {
    return await ext.scripting.executeScript({ 
      files: this.messageData, 
      target: {tabId: this.tabId} 
    });
  }

}

new BackgroundListener();