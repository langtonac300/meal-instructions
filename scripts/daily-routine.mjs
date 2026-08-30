#!/usr/bin/env node
/**
 * scripts/daily-routine.mjs
 * 
 * Orchestrator and companion tool for the daily content routine.
 *
 * Usage:
 *   node scripts/daily-routine.mjs               # Shows routine menu and gap summary
 *   node scripts/daily-routine.mjs --survey      # Runs full gap survey (content-gaps.mjs)
 *   node scripts/daily-routine.mjs --check       # Runs all 5 quality & SEO gates
 *   node scripts/daily-routine.mjs --ship "msg"  # Runs gates, commits, pushes, triggers Vercel
 *   node scripts/daily-routine.mjs --status      # Queries GitHub/Vercel live deployment status
 */

import { execSync, spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

const args = process.argv.slice(2);
const flag = args[0] || '';

const colors = {
  bold: (t) => `\x1b[1m${t}\x1b[0m`,
  green: (t) => `\x1b[32m${t}\x1b[0m`,
  yellow: (t) => `\x1b[33m${t}\x1b[0m`,
  blue: (t) => `\x1b[34m${t}\x1b[0m`,
  cyan: (t) => `\x1b[36m${t}\x1b[0m`,
  red: (t) => `\x1b[31m${t}\x1b[0m`,
};

function run(cmd, inherit = true) {
  try {
    return execSync(cmd, { cwd: root, stdio: inherit ? 'inherit' : 'pipe', encoding: 'utf-8' });
  } catch (err) {
    if (!inherit) throw err;
    process.exit(1);
  }
}

function checkDeploymentStatus() {
  console.log(colors.cyan('\n🔍 Querying live Vercel / GitHub Deployment status...'));
  try {
    const deploymentId = execSync(
      "gh api repos/langtonac300/cooking-repo/deployments --jq '.[0].id'",
      { cwd: root, encoding: 'utf-8' }
    ).trim();

    if (!deploymentId) {
      console.log(colors.yellow('No deployments found or gh CLI not authenticated.'));
      return;
    }

    const statusOutput = execSync(
      `gh api repos/langtonac300/cooking-repo/deployments/${deploymentId}/statuses --jq '.[0] | "\\(.state) | \\(.environment_url) | \\(.created_at)"'`,
      { cwd: root, encoding: 'utf-8' }
    ).trim();

    const [state, url, createdAt] = statusOutput.split(' | ');
    const stateColored =
      state === 'success'
        ? colors.green('● SUCCESS')
        : state === 'pending' || state === 'in_progress'
        ? colors.yellow('◌ BUILDING / PENDING')
        : colors.red(`✕ ${state.toUpperCase()}`);

    console.log(`\n  Deployment ID : ${colors.bold(deploymentId)}`);
    console.log(`  Status        : ${stateColored}`);
    console.log(`  Target URL    : ${colors.blue(url || 'https://cooking-repo.vercel.app')}`);
    console.log(`  Updated At    : ${createdAt}\n`);
  } catch (err) {
    console.log(colors.yellow('Note: gh CLI not installed or GitHub API rate limited.'));
    console.log('To view live Vercel deployments, check: https://vercel.com/alex-langton/cooking-repo\n');
  }
}

if (flag === '--survey' || flag === '--gaps') {
  run('node scripts/content-gaps.mjs');
} else if (flag === '--check') {
  run('./scripts/ship-content.sh --check');
} else if (flag === '--status') {
  checkDeploymentStatus();
} else if (flag === '--ship') {
  const msg = args.slice(1).join(' ') || '';
  if (!msg) {
    console.error(colors.red('Error: Commit message required. Example: npm run ship "feat(content): add 10 datasheets"'));
    process.exit(1);
  }
  run(`./scripts/ship-content.sh "${msg}"`);
  checkDeploymentStatus();
} else {
  // Default Overview
  console.log(colors.bold('\n🍳 DAD MEALS — DAILY CONTENT ROUTINE ENGINE'));
  console.log('--------------------------------------------------');
  console.log(`1. ${colors.cyan('Survey Gaps')}        : npm run gaps`);
  console.log(`2. ${colors.cyan('Audit Gates')}        : npm run ship -- --check`);
  console.log(`3. ${colors.cyan('Ship to Vercel')}     : npm run ship "feat(content): <description>"`);
  console.log(`4. ${colors.cyan('Deployment Status')} : npm run deploy:status`);
  console.log('--------------------------------------------------');
  console.log(colors.bold('\nRunning Content Gap Survey:\n'));
  run('node scripts/content-gaps.mjs');
}
