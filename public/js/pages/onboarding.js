// ===================================================
// ONBOARDING PAGE LOGIC
// Question flow, state, and event wiring. Delegates
// all module rendering to window.GenerativeUI.
// ===================================================

(function(){
  const state = { company: '', structure: null, focus: null, priority: null, payment: null, currentTool: null };
  const TOTAL_QUESTIONS = 6;

  const questionEls = document.querySelectorAll('.question');
  const ticks = document.querySelectorAll('.progress-tick');
  const stepMeta = document.getElementById('stepMeta');
  const moduleField = document.getElementById('moduleField');
  const canvasOsName = document.getElementById('canvasOsName');
  const canvasStatus = document.getElementById('canvasStatus');
  const statusText = document.getElementById('statusText');
  const companyInput = document.getElementById('companyInput');
  const advance1 = document.getElementById('advance1');
  const companyEcho = document.getElementById('companyEcho');
  const launchBtn = document.getElementById('launchBtn');

  // Fill every choice-card icon on load
  GenerativeUI.renderIcons(document);

  function setStatus(text){
    statusText.style.opacity = 0;
    setTimeout(() => {
      statusText.textContent = text;
      statusText.style.opacity = 1;
    }, 150);
  }

  function goToStep(n){
    questionEls.forEach(q => q.classList.toggle('active', Number(q.dataset.step) === n));
    stepMeta.textContent = n <= TOTAL_QUESTIONS ? `Step ${n} of ${TOTAL_QUESTIONS}` : 'All done';
    ticks.forEach(t => {
      const tickNum = Number(t.dataset.tick);
      t.classList.toggle('done', tickNum < n);
      t.classList.toggle('current', tickNum === n);
    });
    if (n === 2){
      companyEcho.textContent = state.company || 'your team';
      const first = document.getElementById('choiceStructure')?.querySelector('.choice-card');
      if (first) first.focus();
    }
  }

  // ===== STEP 1: COMPANY NAME =====
  companyInput.addEventListener('input', () => {
    advance1.disabled = companyInput.value.trim().length === 0;
  });
  companyInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !advance1.disabled) commitCompany();
  });
  advance1.addEventListener('click', commitCompany);

  function commitCompany(){
    const name = companyInput.value.trim();
    if (!name) return;
    state.company = name;
    canvasOsName.textContent = name;
    canvasStatus.textContent = 'Setting up';
    setStatus(`Nice — building ${name}'s workspace.`);
    GenerativeUI.renderModule(moduleField, 'identity', state);
    goToStep(2);
  }

  // ===== STEPS 2–6: CHOICE CARDS =====
  document.querySelectorAll('.choice-card').forEach(card => {
    card.addEventListener('click', () => selectChoice(card));
  });

  function selectChoice(card){
    const key = card.dataset.key;
    const value = card.dataset.value;
    const group = card.closest('.choice-grid');
    group.querySelectorAll('.choice-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    state[key] = value;

    const label = card.querySelector('.choice-title').textContent;
    const currentStepNum = Number(document.querySelector('.question.active').dataset.step);

    GenerativeUI.renderModule(moduleField, `${key}:${value}`, state);

    if (key === 'currentTool'){
      setStatus(`Noted — we'll help you move from ${label.toLowerCase()}.`);
      canvasStatus.textContent = 'Almost there';
      setTimeout(() => {
        setStatus('Running a quick readiness check.');
        GenerativeUI.renderModule(moduleField, 'insights', state);
        canvasStatus.textContent = 'Ready';
        goToStep(currentStepNum + 1);
      }, 600);
    } else {
      setStatus(`Got it — ${label.toLowerCase()}.`);
      canvasStatus.textContent = 'Adding modules';
      setTimeout(() => goToStep(currentStepNum + 1), 500);
    }
  }

  // ===== KEYBOARD SHORTCUTS (1–5) =====
  document.addEventListener('keydown', (e) => {
    const activeQ = document.querySelector('.question.active');
    if (!activeQ) return;
    const cards = [...activeQ.querySelectorAll('.choice-card')];
    if (!cards.length) return;
    const index = { '1': 0, '2': 1, '3': 2, '4': 3, '5': 4 }[e.key];
    if (index !== undefined && cards[index]) selectChoice(cards[index]);
  });

  // ===== LAUNCH =====
  launchBtn.addEventListener('click', () => {
    launchBtn.disabled = true;
    launchBtn.textContent = 'Opening…';
    setStatus('Getting your workspace ready.');
    canvasStatus.textContent = 'Opening';
    setTimeout(() => {
      setStatus(`Welcome to ${state.company || 'your'} workspace.`);
      canvasStatus.textContent = 'Live';
      launchBtn.textContent = "You're in ✓";
      // In the real app: window.location.href = '../app/dashboard.html';
    }, 800);
  });

  // ===== AMBIENT REACTIVE GLOW =====
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth * 100).toFixed(1);
    const y = (e.clientY / window.innerHeight * 100).toFixed(1);
    document.documentElement.style.setProperty('--mx', `${x}%`);
    document.documentElement.style.setProperty('--my', `${y}%`);
  });

  goToStep(1);
})();