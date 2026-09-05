-- Meal plans: "these recipes, on these nights."
--
-- The primitive every external integration hangs off. Saved meals answer
-- "what did I like"; a plan answers "what am I cooking Tuesday", which is the
-- only question a calendar, a shopping list, or a reminder can act on.
--
-- Same posture as the other meals_* tables: RLS on, zero policies, all access
-- through the service role in server routes. Grants are explicit — meals_profiles
-- shipped without them and every read failed with "permission denied".

create table if not exists public.meals_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.meals_users (id) on delete cascade,

  -- Wall-clock time the food is meant to be on the table, "HH:MM" 24h.
  -- Not a timestamptz: "dinner at 6:30" survives a move between time zones,
  -- an absolute instant does not.
  dinner_time text not null default '18:30'
    check (dinner_time ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$'),

  -- IANA zone read from the browser at save time. Google resolves the wall
  -- time against this, so a plan built in Chicago stays 18:30 in Chicago.
  time_zone text not null default 'UTC',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists meals_plans_user_idx
  on public.meals_plans (user_id, created_at desc);

create table if not exists public.meals_plan_items (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.meals_plans (id) on delete cascade,

  -- Not a foreign key: recipes live in version-controlled files, not in the
  -- database. A slug that stops existing is dropped at read time.
  recipe_slug text not null,

  cook_date date not null,

  -- Per-night override. Null means "use the plan's dinner_time".
  dinner_time text
    check (dinner_time is null or dinner_time ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$'),

  -- The event this row was last written to, so a re-sync patches in place
  -- instead of stacking a second copy of Tuesday on the calendar.
  google_event_id text,

  created_at timestamptz not null default now(),

  -- One dinner per night. Re-planning a night replaces it rather than
  -- silently producing two overlapping calendar events.
  unique (plan_id, cook_date)
);

create index if not exists meals_plan_items_plan_idx
  on public.meals_plan_items (plan_id, cook_date);

-- The Google calendar this site created for a user, under the
-- calendar.app.created scope: one secondary calendar per user, ours to write
-- to, and nothing else on their account is reachable with that grant.
create table if not exists public.meals_calendar_links (
  user_id uuid primary key references public.meals_users (id) on delete cascade,
  google_calendar_id text not null,
  created_at timestamptz not null default now()
);

alter table public.meals_plans enable row level security;
alter table public.meals_plan_items enable row level security;
alter table public.meals_calendar_links enable row level security;

grant select, insert, update, delete on table public.meals_plans to service_role;
grant select, insert, update, delete on table public.meals_plan_items to service_role;
grant select, insert, update, delete on table public.meals_calendar_links to service_role;

comment on table public.meals_plans is
  'A run of planned dinners. Written only by /api/meals/plan via the service role.';
comment on table public.meals_plan_items is
  'One planned dinner. google_event_id is set by /api/calendar/sync after a successful write.';
comment on table public.meals_calendar_links is
  'The app-created Google calendar per user (calendar.app.created scope).';
