import { NextResponse } from 'next/server';
import { INITIAL_SUBJECTS } from '../../../lib/store';

export async function GET() {
  return NextResponse.json({ success: true, subjects: INITIAL_SUBJECTS });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newSubject = {
      id: `sub-${Date.now()}`,
      name: body.name,
      professor: body.professor || '담당 교수',
      semester: body.semester || '2026-2학기',
      colorHex: body.colorHex || '#3b82f6',
      glossary: body.glossary || [],
    };

    return NextResponse.json({ success: true, subject: newSubject });
  } catch (error) {
    console.error('Subjects API error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
