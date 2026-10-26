// ===================================================
// ONBOARDING PAGE LOGIC
// Question flow, back/start-over navigation, and
// directional transitions. Module rendering is
// delegated to window.GenerativeUI.
// ===================================================

(function(){
  const initialState = () => ({ company: '', structure: null, focus: null, priority: null, payment: null, currentTool: null });
  let state = initialState();
  const TOTAL_QUESTIONS = 6;
  let activeStep = 1;

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
  const stepControls = document.getElementById('stepControls');
  const backBtn = document.getElementById('backBtn');
  const startOverBtn = document.getElementById('startOverBtn');
  const successCheck = document.getElementById('successCheck');
  const canvasFrame = document.getElementById('canvasFrame');

  GenerativeUI.renderIcons(document);

  function setStatus(text){
    statusText.style.opacity = 0;
    setTimeout(() => {
      statusText.textContent = text;
      statusText.style.opacity = 1;
    }, 150);
  }

  // Direction-aware step change: forward slides in from the right,
  // back slides in from the left.
  function goToStep(n){
    const direction = n > activeStep ? 'forward' : 'back';
    activeStep = n;

    questionEls.forEach(q => q.classList.remove('active', 'dir-forward', 'dir-back'));
    const target = document.querySelector(`.question[data-step="${n}"]`);
    target.classList.add('active', direction === 'forward' ? 'dir-forward' : 'dir-back');

    stepMeta.textContent = n <= TOTAL_QUESTIONS ? `Step ${n} of ${TOTAL_QUESTIONS}` : 'All done';
    ticks.forEach(t => {
      const tickNum = Number(t.dataset.tick);
      t.classList.toggle('done', tickNum < n);
      t.classList.toggle('current', tickNum === n);
    });

    // Back / start over controls only make sense once you're past step 1
    stepControls.classList.toggle('visible', n > 1);

    if (n === 2){
      companyEcho.textContent = state.company || 'your team';
      // Deferred focus avoids a stray Enter key-up (from submitting step 1)
      // synthesizing a click on this newly-focused card.
      setTimeout(() => {
        const first = document.getElementById('choiceStructure')?.querySelector('.choice-card');
        if (first && document.querySelector('.question.active')?.dataset.step === '2') first.focus();
      }, 400);
    }

    if (n === 7){
      setTimeout(() => successCheck.classList.add('in-view'), 200);
    } else {
      successCheck.classList.remove('in-view');
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
    GenerativeUI.renderModule(moduleField, 'identity', state, 'identity');
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

    // slotKey = key (e.g. 'structure') so re-selecting or coming back and
    // changing an answer updates the existing module instead of duplicating it.
    GenerativeUI.renderModule(moduleField, `${key}:${value}`, state, key);

    if (key === 'currentTool'){
      setStatus(`Noted — we'll help you move from ${label.toLowerCase()}.`);
      canvasStatus.textContent = 'Almost there';
      setTimeout(() => {
        setStatus('Running a quick readiness check.');
        GenerativeUI.renderModule(moduleField, 'insights', state, 'insights');
        canvasStatus.textContent = 'Ready';
        goToStep(activeStep + 1);
      }, 600);
    } else {
      setStatus(`Got it — ${label.toLowerCase()}.`);
      canvasStatus.textContent = 'Adding modules';
      setTimeout(() => goToStep(activeStep + 1), 500);
    }
  }

  // ===== BACK =====
  backBtn.addEventListener('click', () => {
    if (activeStep > 1) goToStep(activeStep - 1);
  });

  // ===== START OVER =====
  startOverBtn.addEventListener('click', () => {
    state = initialState();
    companyInput.value = '';
    advance1.disabled = true;
    document.querySelectorAll('.choice-card.selected').forEach(c => c.classList.remove('selected'));

    moduleField.querySelectorAll('.module').forEach(m => m.remove());
    const empty = document.createElement('p');
    empty.className = 'canvas-empty';
    empty.id = 'canvasEmpty';
    empty.textContent = 'This fills in as you answer the questions.';
    moduleField.appendChild(empty);

    canvasOsName.textContent = 'Your workspace';
    canvasStatus.textContent = 'Waiting for answers';
    setStatus('Starting fresh — ready when you are.');
    launchBtn.disabled = false;
    launchBtn.textContent = 'Open my workspace →';

    goToStep(1);
  });

  // ===== KEYBOARD: numeric shortcuts + Backspace/ArrowLeft to go back =====
  document.addEventListener('keydown', (e) => {
    const tag = document.activeElement.tagName;
    const isTyping = tag === 'INPUT' || tag === 'TEXTAREA';

    if (!isTyping && (e.key === 'Backspace' || e.key === 'ArrowLeft') && activeStep > 1){
      e.preventDefault();
      goToStep(activeStep - 1);
      return;
    }

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
      window.location.href = '../app/dashboard.html';
    }, 800);
  });

  // ===== TILT ON CANVAS =====
  canvasFrame.addEventListener('mousemove', (e) => {
    const rect = canvasFrame.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    canvasFrame.style.transform = `perspective(900px) rotateY(${px * 4}deg) rotateX(${-py * 4}deg)`;
  });
  canvasFrame.addEventListener('mouseleave', () => { canvasFrame.style.transform = ''; });

  // ===== SCROLL PARALLAX ON AMBIENT GLOW =====
  const ambientEl = document.getElementById('ambient');
  window.addEventListener('scroll', () => {
    const shift = Math.min(window.scrollY * 0.06, 40);
    ambientEl.style.transform = `translateY(${shift}px)`;
  }, { passive: true });

  // ===== AMBIENT MOUSE-REACTIVE GLOW =====
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth * 100).toFixed(1);
    const y = (e.clientY / window.innerHeight * 100).toFixed(1);
    document.documentElement.style.setProperty('--mx', `${x}%`);
    document.documentElement.style.setProperty('--my', `${y}%`);
  });

  // ===== PAGE FADE-IN =====
  window.addEventListener('DOMContentLoaded', () => requestAnimationFrame(() => document.body.classList.add('loaded')));

  goToStep(1);
})();