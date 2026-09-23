/**
 * RIMO AI AGENT - WORKSPACE COPILOT & CHATBOT
 * Minimal, Responsive AI Assistant for Rimotech Business OS
 */

(function () {
  'use strict';

  // Prevent multiple initializations
  if (window.__RIMO_AI_INITIALIZED__) return;
  window.__RIMO_AI_INITIALIZED__ = true;

  const STORAGE_KEY_HISTORY = 'rimo_ai_chat_messages_v1';
  const STORAGE_KEY_OPEN = 'rimo_ai_widget_open_state';

  // Detect current page context
  function getPageContext() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('dashboard')) return { id: 'dashboard', name: 'Dashboard', icon: '📊' };
    if (path.includes('crm')) return { id: 'crm', name: 'CRM & Deals', icon: '💼' };
    if (path.includes('tasks')) return { id: 'tasks', name: 'Tasks', icon: '📋' };
    if (path.includes('track') || path.includes('time')) return { id: 'track', name: 'Time Tracking', icon: '⏱️' };
    if (path.includes('finances')) return { id: 'finances', name: 'Finances', icon: '💰' };
    if (path.includes('automations')) return { id: 'automations', name: 'Automations', icon: '⚡' };
    if (path.includes('calendar')) return { id: 'calendar', name: 'Calendar', icon: '📅' };
    if (path.includes('files')) return { id: 'files', name: 'Files', icon: '📁' };
    if (path.includes('activities')) return { id: 'activities', name: 'Activity', icon: '📈' };
    if (path.includes('notifications')) return { id: 'notifications', name: 'Notifications', icon: '🔔' };
    if (path.includes('settings')) return { id: 'settings', name: 'Settings', icon: '⚙️' };
    if (path.includes('login')) return { id: 'login', name: 'Log in', icon: '🔑' };
    if (path.includes('register')) return { id: 'register', name: 'Register', icon: '✨' };
    if (path.includes('onboarding')) return { id: 'onboarding', name: 'Onboarding', icon: '🚀' };
    if (path.includes('landing') || path.endsWith('/') || path.includes('index')) return { id: 'landing', name: 'Home', icon: '🌐' };
    return { id: 'workspace', name: 'Workspace', icon: '🏢' };
  }

  // Ensure CSS is injected
  function ensureCSS() {
    if (document.querySelector('link[href*="ai-agent.css"]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    let prefix = './public/css/';
    if (window.location.pathname.includes('/views/app/') || window.location.pathname.includes('/views/auth/') || window.location.pathname.includes('/views/onboarding/')) {
      prefix = '../../public/css/';
    } else if (window.location.pathname.includes('/views/')) {
      prefix = '../public/css/';
    }
    link.href = prefix + 'ai-agent.css';
    document.head.appendChild(link);
  }

  // Suggested Prompts based on page
  function getContextChips(contextId) {
    switch (contextId) {
      case 'dashboard':
        return [
          { label: '📊 Revenue pulse', query: 'Summarize our monthly revenue and growth.' },
          { label: '🚨 Overdue items', query: 'Are there any urgent tasks or overdue invoices?' },
          { label: '👥 Team status', query: 'What is the team currently working on?' }
        ];
      case 'finances':
        return [
          { label: '💳 Invoice #0142', query: 'What is the status of invoice #0142?' },
          { label: '📊 Cashflow summary', query: 'Show me our cashflow breakdown for this month.' }
        ];
      case 'tasks':
        return [
          { label: '🎯 Sprint status', query: 'What are the top priorities for the Q3 Launch?' },
          { label: '➕ Add task', query: 'Create a new task for Homepage Redesign.' }
        ];
      case 'track':
        return [
          { label: '⏱️ Today’s hours', query: 'How many hours have I logged today?' },
          { label: '🎯 Focus timer', query: 'Start a focus session for Reef Co.' }
        ];
      case 'crm':
        return [
          { label: '🤝 Active deals', query: 'What is the status of the Reef Co. proposal?' },
          { label: '📈 Conversion rate', query: 'What is our lead conversion rate this month?' }
        ];
      case 'automations':
        return [
          { label: '⚡ Active workflows', query: 'What automations are currently active?' },
          { label: '🔔 Auto reminders', query: 'How does the invoice reminder automation work?' }
        ];
      case 'landing':
      case 'login':
      case 'register':
      case 'onboarding':
        return [
          { label: '💡 What is Rimotech?', query: 'What makes Rimotech Business OS unique?' },
          { label: '💳 Pricing & Plans', query: 'What is included in the Free vs Pro plan?' }
        ];
      default:
        return [
          { label: '⚡ Overview', query: 'Give me a brief overview of my workspace.' },
          { label: '📊 Key metrics', query: 'What are our key business metrics today?' }
        ];
    }
  }

  // Minimal HTML Markup for AI Widget
  function buildWidgetMarkup(context) {
    return `
      <div class="rimo-ai-widget" id="rimoAiWidget">
        <!-- Minimal Trigger Pill -->
        <button class="rimo-ai-trigger" id="rimoAiTrigger" aria-label="Open AI Assistant" title="Open AI Assistant (Ctrl+K)">
          <div class="rimo-ai-trigger-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6l2.1-2.1"/>
            </svg>
          </div>
          <div class="rimo-ai-trigger-text">
            Rimo AI <span class="rimo-ai-status-dot"></span>
          </div>
          <span class="rimo-ai-trigger-kbd">⌘K</span>
        </button>

        <!-- Minimal Chat Panel (Bottom Right) -->
        <div class="rimo-ai-panel" id="rimoAiPanel" role="dialog" aria-label="AI Chat Assistant">
          <!-- Minimal Header -->
          <div class="rimo-ai-header">
            <div class="rimo-ai-header-left">
              <div class="rimo-ai-avatar-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div class="rimo-ai-title-wrap">
                <span class="rimo-ai-header-title">Rimo AI</span>
                <span class="rimo-ai-context-tag">${context.icon} ${context.name}</span>
              </div>
            </div>

            <div class="rimo-ai-header-actions">
              <button class="rimo-ai-btn-icon" id="rimoAiBtnClear" title="Clear chat history" aria-label="Clear chat">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
              <button class="rimo-ai-btn-icon rimo-ai-btn-close" id="rimoAiBtnClose" title="Minimize (Esc)" aria-label="Close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          <!-- Quick Chips -->
          <div class="rimo-ai-chips-bar" id="rimoAiChipsBar"></div>

          <!-- Message Feed -->
          <div class="rimo-ai-messages" id="rimoAiMessages"></div>

          <!-- Input Footer -->
          <div class="rimo-ai-footer">
            <div class="rimo-ai-input-box">
              <textarea 
                class="rimo-ai-textarea" 
                id="rimoAiInput" 
                placeholder="Ask Rimo AI..." 
                rows="1" 
                aria-label="Your message"></textarea>
              <button class="rimo-ai-btn-send" id="rimoAiBtnSend" aria-label="Send" disabled>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
            <div class="rimo-ai-footer-meta">
              <span>Rimotech OS</span>
              <span>Press <kbd>Enter</kbd></span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Response Generator / AI Knowledge Core
  function generateAIResponse(userText, context) {
    const raw = userText.toLowerCase().trim();

    if (raw.includes('crm') || raw.includes('lead') || raw.includes('deal') || raw.includes('proposal')) {
      return {
        text: `**CRM Overview**\n\n- **Leads:** 6 Active Leads\n- **Proposals:** 3 Pending (Reef Co. approved, $12k)\n- **Conversion Rate:** 68% this quarter.`,
        actions: [{ label: 'Open CRM', url: './crm.html' }]
      };
    }

    if (raw.includes('time') || raw.includes('track') || raw.includes('hour') || raw.includes('timer')) {
      return {
        text: `**Time Tracker**\n\n- **Today:** 6.5 hours logged\n- **Billable:** 86%\n- **Project:** Reef Co. Redesign`,
        actions: [{ label: 'View Tracker', url: './track.html' }]
      };
    }

    if (raw.includes('finance') || raw.includes('invoice') || raw.includes('revenue') || raw.includes('money')) {
      return {
        text: `**Financial Health**\n\n- **MRR:** $28,400 *(+18% MoM)*\n- **Latest:** Invoice #0142 ($4,200) paid\n- **Pending:** $7,600 across 2 clients.`,
        actions: [{ label: 'View Finances', url: './finances.html' }]
      };
    }

    if (raw.includes('task') || raw.includes('sprint') || raw.includes('deadline') || raw.includes('todo')) {
      return {
        text: `**Active Tasks**\n\n- **In Progress:** Homepage Redesign (Jamie)\n- **Pending Review:** Q3 Launch Preparation (Dana)\n- **Completed:** Northline Contract (Alex).`,
        actions: [{ label: 'View Tasks', url: './tasks.html' }]
      };
    }

    if (raw.includes('automation') || raw.includes('workflow') || raw.includes('slack')) {
      return {
        text: `**Automations**\n\n- **Auto-Invoice Followup:** Active\n- **Slack Deal Bot:** Active\n- **Weekly Digest:** Scheduled for Sunday.`,
        actions: [{ label: 'Manage Automations', url: './automations.html' }]
      };
    }

    if (raw.includes('pricing') || raw.includes('plan') || raw.includes('free') || raw.includes('pro')) {
      return {
        text: `**Plans**\n\n- **Free:** $0/mo (1 workspace, 10 clients)\n- **Pro:** $24/mo (unlimited clients, automations, custom modules).`,
        actions: [{ label: 'Dashboard', url: './dashboard.html' }]
      };
    }

    if (raw.includes('hello') || raw.includes('hi') || raw.includes('hey')) {
      return {
        text: `Hello! I'm **Rimo AI**, your workspace assistant. How can I help you today?`,
        actions: [
          { label: '📊 Dashboard', url: './dashboard.html' },
          { label: '💼 CRM', url: './crm.html' },
          { label: '📋 Tasks', url: './tasks.html' }
        ]
      };
    }

    return {
      text: `Analyzed query for **${context.name}**.\n\nAll modules are synchronized and operating normally.`,
      actions: [
        { label: 'Dashboard', url: './dashboard.html' },
        { label: 'Finances', url: './finances.html' }
      ]
    };
  }

  // Format Markdown
  function formatMarkdown(text) {
    let html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n- (.*?)(?=\n|$)/g, '<li>$1</li>');

    if (html.includes('<li>')) {
      html = html.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');
    }
    return `<p>${html}</p>`;
  }

  // Main Widget Class
  class RimoAIWidget {
    constructor() {
      this.context = getPageContext();
      this.history = this.loadHistory();
      this.isGenerating = false;
      this.initDOM();
      this.bindEvents();
      this.renderHistory();
      this.restoreOpenState();
    }

    loadHistory() {
      try {
        const data = localStorage.getItem(STORAGE_KEY_HISTORY);
        if (data) return JSON.parse(data);
      } catch (e) {
        console.warn('Rimo AI storage error:', e);
      }
      return [
        {
          sender: 'ai',
          text: `👋 **Hi! I'm Rimo AI.**\nConnected to your live workspace (${this.context.name}). Ask me anything or select a prompt below.`,
          actions: [],
          time: 'Just now'
        }
      ];
    }

    saveHistory() {
      try {
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(this.history.slice(-25)));
      } catch (e) {
        console.warn('Rimo AI save error:', e);
      }
    }

    initDOM() {
      ensureCSS();
      const existing = document.getElementById('rimoAiWidget');
      if (existing) existing.remove();

      const container = document.createElement('div');
      container.innerHTML = buildWidgetMarkup(this.context);
      document.body.appendChild(container.firstElementChild);

      this.widget = document.getElementById('rimoAiWidget');
      this.trigger = document.getElementById('rimoAiTrigger');
      this.panel = document.getElementById('rimoAiPanel');
      this.messagesContainer = document.getElementById('rimoAiMessages');
      this.chipsBar = document.getElementById('rimoAiChipsBar');
      this.textarea = document.getElementById('rimoAiInput');
      this.btnSend = document.getElementById('rimoAiBtnSend');
      this.btnClose = document.getElementById('rimoAiBtnClose');
      this.btnClear = document.getElementById('rimoAiBtnClear');

      this.renderChips();
    }

    renderChips() {
      const chips = getContextChips(this.context.id);
      this.chipsBar.innerHTML = '';
      chips.forEach(chip => {
        const btn = document.createElement('button');
        btn.className = 'rimo-ai-chip';
        btn.textContent = chip.label;
        btn.addEventListener('click', () => {
          this.submitQuery(chip.query);
        });
        this.chipsBar.appendChild(btn);
      });
    }

    bindEvents() {
      this.trigger.addEventListener('click', () => this.toggleOpen(true));
      this.btnClose.addEventListener('click', () => this.toggleOpen(false));

      this.btnClear.addEventListener('click', () => {
        if (confirm('Clear chat history?')) {
          this.history = [];
          this.saveHistory();
          this.history = this.loadHistory();
          this.renderHistory();
        }
      });

      this.textarea.addEventListener('input', () => {
        this.textarea.style.height = 'auto';
        this.textarea.style.height = Math.min(this.textarea.scrollHeight, 80) + 'px';
        this.btnSend.disabled = !this.textarea.value.trim();
      });

      this.textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          if (this.textarea.value.trim() && !this.isGenerating) {
            this.handleUserSubmit();
          }
        }
      });

      this.btnSend.addEventListener('click', () => {
        if (this.textarea.value.trim() && !this.isGenerating) {
          this.handleUserSubmit();
        }
      });

      // Shortcut: Ctrl+K or Cmd+K
      window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          const isOpen = this.widget.classList.contains('is-open');
          this.toggleOpen(!isOpen);
        } else if (e.key === 'Escape' && this.widget.classList.contains('is-open')) {
          this.toggleOpen(false);
        }
      });
    }

    toggleOpen(open) {
      if (open) {
        this.widget.classList.add('is-open');
        localStorage.setItem(STORAGE_KEY_OPEN, 'true');
        setTimeout(() => {
          this.textarea.focus();
          this.scrollToBottom();
        }, 100);
      } else {
        this.widget.classList.remove('is-open');
        localStorage.setItem(STORAGE_KEY_OPEN, 'false');
      }
    }

    restoreOpenState() {
      const wasOpen = localStorage.getItem(STORAGE_KEY_OPEN);
      if (wasOpen === 'true') {
        this.toggleOpen(true);
      }
    }

    renderHistory() {
      this.messagesContainer.innerHTML = '';
      this.history.forEach(msg => {
        this.appendMessageDOM(msg, false);
      });
      this.scrollToBottom();
    }

    scrollToBottom() {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    handleUserSubmit() {
      const text = this.textarea.value.trim();
      if (!text) return;

      this.textarea.value = '';
      this.textarea.style.height = 'auto';
      this.btnSend.disabled = true;

      this.submitQuery(text);
    }

    submitQuery(userText) {
      const userMsg = {
        sender: 'user',
        text: userText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      this.history.push(userMsg);
      this.appendMessageDOM(userMsg, true);
      this.saveHistory();
      this.scrollToBottom();

      this.showTypingIndicator();
      this.isGenerating = true;

      setTimeout(() => {
        this.hideTypingIndicator();
        const responseData = generateAIResponse(userText, this.context);

        const aiMsg = {
          sender: 'ai',
          text: responseData.text,
          actions: responseData.actions || [],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        this.history.push(aiMsg);
        this.appendMessageDOM(aiMsg, true);
        this.saveHistory();
        this.isGenerating = false;
        this.scrollToBottom();
      }, 500);
    }

    showTypingIndicator() {
      this.hideTypingIndicator();
      const typingEl = document.createElement('div');
      typingEl.className = 'rimo-ai-msg is-ai';
      typingEl.id = 'rimoAiTypingIndicator';
      typingEl.innerHTML = `
        <div class="rimo-ai-typing">
          <span class="rimo-ai-dot"></span>
          <span class="rimo-ai-dot"></span>
          <span class="rimo-ai-dot"></span>
        </div>
      `;
      this.messagesContainer.appendChild(typingEl);
      this.scrollToBottom();
    }

    hideTypingIndicator() {
      const el = document.getElementById('rimoAiTypingIndicator');
      if (el) el.remove();
    }

    appendMessageDOM(msg, animate = true) {
      const msgEl = document.createElement('div');
      msgEl.className = `rimo-ai-msg is-${msg.sender}`;
      if (!animate) msgEl.style.animation = 'none';

      let contentHTML = '';
      if (msg.sender === 'ai') {
        const formattedText = formatMarkdown(msg.text);
        let actionsHTML = '';
        if (msg.actions && msg.actions.length > 0) {
          actionsHTML = `<div class="rimo-ai-action-btns">`;
          msg.actions.forEach((act, idx) => {
            actionsHTML += `<button class="rimo-ai-action-btn" data-action-idx="${idx}">${act.label}</button>`;
          });
          actionsHTML += `</div>`;
        }

        contentHTML = `
          <div class="rimo-ai-bubble">
            ${formattedText}
            ${actionsHTML}
          </div>
          <div class="rimo-ai-msg-meta">${msg.time || ''}</div>
        `;
      } else {
        contentHTML = `
          <div class="rimo-ai-bubble">
            ${msg.text.replace(/\n/g, '<br>')}
          </div>
          <div class="rimo-ai-msg-meta">${msg.time || ''}</div>
        `;
      }

      msgEl.innerHTML = contentHTML;

      if (msg.actions && msg.actions.length > 0) {
        const buttons = msgEl.querySelectorAll('.rimo-ai-action-btn');
        buttons.forEach((btn, idx) => {
          btn.addEventListener('click', () => {
            const act = msg.actions[idx];
            if (act.url) {
              window.location.href = act.url;
            }
          });
        });
      }

      this.messagesContainer.appendChild(msgEl);
    }
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new RimoAIWidget());
  } else {
    new RimoAIWidget();
  }
})();
