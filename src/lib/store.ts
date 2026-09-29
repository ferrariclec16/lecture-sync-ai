import {
  UserProfile,
  SubjectItem,
  RecordingItem,
  TranscriptEntryItem,
  AiStudyPackData,
} from './types';

export const INITIAL_USER: UserProfile = {
  id: 'usr-1',
  name: '배병욱',
  email: 'founder@ltai.co.kr',
  plan: 'PRO',
  monthlySecondsTotal: 30600, // 8.5시간 (STANDARD/PRO 플랜)
  monthlySecondsUsed: 14200,  // 약 3.9시간 사용
  aiCreditsTotal: 108,
  aiCreditsUsed: 42,
};

export const INITIAL_SUBJECTS: SubjectItem[] = [
  {
    id: 'sub-1',
    name: '컴퓨터 시스템 & 운영체제 (CS301)',
    professor: 'Prof. David Patterson (UC Berkeley)',
    semester: '2026-2학기',
    colorHex: '#3b82f6',
    glossary: [
      { en: 'deadlock', ko: '교착 상태', definition: '두 개 이상의 프로세스가 서로의 자원을 기다리며 무한 대기하는 상태', category: '동기화' },
      { en: 'page fault', ko: '페이지 폴트', definition: '가상 메모리 주소가 물리 RAM에 적재되지 않았을 때 발생하는 하드웨어 인터럽트', category: '메모리' },
      { en: 'TLB', ko: '변환 참조 버퍼 (TLB)', definition: '가상 주소를 물리 주소로 초고속 변환하기 위한 하드웨어 캐시', category: '하드웨어' },
      { en: 'race condition', ko: '경쟁 상태', definition: '두 개 이상의 스레드가 공유 자원에 동시 접근하여 결과값이 실행 순서에 의존하는 버그', category: '동시성' },
      { en: 'dirty bit', ko: '더티 비트 (수정 비트)', definition: '해당 페이지가 메모리에 적재된 후 변경되었는지를 나타내는 플래그', category: '메모리' },
    ],
  },
  {
    id: 'sub-2',
    name: '머신러닝 & 딥러닝 수학 (CS229)',
    professor: 'Prof. Andrew Ng (Stanford)',
    semester: '2026-2학기',
    colorHex: '#10b981',
    glossary: [
      { en: 'gradient descent', ko: '경사 하강법', definition: '손실 함수의 기울기를 따라 매개변수를 최적화하는 기본 알고리즘', category: '최적화' },
      { en: 'backpropagation', ko: '역전파', definition: '출력단 오차를 역방향으로 전파하여 각 가중치의 편미분값을 구하는 기법', category: '신경망' },
      { en: 'overfitting', ko: '과적합 (오버피팅)', definition: '모델이 학습 데이터에만 지나치게 맞춰져 새로운 데이터에 대한 일반화 성능이 떨어지는 현상', category: '일반화' },
    ],
  },
  {
    id: 'sub-3',
    name: '국제금융 및 매크로 경제학',
    professor: 'Prof. Paul Krugman (MIT/CUNY)',
    semester: '2026-2학기',
    colorHex: '#f59e0b',
    glossary: [
      { en: 'quantitative easing', ko: '양적 완화 (QE)', definition: '중앙은행이 시장에 직접 유동성을 공급하여 장기 금리를 낮추는 비전통적 통화 정책', category: '통화정책' },
      { en: 'trilemma', ko: '불가능의 삼위일체', definition: '자유로운 자본 이동, 고정 환율, 독립적 통화 정책을 동시에 달성할 수 없다는 이론', category: '국제금융' },
    ],
  },
];

