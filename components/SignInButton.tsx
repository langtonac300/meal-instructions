// Server component. Renders the signed-in avatar/menu or a "sign in with
// Google" button that posts to a NextAuth server action.
import Link from 'next/link';
import { auth, signIn, signOut } from '@/auth';

export default async function SignInButton() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return (
      <form
        action={async () => {
          'use server';
          await signIn('google', { redirectTo: '/' });
        }}
      >
        <button
          type="submit"
          className="font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 border border-ink text-ink hover:bg-ink hover:text-paper transition-colors"
        >
          Sign in
        </button>
      </form>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/account"
        className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink hover:opacity-70 transition-opacity"
        title={user.email ?? undefined}
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt=""
            width={24}
            height={24}
            className="w-6 h-6 rounded-full border border-ink"
          />
        ) : (
          <span className="w-6 h-6 rounded-full border border-ink flex items-center justify-center text-[10px] font-bold">
            {(user.name ?? user.email ?? '?').slice(0, 1).toUpperCase()}
          </span>
        )}
        <span className="hidden md:inline">Account</span>
      </Link>
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/' });
        }}
      >
        <button
          type="submit"
          className="font-mono text-[10px] uppercase tracking-wider text-ink-muted hover:text-ink transition-colors"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
