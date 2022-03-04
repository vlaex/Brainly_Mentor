import ext from "webextension-polyfill";
import storage from "@lib/storage";

class Core {
  private markets = ["brainly.com", "znanija.com"];
  private market = window.location.hostname;
  private path = window.location.href;

  private Path(pattern: RegExp): boolean {
    if (!this.markets.includes(this.market)) return;
    
    return pattern.test(this.path);
  }

  constructor() {
    this.Init();
  }

  private async Init() {
    await this.CheckIfUserIsAuthed();
    
    this.InjectScripts();
  }

  private async CheckIfUserIsAuthed() {
    let userToken = "testAuthToken"; // await storage.get("authToken");
    if(!userToken) throw Error("Not authorized");
  }

  private InjectScripts() {
    if (this.Path(/\/moderation_new\/view_moderator\/\d+/)) {
      this.InjectFiles([
        "content-scripts/ModeratorActions/index.js",
        "styles/ModeratorActions/styles.css"
      ], { withStyles: true, cleanBody: true });
    }

    if (this.Path(/(\/$)|(\/question\/\d+)|(\/subject\/\w+)/)) {
      this.InjectFiles([
        "content-scripts/MenteesDashboard/index.js",
        "styles/MenteesDashboard/styles.css"
      ]);
    }

  }

  private InjectFiles(
    paths: string[],
    options: {
      withStyles: boolean;
      cleanBody: boolean;
    } = {withStyles: false, cleanBody: false}
  ) {
    window.addEventListener("load", () => {
      if(options.cleanBody) document.body.innerHTML = "";
      if (options.withStyles) {
        import("@assets/styleguide-icons");
        document.head.innerHTML += `<link data-brainly-mentor="true" href="https://styleguide.brainly.com/208.2.3/style-guide.css" rel="stylesheet" />`;
      }

      paths.forEach(this.InjectFile);
      console.debug("[Brainly Mentor] Extension scripts and styles have been injected into DOM!");
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