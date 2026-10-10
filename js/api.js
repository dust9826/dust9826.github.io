/**
 * dust9826 GitHub Showcase - Live API & Diff Reconciliation Engine
 * Author: Jeonghyeon Kim (@dust9826)
 */

class LiveGitHubSync {
  constructor() {
    this.username = 'dust9826';
    this.cacheKey = 'dust_github_repos_cache_v3';
    this.profileCacheKey = 'dust_github_profile_cache_v3';
    this.cacheDuration = 5 * 60 * 1000; // 5분 캐시 (새로고침 시 신선도 유지)
    
    this.state = {
      isLive: false,
      source: 'initial', // 'api' | 'cache' | 'offline_fallback'
      lastSync: null,
      rateLimitRemaining: null,
      isRateLimited: false,
      newReposCount: 0,
      deletedReposCount: 0,
      totalCount: 0
    };
  }

  /**
   * 언어별 대표 브랜드 컬러
   */
  getLanguageColor(lang) {
    const colors = {
      'C++': '#f34b7d',
      'C#': '#178600',
      'Python': '#3572A5',
      'TypeScript': '#3178c6',
      'JavaScript': '#f1e05a',
      'Java': '#b07219',
      'ShaderLab': '#222c37',
      'HTML': '#e34c26',
      'CSS': '#563d7c',
      'Jupyter Notebook': '#DA5B0B'
    };
    return colors[lang] || '#8b5cf6';
  }

  /**
   * 깃허브 메타데이터 기반 실시간 자동 분류기 (Rule-based Classifier)
   */
  classifyRepo(repo) {
    const name = (repo.name || '').toLowerCase();
    const desc = (repo.description || '').toLowerCase();
    const lang = (repo.language || '').toLowerCase();
    const topics = (repo.topics || []).map(t => t.toLowerCase());

    // 1. AI & Computer Vision
    if (
      lang === 'python' || lang === 'jupyter notebook' ||
      name.includes('stereo') || name.includes('mmdl') || name.includes('classification') ||
      topics.includes('ai') || topics.includes('deep-learning') || topics.includes('computer-vision') ||
      desc.includes('stereo') || desc.includes('prior') || desc.includes('mmmu') || desc.includes('deep learning')
    ) {
      return { category: 'ai', categoryName: 'AI & Computer Vision' };
    }

    // 2. Custom Engine & Web
    if (
      name.includes('webgameengine') || name.includes('webgl') || name.includes('btmeta') || name.includes('ggart') ||
      topics.includes('webgl') || topics.includes('engine') ||
      desc.includes('web game engine') || desc.includes('voxel') || desc.includes('webgl')
    ) {
      return { category: 'engine', categoryName: 'Custom Engine & Web' };
    }

    // 3. Game Dev & Graphics
    if (
      lang === 'c#' || lang === 'shaderlab' ||
      name.includes('ggwaek') || name.includes('factory') || name.includes('hex') || name.includes('necro') ||
      name.includes('maple') || name.includes('game') || name.includes('mfc') || name.includes('talmorim') ||
      topics.includes('unity') || topics.includes('unreal') || topics.includes('game') ||
      desc.includes('unity') || desc.includes('unreal') || desc.includes('gamejam') || desc.includes('게임') || desc.includes('rpg')
    ) {
      return { category: 'game', categoryName: 'Game Dev & Graphics' };
    }

    // 4. Algorithms & Core CS
    if (
      name.includes('backjoon') || name.includes('algorithm') || name.includes('codeforce') || name.includes('oop') ||
      desc.includes('알고리즘') || desc.includes('백준') || desc.includes('코드포스') || desc.includes('객체지향')
    ) {
      return { category: 'algorithm', categoryName: 'Algorithms & Core CS' };
    }

    // 5. Education & Tools
    if (
      name.includes('coala') || name.includes('lecture') || name.includes('study') ||
      desc.includes('lecture') || desc.includes('교재') || desc.includes('교육')
    ) {
      return { category: 'education', categoryName: 'Education & Tools' };
    }

    if (lang === 'c++') return { category: 'algorithm', categoryName: 'Algorithms & Core CS' };
    return { category: 'engine', categoryName: 'Custom Engine & Web' };
  }

