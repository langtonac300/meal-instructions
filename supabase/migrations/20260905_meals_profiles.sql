-- Kitchen profile: what someone owns, who they cook for, what they avoid.
-- Mirrors the localStorage shape in lib/profile.ts. Local is the read path;
-- this table exists so a profile follows a signed-in user across devices.

create table if not exists public.meals_profiles (
  user_id uuid primary key references public.meals_users (id) on delete cascade,

  -- Subset of the Appliance union in lib/types.ts. Not an enum: the union
  -- changes with sign-off (AGENTS.md section 7) and a text[] avoids a
  -- migration every time one is added.
  appliances text[] not null default '{}',

  adults smallint not null default 2 check (adults between 1 and 12),
  kids smallint not null default 0 check (kids between 0 and 10),
  kid_ages smallint[] not null default '{}',

  avoid text[] not null default '{}',
  spice text not null default 'medium' check (spice in ('mild', 'medium', 'hot')),
  max_weeknight_minutes smallint check (max_weeknight_minutes is null or max_weeknight_minutes > 0),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Every read is by user_id (the primary key), so no extra index is needed.

alter table public.meals_profiles enable row level security;

-- Same posture as the other meals_* tables: all access goes through the
-- service-role key in server routes, never from the browser. No policies are
-- granted to anon or authenticated, so RLS denies by default.

comment on table public.meals_profiles is
  'Kitchen profile per user. Written only by /api/meals/profile via the service role.';
