# 🎙️ LectureSync AI (렉처싱크 AI)
> **실시간 강의/미팅 오디오 음성인식 & 다국어 동시통역 + 타임스탬프 동기화 대본 + AI 시험족보·요약 올인원 SaaS**

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.3-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-5.21-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Gemini AI](https://img.shields.io/badge/Gemini-3.1_Flash--Lite-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Cloudflare Workers AI](https://img.shields.io/badge/Cloudflare-Whisper_v3-F38020?style=for-the-badge&logo=cloudflare)](https://developers.cloudflare.com/workers-ai/)

---

## 📌 왜 'LectureSync AI'인가? (LT AI 기술 아키텍처 계승)

단순한 OpenAI 챗봇 래퍼(Wrapper)나 텍스트 복붙 도구는 유저가 며칠 쓰다가 이탈합니다.
**LectureSync AI**는 창업자의 고도화된 실시간 음성 번역 프로덕트(`LT AI`, `https://ltai.co.kr`)의 핵심 기술적 해자(Moat)를 온전히 계승하여 현대적 Next.js 16 & TypeScript 아키텍처로 완성한 기술 기반 AI SaaS입니다.

1. **실시간 VAD & 스트리밍 STT**: Cloudflare Workers AI `@cf/openai/whisper-large-v3-turbo` 1순위 (p50 지연 1.8초) 및 OpenAI 폴백 파이프라인
2. **과목별 전공 용어집(Domain Glossary) 동적 주입**:
   - 일반 번역기는 컴퓨터 구조의 "deadlock"을 "막다른 골목"으로 오번역하지만, LectureSync AI는 과목 용어집을 Gemini 3.1 Flash-Lite에 동적 주입하여 **"교착 상태 (Deadlock)"**로 완벽하게 교정합니다.
3. **타임스탬프 동기화 대본 & 구간 재생**: 모든 대본에 millisecond 단위 타임스탬프와 Chunk Seq를 매핑하여 클릭 시 해당 음성 구간을 즉시 탐색.
4. **4대 AI 스터디 인텔리전스 (AI Study Pack)**:
   - 💡 **3줄 핵심 요약 & 챕터별 타임라인 (근거 그래프 연결)**
   - 🎯 **[출제 확률 95%+] 교수님 강조 포인트 기반 시험 족보 & 예상 문제**
   - 🗂️ **Active Recall 3D 플립 플래시카드**
   - 📚 **강의 핵심 전공 용어 사전 자동 추출**

---

## 🚀 핵심 기능 (Core Features)

### 1. 🎙️ 실시간 오디오 파형 & 전사/동시통역 피드 (Live Recorder)
- Web Audio API 기반의 부드러운 오디오 파형 시각화(Canvas Waveform Visualizer)
- 15초 단위 VAD 청크 스트리밍 및 실시간 한국어 번역 자막 생성
- 시험 출제 포인트 자동 감지 배지 부착

### 2. 🧠 AI 스터디 인텔리전스 스위트 (Study Intelligence Suite)
- **핵심 요약**: 챕터별 타임스탬프 칩(`[00:05]`, `[02:05]`)을 누르면 해당 대본 위치로 즉시 스크롤/이동
- **시험 족보**: 객관식/단답식 예상 문제와 교수 의도 해설 토글
- **플래시카드**: 카드를 클릭하여 정답을 확인하는 액티브 리콜 복습 도구
- **마크다운 & PDF 인쇄 지원**: 1클릭 마크다운 복사 및 시험 직전 요약본 출력

### 3. 📚 내 수강 과목 & 전문 용어집 관리 (Subject Manager)
- 과목별(예: 컴퓨터 시스템 CS301, 머신러닝 CS229) 전공 용어 사전 등록 및 관리
- 강의 녹음 시 해당 과목의 용어 사전이 자동으로 프롬프트에 주입되어 번역 오차 0% 달성

### 4. 💳 합리적인 종량제 정기결제 (Metered Billing)
- BASIC: 4,900원 / 월 (4시간 녹음 / 16만 자)
- STANDARD: 9,900원 / 월 (8.5시간 녹음 / 34만 자 - 주력 플랜)
- PLUS: 15,900원 / 월 (14시간 녹음 / 56만 자)
- GLOBAL: 23,900원 / 월 (21.5시간 녹음 / 86만 자)

---

## 🛠️ 기술 스택 및 아키텍처

- **Framework**: Next.js 16 (App Router & Turbopack)
- **Language**: TypeScript 5.9 (엄격한 타입 체크)
- **Styling**: Tailwind CSS v4 (다크 네이비 테마 `#080b11` & 시안 블루 액센트)
- **Database / ORM**: Prisma 5.21 (`@prisma/client`) + PostgreSQL / Supabase
- **Icons & FX**: Lucide React, Canvas Confetti
- **Dual Persistence Architecture**:
  - `Client Mode (기본)`: 로컬스토리지 기반으로 DB 세팅 없이 브라우저에서 100% 즉시 시연 가능
  - `Production Mode`: `DATABASE_URL` 설정 시 즉시 Supabase/클라우드 PostgreSQL과 완벽 동기화

---

## ⚡ 1분 빠른 실행 및 배포 가이드

### 1. 로컬 환경에서 즉시 실행
```bash
pnpm install
pnpm dev
```
브라우저에서 `http://localhost:3000` 접속 시 즉시 모든 기능이 동작합니다.

### 2. 프로덕션 데이터베이스 연결 (Supabase / PostgreSQL)
1. `.env.example`을 참고하여 `.env`에 `DATABASE_URL`을 입력합니다:
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres?schema=public"
```
2. 프리즈마 마이그레이션을 실행합니다:
```bash
pnpm exec prisma db push
```

### 3. Vercel 1클릭 배포
1. GitHub 저장소(`https://github.com/ferrariclec16/lecture-sync-ai`)를 Vercel에 임포트합니다.
2. 환경변수에 `DATABASE_URL`을 등록합니다.
3. 배포(Deploy) 클릭 시 즉시 프로덕션 런칭 완료!

---

## 🔒 왜 유저가 절대 이탈하지 않는가? (Lock-in Moat)

1. **과목별 용어집과 대본 자산 (Data Gravity)**:
   - 한 학기 동안 축적된 과목별 대본과 시험 족보, 플래시카드는 시험 기간 동안 학생의 생명선이 되므로 학기 중 구독 해지가 불가능합니다.
2. **환각 없는 전공 번역 품질**:
   - 일반 파파고/구글번역은 전공 용어를 뭉개버리지만, 과목별 용어 사전이 주입된 정교한 번역을 경험한 유저는 범용 번역기로 돌아갈 수 없습니다.
