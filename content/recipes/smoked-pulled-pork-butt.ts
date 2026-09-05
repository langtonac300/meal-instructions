import { Recipe } from '@/lib/types';

export default {
  "id": "0227",
  "slug": "smoked-pulled-pork-butt",
  "title": "Smoked Pulled Pork Butt",
  "tagline": "An 8-lb pork shoulder rubbed the night before, smoked at 225°F over hickory for 12 hours, wrapped at 165°F and pushed to 203°F for the definitive Southern pulled pork.",
  "appliance": "smoker",
  "categories": [
    "weekend",
    "high-protein",
    "game-day"
  ],
  "protein": "pork",
  "prepMinutes": 30,
  "cookMinutes": 720,
  "totalMinutes": 780,
  "image": "/images/recipes/smoked-pulled-pork-butt.jpg",
  "defaultServings": 12,
  "basis": "Tested on an 8-lb bone-in Boston butt, dry-rubbed 24 hours, smoked at 225°F using hickory chunks on a Weber Smokey Mountain 22, wrapped in butcher paper at 165°F internal, pushed to 203°F, rested 1 hour in a cooler.",
  "safeInternalTempF": 145,
  "restMinutes": 60,
  "costEstimateUSD": 24,
  "cookTemp": "225°F (107°C) smoker temperature",
  "cookTempF": 225,
  "cookTempC": 107,
  "equipmentNeeded": [
    "Charcoal Smoker or Pellet Grill",
    "Leave-In Probe Thermometer",
    "Instant-Read Thermometer",
    "Butcher Paper",
    "Empty Cooler for Rest",
    "Hickory or Apple Wood Chunks"
  ],
  "quickVersion": {
    "temp": "225°F (107°C) low and slow",
    "totalTime": "12 hrs smoke + 1 hr rest",
    "timerMinutes": 720,
    "bullets": [
      "Rub 8 lb pork butt with paprika-brown sugar-salt blend; refrigerate 24 hrs.",
      "Smoke at 225°F over hickory until 165°F internal (about 8 hrs).",
      "Wrap tightly in pink butcher paper; return until 203°F internal (about 4 more hrs).",
      "Rest 1 hour wrapped in a dry cooler; shred and toss with pan juices."
    ]
  },
  "detailedSteps": [
    {
      "stepNumber": 1,
      "title": "Dry Rub 24 Hours Ahead",
      "instruction": "In a small bowl, mix 3 tbsp brown sugar, 3 tbsp smoked paprika, 2 tbsp kosher salt, 1 tbsp black pepper, 1 tbsp garlic powder, 1 tbsp onion powder, 2 tsp mustard powder, and 1 tsp cayenne. Rub all over an 8-lb bone-in pork butt, pressing into every crevice. Wrap and refrigerate 24 hours.",
      "proTip": "The overnight rub is what separates pit-quality pulled pork from mediocre pulled pork. Salt penetrates all the way to the bone; sugar and spice form a proto-bark. Do not skip."
    },
    {
      "stepNumber": 2,
      "title": "Prep the Smoker at 225°F",
      "instruction": "Set up your smoker for indirect heat targeting 225°F chamber temperature with a water pan. Preheat with hickory or apple wood chunks (about 2-3 fist-sized chunks) already in place. Let stabilize 20 minutes.",
      "timerMinutes": 30,
      "proTip": "225°F is the classic low-and-slow temp. Too hot (275°F+) rushes the collagen conversion and gives you dry pork; too cool (200°F-) stalls forever."
    },
    {
      "stepNumber": 3,
      "title": "Smoke Fat-Cap Up to 165°F",
      "instruction": "Place the pork butt fat-cap UP on the smoker grates. Insert a leave-in probe into the thickest part not touching the bone. Smoke undisturbed until internal temp reaches 165°F (about 8 hours).",
      "timerMinutes": 480,
      "proTip": "Fat cap up lets the rendering fat baste the whole shoulder as it drips down. Cap down leaves you with a soggy bottom and dry top."
    },
    {
      "stepNumber": 4,
      "title": "Wrap at 165°F with Butcher Paper",
      "instruction": "When the internal temp hits 165°F, remove the pork and wrap it tightly in 2 layers of pink butcher paper. Return to the smoker with the probe reinserted through the paper.",
      "proTip": "Butcher paper over foil for a superior bark. Foil steams the crust to mush; butcher paper protects it while letting the bark stay firm. This is 'the Texas crutch.'"
    },
    {
      "stepNumber": 5,
      "title": "Push to 203°F for Full Shred-Tender",
      "instruction": "Continue smoking wrapped until internal temp reaches 203°F, about 4 more hours. The probe should slide in with zero resistance — like poking warm butter. If it drags at 203°F, keep going another 15 minutes.",
      "timerMinutes": 240,
      "targetTemp": "203°F internal AND probe-tender",
      "proTip": "203°F is the number, but the probe-feel is the truth. Some butts hit tenderness at 200°F, some at 208°F. Feel matters more than the exact number here."
    },
    {
      "stepNumber": 6,
      "title": "Rest 1 Hour in a Cooler",
      "instruction": "Transfer the wrapped pork to a dry empty cooler and close the lid. Rest 1 hour — this is the flavor-development phase. Then unwrap over a large tray to catch juices, pull the bone (should slide out clean), and shred with your hands or forks. Toss shreds in the reserved pan juices.",
      "timerMinutes": 60,
      "proTip": "The cooler rest is non-negotiable — it's when moisture redistributes through the pork. Slicing straight from the smoker gives you dry pork; the 1-hour cooler rest gives you juicy magic."
    }
  ],
  "ingredients": [
    { "item": "Bone-In Pork Butt (Boston Butt)", "qty": "8", "qtyNumeric": 8, "unit": "lbs" },
    { "item": "Brown Sugar", "qty": "3", "qtyNumeric": 3, "unit": "tbsp" },
    { "item": "Smoked Paprika", "qty": "3", "qtyNumeric": 3, "unit": "tbsp" },
    { "item": "Kosher Salt", "qty": "2", "qtyNumeric": 2, "unit": "tbsp" },
    { "item": "Black Pepper", "qty": "1", "qtyNumeric": 1, "unit": "tbsp" },
    { "item": "Garlic Powder", "qty": "1", "qtyNumeric": 1, "unit": "tbsp" },
    { "item": "Onion Powder", "qty": "1", "qtyNumeric": 1, "unit": "tbsp" },
    { "item": "Mustard Powder", "qty": "2", "qtyNumeric": 2, "unit": "tsp" },
    { "item": "Cayenne", "qty": "1", "qtyNumeric": 1, "unit": "tsp" },
    { "item": "Hickory Wood Chunks", "qty": "3", "qtyNumeric": 3, "unit": "chunks", "notes": "fist-sized, or apple for milder smoke" }
  ],
  "dadProTip": "Around 170°F internal, the pork will hit 'the stall' — the temp will hang there for hours as evaporative cooling matches the smoker heat. Wrapping at 165°F is the pit-master trick to power through the stall in 45 minutes instead of 3 hours.",
  "kidAdjustment": "Reserve a portion of the shredded pork before saucing and toss with 2 tbsp mild BBQ sauce and 1 tsp honey. Kids get a sweeter, smoke-free version on slider buns; adults get the full deal.",
  "sideSuggestions": [
    "Creamy coleslaw and pickled onions",
    "Baked beans with molasses",
    "Cornbread and hot sauce"
  ],
  "reheatInstructions": "Reheat pulled pork in a covered dish at 300°F for 20 minutes with 1/4 cup pan juice or apple juice to keep it moist. Never microwave a big batch — the outside dries before the inside warms.",
  "faqs": [
    { "q": "Can I do this on a pellet grill?", "a": "Yes — same 225°F target, same timings. Pellet grills give more consistent temperature and slightly less smoke flavor. Use extra wood pellets on the strong side for more smoke." },
    { "q": "How long does pulled pork keep?", "a": "5 days in the fridge, 3 months in the freezer with pan juices. Reheat in the juices to bring the moisture back — freezer-burn pork is dry pork." }
  ],
  "nutrition": {
    "calories": 395,
    "proteinGrams": 42,
    "carbsGrams": 3,
    "fatGrams": 22,
    "source": "USDA FoodData Central #167902 (pork shoulder)"
  },
  "kidRating": 4,
  "difficulty": "Weekend Project",
  "keywords": [
    "smoked pulled pork",
    "pork butt smoker",
    "boston butt low and slow",
    "hickory smoked pork"
  ],
  "datePublished": "2026-08-30",
  "lastUpdated": "2026-08-30"
} satisfies Recipe;
