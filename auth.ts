// NextAuth v5 configuration.
// Handlers are re-exported by app/api/auth/[...nextauth]/route.ts.
// `auth`, `signIn`, `signOut` are used from Server Components and route handlers.
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { upsertMealsUser } from '@/lib/meals-db';
import { mealsConfigured } from '@/lib/supabase-admin';

export const { handlers, auth, signIn, signOut } = NextAuth({
  // JWT sessions (no NextAuth DB adapter). When Supabase is configured the
  // user is mirrored into public.meals_users on sign-in so we have a stable
  // local id to hang saved meals, ratings, and edit suggestions off.
  session: { strategy: 'jwt' },
  providers: [
    Google({
      // clientId / clientSecret come from AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET
      // (Auth.js v5 convention — already set in Vercel for this project).
      // Only need identity — no Gmail-read scopes.
      authorization: { params: { scope: 'openid email profile' } },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== 'google') return false;
      // Google sign-in must keep working with or without Supabase. The
      // meals_users mirror is best-effort: skip it when unconfigured, and
      // log-but-allow on failure so a DB hiccup never locks people out.
      if (!mealsConfigured()) return true;
      const email = user.email ?? (profile as { email?: string } | null)?.email;
      const sub = (profile as { sub?: string } | null)?.sub ?? account.providerAccountId;
      if (!email || !sub) return true;
      try {
        await upsertMealsUser({
          email,
          name: user.name ?? null,
          image: user.image ?? null,
          googleSub: sub,
        });
      } catch (err) {
        console.error('[auth] failed to upsert meals_users row', err);
      }
      return true;
    },
    async jwt({ token, profile, account }) {
      if (account && profile) {
        token.sub = (profile as { sub?: string }).sub ?? token.sub;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as { googleSub?: string }).googleSub = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: '/account/sign-in',
  },
});
