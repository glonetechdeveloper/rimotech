// ===================================================
// LOGIN PAGE
// Field validation, password visibility, remember me.
// ===================================================

const email = document.getElementById('email');
const password = document.getElementById('password');
const emailHint = document.getElementById('emailHint');
const loginBtn = document.getElementById('loginBtn');

function validate(){
  const emailOk = /^\S+@\S+\.\S+$/.test(email.value.trim());
  email.classList.toggle('field-error', email.value.length > 0 && !emailOk);
  emailHint.textContent = email.value.length > 0 && !emailOk ? 'Enter a valid email address.' : '';
  emailHint.classList.toggle('error', email.value.length > 0 && !emailOk);

  const pwOk = password.value.length > 0;
  loginBtn.classList.toggle('is-disabled', !(emailOk && pwOk));
}
[email, password].forEach(el => el.addEventListener('input', validate));

document.getElementById('togglePw').addEventListener('click', () => {
  password.type = password.type === 'password' ? 'text' : 'password';
});

const rememberCheck = document.getElementById('rememberCheck');
const rememberBox = document.getElementById('rememberBox');
rememberCheck.addEventListener('click', () => rememberBox.classList.toggle('checked'));

loginBtn.addEventListener('click', () => {
  if (loginBtn.classList.contains('is-disabled')) return;
  loginBtn.textContent = 'Logging in…';
  loginBtn.classList.add('is-disabled');
  setTimeout(() => {
    loginBtn.textContent = "You're in — redirecting ✓";
    window.location.href = '../app/dashboard.html';
  }, 800);
});

password.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !loginBtn.classList.contains('is-disabled')) loginBtn.click();
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