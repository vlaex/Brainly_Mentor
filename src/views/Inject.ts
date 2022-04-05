import { version as brainlyStyleGuideVersion } from "brainly-style-guide/package.json";
import ToBackground from "@lib/ToBackground";
import _API from "@lib/api/extension";

const MARKETS = ["brainly.com", "znanija.com", "nosdevoirs.fr"];

class Core {
  private market = window.location.hostname;
  private path = window.location.href;

  private Path(pattern: RegExp): boolean {
    if (!MARKETS.includes(this.market)) return;
    return pattern.test(this.path);
  }

  constructor() {
    this.InjectContent();
  }

  private async InjectContent() {
    if (this.Path(/\/moderation_new\/view_moderator\/\d+/)) {
      this.InjectFiles([
        "content-scripts/ModeratorActions/index.js",
        "styles/ModeratorActions/styles.css"
      ], { oldPage: true, cleanBody: true, loadConfig: true });
    }

    if (this.Path(/(\/$)|(\/(question|task|devoir)\/\d+)|(\/(subject|matiere)\/\w+)/)) {
      this.InjectFiles([
        "content-scripts/Core/index.js",
        "content-scripts/Dashboard/index.js",
        "styles/Dashboard/styles.css"
      ]);
    }

    // For znanija.com market only
    if (this.market === "znanija.com") {
      if (this.Path(/\/profil\/[A-Za-z0-9]+-\d+/)) {
        this.InjectFiles([
          "content-scripts/UserProfile/index.js",
          "styles/UserProfile/styles.css"
        ]);
      }

      if (this.Path(/\/$|\/(subject|predmet)\//)) {
        this.InjectFiles([
          "content-scripts/HomePage/index.js",
          "styles/HomePage/styles.css"
        ]);
      }
    }

  }

  private async InjectFiles(
    files: string[],
    options: {
      cleanBody: boolean;
      oldPage: boolean;
      loadConfig?: boolean;
    } = { oldPage: false, cleanBody: false, loadConfig: false }
  ) {
    const jsFiles = files.filter(file => file.match(/\.js$/));
    const cssFiles = files.filter(file => file.match(/\.css$/));

    if (cssFiles.length) ToBackground("InjectStyles", cssFiles);

    window.addEventListener("load", async function() {
      if (options.loadConfig) {
        let extensionConfig = await _API.GetConfig();

        window.deletionReasons = extensionConfig.deletionReasons;
        window.subjects = extensionConfig.subjects;
      }

      if (options.cleanBody) {
        document.body.innerHTML = "";

        let brainlyLinks = document.querySelectorAll(`
          script[src*="zadanium"], 
          script[src*="chat/bind"],
          link[rel="stylesheet"]
        `);

        brainlyLinks.forEach(e => e.remove());
      }

      if (options.oldPage) {
        import("@assets/styleguide-icons.js");
        
        document.head.innerHTML += `
          <link href="https://styleguide.brainly.com/${brainlyStyleGuideVersion}/style-guide.css" rel="stylesheet" />
        `;
        document.body.innerHTML += `<div class="flash-messages-container"></div>`;
      }

      return await ToBackground("InjectScripts", jsFiles);
    });
  }
}

new Core();