export const INITIAL_STUDY_PACK: AiStudyPackData = {
  tldr: '가상 메모리는 프로세스마다 독립적인 주소 공간을 부여하여 보호와 가용성을 극대화합니다. 물리 메모리 부족 시 Page Fault 인터럽트가 발생하며, 성능 저하를 방지하기 위해 고속 하드웨어 캐시인 TLB(Translation Lookaside Buffer)가 필수적으로 작동합니다.',
  keyPoints: [
    '가상 주소(Virtual Address)와 물리 주소(Physical Address)의 분리 메커니즘',
    'Page Fault 발생 시 디스크 I/O 스와핑 및 Dirty Bit 기반 페이지 교체 알고리즘(LRU)',
    'TLB 적중률(Hit Rate)이 메모리 접근 유효 접근 시간(EAT)에 미치는 결정적 영향',
    '다단계 페이지 테이블(Multi-level Paging)을 통한 메모리 오버헤드 최적화',
  ],
  sections: [
    {
      timestamp: '00:05',
      topic: '1. 가상 메모리의 도입 목적과 추상화',
      content: '프로세스가 물리 RAM의 실제 주소를 알 필요 없이 연속된 메모리 공간을 독점적으로 사용하도록 환상을 제공합니다. 이를 통해 프로세스 간 메모리 침범을 원천 차단합니다.',
    },
    {
      timestamp: '01:14',
      topic: '2. Page Fault와 트랩 처리 절차',
      content: 'CPU가 유효 비트(Valid Bit)=0인 페이지에 접근하면 하드웨어 트랩이 걸립니다. OS 핸들러는 프로세스를 블록 상태로 두고 디스크 스왑 영역에서 해당 프레임을 빈 RAM으로 읽어옵니다.',
    },
    {
      timestamp: '02:05',
      topic: '3. [시험 빈출] Dirty Bit와 스왑 아웃(Swap-out) 비용 절감',
      content: '페이지가 수정되지 않았다면(Dirty Bit=0) 디스크에 다시 쓸 필요 없이 메모리에서 그냥 버리면 됩니다. 수정된 경우에만 디스크에 기록하므로 I/O 오버헤드를 50% 이상 절감합니다.',
    },
    {
      timestamp: '03:15',
      topic: '4. TLB 하드웨어 캐시와 성능 분석',
      content: 'TLB가 없으면 매 메모리 접근마다 페이지 테이블 접근(1회) + 실제 데이터 접근(1회) = 최소 2배 지연이 발생합니다. TLB 적중률이 99%일 때 1클럭 사이클 내 변환이 가능합니다.',
    },
  ],
  examQuestions: [
    {
      id: 'eq-1',
      type: 'MULTIPLE_CHOICE',
      question: '가상 메모리 페이징 기법에서 Page Replacement 시 Dirty Bit(수정 비트)의 역할로 가장 올바른 것은?',
      options: [
        'A. 해당 페이지가 메모리에 적재된 시간을 기록한다.',
        'B. 페이지 내용이 변경되지 않았을 때 디스크 쓰기 I/O를 생략하여 성능을 높인다.',
        'C. 프로세스가 해당 페이지에 대한 읽기 권한을 가지고 있는지를 검증한다.',
        'D. TLB에 해당 항목이 캐싱되어 있는지 여부를 나타낸다.',
      ],
      answer: 'B',
      explanation: 'Dirty Bit가 0이면 물리 메모리의 내용이 디스크 스왑 영역과 일치하므로 디스크 쓰기를 생략하고 프레임을 즉시 덮어쓸 수 있습니다.',
      probability: 'VERY_HIGH',
      timestampCitation: '02:05',
    },
    {
      id: 'eq-2',
      type: 'SHORT_ANSWER',
      question: '메모리 접근 시간 100ns, TLB 접근 시간 20ns, TLB 적중률 95%일 때 실질 메모리 접근 시간(EAT)을 구하시오.',
      answer: '125ns',
      explanation: 'EAT = (20 + 100) * 0.95 + (20 + 100 + 100) * 0.05 = 114 + 11 = 125ns.',
      probability: 'HIGH',
      timestampCitation: '04:30',
    },
  ],
  flashcards: [
    {
      id: 'fc-1',
      front: 'Page Fault란 무엇인가?',
      back: '프로세스가 접근하려는 가상 메모리 페이지가 물리 RAM에 로드되어 있지 않을 때 발생하는 하드웨어 인터럽트.',
      category: '핵심 개념',
    },
    {
      id: 'fc-2',
      front: 'TLB(Translation Lookaside Buffer)의 목적은?',
      back: '다단계 페이지 테이블로 인한 메모리 접근 지연을 줄이기 위해 가상-물리 주소 매핑을 캐싱하는 초고속 연관 하드웨어 캐시.',
      category: '하드웨어',
    },
    {
      id: 'fc-3',
      front: 'Dirty Bit가 0일 때 페이지 교체 시의 이점은?',
      back: '디스크 스왑 영역으로 쓰기(Write-back) I/O 작업을 수행하지 않고 즉시 새 페이지로 덮어쓸 수 있음.',
      category: '시험 빈출',
    },
  ],
  glossary: [
    { en: 'Virtual Address', ko: '가상 주소', definition: '프로세스 관점에서 생성되는 논리적 주소' },
    { en: 'Page Table', ko: '페이지 테이블', definition: '가상 페이지 번호와 물리 프레임 번호를 매핑하는 OS 자료구조' },
    { en: 'Page Fault', ko: '페이지 폴트', definition: '페이지가 RAM에 부재할 때 발생하는 예외 인터럽트' },
    { en: 'TLB Hit/Miss', ko: 'TLB 적중/실패', definition: '주소 변환 캐시 내에 목표 엔트리가 존재하는지 여부' },
  ],
};

