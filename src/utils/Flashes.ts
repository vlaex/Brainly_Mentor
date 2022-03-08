export function Flash(data: {
  type: "info" | "error" | "success" | "default";
  text: string;
  sticky?: boolean;
}) {
  let flash = document.createElement("div");

  if (!data.sticky) {
    flash.onclick = () => flash.remove();
    setTimeout(() => flash.remove(), 5000);
  }

  if (document.querySelector(".flash-messages-container")) {
    flash.classList.add("sg-flash");
    flash.innerHTML = `
      <div class="sg-flash__message sg-flash__message--${data.type}">
        <div class="sg-text sg-text--small sg-text--bold sg-text--to-center">
          [Brainly Mentor] ${data.text}
        </div>
      </div>
    `;

    document.querySelector(".flash-messages-container").appendChild(flash);
  } else {
    throw Error("Failed to find container with flashes");
  }

}