import ToBackground from "@lib/ToBackground";

const MARKETS = ["brainly.com", "znanija.com"];

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
      ], { oldPage: true, cleanBody: true });
    }

    if (this.Path(/(\/$)|(\/(question|task)\/\d+)|(\/subject\/\w+)/)) {
      this.InjectFiles([
        "content-scripts/Core/index.js",
        "content-scripts/MenteesDashboard/index.js",
        "styles/MenteesDashboard/styles.css"
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
    } = { oldPage: false, cleanBody: false }
  ) {
    const cssFiles = files.filter(file => file.match(/\.css$/));

    if (cssFiles.length) ToBackground("InjectStyles", cssFiles);

    window.addEventListener("load", async function() {
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
        import("@assets/styleguide-icons");
        
        document.head.innerHTML += `
          <link href="https://styleguide.brainly.com/210.0.0/style-guide.css" rel="stylesheet"/>
        `;
        document.body.innerHTML += `<div class="flash-messages-container"></div>`;
      }

      return await ToBackground(
        "InjectScripts", 
        files.filter(file => file.match(/\.js$/))
      );
    });
  }
}

new Core();