  /**
   * 상대적 시간 표시 ("3일 전", "2시간 전" 등)
   */
  formatRelativeTime(dateString) {
    if (!dateString) return '최근';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffDay > 30) {
      return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
    }
    if (diffDay > 0) return `${diffDay}일 전`;
    if (diffHour > 0) return `${diffHour}시간 전`;
    if (diffMin > 0) return `${diffMin}분 전`;
    return '방금 전';
  }

  /**
   * 프로필 정보 실시간 조회
   */
  async fetchUserProfile() {
    try {
      const res = await fetch(`https://api.github.com/users/${this.username}`);
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(this.profileCacheKey, JSON.stringify({ data, timestamp: Date.now() }));
        return data;
      }
    } catch (err) {
      console.warn('[LiveGitHubSync] Profile fetch warning:', err);
    }

    const cached = localStorage.getItem(this.profileCacheKey);
    if (cached) {
      try { return JSON.parse(cached).data; } catch (e) {}
    }
    return {
      login: 'dust9826',
      name: 'Jeonghyeon Kim',
      avatar_url: 'https://avatars.githubusercontent.com/u/68475923?v=4',
      bio: 'Graphics & System Engineer · AI / Computer Vision Researcher',
      public_repos: 23,
      html_url: 'https://github.com/dust9826'
    };
  }

  /**
   * 실시간 저장소 조회 및 Diff(신규/삭제) 분석 파이프라인
   */
  async reconcileRepositories(forceRefresh = false) {
    let apiRepos = null;
    let rateLimitRem = null;

    if (!forceRefresh) {
      const cached = localStorage.getItem(this.cacheKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < this.cacheDuration) {
            apiRepos = parsed.data;
            this.state.isLive = false;
            this.state.source = 'cache';
            this.state.lastSync = new Date(parsed.timestamp);
          }
        } catch (e) {}
      }
    }

    if (!apiRepos) {
      try {
        const response = await fetch(`https://api.github.com/users/${this.username}/repos?per_page=100&sort=pushed`);
        rateLimitRem = response.headers.get('x-ratelimit-remaining');
        this.state.rateLimitRemaining = rateLimitRem;

        if (response.ok) {
          apiRepos = await response.json();
          this.state.isLive = true;
          this.state.isRateLimited = false;
          this.state.source = 'api';
          this.state.lastSync = new Date();
          localStorage.setItem(this.cacheKey, JSON.stringify({
            data: apiRepos,
            timestamp: Date.now()
          }));
        } else {
          console.warn(`[LiveGitHubSync] API responded with ${response.status}. Using fallback.`);
          if (response.status === 403 || (rateLimitRem !== null && Number(rateLimitRem) === 0)) {
            this.state.isRateLimited = true;
          }
          this.state.source = 'offline_fallback';
        }
      } catch (err) {
        console.warn('[LiveGitHubSync] Network error fetching repos:', err);
        this.state.source = 'offline_fallback';
      }
    }

    // Baseline Curation 데이터베이스 로드
    const baselineList = (typeof REPOSITORIES_DATA !== 'undefined' && Array.isArray(REPOSITORIES_DATA))
      ? REPOSITORIES_DATA
      : [];

    const baselineMap = new Map();
    baselineList.forEach(r => baselineMap.set(r.name.toLowerCase(), r));

    const apiMap = new Map();
    if (Array.isArray(apiRepos)) {
      apiRepos.forEach(r => {
        if (r.name !== 'dust9826.github.io') {
          apiMap.set(r.name.toLowerCase(), r);
        }
      });
    }

    const mergedRepos = [];
    const newRepos = [];
    const deletedRepos = [];

    // 1. Live API 리포지토리 검사 (새로 추가된 리포 또는 업데이트된 리포)
    for (const [key, apiRepo] of apiMap.entries()) {
      const curated = baselineMap.get(key);

      if (!curated) {
        // ✨ 기준 데이터에 없는 새로운 리포지토리 발견! (NEW)
        const classification = this.classifyRepo(apiRepo);
        const autoTags = [apiRepo.language, ...(apiRepo.topics || [])].filter(Boolean);

        const newRepoItem = {
          id: apiRepo.name,
          name: apiRepo.name,
          title: apiRepo.name,
          subtitle: apiRepo.description || '최근 깃허브에 새로 추가된 저장소',
          category: classification.category,
          categoryName: classification.categoryName,
          badge: '✨ NEW',
          isNew: true,
          isDeleted: false,
          featured: false,
          period: apiRepo.created_at ? new Date(apiRepo.created_at).getFullYear().toString() : '2026',
          team: '신규 프로젝트',
          language: apiRepo.language || 'Code',
          languageColor: this.getLanguageColor(apiRepo.language || ''),
          tags: autoTags.length ? autoTags : ['New Repo'],
          coverImage: null,
          gradient: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #10b981 100%)',
          icon: 'sparkles',
          stats: {
            stars: apiRepo.stargazers_count || 0,
            forks: apiRepo.forks_count || 0,
            pushedAt: apiRepo.pushed_at || null,
            updatedAt: apiRepo.updated_at || null,
            relativePushed: this.formatRelativeTime(apiRepo.pushed_at)
          },
          githubUrl: apiRepo.html_url || `https://github.com/dust9826/${apiRepo.name}`,
          description: apiRepo.description || '최근 깃허브에서 동기화된 새로운 오픈소스 저장소입니다.',
          details: {
            overview: apiRepo.description || '신규 등록된 저장소입니다.',
            highlights: [
              `최근 커밋 푸시: ${this.formatRelativeTime(apiRepo.pushed_at)}`,
              `기본 브랜치: ${apiRepo.default_branch || 'master'}`,
              `토픽 태그: ${(apiRepo.topics || []).join(', ') || '없음'}`
            ],
            techStack: [apiRepo.language, ...(apiRepo.topics || [])].filter(Boolean),
            challenges: '신규 저장소 감지 엔진에 의해 자동 등록되었습니다.'
          }
        };

        newRepos.push(newRepoItem);
        mergedRepos.push(newRepoItem);
      } else {
        // 기존 큐레이션 저장소 + 실시간 최신 메트릭(스타, 푸시 시각 등) 반영
        const updatedItem = {
          ...curated,
          isNew: false,
          isDeleted: false,
          stats: {
            stars: apiRepo.stargazers_count || curated.stats.stars || 0,
            forks: apiRepo.forks_count || curated.stats.forks || 0,
            pushedAt: apiRepo.pushed_at || null,
            updatedAt: apiRepo.updated_at || null,
            relativePushed: this.formatRelativeTime(apiRepo.pushed_at)
          }
        };
        mergedRepos.push(updatedItem);
      }
    }

    // 2. 기준 데이터에는 있으나 Live API 목록에 없는 리포지토리 검사 (삭제/비공개됨)
    for (const [key, curated] of baselineMap.entries()) {
      if (!apiMap.has(key)) {
        if (this.state.source === 'api') {
          // 실시간 API 연결이 정상인 상황에서 리포가 안 보인다면 삭제/비공개 상태!
          const deletedItem = {
            ...curated,
            isNew: false,
            isDeleted: true,
            badge: '⚠️ 저장소 삭제/비공개됨',
            subtitle: `[기록 보존] ${curated.subtitle}`,
            stats: {
              ...curated.stats,
              relativePushed: '보관됨'
            }
          };
          deletedRepos.push(deletedItem);
          mergedRepos.push(deletedItem);
        } else {
          // API 오프라인 상태일 때는 기존 큐레이션 데이터 정상 유지
          mergedRepos.push({
            ...curated,
            isNew: false,
            isDeleted: false,
            stats: {
              ...curated.stats,
              relativePushed: '동기화 유지'
            }
          });
        }
      }
    }

    this.state.newReposCount = newRepos.length;
    this.state.deletedReposCount = deletedRepos.length;
    this.state.totalCount = mergedRepos.length;

    return {
      allRepos: mergedRepos,
      newRepos,
      deletedRepos,
      state: this.state
    };
  }
}

// Global Export
window.liveGitHubSync = new LiveGitHubSync();
