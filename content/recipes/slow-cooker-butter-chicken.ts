import { Recipe } from '@/lib/types';

export default {
  "id": "0223",
  "slug": "slow-cooker-butter-chicken",
  "title": "Slow Cooker Butter Chicken",
  "tagline": "A restaurant-style makhani sauce built on garam masala, tomato, and cream — chicken thighs simmer 4 hours on low then finish with butter and cream stirred in at the end.",
  "appliance": "slow-cooker",
  "categories": [
    "one-pan",
    "high-protein",
    "kid-approved"
  ],
  "protein": "chicken",
  "prepMinutes": 15,
  "cookMinutes": 240,
  "totalMinutes": 260,
  "image": "/images/recipes/slow-cooker-butter-chicken.jpg",
  "defaultServings": 6,
  "basis": "Tested on 2.5 lbs boneless skinless chicken thighs with 28 oz crushed tomatoes, 1 tbsp garam masala, 1 tbsp ginger paste, and 1 cup heavy cream added at the end in a 6-qt Crock-Pot.",
  "safeInternalTempF": 165,
  "restMinutes": 5,
  "cookTemp": "Low 4 hours (200°F / 93°C)",
  "cookTempF": 200,
  "cookTempC": 93,
  "equipmentNeeded": [
    "6-qt Slow Cooker",
    "12-inch Skillet",
    "Wooden Spoon"
  ],
  "quickVersion": {
    "temp": "Low 4 hours + 15 min finish",
    "totalTime": "4 hrs 15 min",
    "timerMinutes": 240,
    "bullets": [
      "Bloom garam masala, cumin, paprika in butter with onion, garlic, ginger for 4 min.",
      "Combine spiced base with tomatoes, chicken thighs, sugar, salt in slow cooker.",
      "Cook LOW 4 hours. Stir in 1 cup heavy cream and 4 tbsp butter at the end.",
      "Warm 15 minutes uncovered. Finish with cilantro and squeeze of lemon."
    ]
  },
  "detailedSteps": [
    {
      "stepNumber": 1,
      "title": "Bloom the Spices in Butter",
      "instruction": "Melt 3 tbsp butter in a 12-inch skillet over medium heat. Add 1 diced yellow onion and cook 4 minutes until translucent. Add 4 minced garlic cloves and 2 tbsp ginger paste (or 1 tbsp grated fresh ginger); stir 1 minute.",
      "timerMinutes": 5,
      "proTip": "Fresh ginger versus paste is a real difference here — the fresh version has a brighter, more citrusy top note. Paste is fine and shelf-stable; fresh is worth the extra 90 seconds."
    },
    {
      "stepNumber": 2,
      "title": "Toast the Ground Spices",
      "instruction": "Add 1 tbsp garam masala, 1 tsp ground cumin, 1 tsp sweet paprika, 1 tsp turmeric, and 1/2 tsp cayenne (or to taste). Stir 45 seconds until deeply fragrant. The spices should sizzle in the fat and darken slightly.",
      "timerMinutes": 1,
      "proTip": "Blooming ground spices in fat unlocks their flavor. Adding them raw to the slow cooker gives you a dusty, muted sauce — this 45-second toast changes the entire dish."
    },
    {
      "stepNumber": 3,
      "title": "Transfer to Slow Cooker with Tomatoes",
      "instruction": "Scrape the spiced onion mixture into the slow cooker. Add 28 oz crushed tomatoes, 2 tbsp tomato paste, 1 tbsp brown sugar, and 1.5 tsp kosher salt. Stir to combine.",
      "proTip": "Brown sugar tames the tomato acidity — Indian restaurants use it too. Skip it and the finished sauce leans sharp instead of round."
    },
    {
      "stepNumber": 4,
      "title": "Nest the Chicken Thighs",
      "instruction": "Cut 2.5 lbs boneless skinless chicken thighs into 2-inch chunks. Nest them into the sauce so they are 3/4 submerged. Do not stir — let the sauce bathe them from below.",
      "proTip": "Thighs, not breasts. Breasts turn stringy over 4 hours in a slow cooker; thighs stay tender because of their higher fat content."
    },
    {
      "stepNumber": 5,
      "title": "Slow Cook on LOW",
      "instruction": "Cover and cook on LOW for 4 hours (or HIGH for 2.5 hours). Chicken should read 175°F+ and shred with light fork pressure.",
      "timerMinutes": 240,
      "targetTemp": "175°F internal for tender shredding",
      "proTip": "Skimming the surface at hour 3 with a spoon removes excess oil that would otherwise separate on top of the finished sauce."
    },
    {
      "stepNumber": 6,
      "title": "Finish with Cream and Butter",
      "instruction": "Kill the slow cooker heat. Stir in 1 cup heavy cream and 4 tbsp cold butter cut into cubes. Cover and let sit 15 minutes to warm through. Just before serving, stir in 2 tbsp fresh lemon juice and 1/4 cup chopped cilantro.",
      "timerMinutes": 15,
      "proTip": "Cream added at the start curdles over 4 hours of low heat. Adding it at the very end is what gives the sauce that silky orange color of restaurant butter chicken."
    }
  ],
  "ingredients": [
    { "item": "Boneless Skinless Chicken Thighs", "qty": "2 1/2", "qtyNumeric": 2.5, "unit": "lbs", "notes": "cut into 2-inch chunks" },
    { "item": "Crushed Tomatoes", "qty": "28", "qtyNumeric": 28, "unit": "oz", "notes": "1 can" },
    { "item": "Heavy Cream", "qty": "1", "qtyNumeric": 1, "unit": "cup" },
    { "item": "Unsalted Butter", "qty": "7", "qtyNumeric": 7, "unit": "tbsp", "notes": "3 for bloom, 4 for finish" },
    { "item": "Yellow Onion", "qty": "1", "qtyNumeric": 1, "unit": "large", "notes": "diced" },
    { "item": "Fresh Garlic", "qty": "4", "qtyNumeric": 4, "unit": "cloves", "notes": "minced" },
    { "item": "Ginger Paste", "qty": "2", "qtyNumeric": 2, "unit": "tbsp", "notes": "or 1 tbsp fresh grated" },
    { "item": "Garam Masala", "qty": "1", "qtyNumeric": 1, "unit": "tbsp" },
    { "item": "Ground Cumin", "qty": "1", "qtyNumeric": 1, "unit": "tsp" },
    { "item": "Sweet Paprika", "qty": "1", "qtyNumeric": 1, "unit": "tsp" },
    { "item": "Turmeric", "qty": "1", "qtyNumeric": 1, "unit": "tsp" },
    { "item": "Cayenne", "qty": "1/2", "qtyNumeric": 0.5, "unit": "tsp", "notes": "to taste" },
    { "item": "Tomato Paste", "qty": "2", "qtyNumeric": 2, "unit": "tbsp" },
    { "item": "Brown Sugar", "qty": "1", "qtyNumeric": 1, "unit": "tbsp" },
    { "item": "Kosher Salt", "qty": "1 1/2", "qtyNumeric": 1.5, "unit": "tsp" },
    { "item": "Fresh Lemon Juice", "qty": "2", "qtyNumeric": 2, "unit": "tbsp" },
    { "item": "Fresh Cilantro", "qty": "1/4", "qtyNumeric": 0.25, "unit": "cup", "notes": "chopped, for finish" }
  ],
  "dadProTip": "Buy garam masala from an actual Indian grocer or a specialty spice shop. Grocery-store garam masala is often stale and one-note; a fresh spice-shop blend has 8-10 aromatics and will elevate every curry you cook from now on.",
  "kidAdjustment": "Cut cayenne to 1/8 tsp and skip the finishing lemon. Serve over basmati with a naan for scooping — kids find dipping bread more inviting than a bowl of anything red.",
  "sideSuggestions": [
    "Basmati rice or jeera rice",
    "Warm naan or roti",
    "Cucumber-mint raita"
  ],
  "reheatInstructions": "Warm in a covered saucepan over medium-low for 8 minutes, stirring in 2 tbsp cream or milk to loosen. Freeze without the cream — add fresh cream when reheating from frozen for the same silky finish.",
  "faqs": [
    { "q": "Can I use chicken breasts?", "a": "Yes but cut cook time to 2.5 hours on LOW. Breasts overcook past that and turn stringy in the sauce." },
    { "q": "Coconut milk instead of cream?", "a": "Yes, one 13.5 oz can full-fat coconut milk swaps for the cream. Lighter, slightly sweeter — closer to a South Indian style than a Punjabi butter chicken." }
  ],
  "nutrition": {
    "calories": 495,
    "proteinGrams": 34,
    "carbsGrams": 14,
    "fatGrams": 34,
    "source": "USDA FoodData Central #171465 (chicken thigh) and #170859 (heavy cream)"
  },
  "kidRating": 4,
  "difficulty": "Easy",
  "keywords": [
    "slow cooker butter chicken",
    "crock pot butter chicken",
    "makhani chicken",
    "indian butter chicken"
  ],
  "datePublished": "2026-08-30",
  "lastUpdated": "2026-08-30"
} satisfies Recipe;
