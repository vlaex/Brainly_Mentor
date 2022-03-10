export async function PreparePage() {
  document.body.insertAdjacentHTML("afterbegin", `<div id="app"></div>`);

  let brainlyLinks = document.querySelectorAll(`
    script[src*="zadanium"], 
    script[src*="chat/bind"], 
    link:not([data-brainly-mentor])[rel="stylesheet"]
  `);

  brainlyLinks.forEach(e => e.remove());
}