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

All three are live in production. Confirm before starting:

```bash
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' https://www.mealinstructions.com/manifest.webmanifest
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' https://www.mealinstructions.com/.well-known/assetlinks.json
```

Expect `200 application/manifest+json` and `200 application/json`. The assetlinks
body is `[]` until you complete Step 5 — that's correct, not a failure.

You supply two env vars and run the CLI. Nothing else in the repo needs to change.

---

## Step 1 — Prerequisites (Mac, one time)

**Nothing to install.** Bubblewrap downloads its own JDK 17 and Android SDK into
`~/.bubblewrap/` on first run — it prompts for each, and saying yes to both is
the recommended path. A separately installed JDK is not needed and won't be
used; installing Temurin via Homebrew first is a wasted 186 MB download and a
`sudo` prompt.

**Don't install the CLI globally either.** `npm install -g @bubblewrap/cli` fails with
`EACCES: permission denied, mkdir '/usr/local/lib/node_modules/@bubblewrap'` on a
default macOS Node install, and the usual workaround — re-running it under `sudo`
— leaves root owning files inside your `node_modules`, which breaks *later*
unrelated npm installs. Run it through `npx` instead, which needs no install and
no elevated permissions:

```bash
npx @bubblewrap/cli --version
```

Every `bubblewrap <cmd>` below is therefore written as `npx @bubblewrap/cli <cmd>`.

<details>
<summary>If you'd rather have the <code>bubblewrap</code> command on your PATH</summary>

Point npm's global prefix at a directory you own, then install normally:

```bash
mkdir -p ~/.npm-global
npm config set prefix ~/.npm-global
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
npm install -g @bubblewrap/cli
```
</details>

### What the first run downloads

Two prompts, in this order. Say yes to both:

| Prompt | Size | Lands in |
|---|---|---|
| `Do you want Bubblewrap to install the JDK (recommended)?` | ~175 MB | `~/.bubblewrap/jdk` |
| `Do you want Bubblewrap to install the Android SDK (recommended)?` | ~500 MB | `~/.bubblewrap/android_sdk` |

> Answering "No" to either means supplying your own path. Android Studio's copies
> are `~/Library/Android/sdk` for the SDK and
> `/Applications/Android Studio.app/Contents/jbr/Contents/Home` for the JDK — but
> letting Bubblewrap manage its own avoids version-mismatch failures at build time.

---

## Step 2 — Generate the Android project

Run this **outside** the repo (it creates a separate Android project — don't
commit it into this Next.js repo):

```bash
mkdir -p ~/Projects/meal-instructions-android
cd ~/Projects/meal-instructions-android

npx @bubblewrap/cli init --manifest https://www.mealinstructions.com/manifest.webmanifest
```

It reads the live manifest and prompts you. Answers that matter:

| Prompt | Answer | Why |
|---|---|---|
| Domain | `www.mealinstructions.com` | **Must include `www`.** Verification is per-origin; the apex is a different origin. |
| Application ID | `com.mealinstructions.twa` | Permanent — **cannot be changed after first Play upload.** |
| Display mode | `standalone` | Full-screen, no address bar. |
| Status bar colour | `#111111` | Matches `theme_color`. |
| Signing key | let it create one | Saves `android.keystore` + prints the password. |

After the questions, Bubblewrap creates the signing key and asks for **two
passwords** (keystore + key) plus certificate details — name, organisation,
country. Any accurate values are fine for the cert; the passwords are not.

> 🔐 **Generate both passwords in a password manager before you type them, and
> save them there along with `android.keystore` immediately** (1Password, not
> this repo). Lose them and you can't ship updates to the same listing — ever.
> This is the only genuinely unrecoverable step in the whole process.
> If you enrol in Play App Signing (recommended, and the default for new apps),
> Google holds the real key and this one becomes your *upload* key, which
> Google can help you reset. Enrol.

---

## Step 3 — Build

```bash
npx @bubblewrap/cli build
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
push notifications. Open the folder `npx @bubblewrap/cli init` created:

**Android Studio → Open → `~/Projects/meal-instructions-android`**

Then **Build → Generate Signed Bundle / APK** is the GUI equivalent of
`npx @bubblewrap/cli build`. For a plain TWA you can ignore Android Studio entirely.

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
npx @bubblewrap/cli fingerprint list
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
| App name, icon, theme colour | Edit `app/manifest.ts`, deploy, then `npx @bubblewrap/cli update && npx @bubblewrap/cli build`, upload new `.aab`. |
| Version bump for a Play upload | `npx @bubblewrap/cli build` auto-increments `appVersionCode`. |
