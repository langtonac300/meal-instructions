import { redirect } from 'next/navigation';
import Link from 'next/link';
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

/** What an account is for. Each row is grounded in a real table or component. */
const REASONS = [
  {
    title: 'Save meals',
    body: 'Keep the ones that worked. Your saved list becomes a one-click preset in the printable pack builder.',
  },
  {
    title: 'Rate and review after you cook',
    body: "Five stars and a note to yourself about what you'd change next time. Reviews stay on your account.",
  },
  {
    title: 'Your kitchen follows you',
    body: 'Tell us what you own once and every cook-time chart puts your equipment first — on the laptop you plan on and the phone you cook with.',
  },
  {
    title: 'Fix what’s wrong',
    body: 'Suggest an edit when a temperature or an amount looks off, and track whether it was accepted.',
  },
];

export default async function SignInPage({ searchParams }: Props) {
  const session = await auth();
  const { callbackUrl, error } = await searchParams;

  if (session?.user) {
    redirect(callbackUrl || '/account');
  }

  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-10 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_420px] gap-10 md:gap-16 items-start text-ink">
      {/* Left — what an account is for. Second in DOM on phones (the card leads). */}
      <div className="order-2 md:order-1">
        <h1 className="font-sans text-[34px] sm:text-[46px] font-black tracking-[-0.02em] leading-[1.05] uppercase">
          Sign in
        </h1>
        <p className="mt-[18px] text-[19px] sm:text-[21px] leading-[1.5] text-ink-muted max-w-[52ch]">
          The recipes and cook times work without an account. Signing in is for keeping track of
          what you actually cook.
        </p>

        <ol className="mt-10 border-t border-ink">
          {REASONS.map((reason, i) => (
            <li key={reason.title} className="flex gap-6 py-[22px] border-b border-hairline">
              <span
                className={`font-mono text-[14px] font-bold w-[2em] shrink-0 ${
                  i === 0 ? 'text-accent' : 'text-ink-subtle'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h2 className="text-[20px] font-bold leading-tight">{reason.title}</h2>
                <p className="mt-1 text-[17px] leading-[1.55] text-ink-muted">{reason.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Right — the action card. First on phones. */}
      <div className="order-1 md:order-2 border border-ink p-6 sm:p-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-ink-subtle">
          Meal Instructions
        </span>
        <h2 className="mt-3 text-[26px] font-extrabold tracking-[-0.01em] leading-tight">
          Continue with Google
        </h2>
        <p className="mt-2 text-[17px] leading-[1.55] text-ink-muted">
          One tap. No password to forget, and no email from us.
        </p>

        {error && (
          <p className="mt-5 text-[16px] text-accent" role="alert">
            Sign-in failed ({error}). Try again.
          </p>
        )}

        <form
          action={async () => {
            'use server';
            await signIn('google', { redirectTo: callbackUrl || '/account' });
          }}
          className="mt-6"
        >
          <button
            type="submit"
            className="block w-full p-4 bg-ink text-paper text-[17px] font-bold text-center hover:bg-accent transition-colors cursor-pointer"
          >
            Continue with Google
          </button>
        </form>

        <p className="mt-4 text-[15px] leading-[1.55] text-ink-muted">
          We only store your email, name, and Google avatar — no Gmail access. You can delete your
          account from this page at any time.
        </p>

        <p className="mt-6 pt-5 border-t border-hairline text-[16px] leading-[1.55] text-ink-muted">
          Not signing in? You can still{' '}
          <Link href="/account/setup" className="font-semibold text-ink hover:text-accent transition-colors">
            set up your kitchen on this device
          </Link>{' '}
          — same personalisation, stored locally.
        </p>
      </div>
    </div>
  );
}
