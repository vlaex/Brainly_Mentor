import _API from "@lib/api/extension";

const helpedInfoSelector = document.querySelector(".helped_info");
const nickSelector: HTMLLinkElement = document.querySelector(".info .info_top > .ranking > h2 > a");

const user = {
  nick: nickSelector.textContent.trim(),
  id: +nickSelector.href.match(/\d+$/)
};

(async function() {
  if (
    !user.id || 
    !user.nick || 
    !document.getElementById("UserBanAddForm")
  ) return;

  const data = await _API.GetCandidates(user.id);
  const candidates = data.candidates;

  if (candidates.length) {
    helpedInfoSelector.insertAdjacentHTML("beforebegin", `
      <div title="Кандидат" class="candidate-label">
        <span>K</span>
        <span>${candidates[0].status}</span>
      </div>
    `);
    
    return;
  }

  helpedInfoSelector.insertAdjacentHTML("beforebegin", `
    <button class="review-candidate">Кандидат?</button>
    <div class="review-candidate-results" hidden></div>
  `);

  const reviewCandidateButton = document.querySelector(".review-candidate") as HTMLButtonElement;
  const reviewCandidateResults = document.querySelector(".review-candidate-results") as HTMLElement;

  reviewCandidateButton.onclick = async () => {
    reviewCandidateButton.disabled = true;
    reviewCandidateButton.innerText = "Проверяю...";
    reviewCandidateResults.classList.remove("success");

    const data = await _API.ReviewCandidate(user.id);

    reviewCandidateResults.innerHTML = data.warnings.map(warn => `
      <div>
        <svg class="sg-icon__svg" role="img" focusable="false"><use xlink:href="#icon-close" aria-hidden="true"></use></svg>
        <span>${warn}</span>
      </div>
    `).join("");

    if (!data.warnings.length) {
      reviewCandidateResults.innerHTML = `<span>Успешно проверено!</span>`;
      reviewCandidateResults.classList.add("success");
    }

    reviewCandidateResults.hidden = false;
    reviewCandidateButton.disabled = false;
    reviewCandidateButton.innerText = "Кандидат?";
  };
})();