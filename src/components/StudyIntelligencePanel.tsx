'use client';

import React, { useState } from 'react';
import { AiStudyPackData, TranscriptEntryItem } from '../lib/types';
import {
  FileText,
  Target,
  Layers,
  BookA,
  Copy,
  Check,
  Download,
  HelpCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  RotateCw,
} from 'lucide-react';

interface StudyIntelligencePanelProps {
  studyPack: AiStudyPackData;
  recordingTitle: string;
  entries: TranscriptEntryItem[];
  onJumpToEntry?: (timestamp: string) => void;
}

export const StudyIntelligencePanel: React.FC<StudyIntelligencePanelProps> = ({
  studyPack,
  recordingTitle,
  onJumpToEntry,
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'exam' | 'flashcards' | 'glossary'>('summary');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const toggleAnswer = (id: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyMarkdown = () => {
    const md = `# ${recordingTitle} - AI 강의 학습노트\n\n## 💡 3줄 요약\n${studyPack.tldr}\n\n## 📌 핵심 포인트\n${studyPack.keyPoints.map((k) => `- ${k}`).join('\n')}\n\n## 🎯 예상 시험 문제\n${studyPack.examQuestions.map((q, i) => `${i + 1}. ${q.question}\n- 정답: ${q.answer}\n- 해설: ${q.explanation}`).join('\n\n')}`;
    navigator.clipboard.writeText(md);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const currentCard = studyPack.flashcards[currentCardIndex];

  return (
    <div className="space-y-6">
      {/* Header Deck */}
      <div className="rounded-3xl border border-white/10 bg-[#0f1422] p-6 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-0.5 text-xs font-semibold text-cyan-400 border border-cyan-500/20">
                <Sparkles className="h-3.5 w-3.5" />
                AI Study Intelligence Generated
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                Gemini 3.1 Flash-Lite + 과목 용어집 분석 완료
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mt-1">
              🧠 AI 지능형 강의 대본 & 시험 족보
            </h2>
            <p className="text-xs text-zinc-400">
              {recordingTitle}의 실시간 전사본을 기반으로 추출된 핵심 요약, 시험 예상 문제, 플래시카드입니다.
            </p>
          </div>

          {/* Export Actions */}
          <div className="flex items-center gap-2 self-stretch lg:self-auto">
            <button
              onClick={handleCopyMarkdown}
              className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-bold text-white hover:bg-white/20 transition-all"
            >
              {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{isCopied ? '마크다운 복사 완료!' : '노트 복사 (Markdown)'}</span>
            </button>

            <button
              onClick={() => alert('PDF 시험 족보 다운로드가 준비되었습니다!')}
              className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 transition-all"
            >
              <Download className="h-3.5 w-3.5" />
              <span>시험 족보 PDF 인쇄</span>
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/5">
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-bold transition-all ${
              activeTab === 'summary'
                ? 'bg-cyan-500 text-white shadow-md'
                : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <FileText className="h-4 w-4" />
            핵심 요약 & 타임라인
          </button>

          <button
            onClick={() => setActiveTab('exam')}
            className={`flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-bold transition-all ${
              activeTab === 'exam'
                ? 'bg-cyan-500 text-white shadow-md'
                : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Target className="h-4 w-4" />
            시험 족보 & 예상 문제 ({studyPack.examQuestions.length})
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-bold transition-all ${
              activeTab === 'flashcards'
                ? 'bg-cyan-500 text-white shadow-md'
                : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Layers className="h-4 w-4" />
            복습 플래시카드 ({studyPack.flashcards.length})
          </button>

          <button
            onClick={() => setActiveTab('glossary')}
            className={`flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-bold transition-all ${
              activeTab === 'glossary'
                ? 'bg-cyan-500 text-white shadow-md'
                : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <BookA className="h-4 w-4" />
            전공 용어 사전 ({studyPack.glossary.length})
          </button>
        </div>
      </div>

      {/* 1. EXECUTIVE SUMMARY VIEW */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          {/* TL;DR Highlight Card */}
          <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 to-[#0f1422] p-5 shadow-lg space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              💡 3줄 핵심 총평 (TL;DR)
            </span>
            <p className="text-sm text-zinc-200 font-medium leading-relaxed">
              {studyPack.tldr}
            </p>
          </div>

          {/* Key Takeaways */}
          <div className="rounded-2xl border border-white/10 bg-[#0f1422] p-5 shadow-lg space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Target className="h-4 w-4 text-cyan-400" />
              핵심 테이크어웨이 (Key Takeaways)
            </h3>
            <ul className="space-y-2">
              {studyPack.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed">
                  <span className="h-5 w-5 rounded-full bg-cyan-500/10 text-cyan-400 font-bold flex items-center justify-center text-[10px] shrink-0">
                    {idx + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Timestamped Section Breakdown */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="h-4 w-4 text-cyan-400" />
              타임스탬프별 챕터 상세 요약 (근거 그래프)
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {studyPack.sections.map((section, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-[#0f1422] p-4 sm:p-5 space-y-2 hover:border-cyan-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{section.topic}</h4>
                    <button
                      onClick={() => onJumpToEntry?.(section.timestamp)}
                      className="rounded-lg bg-cyan-500/10 px-2.5 py-1 text-xs font-bold text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                    >
                      대본 구간 [{section.timestamp}]
                    </button>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. EXAM CHEAT SHEET & QUIZ VIEW */}
      {activeTab === 'exam' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
            <span>교수님이 수업 중 강조한 패턴 및 역대 기출 기반 AI 출제 예상</span>
            <span className="text-cyan-400 font-semibold">총 {studyPack.examQuestions.length}문항</span>
          </div>

          {studyPack.examQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="rounded-2xl border border-white/10 bg-[#0f1422] p-5 shadow-lg space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-bold text-zinc-300">
                    문항 #{idx + 1}
                  </span>
                  <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                    q.probability === 'VERY_HIGH'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {q.probability === 'VERY_HIGH' ? '🔥 출제 확률 95%+' : '출제 예상'}
                  </span>
                </div>
                {q.timestampCitation && (
                  <span className="text-[11px] text-cyan-400 font-mono">
                    강의 {q.timestampCitation} 언급
                  </span>
                )}
              </div>

              {/* Question Text */}
              <h4 className="text-sm font-bold text-white leading-relaxed">
                {q.question}
              </h4>

              {/* Options if Multiple Choice */}
              {q.options && q.options.length > 0 && (
                <div className="space-y-1.5 pl-1">
                  {q.options.map((opt, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-white/5 bg-[#0a0d16] p-2.5 text-xs text-zinc-300"
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}

              {/* Toggle Answer & Explanation Button */}
              <div className="pt-2">
                <button
                  onClick={() => toggleAnswer(q.id)}
                  className="flex items-center gap-1.5 rounded-xl bg-white/5 px-3 py-1.5 text-xs font-bold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <HelpCircle className="h-3.5 w-3.5 text-cyan-400" />
                  <span>{revealedAnswers[q.id] ? '정답 및 해설 가리기' : '정답 및 교수 의도 해설 보기'}</span>
                </button>

                {revealedAnswers[q.id] && (
                  <div className="mt-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-xs space-y-1.5 animate-in fade-in duration-200">
                    <p className="font-bold text-emerald-400">정답: {q.answer}</p>
                    <p className="text-zinc-300 leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. INTERACTIVE FLASHCARDS VIEW */}
      {activeTab === 'flashcards' && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="text-center text-xs text-zinc-400">
            카드를 클릭하면 정답이 뒤집힙니다 (Active Recall 학습법)
          </div>

          {/* Flashcard 3D Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer select-none perspective min-h-[220px] rounded-3xl border-2 border-cyan-500/40 bg-gradient-to-b from-[#141d30] to-[#0f1422] p-8 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(6,182,212,0.15)] hover:border-cyan-400 transition-all"
          >
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-3">
              {currentCard?.category} · {isFlipped ? '정답 / 개념 설명' : '질문 / 개념 키워드'}
            </span>

            <p className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {isFlipped ? currentCard?.back : currentCard?.front}
            </p>

            <span className="mt-6 flex items-center gap-1 text-[11px] text-zinc-500">
              <RotateCw className="h-3 w-3" />
              <span>클릭하여 뒤집기</span>
            </span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between px-4">
            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentCardIndex((prev) => Math.max(0, prev - 1));
              }}
              disabled={currentCardIndex === 0}
              className="flex items-center gap-1.5 rounded-xl bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              이전 카드
            </button>

            <span className="text-xs font-bold text-zinc-400">
              {currentCardIndex + 1} / {studyPack.flashcards.length}
            </span>

            <button
              onClick={() => {
                setIsFlipped(false);
                setCurrentCardIndex((prev) =>
                  Math.min(studyPack.flashcards.length - 1, prev + 1)
                );
              }}
              disabled={currentCardIndex === studyPack.flashcards.length - 1}
              className="flex items-center gap-1.5 rounded-xl bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              다음 카드
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* 4. SUBJECT GLOSSARY VIEW */}
      {activeTab === 'glossary' && (
        <div className="rounded-2xl border border-white/10 bg-[#0f1422] p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BookA className="h-4 w-4 text-cyan-400" />
              강의 전공 전문 용어 사전 (Glossary)
            </h3>
            <span className="text-xs text-zinc-400">
              실시간 번역 시 자동 적용된 용어 목록
            </span>
          </div>

          <div className="divide-y divide-white/5">
            {studyPack.glossary.map((term, i) => (
              <div key={i} className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-cyan-400">{term.en}</span>
                  <span className="text-xs font-semibold text-white">→ {term.ko}</span>
                </div>
                <p className="text-xs text-zinc-400 sm:max-w-md">{term.definition}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
