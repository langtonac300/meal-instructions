import { Recipe } from '@/lib/types';

export default {
  "id": "0069",
  "slug": "smoked-chicken-wings-crispy-skin",
  "title": "Smoked Chicken Wings (Crispy Skin)",
  "tagline": "Juicy wood-smoked chicken party wings with a mahogany smoke ring and shatteringly crispy skin using the baking powder dry brine trick.",
  "appliance": "smoker",
  "categories": [
    "game-day",
    "weekend"
  ],
  "protein": "chicken",
  "prepMinutes": 10,
  "cookMinutes": 75,
  "totalMinutes": 85,
  "defaultServings": 4,
  "basis": "Traeger Pro 575 2-Temp Smoke Curve (225\u00b0F 60m + 400\u00b0F 15m); USDA FSIS 165\u00b0F standard.",
  "safeInternalTempF": 165,
  "restMinutes": 3,
  "cookTemp": "225\u00b0F (107\u00b0C) then 400\u00b0F (204\u00b0C) Finish",
  "cookTempF": 225,
  "cookTempC": 107,
  "equipmentNeeded": [
    "Pellet or Charcoal Smoker",
    "Hickory or Fruitwood Pellets",
    "Tongs",
    "Large Mixing Bowl"
  ],
  "quickVersion": {
    "temp": "225\u00b0F for 1 hr, then 400\u00b0F for 15m",
    "totalTime": "75 mins",
    "timerMinutes": 75,
    "flipAtMinutes": 45,
    "bullets": [
      "Toss 3 lbs dry party wings with 1 tbsp aluminum-free baking powder, garlic, smoked paprika, and salt.",
      "Smoke at 225\u00b0F for 60 minutes to infuse deep wood smoke and render fat.",
      "Crank smoker to 400\u00b0F for 15 minutes to blister the skin into glass-like crunch.",
      "Toss immediately in warm buffalo sauce or garlic parmesan butter."
    ]
  },
  "detailedSteps": [
    {
      "stepNumber": 1,
      "title": "Baking Powder Dry Brine Technique",
      "instruction": "Thoroughly pat 3 lbs raw chicken party wings (drums and flats) completely dry with paper towels. In a large bowl, toss wings with 1 tbsp aluminum-free baking powder, 1 tsp garlic powder, 1 tsp smoked paprika, 1 tsp kosher salt, and 1/2 tsp black pepper.",
      "proTip": "Baking powder raises the skin's pH level, breaking down peptide bonds so moisture evaporates fast and skin turns blistered and crispy on a low-temp smoker."
    },
    {
      "stepNumber": 2,
      "title": "Low-Temp Smoke Infusion Phase",
      "instruction": "Preheat smoker to 225\u00b0F with apple, cherry, or pecan wood. Arrange wings in a single layer with 1/2-inch space between. Smoke for 60 minutes.",
      "timerMinutes": 60,
      "proTip": "The first 60 minutes is where the meat absorbs 95% of its wood smoke flavor and builds a red smoke ring."
    },
    {
      "stepNumber": 3,
      "title": "High Heat Flash Crisp Phase",
      "instruction": "Turn smoker temperature up to 400\u00b0F (or transfer wings to a 400\u00b0F air fryer/oven). Cook for 12 to 15 more minutes, flipping once, until skin crackles and internal temperature reaches 175\u00b0F\u2013185\u00b0F.",
      "timerMinutes": 15,
      "proTip": "Smoked chicken wings have rubbery skin unless finished at 400\u00b0F+ to sizzle the rendered skin."
    },
    {
      "stepNumber": 4,
      "title": "Post-Smoke Sauce Toss & Service",
      "instruction": "Transfer crispy wings to a large bowl. Toss with 1/2 cup warm buffalo sauce, honey BBQ, or garlic parmesan butter. Serve immediately with celery and ranch.",
      "proTip": "Sauce wings only right before serving so the crisp skin doesn't soften on the platter."
    }
  ],
  "ingredients": [
    {
      "item": "Chicken Party Wings (Flats & Drums)",
      "qty": "3",
      "qtyNumeric": 3,
      "unit": "lbs",
      "notes": "patted bone dry"
    },
    {
      "item": "Aluminum-Free Baking Powder",
      "qty": "1",
      "qtyNumeric": 1,
      "unit": "tbsp",
      "notes": "not baking soda"
    },
    {
      "item": "Smoked Paprika",
      "qty": "1",
      "qtyNumeric": 1,
      "unit": "tsp"
    },
    {
      "item": "Garlic Powder",
      "qty": "1",
      "qtyNumeric": 1,
      "unit": "tsp"
    },
    {
      "item": "Kosher Salt",
      "qty": "1",
      "qtyNumeric": 1,
      "unit": "tsp"
    },
    {
      "item": "Black Pepper",
      "qty": "1/2",
      "qtyNumeric": 0.5,
      "unit": "tsp"
    },
    {
      "item": "Buffalo Wing Sauce or BBQ",
      "qty": "1/2",
      "qtyNumeric": 0.5,
      "unit": "cup",
      "notes": "warm for tossing"
    }
  ],
  "dadProTip": "The biggest failure on a smoker is rubbery, chewy chicken skin. Two tricks fix this permanently: 1) Toss raw dry wings with 1 tbsp baking powder before smoking, and 2) Crank the smoker to 400\u00b0F for the final 15 minutes. You get deep wood-fire smoke with air-fryer level crunch.",
  "kidAdjustment": "Leave half the wings dry-rubbed or tossed in mild honey barbecue sauce.",
  "sideSuggestions": [
    "Celery & carrot sticks with ranch",
    "Air fryer french fries",
    "Macaroni salad"
  ],
  "reheatInstructions": "Reheat smoked wings in air fryer at 380°F for 4 minutes to restore crackling skin, or in a 400°F oven for 8 minutes.",
  "nutrition": {
    "calories": 380,
    "proteinGrams": 32,
    "carbsGrams": 2,
    "fatGrams": 26,
    "source": "USDA FoodData Central #171077"
  },
  "kidRating": 5,
  "difficulty": "Easy",
  "keywords": [
    "smoked chicken wings crispy skin",
    "crispy wings on pellet smoker",
    "baking powder smoked wings",
    "game day smoked wings"
  ],
  "datePublished": "2026-08-29",
  "lastUpdated": "2026-08-29",
  "image": "/images/hero/buffalo-wings.jpg"
} satisfies Recipe;
