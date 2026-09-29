# 🛠️ LectureSync AI 기술 아키텍처 및 벤치마크 보고서
> **LT AI 핵심 엔지니어링 분석: 저지연 실시간 음성 번역과 전공 용어집 기반 AI 스터디 인텔리전스**

---

## 1. STT & 음성 전사 파이프라인 (Speech-to-Text)

### 1.1 공급자 순서 (Provider Hierarchy)
- **1순위 (Primary)**: Cloudflare Workers AI `@cf/openai/whisper-large-v3-turbo`
  - 원가: 약 ₩43 / 시간당 (Workers Paid $5 티어 포함)
  - 지연 시간: p50 1.8초, p95 3.2초
  - 타임아웃: 5초 AbortSignal 가드 적용
- **2순위 (Fallback)**: OpenAI `gpt-4o-mini-transcribe`
  - 1순위 실패(429 Rate Limit 또는 5초 초과) 시 무중단 자동 폴백

### 1.2 왜 Gemini STT를 배제하였는가?
- 실측 결과 Gemini 기반 음성 전사는 한국어→영어 번역 모드에서 간헐적 문장 4회 반복 환각(Hallucination) 및 타임스탬프 왜곡이 발생함을 실증하여 배제함.

---

## 2. 번역 엔진 및 용어집 동적 주입 (Translation & Glossary Engine)

### 2.1 Gemini 3.1 Flash-Lite 선정 이유
- 16개 LLM 조합(4o-mini, 4.1-nano, 5-nano, Qwen, Ministral 등) 속도·정확도·단가 벤치마크 결과:
  - `thinkingLevel: 'minimal'` 설정 시 0 사고 토큰으로 p50 600ms 미만 유지
  - 번역 정확도와 전공 용어 반영률에서 최상위 점수 기록

### 2.2 과목별 전공 용어 사전 (Domain Glossary)
- Google Translation v2 기본 API의 치명적 결함(동적 용어집 미지원)을 극복:
  - 프롬프트 상단에 과목별 Key-Value 용어 매핑을 주입하여 "deadlock -> 교착 상태", "page fault -> 페이지 폴트", "dirty bit -> 더티 비트" 등 전공 맥락 보존.

---

## 3. 4단계 AI 학습팩 생성 알고리즘 (Study Intelligence)

1. **Executive Summary**:
   - 강의 대본 전체를 시간 축으로 클러스터링하여 3줄 총평 및 타임스탬프별 근거 링크 생성
2. **High-Yield Exam Prediction (시험 족보)**:
   - 교수의 강조 어휘("중요합니다", "시험에 출제됩니다", "Notice this carefully") 감지 시 가중치 부여하여 객관식 및 서술형 문항 생성
3. **Active Recall Flashcards**:
   - 개념 정의와 핵심 키워드를 전면/후면 분리하여 3D 플립 복습 제공
4. **Glossary Extraction**:
   - 강의에서 언급된 빈출 기술 용어 자동 식별 및 한국어 해설 매핑
