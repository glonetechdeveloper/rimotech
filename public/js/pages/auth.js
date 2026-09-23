// ===================================================
// SIGNUP FLOW
// Step 1: email + password. Step 2: account type.
// ===================================================

const icons = {
  individual: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.3"/><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7"/></svg>`,
  startup: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.5 5.5L20 9l-5.5 1.5L12 16l-2.5-5.5L4 9l5.5-1.5L12 2z"/></svg>`,
  company: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="17" rx="2"/><path d="M9 9h1M14 9h1M9 13h1M14 13h1M9 21v-4h6v4"/></svg>`,
  enterprise: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="10" width="7" height="11"/><rect x="14" y="3" width="7" height="18"/><path d="M6 14h1M6 17h1M17 7h1M17 10h1M17 13h1"/></svg>`
};
document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = icons[el.dataset.icon] || ''; });

let activeStep = 1;
const ticks = document.querySelectorAll('.progress-tick');
const steps = document.querySelectorAll('.step');

function goToStep(n){
  const direction = n > activeStep ? 'forward' : 'back';
  activeStep = n;
  steps.forEach(s => s.classList.remove('active', 'dir-forward', 'dir-back'));
  const target = document.querySelector(`.step[data-step="${n}"]`);
  target.classList.add('active', direction === 'forward' ? 'dir-forward' : 'dir-back');
  ticks.forEach(t => {
    const tickNum = Number(t.dataset.tick);
    t.classList.toggle('done', tickNum < n);
    t.classList.toggle('current', tickNum === n);
  });
}

// ===== STEP 1: FIELD VALIDATION =====
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm = document.getElementById('confirm');
const emailHint = document.getElementById('emailHint');
const pwHint = document.getElementById('pwHint');
const confirmHint = document.getElementById('confirmHint');
const toStep2 = document.getElementById('toStep2');

function validateStep1(){
  let ok = true;

  const emailOk = /^\S+@\S+\.\S+$/.test(email.value.trim());
  email.classList.toggle('field-error', email.value.length > 0 && !emailOk);
  if (email.value.length > 0 && !emailOk){
    emailHint.textContent = 'Enter a valid email address.';
    emailHint.classList.add('error');
  } else {
    emailHint.textContent = '';
    emailHint.classList.remove('error');
  }
  if (!emailOk) ok = false;

  const pwOk = password.value.length >= 8;
  pwHint.textContent = pwOk ? 'Looks good.' : 'Use at least 8 characters.';
  pwHint.classList.toggle('error', password.value.length > 0 && !pwOk);
  if (!pwOk) ok = false;

  const matchOk = confirm.value.length > 0 && confirm.value === password.value;
  confirm.classList.toggle('field-error', confirm.value.length > 0 && !matchOk);
  confirmHint.textContent = confirm.value.length > 0 ? (matchOk ? 'Passwords match.' : "Passwords don't match.") : '';
  confirmHint.classList.toggle('error', confirm.value.length > 0 && !matchOk);
  if (!matchOk) ok = false;

  toStep2.classList.toggle('is-disabled', !ok);
  return ok;
}
[email, password, confirm].forEach(el => el.addEventListener('input', validateStep1));

toStep2.addEventListener('click', () => {
  if (!toStep2.classList.contains('is-disabled')) goToStep(2);
});

function bindToggle(btnId, inputId){
  const btn = document.getElementById(btnId);
  const input = document.getElementById(inputId);
  btn.addEventListener('click', () => { input.type = input.type === 'password' ? 'text' : 'password'; });
}
bindToggle('togglePw1', 'password');
bindToggle('togglePw2', 'confirm');

// ===== STEP 2: ACCOUNT TYPE =====
const createBtn = document.getElementById('createBtn');
document.querySelectorAll('#stepStack [data-value]').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('#stepStack [data-value]').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    createBtn.classList.remove('is-disabled');
  });
});

// createBtn is a real <a> pointing at onboarding.html — the is-disabled class
// blocks the click via pointer-events until an account type is chosen.

document.getElementById('backBtn').addEventListener('click', () => goToStep(1));

// ===== BACK NAVIGATION SHORTCUT =====
document.addEventListener('keydown', (e) => {
  const tag = document.activeElement.tagName;
  const isTyping = tag === 'INPUT' || tag === 'TEXTAREA';
  if (!isTyping && (e.key === 'Backspace' || e.key === 'ArrowLeft') && activeStep > 1){
    e.preventDefault();
    goToStep(activeStep - 1);
  }
});

// ===== AMBIENT REACTIVE GLOW =====
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth * 100).toFixed(1);
  const y = (e.clientY / window.innerHeight * 100).toFixed(1);
  document.documentElement.style.setProperty('--mx', `${x}%`);
  document.documentElement.style.setProperty('--my', `${y}%`);
});

// ===== PAGE FADE-IN =====
window.addEventListener('DOMContentLoaded', () => requestAnimationFrame(() => document.body.classList.add('loaded')));