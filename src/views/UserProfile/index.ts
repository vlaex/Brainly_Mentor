const nickSelector: HTMLLinkElement = document.querySelector(".info .info_top > .ranking > h2 > a");

const user = {
  nick: nickSelector.textContent.trim(),
  id: +nickSelector.href.match(/\d+$/)
};

console.debug(user);

/*let nickElement = document.querySelector('.info .info_top > .ranking > h2 > a');
let userNick = nickElement.innerText.trim();
let userId = nickElement.href.match(/\d+$/)?.[0];

(async function() {
  if(!userId || !userNick || userNick === 'Аккаунт удален') return;

  let data = await api.getCandidate(userNick, userId);
  if(data.error) throw Error(data.error);

  let candidate = data.data;

  let helpedInfo = document.querySelector('.helped_info');
  if(candidate) {
    helpedInfo.insertAdjacentHTML('beforebegin', `<div title="Кандидат" class="candidate-label">
      <span>K</span>
      <span>${candidate.status.toLowerCase()}</span>
    </div>`);
  } else {
    helpedInfo.insertAdjacentHTML('beforebegin', `
      <button class="check-candidate">Кандидат?</button>
      <div class="check-candidate-results hidden"></div>
    `);

    document.querySelector('.check-candidate').onclick = async function() {
      this.disabled = true;
      this.innerText = 'Проверяю...';

      let res = await api.checkCandidate(userId);

      let errors = res.data.errors;
      let candidateResults = document.querySelector('.check-candidate-results');

      candidateResults.innerHTML = res.data.errors.map(
        validationError => `<div>
          <svg class="sg-icon__svg" role="img" focusable="false"><use xlink:href="#icon-close" aria-hidden="true"></use></svg>
          <span>${validationError}</span>
        </div>`
      );
      if(!errors.length) candidateResults.innerHTML = `
        <span>Успешно проверено!</span>
      `;

      candidateResults.classList.remove('hidden');

      this.disabled = false;
      this.innerText = 'Кандидат?';
    }
  }
})();*/