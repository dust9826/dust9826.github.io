/**
 * dust9826 GitHub Showcase - Live API & Auto-Classification Engine
 * Author: Jeonghyeon Kim (@dust9826)
 */

class LiveGitHubSync {
  constructor() {
    this.username = 'dust9826';
    this.cacheKey = 'dust_github_repos_cache_v2';
    this.profileCacheKey = 'dust_github_profile_cache_v2';
    this.cacheDuration = 10 * 60 * 1000; // 10 minutes cache
    this.status = {
      isLive: false,
      lastSync: null,
      rateLimitRemaining: null,
      source: 'initial' // 'api' | 'cache' | 'offline_fallback'
    };
  }

  /**
   * Determine programming language color dot
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
   * Automatic rule-based domain classifier
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
   * Fetch live user profile
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
      console.warn('[LiveGitHubSync] Profile fetch failed, using fallback', err);
    }

    const cached = localStorage.getItem(this.profileCacheKey);
    if (cached) {
      try { return JSON.parse(cached).data; } catch (e) {}
    }
    return {
      login: 'dust9826',
      avatar_url: 'https://avatars.githubusercontent.com/u/68475923?v=4',
      public_repos: 23,
      followers: 1,
      following: 2
    };
  }

  /**
   * Fetch live repositories with graceful fallback & curation merge
   */
  async fetchRepositories(forceRefresh = false) {
    let apiRepos = null;
    let rateLimitRem = null;

    if (!forceRefresh) {
      const cached = localStorage.getItem(this.cacheKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < this.cacheDuration) {
            apiRepos = parsed.data;
            this.status.isLive = false;
            this.status.source = 'cache';
            this.status.lastSync = new Date(parsed.timestamp);
          }
        } catch (e) {}
      }
    }

    if (!apiRepos) {
      try {
        const response = await fetch(`https://api.github.com/users/${this.username}/repos?per_page=100&sort=pushed`);
        rateLimitRem = response.headers.get('x-ratelimit-remaining');
        this.status.rateLimitRemaining = rateLimitRem;

        if (response.ok) {
          apiRepos = await response.json();
          this.status.isLive = true;
          this.status.source = 'api';
          this.status.lastSync = new Date();
          localStorage.setItem(this.cacheKey, JSON.stringify({
            data: apiRepos,
            timestamp: Date.now()
          }));
        } else {
          console.warn(`[LiveGitHubSync] API responded with status ${response.status}. Using curated fallback.`);
          this.status.source = 'offline_fallback';
        }
      } catch (err) {
        console.warn('[LiveGitHubSync] Network error fetching repos:', err);
        this.status.source = 'offline_fallback';
      }
    }

    // Merge API repos with curated database
    return this.mergeWithCurated(apiRepos || []);
  }

  /**
   * Merge live GitHub repos with curated metadata
   */
  mergeWithCurated(apiRepos) {
    const curatedMap = new Map();
    if (typeof REPOSITORIES_DATA !== 'undefined' && Array.isArray(REPOSITORIES_DATA)) {
      REPOSITORIES_DATA.forEach(r => curatedMap.set(r.name.toLowerCase(), r));
    }

    const mergedList = [];
    const seenNames = new Set();

    // 1. Process all live repos from GitHub API
    for (const repo of apiRepos) {
      if (repo.name === 'dust9826.github.io') continue; // Skip the showcase repo itself in cards
      const lowerName = repo.name.toLowerCase();
      seenNames.add(lowerName);

      const curated = curatedMap.get(lowerName);
      const classification = this.classifyRepo(repo);

      // Extract skills / tags
      const autoTags = [
        repo.language,
        ...(repo.topics || [])
      ].filter(Boolean);

      const repoItem = {
        id: repo.name,
        name: repo.name,
        title: curated ? curated.title : repo.name,
        subtitle: curated ? curated.subtitle : (repo.description || 'GitHub Repository'),
        category: curated ? curated.category : classification.category,
        categoryName: curated ? curated.categoryName : classification.categoryName,
        badge: curated ? curated.badge : (repo.fork ? 'Forked' : 'Public'),
        featured: curated ? curated.featured : false,
        period: curated ? curated.period : (repo.updated_at ? new Date(repo.updated_at).getFullYear().toString() : '2026'),
        team: curated ? curated.team : '개인 프로젝트',
        language: repo.language || (curated ? curated.language : 'General'),
        languageColor: this.getLanguageColor(repo.language || (curated ? curated.language : '')),
        tags: curated ? curated.tags : (autoTags.length ? autoTags : ['Open Source']),
        coverImage: curated ? curated.coverImage : null,
        gradient: curated ? curated.gradient : 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
        icon: curated ? curated.icon : 'code',
        stats: {
          stars: repo.stargazers_count || 0,
          forks: repo.forks_count || 0,
          pushedAt: repo.pushed_at || null,
          updatedAt: repo.updated_at || null
        },
        githubUrl: repo.html_url || `https://github.com/dust9826/${repo.name}`,
        description: (curated && curated.description) ? curated.description : (repo.description || '깃허브 오픈소스 저장소입니다.'),
        details: curated ? curated.details : {
          overview: repo.description || '저장소 상세 설명이 등록되지 않았습니다.',
          highlights: [
            `기본 브랜치: ${repo.default_branch || 'master'}`,
            `마지막 커밋 푸시: ${repo.pushed_at ? new Date(repo.pushed_at).toLocaleDateString() : '최근'}`,
            `오픈 이슈: ${repo.open_issues_count || 0}개`
          ],
          techStack: [repo.language, ...(repo.topics || [])].filter(Boolean),
          challenges: null
        }
      };

      mergedList.push(repoItem);
    }

    // 2. Add any curated repos that were not returned by API (e.g. if API failed or filtered)
    if (typeof REPOSITORIES_DATA !== 'undefined' && Array.isArray(REPOSITORIES_DATA)) {
      for (const curated of REPOSITORIES_DATA) {
        if (!seenNames.has(curated.name.toLowerCase())) {
          mergedList.push(curated);
        }
      }
    }

    return mergedList;
  }
}

// Global instance
window.liveGitHubSync = new LiveGitHubSync();
