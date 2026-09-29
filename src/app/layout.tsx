import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LectureSync AI (렉처싱크 AI) | 실시간 강의 음성인식 & 다국어 동시통역 · 시험 족보 생성',
  description:
    '온라인 강의/미팅 오디오를 실시간으로 받아써 대본·한국어 동시통역 자막으로 변환하고, 1클릭으로 핵심 3줄 요약 및 시험 예상 족보를 자동 생성하는 대학생·연구원 필수 AI SaaS',
  keywords: [
    'LectureSync AI',
    '렉처싱크 AI',
    'LT AI',
    '강의 실시간 번역',
    '강의 음성인식',
    '시험 족보 생성 AI',
    '영어 강의 실시간 자막',
    '대학생 AI 필기',
    '대학원생 논문 번역',
  ],
  authors: [{ name: 'LectureSync Team' }],
  openGraph: {
    title: 'LectureSync AI - 실시간 강의 음성 번역 & AI 시험 족보',
    description: 'Cloudflare/Soniox STT + Gemini 3.1 Flash-Lite + 과목별 전공 용어집',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body className="min-h-screen bg-[#080b11] text-zinc-100 antialiased selection:bg-cyan-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
