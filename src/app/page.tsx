'use client';

import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  SubjectItem,
  RecordingItem,
  TranscriptEntryItem,
  LangMode,
  AiStudyPackData,
} from '../lib/types';
import {
  getStoredUser,
  saveStoredUser,
  getStoredSubjects,
  saveStoredSubjects,
  getStoredRecordings,
  saveStoredRecordings,
  getStoredEntries,
  saveStoredEntries,
  INITIAL_STUDY_PACK,
} from '../lib/store';
import { Navbar } from '../components/Navbar';
import { LiveRecorderView } from '../components/LiveRecorderView';
import { StudyIntelligencePanel } from '../components/StudyIntelligencePanel';
import { SubjectManagerModal } from '../components/SubjectManagerModal';
import { PricingModal } from '../components/PricingModal';
import { Activity, BookOpen, Layers, Sparkles, Clock, Calendar, CheckCircle } from 'lucide-react';

export default function Home() {
  const [activeView, setActiveView] = useState<'live' | 'saved' | 'subjects' | 'pricing'>('saved');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);
  const [currentSubjectId, setCurrentSubjectId] = useState<string>('sub-1');
  const [recordings, setRecordings] = useState<RecordingItem[]>([]);
  const [currentRecordingId, setCurrentRecordingId] = useState<string>('rec-1');
  const [liveEntries, setLiveEntries] = useState<TranscriptEntryItem[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [langMode, setLangMode] = useState<LangMode>('EN_KO');

  // Modals
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  useEffect(() => {
    setUser(getStoredUser());
    const loadedSubs = getStoredSubjects();
    setSubjects(loadedSubs);
    if (loadedSubs.length > 0) setCurrentSubjectId(loadedSubs[0].id);

    const loadedRecs = getStoredRecordings();
    setRecordings(loadedRecs);
    if (loadedRecs.length > 0) {
      setCurrentRecordingId(loadedRecs[0].id);
      setLiveEntries(getStoredEntries(loadedRecs[0].id));
    }
  }, []);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080b11] text-zinc-400">
        <div className="flex flex-col items-center gap-3">
          <Activity className="h-10 w-10 text-cyan-400 animate-pulse" />
          <p className="text-sm font-semibold tracking-wide">LectureSync AI 부팅 중...</p>
        </div>
      </div>
    );
  }

  const currentSubject = subjects.find((s) => s.id === currentSubjectId) || subjects[0];
  const currentRecording = recordings.find((r) => r.id === currentRecordingId) || recordings[0];

  const handleToggleRecording = () => {
    if (!isRecording) {
      setActiveView('live');
    }
    setIsRecording(!isRecording);
  };

  const handleAddLiveEntry = (newEntry: TranscriptEntryItem) => {
    const updated = [...liveEntries, newEntry];
    setLiveEntries(updated);
    saveStoredEntries(currentRecordingId, updated);
  };

  const handleFinalizeRecording = () => {
    setIsRecording(false);

    // Attach complete AI study pack
    const updatedRecs = recordings.map((rec) => {
      if (rec.id === currentRecordingId) {
        return {
          ...rec,
          status: 'COMPLETED' as const,
          studyPack: INITIAL_STUDY_PACK,
          entryCount: liveEntries.length,
        };
      }
      return rec;
    });

    setRecordings(updatedRecs);
    saveStoredRecordings(updatedRecs);

    // Switch to Saved tab
    setActiveView('saved');
  };

  const handleAddSubject = (newSubData: Partial<SubjectItem>) => {
    const newSub: SubjectItem = {
      id: newSubData.id || `sub-${Date.now()}`,
      name: newSubData.name || '새 과목',
      professor: newSubData.professor || '담당 교수',
      semester: newSubData.semester || '2026-2학기',
      colorHex: newSubData.colorHex || '#3b82f6',
      glossary: newSubData.glossary || [],
    };

    const updated = [newSub, ...subjects];
    setSubjects(updated);
    saveStoredSubjects(updated);
    setCurrentSubjectId(newSub.id);
  };

  return (
    <div className="min-h-screen bg-[#080b11] text-zinc-100 flex flex-col">
      {/* Top Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={(v) => {
          if (v === 'subjects') {
            setIsSubjectModalOpen(true);
          } else if (v === 'pricing') {
            setIsPricingModalOpen(true);
          } else {
            setActiveView(v);
          }
        }}
        user={user}
        langMode={langMode}
        setLangMode={setLangMode}
        isRecording={isRecording}
        onToggleRecording={handleToggleRecording}
        currentSubjectName={currentSubject?.name || '과목 선택'}
      />

      {/* Main Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Live Recording Stream View */}
        {activeView === 'live' && (
          <LiveRecorderView
            entries={liveEntries}
            isRecording={isRecording}
            onToggleRecording={handleToggleRecording}
            onFinalizeRecording={handleFinalizeRecording}
            currentSubject={currentSubject}
            onAddLiveEntry={handleAddLiveEntry}
          />
        )}

        {/* Saved Lecture & AI Study Intelligence View */}
        {activeView === 'saved' && (
          <div className="space-y-6">
            {/* Lecture Sessions Selector Bar */}
            <div className="rounded-2xl border border-white/10 bg-[#0f1422] p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {currentRecording?.title || '저장된 강의 대본'}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {currentSubject?.name} · {Math.round((currentRecording?.durationSeconds || 1680) / 60)}분 분량 · STT 전사 완료
                  </p>
                </div>
              </div>

              {/* Lecture Switcher Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500 hidden sm:inline">강의 선택:</span>
                <select
                  value={currentRecordingId}
                  onChange={(e) => {
                    const nextId = e.target.value;
                    setCurrentRecordingId(nextId);
                    setLiveEntries(getStoredEntries(nextId));
                  }}
                  className="rounded-xl border border-white/10 bg-[#0a0d16] px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none cursor-pointer"
                >
                  {recordings.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => {
                    setActiveView('live');
                    setIsRecording(true);
                  }}
                  className="rounded-xl bg-cyan-500 px-3 py-2 text-xs font-bold text-white hover:bg-cyan-400 shadow-md shadow-cyan-500/25 transition-all"
                >
                  새 강의 녹음
                </button>
              </div>
            </div>

            {/* AI Study Intelligence Panel */}
            <StudyIntelligencePanel
              studyPack={currentRecording?.studyPack || INITIAL_STUDY_PACK}
              recordingTitle={currentRecording?.title || '강의'}
              entries={liveEntries}
              onJumpToEntry={(ts) => {
                setActiveView('live');
              }}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#05070c] py-8 text-center text-xs text-zinc-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-cyan-400" />
            <span className="font-bold text-zinc-300">LectureSync AI</span>
            <span>· Cloudflare/Soniox STT + Gemini 3.1 Flash-Lite + 과목별 전공 용어 사전</span>
          </div>
          <p className="text-zinc-500">
            토스페이먼츠 종량제 빌링키 · 무유실 오프라인 Outbox · 타임스탬프 동기화 대본
          </p>
        </div>
      </footer>

      {/* Subjects & Glossary Manager Modal */}
      <SubjectManagerModal
        isOpen={isSubjectModalOpen}
        onClose={() => setIsSubjectModalOpen(false)}
        subjects={subjects}
        currentSubjectId={currentSubjectId}
        onSelectSubject={(id) => setCurrentSubjectId(id)}
        onAddSubject={handleAddSubject}
      />

      {/* Pricing Modal */}
      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        currentPlan={user.plan}
      />
    </div>
  );
}
