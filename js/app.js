/**
 * dust9826 GitHub Showcase - Interactive Application Logic
 * Author: Jeonghyeon Kim (@dust9826)
 */

document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentCategory = 'all';
  let currentSearchQuery = '';
  let activeTag = null;
  let currentSort = 'featured';

  // DOM Elements
  const featuredContainer = document.getElementById('featured-grid');
  const repoGridContainer = document.getElementById('repo-grid');
  const categoryTabsContainer = document.getElementById('category-tabs');
  const tagCloudContainer = document.getElementById('tag-cloud');
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');
  const resultsCountEl = document.getElementById('results-count');
  const resetFilterBtn = document.getElementById('reset-filter-btn');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const backToTopBtn = document.getElementById('back-to-top');
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const toastEl = document.getElementById('toast');

  // SVG Icon Templates
  const ICONS = {
    sparkles: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
    cpu: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`,
    gamepad: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="6"/></svg>`,
    cube: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.9 6.32A2 2 0 0 0 2 8.04v7.92a2 2 0 0 0 .96 1.73l9.96 5.91a2 2 0 0 0 2.05.02l6.15-4.13a2 2 0 0 0 .88-1.68V8.04a2 2 0 0 0-.88-1.64Z"/><path d="M12 22V12"/><path d="m2.6 7.6 9.4 5.4 9.4-5.4"/></svg>`,
    terminal: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>`,
    book: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 2v20"/></svg>`,
    github: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
    external: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>`,
    copy: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
    info: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
    check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
  };

  // -----------------------------------------------------------------
  // Theme Management
  // -----------------------------------------------------------------
  function initTheme() {
    const savedTheme = localStorage.getItem('dust_portfolio_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('dust_portfolio_theme', next);
    updateThemeIcon(next);
  }

  function updateThemeIcon(theme) {
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = theme === 'dark'
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y1="12"/><line x1="21" y1="12" x2="23" y1="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  }

  // -----------------------------------------------------------------
  // Toast Helper
  // -----------------------------------------------------------------
  function showToast(message) {
    if (!toastEl) return;
    toastEl.innerHTML = `${ICONS.check} <span>${message}</span>`;
    toastEl.classList.add('show');
    setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2800);
  }

  // -----------------------------------------------------------------
  // Copy to Clipboard
  // -----------------------------------------------------------------
  function copyCloneCommand(repoName) {
    const cmd = `git clone https://github.com/dust9826/${repoName}.git`;
    navigator.clipboard.writeText(cmd).then(() => {
      showToast(`클론 명령어가 복사되었습니다: ${repoName}`);
    }).catch(err => {
      console.error('Copy failed', err);
    });
  }

  // -----------------------------------------------------------------
  // Render Featured Projects (Flagship 4)
  // -----------------------------------------------------------------
  function renderFeatured() {
    if (!featuredContainer) return;
    const featuredProjects = REPOSITORIES_DATA.filter(r => r.featured).slice(0, 4);

    featuredContainer.innerHTML = featuredProjects.map(proj => {
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
    const totalCount = REPOSITORIES_DATA.length;

    const tabsHtml = [
      `<button class="tab-btn ${currentCategory === 'all' ? 'active' : ''}" data-cat="all">
        <span>🌟 전체</span>
        <span class="tab-count">${totalCount}</span>
      </button>`
    ];

    SHOWCASE_STATS.domains.forEach(d => {
      const isSelected = currentCategory === d.id;
      tabsHtml.push(`
        <button class="tab-btn ${isSelected ? 'active' : ''}" data-cat="${d.id}">
          <span>${d.label}</span>
          <span class="tab-count">${d.count}</span>
        </button>
      `);
    });

    categoryTabsContainer.innerHTML = tabsHtml.join('');

    categoryTabsContainer.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentCategory = btn.getAttribute('data-cat');
        activeTag = null; // reset tag filter on tab switch
        renderCategoryTabs();
        applyFiltersAndRender();
      });
    });
  }

  // -----------------------------------------------------------------
  // Render Tag Cloud Filter
  // -----------------------------------------------------------------
  function renderTagCloud() {
    if (!tagCloudContainer) return;
    // Extract unique high-frequency tags
    const allTags = {};
    REPOSITORIES_DATA.forEach(r => {
      r.tags.forEach(t => {
        allTags[t] = (allTags[t] || 0) + 1;
      });
    });

    const popularTags = Object.entries(allTags)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 14)
      .map(([name]) => name);

    tagCloudContainer.innerHTML = popularTags.map(tag => `
      <button class="tag-filter-btn ${activeTag === tag ? 'active' : ''}" data-tag="${tag}">
        #${tag}
      </button>
    `).join('');

    tagCloudContainer.querySelectorAll('.tag-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tag = btn.getAttribute('data-tag');
        activeTag = activeTag === tag ? null : tag;
        renderTagCloud();
        applyFiltersAndRender();
      });
    });
  }

  // -----------------------------------------------------------------
  // Filtering & Sorting Logic
  // -----------------------------------------------------------------
  function applyFiltersAndRender() {
    let filtered = [...REPOSITORIES_DATA];

    // 1. Category
    if (currentCategory !== 'all') {
      filtered = filtered.filter(r => r.category === currentCategory);
    }

    // 2. Tag
    if (activeTag) {
      filtered = filtered.filter(r => r.tags.includes(activeTag));
    }

    // 3. Search Query
    if (currentSearchQuery.trim()) {
      const q = currentSearchQuery.toLowerCase().trim();
      filtered = filtered.filter(r => {
        return (
          r.name.toLowerCase().includes(q) ||
          r.title.toLowerCase().includes(q) ||
          r.subtitle.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some(t => t.toLowerCase().includes(q)) ||
          (r.details && r.details.overview.toLowerCase().includes(q)) ||
          r.language.toLowerCase().includes(q)
        );
      });
    }

    // 4. Sort
    if (currentSort === 'featured') {
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (currentSort === 'latest') {
      filtered.sort((a, b) => b.period.localeCompare(a.period));
    } else if (currentSort === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Update Counter
    if (resultsCountEl) {
      resultsCountEl.innerText = `총 ${REPOSITORIES_DATA.length}개 리포지토리 중 ${filtered.length}개 표시`;
    }

    // Render Grid
    renderRepoGrid(filtered);
  }

  // -----------------------------------------------------------------
  // Render Repositories Grid
  // -----------------------------------------------------------------
  function renderRepoGrid(repos) {
    if (!repoGridContainer) return;

    if (repos.length === 0) {
      repoGridContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">🔍</div>
          <h3>조건에 맞는 저장소를 찾을 수 없습니다.</h3>
          <p>검색어나 선택된 태그 필터를 변경해보세요.</p>
        </div>
      `;
      return;
    }

    repoGridContainer.innerHTML = repos.map(repo => {
      const isStarred = repo.featured;
      return `
        <div class="repo-card" data-id="${repo.id}">
          <div class="repo-card-top">
            <span class="repo-category-pill">${repo.categoryName}</span>
            <span class="repo-badge-tag ${isStarred ? 'starred' : ''}">
              ${repo.badge || repo.period}
            </span>
          </div>

          <div class="repo-card-body">
            <h4 class="repo-card-title">${repo.title}</h4>
            <p class="repo-card-subtitle">${repo.subtitle}</p>
            <p class="repo-card-desc">${repo.description}</p>
            
            <div class="repo-card-tags">
              ${repo.tags.slice(0, 4).map(t => `<span class="tag-pill">${t}</span>`).join('')}
            </div>
          </div>

          <div class="repo-card-footer">
            <div class="lang-indicator">
              <span class="lang-dot" style="background-color: ${repo.languageColor};"></span>
              <span>${repo.language}</span>
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
    }).join('');
  }

  // -----------------------------------------------------------------
  // Project Detail Modal
  // -----------------------------------------------------------------
  window.openProjectModal = function(id) {
    const repo = REPOSITORIES_DATA.find(r => r.id === id);
    if (!repo || !modalOverlay) return;

    const modalBanner = document.getElementById('modal-banner');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalPeriod = document.getElementById('modal-period');
    const modalTeam = document.getElementById('modal-team');
    const modalCategory = document.getElementById('modal-category');
    const modalOverview = document.getElementById('modal-overview');
    const modalHighlights = document.getElementById('modal-highlights');
    const modalChallenges = document.getElementById('modal-challenges');
    const modalTech = document.getElementById('modal-tech');
    const modalCloneCmd = document.getElementById('modal-clone-cmd');
    const modalGithubLink = document.getElementById('modal-github-link');

    // Banner setup
    if (modalBanner) {
      if (repo.coverImage) {
        modalBanner.style.backgroundImage = `url('${repo.coverImage}')`;
        modalBanner.style.background = '';
      } else {
        modalBanner.style.backgroundImage = 'none';
        modalBanner.style.background = repo.gradient;
      }
    }

    if (modalTitle) modalTitle.innerText = repo.title;
    if (modalSubtitle) modalSubtitle.innerText = repo.subtitle;
    if (modalPeriod) modalPeriod.innerText = repo.period;
    if (modalTeam) modalTeam.innerText = repo.team;
    if (modalCategory) modalCategory.innerText = repo.categoryName;
    if (modalOverview) modalOverview.innerText = repo.details ? repo.details.overview : repo.description;

    if (modalHighlights && repo.details && repo.details.highlights) {
      modalHighlights.innerHTML = repo.details.highlights.map(h => `
        <li class="highlight-item">
          <span class="highlight-bullet">✓</span>
          <span>${h}</span>
        </li>
      `).join('');
    } else if (modalHighlights) {
      modalHighlights.innerHTML = '';
    }

    if (modalChallenges && repo.details && repo.details.challenges) {
      modalChallenges.innerText = repo.details.challenges;
      document.getElementById('modal-challenges-container').style.display = 'block';
    } else if (modalChallenges) {
      document.getElementById('modal-challenges-container').style.display = 'none';
    }

    if (modalTech) {
      const techList = (repo.details && repo.details.techStack) ? repo.details.techStack : repo.tags;
      modalTech.innerHTML = techList.map(t => `<span class="tag-pill" style="font-size: 0.85rem; padding: 0.3rem 0.8rem;">${t}</span>`).join('');
    }

    const cloneCommand = `git clone https://github.com/dust9826/${repo.name}.git`;
    if (modalCloneCmd) modalCloneCmd.innerText = cloneCommand;

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
  };

  window.copyModalClone = function() {
    if (window._currentModalRepo) {
      copyCloneCommand(window._currentModalRepo);
    }
  };

  // Expose global helpers
  window.copyCloneCommand = copyCloneCommand;

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

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      currentCategory = 'all';
      currentSearchQuery = '';
      activeTag = null;
      if (searchInput) searchInput.value = '';
      renderCategoryTabs();
      renderTagCloud();
      applyFiltersAndRender();
    });
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // Back to Top scroll listener
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

  // Initial Boot
  initTheme();
  renderFeatured();
  renderCategoryTabs();
  renderTagCloud();
  applyFiltersAndRender();
});
