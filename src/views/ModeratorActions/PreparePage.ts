import locales from "@locales";

export async function PreparePage() {
  document.title = locales.messages.actions;
  document.body.insertAdjacentHTML("afterbegin", `<div id="app"></div>`);

  let brainlyLinks = document.querySelectorAll(`
    script[src*="zadanium"], script[src*="chat/bind"], link:not([data-brainly-mentor])[rel="stylesheet"]
  `);
  brainlyLinks.forEach(e => e.remove());

  document.head.innerHTML += `<link href="https://styleguide.brainly.com/208.2.3/style-guide.css" rel="stylesheet"/>`;
}