import { NextResponse } from 'next/server';

/**
 * Digital Asset Links — https://developers.google.com/digital-asset-links
 *
 * Android checks https://www.mealinstructions.com/.well-known/assetlinks.json
 * on first launch of the Trusted Web Activity. If the app's signing certificate
 * fingerprint is listed here, Chrome drops the URL bar and the site runs
 * full-screen. If verification fails the app still works, but renders inside a
 * visible Custom Tab with the address bar showing.
 *
 * Fingerprints come from env so a signing-key rotation (or adding Play App
 * Signing's upload key) is a dashboard change, not a code change:
 *
 *   ANDROID_PACKAGE_NAME=com.mealinstructions.twa
 *   ANDROID_ASSETLINKS_FINGERPRINTS=AA:BB:...:FF,11:22:...:99
 *
 * See ANDROID.md for how to read the fingerprints out of Play Console.
 */

export const dynamic = 'force-dynamic';

const DEFAULT_PACKAGE_NAME = 'com.mealinstructions.twa';

function parseFingerprints(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(',')
    .map((fingerprint) => fingerprint.trim().toUpperCase())
    // SHA-256 as Play Console prints it: 32 hex pairs joined by colons.
    .filter((fingerprint) => /^([0-9A-F]{2}:){31}[0-9A-F]{2}$/.test(fingerprint));
}

export async function GET() {
  const packageName = process.env.ANDROID_PACKAGE_NAME || DEFAULT_PACKAGE_NAME;
  const fingerprints = parseFingerprints(process.env.ANDROID_ASSETLINKS_FINGERPRINTS);

  // No fingerprints configured yet → serve a valid, empty statement list.
  // Google's verifier reads this as "no app is authorised" rather than erroring.
  const statements = fingerprints.length
    ? [
        {
          relation: ['delegate_permission/common.handle_all_urls'],
          target: {
            namespace: 'android_app',
            package_name: packageName,
            sha256_cert_fingerprints: fingerprints,
          },
        },
      ]
    : [];

  return NextResponse.json(statements, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
    },
  });
}
