import type { Metadata } from 'next';
import Link from 'next/link';
import { auth, signIn } from '@/auth';
import ProfileSetup from '@/components/ProfileSetup';

export const metadata: Metadata = {
  title: 'Set up your kitchen',
  description:
    'Tell us what you cook on and who you feed. Every cook-time chart and recipe sorts to your equipment.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function ProfileSetupPage() {
  const session = await auth();
  const signedIn = !!session?.user;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-8">
      <header className="space-y-2">
        <div className="micro-label text-accent">ONE-TIME SETUP</div>
        <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-ink font-sans">
          Set up your kitchen
        </h1>
        <p className="text-sm text-ink-muted font-sans leading-relaxed">
          378 cook-time datasheets across 11 appliances. Tell us which ones you own and every
          chart, category and recipe puts yours first.
        </p>
      </header>

      {/* Sign-in leads, because a profile that follows you between the laptop you
          planned on and the phone in the kitchen is the version worth having.
          It is not a gate: skipping stores the same profile on this device. */}
      {!signedIn && (
        <section className="bg-paper-card hairline-border p-5 space-y-3">
          <div className="micro-label text-ink-muted">RECOMMENDED</div>
          <p className="text-sm text-ink font-sans leading-relaxed">
            Sign in with Google so your kitchen follows you to the phone you actually cook
            with — and so you can save and rate meals.
          </p>
          <form
            action={async () => {
              'use server';
              await signIn('google', { redirectTo: '/account/setup' });
            }}
          >
            <button
              type="submit"
              className="w-full font-mono text-xs uppercase tracking-wider px-4 py-3 bg-ink text-paper hover:bg-accent transition-colors cursor-pointer"
            >
              Continue with Google
            </button>
          </form>
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink-subtle text-center">
            or set it up below — saved on this device only
          </p>
        </section>
      )}

      <div className="bg-paper-card hairline-border p-5 sm:p-8">
        <ProfileSetup signedIn={signedIn} />
      </div>

      <p className="font-mono text-[10px] uppercase tracking-wider text-ink-subtle">
        Nothing is hidden from you —{' '}
        <Link href="/how-long" className="underline hover:text-ink">
          every appliance stays browsable
        </Link>
        . Your kit just comes first.
      </p>
    </div>
  );
}
