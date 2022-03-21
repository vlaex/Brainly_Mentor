export async function PreparePage() {
  document.body.insertAdjacentHTML("afterbegin", `
    <div id="app"></div>
    <div id="question-preview-modal-container"></div>
  `);
  document.body.id = "brainly-mentor";
}