export async function PreparePage() {
  const modElement = document.querySelector("#content-old > h1 .nick");
  const moderator: {
    nick: string;
    link: string;
    id: number;
  } = {
    nick: modElement.textContent,
    link: modElement.getAttribute("href"),
    id: +modElement.getAttribute("href").match(/\d+$/)[0],
  };

  document.title = moderator.nick;
  document.body.innerHTML = "";
  document.body.insertAdjacentHTML("afterbegin", `<div id="app"></div>`);

  let brainlyLinks = document.querySelectorAll(`
    script[src*="zadanium"], script[src*="chat/bind"], link[type="text/css"]
  `);
  brainlyLinks.forEach(e => e.remove());

  document.head.innerHTML += `<link href="https://styleguide.brainly.com/208.2.3/style-guide.css" rel="stylesheet"/>`;
}