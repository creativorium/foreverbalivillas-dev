import { NextRequest, NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/lib/admin-data';

export async function GET() {
  return NextResponse.json(getSettings());
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const updated = updateSettings(data);
    return NextResponse.json(updated);
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
