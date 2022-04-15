import _API from "@lib/api/extension";
import type { Candidate } from "@typings";
import { DisableButton, EnableButton } from "@utils/ElementsVisibility";
import { Flash } from "@utils/Flashes";

class HomePage {
  #box: HTMLDivElement;
  candidates: Candidate[];

  constructor() {
    this.Init();
  }

  private async FetchCandidates() {
    const data = await _API.GetCandidates();
    this.candidates = data.candidates;
  }

  private BindMutationObserver() {
    const observer = new MutationObserver(this.RenderLabels.bind(this));
    observer.observe(this.#box, { 
      childList: true, 
      subtree: true 
    });
  }

  private BindReviewCandidateListener(button: HTMLButtonElement) {
    button.onclick = async () => {
      DisableButton(button);

      let icon = button.querySelector(".sg-icon use");

      try {
        const data = await _API.ReviewCandidate(+button.dataset.id);

        if (data.warnings.length) {
          button.classList.add("bad-candidate");
          button.title = data.warnings.join("\n");
          icon.setAttribute("xlink:href", "#icon-close");
        } else {
          button.classList.add("good-candidate");
          icon.setAttribute("xlink:href", "#icon-check");
        }

        button.onclick = null;

      } catch (err) {
        Flash({
          type: "error",
          text: err.message
        });
      } finally {
        EnableButton(button);
      }
    };
  }

  private RenderLabels() {
    let items = this.#box.querySelectorAll(`
      .sg-content-box__content .sg-content-box:not(:last-child):not(.candidate)
    `);

    for (let item of items) {
      let userLink: HTMLLinkElement = item.querySelector(".sg-actions-list__hole > a");
      let userId = +userLink?.href.match(/\d+$/);

      const candidate = this.candidates.find(candidate =>
        userId === candidate.id
      );

      const listHole = item.querySelector(".sg-actions-list .sg-actions-list__hole:first-child");
      
      const candidateColor = /отказ/i.test(candidate?.status) ? "red" :
        /актив/i.test(candidate?.status) ? "#6322ff" : "#55ab80";

      item.classList.add("candidate");
      listHole.insertAdjacentHTML("beforeend", candidate ? `
        <div style="border-color: ${candidateColor}" class="candidate-label" title="Кандидат: ${candidate.status}">К</div>
      ` : `
        <button data-id="${userId}" title="Кандидат?" class="sg-button--icon-only sg-button review-candidate sg-button--solid-light sg-button--solid-light-toggle-blue">
          <span class="sg-button__icon">
            <div class="sg-icon sg-icon--adaptive sg-icon--x16"><svg class="sg-icon__svg" role="img" focusable="false">
              <use xlink:href="#icon-search" aria-hidden="true"></use>
            </svg></div>
          </span>
        </button>
      `);

      if (item.querySelector(".review-candidate"))
        this.BindReviewCandidateListener(item.querySelector(".review-candidate"));
    }
  }

  async Init() {
    let box: HTMLDivElement = document.querySelector(`[data-test="ranking-box"]`);

    if (!box) return setTimeout(this.Init, 1000);

    this.#box = box;

    await this.FetchCandidates();
    this.BindMutationObserver();
    this.RenderLabels();
  }
}

new HomePage();