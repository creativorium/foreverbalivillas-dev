import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/lib/admin-data';

export async function GET() {
  const { getStorageMode } = await import('@/lib/storage');
  return NextResponse.json({ data: await getSettings(), storage: getStorageMode() });
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const updated = await updateSettings(data);
    revalidatePath('/');
    return NextResponse.json(updated);
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
