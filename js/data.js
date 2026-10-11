/* Curated from the owner's Notion portfolio on 2026-10-12.
 * Keep personal work, team results, and evaluation conditions separate.
 * Research documents are undergraduate reports/posters, not publications.
 * Source links are stable public page URLs; no expiring Notion attachment URLs.
 */
'use strict';
const PORTFOLIO_SOURCE = 'https://www.notion.so/352a22a5543980f5be50d4660a744e8e';
const CATEGORY_LABELS = { systems: '게임 시스템', research: 'AI · 연구', web: '웹 · 도구', games: '게임 제작' };
const PROJECTS = [
  {
    id: 'ggwaekggwaek', title: '꽥꽥', category: 'systems', featured: true, art: 'snow',
    period: '2026.04 — 진행 중', team: '3인 팀 · 소프트웨어마에스트로',
    description: '협동 청소 게임의 눈 시스템을 설계하고, AI 에이전트가 구현한 코드를 실제 실행 결과와 대조하며 검토했습니다.',
    tags: ['Unity 6', 'C#', 'Photon Fusion 2', 'AI Agent'],
    evidence: '시뮬레이션과 렌더링을 분리한 CPU 권위 격자', condition: '헤드리스 실행 · 다피어 동기화 · 보존량 검증',
    role: '눈 시스템의 구조 설계와 검증, UI, AI 에이전트 개발·리뷰 흐름을 담당했습니다. 구현은 AI 에이전트에 위임하고, 스펙과 코드 리뷰·실측으로 통과 여부를 판단했습니다.',
    approach: ['눈의 판정 상태를 GPU 텍스처에서 CPU 정수 격자로 옮겨, 그래픽 장치 없는 서버에서도 시뮬레이션이 동작하도록 설계했습니다.', '멀티플레이 동기화에서 총량이 같다는 것만으로는 공간 분포가 같음을 증명할 수 없었습니다. 셀 위치를 반영한 체크섬과 실제 높이 비교로 검증 기준을 바꿨습니다.', '명령에 정수 자세를 실어 전달하는 동기화 구조를 검토하고, 헤드리스 실행·다피어 비교·보존 원장으로 서로 다른 실패 조건을 확인했습니다.', 'MCP 기반 분석·리뷰 도구와 UI 규약을 구성해, 에이전트가 만든 구현과 판단 근거를 다음 개발 세션에서도 확인할 수 있게 했습니다.'],
    result: '게임 상태와 화면 표현을 분리하고, “테스트를 통과했는가”뿐 아니라 “판정 기준이 문제를 제대로 잡는가”까지 검토하는 개발 흐름을 만들었습니다.',
    limit: '개발 중인 팀 프로젝트입니다. 눈의 이완 처리는 피어별로 수행하므로 모든 표면의 완전 일치를 성과로 주장하지 않습니다. 측정 조건과 설계 변경 과정은 노션에 정리했습니다.',
    notion: '3cea22a554398183a06cf470598adfa6', links: [{ label: '코드 스냅숏 · GitHub', url: 'https://github.com/dust9826/GGwaekGGwaek' }]
  },
  {
    id: 'mirror-geometry', title: '스테레오 기반 거울 검출·복원', category: 'research', featured: true, art: 'mirror',
    period: '2026.03 — 2026.06', team: '개인 · 학부 연구 프로젝트',
    description: '거울 속 공간을 실제 깊이로 추정하는 문제에서 출발해, 합성 스테레오 데이터로 거울 검출과 평면 복원을 나누어 실험했습니다.',
    tags: ['Python', 'PyTorch', 'Blender', 'FoundationStereo'],
    evidence: '미학습 합성 장면 검출 AUC 0.928', condition: '합성 데이터 1,537뷰 · 실제 영상 검증은 후속 과제',
    role: 'Blender 데이터 생성, 검출기 학습, 반사대칭 기반 평면 추정과 단계별 평가를 개인 프로젝트로 진행했습니다.',
    approach: ['Blender에서 합성 스테레오 영상과 정답 정보를 생성했습니다. 가중치를 고정한 FoundationStereo의 내부 특징에 경량 MLP 검출기를 학습했습니다.', '거울 영역의 점군에 RANSAC을 적용하자 거울면이 아니라 반사된 벽이 잡혔습니다. 입력 점군이 나타내는 공간부터 다시 해석했습니다.', '실제 점과 가상점의 반사대칭 관계로 평면 후보를 만들고, 대응점이 없는 영역의 영향을 줄인 뒤 ICP 방식으로 후보를 보정했습니다.'],
    result: '학습하지 않은 합성 장면에서 검출 AUC 0.928, IoU 0.492를 얻었습니다. 정답 거울 마스크를 사용한 복원은 법선각 오차 중앙값 2.30°, 거리 오차 중앙값 0.137m였습니다.',
    limit: '예측 마스크를 사용하는 전체 과정은 15뷰 예비 평가입니다. 정답 마스크 기반 복원 성능과 실제 검출부터 이어지는 성능을 구분합니다. 결과물은 미투고 학부 최종보고서입니다.',
    notion: '3f0a22a5543981b7bb80d8b4ef216e7c', report: true, links: [{ label: '코드·실험 결과 · GitHub', url: 'https://github.com/dust9826/mirror-geometry-foundationstereo' }]
  },
  {
    id: 'optimized-gas', title: 'Optimized GAS', category: 'systems', featured: true, art: 'pool',
    period: '2026.03 — 2026.06', team: '3인 팀 · 고급 캡스톤',
    description: 'Unreal GAS의 GameplayEffect 생성 경로를 분석하고 객체 풀링을 구현했습니다. 기대한 최적화가 실제로 어디까지 유효한지 확인했습니다.',
    tags: ['Unreal Engine 5', 'C++', 'Memory Pooling', 'Profiling'],
    evidence: '측정 구간의 힙 할당 바이트 약 19% 감소', condition: '할당 횟수 약 11% 감소 · FPS 개선 근거는 확인하지 못함',
    role: 'GAS 코어 분석, Spec·ActiveGE의 클래스별 풀링 구현과 메모리 측면의 한계 분석을 맡았습니다. 비교 실험 환경·측정 파이프라인은 팀장, 네트워크 최적화는 다른 팀원이 담당했습니다.',
    approach: ['GameplayEffect 생성과 복사 경로를 추적해 본체·공유 포인터 제어 블록·내부 컨테이너의 할당을 나누어 확인했습니다.', '클래스별 풀과 커스텀 삭제자로 객체를 재사용하고, ActiveGE의 복사 경로에는 이동 의미론을 적용했습니다.', '동일 콘텐츠를 stock GAS와 OGAS로 실행한 통제 환경 A/B 결과에서 할당량, 할당 횟수, 적용 시간, FPS를 각각 비교했습니다.'],
    result: '계측한 GE 적용 구간에서 힙 할당 바이트는 평균 약 19%, 총 할당 횟수는 약 11% 줄었습니다. 풀의 적중률과 전체 할당 절감률이 다르다는 점도 확인했습니다.',
    limit: '적용 연산 시간은 일부 조건에서 6~16% 증가했고 FPS 차이는 런 간 편차 안에 있었습니다. 메모리 절감을 전체 실행 속도 향상으로 해석하지 않습니다. 엔진 포크 코드는 이 사이트에 재배포하지 않습니다.',
    notion: '3caa22a55439811984f1e06360861211', links: []
  },
  {
    id: 'realm-builder', title: 'Realm Builder', category: 'systems', featured: true, art: 'terrain',
    period: '2025.09 — 2025.12', team: '3인 팀 · 캡스톤',
    description: '실시간 행성 생성에서 생기는 청크 처리 병목을 줄이기 위해, 데이터 생성부터 Mesh·Collider 적용까지의 흐름을 DOTS로 재설계했습니다.',
    tags: ['Unity', 'C#', 'DOTS', 'Burst · Job System'],
    evidence: '프로젝트 비교 장면의 스파이크 구간 10 → 55 FPS', condition: '동일 프로젝트의 적용 전후 비교 · 일반 성능 보장 수치는 아님',
    role: '청크 생성 파이프라인의 DOTS 재설계, Enableable Component 기반 단계 진행, LOD를 위한 인덱스 기반 Octree 구조를 맡았습니다.',
    approach: ['청크 밀도 생성, Marching Cubes의 MeshData 생성, Mesh·Collider 적용을 분리했습니다.', '무거운 데이터 연산은 Job System과 Burst로 처리하고, Unity 객체를 만드는 부분은 메인 스레드에 남겼습니다. Collider 생성도 별도 Job으로 분리했습니다.', '단계별 Request 컴포넌트와 Job 완료 상태를 이용해 청크마다 독립적으로 다음 작업을 진행하도록 구성했습니다.'],
    result: '노션에 기록한 적용 전후 비교에서 스파이크 구간이 10 FPS에서 55 FPS로 개선됐습니다. 병렬화할 수 있는 연산과 메인 스레드에 남아야 하는 작업의 경계를 구분한 경험입니다.',
    limit: '수치는 프로젝트의 특정 비교 장면 기준입니다. 모든 하드웨어·청크 규모에서 동일한 개선 폭을 보장하는 결과는 아닙니다.',
    notion: '353a22a5543980489d91d01a36e057a5', links: [{ label: '코드 · GitHub', url: 'https://github.com/RealmForge/RealmForge/tree/dev' }, { label: '내 커밋', url: 'https://github.com/RealmForge/RealmForge/commits/dev?author=dust9826' }]
  },
  {
    id: 'whisper-tcpgen', title: '한국어 강의 음성 인식', category: 'research', featured: true, art: 'audio',
    period: '2025.1학기', team: '4인 팀 · 인공지능 수업',
    description: 'Whisper와 TCPGen을 이용해 강의 속 컴퓨터과학 전문용어의 인식 오류를 줄이고, 실시간 음성 변환과 퀴즈 생성을 연결한 팀 프로젝트입니다.',
    tags: ['Whisper', 'TCPGen', 'Python', 'Speech Recognition'],
    evidence: '팀 평가 WER 24.5% → 21.5%', condition: 'CER 7.1% → 6.7% · 결과 포스터의 팀 실험 수치',
    role: '숭실대학교 인공지능 수업의 4인 팀 프로젝트에 참여했습니다. 이 페이지에 소개하는 시스템 구성과 성능은 팀 전체 결과입니다.',
    approach: ['AI Hub 한국어 음성 데이터 중 전기전자·컴퓨터통신 분야 데이터를 선별하고 전문용어 편향 리스트 2,847개를 구성했습니다.', 'Lexical tree를 사용하는 TCPGen을 WhisperBiasing에 적용하고, 적용 전후의 WER·CER를 비교했습니다.', '팀 시스템은 WhisperLive 기반 실시간 변환, RAG·Claude API를 이용한 퀴즈 생성과 iOS 앱을 연결했습니다.'],
    result: '팀 결과 포스터에 기록된 WER은 24.5%에서 21.5%로 3.0%p, CER은 7.1%에서 6.7%로 0.4%p 감소했습니다.',
    limit: '위 수치는 팀 프로젝트의 실험 결과이며 개인 단독 성과로 기재하지 않습니다. 결과물은 학부 프로젝트 포스터이며, 학회·학술지 투고 실적이 아닙니다.',
    notion: '3f0a22a55439811bb32dc3aa144845dc', report: true, links: []
  },
  {
    id: 'market-timeseries', title: '나스닥·암호화폐 시계열 분석', category: 'research', featured: true, art: 'series',
    period: '2025.09 — 2025.12', team: '학부 팀 프로젝트',
    description: '나스닥과 시장 공통 추세를 조정했을 때 암호화폐 사이의 관계가 어떻게 달라지는지, 전처리와 분석 구간을 바꿔 비교했습니다.',
    tags: ['Python', 'yfinance', 'Granger Test', 'Time Series'],
    evidence: '공통 추세 제거 전후의 예측 관계 비교', condition: '경제적 인과관계·매매 수익성 검증과 구분',
    role: '가격 데이터 수집, 로그 수익률·회귀 잔차 전처리, 그레인저 분석을 통한 시계열 선후 관계 검토를 맡았습니다.',
    approach: ['나스닥 선물과 암호화폐 10개의 가격을 수집하고 로그 수익률로 변환했습니다. 회귀 잔차로 나스닥과 함께 움직이는 성분을 조정했습니다.', '팀에서 ADF 검정, 분포 시각화, 상관관계와 그레인저 분석을 수행하고 1시간·5분 단위의 차이를 살폈습니다.', '전체 기간에 여러 국면이 섞이는 문제를 검토한 뒤, 주성분 분석과 Rolling Window로 하락 구간을 찾아 다시 분석했습니다.'],
    result: '분석 대상 데이터에서 시장 평균 추세를 제거한 후 상관관계와 그레인저 분석의 연결 관계가 줄었습니다. 전처리 방식과 구간 선택이 해석에 미치는 영향을 확인했습니다.',
    limit: '그레인저 검정은 과거 정보의 예측 기여를 확인하는 통계적 방법입니다. 경제적 원인이나 투자 성과를 입증하지 않습니다. 결과물은 미투고 학부 연구 보고서입니다.',
    notion: '3f0a22a554398171ad6ac39cfc3cafff', report: true, links: [{ label: '분석 코드 · Colab', url: 'https://colab.research.google.com/drive/1lE_cP6dxYBI4Ly1QamGMz0Exmwk5u5WG' }]
  },
  {
    id: 'web-game-engine', title: '3D Web Game Engine', category: 'web', featured: true, art: 'engine',
    period: '2023.10 — 2024.03', team: '개인 프로젝트',
    description: '외부 렌더링·수학 라이브러리 없이 TypeScript와 WebGL로 행렬 연산, Scene·Component, 렌더링과 게임 루프를 직접 구현했습니다.',
    tags: ['TypeScript', 'WebGL', 'GLSL', 'Game Engine'],
    evidence: '수학 라이브러리부터 렌더 파이프라인까지', condition: '복셀 월드를 만들어 엔진의 사용 흐름 확인',
    role: '행렬·벡터 연산, 객체와 컴포넌트 구조, WebGL 렌더링, 입력과 이벤트 처리 등 엔진의 기반을 개인 프로젝트로 구현했습니다.',
    approach: ['외부 라이브러리를 설치할 수 없는 환경에서 회전·투영·역행렬 연산과 자료구조를 구현했습니다.', 'Scene과 Component로 객체의 책임을 나누고, update·lateupdate·event flush·render의 실행 순서를 구성했습니다.', '순회 중 객체 삭제를 예약 처리하고, 키 입력을 TAP·HOLD·AWAY·NONE으로 구분했습니다. 청크 기반 복셀 월드로 활용 과정을 확인했습니다.'],
    result: '엔진이 제공하는 API 아래에서 객체 생명주기와 렌더링 데이터가 어떻게 흐르는지 직접 다뤘습니다.',
    notion: '353a22a554398012a4b7f2579ae8df6d', links: [{ label: '코드 · GitHub', url: 'https://github.com/dust9826/WebGameEngineWithTs' }]
  },
  {
    id: 'snu-portal', title: '서울대학교 데이터 포털', category: 'web', featured: true, art: 'database',
    period: '2022.03경 — 2022.07', team: '빅팀아이앤씨 · 상주 개발 참여',
    description: 'Java·Spring·전자정부프레임워크 기반 포털 개발에 참여해, 전달받은 화면과 DB를 연결하고 SQL·테이블 명칭을 정비했습니다.',
    tags: ['Java', 'Spring', 'SQL', '전자정부프레임워크'],
    evidence: '관리자·사용자 페이지의 데이터 연결 작업', condition: '프런트엔드는 다른 개발자가 담당',
    role: '서울대학교에 상주하며 SQL 작성과 DB 연결, 테이블의 논리명·물리명 및 명칭 수정 작업에 참여했습니다.',
    approach: ['다른 개발자가 전달한 프런트엔드 화면을 바탕으로 데이터를 연결하고 SQL을 작성했습니다.', '관리자·사용자 페이지가 사용하는 테이블과 항목명을 확인하고 수정했습니다.', 'DB 논리명·물리명을 정할 때 사용하는 사전 기준에 맞지 않는 한글·영문 항목을 찾아 변경했습니다.'],
    result: '실제 조직에서 사용하는 데이터와 명명 기준에 맞추어 웹 기능을 연결하고 수정하는 경험을 쌓았습니다.',
    limit: '회사 업무로 참여한 프로젝트입니다. 전체 프런트엔드나 DB 설계를 단독 담당한 것으로 기재하지 않으며, 업무 소스와 내부 자료는 공개하지 않습니다.',
    links: [], source: PORTFOLIO_SOURCE
  },
  { id: 'maplerush', title: 'MapleRush', category: 'games', art: 'game', period: '2026.06 — 2026.08', team: '5인 팀 · 메커톤', description: '메이플스토리 월드와 Lua로 제작한 팀 게임 프로젝트입니다.', tags: ['MapleStory Worlds', 'Lua'], notion: '3cfa22a554398152907ad2967c7ab2c4' },
  { id: 'escapefactory', title: 'EscapeFactory', category: 'games', art: 'game', period: '2026.02', team: '개인 프로젝트', description: 'Unreal Engine 5와 C++로 진행한 개인 게임 개발 프로젝트입니다.', tags: ['Unreal Engine 5', 'C++'], notion: '353a22a5543980ff8b94c438a7dd4c7f' },
  { id: 'streaminglive', title: 'StreamingLive', category: 'games', art: 'game', period: '2026.01', team: '5인 팀 · 유니잼', description: 'Unity 기반 팀 게임잼 프로젝트입니다. 2026 UniDev 유니잼에서 철두철미상을 받았습니다.', tags: ['Unity', 'C#', 'Shader Graph'], notion: '353a22a55439803d993acfaf24645f51' },
  { id: 'pinata', title: 'Pinata', category: 'games', art: 'game', period: '2025.12', team: '2인 팀', description: 'Unity와 C#을 사용해 짧은 기간 동안 제작한 팀 게임 프로젝트입니다.', tags: ['Unity', 'C#'], notion: '353a22a55439805bbc06e1406335a0f8' },
  { id: 'mfcmapeditor', title: 'MFC Map Editor', category: 'web', art: 'engine', period: '2022.10 — 2022.11', team: '개인 프로젝트', description: 'C++와 Windows API를 활용해 제작한 맵 편집 도구입니다.', tags: ['C++', 'WinAPI', 'MFC'], notion: '353a22a55439807bac0ad61526c2444a' },
  { id: 'btmeta', title: 'BTMeta', category: 'games', art: 'game', period: '2022.01 — 2022.10', team: '2인 팀 · 빅팀아이앤씨', description: 'Unity와 Photon을 활용한 메타버스 프로젝트에 참여했습니다.', tags: ['Unity', 'C#', 'Photon'], notion: '353a22a5543980a48744d4bad11f67de' },
  { id: 'ar-korean', title: 'AR 한국어', category: 'games', art: 'game', period: '2021.11 — 2022.05', team: '3인 팀 · 빅팀아이앤씨', description: 'Unity 기반 AR 한국어 교육 프로젝트에 참여했습니다.', tags: ['Unity', 'C#', 'AR'], notion: '353a22a5543980918fffd0585b0d9709' },
  { id: 'perfecthex', title: 'PerfectHex', category: 'games', art: 'game', period: '2021.12 — 2022.02', team: '개인 프로젝트', description: 'Unity와 C#으로 제작한 3D SRPG 개인 프로젝트입니다.', tags: ['Unity', 'C#', 'SRPG'], notion: '353a22a554398049be64cf358ed423b7' },
  { id: 'bianka', title: 'Bianka', category: 'games', art: 'game', period: '2021.07 — 2021.08', team: '개인 프로젝트', description: 'Unity로 제작한 2D 퍼즐 플랫폼 게임입니다.', tags: ['Unity', 'C#', '2D Puzzle'], notion: '353a22a55439802bbc0aeb864c2cfdf9' },
  { id: 'talmorim', title: 'TALMORIM', category: 'games', art: 'game', period: '2020.05', team: '2인 팀', description: 'Unity HDRP를 활용해 진행한 팀 게임 프로젝트입니다.', tags: ['Unity', 'C#', 'HDRP'], notion: '353a22a5543980e0934ef4868bd6f7f6' },
  { id: 'necrodancer', title: 'NecroDancer Copy Game', category: 'games', art: 'game', period: '2019.06 — 2019.07', team: '개인 학습 프로젝트', description: '게임의 동작을 재현하며 Unity와 C#을 학습한 모작 프로젝트입니다.', tags: ['Unity', 'C#', '모작'], notion: '354a22a5543980bcac82d2dcfd4fd082' }
];
