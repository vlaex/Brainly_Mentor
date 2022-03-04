document.body.insertAdjacentHTML("beforeend", `
  <button id="open-mentees-dashboard-btn" class="sg-button sg-button--solid-blue sg-button--s sg-button--icon-only">
    <span class="sg-button__icon">
      <div class="sg-icon sg-icon--adaptive sg-icon--x16">
        <svg class="sg-icon__svg" role="img" focusable="false">
          <use xlink:href="#icon-academic_cap" aria-hidden="true"></use>
        </svg>
      </div>
    </span>
  </button>
  <div id="mentees-dashboard-overlay" style="display: none !important"></div>
`);

const openDashboardButton: HTMLButtonElement = document.querySelector("#open-mentees-dashboard-btn");
const modPanelContent = document.querySelector(".brn-moderation-panel__content");

if(modPanelContent) {
  if (modPanelContent.classList.contains("js-hidden")) {
    openDashboardButton.classList.add("to-bottom");
  }

  const observer = new MutationObserver(e => {
    openDashboardButton.classList.toggle("to-bottom");
  });
  observer.observe(modPanelContent, { attributes: true });
}