import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { INITIAL_RECORDINGS } from '../../../lib/store';

export async function GET() {
  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost:5432/lecturesync')) {
      const dbRecs = await prisma.recording.findMany({
        include: { studyPacks: true },
        orderBy: { createdAt: 'desc' },
      });
      if (dbRecs && dbRecs.length > 0) {
        return NextResponse.json({ success: true, recordings: dbRecs });
      }
    }
    return NextResponse.json({ success: true, recordings: INITIAL_RECORDINGS });
  } catch (error) {
    console.error('Recordings GET error:', error);
    return NextResponse.json({ success: true, recordings: INITIAL_RECORDINGS });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newRec = {
      id: `rec-${Date.now()}`,
      subjectId: body.subjectId || 'sub-1',
      title: body.title || '새 강의 녹음',
      durationSeconds: body.durationSeconds || 300,
      langMode: body.langMode || 'EN_KO',
      status: 'COMPLETED' as const,
      entryCount: body.entryCount || 0,
      createdAt: new Date().toISOString(),
      studyPack: body.studyPack,
    };

    return NextResponse.json({ success: true, recording: newRec });
  } catch (error) {
    console.error('Recordings POST error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
