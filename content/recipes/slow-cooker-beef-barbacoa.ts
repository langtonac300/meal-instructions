import { Recipe } from '@/lib/types';

export default {
  "id": "0221",
  "slug": "slow-cooker-beef-barbacoa",
  "title": "Slow Cooker Beef Barbacoa",
  "tagline": "Chipotle-copycat barbacoa built from chuck roast, chipotles in adobo, lime, and cumin — braised 8 hours on low into shreddable, smoky, tangy taco meat.",
  "appliance": "slow-cooker",
  "categories": [
    "high-protein",
    "budget",
    "one-pan",
    "game-day"
  ],
  "protein": "beef",
  "prepMinutes": 15,
  "cookMinutes": 480,
  "totalMinutes": 495,
  "image": "/images/recipes/slow-cooker-beef-barbacoa.jpg",
  "defaultServings": 8,
  "basis": "Tested on 3 lb chuck roast blended with 3 chipotles in adobo, 4 tbsp lime juice, 1 cup beef broth, and standard spice base in a 6-qt Crock-Pot on LOW.",
  "safeInternalTempF": 145,
  "restMinutes": 10,
  "costEstimateUSD": 14,
  "cookTemp": "Low 8 hours (200°F / 93°C)",
  "cookTempF": 200,
  "cookTempC": 93,
  "equipmentNeeded": [
    "6-qt Slow Cooker",
    "Blender or Food Processor",
    "12-inch Skillet",
    "Tongs"
  ],
  "quickVersion": {
    "temp": "Low 8 hours",
    "totalTime": "8 hrs 15 min",
    "timerMinutes": 480,
    "bullets": [
      "Blend 3 chipotles in adobo, 1 cup broth, garlic, lime juice, cumin, oregano, cloves.",
      "Sear 3 lb chuck roast (cubed into 4 chunks) 3 min per side; add to slow cooker.",
      "Pour chipotle blend and 2 bay leaves over; cook LOW 8 hrs until shred-tender.",
      "Shred in cooking liquid, taste-salt, finish with fresh lime and cilantro."
    ]
  },
  "detailedSteps": [
    {
      "stepNumber": 1,
      "title": "Blend the Chipotle-Lime Sauce",
      "instruction": "In a blender, combine 3 chipotle peppers in adobo (plus 1 tbsp of the adobo sauce), 4 cloves garlic, 4 tbsp fresh lime juice, 2 tbsp apple cider vinegar, 1 cup low-sodium beef broth, 1 tbsp ground cumin, 1 tbsp dried oregano, 1 tsp ground cloves, and 1/2 tsp black pepper. Blend 30 seconds until smooth.",
      "proTip": "3 chipotles is the Chipotle-restaurant heat level. Add a 4th for spicier, use 2 for kid-friendly. This is the whole flavor of the dish — do not eyeball."
    },
    {
      "stepNumber": 2,
      "title": "Cube and Salt the Chuck",
      "instruction": "Cut a 3 lb chuck roast into 4 rough chunks — this cuts cooking time by 90 minutes and gives more surface area for the sauce. Season all sides with 2 tsp kosher salt.",
      "proTip": "Whole roasts take forever to break down; 4 chunks fits in the cooker better and cooks 25% faster with more sauce contact."
    },
    {
      "stepNumber": 3,
      "title": "Sear for Deep Color",
      "instruction": "Heat 2 tbsp neutral oil in a 12-inch skillet over high heat until shimmering. Sear the chuck chunks 3 minutes per side, working in 2 batches to avoid crowding, until each has a mahogany crust. Transfer directly to the slow cooker.",
      "timerMinutes": 12,
      "proTip": "Barbacoa without a sear tastes like beef stew, not tacos. The Maillard crust is what gives the finished shred its smoky-bacon backbone."
    },
    {
      "stepNumber": 4,
      "title": "Combine and Add Bay",
      "instruction": "Pour the chipotle blend evenly over the seared chuck in the slow cooker. Add 2 bay leaves. Do not stir — the sauce will surround the meat as it cooks.",
      "proTip": "Bay leaves make a real difference in slow-cooked beef. They add a subtle bitter-warm layer that keeps the chipotle heat from being one-note."
    },
    {
      "stepNumber": 5,
      "title": "Slow Cook Until Falling Apart",
      "instruction": "Cover and cook on LOW for 8 hours. Meat should shred with almost no fork pressure. If it drags, add 30 minutes and test again.",
      "timerMinutes": 480,
      "targetTemp": "205°F internal — collagen fully rendered",
      "proTip": "Barbacoa can cook 10 hours on low and only get better. Under-cooking gives you stubborn shreds; over-cooking on LOW is nearly impossible."
    },
    {
      "stepNumber": 6,
      "title": "Shred and Rest in the Juice",
      "instruction": "Discard bay leaves. Shred the beef directly in the cooking liquid with 2 forks. Stir and let sit uncovered on WARM for 10 minutes so the shreds re-absorb the sauce. Finish with 2 tbsp fresh lime juice and 1/4 cup chopped cilantro.",
      "timerMinutes": 10,
      "proTip": "Fresh lime at the end brightens the whole pot. Lime cooked for 8 hours turns dull and slightly bitter — always add a fresh squeeze at the finish."
    }
  ],
  "ingredients": [
    { "item": "Beef Chuck Roast", "qty": "3", "qtyNumeric": 3, "unit": "lbs", "notes": "cut into 4 chunks" },
    { "item": "Chipotle Peppers in Adobo", "qty": "3", "qtyNumeric": 3, "unit": "peppers", "notes": "plus 1 tbsp adobo sauce" },
    { "item": "Low-Sodium Beef Broth", "qty": "1", "qtyNumeric": 1, "unit": "cup" },
    { "item": "Fresh Lime Juice", "qty": "6", "qtyNumeric": 6, "unit": "tbsp", "notes": "4 for blend, 2 for finish" },
    { "item": "Apple Cider Vinegar", "qty": "2", "qtyNumeric": 2, "unit": "tbsp" },
    { "item": "Fresh Garlic", "qty": "4", "qtyNumeric": 4, "unit": "cloves" },
    { "item": "Ground Cumin", "qty": "1", "qtyNumeric": 1, "unit": "tbsp" },
    { "item": "Dried Oregano", "qty": "1", "qtyNumeric": 1, "unit": "tbsp", "notes": "Mexican oregano ideally" },
    { "item": "Ground Cloves", "qty": "1", "qtyNumeric": 1, "unit": "tsp" },
    { "item": "Bay Leaves", "qty": "2", "qtyNumeric": 2, "unit": "" },
    { "item": "Kosher Salt", "qty": "2", "qtyNumeric": 2, "unit": "tsp" },
    { "item": "Black Pepper", "qty": "1/2", "qtyNumeric": 0.5, "unit": "tsp" },
    { "item": "Neutral Oil", "qty": "2", "qtyNumeric": 2, "unit": "tbsp" },
    { "item": "Fresh Cilantro", "qty": "1/4", "qtyNumeric": 0.25, "unit": "cup", "notes": "chopped, for finish" }
  ],
  "dadProTip": "Freeze the leftover chipotles from the can in a zip bag flat, then snap off pieces as needed. Otherwise you waste $2 of chipotles every time you make this — and you'll want to make this often.",
  "kidAdjustment": "Rinse a small portion of shredded beef briefly under warm water in a strainer before serving to knock the heat down. Serve on soft flour tortillas with shredded cheese and sour cream only.",
  "sideSuggestions": [
    "Cilantro-lime rice",
    "Black beans with cumin",
    "Charred corn salsa"
  ],
  "reheatInstructions": "Warm shreds covered in a skillet over medium-low for 6 minutes with 2 tbsp water or beef broth stirred in. Skip the microwave — high heat toughens shreds that were tender out of the crock.",
  "faqs": [
    { "q": "Can I use brisket instead of chuck?", "a": "Yes, use a 3 lb flat cut. Same time, same method. Brisket shreds a bit stringier but with better beef flavor." },
    { "q": "Can I make it less spicy without losing the smoke?", "a": "Reduce to 1 chipotle plus 1 tsp smoked paprika. You keep the smoke and drop the heat to mild." }
  ],
  "nutrition": {
    "calories": 385,
    "proteinGrams": 38,
    "carbsGrams": 4,
    "fatGrams": 22,
    "source": "USDA FoodData Central #174036 (beef chuck) and #171950 (chipotle in adobo)"
  },
  "kidRating": 3,
  "difficulty": "Easy",
  "keywords": [
    "slow cooker barbacoa",
    "beef barbacoa",
    "chipotle copycat barbacoa",
    "shredded beef tacos"
  ],
  "datePublished": "2026-08-30",
  "lastUpdated": "2026-08-30"
} satisfies Recipe;
