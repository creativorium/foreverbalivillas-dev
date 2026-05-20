'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function BlogDeleteButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    setLoading(true);
    await fetch(`/api/admin/blog/${slug}`, { method: 'DELETE' });
    router.refresh();
    setLoading(false);
  };

  return (
    <button className="adm-btn adm-btn-danger adm-btn-sm" onClick={handle} disabled={loading}>
      {loading ? '…' : 'Delete'}
    </button>
  );
}
