#!/usr/bin/env bash
#
# ship-content.sh — the gate-and-ship half of the daily content routine.
#
# Authoring is done by a human or an agent. This script does the part that must
# be deterministic: run every gate, and only if all of them pass, commit and
# push so Vercel deploys.
#
# Production (mealinstructions.com) is the Vercel project `dad-meals-no-fluff`,
# which builds from the `origin` remote (meal-instructions). `cooking`
# (cooking-repo) has its own Vercel project with no custom domain, so a push
# there deploys nothing anyone sees. Both are kept in sync.
#
#   ./scripts/ship-content.sh "feat(content): 10 dutch-oven datasheets"
#   ./scripts/ship-content.sh --dry-run "..."   # gates only, no commit or push
#   ./scripts/ship-content.sh --check           # gates only, no message needed
#
set -uo pipefail

DEPLOY_REMOTE="origin"       # meal-instructions → dad-meals-no-fluff → mealinstructions.com
MIRROR_REMOTE="cooking"      # cooking-repo: own Vercel project, no domain — a mirror
TARGET_BRANCH="main"

DRY_RUN=0
CHECK_ONLY=0
ARGS=()
for a in "$@"; do
  case "$a" in
    --dry-run) DRY_RUN=1 ;;
    --check)   CHECK_ONLY=1; DRY_RUN=1 ;;
    *)         ARGS+=("$a") ;;
  esac
done
MESSAGE="${ARGS[0]:-}"

cd "$(git rev-parse --show-toplevel)" || exit 1

bold() { printf '\033[1m%s\033[0m\n' "$1"; }
fail() { printf '\033[31m✗ %s\033[0m\n' "$1"; exit 1; }
ok()   { printf '\033[32m✓ %s\033[0m\n' "$1"; }

if [[ $CHECK_ONLY -eq 0 && -z "$MESSAGE" ]]; then
  fail "commit message required:  ./scripts/ship-content.sh \"feat(content): ...\""
fi

# ── gates ──────────────────────────────────────────────────────────────────
# Ordered cheapest-first so a bad batch fails in seconds, not after a full
# Next.js compile. Every one of these must exit 0 before anything is pushed.
bold "Running gates"

npm run build:content   >/tmp/ship-buildcontent.log 2>&1 || { tail -20 /tmp/ship-buildcontent.log; fail "build:content failed"; }
ok "build:content"

npm run validate:recipes >/tmp/ship-validate.log 2>&1   || { tail -40 /tmp/ship-validate.log;   fail "validate:recipes failed"; }
ok "validate:recipes"

npm run audit:content   >/tmp/ship-content.log 2>&1     || { tail -40 /tmp/ship-content.log;    fail "audit:content failed"; }
ok "audit:content"

# audit:seo asserts against the built .next output, so the build must run first.
npm run build           >/tmp/ship-build.log 2>&1       || { grep -E "Type error" -A6 /tmp/ship-build.log | head -30; tail -15 /tmp/ship-build.log; fail "next build failed"; }
PAGES=$(grep -oE "Generating static pages \(([0-9]+)/([0-9]+)\)" /tmp/ship-build.log | tail -1 | grep -oE "[0-9]+\)$" | tr -d ')')
ok "next build (${PAGES:-?} static pages)"

npm run audit:seo       >/tmp/ship-seo.log 2>&1         || { tail -40 /tmp/ship-seo.log;        fail "audit:seo failed"; }
ok "audit:seo"

bold "All gates passed"

if [[ $DRY_RUN -eq 1 ]]; then
  echo
  [[ $CHECK_ONLY -eq 1 ]] && echo "--check: gates only, nothing committed." || echo "--dry-run: nothing committed or pushed."
  git status --short | head -20
  exit 0
fi

# ── commit ─────────────────────────────────────────────────────────────────
if [[ -z "$(git status --porcelain)" ]]; then
  echo "Nothing to commit — working tree clean. No deploy triggered."
  exit 0
fi

git add -A
git commit -q -m "$MESSAGE" -m "Gates: validate:recipes, audit:content, next build (${PAGES:-?} pages), audit:seo — all green.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>" || fail "commit failed"
SHA=$(git rev-parse --short HEAD)
ok "committed $SHA"

# ── push ───────────────────────────────────────────────────────────────────
# Refuse to overwrite work pushed from elsewhere: if the deploy branch has moved
# ahead, stop and let a human reconcile rather than force-pushing over content.
git fetch "$DEPLOY_REMOTE" "$TARGET_BRANCH" --quiet 2>/dev/null
if git rev-parse --verify --quiet "$DEPLOY_REMOTE/$TARGET_BRANCH" >/dev/null; then
  BEHIND=$(git rev-list --count "HEAD..$DEPLOY_REMOTE/$TARGET_BRANCH" 2>/dev/null || echo 0)
  if [[ "$BEHIND" != "0" ]]; then
    fail "$DEPLOY_REMOTE/$TARGET_BRANCH is $BEHIND commit(s) ahead of HEAD. Rebase before shipping:
    git pull --rebase $DEPLOY_REMOTE $TARGET_BRANCH   # then re-run, gates included"
  fi
fi

git push "$DEPLOY_REMOTE" "HEAD:$TARGET_BRANCH" --quiet || fail "push to $DEPLOY_REMOTE failed"
ok "pushed to $DEPLOY_REMOTE/$TARGET_BRANCH — Vercel deploy triggered"

git push "$MIRROR_REMOTE" "HEAD:$TARGET_BRANCH" --quiet \
  && ok "mirrored to $MIRROR_REMOTE/$TARGET_BRANCH (mealinstructions.com)" \
  || echo "  (warning: push to $MIRROR_REMOTE failed — verify remote tracking)"

echo
bold "Shipped $SHA"
echo "Watch the deploy:  gh api repos/langtonac300/meal-instructions/deployments --jq '.[0].id'"