export const INITIAL_RECORDINGS: RecordingItem[] = [
  {
    id: 'rec-1',
    subjectId: 'sub-1',
    title: '04강: 가상 메모리와 페이징 기법 (Virtual Memory & Paging)',
    durationSeconds: 1680, // 28분
    langMode: 'EN_KO',
    status: 'COMPLETED',
    entryCount: 6,
    createdAt: '2026-09-29T10:00:00Z',
    studyPack: INITIAL_STUDY_PACK,
  },
  {
    id: 'rec-2',
    subjectId: 'sub-1',
    title: '03강: 프로세스 동기화와 데드락 해결 알고리즘',
    durationSeconds: 2100, // 35분
    langMode: 'EN_KO',
    status: 'COMPLETED',
    entryCount: 4,
    createdAt: '2026-09-27T14:30:00Z',
  },
];

export const INITIAL_ENTRIES: Record<string, TranscriptEntryItem[]> = {
  'rec-1': [
    {
      id: 'ent-1',
      recordingId: 'rec-1',
      chunkSeq: 1,
      timestampMs: 5000,
      timeFormatted: '00:05',
      originalText: "Welcome back everyone. Today we're going to dive deep into Virtual Memory and the Memory Management Unit.",
      translatedText: "여러분 다시 환영합니다. 오늘은 가상 메모리와 메모리 관리 장치(MMU)의 핵심 아키텍처에 대해 깊이 파고들어 보겠습니다.",
      confidence: 0.99,
      isKeyPoint: false,
    },
    {
      id: 'ent-2',
      recordingId: 'rec-1',
      chunkSeq: 2,
      timestampMs: 28000,
      timeFormatted: '00:28',
      originalText: "The fundamental goal of virtual memory is to provide each process with an illusion of contiguous physical memory.",
      translatedText: "가상 메모리의 근본적인 목표는 각 프로세스에 연속된 물리 메모리를 독점하고 있다는 착각(추상화)을 제공하는 것입니다.",
      confidence: 0.98,
      isKeyPoint: true,
    },
    {
      id: 'ent-3',
      recordingId: 'rec-1',
      chunkSeq: 3,
      timestampMs: 74000,
      timeFormatted: '01:14',
      originalText: "When the CPU requests a virtual address that isn't currently mapped in physical RAM, hardware raises a page fault.",
      translatedText: "CPU가 현재 물리 RAM에 매핑되지 않은 가상 주소를 요청할 때, 하드웨어는 페이지 폴트(Page Fault) 예외를 발생시킵니다.",
      confidence: 0.99,
      isKeyPoint: true,
    },
    {
      id: 'ent-4',
      recordingId: 'rec-1',
      chunkSeq: 4,
      timestampMs: 125000,
      timeFormatted: '02:05',
      originalText: "Notice this carefully, because this is a classic midterm exam question: how does the OS handle a dirty bit during page replacement?",
      translatedText: "이 부분을 주의 깊게 보셔야 합니다. 중간고사의 전형적인 출제 포인트인데요, 페이지 교체 시 OS가 더티 비트(Dirty Bit)를 어떻게 처리할까요?",
      confidence: 0.97,
      isKeyPoint: true,
    },
    {
      id: 'ent-5',
      recordingId: 'rec-1',
      chunkSeq: 5,
      timestampMs: 195000,
      timeFormatted: '03:15',
      originalText: "The Translation Lookaside Buffer, or TLB, acts as a high-speed hardware cache for page table entries.",
      translatedText: "변환 참조 버퍼(TLB)는 페이지 테이블 항목을 위한 고속 하드웨어 캐시 역할을 수행합니다.",
      confidence: 0.99,
      isKeyPoint: true,
    },
    {
      id: 'ent-6',
      recordingId: 'rec-1',
      chunkSeq: 6,
      timestampMs: 270000,
      timeFormatted: '04:30',
      originalText: "If we get a TLB hit, address translation takes approximately one clock cycle. In a TLB miss, we must walk the multi-level page table.",
      translatedText: "TLB 적중(Hit) 시 주소 변환은 약 1클럭 사이클 내에 끝나지만, TLB 실패(Miss) 시에는 다단계 페이지 테이블을 직접 순회해야 합니다.",
      confidence: 0.98,
      isKeyPoint: true,
    },
  ],
};

