export type PlanType = 'FREE' | 'PRO' | 'MAX' | 'ENTERPRISE';

export type LangMode = 'AUTO' | 'EN_KO' | 'JA_KO' | 'ZH_KO' | 'KO_EN';

export type RecordingStatus = 'RECORDING' | 'PROCESSING' | 'COMPLETED';

export interface GlossaryTerm {
  en: string;
  ko: string;
  definition: string;
  category?: string;
}

export interface ExamQuestion {
  id: string;
  type: 'MULTIPLE_CHOICE' | 'SHORT_ANSWER' | 'ESSAY';
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
  probability: 'HIGH' | 'VERY_HIGH';
  timestampCitation?: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
}

export interface SummarySection {
  timestamp: string;
  topic: string;
  content: string;
}

export interface AiStudyPackData {
  tldr: string;
  keyPoints: string[];
  sections: SummarySection[];
  examQuestions: ExamQuestion[];
  flashcards: Flashcard[];
  glossary: GlossaryTerm[];
}

export interface TranscriptEntryItem {
  id: string;
  recordingId: string;
  chunkSeq: number;
  timestampMs: number;
  timeFormatted: string;
  originalText: string;
  translatedText: string;
  confidence: number;
  isKeyPoint?: boolean;
}

export interface SubjectItem {
  id: string;
  name: string;
  professor: string;
  semester: string;
  colorHex: string;
  glossary: GlossaryTerm[];
}

export interface RecordingItem {
  id: string;
  subjectId: string;
  title: string;
  durationSeconds: number;
  langMode: LangMode;
  status: RecordingStatus;
  entryCount: number;
  createdAt: string;
  studyPack?: AiStudyPackData;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  plan: PlanType;
  monthlySecondsTotal: number;
  monthlySecondsUsed: number;
  aiCreditsTotal: number;
  aiCreditsUsed: number;
}
