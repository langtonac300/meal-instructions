# MCP Directory Submission Guide

This guide gives you the exact copy-paste metadata and 1-click links to submit the **Dad Meals / Meal Instructions MCP Server** to all major Model Context Protocol registries: **Smithery.ai**, **PulseMCP**, **Glama.ai**, and **GitHub Awesome MCP**.

---

## 📋 Universal Server Metadata

| Field | Value to Copy-Paste |
|---|---|
| **Server Name** | `dad-meals` (or `Meal Instructions MCP`) |
| **Short Tagline** | `No-fluff culinary physics, cook times across 8 appliances, dual-mode recipes, and kitchen troubleshooting.` |
| **Description** | `Verified, zero-hallucination cooking intelligence engine for AI agents. Provides 8 typed tools for exact cook times & temperatures, portion-scaled recipes, takeout revival, catering meat math, carryover pull temps, and 5-second kitchen disaster fixes.` |
| **Categories** | `Lifestyle`, `Home & Kitchen`, `Productivity`, `Reference & Search` |
| **Tags / Keywords** | `cooking`, `recipes`, `air-fryer`, `meat-temp`, `culinary-physics`, `food-science`, `kitchen`, `zero-fluff` |
| **Transport Types** | `stdio` (Local CLI) and `http` / `sse` (Web API) |
| **Live Web Endpoint** | `https://www.mealinstructions.com/api/mcp` |
| **Authentication** | `None (Zero API keys required)` |
| **Primary Tools (8)** | `get_cook_time`, `get_recipe`, `search_recipes`, `revive_leftover`, `emergency_frozen_cook`, `calculate_meat_math`, `calculate_pull_temp`, `troubleshoot_cooking` |

---

## 1. Smithery.ai (Automated Indexing & 1-Click Install)

Smithery.ai indexes repositories automatically using [`smithery.yaml`](file:///Users/alexlangton/Documents/10_Cooking/smithery.yaml) (already committed to your repo root).

1. Push your latest commits to GitHub.
2. Go to **[smithery.ai/submit](https://smithery.ai/submit)** (or [smithery.ai](https://smithery.ai)).
3. Paste your public GitHub repository URL (e.g. `https://github.com/<your-username>/<repo>`).
4. Click **Submit**.
5. Once indexed, anyone will be able to install Dad Meals to Claude Desktop or Cursor with a single command:
   ```bash
   npx -y @smithery/cli install dad-meals --client claude
   ```

---

## 2. PulseMCP ([pulsemcp.com](https://pulsemcp.com))

PulseMCP is one of the largest curated directories of MCP servers.

1. Go to **[pulsemcp.com](https://pulsemcp.com)** and click **Submit Server** (or open a submission issue).
2. Fill in the form fields:
   * **Name**: `Dad Meals MCP`
   * **GitHub URL**: `https://github.com/<your-username>/<repo>`
   * **Website**: `https://www.mealinstructions.com`
   * **Description**: `No-fluff culinary physics, cook times across 8 appliances, dual-mode recipes, and kitchen troubleshooting tools.`
   * **Category**: `Lifestyle` / `Reference`
   * **Runs via**: `npx` / `stdio`
3. Click **Submit**.

---

## 3. GitHub: `punkpeye/awesome-mcp-servers`

This is the canonical GitHub community registry (with thousands of stars).

1. Fork **[github.com/punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers)**.
2. Open `README.md` and find the **Lifestyle & Household** (or **Utilities / Reference**) section.
3. Add this line in alphabetical order:
   ```markdown
   - [Dad Meals MCP](https://github.com/<your-username>/<repo>) - No-fluff culinary physics, cook times across 8 appliances, dual-mode recipes, and kitchen disaster troubleshooting.
   ```
4. Open a Pull Request titled: `Add Dad Meals MCP Server`.

---

## 4. Glama.ai MCP Directory ([glama.ai/mcp/servers](https://glama.ai/mcp/servers))

Glama maintains an open registry of verified MCP servers.

1. Go to **[glama.ai/mcp/servers](https://glama.ai/mcp/servers)**.
2. Click **Submit an MCP Server**.
3. Provide your GitHub repository URL and select `stdio` transport.
4. Glama will automatically inspect tools and publish the server card.

---

## 5. (Optional) Publish to npm for `npx dadmeals-mcp`

If you want users to run `npx dadmeals-mcp` without cloning:

```bash
# 1. Log in to npm (one-time)
npm login

# 2. Publish package
npm publish --access public
```
*(Once published, any AI client configuration can run `npx -y dadmeals-mcp` directly).*
