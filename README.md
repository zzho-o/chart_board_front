🚀 ChartBoard – Demo (FE + API)

React + Vite + TypeScript 기반 데모 앱입니다.
요구사항(게시판 + 차트 + 인증 + i18n)을 충족하며, 직접 만든 NestJS 백엔드에 연결되어 동작합니다.

게시판: 작성/조회/수정/삭제, 검색, 정렬, 카테고리 필터, 커서 기반 페이지네이션, 금칙어 필터

차트: 도넛(TopBrands), 스택형 바/면적(WeeklyMood), 팀별 멀티라인(CoffeeMultiLine)

i18n: ko/en 전환

인증: JWT 로그인, 보호/공개 라우트 가드

🌐 배포 주소

Frontend (GitHub Pages): https://zzho-o.github.io/chart_board/

Backend (Vercel, NestJS): https://chart-board-back.vercel.app

Swagger 문서: https://chart-board-back.vercel.app/api

Health: https://chart-board-back.vercel.app/health

⚙️ 빠른 시작 (Frontend)

# 의존성 설치 (yarn 권장)

yarn install

# 로컬 개발

yarn dev

# 프로덕션 빌드

yarn build

# 빌드 결과 미리보기

yarn preview

# ESLint

yarn lint

🔐 환경 변수

프로젝트 루트에 .env.local 생성:

VITE_API_BASE_URL=https://chart-board-back.vercel.app

프론트의 모든 API 호출은 VITE_API_BASE_URL을 기준으로 나갑니다.
예) GET ${VITE_API_BASE_URL}/posts

🧰 기술 스택

Framework & Build: React 19, Vite 7, TypeScript 5

Routing: React Router v7

상태/데이터: Zustand 5, TanStack Query 5

스타일: styled-components 6 (테마/디자인 토큰), Prettier

차트: Recharts 3

i18n: i18next 25, react-i18next 16

UX: @studio-freight/lenis 1, AOS 2

폼/검증: react-hook-form 7, zod 4, @hookform/resolvers

네트워킹: axios 1

품질: ESLint 9, eslint-plugin-react-hooks, eslint-config-prettier

Vite 플러그인: @vitejs/plugin-react-swc 4

📁 프로젝트 구조 (요약)
src/
App.tsx # 라우팅/전역 레이아웃 진입
index.tsx
not-found.tsx # 404 페이지

components/
charts/
ChartBox.tsx # 공통 카드 래퍼
CoffeMultiLine.tsx # 팀별 버그·생산성 멀티라인
TopBrands.tsx # 도넛/막대(브랜드 인기)
WeeklyMood.tsx # 스택형 면적/바(주간 무드)
common/
Layout/
app.header.tsx
app.footer.tsx
app.layout.tsx # 고정 헤더, Lenis, AOS
ui/
Button.tsx, Input.tsx, Modal.tsx, TextArea.tsx, Typo.tsx

hooks/
useHealth.ts # /health
useIntersection.ts # 무한스크롤
useLenis.ts # 부드러운 스크롤
usePosts.ts # Posts CRUD

net/
api.ts # axios 인스턴스/인터셉터
type.ts # Swagger 기반 타입

pages/
home.page.tsx
sign-in.page.tsx # 로그인 (RHF + zod)
charts.page.tsx
posts/
posts.page.tsx # 목록/필터/무한스크롤/읽기모달
posts.create.tsx
posts.update.tsx

routes/
ProtectedRoute.tsx, PublicOnlyRoute.tsx, PermissionGuard.tsx

stores/
store.auth.ts, type.ts

styles/
theme.ts, styled.d.ts # 디자인 토큰/타입 보강
\*.ts # 각 페이지/컴포넌트 스타일

types/
axios.d.ts

utils/
chart.ts # 응답 어댑트/플랫 변환
i18n.ts # i18next 초기화
post.ts # 금칙어/태그 정규화
regexps.ts

📰 게시판(Posts) 요약

CRUD: 목록/조회/작성/수정/삭제

검색: 제목+본문 (스페이스 구분 AND 매칭)

정렬: createdAt, title / asc|desc

카테고리: NOTICE | QNA | FREE

페이지네이션: 커서 기반(무한 스크롤)

금칙어 필터: 자모/공백/기호 변형 대응

태그: 중복 제거, 최대 5개, 각 24자

i18n: 폼/오류 메시지 번역 반영

📊 차트(Charts) 요약

TopBrands: 도넛 & 막대, i18n 툴팁/레전드

WeeklyMood: 스택형 Area/Bar (stackOffset="expand" → %)

CoffeeMultiLine:

X축: 커피 컵 수(cups)

좌 Y축: bugs(실선) / 우 Y축: productivity(점선)

adaptCoffeeConsumption()으로 응답 스키마 차이 흡수 → flattenCoffeeTeams()로 납작화

🔌 API 요약 (Backend: NestJS)

Base URL: https://chart-board-back.vercel.app

Auth

POST /auth/login → JWT 발급

기본 테스트 계정(서버 내 더미 유저):

{ "email": "test@test.test", "password": "Test!234" }

Swagger에서 Authorize 버튼 클릭 후 Bearer <token> 입력

Posts (JWT 필요, “본인 글만” 접근)

GET /posts — 커서 기반 페이지네이션(prevCursor|nextCursor, limit, sort, order, category, from|to, search)

POST /posts — 생성

GET /posts/:id — 단건

PATCH /posts/:id — 부분 수정

DELETE /posts/:id — 삭제

DELETE /posts — 내 모든 글 삭제

Mock (공개)

GET /mock/top-coffee-brands — 도넛/막대

GET /mock/weekly-mood-trend — 주간 무드

GET /mock/coffee-consumption — 팀별 소비/버그/생산성

GET /mock/posts?count=300 — 고정 500개 중 앞에서부터 slice (기본 300)

현재 백엔드는 in-memory(메모리 기반) 저장 방식입니다. 프로세스를 재시작하면 게시글 데이터가 초기화됩니다(목데이터는 자동 재생성). 필요 시 SQLite/Prisma로 지속 저장 확장 가능.

🧪 로컬 검증 팁

# 백엔드 헬스체크

curl https://chart-board-back.vercel.app/health

# 로그인 → 토큰 확인

curl -X POST https://chart-board-back.vercel.app/auth/login \
 -H "Content-Type: application/json" \
 -d '{"email":"test@test.test","password":"Test!234"}'

응답의 token을 프론트 상태에 저장하면 보호 라우트 접근 가능.

🔒 CORS

백엔드 main.ts에서 CORS를 허용해 프론트 도메인에서 호출 가능:

app.enableCors({ origin: '\*' });

📝 라이선스

본 리포지토리는 개인 포트폴리오/데모 목적입니다.
필요 시 상용/팀 환경에 맞춰 확장(로그/보안/스토리지/DB) 가능합니다.
