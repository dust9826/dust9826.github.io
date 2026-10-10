# 🌟 dust9826 Tech Showcase & Portfolio

[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Active-22c55e?style=flat&logo=github)](https://dust9826.github.io/)
[![Author](https://img.shields.io/badge/Author-Jeonghyeon_Kim-6366f1?style=flat)](https://github.com/dust9826)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **공식 웹사이트 바로가기**: [https://dust9826.github.io/](https://dust9826.github.io/)

**dust9826 (김정현)**의 깃허브 전체 리포지토리를 기술 도메인별로 분류하고, 각 프로젝트의 아키텍처, 핵심 구현 내용, 기술적 문제 해결 과정을 소개하는 웹 포트폴리오입니다.

---

## 🎯 주요 기능

1. **기술 도메인별 체계적 분류**
   - 🤖 **AI & Computer Vision**: IPIU 2026 논문, FoundationStereo 거울 기하 복원, MMMU 멀티모달 벤치마크, 객체 분류
   - 🎮 **Game Dev & Graphics**: Unity 6 멀티플레이어(Photon Fusion 2), UE5 1인칭 공장 자동화, WinAPI 타일맵 에디터, 2D 게임잼 액션
   - 💻 **Custom Engine & Web**: 순수 WebGL + TypeScript 자체 구현 3D 복셀 엔진 (외부 라이브러리 Zero)
   - ⚡ **Algorithms & Core CS**: 백준 70+ 고난도 알고리즘(세그먼트 트리, LCA, LIS 등), 알고리즘 템플릿, 객체지향 설계
   - 📚 **Education & Tools**: 원소 합성을 모티브로 한 게이미피케이션 Git/GitHub 실습 교재 (`coala`)

2. **실시간 인터랙티브 필터링 & 검색**
   - 도메인 탭 필터 (전체, AI, 게임, 엔진, 알고리즘, 교육)
   - 실시간 텍스트 검색 (프로젝트명, 설명, 기술 스택, 키워드)
   - 인기 기술 스택 해시태그 원클릭 필터 (Unity, UE5, C++, C#, Python, TypeScript, WebGL 등)
   - 추천순 / 최신순 / 이름순 정렬

3. **프로젝트 심층 분석 팝업 (Detail Modal)**
   - 프로젝트 개요, 개발 기간, 참여 형태 (1인/팀/게임잼)
   - 핵심 구현 내용 및 성과 체크리스트
   - 기술적 난제 및 해결 과정 (Deep Dive)
   - 원클릭 `git clone` 명령어 복사 및 GitHub 저장소 바로가기

4. **사용자 경험 최적화**
   - 다크 모드 (Cyber Glow Slate) & 라이트 모드 지원 (로컬스토리지 저장)
   - 외부 번들러 없이 동작하는 무결점 순수 웹 아키텍처 (GitHub Pages 100% 네이티브 호환)
   - 반응형 디자인 (데스크톱, 태블릿, 모바일 완벽 대응)

---

## 📂 디렉터리 구조

```
dust9826.github.io/
├── index.html          # 메인 쇼케이스 페이지
├── css/
│   └── style.css       # 모던 디자인 시스템, 반응형 레이아웃, 애니메이션
├── js/
│   ├── data.js         # 23개 리포지토리 전체 메타데이터 및 분석 정보
│   └── app.js          # 필터링, 검색, 모달, 클립보드 복사, 테마 제어
├── assets/
│   └── favicon.svg     # 벡터 파비콘
└── README.md
```

---

## 🚀 로컬 실행 방법

별도의 빌드나 의존성 설치 과정 없이 웹 브라우저에서 바로 열거나 간이 웹 서버로 실행할 수 있습니다.

```bash
# 1. 저장소 클론
git clone https://github.com/dust9826/dust9826.github.io.git
cd dust9826.github.io

# 2. 브라우저에서 바로 열거나 로컬 서버 실행
# Python이 있는 경우:
python -m http.server 8000

# Node.js가 있는 경우:
npx serve .
```

브라우저에서 `http://localhost:8000` (또는 지정된 포트)에 접속합니다.