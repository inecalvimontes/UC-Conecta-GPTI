const exploreItems = [
  { title: 'Innovation Projects', detail: 'Discover active student and faculty initiatives.' },
  { title: 'Community Events', detail: 'Find talks, workshops, and networking opportunities.' },
  { title: 'Learning Paths', detail: 'Browse curated content to build practical skills.' }
];

const grid = document.getElementById('explore-grid');
if (grid) {
  grid.innerHTML = exploreItems
    .map((item) => `<article class="card"><h4>${item.title}</h4><p>${item.detail}</p></article>`)
    .join('');
}

const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

function showForm(type) {
  if (!loginForm || !registerForm || !loginTab || !registerTab) {
    return;
  }

  const loginActive = type === 'login';
  loginForm.classList.toggle('hidden', !loginActive);
  registerForm.classList.toggle('hidden', loginActive);
  loginTab.classList.toggle('btn-outline', !loginActive);
  registerTab.classList.toggle('btn-outline', loginActive);
}

if (loginTab && registerTab) {
  loginTab.addEventListener('click', () => showForm('login'));
  registerTab.addEventListener('click', () => showForm('register'));
}

[loginForm, registerForm].forEach((form) => {
  if (!form) {
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const action = form.id === 'login-form' ? 'Logged in' : 'Registered';
    window.alert(`${action} successfully (starter flow).`);
  });
});
