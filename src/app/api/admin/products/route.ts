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
      { error: 'Supabase is not configured.' },
      { status: 503 }
    );
  }

  const body = await request.json();

  const { data: insertedProduct, error: productError } = await supabase
    .from('products')
    .insert({
      slug: body.slug,
      brand: body.brand,
      name_ru: body.name.ru,
      name_kz: body.name.kz,
      name_en: body.name.en,
      subtitle_ru: body.subtitle.ru,
      subtitle_kz: body.subtitle.kz,
      subtitle_en: body.subtitle.en,
      description_ru: body.description.ru,
      description_kz: body.description.kz,
      description_en: body.description.en,
      category: body.category,
      scent_families: body.scentFamilies || [],
      character_traits: body.character || [],
      intensity: body.intensity || 'moderate',
      occasions: body.occasions || [],
      concentration: body.concentration || null,
      olfactory_pyramid: body.olfactoryPyramid || null,
      images: body.images || [],
      featured: Boolean(body.featured),
      in_stock: Boolean(body.inStock),
    })
    .select('*')
    .single();

  if (productError || !insertedProduct) {
    return NextResponse.json(
      { error: productError?.message || 'Failed to create product' },
      { status: 400 }
    );
  }

  if (Array.isArray(body.volumes) && body.volumes.length > 0) {
    const volumeRows = body.volumes.map(
      (v: {
        volumeMl: number;
        priceKzt: number;
        inStock: boolean;
        sku: string;
      }) => ({
        product_id: insertedProduct.id,
        volume_ml: Number(v.volumeMl),
        price_kzt: Number(v.priceKzt),
        in_stock: Boolean(v.inStock),
        sku: v.sku,
      })
    );
    await supabase.from('product_volumes').insert(volumeRows);
  }

  return NextResponse.json({ product: insertedProduct });
}

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
  if (!body.id) {
    return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
  }

  const { error: updateErr } = await supabase
    .from('products')
    .update({
      slug: body.slug,
      brand: body.brand,
      name_ru: body.name?.ru,
      name_kz: body.name?.kz,
      name_en: body.name?.en,
      subtitle_ru: body.subtitle?.ru,
      subtitle_kz: body.subtitle?.kz,
      subtitle_en: body.subtitle?.en,
      description_ru: body.description?.ru,
      description_kz: body.description?.kz,
      description_en: body.description?.en,
      category: body.category,
      images: body.images,
      featured: Boolean(body.featured),
      in_stock: Boolean(body.inStock),
      updated_at: new Date().toISOString(),
    })
    .eq('id', body.id);

  if (updateErr) {
    return NextResponse.json({ error: updateErr.message }, { status: 400 });
  }

  if (Array.isArray(body.volumes)) {
    await supabase
      .from('product_volumes')
      .delete()
      .eq('product_id', body.id);

    if (body.volumes.length > 0) {
      await supabase.from('product_volumes').insert(
        body.volumes.map(
          (v: {
            volumeMl: number;
            priceKzt: number;
            inStock: boolean;
            sku: string;
          }) => ({
            product_id: body.id,
            volume_ml: Number(v.volumeMl),
            price_kzt: Number(v.priceKzt),
            in_stock: Boolean(v.inStock),
            sku: v.sku,
          })
        )
      );
    }
  }

  return NextResponse.json({ updated: true });
}
