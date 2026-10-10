/**
 * dust9826 GitHub Showcase - Interactive Application Engine
 * Author: Jeonghyeon Kim (@dust9826)
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Application State
  let currentCategory = 'all';
  let currentSearchQuery = '';
  let activeTechMark = null; // Filtered by Tech Mark Logo!
  let currentSort = 'featured';
  let currentViewMode = 'grid'; // 'grid' | 'list'
  
  let allRepositories = [];
  let newRepositories = [];
  let deletedRepositories = [];

  // DOM Elements
  const statTotalRepos = document.getElementById('stat-total-repos');
  const syncStatusText = document.getElementById('sync-status-text');
  const syncDot = document.getElementById('sync-dot');
  const syncDiffSummary = document.getElementById('sync-diff-summary');
  const manualSyncBtn = document.getElementById('manual-sync-btn');
  
  const newSection = document.getElementById('new-section');
  const newReposGrid = document.getElementById('new-repos-grid');
  
  const featuredContainer = document.getElementById('featured-grid');
  const repoGridContainer = document.getElementById('repo-grid');
  const categoryTabsContainer = document.getElementById('category-tabs');
  const techLogoGrid = document.getElementById('tech-logo-grid');
  const activeTechIndicator = document.getElementById('active-tech-indicator');
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');
  const viewGridBtn = document.getElementById('view-grid-btn');
  const viewListBtn = document.getElementById('view-list-btn');
  const resultsCountEl = document.getElementById('results-count');
  const resetFilterBtn = document.getElementById('reset-filter-btn');
  
  const themeToggleBtn = document.getElementById('theme-toggle');
  const backToTopBtn = document.getElementById('back-to-top');
  const toastEl = document.getElementById('toast');
  
  // Mobile Drawer
  const mobileHamburger = document.getElementById('mobile-hamburger');
  const mobileDrawerOverlay = document.getElementById('mobile-drawer-overlay');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  
  // Modal Elements
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  
  // Terminal Modal
  const terminalModal = document.getElementById('terminal-modal');
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');
  const openTerminalBtn = document.getElementById('open-terminal-btn');

  // =================================================================
  // Authentic Tech Vector Logos (SVGs)
  // =================================================================
  const TECH_MARKS = [
    {
      id: 'cpp',
      name: 'C++',
      color: '#00599C',
      svg: `<svg viewBox="0 0 32 32"><path d="M16 3L4 9.9v13.8L16 30.6l12-6.9V9.9L16 3z" fill="#00599C"/><path d="M16 5.5l9.5 5.5v11L16 27.5 6.5 22V11L16 5.5z" fill="#004482"/><path d="M15.5 11.5c-3 0-5 2-5 5s2 5 5 5c2 0 3.5-.8 4.2-1.8l-1.8-1.2c-.5.7-1.3 1.2-2.4 1.2-1.8 0-3-1.4-3-3.2s1.2-3.2 3-3.2c1.1 0 1.9.5 2.4 1.2l1.8-1.2c-.7-1-2.2-1.8-4.2-1.8zm6 3v2h-2v1.5h2v2h1.5v-2h2v-1.5h-2v-2h-1.5zm6 0v2h-2v1.5h2v2h1.5v-2h2v-1.5h-2v-2h-1.5z" fill="#fff"/></svg>`,
      match: r => r.language === 'C++' || (r.tags || []).includes('C++')
    },
    {
      id: 'csharp',
      name: 'C#',
      color: '#239120',
      svg: `<svg viewBox="0 0 32 32"><path d="M16 3L4 9.9v13.8L16 30.6l12-6.9V9.9L16 3z" fill="#68217A"/><path d="M16 5.5l9.5 5.5v11L16 27.5 6.5 22V11L16 5.5z" fill="#501860"/><path d="M14.5 11c-3.2 0-5.5 2.2-5.5 5.5s2.3 5.5 5.5 5.5c2.3 0 3.9-1 4.7-2.1l-2-1.3c-.6.8-1.6 1.4-2.7 1.4-2 0-3.3-1.5-3.3-3.5s1.3-3.5 3.3-3.5c1.1 0 2.1.6 2.7 1.4l2-1.3c-.8-1.1-2.4-2.1-4.7-2.1zm8 2.5h-1l-.4 1.5h1.2l-.3 1.5h-1.2l-.4 1.5h1.2l-.3 1.5h-1.2l-.5 2h-1.5l.5-2h-1.5l-.5 2h-1.5l.5-2H16l.3-1.5h1.5l.4-1.5H16.7l.3-1.5h1.5l.4-1.5h1.5l-.4 1.5h1.5l.4-1.5h1.5zm-3.2 3h-1.5l-.4 1.5h1.5l.4-1.5z" fill="#fff"/></svg>`,
      match: r => r.language === 'C#' || (r.tags || []).includes('C#')
    },
    {
      id: 'python',
      name: 'Python',
      color: '#3776AB',
      svg: `<svg viewBox="0 0 32 32"><path d="M15.9 3c-4.4 0-7.1 1.9-7.1 4.4v3.2h7.3v1H6.8C4.5 11.6 3 13.5 3 16.5s1.9 4.9 4.2 4.9h2.5v-3.5c0-2.8 2.3-5 5.1-5h7.2v-2.3c0-4.3-3.7-7.6-6.1-7.6zm-2.4 2.2c.7 0 1.2.6 1.2 1.3 0 .7-.5 1.3-1.2 1.3-.7 0-1.3-.6-1.3-1.3 0-.7.6-1.3 1.3-1.3z" fill="#387EB8"/><path d="M16.1 29c4.4 0 7.1-1.9 7.1-4.4v-3.2h-7.3v-1h9.3c2.3 0 3.8-1.9 3.8-4.9s-1.9-4.9-4.2-4.9h-2.5v3.5c0 2.8-2.3 5-5.1 5h-7.2v2.3c0 4.4 3.7 7.6 6.1 7.6zm2.4-2.2c-.7 0-1.2-.6-1.2-1.3 0-.7.5-1.3 1.2-1.3.7 0 1.3.6 1.3 1.3 0 .7-.6 1.3-1.3 1.3z" fill="#FFE052"/></svg>`,
      match: r => r.language === 'Python' || (r.tags || []).includes('Python')
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      color: '#3178C6',
      svg: `<svg viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#3178C6"/><path d="M14.5 12h-8v2.5h2.6v9.5h2.8v-9.5h2.6V12zm6.2 5.2c-1.3-.6-2.2-1-2.2-1.7 0-.6.5-1 1.4-1 .9 0 1.7.4 2.2.9l1.6-1.8c-.9-.9-2.3-1.4-3.8-1.4-2.4 0-4.1 1.5-4.1 3.5 0 1.7 1.1 2.7 3 3.4 1.4.6 2 1 2 1.7 0 .7-.6 1.1-1.6 1.1-1.2 0-2.2-.6-2.8-1.3l-1.7 1.8c1.1 1.3 2.7 2 4.5 2 2.7 0 4.4-1.5 4.4-3.7 0-1.8-1.2-2.9-2.9-3.5z" fill="#fff"/></svg>`,
      match: r => r.language === 'TypeScript' || (r.tags || []).includes('TypeScript')
    },
    {
      id: 'unity',
      name: 'Unity 6',
      color: '#222c37',
      svg: `<svg viewBox="0 0 32 32"><path d="M16 4l-4 6.9h8L16 4zm-7.6 13.2l6.9 4v-8l-6.9 4zm15.2 0l-6.9-4v8l6.9-4zM7 11.2l-4 6.9 4 6.9 3.5-6-3.5-7.8zm18 0l-3.5 7.8 3.5 6 4-6.9-4-6.9zM12 28h8l-4-6.9L12 28z" fill="#fff"/></svg>`,
      match: r => (r.tags || []).some(t => t.toLowerCase().includes('unity')) || r.name.toLowerCase().includes('unity') || (r.description || '').toLowerCase().includes('unity')
    },
    {
      id: 'unreal',
      name: 'Unreal 5',
      color: '#0E1128',
      svg: `<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/><path d="M16 7c-5 0-9 4-9 9 0 3.3 1.8 6.2 4.5 7.7l1.5-2.6c-1.8-1-3-2.9-3-5.1 0-3.3 2.7-6 6-6s6 2.7 6 6c0 2.2-1.2 4.1-3 5.1l1.5 2.6C23.2 22.2 25 19.3 25 16c0-5-4-9-9-9zm-2.5 5v5.5c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5V12h2v5.5c0 2.5-2 4.5-4.5 4.5S11.5 20 11.5 17.5V12h2z" fill="#fff"/></svg>`,
      match: r => (r.tags || []).some(t => t.toLowerCase().includes('unreal')) || (r.description || '').toLowerCase().includes('unreal')
    },
    {
      id: 'webgl',
      name: 'Pure WebGL',
      color: '#990000',
      svg: `<svg viewBox="0 0 32 32"><polygon points="16,3 29,10.5 29,21.5 16,29 3,21.5 3,10.5" fill="none" stroke="#990000" stroke-width="2.2"/><polygon points="16,8 24,13 16,18 8,13" fill="#EE2726"/><polygon points="8,13 16,18 16,25 8,20" fill="#B31B1B"/><polygon points="24,13 16,18 16,25 24,20" fill="#7A0000"/><circle cx="16" cy="18" r="1.8" fill="#fff"/></svg>`,
      match: r => (r.tags || []).some(t => t.toLowerCase().includes('webgl')) || r.name.toLowerCase().includes('webgl')
    },
    {
      id: 'pytorch',
      name: 'PyTorch',
      color: '#EE4C2C',
      svg: `<svg viewBox="0 0 32 32"><path d="M19.5 8.5L16 5l-3.5 3.5c-4.1 4.1-4.1 10.9 0 15 4.1 4.1 10.9 4.1 15 0l2-2-4.5-4.5-1.5 1.5c-2.5 2.5-6.5 2.5-9 0s-2.5-6.5 0-9l1.5-1.5z" fill="#EE4C2C"/><circle cx="21" cy="7" r="1.8" fill="#EE4C2C"/></svg>`,
      match: r => (r.tags || []).some(t => t.toLowerCase().includes('pytorch')) || (r.details && r.details.techStack && r.details.techStack.some(t => t.toLowerCase().includes('pytorch')))
    },
    {
      id: 'winapi',
      name: 'WinAPI / MFC',
      color: '#0078D7',
      svg: `<svg viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#0078D7"/><rect x="6" y="6" width="9" height="9" fill="#fff"/><rect x="17" y="6" width="9" height="9" fill="#fff"/><rect x="6" y="17" width="9" height="9" fill="#fff"/><rect x="17" y="17" width="9" height="9" fill="#fff"/></svg>`,
      match: r => (r.tags || []).some(t => t.toLowerCase().includes('mfc') || t.toLowerCase().includes('winapi'))
    },
    {
      id: 'shader',
      name: 'ShaderLab/HLSL',
      color: '#8b5cf6',
      svg: `<svg viewBox="0 0 32 32"><polygon points="16,4 27,25 5,25" fill="none" stroke="#8b5cf6" stroke-width="2"/><line x1="2" y1="16" x2="16" y2="16" stroke="#fff" stroke-width="1.8"/><line x1="16" y1="16" x2="28" y2="10" stroke="#f43f5e" stroke-width="1.8"/><line x1="16" y1="16" x2="29" y2="16" stroke="#10b981" stroke-width="1.8"/><line x1="16" y1="16" x2="28" y2="22" stroke="#06b6d4" stroke-width="1.8"/></svg>`,
      match: r => r.language === 'ShaderLab' || (r.tags || []).some(t => t.toLowerCase().includes('shader'))
    },
    {
      id: 'photon',
      name: 'Photon Fusion',
      color: '#0284c7',
      svg: `<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="4.5" fill="#0284c7"/><circle cx="7" cy="8" r="3" fill="#38bdf8"/><circle cx="25" cy="8" r="3" fill="#38bdf8"/><circle cx="16" cy="27" r="3" fill="#38bdf8"/><line x1="9" y1="10" x2="13.5" y2="13.5" stroke="#38bdf8" stroke-width="1.5"/><line x1="23" y1="10" x2="18.5" y2="13.5" stroke="#38bdf8" stroke-width="1.5"/><line x1="16" y1="24" x2="16" y2="20.5" stroke="#38bdf8" stroke-width="1.5"/></svg>`,
      match: r => (r.tags || []).some(t => t.toLowerCase().includes('photon')) || (r.description || '').toLowerCase().includes('photon')
    },
    {
      id: 'java',
      name: 'Java (OOP)',
      color: '#EA2D2E',
      svg: `<svg viewBox="0 0 32 32"><path d="M12.5 24.5c4 .4 8-.2 12-.9.7-.1 1.2.4.9 1-.9 1.8-4.2 3.2-8.5 3.2-5 0-8.9-1.8-8-3.4.3-.6 1.6-.2 3.6.1z" fill="#5382A1"/><path d="M21 21c3.5.3 7-.1 10.5-.7.6-.1 1 .4.7.9-.8 1.5-3.6 2.7-7.4 2.7-4.3 0-7.7-1.5-6.9-2.9.3-.5 1.4-.2 3.1 0z" fill="#E76F00"/><path d="M14 17.5c-3 1.8-4.3 3.6-2.9 4.7 1.4 1.1 5.3.8 8.7-.7s5.1-3.6 3.7-4.7c-1.4-1.1-6.5-1.1-9.5.7z" fill="#EA2D2E"/></svg>`,
      match: r => r.language === 'Java' || (r.tags || []).includes('Java')
    },
    {
      id: 'git',
      name: 'Git / OpenSource',
      color: '#F05032',
      svg: `<svg viewBox="0 0 32 32"><path d="M28.7 14.3L17.7 3.3c-.8-.8-2.1-.8-2.9 0l-2.6 2.6 3.6 3.6c.9-.3 1.9-.1 2.6.6.7.7.9 1.7.6 2.6l3.5 3.5c.9-.3 1.9-.1 2.6.6 1 1 1 2.7 0 3.7s-2.7 1-3.7 0c-.8-.8-.9-1.9-.5-2.9l-3.2-3.2v8.5c.3.2.5.4.7.7 1 1 1 2.7 0 3.7s-2.7 1-3.7 0c-1-1-1-2.7 0-3.7.3-.3.8-.5 1.3-.6V14c-.5-.1-1-.4-1.3-.7-.8-.8-.9-1.9-.5-2.9L8.1 6.8 3.3 11.6c-.8.8-.8 2.1 0 2.9l11 11c.8.8 2.1.8 2.9 0l11.5-11.2z" fill="#F05032"/></svg>`,
      match: r => (r.tags || []).some(t => t.toLowerCase().includes('git')) || r.name === 'coala'
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      color: '#F7DF1E',
      svg: `<svg viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#F7DF1E"/><path d="M18.5 23.5c.8 1.4 1.9 2.2 3.6 2.2 1.6 0 2.6-.8 2.6-1.9 0-1.3-.9-1.8-2.5-2.5l-.9-.4c-2.4-1-4-2.3-4-5 0-2.5 1.9-4.4 4.8-4.4 2.1 0 3.5.7 4.5 2.5l-2.4 1.5c-.5-.9-1.1-1.3-2.1-1.3-1 0-1.7.6-1.7 1.5 0 1 .7 1.5 2.1 2.1l.9.4c2.8 1.2 4.4 2.4 4.4 5.3 0 3-2.3 4.7-5.5 4.7-3 0-4.9-1.5-5.9-3.5l2.1-1.2zm-8.8 2.5c-.8-.5-1.5-1.3-1.8-2.2l2.3-1.3c.3.6.6 1.1 1.2 1.4.6.3 1.3.3 1.8-.2.4-.4.6-1 .6-2.2v-9.6h2.7v9.7c0 1.8-.5 3.1-1.5 3.9-1 1-2.5 1.1-5.3.5z" fill="#000"/></svg>`,
      match: r => r.language === 'JavaScript' || (r.tags || []).includes('JavaScript')
    }
  ];

  // SVG Helper Icons
  const ICONS = {
    sparkles: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
    github: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
    external: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>`,
    copy: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
    info: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
    check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
    star: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
  };

  // -----------------------------------------------------------------
  // Theme Management
  // -----------------------------------------------------------------
  function initTheme() {
    const saved = localStorage.getItem('dust_theme_pref') ||
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon(saved);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('dust_theme_pref', next);
    updateThemeIcon(next);
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    themeToggleBtn.innerHTML = theme === 'dark'
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y1="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }

  // -----------------------------------------------------------------
  // Mobile Drawer Navigation
  // -----------------------------------------------------------------
  function openMobileDrawer() {
    if (mobileDrawerOverlay) mobileDrawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    if (mobileDrawerOverlay) mobileDrawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  window.closeMobileDrawer = closeMobileDrawer;

  // -----------------------------------------------------------------
  // Toast Helper
  // -----------------------------------------------------------------
  function showToast(message) {
    if (!toastEl) return;
    toastEl.innerHTML = `${ICONS.check} <span>${message}</span>`;
    toastEl.classList.add('show');
    setTimeout(() => toastEl.classList.remove('show'), 2600);
  }

  // -----------------------------------------------------------------
  // Copy to Clipboard
  // -----------------------------------------------------------------
  function copyCloneCommand(repoName) {
    const cmd = `git clone https://github.com/dust9826/${repoName}.git`;
    navigator.clipboard.writeText(cmd).then(() => {
      showToast(`클론 명령어가 복사되었습니다: ${repoName}`);
    }).catch(err => console.error('Copy error', err));
  }

  window.copyCloneCommand = copyCloneCommand;

  // -----------------------------------------------------------------
  // Live GitHub Sync & Reconciliation
  // -----------------------------------------------------------------
  async function performLiveSync(force = false) {
    if (syncStatusText) syncStatusText.innerText = 'GitHub 최신 정보 동기화 중...';
    if (syncDot) syncDot.style.background = 'var(--accent-amber)';

    try {
      const syncResult = await window.liveGitHubSync.reconcileRepositories(force);
      allRepositories = syncResult.allRepos;
      newRepositories = syncResult.newRepos;
      deletedRepositories = syncResult.deletedRepos;

      if (syncDot) syncDot.style.background = 'var(--accent-emerald)';
      if (syncStatusText) {
        syncStatusText.innerText = syncResult.state.source === 'api'
          ? 'GitHub 실시간 연동됨 (최신)'
          : 'GitHub 캐시 연동 모드';
      }

      if (syncDiffSummary) {
        const parts = [];
        if (newRepositories.length > 0) parts.push(`✨ 신규 ${newRepositories.length}개 감지`);
        if (deletedRepositories.length > 0) parts.push(`⚠️ ${deletedRepositories.length}개 보관/비공개`);
        if (parts.length === 0) parts.push(`전체 ${allRepositories.length}개 최신 동기화 완료`);
        syncDiffSummary.innerText = parts.join(' | ');
      }

      if (statTotalRepos) {
        statTotalRepos.innerText = allRepositories.length.toString();
      }

      renderNewSection();
      renderCategoryTabs();
      renderTechLogoGrid();
      applyFiltersAndRender();
      
      checkHashDeepLink();

    } catch (err) {
      console.error('[App] Live sync failed:', err);
      if (syncStatusText) syncStatusText.innerText = '오프라인 기준 데이터 모드';
      if (syncDot) syncDot.style.background = 'var(--accent-rose)';
      allRepositories = (typeof REPOSITORIES_DATA !== 'undefined') ? REPOSITORIES_DATA : [];
      renderCategoryTabs();
      renderTechLogoGrid();
      applyFiltersAndRender();
    }
  }

  // -----------------------------------------------------------------
  // Render NEW Detected Repositories Section
  // -----------------------------------------------------------------
  function renderNewSection() {
    if (!newSection || !newReposGrid) return;

    if (newRepositories.length > 0) {
      newSection.classList.add('has-new');
      newReposGrid.innerHTML = newRepositories.map(repo => createRepoCardHTML(repo)).join('');
    } else {
      newSection.classList.remove('has-new');
      newReposGrid.innerHTML = '';
    }
  }

  // -----------------------------------------------------------------
  // Render Featured Flagship Projects
  // -----------------------------------------------------------------
  function renderFeatured() {
    if (!featuredContainer) return;
    const baseList = (typeof REPOSITORIES_DATA !== 'undefined') ? REPOSITORIES_DATA : allRepositories;
    const flagshipList = baseList.filter(r => r.featured).slice(0, 4);

    featuredContainer.innerHTML = flagshipList.map(proj => {
      const bannerBg = proj.coverImage
        ? `background-image: url('${proj.coverImage}');`
        : `background: ${proj.gradient};`;

      return `
        <div class="featured-card" data-id="${proj.id}">
          <div class="featured-banner" style="${bannerBg}">
            <div class="featured-banner-overlay"></div>
            <div class="featured-badge-list">
              <span class="featured-badge highlight">${proj.badge || proj.categoryName}</span>
              <span class="featured-badge">${proj.period}</span>
              <span class="featured-badge">${proj.team}</span>
            </div>
          </div>
          <div class="featured-body">
            <h3 class="featured-title">${proj.title}</h3>
            <p class="featured-subtitle">${proj.subtitle}</p>
            <p class="featured-desc">${proj.description}</p>
            <div class="featured-tags">
              ${proj.tags.slice(0, 5).map(t => `<span class="tag-pill">${t}</span>`).join('')}
            </div>
            <div class="featured-footer">
              <div class="lang-indicator">
                <span class="lang-dot" style="background-color: ${proj.languageColor};"></span>
                <span>${proj.language}</span>
              </div>
              <div class="action-btn-group">
                <button class="btn-detail" onclick="openProjectModal('${proj.id}')">
                  ${ICONS.info} <span>상세 분석</span>
                </button>
                <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-repo-link" title="GitHub 방문">
                  ${ICONS.github}
                </a>
                <button class="btn-repo-link" onclick="copyCloneCommand('${proj.name}')" title="git clone 명령어 복사">
                  ${ICONS.copy}
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // -----------------------------------------------------------------
  // Render Category Tabs
  // -----------------------------------------------------------------
  function renderCategoryTabs() {
    if (!categoryTabsContainer) return;
    const counts = { all: allRepositories.length };
    allRepositories.forEach(r => {
      counts[r.category] = (counts[r.category] || 0) + 1;
    });

    const domains = [
      { id: 'all', label: '🌟 전체', count: counts.all },
      { id: 'ai', label: '🤖 AI & Vision', count: counts.ai || 0 },
      { id: 'game', label: '🎮 게임 & 그래픽스', count: counts.game || 0 },
      { id: 'engine', label: '💻 커스텀 엔진 & 웹', count: counts.engine || 0 },
      { id: 'algorithm', label: '⚡ 알고리즘 & CS', count: counts.algorithm || 0 },
      { id: 'education', label: '📚 교육 & 도구', count: counts.education || 0 }
    ];

    categoryTabsContainer.innerHTML = domains.map(d => `
      <button class="tab-btn ${currentCategory === d.id ? 'active' : ''}" data-cat="${d.id}">
        <span>${d.label}</span>
        <span class="tab-count">${d.count}</span>
      </button>
    `).join('');

    categoryTabsContainer.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentCategory = btn.getAttribute('data-cat');
        activeTechMark = null; // reset mark filter on domain tab switch
        renderCategoryTabs();
        renderTechLogoGrid();
        applyFiltersAndRender();
      });
    });
  }

  // -----------------------------------------------------------------
  // Render Interactive Tech Logo Matrix Grid
  // -----------------------------------------------------------------
  function renderTechLogoGrid() {
    if (!techLogoGrid) return;

    techLogoGrid.innerHTML = TECH_MARKS.map(mark => {
      // Calculate how many repos match this tech mark in the current active domain
      let scopeRepos = allRepositories;
      if (currentCategory !== 'all') {
        scopeRepos = scopeRepos.filter(r => r.category === currentCategory);
      }
      const matchingCount = scopeRepos.filter(mark.match).length;
      const isActive = activeTechMark === mark.id;

      return `
        <button class="tech-mark-btn ${isActive ? 'active' : ''}" data-tech="${mark.id}" title="${mark.name} 프로젝트 필터링">
          <div class="tech-icon-wrap">
            ${mark.svg}
          </div>
          <div class="tech-mark-info">
            <span class="tech-mark-name">${mark.name}</span>
            <span class="tech-mark-count">${matchingCount}개 저장소</span>
          </div>
        </button>
      `;
    }).join('');

    techLogoGrid.querySelectorAll('.tech-mark-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const techId = btn.getAttribute('data-tech');
        if (activeTechMark === techId) {
          activeTechMark = null; // Toggle off
          if (activeTechIndicator) activeTechIndicator.innerText = '원하는 기술 마크를 클릭하여 필터링하세요';
        } else {
          activeTechMark = techId;
          const found = TECH_MARKS.find(m => m.id === techId);
          if (activeTechIndicator) activeTechIndicator.innerHTML = `선택된 기술 필터: <strong style="color: var(--accent-cyan);">${found.name}</strong> (다시 누르면 해제)`;
        }
        renderTechLogoGrid();
        applyFiltersAndRender();
      });
    });
  }

  // -----------------------------------------------------------------
  // Create HTML Card for a Repository
  // -----------------------------------------------------------------
  function createRepoCardHTML(repo) {
    const isNew = repo.isNew;
    const isDel = repo.isDeleted;
    const stars = repo.stats ? repo.stats.stars : 0;
    const relativeTime = repo.stats ? (repo.stats.relativePushed || '최근') : '최근';

    let badgeHTML = '';
    if (isNew) {
      badgeHTML = `<span class="badge-new">✨ NEW</span>`;
    } else if (isDel) {
      badgeHTML = `<span class="badge-deleted">⚠️ 삭제/비공개됨</span>`;
    } else if (repo.featured) {
      badgeHTML = `<span style="font-size: 0.72rem; font-weight: 700; padding: 0.2rem 0.55rem; border-radius: 9999px; background: rgba(245, 158, 11, 0.15); color: var(--accent-amber); border: 1px solid rgba(245, 158, 11, 0.3);">⭐ Flagship</span>`;
    } else {
      badgeHTML = `<span style="font-size: 0.72rem; color: var(--text-muted);">${repo.period}</span>`;
    }

    return `
      <div class="repo-card ${isDel ? 'is-deleted' : ''}" data-id="${repo.id}">
        <div class="repo-card-top">
          <span class="repo-category-pill">${repo.categoryName}</span>
          ${badgeHTML}
        </div>

        <div class="repo-card-body">
          <h4 class="repo-card-title">${repo.title}</h4>
          <p class="repo-card-subtitle">${repo.subtitle}</p>
          <p class="repo-card-desc">${repo.description}</p>
          
          <div class="repo-card-tags">
            ${(repo.tags || []).slice(0, 4).map(t => `<span class="tag-pill">${t}</span>`).join('')}
          </div>
        </div>

        <div class="repo-card-footer">
          <div class="repo-footer-left">
            <div class="lang-indicator">
              <span class="lang-dot" style="background-color: ${repo.languageColor};"></span>
              <span>${repo.language}</span>
            </div>
            <span class="relative-time">${relativeTime}</span>
            ${stars > 0 ? `<span style="display: inline-flex; align-items: center; gap: 0.2rem; font-size: 0.75rem; color: var(--accent-amber);">${ICONS.star} ${stars}</span>` : ''}
          </div>
          
          <div class="repo-actions">
            <button class="btn-card-action primary" onclick="openProjectModal('${repo.id}')">
              ${ICONS.info} <span>상세</span>
            </button>
            <a href="${repo.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-action" title="GitHub">
              ${ICONS.external}
            </a>
            <button class="btn-card-action" onclick="copyCloneCommand('${repo.name}')" title="Clone">
              ${ICONS.copy}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // -----------------------------------------------------------------
  // Filter & Render Logic
  // -----------------------------------------------------------------
  function applyFiltersAndRender() {
    let filtered = [...allRepositories];

    // 1. Domain Category Tab
    if (currentCategory !== 'all') {
      filtered = filtered.filter(r => r.category === currentCategory);
    }

    // 2. Tech Logo Mark Filter!
    if (activeTechMark) {
      const activeMark = TECH_MARKS.find(m => m.id === activeTechMark);
      if (activeMark) {
        filtered = filtered.filter(activeMark.match);
      }
    }

    // 3. Search Query
    if (currentSearchQuery.trim()) {
      const q = currentSearchQuery.toLowerCase().trim();
      filtered = filtered.filter(r => {
        return (
          r.name.toLowerCase().includes(q) ||
          r.title.toLowerCase().includes(q) ||
          (r.subtitle && r.subtitle.toLowerCase().includes(q)) ||
          r.description.toLowerCase().includes(q) ||
          (r.tags && r.tags.some(t => t.toLowerCase().includes(q))) ||
          (r.language && r.language.toLowerCase().includes(q))
        );
      });
    }

    // 4. Sort
    if (currentSort === 'featured') {
      filtered.sort((a, b) => {
        if (a.isNew !== b.isNew) return b.isNew ? 1 : -1;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
    } else if (currentSort === 'latest') {
      filtered.sort((a, b) => {
        const dateA = (a.stats && a.stats.pushedAt) ? new Date(a.stats.pushedAt).getTime() : 0;
        const dateB = (b.stats && b.stats.pushedAt) ? new Date(b.stats.pushedAt).getTime() : 0;
        return dateB - dateA;
      });
    } else if (currentSort === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Results count
    if (resultsCountEl) {
      const activeMark = TECH_MARKS.find(m => m.id === activeTechMark);
      const markLabel = activeMark ? ` [${activeMark.name} 필터 적용]` : '';
      resultsCountEl.innerText = `총 ${allRepositories.length}개 리포지토리 중 ${filtered.length}개 표시${markLabel}`;
    }

    // Render Grid
    renderGrid(filtered);
  }

  function renderGrid(repos) {
    if (!repoGridContainer) return;

    if (currentViewMode === 'list') {
      repoGridContainer.classList.add('list-view');
    } else {
      repoGridContainer.classList.remove('list-view');
    }

    if (repos.length === 0) {
      repoGridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.8rem;">🔍</div>
          <h3>선택한 기술 로고 또는 검색 조건에 일치하는 저장소가 없습니다.</h3>
          <p>선택된 기술 마크를 다시 클릭하여 해제하거나 검색어를 변경해보세요.</p>
        </div>
      `;
      return;
    }

    repoGridContainer.innerHTML = repos.map(r => createRepoCardHTML(r)).join('');
  }

  // -----------------------------------------------------------------
  // Project Detail Modal & Hash Deep Linking
  // -----------------------------------------------------------------
  window.openProjectModal = function(id) {
    const repo = allRepositories.find(r => r.id === id || r.name === id);
    if (!repo || !modalOverlay) return;

    history.replaceState(null, '', `#repo/${repo.name}`);

    const modalBanner = document.getElementById('modal-banner');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalPeriod = document.getElementById('modal-period');
    const modalTeam = document.getElementById('modal-team');
    const modalCategory = document.getElementById('modal-category');
    const modalDiffBadge = document.getElementById('modal-diff-badge');
    const modalOverview = document.getElementById('modal-overview');
    const modalHighlights = document.getElementById('modal-highlights');
    const modalChallenges = document.getElementById('modal-challenges');
    const modalTech = document.getElementById('modal-tech');
    const modalCloneCmd = document.getElementById('modal-clone-cmd');
    const modalGithubLink = document.getElementById('modal-github-link');

    if (modalBanner) {
      if (repo.coverImage) {
        modalBanner.style.backgroundImage = `url('${repo.coverImage}')`;
        modalBanner.style.background = '';
      } else {
        modalBanner.style.backgroundImage = 'none';
        modalBanner.style.background = repo.gradient || 'linear-gradient(135deg, #1e293b 0%, #475569 100%)';
      }
    }

    if (modalTitle) modalTitle.innerText = repo.title;
    if (modalSubtitle) modalSubtitle.innerText = repo.subtitle;
    if (modalPeriod) modalPeriod.innerText = repo.period;
    if (modalTeam) modalTeam.innerText = repo.team;
    if (modalCategory) modalCategory.innerText = repo.categoryName;

    if (modalDiffBadge) {
      if (repo.isNew) {
        modalDiffBadge.innerHTML = `<span class="badge-new">✨ 실시간 신규 감지</span>`;
      } else if (repo.isDeleted) {
        modalDiffBadge.innerHTML = `<span class="badge-deleted">⚠️ 저장소 삭제/비공개됨</span>`;
      } else {
        modalDiffBadge.innerHTML = '';
      }
    }

    if (modalOverview) {
      modalOverview.innerText = (repo.details && repo.details.overview)
        ? repo.details.overview
        : repo.description;
    }

    if (modalHighlights) {
      const items = (repo.details && repo.details.highlights) ? repo.details.highlights : [];
      modalHighlights.innerHTML = items.map(h => `
        <li class="highlight-item">
          <span class="highlight-bullet">✓</span>
          <span>${h}</span>
        </li>
      `).join('');
    }

    const challengesCont = document.getElementById('modal-challenges-container');
    if (modalChallenges && challengesCont) {
      if (repo.details && repo.details.challenges) {
        modalChallenges.innerText = repo.details.challenges;
        challengesCont.style.display = 'block';
      } else {
        challengesCont.style.display = 'none';
      }
    }

    if (modalTech) {
      const techList = (repo.details && repo.details.techStack) ? repo.details.techStack : repo.tags;
      modalTech.innerHTML = (techList || []).map(t => `<span class="tag-pill" style="font-size: 0.82rem; padding: 0.25rem 0.75rem;">${t}</span>`).join('');
    }

    if (modalCloneCmd) {
      modalCloneCmd.innerText = `git clone https://github.com/dust9826/${repo.name}.git`;
    }

    if (modalGithubLink) {
      modalGithubLink.href = repo.githubUrl;
    }

    window._currentModalRepo = repo.name;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeProjectModal = function() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (window.location.hash.startsWith('#repo/')) {
      history.replaceState(null, '', '#explorer');
    }
  };

  window.copyModalClone = function() {
    if (window._currentModalRepo) {
      copyCloneCommand(window._currentModalRepo);
    }
  };

  function checkHashDeepLink() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#repo/')) {
      const repoName = decodeURIComponent(hash.replace('#repo/', ''));
      window.openProjectModal(repoName);
    }
  }

  // -----------------------------------------------------------------
  // Interactive CLI Terminal Mode
  // -----------------------------------------------------------------
  window.openTerminal = function() {
    if (!terminalModal) return;
    terminalModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (terminalInput) {
      setTimeout(() => terminalInput.focus(), 150);
    }
  };

  window.closeTerminal = function() {
    if (!terminalModal) return;
    terminalModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  function handleTerminalCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    const parts = cmd.split(' ');
    const action = parts[0];
    const arg = parts.slice(1).join(' ');

    let output = '';

    switch (action) {
      case 'help':
        output = `
Available commands:
  repos, list       : 모든 리포지토리 목록 및 스타 수 출력
  info <name>       : 특정 리포지토리 상세 정보 조회
  clone <name>      : 깃 클론 명령어 클립보드 복사
  theme             : 다크/라이트 테마 즉시 전환
  sync              : GitHub 실시간 동기화 강제 실행
  clear             : 터미널 화면 청소
  exit              : 터미널 종료
`;
        break;

      case 'repos':
      case 'list':
        output = allRepositories.map((r, i) => {
          const tag = r.isNew ? '[NEW]' : (r.isDeleted ? '[DEL]' : '     ');
          return `${tag} ${String(i + 1).padStart(2, ' ')}. ${r.name.padEnd(32, ' ')} [${r.language}] ★ ${r.stats.stars}`;
        }).join('\n');
        break;

      case 'info':
      case 'cat':
        if (!arg) {
          output = '사용법: info <리포지토리명> (예: info GGwaekGGwaek)';
        } else {
          const match = allRepositories.find(r => r.name.toLowerCase() === arg.toLowerCase());
          if (match) {
            output = `
Repository: ${match.name}
Title     : ${match.title}
Domain    : ${match.categoryName}
Language  : ${match.language}
Stars/Fork: ★ ${match.stats.stars} / ⑂ ${match.stats.forks}
Updated   : ${match.stats.relativePushed}
URL       : ${match.githubUrl}
Summary   : ${match.description}
`;
          } else {
            output = `'${arg}' 저장소를 찾을 수 없습니다. 'repos'를 입력하여 목록을 확인하세요.`;
          }
        }
        break;

      case 'clone':
        if (!arg) {
          output = '사용법: clone <리포지토리명>';
        } else {
          const match = allRepositories.find(r => r.name.toLowerCase() === arg.toLowerCase());
          if (match) {
            copyCloneCommand(match.name);
            output = `Copied to clipboard: git clone ${match.githubUrl}.git`;
          } else {
            output = `'${arg}' 저장소를 찾을 수 없습니다.`;
          }
        }
        break;

      case 'theme':
        toggleTheme();
        output = `테마가 변경되었습니다: ${document.documentElement.getAttribute('data-theme')}`;
        break;

      case 'sync':
        performLiveSync(true);
        output = 'GitHub 실시간 동기화 파이프라인을 실행했습니다.';
        break;

      case 'clear':
        if (terminalBody) {
          terminalBody.querySelector('.terminal-output').innerHTML = '';
        }
        return;

      case 'exit':
      case 'quit':
        closeTerminal();
        return;

      default:
        if (cmd) {
          output = `command not found: ${action}. 'help'를 입력하여 명령어 목록을 확인하세요.`;
        }
    }

    if (output && terminalBody) {
      const outputDiv = terminalBody.querySelector('.terminal-output');
      outputDiv.innerHTML += `\n<span style="color: var(--accent-emerald);">dust9826@showcase:~$</span> ${raw}\n${output}`;
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  }

  // -----------------------------------------------------------------
  // Event Listeners
  // -----------------------------------------------------------------
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      applyFiltersAndRender();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      applyFiltersAndRender();
    });
  }

  if (viewGridBtn && viewListBtn) {
    viewGridBtn.addEventListener('click', () => {
      currentViewMode = 'grid';
      viewGridBtn.classList.add('active');
      viewListBtn.classList.remove('active');
      applyFiltersAndRender();
    });

    viewListBtn.addEventListener('click', () => {
      currentViewMode = 'list';
      viewListBtn.classList.add('active');
      viewGridBtn.classList.remove('active');
      applyFiltersAndRender();
    });
  }

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      currentCategory = 'all';
      currentSearchQuery = '';
      activeTechMark = null;
      if (searchInput) searchInput.value = '';
      if (activeTechIndicator) activeTechIndicator.innerText = '원하는 기술 마크를 클릭하여 필터링하세요';
      renderCategoryTabs();
      renderTechLogoGrid();
      applyFiltersAndRender();
    });
  }

  if (manualSyncBtn) {
    manualSyncBtn.addEventListener('click', () => {
      showToast('GitHub 최신 정보를 실시간 조회 중입니다...');
      performLiveSync(true);
    });
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  if (mobileHamburger) {
    mobileHamburger.addEventListener('click', openMobileDrawer);
  }

  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', closeMobileDrawer);
  }

  if (mobileDrawerOverlay) {
    mobileDrawerOverlay.addEventListener('click', (e) => {
      if (e.target === mobileDrawerOverlay) closeMobileDrawer();
    });
  }

  if (openTerminalBtn) {
    openTerminalBtn.addEventListener('click', openTerminal);
  }

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        terminalInput.value = '';
        handleTerminalCommand(val);
      }
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeProjectModal();
    });
  }

  // Global Keybindings (Ctrl+K or ⌘K for Search, ESC to close modals)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (searchInput) {
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else if (e.key === 'Escape') {
      if (terminalModal && terminalModal.classList.contains('active')) closeTerminal();
      if (modalOverlay && modalOverlay.classList.contains('active')) closeProjectModal();
      if (mobileDrawerOverlay && mobileDrawerOverlay.classList.contains('open')) closeMobileDrawer();
    }
  });

  // Back to Top Button
  window.addEventListener('scroll', () => {
    if (!backToTopBtn) return;
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // -----------------------------------------------------------------
  // Initial Boot
  // -----------------------------------------------------------------
  initTheme();
  renderFeatured();
  await performLiveSync(false);
});
