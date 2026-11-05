import React from 'react';
import type { Metadata } from 'next';
import {
  fetchAdminOrders,
  fetchCatalogProducts,
  verifyServerAdminAccess,
} from '@/lib/supabase/server';
import { AdminClient } from '@/components/admin/AdminClient';

export const metadata: Metadata = {
  title: 'Admin Console | INHYPE Perfume Atelier',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function AdminPage() {
  const authStatus = await verifyServerAdminAccess();
  const { products, source } = await fetchCatalogProducts();
  const orders = authStatus.isAdmin ? await fetchAdminOrders() : [];

  return (
    <AdminClient
      authStatus={authStatus}
      initialProducts={products}
      initialOrders={orders}
      dataSource={source}
    />
  );
}
