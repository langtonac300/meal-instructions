# Shipping Meal Instructions to the Play Store

**The short version:** we wrap the live site in a **Trusted Web Activity (TWA)** —
a Play Store app that renders `https://www.mealinstructions.com` full-screen with
no browser chrome. One codebase. The app updates when you deploy to Vercel; you
only rebuild the `.aab` when the *name, icon, or colours* change.

**Android Studio is step 4, not step 1.** The tool that creates the Android
project is `bubblewrap`, a Node CLI. Android Studio is only there to build and
sign the bundle at the end (and you can skip it entirely — see the CLI-only note).

---

## Why TWA and not Capacitor / a WebView

| | Verdict |
|---|---|
| **TWA** | ✅ What we're doing. Runs on Chrome's engine, keeps your session, passes Play's quality bar. |
| **Capacitor** | ❌ Needs a static frontend. This app has `app/api/*` routes, NextAuth and `middleware.ts` — a static export would break all of it. |
| **Raw WebView** | ❌ **Google Sign-In is blocked in WebViews** (`disallowed_useragent`). Your NextAuth Google login would simply fail. TWA uses Custom Tabs, so it works. |

That last row is the decisive one for this repo specifically.

---

## What's already done in this repo

- `app/manifest.ts` — TWA-compliant (`id`, `scope`, `orientation`, `categories`, maskable icon).
- `public/icons/icon-maskable-512.png` — glyph inset to 62% so Android's circle/squircle masks don't crop it.
- `app/.well-known/assetlinks.json/route.ts` — serves Digital Asset Links, driven by env vars.

You supply two env vars and run the CLI. Nothing else in the repo needs to change.

---

## Step 1 — Prerequisites (Mac, one time)

```bash
# JDK 17 — Bubblewrap needs it to sign the bundle
brew install --cask temurin@17

# The wrapper CLI
npm install -g @bubblewrap/cli
```

On first run Bubblewrap offers to download the Android SDK build tools itself
(~500 MB). **Say yes** — that's simpler than pointing it at Android Studio's copy.

> If you'd rather use the Android Studio SDK you already installed, its path is
> `~/Library/Android/sdk`, and the JDK it bundles is under
> `/Applications/Android Studio.app/Contents/jbr/Contents/Home`.

---

## Step 2 — Generate the Android project

Run this **outside** the repo (it creates a separate Android project — don't
commit it into this Next.js repo):

```bash
mkdir -p ~/Projects/meal-instructions-android
cd ~/Projects/meal-instructions-android

bubblewrap init --manifest https://www.mealinstructions.com/manifest.webmanifest
```

It reads the live manifest and prompts you. Answers that matter:

| Prompt | Answer | Why |
|---|---|---|
| Domain | `www.mealinstructions.com` | **Must include `www`.** Verification is per-origin; the apex is a different origin. |
| Application ID | `com.mealinstructions.twa` | Permanent — **cannot be changed after first Play upload.** |
| Display mode | `standalone` | Full-screen, no address bar. |
| Status bar colour | `#111111` | Matches `theme_color`. |
| Signing key | let it create one | Saves `android.keystore` + prints the password. |

> 🔐 **Back up `android.keystore` and its passwords immediately** (1Password, not
> this repo). Lose them and you can't ship updates to the same listing — ever.
> If you enrol in Play App Signing (recommended, and the default for new apps),
> Google holds the real key and this one becomes your *upload* key, which
> Google can help you reset. Enrol.

---

## Step 3 — Build

```bash
bubblewrap build
```

Outputs `app-release-bundle.aab` (upload this to Play) and
`app-release-signed.apk` (sideload this to test on a real phone).

Sideload to a plugged-in phone with USB debugging on:

```bash
adb install -r app-release-signed.apk
```

---

## Step 4 — Android Studio (optional)

You only need it to tweak the native shell — a splash animation, a share target,
push notifications. Open the folder `bubblewrap init` created:

**Android Studio → Open → `~/Projects/meal-instructions-android`**

Then **Build → Generate Signed Bundle / APK** is the GUI equivalent of
`bubblewrap build`. For a plain TWA you can ignore Android Studio entirely.

---

## Step 5 — Verify domain ownership (the step everyone gets wrong)

Without this the app *still works*, but shows a **browser address bar** across
the top — which looks broken and fails Play's polish review.

There is a chicken-and-egg here: the fingerprint that matters comes from Play,
but Play needs an upload first. So do it in this order.

**5a. Upload the `.aab` to Play Console → Internal testing.** You don't have to
release it — uploading is enough.

**5b. Copy the fingerprint** from
**Play Console → your app → Test and release → Setup → App integrity → App signing → App signing key certificate → SHA-256 certificate fingerprint.**

It looks like `AA:BB:CC:...:FF` (32 hex pairs).

**5c. Also grab your local upload key fingerprint** so sideloaded test builds
verify too:

```bash
bubblewrap fingerprint list
```

**5d. Set both in Vercel** → Project → Settings → Environment Variables
(Production), comma-separated, then **redeploy**:

```
ANDROID_PACKAGE_NAME=com.mealinstructions.twa
ANDROID_ASSETLINKS_FINGERPRINTS=<play-signing-sha256>,<upload-key-sha256>
```

**5e. Confirm it's live:**

```bash
curl -s https://www.mealinstructions.com/.well-known/assetlinks.json | jq .
```

Should return an array with your package name — **not `[]`**. An empty array
means the env var is missing, malformed, or you haven't redeployed. The route
silently drops fingerprints that don't match the `AA:BB:...` 32-pair format, so
a stray quote or a SHA-1 value will also produce `[]`.

Then check Google's own verifier:

```
https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://www.mealinstructions.com&relation=delegate_permission/common.handle_all_urls
```

**5f. Reinstall the app** (`adb uninstall com.mealinstructions.twa` then install
again). Verification is cached at first launch — an existing install won't
re-check. No address bar = you're done.

---

## Known behaviours for this app

- **Google sign-in** opens a Custom Tab, then returns to the app. Session
  persists — TWA shares Chrome's cookie jar for your origin.
- **Kroger cart** (`/api/kroger/*`) redirects to `kroger.com` and back. Kroger's
  domain isn't in `scope`, so it opens in a Custom Tab — expected, and it
  returns correctly.
- **`/shop` outbound links** open in a Custom Tab rather than in-app. Also expected.
- **No offline mode.** A TWA needs a network connection; there's no service
  worker in this repo. Worth adding later if you want the cook-time tables
  available at the grill.

---

## Play Store listing checklist

- [ ] $25 one-time Google Play developer registration
- [ ] Privacy policy URL → `https://www.mealinstructions.com/privacy` (already live)
- [ ] Data safety form — declare Google account sign-in + any Supabase-stored data
- [ ] Feature graphic 1024×500, phone screenshots (min 2)
- [ ] Content rating questionnaire
- [ ] **Verify assetlinks before production release** (Step 5)

---

## Updating later

| Change | What to do |
|---|---|
| Site content, pages, styling | Just deploy to Vercel. The app picks it up. |
| App name, icon, theme colour | Edit `app/manifest.ts`, deploy, then `bubblewrap update && bubblewrap build`, upload new `.aab`. |
| Version bump for a Play upload | `bubblewrap build` auto-increments `appVersionCode`. |
