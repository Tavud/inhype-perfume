import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';
import { CartItem, Locale } from '@/types/perfume';

interface CreateOrderBody {
  fullName: string;
  phone: string;
  city: string;
  comment?: string;
  items: CartItem[];
  totalAmountKzt: number;
  locale: Locale;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateOrderBody;

    if (
      !body.fullName ||
      body.fullName.trim().length < 2 ||
      !body.phone ||
      body.phone.replace(/[^\d]/g, '').length < 10 ||
      !body.city ||
      body.city.trim().length < 2 ||
      !Array.isArray(body.items) ||
      body.items.length === 0
    ) {
      return NextResponse.json(
        { error: 'Invalid order payload' },
        { status: 400 }
      );
    }

    const timestampPart = Date.now().toString(36).toUpperCase().slice(-5);
    const orderNumber = `INH-${timestampPart}`;

    const supabaseAdmin = createSupabaseServiceClient();

    if (!supabaseAdmin) {
      // Supabase server registration is not yet connected; return browser-only reference transparently
      return NextResponse.json({
        registeredOnServer: false,
        orderNumber,
      });
    }

    const { error } = await supabaseAdmin.from('orders').insert({
      order_number: orderNumber,
      customer_name: body.fullName.trim(),
      customer_phone: body.phone.trim(),
      customer_city: body.city.trim(),
      comment: body.comment?.trim() || null,
      items: body.items,
      total_amount_kzt: body.totalAmountKzt,
      locale: body.locale || 'ru',
      status: 'pending_whatsapp',
    });

    if (error) {
      return NextResponse.json({
        registeredOnServer: false,
        orderNumber,
      });
    }

    return NextResponse.json({
      registeredOnServer: true,
      orderNumber,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to process order payload' },
      { status: 500 }
    );
  }
}
