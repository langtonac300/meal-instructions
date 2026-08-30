import { Recipe } from '@/lib/types';

export default {
  "id": "0140",
  "slug": "oven-roasted-prime-rib",
  "title": "Oven Roasted Prime Rib (Reverse Sear)",
  "tagline": "A low-and-slow 250°F roast to 120°F internal, then a 500°F blast for the crust — the reverse-sear method that puts a bakery-red rosy center corner-to-corner.",
  "appliance": "oven",
  "categories": [
    "weekend",
    "high-protein"
  ],
  "protein": "beef",
  "prepMinutes": 20,
  "cookMinutes": 180,
  "totalMinutes": 240,
  "image": "/images/recipes/oven-roasted-prime-rib.jpg",
  "defaultServings": 8,
  "basis": "Tested on a 6 lb bone-in three-rib standing rib roast, dry-brined 24 hours, roasted at 250°F to 120°F internal (about 2.5 hours) then finished at 500°F for 8 minutes.",
  "safeInternalTempF": 145,
  "restMinutes": 30,
  "cookTemp": "250°F then 500°F sear",
  "cookTempF": 250,
  "cookTempC": 121,
  "equipmentNeeded": [
    "Roasting Pan with Rack",
    "Leave-In Probe Thermometer",
    "Butcher's Twine",
    "Aluminum Foil"
  ],
  "quickVersion": {
    "temp": "250°F low-slow, 500°F sear",
    "totalTime": "3 hrs cook + 30 min rest",
    "timerMinutes": 150,
    "bullets": [
      "Dry-brine 6 lb bone-in roast 24 hrs; rest at room temp 2 hrs before cooking.",
      "Roast bone-side down at 250°F to 120°F internal (about 2.5 hrs for medium-rare).",
      "Rest tented 25 min, then blast 500°F for 8 min until crust bubbles deep brown.",
      "Slice against the grain in 1/2-inch slabs, one per rib bone."
    ]
  },
  "detailedSteps": [
    {
      "stepNumber": 1,
      "title": "Dry-Brine 24 Hours Ahead",
      "instruction": "Rub a 6 lb bone-in standing rib roast all over with 2 tbsp kosher salt and 1 tbsp coarse black pepper. Set on a wire rack over a sheet pan, uncovered, in the fridge for 24 hours.",
      "proTip": "The dry brine is the single biggest flavor investment you can make. Skin dries out, forming the crust foundation, and the salt penetrates all the way to the bone."
    },
    {
      "stepNumber": 2,
      "title": "Temper on the Counter for 2 Hours",
      "instruction": "Two hours before cooking, pull the roast from the fridge and let it sit on the counter uncovered. This drops the temperature differential between surface and center so the roast cooks evenly.",
      "timerMinutes": 120,
      "proTip": "A cold-from-the-fridge roast has a gray band 3/4 inch thick around a barely-cooked center. Tempering shrinks the band to a thin edge."
    },
    {
      "stepNumber": 3,
      "title": "Season and Set for the Low Roast",
      "instruction": "Preheat oven to 250°F. Rub the roast with 2 tbsp softened butter, 3 minced garlic cloves, 1 tbsp minced fresh rosemary, and 1 tbsp minced fresh thyme. Set bone-side down on a rack in a roasting pan. Insert a probe thermometer into the thickest part.",
      "proTip": "The rib bones are a natural roasting rack — bone-side down elevates the meat from pan drippings and lets convection circulate all around."
    },
    {
      "stepNumber": 4,
      "title": "Slow-Roast to 120°F Internal",
      "instruction": "Roast at 250°F until the probe reads 120°F for medium-rare (about 2.5 hours for a 6-lb roast, or roughly 25 minutes per pound). Pull the roast when the probe hits 120°F — no earlier, no later.",
      "timerMinutes": 150,
      "targetTemp": "120°F internal (pull temp for medium-rare)",
      "proTip": "The probe is the single most important piece of equipment here. Time-per-pound is a guess; internal temp is fact. Trust the probe."
    },
    {
      "stepNumber": 5,
      "title": "Rest 25 Minutes Tented",
      "instruction": "Move the roast to a cutting board, tent loosely with foil, and rest 25 minutes while the oven cranks to 500°F. Internal temp will carry over to 128°F — the target for medium-rare after the sear.",
      "timerMinutes": 25,
      "proTip": "Cutting a hot roast releases every drop of juice onto the board. Resting gives the muscle fibers time to relax and hold their liquid — this is not optional."
    },
    {
      "stepNumber": 6,
      "title": "500°F Sear for the Crust",
      "instruction": "Return the rested roast to the 500°F oven for 6-8 minutes until the crust bubbles, browns, and darkens to a mahogany color. Pull, transfer to the board, and slice against the grain into 1/2-inch slabs.",
      "timerMinutes": 8,
      "targetTemp": "135°F final internal after carryover",
      "proTip": "The sear only browns — it does not raise the internal temp meaningfully in 8 minutes. Watch the crust color, not a timer."
    }
  ],
  "ingredients": [
    { "item": "Bone-In Standing Rib Roast", "qty": "6", "qtyNumeric": 6, "unit": "lbs", "notes": "3-rib prime or choice grade" },
    { "item": "Kosher Salt", "qty": "2", "qtyNumeric": 2, "unit": "tbsp", "notes": "for dry brine" },
    { "item": "Coarse Black Pepper", "qty": "1", "qtyNumeric": 1, "unit": "tbsp" },
    { "item": "Unsalted Butter", "qty": "2", "qtyNumeric": 2, "unit": "tbsp", "notes": "softened, for rub" },
    { "item": "Fresh Garlic", "qty": "3", "qtyNumeric": 3, "unit": "cloves", "notes": "minced" },
    { "item": "Fresh Rosemary", "qty": "1", "qtyNumeric": 1, "unit": "tbsp", "notes": "minced" },
    { "item": "Fresh Thyme", "qty": "1", "qtyNumeric": 1, "unit": "tbsp", "notes": "minced" }
  ],
  "dadProTip": "Buy the roast at least 3 days before you cook it and dry-brine the last 24 hours. The 2 days of rest deepen the beef flavor via natural enzymatic aging, and you have never tasted rib roast like it.",
  "kidAdjustment": "Slice a thin outer piece and dice into 1/2-inch cubes for kids — the edge slices are well-done and easier for young mouths. Serve with ketchup, not au jus.",
  "sideSuggestions": [
    "Yorkshire pudding or popovers",
    "Creamy horseradish sauce",
    "Roasted root vegetables and gravy from drippings"
  ],
  "reheatInstructions": "Slice cold, then warm slices in a covered skillet with 1 tbsp beef broth over medium-low for 3 minutes only — any longer and medium-rare turns to medium-well. Never microwave prime rib.",
  "faqs": [
    { "q": "Can I do this boneless?", "a": "Yes, but ask the butcher to remove the bones and tie them back on. You get the roasting-rack effect plus you can slice cleanly at the table." },
    { "q": "What temp for medium instead of medium-rare?", "a": "Pull at 130°F internal instead of 120°F. It will carry to 145°F after the sear and rest. Do not push past medium — prime rib is designed for pink." }
  ],
  "nutrition": {
    "calories": 445,
    "proteinGrams": 32,
    "carbsGrams": 1,
    "fatGrams": 34,
    "source": "USDA FoodData Central #172187 (beef rib, cooked)"
  },
  "kidRating": 4,
  "difficulty": "Weekend Project",
  "keywords": [
    "prime rib roast",
    "reverse sear prime rib",
    "standing rib roast oven",
    "holiday prime rib"
  ],
  "datePublished": "2026-08-30",
  "lastUpdated": "2026-08-30"
} satisfies Recipe;
