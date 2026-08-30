import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { auth, signIn } from '@/auth';

export const metadata: Metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}

export default async function SignInPage({ searchParams }: Props) {
  const session = await auth();
  const { callbackUrl, error } = await searchParams;

  if (session?.user) {
    redirect(callbackUrl || '/account');
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-8 py-16 space-y-6">
      <header className="space-y-2 text-center">
        <div className="font-mono text-[11px] uppercase tracking-wider text-ink-subtle">
          Meal Instructions
        </div>
        <h1 className="text-3xl font-bold text-ink">Sign in</h1>
        <p className="text-sm text-ink-muted">
          Sign in with your Google account to save meals, rate them, and suggest edits when
          something looks wrong.
        </p>
      </header>

      <form
        action={async () => {
          'use server';
          await signIn('google', { redirectTo: callbackUrl || '/account' });
        }}
      >
        <button
          type="submit"
          className="w-full font-mono text-xs uppercase tracking-wider px-4 py-3 bg-ink text-paper hover:opacity-80 transition-opacity"
        >
          Continue with Google
        </button>
      </form>

      {error && (
        <p className="text-sm text-red-700 text-center">
          Sign-in failed ({error}). Try again.
        </p>
      )}

      <p className="text-[11px] text-ink-subtle text-center">
        We only store your email, name, and Google avatar — no Gmail access.
      </p>
    </div>
  );
}
