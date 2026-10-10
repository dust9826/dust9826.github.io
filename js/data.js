/**
 * dust9826 GitHub Showcase - Repository Data
 * Author: Jeonghyeon Kim (@dust9826)
 */

const REPOSITORIES_DATA = [
  // ==========================================
  // 1. AI & COMPUTER VISION
  // ==========================================
  {
    id: "mirror-geometry-foundationstereo",
    name: "mirror-geometry-foundationstereo",
    title: "Find Mirror Geometry Inside FoundationStereo",
    subtitle: "스테레오 파운데이션 모델 Prior의 거울 기하 복원 및 심층 분석",
    category: "ai",
    categoryName: "AI & Computer Vision",
    badge: "IPIU 2026 논문",
    featured: true,
    period: "2025 ~ 2026",
    team: "학술 연구 (1인)",
    language: "Python",
    languageColor: "#3572A5",
    tags: ["Python", "PyTorch", "FoundationStereo", "Stereo Vision", "IPIU 2026", "Computer Vision"],
    coverImage: null,
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
    icon: "sparkles",
    stats: { stars: 0, forks: 0 },
    githubUrl: "https://github.com/dust9826/mirror-geometry-foundationstereo",
    description: "별도의 거울 전용 학습 없이, 대규모 데이터로 사전 학습된 스테레오 Foundation 모델의 Prior에 내재된 거울 기하(Mirror Geometry)를 복원하고 정량 검증한 IPIU 2026 게재 연구.",
    details: {
      overview: "범용 스테레오 매칭 파운데이션 모델(FoundationStereo)이 거울면 앞에서 반사 영역의 기하학적 일관성을 어떻게 인식하는지를 규명한 연구입니다. 무거운 추가 파라미터나 거울 전용 학습 없이, 모델 내부의 잠재 사전 지식(Prior)을 프로빙하여 거울면의 위치와 3차원 기하 구조를 정밀하게 복원했습니다.",
      highlights: [
        "IPIU 2026 학술대회 논문 발표 및 최종 학술 연구 보고서 수록",
        "FoundationStereo의 사전 가중치(Prior)를 활용한 거울면 기하 추출 파이프라인 설계",
        "거울면 시차(Disparity) 특성 및 반사 대칭성에 대한 수치적 정량 분석 (JSON/CSV 보관)",
        "완전한 실험 재현 가이드(REPRODUCE.md) 및 데이터셋 생성 스크립트 구축"
      ],
      techStack: ["Python 3.10", "PyTorch", "FoundationStereo", "CUDA", "NumPy", "LaTeX"],
      challenges: "거울은 일반 표면과 달리 반사된 가상 물체(Virtual Object)의 깊이와 실제 거울면의 물리적 위치가 이중으로 존재하는 광학적 모호성이 발생합니다. 이를 파운데이션 스테레오의 시차 맵 일관성 분석을 통해 거울면의 위치를 성공적으로 역추정했습니다."
    }
  },
  {
    id: "mmdl-colab-baseline",
    name: "mmdl-colab-baseline",
    title: "MMMU L4 Inference & Independent Rescoring",
    subtitle: "멀티모달 벤치마크 900문항 L4 추론 및 체크포인트 재검증 파이프라인",
    category: "ai",
    categoryName: "AI & Computer Vision",
    badge: "멀티모달 AI",
    featured: true,
    period: "2026",
    team: "개인 연구 파이프라인",
    language: "Jupyter Notebook",
    languageColor: "#DA5B0B",
    tags: ["Jupyter Notebook", "Python", "Qwen-VL", "MMMU", "Multimodal", "L4 GPU"],
    coverImage: null,
    gradient: "linear-gradient(135deg, #18181b 0%, #27272a 50%, #ea580c 100%)",
    icon: "cpu",
    stats: { stars: 0, forks: 0 },
    githubUrl: "https://github.com/dust9826/mmdl-colab-baseline",
    description: "대규모 멀티모달 벤치마크 MMMU 900문항에 대해 NVIDIA L4 GPU 기반 Qwen3-VL-4B 추론, 드라이브 체크포인트 재개, 독립 재채점 자동 검증 시스템.",
    details: {
      overview: "MMMU validation 900문항 전체에 대해 개인 L4 환경에서 Qwen3-VL-4B-Instruct 모델을 실행하고, 생성된 총 3,836,776토큰의 결과를 신뢰성 있게 검증·공유하기 위해 구축된 파이프라인 저장소입니다.",
      highlights: [
        "900문항 실행 결과 원본 점수 564/900(62.67%) 달성 및 30개 과목별 매크로 평균 산출",
        "독립 재채점 알고리즘(team-final-answer-v8)을 통해 900문항 전수 일치율 100% 검증",
        "906개 Google Drive 체크포인트 ZIP 파일의 SHA-256 해시 무결성 검증 통과",
        "Colab 런타임 연결 끊김에 대응하는 자동 재개 및 900개 Raw Journal 복원 체계 구현"
      ],
      techStack: ["Python", "Jupyter Notebook", "Qwen3-VL-4B-Instruct", "Google Drive API", "NVIDIA L4"],
      challenges: "대규모 시각-언어 모델 추론 중 긴 컨텍스트(최대 32,768 토큰) 및 런타임 불안정 문제를 해결하기 위해 문항 단위 원자적(Atomic) 체크포인트 저장과 해시 기반 검증 로직을 구현했습니다."
    }
  },
  {
    id: "trash_classification",
    name: "trash_classification",
    title: "Trash Image Classification",
    subtitle: "딥러닝 기반 생활 폐기물 객체 분류",
    category: "ai",
    categoryName: "AI & Computer Vision",
    badge: "Computer Vision",
    featured: false,
    period: "2021",
    team: "개인 프로젝트",
    language: "Python",
    languageColor: "#3572A5",
    tags: ["Python", "PyTorch", "CNN", "Image Classification", "Computer Vision"],
    coverImage: null,
    gradient: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #059669 100%)",
    icon: "layers",
    stats: { stars: 0, forks: 0 },
    githubUrl: "https://github.com/dust9826/trash_classification",
    description: "생활 폐기물 분리수거 자동화를 위한 합성곱 신경망(CNN) 기반 이미지 객체 분류 프로젝트.",
    details: {
      overview: "다양한 형태와 재질을 가진 생활 폐기물 이미지를 데이터셋으로 전처리하고, 심층 신경망을 통해 재활용 종류별로 정확하게 분류하는 딥러닝 비전 프로젝트입니다.",
      highlights: [
        "다중 클래스 이미지 데이터 증강(Augmentation) 파이프라인 구현",
        "전이 학습(Transfer Learning)을 활용한 폐기물 분류 모델 훈련",
        "Confusion Matrix 기반 성능 지표 및 오분류 원인 분석"
      ],
      techStack: ["Python", "PyTorch", "OpenCV", "Matplotlib"],
      challenges: "빛 반사, 찌그러짐 등 변형이 심한 실생활 쓰레기 이미지의 특징 추출을 위한 전처리 기법 적용."
    }
  },

  // ==========================================
  // 2. GAME DEV & GRAPHICS
  // ==========================================
  {
    id: "GGwaekGGwaek",
    name: "GGwaekGGwaek",
    title: "꽥꽥 (GGwaekGGwaek)",
    subtitle: "Unity 6 + Photon Fusion 2 협동 제설 및 배송 멀티플레이어",
    category: "game",
    categoryName: "Game Dev & Graphics",
    badge: "Unity 6 · 멀티플레이",
    featured: true,
    period: "2024 ~ 2025",
    team: "팀 포트폴리오",
    language: "C#",
    languageColor: "#178600",
    tags: ["Unity 6", "C#", "Photon Fusion 2", "URP 17.6", "Multiplayer", "Shaders"],
    coverImage: "https://raw.githubusercontent.com/dust9826/GGwaekGGwaek/master/portfolio/snow-field-trails.png",
    gradient: "linear-gradient(135deg, #0c4a6e 0%, #0284c7 50%, #38bdf8 100%)",
    icon: "gamepad",
    stats: { stars: 0, forks: 0 },
    githubUrl: "https://github.com/dust9826/GGwaekGGwaek",
    description: "눈 덮인 마을에서 펭귄들이 협동하여 눈을 밀고 길을 만들어 선물을 배송하는 실시간 멀티플레이어 협동 게임.",
    details: {
      overview: "단순한 눈 비주얼 연출을 넘어, 플레이어의 상호작용이 게임 지형 상태와 물리 경로에 직접 실시간 반영되는 협동 메커니즘을 핵심으로 개발된 Unity 6 기반 포트폴리오 프로젝트입니다.",
      highlights: [
        "플레이어 이동 및 넉백에 따른 동적 눈 변형(Snow Deforming) 및 지형 트레일 시스템",
        "Photon Fusion 2 Host Mode 기반 저지연 네트워크 상태 동기화 및 틱 기반 시뮬레이션",
        "URP 17.6 커스텀 셰이더를 활용한 눈 재질 및 발자국 블렌딩 표현",
        "눈 밀기, 눈덩이 굴리기, 운반 및 선물 배송 협동 퀘스트 루프"
      ],
      techStack: ["Unity 6000.6", "C#", "URP 17.6", "Photon Fusion 2 Host Mode", "HLSL/ShaderGraph"],
      challenges: "실시간 멀티플레이 환경에서 수많은 플레이어의 눈 변형 상태와 물리 오브젝트 상호작용을 호스트-클라이언트 간 대역폭 낭비 없이 안정적으로 동기화하는 넷코드 아키텍처 설계."
    }
  },
  {
    id: "EscapeFactory",
    name: "EscapeFactory",
    title: "EscapeFactory",
    subtitle: "UE5 1인칭 공장 자동화 및 액터-아이템 고도 추상화 아키텍처",
    category: "game",
    categoryName: "Game Dev & Graphics",
    badge: "Unreal Engine 5",
    featured: true,
    period: "2026.02",
    team: "개인 프로젝트 (1인)",
    language: "C++",
    languageColor: "#f34b7d",
    tags: ["Unreal Engine 5", "C++", "Blueprint", "Enhanced Input", "Factory Automation", "Game Architecture"],
    coverImage: "https://raw.githubusercontent.com/dust9826/EscapeFactory/master/docs/readme-cover.jpg",
    gradient: "linear-gradient(135deg, #1c1917 0%, #44403c 50%, #78716c 100%)",
    icon: "box",
    stats: { stars: 0, forks: 0 },
    githubUrl: "https://github.com/dust9826/EscapeFactory",
    description: "Unreal Engine 5에서 C++과 블루프린트를 융합해 제작한 1인칭 공장 자동화 프로젝트. 모든 액터를 아이템으로 추상화한 유연한 시스템 설계.",
    details: {
      overview: "공장 자동화 시뮬레이션의 복잡한 생산 체인과 컨테이너 관리를 위해, 월드의 모든 사물과 기계를 '아이템' 개념으로 통합 추상화하는 객체지향 설계를 검증한 프로젝트입니다.",
      highlights: [
        "아이템 추상화 설계 — 소품, 기계, 플레이어 보유물을 단일 타입으로 일원화(EFItemDataAsset)",
        "공유 인벤토리 시스템 — 플레이어, 기계, 컨테이너가 동일한 EFInventoryComponent를 공유",
        "슬롯 단위 드래그 앤 드롭(EFInventoryDragDropOp)으로 직관적인 액터 간 아이템 이동",
        "UE5 Enhanced Input System을 활용한 확장성 높은 1인칭 조작계 구축"
      ],
      techStack: ["Unreal Engine 5", "C++", "Blueprint", "Enhanced Input", "Slate/UMG"],
      challenges: "새로운 기계나 아이템 타입이 추가될 때 C++ 베이스 코드를 수정하지 않고도 데이터 에셋과 블루프린트 연출만으로 손쉽게 확장 가능한 파이프라인 구축."
    }
  },
  {
    id: "ThirtySecondLeft",
    name: "ThirtySecondLeft (Pinata)",
    title: "ThirtySecondLeft (Pinata)",
    subtitle: "2025 Gammaru 게임잼 2D 핵앤슬래시 플랫포머 액션",
    category: "game",
    categoryName: "Game Dev & Graphics",
    badge: "Game Jam 출품작",
    featured: true,
    period: "2025.12 (게임잼)",
    team: "2인 팀 프로젝트",
    language: "C#",
    languageColor: "#178600",
    tags: ["Unity", "C#", "URP 2D Light", "Cinemachine", "Game Jam", "2D Action"],
    coverImage: "https://raw.githubusercontent.com/dust9826/ThirtySecondLeft/master/docs/readme-cover.jpg",
    gradient: "linear-gradient(135deg, #450a0a 0%, #7f1d1d 50%, #dc2626 100%)",
    icon: "zap",
    stats: { stars: 0, forks: 0 },
    githubUrl: "https://github.com/dust9826/ThirtySecondLeft",
    description: "제한 시간 안에 강력한 발차기 넉백과 레이캐스트 고어 이펙트로 적을 쓸어버리는 극한 타격감의 2D 액션 플랫포머.",
    details: {
      overview: "2025 Gammaru 게임잼(2025.12.19 ~ 12.21)에 2인 팀으로 출품한 프로젝트로, 묵직한 타격감과 시각적 피드백을 극대화한 물리 기반 액션 게임입니다.",
      highlights: [
        "물리 기반 킥 액션 — 적을 벽과 바닥에 튕겨내는 강력한 넉백(PlayerKick, Knockbackable)",
        "레이캐스트 혈흔 시스템 — 타격 각도에 따라 벽과 바닥에 피가 튀고 묻는 다이내믹 데칼",
        "적 파괴 시 파편(Gore) 비산 및 시네머신 카메라 쉐이크, 역동적 잔상(Ghost Trail) 연출",
        "URP 2D Light와 포스트 프로세싱을 결합한 스타일리시한 비주얼"
      ],
      techStack: ["Unity", "C#", "URP 2D Renderer", "Cinemachine", "2D Physics"],
      challenges: "48시간이라는 극한의 게임잼 일정 속에서 액션의 손맛과 피드백(역경직, 쉐이크, 잔상)을 프레임 단위로 미세 조율하여 완성도 높은 플레이 경험 달성."
    }
  },
  {
    id: "MapleRush",
    name: "MapleRush",
    title: "MapleRush",
    subtitle: "넥슨 메이플스토리 월드(MSW) 4인 로그라이크 액션",
    category: "game",
    categoryName: "Game Dev & Graphics",
    badge: "넥슨 해커톤",
    featured: true,
    period: "2026.06 ~ 2026.08",
    team: "4인 팀 프로젝트",
    language: "JavaScript",
    languageColor: "#f1e05a",
    tags: ["MapleStory Worlds", "mLua", "JavaScript", "Roguelike", "Hackathon"],
    coverImage: "https://raw.githubusercontent.com/dust9826/MapleRush/master/docs/readme-cover.jpg",
    gradient: "linear-gradient(135deg, #431407 0%, #7c2d12 50%, #d97706 100%)",
    icon: "sword",
    stats: { stars: 0, forks: 0 },
    githubUrl: "https://github.com/dust9826/MapleRush",
    description: "넥슨 메이플스토리 월드(MSW) 플랫폼에서 mLua로 개발한 4인 팀 로그라이크 액션 게임. 노드 런 진행과 텔레그래프 패링 전투 구현.",
    details: {
      overview: "메이플 해커톤 프로젝트로 시작해 완성도 높은 로그라이크 액션 게임으로 발전시킨 작품입니다. 슬레이 더 스파이어 스타일의 노드 선택 맵 진행과 세밀한 패링 액션을 제공합니다.",
      highlights: [
        "절차적 노드 런 진행 — 일반, 엘리트, 이벤트, 보스전 및 무한 엔드리스 모드",
        "정교한 전투 시스템 — 공격 예고(텔레그래프) → 판정 유예 → 타이밍 패링 메커니즘",
        "대시 회피, 피격 슬로우모션 연출, 실시간 콤보 HUD 및 히트 피드백",
        "넥슨 MSW 플랫폼의 mLua 스크립팅과 클라이언트-서버 동기화 구조 설계"
      ],
      techStack: ["MapleStory Worlds", "mLua", "JavaScript", "Git Workflow"],
      challenges: "MSW 플랫폼의 제한된 환경 내에서 모바일/PC 크로스 입력 처리 및 액션 판정의 반응성을 실시간으로 보장하는 프레임워크 구현."
    }
  },
  {
    id: "MFCMapEditor",
    name: "MFCMapEditor",
    title: "Win32 / MFC 2D TileMap Editor",
    subtitle: "GDI 더블 버퍼링과 Dirty-Flag 기반 3-레이어 타일맵 에디터",
    category: "game",
    categoryName: "Game Dev & Graphics",
    badge: "C++ · WinAPI",
    featured: true,
    period: "2022.10 ~ 2022.11",
    team: "개인 프로젝트 (1인)",
    language: "C++",
    languageColor: "#f34b7d",
    tags: ["C++", "MFC", "WinAPI", "GDI", "Tile Editor", "Double Buffering"],
    coverImage: "https://github.com/user-attachments/assets/8dc2805f-aec1-4138-af49-fb284c39ac5c",
    gradient: "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)",
    icon: "layout",
    stats: { stars: 0, forks: 0 },
    githubUrl: "https://github.com/dust9826/MFCMapEditor",
    description: "외부 게임 엔진 없이 Win32/MFC와 순수 GDI로 직접 구현한 고성능 2D 타일맵 에디터. 화면 깜빡임 제거 및 커스텀 직렬화 구현.",
    details: {
      overview: "저수준 Windows API 프로그래밍 역량과 그래픽스 렌더링 파이프라인의 기초를 다지기 위해, Win32/MFC 환경에서 바닥부터 만든 타일맵 편집 툴입니다.",
      highlights: [
        "GDI 더블 버퍼링 + Dirty-Flag 렌더링으로 화면 깜빡임 및 CPU 부하 극적 감소",
        "배경(BG), 벽(WALL), 오브젝트(OBJ)의 3-레이어 구조 타일맵 설계",
        "단 한 번의 TransparentBlt 컬러키(RGB 255,0,255) 합성으로 고속 화면 출력",
        "자체 텍스트 포맷 기반 타일맵 데이터 저장/불러오기(Serialization) 구현"
      ],
      techStack: ["C++", "MFC", "Win32 API", "GDI Graphics"],
      challenges: "타일맵 전체를 매 프레임 다시 그릴 때 발생하는 GDI 속도 저하를 해결하기 위해 변경된 셀만 감지하여 메모리 DC를 업데이트하는 더티 플래그 패턴 적용."
    }
  },
  {
    id: "TALMORIM",
    name: "TALMORIM",
    title: "TALMORIM - Dungeon Crawler RPG",
    subtitle: "Unity HDRP & ShaderGraph 기반 탑뷰 던전 크롤링",
    category: "game",
    categoryName: "Game Dev & Graphics",
    badge: "Unity HDRP",
    featured: false,
    period: "2020.05",
    team: "2인 팀 프로젝트",
    language: "ShaderLab",
    languageColor: "#222c37",
    tags: ["Unity", "C#", "HDRP", "ShaderGraph", "ShaderLab", "VFX"],
    coverImage: "https://github.com/user-attachments/assets/51a43995-ba20-475e-8b7a-8b9343a2307d",
    gradient: "linear-gradient(135deg, #2e1065 0%, #3b0764 50%, #581c87 100%)",
    icon: "film",
    stats: { stars: 0, forks: 0 },
    githubUrl: "https://github.com/dust9826/TALMORIM",
    description: "고화질 렌더 파이프라인(HDRP)과 ShaderGraph를 도입하여 던전 입장 연출, 보스전 및 전투 특수 셰이더를 자체 제작한 탑뷰 RPG.",
    details: {
      overview: "시각적 연출과 셰이더 프로그래밍 역량을 집중적으로 발휘한 2인 협업 탑뷰 던전 크롤러 프로젝트입니다.",
      highlights: [
        "Unity HDRP 환경에서 고품질 조명 및 포스트 프로세싱 세팅 구축",
        "ShaderGraph 및 ShaderLab을 활용한 던전 진입 포탈 연출 및 피격 셰이더",
        "보스전 페이즈별 특수 시각 효과 및 탑뷰 카메라 동적 워핑"
      ],
      techStack: ["Unity", "C#", "HDRP", "ShaderGraph", "ShaderLab"],
      challenges: "HDRP의 무거운 렌더링 비용을 최적화하면서 독창적인 판타지 던전 분위기를 연출하기 위한 커스텀 라이팅 및 셰이더 튜닝."
    }
  },
  {
    id: "unity-PerfectHEX",
    name: "unity-PerfectHEX",
    title: "unity-PerfectHEX",
    subtitle: "육각 타일 기반 턴제 전략 RPG 및 오브젝트 상호작용",
    category: "game",
    categoryName: "Game Dev & Graphics",
    badge: "턴제 전략 RPG",
    featured: false,
    period: "2021.12 ~ 2022.02",
    team: "개인 프로젝트 (1인)",
    language: "C#",
    languageColor: "#178600",
    tags: ["Unity", "C#", "Hex Grid", "Turn-Based RPG", "Pathfinding"],
    coverImage: "https://raw.githubusercontent.com/dust9826/unity-PerfectHEX/master/docs/readme-cover.jpg",
    gradient: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
    icon: "hexagon",
    stats: { stars: 0, forks: 0 },
    githubUrl: "https://github.com/dust9826/unity-PerfectHEX",
    description: "육각 그리드(Hexagonal Grid) 좌표계 위에서 월드의 모든 오브젝트와 상호작용할 수 있도록 설계된 탑뷰 턴제 전략 RPG.",
    details: {
      overview: "육각 타일 좌표계의 수학적 원리를 직접 구현하고, 맵 상의 오브젝트들과 유닛의 반응을 유연하게 연결한 턴제 전략 시스템입니다.",
      highlights: [
        "큐브 좌표계 및 축 좌표계 기반 육각 타일맵 수학 및 A* 길찾기 알고리즘",
        "필드 오브젝트(엄폐물, 함정, 파괴 가능 벽)와의 턴 단위 상호작용",
        "유닛 이동 범위 및 스킬 사거리 실시간 타일 하이라이팅"
      ],
      techStack: ["Unity", "C#", "Hex Grid System", "A* Algorithm"],
      challenges: "사각형 그리드와 달리 6개 인접 방향을 갖는 육각 그리드의 거리 계산 및 시야 차단(Line of Sight) 판정 로직 구현."
    }
  },
  {
    id: "NecroDancerCopyGame",
    name: "NecroDancerCopyGame",
    title: "Crypt of the NecroDancer 모작",
    subtitle: "Wav 음원 비트 분석 및 동시 입력 콤보 판정 엔진",
    category: "game",
    categoryName: "Game Dev & Graphics",
    badge: "리듬 액션",
    featured: false,
    period: "2019.06 ~ 2019.07",
    team: "개인 프로젝트 (1인)",
    language: "C#",
    languageColor: "#178600",
    tags: ["Unity", "C#", "Rhythm Sync", "Audio Analysis", "Reverse Engineering"],
    coverImage: "https://github.com/user-attachments/assets/a3f61709-fde5-40d8-aca4-69d784a0b3f7",
    gradient: "linear-gradient(135deg, #3730a3 0%, #4338ca 50%, #6366f1 100%)",
    icon: "music",
    stats: { stars: 0, forks: 0 },
    githubUrl: "https://github.com/dust9826/NecroDancerCopyGame",
    description: "유명 리듬 던전 게임 Crypt of the NecroDancer의 코어 메커니즘을 역공학적으로 분석하여 비트 동기화와 콤보 입력을 자체 구현한 프로젝트.",
    details: {
      overview: "음악의 박자에 맞춰 이동과 공격을 수행하는 리듬 게임의 핵심 아키텍처를 wav 데이터 분석부터 입력 오차 판정까지 구현했습니다.",
      highlights: [
        "BeatController & TimingControl — wav 오디오 파형 분석을 통한 비트 큐 생성 및 판정",
        "방향키 동시 입력을 유연하게 해석하는 콤보 시스템(InputKey, DirCode)",
        "박자에 맞춰 반응하는 몬스터 AI 및 타일맵 비주얼 비트 스폰 시스템"
      ],
      techStack: ["Unity", "C#", "Audio Wav Processing"],
      challenges: "오디오 출력 레이턴시와 프레임 업데이트 레이트 사이의 시차를 보정하여 일관된 비트 판정 타이밍을 유지하는 타이머 설계."
    }
  },
  {
    id: "unity-TacticsRPG",
    name: "unity-TacticsRPG",
    title: "Unity Tactics RPG Example",
    subtitle: "격자 기반 전술 RPG 코어 시스템 프로토타입",
    category: "game",
    categoryName: "Game Dev & Graphics",
    badge: "전술 RPG",
    featured: false,
    period: "2021",
    team: "개인 프로젝트",
    language: "C#",
    languageColor: "#178600",
    tags: ["Unity", "C#", "Tactics RPG", "Grid Battle"],
    coverImage: null,
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #3b82f6 100%)",
    icon: "grid",
    stats: { stars: 0, forks: 0 },
    githubUrl: "https://github.com/dust9826/unity-TacticsRPG",
    description: "전략 시뮬레이션 RPG(SRPG)의 타일 이동 범위 계산, 턴 제어 및 전투 액션 시스템 예제 프로젝트.",
    details: {
      overview: "고전 명작 SRPG의 턴 순서 결정(속도 기반), 지형 고저차 이동 패널티, 사거리 계산 로직을 모듈화하여 구현한 예제입니다.",
      highlights: [
        "유닛 속도 스탯 기반 턴 타임라인 큐 관리",
        "BFS 기반 이동 가능 타일 탐색 및 지형 비용 반영",
        "공격 및 스킬 범위 선택 인터페이스"
      ],
      techStack: ["Unity", "C#", "Data Structures"],
      challenges: "전술 맵에서 복잡한 조건(아군 통과 가능, 적군 통과 불가)을 고려한 이동 범위 탐색 최적화."
    }
  },

  // ==========================================
  // 3. CUSTOM ENGINE & WEB GRAPHICS
  // ==========================================
  {
    id: "WebGameEngineWithTs",
    name: "WebGameEngineWithTs",
    title: "WebGameEngineWithTs (Pure 3D Voxel Engine)",
    subtitle: "외부 라이브러리 없이 순수 WebGL & TS로 바닥부터 구현한 3D 엔진",
    category: "engine",
    categoryName: "Custom Engine & Web",
    badge: "자체 구현 3D 엔진",
    featured: true,
    period: "2023.10 ~ 2024.03",
    team: "군 복무 중 독학 구현 (1인)",
    language: "TypeScript",
    languageColor: "#3178c6",
    tags: ["TypeScript", "WebGL", "Node.js", "Express", "Voxel Engine", "Math Library", "Zero Dependencies"],
    coverImage: "https://raw.githubusercontent.com/dust9826/WebGameEngineWithTs/master/docs/readme-cover.png",
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
    icon: "cube",
    stats: { stars: 0, forks: 0 },
    githubUrl: "https://github.com/dust9826/WebGameEngineWithTs",
    description: "Three.js 등 외부 렌더링/수학 라이브러리 일체 없이 WebGL과 TypeScript만으로 수학 라이브러리부터 복셀 렌더링까지 직접 구현한 3D 웹 게임 엔진.",
    details: {
      overview: "군 복무 중 외부 인터넷이 차단된 환경에서 WebGL 공식 명세를 인쇄해 들고 들어가 선형대수학(행렬/벡터/사원수) 라이브러리부터 셰이더, 버퍼 관리, 카메라 시스템을 손수 코딩했습니다. 엔진의 완성도를 검증하기 위해 청크 단위 복셀 월드(마인크래프트 유사 게임)를 올려 렌더링했습니다.",
      highlights: [
        "완전한 자체 3D 선형대수학 라이브러리 구현 (Mat4, Vec3, Vec4, Quat, Transform)",
        "순수 WebGL 버퍼(VBO, IBO, VAO) 파이프라인 및 GLSL 셰이더 컴파일러 래퍼",
        "청크(Chunk) 기반 복셀 월드 메시 생성 및 은면 제거(Occlusion Culling) 최적화",
        "FPS 자유 시점 카메라, 키보드/마우스 입력 관리, Node.js 정적 서버 구성"
      ],
      techStack: ["TypeScript", "Pure WebGL 1.0/2.0", "GLSL Shaders", "Node.js / Express"],
      challenges: "외부 라이브러리의 도움 없이 투영 행렬(Perspective), 뷰 행렬(LookAt), 카메라 오일러각 회전을 수학 공식으로 유도하고 부동소수점 오차를 제어하며 복셀 메시를 실시간 생성."
    }
  },
  {
    id: "WebGameEngine",
    name: "WebGameEngine",
    title: "WebGameEngine (Core Prototype)",
    subtitle: "웹 캔버스 기반 2D 게임 엔진 코어 프레임워크",
    category: "engine",
    categoryName: "Custom Engine & Web",
    badge: "게임 엔진 코어",
    featured: false,
    period: "2023",
    team: "개인 프로젝트 (1인)",
    language: "JavaScript",
    languageColor: "#f1e05a",
    tags: ["JavaScript", "HTML5 Canvas", "Game Engine", "Architecture"],
    coverImage: null,
    gradient: "linear-gradient(135deg, #78350f 0%, #b45309 50%, #f59e0b 100%)",
    icon: "code",
    stats: { stars: 0, forks: 0 },
    githubUrl: "https://github.com/dust9826/WebGameEngine",
    description: "브라우저 Canvas API를 기반으로 KeyManager, TimeManager, Scene 매니저 등 게임 루프 코어를 구축한 프로토타입.",
    details: {
      overview: "TypeScript WebGL 엔진 개발의 전초 단계로, 웹 브라우저의 렌더링 루프(requestAnimationFrame)와 이벤트 루프를 체계적으로 제어하기 위해 만든 경량 게임 엔진 코어입니다.",
      highlights: [
        "델타 타임(Delta Time) 기반 정확한 프레임 제어 및 FPS 고정 로직 (TimeManager)",
        "키 입력 상태(KeyDown, KeyUp, KeyPress) 비동기 추적 (KeyManager)",
        "씬 전환 및 오브젝트 라이프사이클 관리 (Awake, Start, Update, Render)"
      ],
      techStack: ["JavaScript (ES6)", "HTML5 Canvas", "OOP"],
      challenges: "브라우저 비동기 입력 이벤트와 렌더 루프 간의 타이밍 불일치 문제 해결."
    }
  },
  {
    id: "BTMeta-webgl",
    name: "BTMeta-webgl",
    title: "BTMeta WebGL Interactive Showcase",
    subtitle: "WebGL 빌드 퍼블리싱 및 브라우저 호스팅 파이프라인",
    category: "engine",
    categoryName: "Custom Engine & Web",
    badge: "WebGL 호스팅",
    featured: false,
    period: "2022",
    team: "개인 프로젝트",
    language: "JavaScript",
    languageColor: "#f1e05a",
    tags: ["JavaScript", "WebGL", "Unity WebGL", "HTML5", "CSS3"],
    coverImage: null,
    gradient: "linear-gradient(135deg, #111827 0%, #1f2937 50%, #374151 100%)",
    icon: "globe",
    stats: { stars: 0, forks: 0 },
    githubUrl: "https://github.com/dust9826/BTMeta-webgl",
    description: "3D 메타버스/인터랙티브 WebGL 빌드 파일을 웹 브라우저에서 안정적으로 로드하고 제어하기 위한 퍼블리시 테스트베드.",
    details: {
      overview: "대용량 WebGL 바이너리 에셋의 브라우저 로딩 속도 최적화, 로더 스크립트 커스터마이징, 반응형 뷰포트 레이아웃을 구축했습니다.",
      highlights: [
        "커스텀 MyLoader.js를 통한 로딩 프로그레스바 및 에셋 비동기 캐싱",
        "다양한 해상도와 모바일 브라우저 뷰포트 자동 대응 CSS 템플릿",
        "WebGL 메모리 누수 방지 및 인스턴스 생명주기 관리"
      ],
      techStack: ["JavaScript", "WebGL", "HTML5", "CSS3"],
      challenges: "초기 다운로드 용량이 큰 WebGL 빌드의 로딩 지연을 개선하기 위한 스트리밍 에셋 구조화."
    }
  },
  {
    id: "GGART-webgl",
    name: "GGART-webgl",
    title: "GGART WebGL Interactive Viewer",
    subtitle: "3D 인터랙티브 아트 WebGL 뷰어",
    category: "engine",
    categoryName: "Custom Engine & Web",
    badge: "WebGL 뷰어",
    featured: false,
    period: "2022",
    team: "개인 프로젝트",
    language: "JavaScript",
    languageColor: "#f1e05a",
    tags: ["JavaScript", "WebGL", "Interactive 3D", "Web Viewer"],
    coverImage: null,
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
    icon: "monitor",
    stats: { stars: 0, forks: 0 },
    githubUrl: "https://github.com/dust9826/GGART-webgl",
    description: "인터랙티브 3D 그래픽스 빌드를 웹상에서 감상할 수 있도록 최적화된 웹GL 호스팅 환경.",
    details: {
      overview: "브라우저 호환성을 유지하면서 3D 그래픽을 효율적으로 서빙하기 위한 템플릿 및 인터페이스 연동 프로젝트입니다.",
      highlights: [
        "모던 반응형 웹 UI와 WebGL 캔버스 조화로운 레이아웃 설계",
        "웹과 3D 캔버스 간의 상호작용 통신 인터페이스 연동"
      ],
      techStack: ["JavaScript", "WebGL", "CSS"],
      challenges: "다양한 브라우저 GPU 가속 환경에서의 일관된 렌더링 품질 유지."
    }
  },

  // ==========================================
  // 4. ALGORITHMS & CORE CS
  // ==========================================
  {
    id: "backjoon",
    name: "backjoon",
    title: "Baekjoon Problem Solving Archive",
    subtitle: "70+ 고난도 알고리즘 문제 해결 및 자료구조 구현",
    category: "algorithm",
    categoryName: "Algorithms & Core CS",
    badge: "PS · 문제해결",
    featured: true,
    period: "2020 ~ 현재",
    team: "개인 PS",
    language: "C++",
    languageColor: "#f34b7d",
    tags: ["C++", "Baekjoon", "Segment Tree", "LCA", "Dijkstra", "Union-Find", "Data Structures"],
    coverImage: null,
    gradient: "linear-gradient(135deg, #042f2e 0%, #115e59 50%, #0d9488 100%)",
    icon: "terminal",
    stats: { stars: 0, forks: 0 },
    githubUrl: "https://github.com/dust9826/backjoon",
    description: "백준 온라인 저지에서 해결한 70개 이상의 C++ 고난도 알고리즘 풀이. 세그먼트 트리, 최저 공통 조상(LCA), 다익스트라, LIS 등.",
    details: {
      overview: "자료구조와 시간·공간 복잡도의 한계를 돌파하기 위해 작성된 백준 온라인 저지 알고리즘 솔루션 모음집입니다. 플래티넘 및 골드 티어 고난도 문제의 최적화 코드를 포함합니다.",
      highlights: [
        "구간 쿼리 최적화: 세그먼트 트리(Segment Tree), 느리게 갱신되는 세그먼트 트리(Lazy Propagation)",
        "트리 알고리즘: 희소 배열(Sparse Table)을 활용한 O(log N) 최저 공통 조상(LCA, 11438번 등)",
        "그래프 알고리즘: 우선순위 큐 다익스트라(1753번), 벨만-포드, 플로이드-워셜, 위상 정렬(1005번 ACM Craft)",
        "동적 계획법: 이분 탐색을 결합한 O(N log N) 가장 긴 증가하는 부분 수열(LIS, 12015번)"
      ],
      techStack: ["C++17 / C++20", "STL", "Data Structures", "Algorithm Optimization"],
      challenges: "입출력 속도 향상(Fast I/O)과 극한의 메모리 제한 환경에서의 재귀 깊이 제어 및 비트마스킹 기법 적용."
    }
  },
  {
    id: "algorithm",
    name: "algorithm",
    title: "Core Algorithm Templates (C++)",
    subtitle: "자주 사용되는 핵심 알고리즘 및 고급 자료구조 템플릿",
    category: "algorithm",
    categoryName: "Algorithms & Core CS",
    badge: "알고리즘 템플릿",
    featured: false,
    period: "2020",
    team: "개인 아카이브",
    language: "C++",
    languageColor: "#f34b7d",
    tags: ["C++", "Algorithm", "Templates", "Segment Tree", "Union-Find"],
    coverImage: null,
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4f46e5 100%)",
    icon: "code",
    stats: { stars: 0, forks: 0 },
    githubUrl: "https://github.com/dust9826/algorithm",
    description: "유니온 파인드(Disjoint Set), 세그먼트 트리, 다익스트라 최단 경로, LIS 등 핵심 알고리즘 템플릿 라이브러리.",
    details: {
      overview: "경진 프로그래밍이나 시스템 코딩 시 빠르게 활용할 수 있도록 재사용 가능한 형태로 정리한 표준 알고리즘 구현체입니다.",
      highlights: [
        "경로 압축(Path Compression) 및 Rank 기반 유니온 파인드 구현 (1.Union_Find.cpp)",
        "점 갱신 및 구간 합/최솟값 쿼리 세그먼트 트리 (2.Segment_Tree.cpp)",
        "인접 리스트와 힙을 활용한 다익스트라 최단거리 (3.Dijkstra.cpp)",
        "세그먼트 트리를 활용한 LIS 계산 (LIS_Segment.cpp)"
      ],
      techStack: ["C++", "Templates", "Standard Template Library (STL)"],
      challenges: "어떤 문제에서도 복사하여 바로 적용할 수 있도록 클래스 캡슐화 및 예외 처리 반영."
    }
  },
  {
    id: "codeforce",
    name: "codeforce",
    title: "Codeforces Contest Solutions",
    subtitle: "코드포스 라운드 문제 해결 코드 아카이브",
    category: "algorithm",
    categoryName: "Algorithms & Core CS",
    badge: "코드포스",
    featured: false,
    period: "2020",
    team: "개인 PS",
    language: "C++",
    languageColor: "#f34b7d",
    tags: ["C++", "Codeforces", "Competitive Programming", "Math"],
    coverImage: null,
    gradient: "linear-gradient(135deg, #581c87 0%, #6b21a8 50%, #9333ea 100%)",
    icon: "award",
    stats: { stars: 0, forks: 0 },
    githubUrl: "https://github.com/dust9826/codeforce",
    description: "글로벌 프로그래밍 대회 플랫폼 Codeforces 라운드 문제 풀이 및 그리디/수학 문제 해결 코드.",
    details: {
      overview: "제한 시간 내에 창의적인 문제 접근법과 정밀한 예외 처리가 요구되는 코드포스 공식 라운드 출제 문제들의 C++ 솔루션 모음입니다.",
      highlights: [
        "정수론, 조합론 및 모듈러 연산 기반 수학적 문제 해결",
        "투 포인터, 그리디 알고리즘 및 불변량(Invariant) 증명 기반 접근",
        "빠른 런타임 성능을 위한 C++ 비트 연산 및 배열 기반 구현"
      ],
      techStack: ["C++", "Competitive Programming"],
      challenges: "대회 중 1초 미만의 타임 아웃 조건을 통과하기 위한 최적 시간 복잡도($O(N)$ ~ $O(N \log N)$) 도출."
    }
  },
  {
    id: "SSU_OOP_Project",
    name: "SSU_OOP_Project",
    title: "Soongsil Univ OOP Project",
    subtitle: "숭실대학교 객체지향 프로그래밍 프로젝트",
    category: "algorithm",
    categoryName: "Algorithms & Core CS",
    badge: "객체지향 설계",
    featured: false,
    period: "2021",
    team: "대학 과제 (1인)",
    language: "Java",
    languageColor: "#b07219",
    tags: ["Java", "OOP", "Design Patterns", "Inheritance", "Polymorphism"],
    coverImage: null,
    gradient: "linear-gradient(135deg, #3b0764 0%, #581c87 50%, #7e22ce 100%)",
    icon: "coffee",
    stats: { stars: 0, forks: 0 },
    githubUrl: "https://github.com/dust9826/SSU_OOP_Project",
    description: "숭실대학교 객체지향 프로그래밍 과제. 클래스 계층 구조, 캡슐화, 다형성 및 디자인 패턴을 반영한 자바 프로젝트.",
    details: {
      overview: "객체지향 프로그래밍의 4대 원칙(캡슐화, 상속, 추상화, 다형성)과 SOLID 원칙을 충실히 반영하여 구현한 시스템입니다.",
      highlights: [
        "역할과 책임을 분리한 클래스 계층 설계",
        "인터페이스를 통한 모듈 간 결합도 완화 및 확장성 확보",
        "자바 표준 라이브러리 및 컬렉션 프레임워크 활용"
      ],
      techStack: ["Java", "OOP", "IntelliJ IDEA"],
      challenges: "코드 재사용성과 유지보수성을 극대화하기 위한 객체 간 메시지 패싱 설계."
    }
  },
  {
    id: "sw-maestro-project",
    name: "sw-maestro-project",
    title: "SW Maestro Project Archive",
    subtitle: "SW 마에스트로 연계 프로젝트 아카이브",
    category: "algorithm",
    categoryName: "Algorithms & Core CS",
    badge: "SW 마에스트로",
    featured: false,
    period: "2022",
    team: "팀 협업",
    language: "C++ / System",
    languageColor: "#8b5cf6",
    tags: ["Software Maestro", "Collaboration", "System Engineering"],
    coverImage: null,
    gradient: "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)",
    icon: "folder",
    stats: { stars: 0, forks: 0 },
    githubUrl: "https://github.com/dust9826/sw-maestro-project",
    description: "SW 마에스트로 선발 과정 및 프로젝트 활동을 위한 팀 협업 리포지토리 아카이브.",
    details: {
      overview: "소프트웨어 마에스트로 활동과 관련된 소스 코드 및 협업 산출물 보관소입니다.",
      highlights: [
        "팀원들과의 Git 브랜치 전략 및 이슈 트래킹",
        "엔지니어링 표준에 맞춘 프로젝트 디렉터리 구성"
      ],
      techStack: ["Git", "Collaboration Tools"],
      challenges: "대규모 팀 협업 시 커밋 컨벤션 및 충돌 방지 워크플로우 적용."
    }
  },

  // ==========================================
  // 5. EDUCATION & TOOLS
  // ==========================================
  {
    id: "coala",
    name: "coala",
    title: "Coala - 원소 합성으로 배우는 Git/GitHub",
    subtitle: "원소 합성을 모티브로 한 게이미피케이션 협업 실습 교재",
    category: "education",
    categoryName: "Education & Tools",
    badge: "교육 교재",
    featured: true,
    period: "2023",
    team: "강의 / 멘토링 (1인)",
    language: "Markdown / Git",
    languageColor: "#e34c26",
    tags: ["Git", "GitHub", "Education", "Gamification", "Open Source"],
    coverImage: null,
    gradient: "linear-gradient(135deg, #064e3b 0%, #047857 50%, #10b981 100%)",
    icon: "book",
    stats: { stars: 0, forks: 0 },
    githubUrl: "https://github.com/dust9826/coala",
    description: "초보자도 브랜치, 충돌 해결, Pull Request를 즐겁게 학습할 수 있도록 '원소 합성 연구소' 컨셉을 도입한 친절한 인터랙티브 실습 교재.",
    details: {
      overview: "Git과 GitHub를 처음 접하는 학습자들이 지루한 명령어 암기에서 벗어나, 게임을 하듯 공기, 흙, 불, 물 4대 원소를 조합하여 새로운 합성 원소를 만들어 PR을 날리도록 설계한 교육용 저장소입니다.",
      highlights: [
        "Coala 연구소 스토리텔링: '연구원이 되어 새로운 원소를 합성하고 기록하라!'",
        "초보자를 위한 친절한 Windows / Mac 공통 명령어 가이드 제공",
        "브랜치 생성, 커밋, 원격 푸시, Pull Request 작성 및 충돌 해결을 자연스럽게 체득",
        "실제 오픈소스 기여의 첫 단계를 두려움 없이 경험하도록 돕는 교육 설계"
      ],
      techStack: ["Git", "GitHub", "Markdown", "Gamification Design"],
      challenges: "초보자가 가장 많이 겪는 git merge conflict 상황을 공포가 아닌 '원소 합성 레시피 조율' 과정으로 재해석하여 교육적 진입 장벽을 대폭 낮춤."
    }
  }
];

// Statistics summary
const SHOWCASE_STATS = {
  totalRepos: 23,
  categoriesCount: 4,
  featuredCount: 9,
  academicPaper: "IPIU 2026",
  languages: [
    { name: "C++", color: "#f34b7d", count: 6 },
    { name: "C#", color: "#178600", count: 5 },
    { name: "Python", color: "#3572A5", count: 3 },
    { name: "TypeScript / JS", color: "#3178c6", count: 5 },
    { name: "Java", color: "#b07219", count: 1 },
    { name: "Shaders / HLSL", color: "#e34c26", count: 2 }
  ],
  domains: [
    { id: "ai", label: "AI & Computer Vision", icon: "brain", count: 3 },
    { id: "game", label: "Game Dev & Graphics", icon: "gamepad", count: 6 },
    { id: "engine", label: "Custom Engine & Web", icon: "cube", count: 4 },
    { id: "algorithm", label: "Algorithms & Core CS", icon: "terminal", count: 5 },
    { id: "education", label: "Education & Tools", icon: "book", count: 1 }
  ]
};
