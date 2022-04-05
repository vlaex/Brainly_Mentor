import { runtime } from "webextension-polyfill";

export function Flash(data: {
  type: "info" | "error" | "success" | "default";
  text: string;
  sticky?: boolean;
  withIcon?: boolean;
}) {
  let flash = document.createElement("div");

  if (!data.sticky) {
    flash.onclick = () => flash.remove();
    setTimeout(() => flash.remove(), 5000);
  }

  if (document.querySelector(".flash-messages-container")) {
    flash.classList.add("sg-flash");

    // eslint-disable indent
    flash.innerHTML = `
      <div class="sg-flash__message sg-flash__message--${data.type}">
        <div class="sg-text sg-text--small sg-text--bold sg-text--to-center">
          ${data.text}
        </div>
      </div>
    `;

    if (data.withIcon)
      flash.firstElementChild.insertAdjacentHTML("afterbegin", `
        <img src="${runtime.getURL("icons/icon.png")}" class="mentor-extension-icon">
      `);

    document.querySelector(".flash-messages-container").appendChild(flash);
  } else {
    throw Error("Failed to find container with flashes");
  }

}