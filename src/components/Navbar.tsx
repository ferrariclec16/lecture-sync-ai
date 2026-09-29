'use client';

import React from 'react';
import { UserProfile, LangMode } from '../lib/types';
import { Mic, Activity, Sparkles, BookOpen, Layers, CreditCard, ChevronRight } from 'lucide-react';

interface NavbarProps {
  activeView: 'live' | 'saved' | 'subjects' | 'pricing';
  setActiveView: (view: 'live' | 'saved' | 'subjects' | 'pricing') => void;
  user: UserProfile;
  langMode: LangMode;
  setLangMode: (mode: LangMode) => void;
  isRecording: boolean;
  onToggleRecording: () => void;
  currentSubjectName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  user,
  langMode,
  setLangMode,
  isRecording,
  onToggleRecording,
  currentSubjectName,
}) => {
  const hoursLeft = Math.max(0, (user.monthlySecondsTotal - user.monthlySecondsUsed) / 3600).toFixed(1);
  const totalHours = (user.monthlySecondsTotal / 3600).toFixed(1);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0d14]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand & Breadcrumbs */}
        <div className="flex items-center gap-6">
          <div
            onClick={() => setActiveView('saved')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 shadow-lg shadow-cyan-500/25">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-white">LectureSync</span>
                <span className="rounded-md bg-cyan-500/20 px-2 py-0.5 text-[11px] font-bold text-cyan-400 border border-cyan-500/30">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-medium hidden sm:block">
                실시간 강의 오디오 번역 & AI 시험 족보
              </p>
            </div>
          </div>

          {/* Breadcrumb Path */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-400 pl-4 border-l border-white/10">
            <span className="hover:text-white cursor-pointer" onClick={() => setActiveView('subjects')}>
              내 과목
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
            <span className="text-cyan-400 font-semibold">{currentSubjectName}</span>
          </div>
        </div>

        {/* Center / Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#121623] p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setActiveView('live')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
              activeView === 'live'
                ? 'bg-cyan-500 text-white shadow'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Mic className="h-3.5 w-3.5" />
            실시간 전사/통역
          </button>
          <button
            onClick={() => setActiveView('saved')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
              activeView === 'saved'
                ? 'bg-cyan-500 text-white shadow'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            대본 & AI 학습팩
          </button>
          <button
            onClick={() => setActiveView('subjects')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
              activeView === 'subjects'
                ? 'bg-cyan-500 text-white shadow'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            과목 & 전문 용어집
          </button>
          <button
            onClick={() => setActiveView('pricing')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
              activeView === 'pricing'
                ? 'bg-cyan-500 text-white shadow'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <CreditCard className="h-3.5 w-3.5" />
            요금제
          </button>
        </nav>

        {/* Right Actions & Metered Usage */}
        <div className="flex items-center gap-3">
          {/* Language Mode Selector */}
          <div className="hidden sm:flex items-center gap-1.5 bg-[#121623] px-2.5 py-1.5 rounded-xl border border-white/10 text-xs">
            <span className="text-zinc-400 text-[11px] font-medium">언어:</span>
            <select
              value={langMode}
              onChange={(e) => setLangMode(e.target.value as LangMode)}
              className="bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer"
            >
              <option value="EN_KO" className="bg-[#121623] text-white">영어 → 한국어</option>
              <option value="JA_KO" className="bg-[#121623] text-white">일본어 → 한국어</option>
              <option value="ZH_KO" className="bg-[#121623] text-white">중국어 → 한국어</option>
              <option value="AUTO" className="bg-[#121623] text-white">자동 감지 (Auto)</option>
            </select>
          </div>

          {/* Metered Time Credit Badge */}
          <div
            onClick={() => setActiveView('pricing')}
            className="hidden lg:flex items-center gap-2 bg-[#121623] px-3 py-1.5 rounded-xl border border-white/10 cursor-pointer hover:border-cyan-500/50 transition-all text-xs"
          >
            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-zinc-400">잔여 시간:</span>
            <span className="font-bold text-white">{hoursLeft}h / {totalHours}h</span>
          </div>

          {/* Record CTA Button */}
          <button
            onClick={onToggleRecording}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-lg transition-all active:scale-95 ${
              isRecording
                ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30 animate-pulse'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 shadow-cyan-500/25'
            }`}
          >
            <Mic className="h-4 w-4" />
            <span>{isRecording ? '녹음 일시정지' : '강의 녹음 시작'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
