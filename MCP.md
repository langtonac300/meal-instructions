# Meal Instructions Model Context Protocol (MCP) Server

The **Meal Instructions MCP Server** provides AI assistants (Claude Desktop, Cursor, Google Antigravity, Raycast, and ChatGPT) with direct, typed, zero-fluff programmatic access to our verified kitchen datasets.

---

## 🛠️ Available MCP Tools

| Tool | Purpose | Key Inputs | Output |
|---|---|---|---|
| **`get_cook_time`** | Exact time, temp, flip, & safe internal temp | `food`, `appliance?`, `state?` | Temp (°F/°C), time range, flip schedule, target internal temp, pro tips, testing hardware. |
| **`get_recipe`** | Retrieve recipe in quick or detailed mode with portion scaling | `slug`, `mode?`, `servings?` | Scaled ingredients, bullet/step instructions, pro tip, reheat info, nutrition. |
| **`search_recipes`** | Search 70 recipes by constraint | `query?`, `protein?`, `appliance?`, `category?`, `max_total_minutes?` | List of matching recipes with timing and difficulty. |
| **`revive_leftover`** | Restore crispiness to cold takeout | `item`, `appliance?` | Time, temp, anti-sogginess pro tip, microwave warning. |
| **`emergency_frozen_cook`** | Check if frozen meat can be cooked without thawing | `item` | Safe appliances, banned appliances, timing comparison, emergency cold water thaw time. |
| **`calculate_meat_math`** | Catering & party meat purchase scaler | `guest_count_adults`, `guest_count_children?`, `meat_type`, `eater_profile?` | Raw purchase weight (lbs), cooked yield (lbs), shrinkage %, buying pro tips. |
| **`calculate_pull_temp`** | Thermometer pull temp with carryover rise | `meat`, `target_doneness?` | Exact pull temp (°F), final rested temp (°F), carryover rise (°F), rest minutes. |
| **`troubleshoot_cooking`** | 1-click diagnoses for kitchen disasters | `symptom`, `appliance?` | Root cause diagnosis, 5-second instant fix, future prevention rule. |

---

## 🚀 Quick Start / Local Configuration

### 1. Claude Desktop
Add the following entry to your `claude_desktop_config.json`:

* **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
* **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "meal-instructions": {
      "command": "node",
      "args": [
        "--experimental-strip-types",
        "/Users/alexlangton/Documents/10_Cooking/bin/dadmeals-mcp.mjs"
      ]
    }
  }
}
```

---

### 2. Cursor IDE
Add to your project's `.cursor/mcp.json` or Global Cursor Settings:

```json
{
  "mcpServers": {
    "meal-instructions": {
      "command": "node",
      "args": [
        "--experimental-strip-types",
        "/Users/alexlangton/Documents/10_Cooking/bin/dadmeals-mcp.mjs"
      ]
    }
  }
}
```

---

### 3. CLI Direct Execution
You can test the MCP server directly from your terminal:

```bash
# Run automated test suite
npm run test:mcp

# Run interactive STDIO server
npm run mcp
```

---

### 4. Remote Web Endpoint
The MCP server is also exposed over HTTP for remote and web-based AI tools:

```http
GET http://localhost:3000/api/mcp
```

Returns server capabilities, supported tools, and JSON schemas.

---

## 🧪 Example AI Prompts Handled by MCP

* *"How long do I cook bone-in chicken thighs in the air fryer?"*
  → Calls `get_cook_time(food: "bone-in-thighs", appliance: "air-fryer")`
* *"I have 12 adults coming over for pulled pork and football. How many pounds of pork butt should I buy?"*
  → Calls `calculate_meat_math(guest_count_adults: 12, meat_type: "pulled-pork", eater_profile: "big_eaters")`
* *"My air fryer is billowing white smoke while cooking bacon. How do I fix it right now?"*
  → Calls `troubleshoot_cooking(symptom: "smoking", appliance: "air-fryer")`
* *"I have 6 people for dinner. Give me the quick version of the chicken tenders recipe scaled for 6."*
  → Calls `get_recipe(slug: "crispy-air-fryer-chicken-tenders", mode: "quick", servings: 6)`
* *"What temperature do I pull a 1.5-inch ribeye off cast iron for medium-rare?"*
  → Calls `calculate_pull_temp(meat: "thick-steak", target_doneness: "medium_rare")`
