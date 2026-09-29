'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TranscriptEntryItem, SubjectItem } from '../lib/types';
import { Mic, MicOff, Square, Play, Pause, Sparkles, Activity, ShieldCheck, Volume2, Bookmark, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LiveRecorderViewProps {
  entries: TranscriptEntryItem[];
  isRecording: boolean;
  onToggleRecording: () => void;
  onFinalizeRecording: () => void;
  currentSubject: SubjectItem;
  onAddLiveEntry: (entry: TranscriptEntryItem) => void;
}

export const LiveRecorderView: React.FC<LiveRecorderViewProps> = ({
  entries,
  isRecording,
  onToggleRecording,
  onFinalizeRecording,
  currentSubject,
  onAddLiveEntry,
}) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [simulatedChunkIndex, setSimulatedChunkIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Audio Waveform Visualizer Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let step = 0;

    const renderWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = isRecording ? '#06b6d4' : '#3f3f46';

      const bars = 36;
      const barWidth = width / bars;

      for (let i = 0; i < bars; i++) {
        const x = i * barWidth + barWidth / 2;
        let amplitude = 4;
        if (isRecording) {
          amplitude = Math.sin(step * 0.15 + i * 0.4) * 16 + Math.cos(step * 0.1 + i * 0.2) * 12 + 10;
        }
        ctx.moveTo(x, centerY - amplitude);
        ctx.lineTo(x, centerY + amplitude);
      }
      ctx.stroke();

      step++;
      animationId = requestAnimationFrame(renderWave);
    };

    renderWave();
    return () => cancelAnimationFrame(animationId);
  }, [isRecording]);

  // Live Simulated Streaming Chunks when recording is on
  useEffect(() => {
    if (!isRecording) return;

    const SIMULATED_STREAMS = [
      {
        en: "Now let's examine what happens in the hardware Memory Management Unit when a virtual page number is looked up.",
        ko: "이제 가상 페이지 번호(VPN)가 조회될 때 하드웨어 메모리 관리 장치(MMU) 내부에서 어떤 일이 일어나는지 살펴보겠습니다.",
      },
      {
        en: "The processor checks the TLB first. A TLB hit avoids accessing physical memory for the page table, making memory access instantaneous.",
        ko: "프로세서는 먼저 [변환 참조 버퍼(TLB)]를 확인합니다. TLB 적중 시 페이지 테이블을 위한 물리 메모리 접근을 건너뛰어 즉각적인 메모리 액세스가 가능해집니다.",
      },
      {
        en: "If the entry is absent, we have a TLB miss, forcing a page table walk through RAM, which can cost dozens of cycles.",
        ko: "엔트리가 없으면 TLB 실패(Miss)가 발생하여 RAM을 통한 페이지 테이블 순회가 강제되며, 이로 인해 수십 클럭 사이클의 지연이 발생할 수 있습니다.",
      },
    ];

    const timer = setInterval(() => {
      const sample = SIMULATED_STREAMS[simulatedChunkIndex % SIMULATED_STREAMS.length];
      const newSeq = entries.length + 1;
      const currentSeconds = newSeq * 15;
      const mins = Math.floor(currentSeconds / 60).toString().padStart(2, '0');
      const secs = (currentSeconds % 60).toString().padStart(2, '0');

      onAddLiveEntry({
        id: `live-ent-${Date.now()}`,
        recordingId: 'rec-1',
        chunkSeq: newSeq,
        timestampMs: currentSeconds * 1000,
        timeFormatted: `${mins}:${secs}`,
        originalText: sample.en,
        translatedText: sample.ko,
        confidence: 0.98,
        isKeyPoint: true,
      });

      setSimulatedChunkIndex((prev) => prev + 1);
    }, 6500);

    return () => clearInterval(timer);
  }, [isRecording, entries.length, simulatedChunkIndex, onAddLiveEntry]);

  const handleFinish = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#3b82f6', '#10b981'],
    });
    onFinalizeRecording();
  };

  return (
    <div className="space-y-6">
      {/* Top Waveform & Hardware Audio Control Deck */}
      <div className="rounded-3xl border border-white/10 bg-[#0f1422] p-6 shadow-2xl relative overflow-hidden space-y-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-semibold border ${
                isRecording
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                  : 'bg-zinc-800 text-zinc-400 border-white/5'
              }`}>
                <span className={`h-2 w-2 rounded-full ${isRecording ? 'bg-cyan-400 animate-ping' : 'bg-zinc-500'}`} />
                {isRecording ? '실시간 강의 오디오 수신 중 (Live Streaming)' : '녹음 대기 중 (Ready)'}
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                과목: <strong>{currentSubject.name}</strong>
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              🎙️ 실시간 강의 음성인식 & 다국어 동시통역
            </h2>
            <p className="text-xs text-zinc-400">
              교수님의 영어/외국어 음성을 실시간 VAD 청크로 수신하여 한국어 전문 용어집이 적용된 대본으로 번역합니다.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2.5 self-stretch md:self-auto">
            <button
              onClick={onToggleRecording}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-xs font-bold text-white shadow-xl transition-all active:scale-95 ${
                isRecording
                  ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/25'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 shadow-cyan-500/25'
              }`}
            >
              {isRecording ? <Pause className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              <span>{isRecording ? '일시 정지' : '강의 녹음 시작'}</span>
            </button>

            <button
              onClick={handleFinish}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 px-5 py-3 text-xs font-bold text-white shadow-xl shadow-emerald-500/25 active:scale-95 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              <span>녹음 완료 & AI 족보 생성</span>
            </button>
          </div>
        </div>

        {/* Dynamic Waveform Visualizer & Telemetry Stats */}
        <div className="rounded-2xl border border-white/5 bg-[#0a0d16] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-64 h-12 flex items-center justify-center">
            <canvas ref={canvasRef} width={250} height={40} className="w-full h-full" />
          </div>

          {/* Engine Latency & Fallback Metrics */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-zinc-500">STT 엔진:</span>
              <span className="font-semibold text-cyan-300">Cloudflare Whisper v3</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 border-l border-white/10 pl-3">
              <span className="text-zinc-500">지연 시간:</span>
              <span className="font-semibold text-emerald-400">p50 1.8s / p95 3.1s</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 border-l border-white/10 pl-3">
              <span className="text-zinc-500">용어집(Glossary):</span>
              <span className="font-semibold text-amber-400">{currentSubject.glossary.length}개 용어 주입됨</span>
            </div>
          </div>
        </div>
      </div>

      {/* Synchronized Real-time Dual-Language Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Activity className="h-4 w-4 text-cyan-400" />
            실시간 동기화 대본 타임라인 ({entries.length}개 세그먼트)
          </h3>
          <span className="text-xs text-zinc-500">
            타임스탬프를 클릭하면 해당 구간 음성이 재생됩니다
          </span>
        </div>

        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={`rounded-2xl border p-4 sm:p-5 transition-all space-y-3 group ${
                playingId === entry.id
                  ? 'border-cyan-500 bg-[#0f192b]'
                  : 'border-white/10 bg-[#0f1422] hover:border-white/20'
              }`}
            >
              {/* Header: Timestamp & Chunk Badge */}
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPlayingId(playingId === entry.id ? null : entry.id)}
                    className="flex items-center gap-1.5 rounded-lg bg-cyan-500/10 px-2.5 py-1 text-cyan-400 font-bold hover:bg-cyan-500/20 transition-colors"
                  >
                    {playingId === entry.id ? (
                      <>
                        <Pause className="h-3 w-3" />
                        <span>{entry.timeFormatted} (재생 중)</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3 w-3" />
                        <span>{entry.timeFormatted}</span>
                      </>
                    )}
                  </button>
                  <span className="text-[11px] text-zinc-500 font-mono">
                    Chunk #{entry.chunkSeq}
                  </span>
                  {entry.isKeyPoint && (
                    <span className="inline-flex items-center gap-1 rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/20">
                      <Bookmark className="h-2.5 w-2.5" />
                      시험 출제 예상
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                  <span>신뢰도 {(entry.confidence * 100).toFixed(0)}%</span>
                  <span className="text-zinc-600">·</span>
                  <span>VAD 정렬 완료</span>
                </div>
              </div>

              {/* Original foreign speech */}
              <div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  &ldquo;{entry.originalText}&rdquo;
                </p>
              </div>

              {/* Real-time Korean translation with Glossary highlighting */}
              <div className="rounded-xl bg-[#0a0d16] p-3.5 border border-white/5">
                <p className="text-sm font-semibold text-white leading-relaxed">
                  {entry.translatedText}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
