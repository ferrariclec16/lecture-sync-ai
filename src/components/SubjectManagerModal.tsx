'use client';

import React, { useState } from 'react';
import { SubjectItem, GlossaryTerm } from '../lib/types';
import { X, Plus, BookOpen, Layers, Check, Trash2 } from 'lucide-react';

interface SubjectManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjects: SubjectItem[];
  currentSubjectId: string;
  onSelectSubject: (id: string) => void;
  onAddSubject: (subject: Partial<SubjectItem>) => void;
}

export const SubjectManagerModal: React.FC<SubjectManagerModalProps> = ({
  isOpen,
  onClose,
  subjects,
  currentSubjectId,
  onSelectSubject,
  onAddSubject,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [professor, setProfessor] = useState('');
  const [termEn, setTermEn] = useState('');
  const [termKo, setTermKo] = useState('');

  if (!isOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const glossary: GlossaryTerm[] = termEn.trim() && termKo.trim()
      ? [{ en: termEn, ko: termKo, definition: '사용자 지정 전공 용어' }]
      : [];

    onAddSubject({
      id: `sub-${Date.now()}`,
      name,
      professor: professor || '담당 교수',
      semester: '2026-2학기',
      colorHex: '#3b82f6',
      glossary,
    });

    setName('');
    setProfessor('');
    setTermEn('');
    setTermKo('');
    setIsAdding(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0f1422] p-6 sm:p-8 shadow-2xl text-white space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-zinc-400 hover:text-white hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </button>

        <div>
          <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <Layers className="h-5 w-5 text-cyan-400" />
            내 수강 과목 & 전용 용어집(Glossary) 관리
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            과목별로 전공 용어 사전을 등록해두면, 실시간 강의 음성인식 시 전문 용어가 왜곡 없이 완벽하게 번역됩니다.
          </p>
        </div>

        {/* Subjects List */}
        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          {subjects.map((sub) => (
            <div
              key={sub.id}
              onClick={() => {
                onSelectSubject(sub.id);
                onClose();
              }}
              className={`cursor-pointer rounded-2xl border p-4 transition-all flex items-center justify-between ${
                sub.id === currentSubjectId
                  ? 'border-cyan-500 bg-cyan-950/20 shadow-md'
                  : 'border-white/10 bg-[#0a0d16] hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{sub.name}</span>
                  {sub.id === currentSubjectId && (
                    <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-bold text-cyan-400 border border-cyan-500/30">
                      선택됨
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {sub.professor} · {sub.semester} · 용어집 {sub.glossary.length}개 활성
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-cyan-400 font-semibold">
                  {sub.glossary.map((g) => g.en).slice(0, 2).join(', ')}...
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Subject Section */}
        {isAdding ? (
          <form onSubmit={handleCreate} className="rounded-2xl border border-white/10 bg-[#0a0d16] p-4 space-y-3">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              새 과목 및 초기 용어 등록
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-zinc-400 font-medium">과목명 (예: 컴퓨터 네트워크)</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="과목명 입력..."
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#121623] px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-zinc-400 font-medium">교수명 / 대학</label>
                <input
                  type="text"
                  value={professor}
                  onChange={(e) => setProfessor(e.target.value)}
                  placeholder="예: Prof. Kurose"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#121623] px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[11px] text-zinc-400 font-medium">영어 전문용어 (선택)</label>
                <input
                  type="text"
                  value={termEn}
                  onChange={(e) => setTermEn(e.target.value)}
                  placeholder="예: packet switching"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#121623] px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-zinc-400 font-medium">한국어 목표 번역</label>
                <input
                  type="text"
                  value={termKo}
                  onChange={(e) => setTermKo(e.target.value)}
                  placeholder="예: 패킷 교환"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#121623] px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="rounded-xl px-3 py-1.5 text-xs text-zinc-400 hover:text-white"
              >
                취소
              </button>
              <button
                type="submit"
                className="rounded-xl bg-cyan-500 px-4 py-1.5 text-xs font-bold text-white hover:bg-cyan-400"
              >
                과목 추가 완료
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 py-3 text-xs font-bold text-zinc-300 hover:border-cyan-500 hover:text-cyan-400 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>새 과목 등록하기</span>
          </button>
        )}
      </div>
    </div>
  );
};