const STORAGE_KEY_USER = 'ls_user_v1';
const STORAGE_KEY_SUBJECTS = 'ls_subjects_v1';
const STORAGE_KEY_RECORDINGS = 'ls_recordings_v1';
const STORAGE_KEY_ENTRIES = 'ls_entries_v1';

export function getStoredUser(): UserProfile {
  if (typeof window === 'undefined') return INITIAL_USER;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER);
    return raw ? JSON.parse(raw) : INITIAL_USER;
  } catch {
    return INITIAL_USER;
  }
}

export function saveStoredUser(user: UserProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
}

export function getStoredSubjects(): SubjectItem[] {
  if (typeof window === 'undefined') return INITIAL_SUBJECTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SUBJECTS);
    return raw ? JSON.parse(raw) : INITIAL_SUBJECTS;
  } catch {
    return INITIAL_SUBJECTS;
  }
}

export function saveStoredSubjects(subjects: SubjectItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_SUBJECTS, JSON.stringify(subjects));
}

export function getStoredRecordings(): RecordingItem[] {
  if (typeof window === 'undefined') return INITIAL_RECORDINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RECORDINGS);
    return raw ? JSON.parse(raw) : INITIAL_RECORDINGS;
  } catch {
    return INITIAL_RECORDINGS;
  }
}

export function saveStoredRecordings(recordings: RecordingItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_RECORDINGS, JSON.stringify(recordings));
}

export function getStoredEntries(recordingId: string): TranscriptEntryItem[] {
  if (typeof window === 'undefined') return INITIAL_ENTRIES[recordingId] || [];
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_ENTRIES}_${recordingId}`);
    return raw ? JSON.parse(raw) : (INITIAL_ENTRIES[recordingId] || []);
  } catch {
    return INITIAL_ENTRIES[recordingId] || [];
  }
}

export function saveStoredEntries(recordingId: string, entries: TranscriptEntryItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`${STORAGE_KEY_ENTRIES}_${recordingId}`, JSON.stringify(entries));
}
