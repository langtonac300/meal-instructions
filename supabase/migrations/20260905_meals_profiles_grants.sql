-- meals_profiles was created without the table grants the other meals_*
-- tables carry, so the service role — the only client that ever touches
-- these tables — got "permission denied for table meals_profiles" the first
-- time a page read it (/account, after the account redesign). RLS stays on
-- with no policies; this only lets the service role through, as elsewhere.

grant select, insert, update, delete on table public.meals_profiles to service_role;
