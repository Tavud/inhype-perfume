import { NextRequest, NextResponse } from 'next/server';
import {
  createSupabaseServerClient,
  verifyServerAdminAccess,
} from '@/lib/supabase/server';

export async function PATCH(request: NextRequest) {
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
      { error: 'Supabase is not configured.' },
      { status: 503 }
    );
  }

  const body = await request.json();
  if (!body.orderId || !body.status) {
    return NextResponse.json(
      { error: 'orderId and status are required' },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from('orders')
    .update({
      status: body.status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', body.orderId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ updated: true });
}
