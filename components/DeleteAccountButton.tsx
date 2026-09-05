'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { clearProfile } from '@/lib/profile';

type Status = 'idle' | 'confirm' | 'deleting' | 'error';

/**
 * Two-step, inline (HR-7: no modal): the first click reveals a confirm
 * button, the second deletes. On success the local kitchen profile is
 * cleared and the session signed out.
 */
export default function DeleteAccountButton() {
  const [status, setStatus] = useState<Status>('idle');

  async function confirmDelete() {
    setStatus('deleting');
    try {
      const res = await fetch('/api/meals/delete', { method: 'POST' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      clearProfile();
      await signOut({ callbackUrl: '/' });
    } catch {
      setStatus('error');
    }
  }

  if (status === 'idle' || status === 'error') {
    return (
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => setStatus('confirm')}
          className="text-[16px] text-ink-muted hover:text-accent transition-colors cursor-pointer"
        >
          Delete account
        </button>
        {status === 'error' && (
          <span className="text-[15px] text-accent">Could not delete. Try again.</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="text-[15px] text-ink-muted">
        This removes your saved meals, ratings, suggestions and kitchen profile.
      </span>
      <button
        type="button"
        onClick={confirmDelete}
        disabled={status === 'deleting'}
        className="px-4 py-2 bg-accent text-paper text-[15px] font-bold hover:bg-ink disabled:opacity-50 transition-colors cursor-pointer"
      >
        {status === 'deleting' ? 'Deleting…' : 'Yes, delete my account'}
      </button>
      {status === 'confirm' && (
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-[15px] text-ink-muted hover:text-ink transition-colors cursor-pointer"
        >
          Keep it
        </button>
      )}
    </div>
  );
}
