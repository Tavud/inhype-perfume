import { NextRequest, NextResponse } from 'next/server';
import {
  createSupabaseServerClient,
  verifyServerAdminAccess,
} from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const auth = await verifyServerAdminAccess();
  if (!auth.isAdmin) {
    return NextResponse.json(
      { error: 'Unauthorized: Server administrator verification required.' },
      { status: auth.authenticated ? 403 : 401 }
    );
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json(
      { error: 'Supabase Storage is not configured.' },
      { status: 503 }
    );
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const ext = file.name.split('.').pop() || 'jpg';
  const safeFileName = `perfumes/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}.${ext}`;

  const arrayBuffer = await file.arrayBuffer();
  const { error } = await supabase.storage
    .from('perfume-images')
    .upload(safeFileName, arrayBuffer, {
      contentType: file.type || 'image/jpeg',
      upsert: false,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const { data: publicUrlData } = supabase.storage
    .from('perfume-images')
    .getPublicUrl(safeFileName);

  return NextResponse.json({ url: publicUrlData.publicUrl });
}
