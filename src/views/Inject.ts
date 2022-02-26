import ext from "webextension-polyfill";

class Core {
  private markets = ["brainly.com", "znanija.com"];
  private market = window.location.hostname;
  private path = window.location.pathname;

  private Path(pattern: RegExp): boolean {
    if (!this.markets.includes(this.market)) return;
    
    return pattern.test(this.path);
  }

  constructor() {
    this.InjectScripts();
  }

  private InjectScripts() {
    if (this.Path(/moderation_new\/view_moderator\/\d+/)) {
      this.InjectFiles([
        "content-scripts/ModeratorActions/index.js",
        "styles/ModeratorActions/styles.css"
      ], { withStyles: true, cleanBody: true });
    }

  }

  private InjectFiles(
    paths: string[],
    options: {
      withStyles: boolean;
      cleanBody: boolean;
    }
  ) {
    window.addEventListener("load", () => {
      if(options.cleanBody) document.body.innerHTML = "";
      if (options.withStyles) import("@assets/styleguide-icons");

      paths.forEach(this.InjectFile);
      console.debug("Extension scripts and styles have been injected into DOM!");
    });
  }

  private InjectFile(
    filePath: string,
  ) {
    let fileExtension = filePath.split(".").pop();
    let path = ext.runtime.getURL(filePath);

    if (fileExtension === "js") {
      let script: HTMLScriptElement = document.createElement("script");

      script.src = path;
      script.type = "text/javascript";
      script.dataset.brainlyMentor = "true";

      document.body.insertAdjacentElement("beforeend", script);
    } else if (fileExtension === "css") {
      let link: HTMLLinkElement = document.createElement("link");

      link.href = path;
      link.type = "text/css";
      link.rel = "stylesheet";
      link.dataset.brainlyMentor = "true";

      document.head.appendChild(link);
    }

  }
}

new Core();