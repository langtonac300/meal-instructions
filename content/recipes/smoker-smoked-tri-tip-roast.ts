import { Recipe } from '@/lib/types';

export default {
  "id": "0152",
  "slug": "smoker-smoked-tri-tip-roast",
  "title": "Smoked Santa Maria Style Tri-Tip Roast",
  "tagline": "Juicy California tri-tip roast slow-smoked with oak to medium-rare and seared for a dark peppery crust.",
  "appliance": "smoker",
  "categories": [
    "weekend",
    "high-protein"
  ],
  "protein": "beef",
  "prepMinutes": 15,
  "cookMinutes": 90,
  "totalMinutes": 105,
  "image": "/images/recipes/smoker-smoked-tri-tip-roast.jpg",
  "defaultServings": 6,
  "basis": "Tested on 2.5 lb beef tri-tip on wood pellet smoker at 225°F until 125°F internal, reverse-seared at 500°F to 135°F medium-rare.",
  "safeInternalTempF": 135,
  "restMinutes": 15,
  "cookTemp": "225°F (107°C) + High Sear",
  "equipmentNeeded": [
    "Smoker",
    "Meat Probe Thermometer",
    "Cast Iron Skillet or Direct Grill Grates",
    "Carving Knife"
  ],
  "quickVersion": {
    "temp": "225°F (107°C) + Sear",
    "totalTime": "1.5 hrs",
    "timerMinutes": 90,
    "bullets": [
      "Rub 2.5 lb tri-tip with garlic powder, coarse black pepper, and kosher salt.",
      "Smoke at 225°F for 60-75 minutes until internal temp reaches 125°F.",
      "Crank heat to 500°F (or sear on hot cast iron) for 2 minutes per side to 135°F.",
      "Rest 15 minutes, locate the two opposing grain directions, and slice thinly against the grain."
    ]
  },
  "detailedSteps": [
    {
      "stepNumber": 1,
      "title": "Santa Maria Dry Rub",
      "instruction": "Trim hard fat from a 2.5 lb beef tri-tip, leaving a 1/8-inch fat layer. Season all sides generously with 1 tbsp coarse black pepper, 1 tbsp kosher salt, 1 tsp garlic powder, 1 tsp onion powder, and 1/2 tsp cayenne.",
      "proTip": "Coarse 16-mesh black pepper allows smoke to stick and form a textbook bark."
    },
    {
      "stepNumber": 2,
      "title": "Gentle Oak Smoke",
      "instruction": "Preheat smoker to 225°F with red oak or mesquite wood. Insert a digital probe into the thickest center of the tri-tip. Smoke for 60 to 75 minutes until internal temp hits exactly 125°F.",
      "timerMinutes": 70,
      "targetTemp": "125°F internal",
      "proTip": "Low-temp smoking warms the meat gently from edge to center with zero gray overcooked band."
    },
    {
      "stepNumber": 3,
      "title": "Reverse Sear for Crust",
      "instruction": "Remove tri-tip. Crank smoker to 500°F or heat a large cast-iron skillet over high heat. Sear the tri-tip for 2 minutes per side until deeply charred and internal temperature reaches 135°F for perfect medium-rare.",
      "targetTemp": "135°F internal",
      "proTip": "High direct heat sears the exterior fat without cooking the already-tender interior."
    },
    {
      "stepNumber": 4,
      "title": "Two-Grain Carving Technique",
      "instruction": "Let rest on a cutting board tented with foil for 15 minutes. Note that tri-tip has two distinct grain directions meeting in the middle: cut roast in half where grain shifts, then slice thinly against the grain at a 45-degree angle.",
      "proTip": "Slicing with the grain produces chewy bites; slicing against the grain yields melt-in-your-mouth tenderness."
    }
  ],
  "ingredients": [
    {
      "item": "Beef tri-tip roast",
      "qty": "2 1/2",
      "qtyNumeric": 2.5,
      "unit": "lbs",
      "notes": "trimmed"
    },
    {
      "item": "Coarse black pepper (16-mesh)",
      "qty": "1",
      "qtyNumeric": 1,
      "unit": "tbsp"
    },
    {
      "item": "Diamond Crystal kosher salt",
      "qty": "1",
      "qtyNumeric": 1,
      "unit": "tbsp"
    },
    {
      "item": "Garlic powder",
      "qty": "1",
      "qtyNumeric": 1,
      "unit": "tsp"
    },
    {
      "item": "Onion powder",
      "qty": "1",
      "qtyNumeric": 1,
      "unit": "tsp"
    },
    {
      "item": "Cayenne pepper",
      "qty": "1/2",
      "qtyNumeric": 0.5,
      "unit": "tsp"
    },
    {
      "item": "Avocado oil or beef tallow",
      "qty": "1",
      "qtyNumeric": 1,
      "unit": "tbsp",
      "notes": "for searing"
    }
  ],
  "dadProTip": "Serve sliced tri-tip on toasted garlic sourdough bread with fresh chimichurri or pico de gallo.",
  "kidAdjustment": "Slice very thin for steak sandwiches and top with melted provolone cheese.",
  "reheatInstructions": "Reheat thin slices gently in a skillet with 1 tbsp beef broth over low heat for 2 minutes.",
  "nutrition": {
    "calories": 310,
    "proteinGrams": 42,
    "carbsGrams": 1,
    "fatGrams": 15,
    "source": "USDA FoodData Central #174032 (Beef bottom sirloin tri-tip roast cooked)"
  },
  "lastUpdated": "2026-08-30",
  "cookTempF": 225,
  "cookTempC": 107,
  "difficulty": "Weekend Project",
  "kidRating": 4,
  "sideSuggestions": [
    "Creamy mashed potatoes",
    "Warm dinner rolls",
    "Garden side salad"
  ],
  "keywords": [
    "smoked santa maria style tri-tip roast",
    "smoker beef",
    "smoker smoked tri tip",
    "beef smoker recipe",
    "how to cook smoked tri"
  ],
  "datePublished": "2026-08-30"
} as Recipe;
