'use client';

import React from 'react';
import { X, Check, Zap, CreditCard, ShieldCheck } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: string;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  currentPlan,
}) => {
  if (!isOpen) return null;

  const plans = [
    {
      name: 'BASIC',
      price: '4,900원',
      period: '월',
      desc: '가벼운 주 1~2회 강의 수강생',
      hours: '4시간 녹음',
      chars: '16만 자 번역',
      aiCredits: 'AI 학습팩 48회',
      isPopular: false,
    },
    {
      name: 'STANDARD',
      price: '9,900원',
      period: '월',
      desc: '대학생·유학생 전공 필수 수강생 (가장 인기)',
      hours: '8.5시간 녹음',
      chars: '34만 자 번역',
      aiCredits: 'AI 학습팩 108회',
      isPopular: true,
    },
    {
      name: 'PLUS',
      price: '15,900원',
      period: '월',
      desc: '다전공 및 전과목 올인원 완강 플랜',
      hours: '14시간 녹음',
      chars: '56만 자 번역',
      aiCredits: 'AI 학습팩 168회',
      isPopular: false,
    },
    {
      name: 'GLOBAL',
      price: '23,900원',
      period: '월',
      desc: '석박사 연구원 & 해외 대학 헤비 유저',
      hours: '21.5시간 녹음',
      chars: '86만 자 번역',
      aiCredits: 'AI 학습팩 288회',
      isPopular: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl rounded-3xl border border-white/10 bg-[#0f1422] p-6 sm:p-8 shadow-2xl text-white space-y-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-zinc-400 hover:text-white hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-0.5 text-xs font-semibold text-cyan-400 border border-cyan-500/20">
            <Zap className="h-3.5 w-3.5" />
            정확도와 속도 검증 완료 요금제
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            합리적인 종량제 기반 정기 멤버십
          </h2>
          <p className="text-xs text-zinc-400">
            고화질 STT(Cloudflare/Soniox)와 Gemini 3.1 Flash-Lite 인프라를 바탕으로 원가 거품을 뺀 최적의 단가를 제공합니다.
          </p>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl p-5 border flex flex-col justify-between transition-all ${
                p.isPopular
                  ? 'border-cyan-500 bg-gradient-to-b from-[#142338] to-[#0a0d16] shadow-xl shadow-cyan-500/15'
                  : 'border-white/10 bg-[#0a0d16] hover:border-white/20'
              }`}
            >
              {p.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-0.5 text-[10px] font-black uppercase text-white shadow-md">
                  BEST CHOICE
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-black text-white">{p.name}</h3>
                  <p className="text-[11px] text-zinc-400 mt-0.5 leading-tight">{p.desc}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-white">{p.price}</span>
                  <span className="text-xs text-zinc-400">/ {p.period}</span>
                </div>

                <ul className="space-y-2 text-xs text-zinc-300 pt-2 border-t border-white/5">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <span>{p.hours}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <span>{p.chars}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <span>{p.aiCredits}</span>
                  </li>
                  <li className="flex items-center gap-2 text-zinc-400">
                    <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <span>과목별 전용 용어집 무제한</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  alert(`${p.name} 플랜 결제가 선택되었습니다 (토스페이먼츠 연동).`);
                  onClose();
                }}
                className={`mt-6 w-full rounded-2xl py-2.5 text-xs font-bold transition-all active:scale-95 ${
                  p.isPopular
                    ? 'bg-cyan-500 text-white hover:bg-cyan-400 shadow-lg shadow-cyan-500/25'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {currentPlan === p.name ? '현재 이용 중' : `${p.name} 구독 시작`}
              </button>
            </div>
          ))}
        </div>

        {/* Security & Refund Guarantee Footer */}
        <div className="rounded-2xl border border-white/5 bg-[#0a0d16] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>토스페이먼츠 안전 결제 · 7일 이내 미사용 시 100% 전액 환불 보장</span>
          </div>
          <span className="text-[11px] text-zinc-500">
            언제든 위약금 없이 1클릭 해지 가능
          </span>
        </div>
      </div>
    </div>
  );
};
