/**
 * DATA/TOOLS-DATA.TS
 * 
 * Verified culinary physics and food science constants for all 8 quick tools.
 * All numbers are backed by technical food safety and culinary standards:
 * - USDA FSIS Safe Minimum Internal Temperature Guidelines
 * - Modernist Cuisine / Serious Eats Thermal Carryover Physics
 * - Diamond Crystal & Morton Salt Physical Density Specifications
 * - Commercial & Residential Air Fryer Manufacturer Directives (Ninja, Instant, Cosori)
 */

// ==========================================
// 1. REHEAT & REVIVE SPECIFICATIONS
// ==========================================

export interface ReheatItem {
  id: string;
  name: string;
  category: 'takeout' | 'comfort' | 'pizza' | 'bakery' | 'protein';
  airFryerTemp: number; // °F
  airFryerMinutes: number;
  skilletMinutes?: number;
  skilletTemp?: string;
  shakeAtMinute?: number;
  antiSoggyTip: string;
  microwaveWarning: string;
  testedWith: string;
}

export const REHEAT_ITEMS: ReheatItem[] = [
  {
    id: 'french-fries',
    name: 'French Fries (Fast Food & Pub Cut)',
    category: 'takeout',
    airFryerTemp: 380,
    airFryerMinutes: 4,
    shakeAtMinute: 2,
    skilletMinutes: 5,
    skilletTemp: 'Medium-high in 1 tsp hot oil',
    antiSoggyTip: 'Spread in a single layer. Do not add oil; residual oils fry them back to crisp.',
    microwaveWarning: 'Microwaving causes water molecules in the potato starch to burst, turning fries into limp mush.',
    testedWith: "McDonald's & Five Guys leftover fries in 5.8qt basket air fryer",
  },
  {
    id: 'pizza-slice',
    name: 'Pizza Slices (Thin, Hand-Tossed, Deep Dish)',
    category: 'pizza',
    airFryerTemp: 360,
    airFryerMinutes: 4,
    skilletMinutes: 5,
    skilletTemp: 'Medium heat covered with lid + 2 drops water on pan side for steam',
    antiSoggyTip: '360°F remelts the cheese and crisps the bottom crust without scorching toppings.',
    microwaveWarning: 'Microwaving turns crust into tough rubber within 45 seconds.',
    testedWith: 'New York style and tavern thin crust cold refrigerated slices',
  },
  {
    id: 'fried-chicken-tenders',
    name: 'Fried Chicken Tenders & Strips',
    category: 'takeout',
    airFryerTemp: 375,
    airFryerMinutes: 5,
    shakeAtMinute: 3,
    antiSoggyTip: 'Space tenders 0.5 inches apart so circulating convection air dries the crumb.',
    microwaveWarning: 'Trapped steam beneath breading turns batter into soggy paste.',
    testedWith: "Popeyes and Raising Cane's refrigerated chicken tenders",
  },
  {
    id: 'chicken-wings',
    name: 'Chicken Wings (Sauced or Dry Rub)',
    category: 'takeout',
    airFryerTemp: 380,
    airFryerMinutes: 6,
    shakeAtMinute: 3,
    antiSoggyTip: 'If heavily sauced, use a piece of perforated parchment to prevent sugar caramel burn.',
    microwaveWarning: 'Skin becomes rubbery and fat separates unpleasantly.',
    testedWith: 'Leftover Buffalo and garlic parmesan party wings',
  },
  {
    id: 'cheeseburger',
    name: 'Cheeseburgers & Patty Melts',
    category: 'takeout',
    airFryerTemp: 350,
    airFryerMinutes: 4,
    antiSoggyTip: 'Separate top bun and lettuce before heating. Heat patty and bottom bun for 3 mins, add top bun for final 1 min.',
    microwaveWarning: 'Microwaving superheats the bun into hard cardboard while leaving meat center lukewarm.',
    testedWith: 'Quarter-pound cheeseburgers stored at 38°F',
  },
  {
    id: 'steak-leftovers',
    name: 'Steak (Ribeye, Strip, Sirloin Slices)',
    category: 'protein',
    airFryerTemp: 320,
    airFryerMinutes: 4,
    skilletMinutes: 3,
    skilletTemp: 'High heat with 1 tbsp butter, 45 seconds per side',
    antiSoggyTip: 'Reheat gently at 320°F to warm internal muscle fibers without overcooking past medium-rare.',
    microwaveWarning: 'Microwave gray-bands and cooks out remaining juiciness instantly.',
    testedWith: '1.25-inch thick cooked NY strip steak slices',
  },
  {
    id: 'breakfast-burrito',
    name: 'Breakfast Burritos & Chimichangas',
    category: 'comfort',
    airFryerTemp: 360,
    airFryerMinutes: 6,
    shakeAtMinute: 3,
    antiSoggyTip: 'Lightly mist tortilla with cooking spray to restore restaurant flakiness.',
    microwaveWarning: 'Tortilla ends turn brittle while cheese leaks through seams.',
    testedWith: 'Refrigerated egg, cheese, and bacon flour tortilla burritos',
  },
  {
    id: 'croissant-pastry',
    name: 'Croissants, Biscuits & Pastries',
    category: 'bakery',
    airFryerTemp: 320,
    airFryerMinutes: 3,
    antiSoggyTip: 'Low heat reactivates laminated butter layers for ultra-flaky crunch.',
    microwaveWarning: 'Steam melts laminated butter into a dense, oily dough ball.',
    testedWith: 'Bakery all-butter croissants and buttermilk biscuits',
  },
  {
    id: 'egg-rolls',
    name: 'Egg Rolls & Spring Rolls',
    category: 'takeout',
    airFryerTemp: 390,
    airFryerMinutes: 5,
    shakeAtMinute: 3,
    antiSoggyTip: 'High heat (390°F) instantly blister-fries wrapper skin.',
    microwaveWarning: 'Cabbage releases moisture and completely softens wrapper.',
    testedWith: 'Pork and vegetable restaurant egg rolls',
  },
  {
    id: 'mac-and-cheese',
    name: 'Macaroni & Cheese (Baked or Stovetop)',
    category: 'comfort',
    airFryerTemp: 350,
    airFryerMinutes: 5,
    skilletMinutes: 4,
    skilletTemp: 'Low-medium with 1 tbsp whole milk stirred in',
    antiSoggyTip: 'In air fryer, place in oven-safe ramekin and top with panko for a crunchy crust.',
    microwaveWarning: 'Cheese sauce breaks into oil and protein curds without milk emulsion.',
    testedWith: 'Cheddar baked macaroni in ceramic vessel',
  },
];

// ==========================================
// 2. FROZEN COOK & THAW MATRIX
// ==========================================

export interface FrozenItem {
  id: string;
  name: string;
  cutType: 'poultry' | 'beef' | 'pork' | 'seafood';
  canCookFromFrozen: boolean;
  safeAppliances: string[];
  bannedAppliances: string[];
  freshCookMinutes: number;
  frozenCookMinutes: number;
  tempAdjust: string;
  internalTargetTemp: number; // °F
  waterBathThawMinutes: number; // per lb in cold water
  usdaRationale: string;
}

export const FROZEN_ITEMS: FrozenItem[] = [
  {
    id: 'chicken-breast-boneless',
    name: 'Boneless Skinless Chicken Breast',
    cutType: 'poultry',
    canCookFromFrozen: true,
    safeAppliances: ['Air Fryer', 'Instant Pot', 'Oven'],
    bannedAppliances: ['Slow Cooker (DANGER: Takes too long to pass 40°F–140°F bacterial zone)'],
    freshCookMinutes: 12,
    frozenCookMinutes: 18,
    tempAdjust: 'Lower air fryer temp by 20°F (to 360°F) to prevent surface charring before center reaches 165°F',
    internalTargetTemp: 165,
    waterBathThawMinutes: 30,
    usdaRationale: 'USDA FSIS allows direct frozen cooking in convection/pressure appliances; slow cookers are prohibited.',
  },
  {
    id: 'chicken-wings-frozen',
    name: 'Frozen Raw Chicken Wings',
    cutType: 'poultry',
    canCookFromFrozen: true,
    safeAppliances: ['Air Fryer', 'Convection Oven'],
    bannedAppliances: ['Slow Cooker', 'Deep Fryer (Water in ice crystals causes explosive oil boilover)'],
    freshCookMinutes: 20,
    frozenCookMinutes: 28,
    tempAdjust: 'Cook at 380°F for 15 mins to defrost/render, drain basket liquid, then finish at 400°F for 10 mins for crisp skin',
    internalTargetTemp: 165,
    waterBathThawMinutes: 30,
    usdaRationale: 'Safe for convection air fryers. Never drop frozen icy poultry into deep fryer oil.',
  },
  {
    id: 'ground-beef-brick',
    name: 'Ground Beef (1 lb Frozen Brick)',
    cutType: 'beef',
    canCookFromFrozen: true,
    safeAppliances: ['Skillet (Break-and-scrape method)', 'Instant Pot'],
    bannedAppliances: ['Air Fryer (Whole block dries exterior)', 'Slow Cooker'],
    freshCookMinutes: 8,
    frozenCookMinutes: 15,
    tempAdjust: 'Sear frozen brick in hot skillet with 1/4 cup water, scraping browned outer layer every 2 minutes',
    internalTargetTemp: 160,
    waterBathThawMinutes: 25,
    usdaRationale: 'USDA ground meat safety standard is 160°F minimum internal temperature.',
  },
  {
    id: 'salmon-fillets',
    name: 'Salmon Fillets (Individually Vacuum-Sealed)',
    cutType: 'seafood',
    canCookFromFrozen: true,
    safeAppliances: ['Air Fryer', 'Sheet Pan Oven'],
    bannedAppliances: ['Slow Cooker'],
    freshCookMinutes: 9,
    frozenCookMinutes: 14,
    tempAdjust: 'Air fry @ 390°F. Brush glaze during final 3 minutes after ice layer vaporizes.',
    internalTargetTemp: 145,
    waterBathThawMinutes: 15,
    usdaRationale: 'FDA Food Code requires 145°F or until flesh is opaque and separates easily with a fork.',
  },
  {
    id: 'pork-chops-bone-in',
    name: 'Pork Chops (1-inch Bone-In)',
    cutType: 'pork',
    canCookFromFrozen: true,
    safeAppliances: ['Air Fryer', 'Oven'],
    bannedAppliances: ['Slow Cooker'],
    freshCookMinutes: 12,
    frozenCookMinutes: 18,
    tempAdjust: 'Cook at 375°F. Flip at 10 minutes.',
    internalTargetTemp: 145,
    waterBathThawMinutes: 30,
    usdaRationale: 'USDA FSIS standard for whole muscle pork is 145°F with a 3-minute rest.',
  },
  {
    id: 'strip-ribeye-steak',
    name: 'NY Strip or Ribeye Steak (1.25-inch)',
    cutType: 'beef',
    canCookFromFrozen: true,
    safeAppliances: ['Air Fryer (Reverse Sear)', 'Two-Zone Oven/Cast Iron'],
    bannedAppliances: ['Microwave'],
    freshCookMinutes: 10,
    frozenCookMinutes: 16,
    tempAdjust: 'Air fry frozen @ 350°F to 115°F internal, then finish with a 60-second cast iron sear in butter',
    internalTargetTemp: 135,
    waterBathThawMinutes: 25,
    usdaRationale: 'USDA whole beef cuts require 145°F (or 130°F–135°F for medium-rare culinary preference with 3-min rest).',
  },
];

// ==========================================
// 3. MEAT MATH & PARTY SCALER
// ==========================================

export interface MeatMathProfile {
  id: string;
  name: string;
  category: 'bbq' | 'grill' | 'tacos' | 'finger-food';
  rawOzPerAdult: number;
  rawOzPerChild: number;
  shrinkagePercent: number; // cooking moisture & fat loss
  isBoneIn: boolean;
  servingUnitName: string;
  sideRecommendations: { item: string; qtyPerPerson: string }[];
  costcoPackTip: string;
}

export const MEAT_MATH_PROFILES: MeatMathProfile[] = [
  {
    id: 'burgers',
    name: 'Burgers (80/20 Ground Beef / Smash Patties)',
    category: 'grill',
    rawOzPerAdult: 8, // two 4-oz patties or one 8-oz pub burger
    rawOzPerChild: 4,
    shrinkagePercent: 25,
    isBoneIn: false,
    servingUnitName: 'Buns & Patties',
    sideRecommendations: [
      { item: 'Burger Buns', qtyPerPerson: '1.2 buns (account for seconds)' },
      { item: 'Cheese Slices', qtyPerPerson: '1.5 slices' },
      { item: 'Chips / Fries', qtyPerPerson: '2 oz (handful)' },
    ],
    costcoPackTip: 'Buy 5-6 lb ground beef chub or 3-pack organic beef (approx 1.3 lbs each).',
  },
  {
    id: 'pulled-pork',
    name: 'Pulled Pork (Bone-In Pork Shoulder / Butt)',
    category: 'bbq',
    rawOzPerAdult: 12, // Yields approx 6-7 oz cooked meat
    rawOzPerChild: 5,
    shrinkagePercent: 45, // high fat render & bone weight
    isBoneIn: true,
    servingUnitName: 'Slider Buns & Tongs',
    sideRecommendations: [
      { item: 'Slider / Brioche Buns', qtyPerPerson: '2 to 3 slider buns' },
      { item: 'Coleslaw', qtyPerPerson: '4 oz (half cup)' },
      { item: 'BBQ Sauce', qtyPerPerson: '2 tbsp' },
    ],
    costcoPackTip: 'Costco twin-pack pork butts weigh ~14-16 lbs total, perfect for 15-20 adults.',
  },
  {
    id: 'chicken-wings',
    name: 'Chicken Wings (Bone-In Party Wings)',
    category: 'finger-food',
    rawOzPerAdult: 16, // 1 lb raw wings = ~8-10 wings per adult
    rawOzPerChild: 8,
    shrinkagePercent: 40, // bones + fat render
    isBoneIn: true,
    servingUnitName: 'Individual Wings',
    sideRecommendations: [
      { item: 'Celery & Carrot Sticks', qtyPerPerson: '4 pieces' },
      { item: 'Ranch / Blue Cheese', qtyPerPerson: '2 tbsp' },
    ],
    costcoPackTip: 'Costco 6-pack fresh wing sections contains ~10 lbs total.',
  },
  {
    id: 'taco-meat',
    name: 'Taco Bar (Ground Beef or Carne Asada)',
    category: 'tacos',
    rawOzPerAdult: 7,
    rawOzPerChild: 3.5,
    shrinkagePercent: 25,
    isBoneIn: false,
    servingUnitName: 'Tortillas & Shells',
    sideRecommendations: [
      { item: 'Tortillas (Corn / Flour)', qtyPerPerson: '3 tortillas' },
      { item: 'Shredded Cheese', qtyPerPerson: '1.5 oz' },
      { item: 'Salsa & Guacamole', qtyPerPerson: '3 tbsp' },
      { item: 'Black / Pinto Beans', qtyPerPerson: '4 oz cooked' },
    ],
    costcoPackTip: 'A 5 lb ground beef batch feeds 10-12 taco-eating adults with leftover buffer.',
  },
  {
    id: 'smoked-brisket',
    name: 'Smoked Beef Brisket (Whole Packer)',
    category: 'bbq',
    rawOzPerAdult: 16, // 50% loss from trimming hard fat cap & 12hr cook render
    rawOzPerChild: 6,
    shrinkagePercent: 50,
    isBoneIn: false,
    servingUnitName: 'Slices & Texas Toast',
    sideRecommendations: [
      { item: 'Pickles & Sliced Onions', qtyPerPerson: '2 oz' },
      { item: 'Potato Salad', qtyPerPerson: '4 oz' },
      { item: 'Texas Toast', qtyPerPerson: '1 slice' },
    ],
    costcoPackTip: 'A 14-16 lb USDA Prime packer brisket trims to ~12 lbs and feeds 12-14 adults.',
  },
  {
    id: 'hot-dogs-brats',
    name: 'Hot Dogs & Bratwurst',
    category: 'grill',
    rawOzPerAdult: 6, // 1.5 to 2 links per adult
    rawOzPerChild: 3, // 1 link per child
    shrinkagePercent: 10,
    isBoneIn: false,
    servingUnitName: 'Links & Buns',
    sideRecommendations: [
      { item: 'Hot Dog Buns', qtyPerPerson: '1.5 buns' },
      { item: 'Mustard & Relish', qtyPerPerson: '1 packet/serving' },
    ],
    costcoPackTip: 'Kirkland 3-pack beef franks (36 franks total) covers any backyard sports party.',
  },
];

// ==========================================
// 4. THERMAL CARRYOVER & PULL TEMP SPECS
// ==========================================

export interface InternalTempSpec {
  id: string;
  name: string;
  thickness: string;
  donenessLevels: {
    label: string;
    pullTemp: number; // °F
    finalTargetTemp: number; // °F
    carryoverRise: number; // °F
    restMinutes: number;
    colorVisual: string;
  }[];
  usdaSafeMin: number;
  scienceNote: string;
}

export const INTERNAL_TEMP_SPECS: InternalTempSpec[] = [
  {
    id: 'thick-steak',
    name: 'Thick Cut Steak (Ribeye, Strip, Porterhouse 1.25" - 2")',
    thickness: '1.5 inch',
    donenessLevels: [
      { label: 'Rare', pullTemp: 118, finalTargetTemp: 125, carryoverRise: 7, restMinutes: 5, colorVisual: 'Deep red center, warm' },
      { label: 'Medium-Rare (Chef Ideal)', pullTemp: 128, finalTargetTemp: 135, carryoverRise: 7, restMinutes: 6, colorVisual: 'Warm red to pink center' },
      { label: 'Medium', pullTemp: 138, finalTargetTemp: 145, carryoverRise: 7, restMinutes: 6, colorVisual: 'Warm pink throughout' },
      { label: 'Medium-Well', pullTemp: 146, finalTargetTemp: 152, carryoverRise: 6, restMinutes: 5, colorVisual: 'Slight pink trace' },
      { label: 'Well-Done', pullTemp: 155, finalTargetTemp: 160, carryoverRise: 5, restMinutes: 5, colorVisual: 'No pink, fully cooked' },
    ],
    usdaSafeMin: 145,
    scienceNote: 'High exterior heat drives thermal energy into the core during rest, elevating internal temp by 5°F–8°F.',
  },
  {
    id: 'chicken-breast',
    name: 'Chicken Breast (Boneless Skinless)',
    thickness: '1.0 inch',
    donenessLevels: [
      { label: 'Juicy Safe (FSIS 165°F equivalent)', pullTemp: 158, finalTargetTemp: 165, carryoverRise: 7, restMinutes: 5, colorVisual: 'Opaque white, moist, clear juices' },
      { label: 'Traditional Well Done', pullTemp: 165, finalTargetTemp: 172, carryoverRise: 7, restMinutes: 5, colorVisual: 'Fully white, slightly firmer fiber' },
    ],
    usdaSafeMin: 165,
    scienceNote: 'USDA pasteurization table: chicken held at 155°F for 45 seconds or 160°F for 14 seconds has equal 7-log reduction of Salmonella as 165°F instant.',
  },
  {
    id: 'pork-chops-tenderloin',
    name: 'Pork Tenderloin & Loin Chops',
    thickness: '1.25 inch',
    donenessLevels: [
      { label: 'Medium-Rare / Juicy Pink', pullTemp: 138, finalTargetTemp: 145, carryoverRise: 7, restMinutes: 5, colorVisual: 'Slight pink blush, succulent' },
      { label: 'Medium', pullTemp: 145, finalTargetTemp: 150, carryoverRise: 5, restMinutes: 5, colorVisual: 'Bare trace of pink' },
      { label: 'Well-Done', pullTemp: 155, finalTargetTemp: 160, carryoverRise: 5, restMinutes: 4, colorVisual: 'Pure white, firm' },
    ],
    usdaSafeMin: 145,
    scienceNote: 'USDA lowered pork safe temp to 145°F with a 3-minute rest in 2011; overcooking to 165°F produces chalky meat.',
  },
  {
    id: 'ground-beef-patties',
    name: 'Ground Beef Burgers / Meatballs',
    thickness: '0.75 inch',
    donenessLevels: [
      { label: 'USDA Safe Minimum', pullTemp: 155, finalTargetTemp: 160, carryoverRise: 5, restMinutes: 3, colorVisual: 'Juices run light yellow to clear' },
    ],
    usdaSafeMin: 160,
    scienceNote: 'Grinding mixes surface bacteria throughout the meat, making 160°F internal essential unless using sous-vide pasteurization.',
  },
  {
    id: 'salmon-fillet',
    name: 'Salmon Fillet',
    thickness: '1.0 inch',
    donenessLevels: [
      { label: 'Chef Medium-Rare (Tender)', pullTemp: 120, finalTargetTemp: 125, carryoverRise: 5, restMinutes: 3, colorVisual: 'Translucent pink core, silken texture' },
      { label: 'Chef Medium (Flaky)', pullTemp: 130, finalTargetTemp: 135, carryoverRise: 5, restMinutes: 3, colorVisual: 'Opaque pink, easily flakes' },
      { label: 'USDA Recommendation', pullTemp: 140, finalTargetTemp: 145, carryoverRise: 5, restMinutes: 3, colorVisual: 'Firm, white albumin expressed' },
    ],
    usdaSafeMin: 145,
    scienceNote: 'Pulling salmon at 125°F–135°F prevents albumin (white protein liquid) from aggressively expelling from fish fibers.',
  },
];

// ==========================================
// 5. EQUILIBRIUM SALTING & DRY-BRINE DATA
// ==========================================

export interface SaltBrand {
  id: string;
  name: string;
  gramsPerTeaspoon: number;
  crystalType: string;
  pinchFeel: string;
}

export const SALT_BRANDS: SaltBrand[] = [
  {
    id: 'diamond-crystal',
    name: 'Diamond Crystal Kosher Salt',
    gramsPerTeaspoon: 2.8,
    crystalType: 'Hollow pyramid flakes',
    pinchFeel: 'Light, crushable between fingers, forgiving to over-salting',
  },
  {
    id: 'morton-kosher',
    name: 'Morton Kosher Salt',
    gramsPerTeaspoon: 4.8,
    crystalType: 'Dense flattened flakes',
    pinchFeel: 'Nearly twice as dense as Diamond Crystal per volume',
  },
  {
    id: 'table-salt',
    name: 'Standard Table Salt (Iodized / Non-Iodized)',
    gramsPerTeaspoon: 5.7,
    crystalType: 'Dense cubic crystals',
    pinchFeel: 'Extremely dense; 1 tsp table salt = over 2 tsp Diamond Crystal',
  },
  {
    id: 'fine-sea-salt',
    name: 'Fine Sea Salt',
    gramsPerTeaspoon: 5.5,
    crystalType: 'Fine ground sea crystals',
    pinchFeel: 'Heavy salinity per volumetric teaspoon',
  },
];

export interface BrineUseProfile {
  id: string;
  name: string;
  targetSaltPercent: number; // percentage by weight
  recommendedHoursMin: number;
  recommendedHoursMax: number;
  technique: string;
}

export const BRINE_USE_PROFILES: BrineUseProfile[] = [
  {
    id: 'dry-brine-steak',
    name: 'Dry Brine Steak / Chops (0.5 to 2.5 lbs)',
    targetSaltPercent: 1.1, // 1.1% of meat weight
    recommendedHoursMin: 2,
    recommendedHoursMax: 24,
    technique: 'Salt all surfaces evenly, place uncovered on wire rack over baking sheet in refrigerator. Surface dries to create glass-like crust when seared.',
  },
  {
    id: 'dry-brine-poultry',
    name: 'Dry Brine Whole Chicken / Turkey',
    targetSaltPercent: 1.0,
    recommendedHoursMin: 8,
    recommendedHoursMax: 48,
    technique: 'Salt skin and cavity. Air flow in fridge dries skin for ultra-crispy roasted poultry.',
  },
  {
    id: 'ground-meat-mix',
    name: 'Burger & Meatball Seasoning',
    targetSaltPercent: 1.0,
    recommendedHoursMin: 0,
    recommendedHoursMax: 0,
    technique: 'For burgers: salt ONLY the exterior right before hitting the griddle (mixing salt into ground beef makes rubbery sausage texture).',
  },
];

// ==========================================
// 6. DINNER RESCUE / TROUBLESHOOT MATRIX
// ==========================================

export interface TroubleshootIssue {
  id: string;
  category: 'air-fryer' | 'pan-sear' | 'meat' | 'baking';
  symptom: string;
  rootCause: string;
  instantFiveSecFix: string;
  futurePrevention: string;
}

export const TROUBLESHOOT_ISSUES: TroubleshootIssue[] = [
  {
    id: 'air-fryer-smoke',
    symptom: 'Air fryer is billowing white smoke into the kitchen',
    category: 'air-fryer',
    rootCause: 'High-fat rendered grease (bacon, 80/20 burgers, sausage) dropped into bottom pan and is burning against hot heating element draft.',
    instantFiveSecFix: 'Slide basket out. Pour 2 tablespoons of water or drop 1 slice of white bread into bottom drip pan under the grate to absorb oil.',
    futurePrevention: 'Pre-place a slice of bread or 1/4 cup water in drip tray before cooking high-fat pork/beef.',
  },
  {
    id: 'soggy-air-fryer-fries',
    symptom: 'Air fryer fries or veggies are limp, steamy, and soggy',
    category: 'air-fryer',
    rootCause: 'Basket is overloaded or ingredients were wet. Trapped moisture steam-cooks food instead of convection crisping.',
    instantFiveSecFix: 'Dump half the food out to create single layer with space. Crank temp to 400°F and blast for 3–4 mins with a vigorous shake.',
    futurePrevention: 'Never stack food deeper than one loose layer. Pat potatoes dry with clean towel before seasoning.',
  },
  {
    id: 'gray-steak-no-crust',
    symptom: 'Steak is gray and pale instead of having a dark brown crust',
    category: 'pan-sear',
    rootCause: 'Meat surface was wet when hitting the pan. Energy went toward vaporizing water steam instead of Maillard browning.',
    instantFiveSecFix: 'Pull steak off pan immediately onto cutting board. Wipe pan dry, crank heat until oil wisps smoke, hard pat meat dry with paper towel, sear 45s.',
    futurePrevention: 'Always paper-towel dry steak surfaces until bone dry, or dry-brine uncovered in fridge.',
  },
  {
    id: 'breading-fell-off',
    symptom: 'Crispy breading slid right off chicken tenders or pork cutlets',
    category: 'pan-sear',
    rootCause: "Meat was too wet before flouring, excess flour wasn't shaken off, or tongs tore wet coating before crust set.",
    instantFiveSecFix: "Don't flip with tongs; use a wide thin spatula. Spray bare spots lightly with oil spray to brown exposed chicken.",
    futurePrevention: 'Press breading firmly into meat, let rest on plate 5 minutes before cooking so egg/starch glue sets.',
  },
  {
    id: 'pork-chops-dry',
    symptom: 'Pork chops or chicken breasts feel stiff, dry, and chewy',
    category: 'meat',
    rootCause: 'Overcooked past 165°F+ because carryover heat was ignored.',
    instantFiveSecFix: 'Slice thin across the grain immediately and toss in 1 tbsp melted warm salted butter or pan jus to re-lubricate muscle fibers.',
    futurePrevention: 'Pull pork chops at 140°F–145°F and chicken breasts at 158°F; let carryover rise complete cooking.',
  },
  {
    id: 'burned-sauce-air-fryer',
    symptom: 'BBQ sauce / teriyaki glaze turned pitch black and charred',
    category: 'air-fryer',
    rootCause: 'Sugars in BBQ/teriyaki glaze burn rapidly above 325°F under high-velocity air.',
    instantFiveSecFix: 'Scrape charred sauce surface off with butter knife. Brush fresh sauce on and let sit 1 minute with machine OFF in residual heat.',
    futurePrevention: 'Cook meat with dry rub first. Brush sweet sauces on ONLY in the final 2 minutes of air frying.',
  },
];

// ==========================================
// 7. PICKY KID / TODDLER SPLIT BLUEPRINTS
// ==========================================

export interface KidSplitStrategy {
  id: string;
  mealName: string;
  adultFlavorProfile: string;
  deconstructStep: string;
  kidBentoLayout: string[];
  dipConversion: string;
}

export const KID_SPLIT_STRATEGIES: KidSplitStrategy[] = [
  {
    id: 'sheet-pan-fajitas',
    mealName: 'Sheet Pan Chicken Fajitas',
    adultFlavorProfile: 'Spicy chili, cumin, charred onions, jalapeños, cilantro lime salsa',
    deconstructStep: 'Pull 4-5 chicken strips and 3 sweet bell pepper strips BEFORE tossing with spicy cayenne chili seasoning. Roast on corner of sheet pan.',
    kidBentoLayout: ['Plain roasted chicken strips', 'Raw or lightly roasted sweet red peppers', 'Warmed flour tortilla rolled plain', 'Mild cheddar shreds'],
    dipConversion: 'Mild ranch or mild salsa for kids; spicy habanero salsa & jalapeños for adults.',
  },
  {
    id: 'sausage-peppers-pasta',
    mealName: 'One-Pot Sausage & Peppers Pasta',
    adultFlavorProfile: 'Spicy Italian sausage, rich garlic marinara, red pepper flakes, parmesan',
    deconstructStep: 'Reserve 1 cup cooked pasta before saucing. Toss kid portion with 1 tsp butter and parmesan.',
    kidBentoLayout: ['Buttered curly pasta', 'Sliced sweet mild sausage coins (casing removed)', 'Fresh cucumber slices'],
    dipConversion: 'Marinara in small side ramekin for dipping, not mixed over noodles.',
  },
  {
    id: 'crispy-buffalo-wraps',
    mealName: 'Crispy Buffalo Chicken Caesar Wraps',
    adultFlavorProfile: 'Spicy buffalo sauce, romaine, cracked pepper caesar dressing, parmesan',
    deconstructStep: 'Leave 2 cooked chicken tenders completely plain (do not toss in buffalo hot sauce).',
    kidBentoLayout: ['Crispy plain chicken tender cut into bite coins', 'Small tortilla wrap', 'Baby carrots', 'Apple slices'],
    dipConversion: "Sweet BBQ or Honey Mustard for kids; Frank's RedHot Buffalo for adults.",
  },
  {
    id: 'lemon-garlic-salmon',
    mealName: 'Lemon Garlic Herb Salmon',
    adultFlavorProfile: 'Garlic butter, lemon zest, cracked pepper, parsley',
    deconstructStep: 'Keep child fillet seasoned with only olive oil and mild salt. Skip garlic, lemon acidity, and herbs.',
    kidBentoLayout: ['Flaked plain mild salmon', 'Steamed white rice ball', 'Steamed broccoli trees (with butter)'],
    dipConversion: 'Mild soy sauce or sweet teriyaki glaze for dipping.',
  },
];

// ==========================================
// 8. SMOKE POINTS & SEARING OILS MATRIX
// ==========================================

export interface SmokePointItem {
  id: string;
  name: string;
  smokePointF: number;
  smokePointC: number;
  category: 'high-sear' | 'medium-cook' | 'finishing' | 'animal-fat';
  flavor: 'Neutral' | 'Buttery' | 'Nutty' | 'Rich' | 'Pungent';
  monounsaturatedPct: number;
  polyunsaturatedPct: number;
  saturatedPct: number;
  bestUses: string;
  castIronRating: 'Ideal' | 'Good' | 'Fair' | 'Avoid';
  acroleinWarning: string;
}

export const SMOKE_POINTS: SmokePointItem[] = [
  {
    id: 'avocado-oil-refined',
    name: 'Refined Avocado Oil',
    smokePointF: 520,
    smokePointC: 271,
    category: 'high-sear',
    flavor: 'Neutral',
    monounsaturatedPct: 70,
    polyunsaturatedPct: 13,
    saturatedPct: 12,
    bestUses: 'Ultra-high heat steak searing, cast iron blackening, high-temp wok stir fry.',
    castIronRating: 'Ideal',
    acroleinWarning: 'Very stable past 500°F; lowest acrolein release among plant oils.',
  },
  {
    id: 'ghee-clarified-butter',
    name: 'Ghee (Clarified Butter)',
    smokePointF: 485,
    smokePointC: 252,
    category: 'animal-fat',
    flavor: 'Buttery',
    monounsaturatedPct: 29,
    polyunsaturatedPct: 4,
    saturatedPct: 62,
    bestUses: 'Pan-searing ribeye, butter basting, high-heat sautéing without burning milk solids.',
    castIronRating: 'Ideal',
    acroleinWarning: 'Milk solids removed, preventing rapid charring below 450°F.',
  },
  {
    id: 'beef-tallow',
    name: 'Beef Tallow (Rendered Suet)',
    smokePointF: 420,
    smokePointC: 215,
    category: 'animal-fat',
    flavor: 'Rich',
    monounsaturatedPct: 42,
    polyunsaturatedPct: 4,
    saturatedPct: 50,
    bestUses: 'Smash burgers, Texas brisket wrapping, deep-frying fries (McDonalds original formula).',
    castIronRating: 'Ideal',
    acroleinWarning: 'Extremely heat resilient; produces deep Maillard flavor in smash burgers.',
  },
  {
    id: 'duck-fat',
    name: 'Rendered Duck Fat',
    smokePointF: 375,
    smokePointC: 190,
    category: 'animal-fat',
    flavor: 'Rich',
    monounsaturatedPct: 50,
    polyunsaturatedPct: 13,
    saturatedPct: 33,
    bestUses: 'Crispy roasted potatoes, poultry searing, confit.',
    castIronRating: 'Good',
    acroleinWarning: 'Avoid temperatures exceeding 375°F to prevent burnt gamey off-flavors.',
  },
  {
    id: 'peanut-oil-refined',
    name: 'Refined Peanut Oil',
    smokePointF: 450,
    smokePointC: 232,
    category: 'high-sear',
    flavor: 'Neutral',
    monounsaturatedPct: 46,
    polyunsaturatedPct: 32,
    saturatedPct: 17,
    bestUses: 'Deep frying turkey, fried chicken, air fryer coating, Asian stir-fry.',
    castIronRating: 'Good',
    acroleinWarning: 'Stable at prolonged 375°F frying; minimal foaming.',
  },
  {
    id: 'canola-oil',
    name: 'Canola Oil (Refined Rapeseed)',
    smokePointF: 400,
    smokePointC: 204,
    category: 'medium-cook',
    flavor: 'Neutral',
    monounsaturatedPct: 63,
    polyunsaturatedPct: 28,
    saturatedPct: 7,
    bestUses: 'Everyday skillet cooking, baking, general frying.',
    castIronRating: 'Good',
    acroleinWarning: 'High polyunsaturated content breaks down faster during repeated re-use.',
  },
  {
    id: 'extra-virgin-olive-oil',
    name: 'Extra Virgin Olive Oil (Cold Pressed EVOO)',
    smokePointF: 375,
    smokePointC: 190,
    category: 'finishing',
    flavor: 'Nutty',
    monounsaturatedPct: 73,
    polyunsaturatedPct: 11,
    saturatedPct: 14,
    bestUses: 'Salad dressings, low-temp pasta sauces, roasting vegetables @ 350°F, bread dipping.',
    castIronRating: 'Avoid',
    acroleinWarning: 'Free fatty acids and polyphenols smoke and oxidize rapidly above 375°F.',
  },
  {
    id: 'whole-butter',
    name: 'Unsalted Whole Butter',
    smokePointF: 300,
    smokePointC: 149,
    category: 'finishing',
    flavor: 'Buttery',
    monounsaturatedPct: 26,
    polyunsaturatedPct: 3,
    saturatedPct: 63,
    bestUses: 'Finishing bastes, scrambling eggs on low heat, pastry lamination, pan sauces.',
    castIronRating: 'Avoid',
    acroleinWarning: 'Water (16%) and milk proteins (2%) blacken and release bitter acrolein over 300°F.',
  },
  {
    id: 'coconut-oil-virgin',
    name: 'Virgin Coconut Oil (Unrefined)',
    smokePointF: 350,
    smokePointC: 177,
    category: 'medium-cook',
    flavor: 'Nutty',
    monounsaturatedPct: 6,
    polyunsaturatedPct: 2,
    saturatedPct: 86,
    bestUses: 'Curries, vegan baking, low-heat skillet sauté.',
    castIronRating: 'Fair',
    acroleinWarning: 'Strong aromatic volatile compounds vaporize above 350°F.',
  },
  {
    id: 'toasted-sesame-oil',
    name: 'Toasted Pure Sesame Oil',
    smokePointF: 350,
    smokePointC: 177,
    category: 'finishing',
    flavor: 'Pungent',
    monounsaturatedPct: 40,
    polyunsaturatedPct: 42,
    saturatedPct: 14,
    bestUses: 'Drizzling off-heat on fried rice, ramen, marinades, dipping sauces.',
    castIronRating: 'Avoid',
    acroleinWarning: 'Never use as primary cooking oil; delicate toasted aromatic esters turn acrid.',
  },
];

// ==========================================
// 9. STEAK DONENESS & REVERSE SEAR SPECS
// ==========================================

export interface SteakDonenessTarget {
  doneness: 'rare' | 'medium-rare' | 'medium' | 'medium-well' | 'well';
  label: string;
  ovenPullTempF: number; // pull from low-temp oven
  searFinishInternalTempF: number; // temp after searing
  finalRestedTempF: number; // final post-carryover temp
  colorCenter: string;
  textureDescription: string;
}

export const STEAK_DONENESS_TARGETS: SteakDonenessTarget[] = [
  {
    doneness: 'rare',
    label: 'Rare',
    ovenPullTempF: 105,
    searFinishInternalTempF: 118,
    finalRestedTempF: 125,
    colorCenter: 'Cool deep red, translucent center',
    textureDescription: 'Soft and silken, minimal protein contraction',
  },
  {
    doneness: 'medium-rare',
    label: 'Medium-Rare (Chef Standard)',
    ovenPullTempF: 115,
    searFinishInternalTempF: 128,
    finalRestedTempF: 135,
    colorCenter: 'Warm red-to-pink center',
    textureDescription: 'Maximum juiciness, myosin proteins set, fat melted',
  },
  {
    doneness: 'medium',
    label: 'Medium',
    ovenPullTempF: 125,
    searFinishInternalTempF: 138,
    finalRestedTempF: 145,
    colorCenter: 'Warm pink throughout',
    textureDescription: 'Firm with springy resistance, juicy',
  },
  {
    doneness: 'medium-well',
    label: 'Medium-Well',
    ovenPullTempF: 135,
    searFinishInternalTempF: 146,
    finalRestedTempF: 152,
    colorCenter: 'Faint trace of pink in center',
    textureDescription: 'Firm muscle fibers, slight moisture loss',
  },
  {
    doneness: 'well',
    label: 'Well-Done',
    ovenPullTempF: 145,
    searFinishInternalTempF: 155,
    finalRestedTempF: 160,
    colorCenter: 'Uniform brownish-gray throughout',
    textureDescription: 'Firm and chewy, actin proteins contracted fully',
  },
];

export interface SteakCutSpec {
  id: string;
  name: string;
  defaultThicknessInches: number;
  boneIn: boolean;
  fatMarbling: 'High' | 'Medium' | 'Lean';
  recommendedSearOil: string;
  notes: string;
}

export const STEAK_CUT_SPECS: SteakCutSpec[] = [
  {
    id: 'ribeye-boneless',
    name: 'Ribeye (Boneless)',
    defaultThicknessInches: 1.5,
    boneIn: false,
    fatMarbling: 'High',
    recommendedSearOil: 'Ghee or Avocado Oil',
    notes: 'Heavy intermuscular spinalis fat requires full rendering; perfect candidate for reverse sear.',
  },
  {
    id: 'ny-strip',
    name: 'New York Strip',
    defaultThicknessInches: 1.25,
    boneIn: false,
    fatMarbling: 'Medium',
    recommendedSearOil: 'Avocado Oil + Butter Baste',
    notes: 'Render side fat strip by holding steak with tongs against hot cast iron for 60 seconds.',
  },
  {
    id: 'filet-mignon',
    name: 'Filet Mignon (Tenderloin)',
    defaultThicknessInches: 2.0,
    boneIn: false,
    fatMarbling: 'Lean',
    recommendedSearOil: 'Clarified Butter / Ghee',
    notes: 'Very lean; best pulled at 130°F (rare/medium-rare) with garlic rosemary butter baste.',
  },
  {
    id: 'tomahawk-ribeye',
    name: 'Bone-In Tomahawk / Cowboy Ribeye',
    defaultThicknessInches: 2.5,
    boneIn: true,
    fatMarbling: 'High',
    recommendedSearOil: 'Beef Tallow or Avocado Oil',
    notes: 'Requires 45–60 mins in 225°F oven before 90-second per side blazing sear.',
  },
  {
    id: 't-bone-porterhouse',
    name: 'Porterhouse / T-Bone',
    defaultThicknessInches: 1.75,
    boneIn: true,
    fatMarbling: 'Medium',
    recommendedSearOil: 'Avocado Oil',
    notes: 'Strip side cooks slightly slower than tenderloin side; position strip side closer to direct flame.',
  },
];

// ==========================================
// 10. TURKEY ROASTER & THAW SPECS
// ==========================================

export interface TurkeyMethodSpec {
  id: 'traditional' | 'spatchcock' | 'smoker' | 'air-fryer-breast';
  name: string;
  ovenTempF: number;
  minsPerPound: number;
  targetBreastPullTempF: number;
  targetThighPullTempF: number;
  restMinutes: number;
  proTip: string;
}

export const TURKEY_METHODS: TurkeyMethodSpec[] = [
  {
    id: 'spatchcock',
    name: 'Spatchcocked (Flattened on Sheet Pan) — Recommended',
    ovenTempF: 425,
    minsPerPound: 6.5,
    targetBreastPullTempF: 160,
    targetThighPullTempF: 175,
    restMinutes: 20,
    proTip: 'Removing backbone flattens bird so breast and dark meat finish simultaneously in ~80 minutes with 100% crispy skin.',
  },
  {
    id: 'traditional',
    name: 'Whole Traditional Unstuffed Roast',
    ovenTempF: 325,
    minsPerPound: 13.5,
    targetBreastPullTempF: 160,
    targetThighPullTempF: 175,
    restMinutes: 30,
    proTip: 'Shield breast with foil during first 2 hours to prevent drying while thigh heats to safe temp.',
  },
  {
    id: 'smoker',
    name: 'Low & Slow Smoker (Pecan or Apple Wood)',
    ovenTempF: 250,
    minsPerPound: 30,
    targetBreastPullTempF: 160,
    targetThighPullTempF: 175,
    restMinutes: 25,
    proTip: 'Crank smoker to 375°F for final 20 minutes to prevent rubbery bite-through skin.',
  },
  {
    id: 'air-fryer-breast',
    name: 'Bone-In Turkey Breast (Air Fryer / Convection)',
    ovenTempF: 360,
    minsPerPound: 10,
    targetBreastPullTempF: 160,
    targetThighPullTempF: 165,
    restMinutes: 15,
    proTip: 'Dry brine uncovered in fridge for 24h for blistered glass-like skin.',
  },
];

// ==========================================
// 11. BAKER'S PERCENTAGE & HYDRATION PRESETS
// ==========================================

export interface BakersPreset {
  id: string;
  name: string;
  description: string;
  hydrationPct: number;
  saltPct: number;
  yeastPct: number; // instant dry yeast
  oilPct: number;
  sugarPct: number;
  fermentationType: 'Same-Day (2hr)' | 'Overnight Cold (24hr-72hr)' | 'Sourdough Levain';
  bakeTempF: number;
}

export const BAKERS_PRESETS: BakersPreset[] = [
  {
    id: 'neapolitan-pizza',
    name: 'Neapolitan Pizza Dough (High Heat)',
    description: 'Thin tender crust with puffy charred cornicione. No oil or sugar for 500°F–900°F bake.',
    hydrationPct: 62,
    saltPct: 2.8,
    yeastPct: 0.2,
    oilPct: 0,
    sugarPct: 0,
    fermentationType: 'Overnight Cold (24hr-72hr)',
    bakeTempF: 550,
  },
  {
    id: 'detroit-pan-pizza',
    name: 'Detroit Style Pan Pizza (Crispy Cheese Edge)',
    description: 'High hydration pillowy focaccia-like crumb baked in LloydPans steel with Wisconsin brick cheese edge.',
    hydrationPct: 72,
    saltPct: 2.2,
    yeastPct: 1.0,
    oilPct: 3.0,
    sugarPct: 1.0,
    fermentationType: 'Same-Day (2hr)',
    bakeTempF: 500,
  },
  {
    id: 'artisan-sourdough-boule',
    name: 'Dutch Oven Artisan Country Loaf',
    description: 'Open airy crumb, blistered crispy ear, deep fermentation flavor.',
    hydrationPct: 75,
    saltPct: 2.0,
    yeastPct: 0.4,
    oilPct: 0,
    sugarPct: 0,
    fermentationType: 'Overnight Cold (24hr-72hr)',
    bakeTempF: 450,
  },
  {
    id: 'sandwich-bread',
    name: 'Soft Everyday Sandwich Loaf',
    description: 'Enriched tender crumb that stays soft for days, ideal for kids toast and sandwiches.',
    hydrationPct: 64,
    saltPct: 2.0,
    yeastPct: 1.5,
    oilPct: 6.0,
    sugarPct: 5.0,
    fermentationType: 'Same-Day (2hr)',
    bakeTempF: 350,
  },
  {
    id: 'cast-iron-focaccia',
    name: 'Cast Iron Olive Oil Focaccia',
    description: 'Ultra-high hydration with deep dimpled olive oil pockets and crunchy bottom crust.',
    hydrationPct: 82,
    saltPct: 2.5,
    yeastPct: 0.8,
    oilPct: 8.0,
    sugarPct: 0.5,
    fermentationType: 'Same-Day (2hr)',
    bakeTempF: 425,
  },
];

// ==========================================
// 12. RECIPE PAN CONVERSION GEOMETRIES
// ==========================================

export interface PanShapeSpec {
  id: string;
  name: string;
  shape: 'round' | 'square' | 'rectangular' | 'bundt';
  dimensions: string;
  areaSqInches: number;
  standardVolumeCups: number;
  depthInches: number;
}

export const PAN_SPECS: PanShapeSpec[] = [
  { id: 'round-8', name: '8-inch Round Cake Pan', shape: 'round', dimensions: '8" diameter', areaSqInches: 50.3, standardVolumeCups: 6, depthInches: 2 },
  { id: 'round-9', name: '9-inch Round Cake Pan', shape: 'round', dimensions: '9" diameter', areaSqInches: 63.6, standardVolumeCups: 8, depthInches: 2 },
  { id: 'square-8', name: '8x8-inch Square Baking Dish', shape: 'square', dimensions: '8" x 8"', areaSqInches: 64.0, standardVolumeCups: 8, depthInches: 2 },
  { id: 'square-9', name: '9x9-inch Square Baking Dish', shape: 'square', dimensions: '9" x 9"', areaSqInches: 81.0, standardVolumeCups: 10, depthInches: 2 },
  { id: 'rect-9x13', name: '9x13-inch Casserole / Sheet Pan', shape: 'rectangular', dimensions: '9" x 13"', areaSqInches: 117.0, standardVolumeCups: 14, depthInches: 2 },
  { id: 'rect-7x11', name: '7x11-inch Rectangular Dish', shape: 'rectangular', dimensions: '7" x 11"', areaSqInches: 77.0, standardVolumeCups: 9, depthInches: 2 },
  { id: 'loaf-8x4', name: '8.5 x 4.5-inch Standard Loaf Pan', shape: 'rectangular', dimensions: '8.5" x 4.5"', areaSqInches: 38.3, standardVolumeCups: 6, depthInches: 2.5 },
  { id: 'loaf-9x5', name: '9 x 5-inch Large Loaf Pan', shape: 'rectangular', dimensions: '9" x 5"', areaSqInches: 45.0, standardVolumeCups: 8, depthInches: 2.5 },
  { id: 'half-sheet', name: 'Half Sheet Pan (Baking Rimmed)', shape: 'rectangular', dimensions: '13" x 18"', areaSqInches: 234.0, standardVolumeCups: 20, depthInches: 1 },
  { id: 'cast-iron-10', name: '10-inch Cast Iron Skillet', shape: 'round', dimensions: '10" diameter base', areaSqInches: 78.5, standardVolumeCups: 9, depthInches: 2 },
  { id: 'cast-iron-12', name: '12-inch Cast Iron Skillet', shape: 'round', dimensions: '12" diameter base', areaSqInches: 113.1, standardVolumeCups: 12, depthInches: 2.25 },
];

// ==========================================
// 13. SLOW COOKER TO OVEN / HIGH-LOW MAP
// ==========================================

export interface SlowCookerTimeMap {
  id: string;
  category: string;
  oven350Hours: number;
  slowCookerLowHours: number;
  slowCookerHighHours: number;
  dutchOvenHours: number;
  liquidAdjustment: string;
  keyRule: string;
}

export const SLOW_COOKER_TIME_MAP: SlowCookerTimeMap[] = [
  {
    id: 'tough-beef-cuts',
    category: 'Tough Beef (Chuck Roast, Brisket, Short Ribs)',
    oven350Hours: 3.5,
    slowCookerLowHours: 8,
    slowCookerHighHours: 4.5,
    dutchOvenHours: 3.0,
    liquidAdjustment: 'Reduce braising liquid by 40% in slow cooker because zero evaporation occurs.',
    keyRule: 'Low setting (8 hrs) yields far more tender collagen breakdown than blasting on High.',
  },
  {
    id: 'pork-shoulder-butt',
    category: 'Pork Shoulder / Carnitas',
    oven350Hours: 3.0,
    slowCookerLowHours: 8,
    slowCookerHighHours: 5,
    dutchOvenHours: 2.5,
    liquidAdjustment: 'Add no more than 1/2 cup liquid total; fat renders enough moisture.',
    keyRule: 'Broil shredded pork on baking sheet for 4 mins after slow cooking to crisp edges.',
  },
  {
    id: 'chicken-breasts',
    category: 'Boneless Chicken Breasts',
    oven350Hours: 0.5,
    slowCookerLowHours: 3.5,
    slowCookerHighHours: 2.0,
    dutchOvenHours: 0.4,
    liquidAdjustment: 'Chicken releases 30% of its weight as broth during cooking.',
    keyRule: 'Do not cook beyond 3.5-4 hours on Low or lean breast fibers dry into sawdust.',
  },
  {
    id: 'chicken-thighs-stew',
    category: 'Bone-In Chicken Thighs & Drumsticks',
    oven350Hours: 1.0,
    slowCookerLowHours: 6.0,
    slowCookerHighHours: 3.5,
    dutchOvenHours: 1.0,
    liquidAdjustment: 'Reduce stock by 33%.',
    keyRule: 'Remove skin before slow cooking or it becomes gelatinous and greasy.',
  },
  {
    id: 'chili-bean-stews',
    category: 'Beef Chili & Thick Stews',
    oven350Hours: 2.0,
    slowCookerLowHours: 7.0,
    slowCookerHighHours: 4.0,
    dutchOvenHours: 1.5,
    liquidAdjustment: 'Omit 1 cup of tomato sauce / broth.',
    keyRule: 'Brown ground beef in skillet first to drain rendered fat before adding to crockpot.',
  },
];

// ==========================================
// 14. SOUS VIDE TIME & TEMP SPECS
// ==========================================

export interface SousVideSpec {
  id: string;
  name: string;
  cutType: 'beef' | 'poultry' | 'pork' | 'fish' | 'vegetable';
  rareTempF?: number;
  medRareTempF: number;
  mediumTempF: number;
  wellTempF?: number;
  minTimeMinutes: number; // per 1-inch thickness
  maxTimeMinutes: number; // before texture degrades
  searMethod: string;
  scienceDetail: string;
}

export const SOUS_VIDE_SPECS: SousVideSpec[] = [
  {
    id: 'sv-ribeye-strip',
    name: 'Ribeye & NY Strip Steak',
    cutType: 'beef',
    rareTempF: 125,
    medRareTempF: 131,
    mediumTempF: 140,
    wellTempF: 155,
    minTimeMinutes: 60,
    maxTimeMinutes: 240,
    searMethod: '60-sec per side cast iron sear @ 500°F in ghee after patting bone-dry.',
    scienceDetail: 'Holding at 131°F pasteurizes interior according to Baldwin table while intramuscular fat renders.',
  },
  {
    id: 'sv-chicken-breast',
    name: 'Chicken Breast (Juicy Safe Pasteurization)',
    cutType: 'poultry',
    medRareTempF: 140, // 30 min hold
    mediumTempF: 147,
    wellTempF: 160,
    minTimeMinutes: 75,
    maxTimeMinutes: 180,
    searMethod: 'High heat skillet sear 45s skin-side down.',
    scienceDetail: '147°F held for 15+ mins achieves full 7.0-log reduction of Salmonella with restaurant juiciness.',
  },
  {
    id: 'sv-pork-tenderloin',
    name: 'Pork Tenderloin / Thick Chops',
    cutType: 'pork',
    rareTempF: 135,
    medRareTempF: 140,
    mediumTempF: 145,
    wellTempF: 160,
    minTimeMinutes: 90,
    maxTimeMinutes: 240,
    searMethod: 'Butter basting sear with fresh thyme for 1 minute.',
    scienceDetail: '140°F produces ultra-succulent pale pink pork without drying muscle proteins.',
  },
  {
    id: 'sv-salmon-fillet',
    name: 'Salmon Fillet (Silken to Flaky)',
    cutType: 'fish',
    rareTempF: 115,
    medRareTempF: 122,
    mediumTempF: 130,
    minTimeMinutes: 35,
    maxTimeMinutes: 60,
    searMethod: 'Torch or 30-sec hot pan skin crisp.',
    scienceDetail: '122°F yields buttery sashimi-tender texture; 130°F produces traditional flaky salmon.',
  },
  {
    id: 'sv-carrots-veggies',
    name: 'Glazed Carrots & Root Vegetables',
    cutType: 'vegetable',
    medRareTempF: 183,
    mediumTempF: 185,
    minTimeMinutes: 60,
    maxTimeMinutes: 120,
    searMethod: 'Empty bag juices into skillet and glaze for 2 mins.',
    scienceDetail: 'Pectin in plant cell walls does not soften until water reaches 183°F (84°C).',
  },
];

// ==========================================
// 15. BBQ CHARCOAL & PROPANE BURN SPECS
// ==========================================

export interface GrillFuelSpec {
  id: string;
  hardwareName: string;
  fuelType: 'briquettes' | 'lump-charcoal' | 'wood-splits' | 'propane-20lb';
  tempCategory: 'Low & Slow (225°F)' | 'Roasting (350°F)' | 'High Sear (500°F+)';
  burnRatePerHour: number; // lbs per hr or chimneys
  burnRateUnit: string;
  starterRequirement: string;
  airVentSetting: string;
}

export const GRILL_FUEL_SPECS: GrillFuelSpec[] = [
  {
    id: 'weber-kettle-low',
    hardwareName: '22" Kettle (Snake Method)',
    fuelType: 'briquettes',
    tempCategory: 'Low & Slow (225°F)',
    burnRatePerHour: 0.8,
    burnRateUnit: 'lbs briquettes / hr',
    starterRequirement: '10 lit briquettes placed at head of 2x2 C-shaped charcoal snake.',
    airVentSetting: 'Bottom vent 1/8 open, Top vent 1/3 open.',
  },
  {
    id: 'weber-kettle-sear',
    hardwareName: '22" Kettle (Direct Direct Sear)',
    fuelType: 'briquettes',
    tempCategory: 'High Sear (500°F+)',
    burnRatePerHour: 3.5,
    burnRateUnit: 'lbs briquettes / hr',
    starterRequirement: '1 full Weber Chimney starter fully ashed over (approx 4.5 lbs).',
    airVentSetting: 'Top and bottom vents 100% wide open.',
  },
  {
    id: 'kamado-ceramic-low',
    hardwareName: 'Kamado / Big Green Egg',
    fuelType: 'lump-charcoal',
    tempCategory: 'Low & Slow (225°F)',
    burnRatePerHour: 0.35,
    burnRateUnit: 'lbs lump / hr',
    starterRequirement: 'Light center only with 1 wax cube or starter tumbleweed.',
    airVentSetting: 'Bottom vent hairline (1mm), top daisy wheel pinhole.',
  },
  {
    id: 'gas-grill-3burner',
    hardwareName: '3-Burner Gas Grill (20 lb Propane Tank)',
    fuelType: 'propane-20lb',
    tempCategory: 'Roasting (350°F)',
    burnRatePerHour: 1.1,
    burnRateUnit: 'lbs propane / hr (approx 18 hrs total per full 20lb tank)',
    starterRequirement: 'Electronic spark ignition on primary burner.',
    airVentSetting: 'Two outer burners on Medium, middle burner OFF for indirect heat.',
  },
  {
    id: 'gas-grill-high',
    hardwareName: '3-Burner Gas Grill (All Burners MAX)',
    fuelType: 'propane-20lb',
    tempCategory: 'High Sear (500°F+)',
    burnRatePerHour: 2.2,
    burnRateUnit: 'lbs propane / hr (approx 9 hrs total full throttle)',
    starterRequirement: 'All burners ignited, lid closed for 10 min preheat.',
    airVentSetting: 'All knobs High.',
  },
];

// ==========================================
// 16. EGG DONENESS & TIMER PROFILES
// ==========================================

export interface EggDonenessProfile {
  id: string;
  name: string;
  yolkState: string;
  whiteState: string;
  boilTimeMins: number; // for Large Grade A cold from fridge (38°F)
  steamTimeMins: number;
  airFryerTimeMins: number; // at 270°F
  iceBathMinutes: number;
  bestApplication: string;
}

export const EGG_DONENESS_PROFILES: EggDonenessProfile[] = [
  {
    id: 'soft-runny',
    name: 'Soft Boiled (Runny Yolk)',
    yolkState: 'Completely liquid warm yolk',
    whiteState: 'Tender barely set white',
    boilTimeMins: 5.5,
    steamTimeMins: 6.0,
    airFryerTimeMins: 9.0,
    iceBathMinutes: 3,
    bestApplication: 'Toast soldiers, egg cups with cracked pepper and sea salt.',
  },
  {
    id: 'jammy-ramen',
    name: 'Jammy 6.5-Min Ramen Egg',
    yolkState: 'Fudge-like gooey gelatinous yolk with rich orange color',
    whiteState: 'Fully set tender white',
    boilTimeMins: 6.5,
    steamTimeMins: 7.0,
    airFryerTimeMins: 11.0,
    iceBathMinutes: 4,
    bestApplication: 'Marinated in soy/mirin (Ajitsuke Tamago) for ramen bowls or grain bowls.',
  },
  {
    id: 'custard-medium',
    name: 'Medium (Custardy Yolk)',
    yolkState: 'Firm edge with creamy custard center',
    whiteState: 'Fully firm white',
    boilTimeMins: 8.0,
    steamTimeMins: 8.5,
    airFryerTimeMins: 12.5,
    iceBathMinutes: 4,
    bestApplication: 'Niçoise salad, breakfast sandwiches, Caesar salad topping.',
  },
  {
    id: 'hard-boiled-yellow',
    name: 'Hard Boiled (Vibrant Yellow, No Gray Ring)',
    yolkState: 'Solid dry tender yellow throughout (no sulfuric green-gray perimeter)',
    whiteState: 'Firm and bouncy',
    boilTimeMins: 10.0,
    steamTimeMins: 11.0,
    airFryerTimeMins: 14.5,
    iceBathMinutes: 5,
    bestApplication: 'Classic deviled eggs, egg salad, protein meal prep.',
  },
];

// ==========================================
// 17. GRAIN & PASTA WATER RATIO SPECS
// ==========================================

export interface GrainWaterSpec {
  id: string;
  name: string;
  grainType: 'rice' | 'ancient-grain' | 'oats' | 'pasta' | 'corn';
  volumeLiquidToGrainRatio: number; // e.g. 1.5 means 1.5 cups water per 1 cup dry
  stovetopSimmerMinutes: number;
  instantPotMinutes: number;
  instantPotLiquidRatio: number;
  instantPotRelease: 'Natural 10 Min' | 'Quick Release' | 'Natural Full';
  saltPerDryCupTsp: number;
  mandatoryRestMinutes: number;
  washInstruction: string;
}

export const GRAIN_WATER_SPECS: GrainWaterSpec[] = [
  {
    id: 'jasmine-rice',
    name: 'Jasmine White Rice',
    grainType: 'rice',
    volumeLiquidToGrainRatio: 1.25,
    stovetopSimmerMinutes: 12,
    instantPotMinutes: 4,
    instantPotLiquidRatio: 1.0,
    instantPotRelease: 'Natural 10 Min',
    saltPerDryCupTsp: 0.5,
    mandatoryRestMinutes: 10,
    washInstruction: 'Rinse in cold water 3 times until water runs clear to wash off surface starch.',
  },
  {
    id: 'basmati-rice',
    name: 'Basmati White Rice',
    grainType: 'rice',
    volumeLiquidToGrainRatio: 1.5,
    stovetopSimmerMinutes: 15,
    instantPotMinutes: 5,
    instantPotLiquidRatio: 1.25,
    instantPotRelease: 'Natural 10 Min',
    saltPerDryCupTsp: 0.5,
    mandatoryRestMinutes: 10,
    washInstruction: 'Rinse thoroughly, soak in cold water for 15 mins before cooking for extra-long grains.',
  },
  {
    id: 'brown-rice-long',
    name: 'Long Grain Brown Rice',
    grainType: 'rice',
    volumeLiquidToGrainRatio: 2.0,
    stovetopSimmerMinutes: 45,
    instantPotMinutes: 22,
    instantPotLiquidRatio: 1.25,
    instantPotRelease: 'Natural 10 Min',
    saltPerDryCupTsp: 0.75,
    mandatoryRestMinutes: 10,
    washInstruction: 'Quick rinse under running water.',
  },
  {
    id: 'quinoa-tri-color',
    name: 'Quinoa (White, Red, or Tri-Color)',
    grainType: 'ancient-grain',
    volumeLiquidToGrainRatio: 1.75,
    stovetopSimmerMinutes: 15,
    instantPotMinutes: 1,
    instantPotLiquidRatio: 1.25,
    instantPotRelease: 'Natural 10 Min',
    saltPerDryCupTsp: 0.5,
    mandatoryRestMinutes: 5,
    washInstruction: 'Rinse in fine mesh sieve for 30s to remove natural bitter saponin coating.',
  },
  {
    id: 'steel-cut-oats',
    name: 'Steel-Cut Oats',
    grainType: 'oats',
    volumeLiquidToGrainRatio: 3.0,
    stovetopSimmerMinutes: 25,
    instantPotMinutes: 4,
    instantPotLiquidRatio: 2.5,
    instantPotRelease: 'Natural Full',
    saltPerDryCupTsp: 0.25,
    mandatoryRestMinutes: 5,
    washInstruction: 'Do not rinse; toast dry in pot with 1 tsp butter for 2 mins before adding water/milk.',
  },
  {
    id: 'dry-pasta-standard',
    name: 'Dried Semolina Pasta (Penne, Rigatoni, Spaghetti)',
    grainType: 'pasta',
    volumeLiquidToGrainRatio: 4.0, // 4 quarts water per 1 lb pasta
    stovetopSimmerMinutes: 10,
    instantPotMinutes: 5,
    instantPotLiquidRatio: 2.0,
    instantPotRelease: 'Quick Release',
    saltPerDryCupTsp: 1.5, // 1-2 tbsp salt in 4 quarts water
    mandatoryRestMinutes: 0,
    washInstruction: 'Never rinse cooked pasta; save 1/2 cup starchy pasta cooking water for emulsifying sauce.',
  },
];

// ==========================================
// 18. GOLDEN MARINADE FORMULA SPECS
// ==========================================

export interface MarinadeProfile {
  id: string;
  protein: string;
  fatToAcidRatio: '3:1 (Standard)' | '2:1 (Bold Acid)' | '1:1 (High Citrus)';
  recommendedAcid: string;
  recommendedOil: string;
  targetSalinityPct: number; // by meat weight
  safeMarinateHoursMin: number;
  safeMarinateHoursMax: number;
  enzymeWarning: string;
}

export const MARINADE_PROFILES: MarinadeProfile[] = [
  {
    id: 'chicken-breast',
    protein: 'Boneless Chicken Breast & Tenders',
    fatToAcidRatio: '3:1 (Standard)',
    recommendedAcid: 'Lemon juice, Apple cider vinegar, or Greek yogurt',
    recommendedOil: 'Olive oil or Avocado oil',
    targetSalinityPct: 1.2,
    safeMarinateHoursMin: 1,
    safeMarinateHoursMax: 6,
    enzymeWarning: 'Acids past 6 hours denature surface proteins into mealy, rubbery paste.',
  },
  {
    id: 'flank-skirt-steak',
    protein: 'Flank Steak / Skirt Steak (Fajitas & Carne Asada)',
    fatToAcidRatio: '2:1 (Bold Acid)',
    recommendedAcid: 'Lime juice + Orange juice + Soy sauce',
    recommendedOil: 'Avocado oil',
    targetSalinityPct: 1.5,
    safeMarinateHoursMin: 2,
    safeMarinateHoursMax: 12,
    enzymeWarning: 'Coarse muscle fibers benefit from 8-12 hr citrus soak; pat surface dry before searing.',
  },
  {
    id: 'pork-chops',
    protein: 'Pork Chops & Tenderloin',
    fatToAcidRatio: '3:1 (Standard)',
    recommendedAcid: 'Apple cider vinegar, Dijon mustard, Maple syrup',
    recommendedOil: 'Neutral oil',
    targetSalinityPct: 1.1,
    safeMarinateHoursMin: 2,
    safeMarinateHoursMax: 8,
    enzymeWarning: 'Avoid fresh pineapple/papaya unless cooking within 30 minutes (bromelain dissolves meat).',
  },
  {
    id: 'salmon-shrimp',
    protein: 'Salmon & Shrimp (Seafood)',
    fatToAcidRatio: '3:1 (Standard)',
    recommendedAcid: 'Lemon/Lime zest (use juice only in final 15 mins)',
    recommendedOil: 'Extra virgin olive oil',
    targetSalinityPct: 1.0,
    safeMarinateHoursMin: 0.25,
    safeMarinateHoursMax: 0.5,
    enzymeWarning: 'CRITICAL: High acid cooks and cures delicate seafood like ceviche in under 30 minutes.',
  },
];

// ==========================================
// 19. INGREDIENT SUBSTITUTIONS DATABASE
// ==========================================

export interface IngredientSub {
  id: string;
  missingIngredient: string;
  category: 'dairy' | 'baking' | 'pantry' | 'asian-sauces' | 'thickener';
  substituteSolution: string;
  exactRatioFormula: string;
  culinaryEffect: string;
  avoidWhen: string;
}

export const INGREDIENT_SUBSTITUTIONS: IngredientSub[] = [
  {
    id: 'buttermilk',
    missingIngredient: '1 Cup Buttermilk',
    category: 'dairy',
    substituteSolution: 'Milk + White Vinegar or Lemon Juice',
    exactRatioFormula: '1 tbsp white vinegar + enough whole milk to equal 1 cup. Let sit 5 mins until curdled.',
    culinaryEffect: 'Replicates acidic pH (approx 4.5) to activate baking soda in pancakes and biscuits.',
    avoidWhen: 'Drinking raw; fine for all marinades and baking.',
  },
  {
    id: 'cornstarch-thickener',
    missingIngredient: '1 Tbsp Cornstarch',
    category: 'thickener',
    substituteSolution: 'All-Purpose Flour or Arrowroot',
    exactRatioFormula: 'Use 2 Tbsp All-Purpose Flour (2:1 ratio) or 1 Tbsp Arrowroot powder.',
    culinaryEffect: 'Flour creates slightly cloudy sauce and requires 2 min simmer to cook out raw flour taste.',
    avoidWhen: 'Gluten-free gravies (use arrowroot or potato starch instead of flour).',
  },
  {
    id: 'heavy-cream',
    missingIngredient: '1 Cup Heavy Cream',
    category: 'dairy',
    substituteSolution: 'Whole Milk + Melted Butter',
    exactRatioFormula: '3/4 cup whole milk + 1/4 cup melted butter whisked vigorously.',
    culinaryEffect: 'Reconstructs ~36% fat emulsion needed for creamy pasta sauces and soups.',
    avoidWhen: 'Whipped cream (will not hold stiff peaks due to lack of emulsified dairy solids).',
  },
  {
    id: 'baking-powder',
    missingIngredient: '1 Tsp Baking Powder',
    category: 'baking',
    substituteSolution: 'Baking Soda + Cream of Tartar',
    exactRatioFormula: '1/4 tsp Baking Soda + 1/2 tsp Cream of Tartar.',
    culinaryEffect: 'Single-acting leavening: bake batter immediately because it releases CO2 upon mixing.',
    avoidWhen: 'Batters intended to sit for hours before baking.',
  },
  {
    id: 'brown-sugar',
    missingIngredient: '1 Cup Brown Sugar (Light or Dark)',
    category: 'baking',
    substituteSolution: 'Granulated White Sugar + Molasses',
    exactRatioFormula: '1 cup granulated white sugar + 1 tbsp molasses (light) or 2 tbsp molasses (dark).',
    culinaryEffect: 'Exact 100% identical moisture, caramel notes, and cookie spread characteristics.',
    avoidWhen: 'Never; this is how commercial brown sugar is manufactured.',
  },
  {
    id: 'tomato-paste',
    missingIngredient: '1 Tbsp Tomato Paste',
    category: 'pantry',
    substituteSolution: 'Tomato Sauce or Ketchup (Reduced)',
    exactRatioFormula: '3 Tbsp Tomato Sauce simmered down to 1 Tbsp, OR 1 Tbsp Ketchup (reduce recipe sugar slightly).',
    culinaryEffect: 'Provides concentrated glutamates and deep red umami base.',
    avoidWhen: 'Ketchup adds vinegar tang; compensate by reducing other acid.',
  },
  {
    id: 'mirin-rice-wine',
    missingIngredient: '1 Tbsp Mirin (Sweet Rice Wine)',
    category: 'asian-sauces',
    substituteSolution: 'Dry White Wine or Rice Vinegar + Sugar',
    exactRatioFormula: '1 Tbsp Dry White Wine / Rice Vinegar + 1/2 tsp white sugar.',
    culinaryEffect: 'Balances savory soy sauces with sweetness and acidity in teriyaki.',
    avoidWhen: 'Strictly alcohol-free requirements (use water + rice syrup).',
  },
  {
    id: 'egg-in-baking',
    missingIngredient: '1 Large Egg (in Baking)',
    category: 'baking',
    substituteSolution: 'Applesauce OR Flaxseed Meal',
    exactRatioFormula: '1/4 cup unsweetened applesauce OR 1 tbsp ground flaxseed + 3 tbsp water (sit 5 min).',
    culinaryEffect: 'Binds moisture in brownies and quick breads.',
    avoidWhen: 'Custards, meringues, or soufflés that rely on egg albumen structure.',
  },
];

// ==========================================
// 20. DEFROST & THAW TIMELINE SPECS
// ==========================================

export interface ThawSpec {
  id: string;
  name: string;
  weightLbs: number;
  fridgeThawHours: number;
  coldWaterThawMinutes: number; // 30 min water cycle
  microwaveDefrostMinutes: number; // at 30% power
  refreezeSafety: string;
  dangerAlert: string;
}

export const THAW_SPECS: ThawSpec[] = [
  {
    id: 'ground-beef-1lb',
    name: 'Ground Beef (1 lb block)',
    weightLbs: 1.0,
    fridgeThawHours: 24,
    coldWaterThawMinutes: 30,
    microwaveDefrostMinutes: 5,
    refreezeSafety: 'Safe to refreeze if thawed in refrigerator without cooking; do NOT refreeze if thawed in microwave.',
    dangerAlert: 'Never thaw at room temperature on counter; surface reaches bacterial Danger Zone (40°F–140°F) in 2 hours.',
  },
  {
    id: 'chicken-breasts-1lb',
    name: 'Chicken Breasts (1 lb boneless pack)',
    weightLbs: 1.0,
    fridgeThawHours: 24,
    coldWaterThawMinutes: 30,
    microwaveDefrostMinutes: 6,
    refreezeSafety: 'Safe to refreeze raw only if kept at 38°F in fridge throughout thaw.',
    dangerAlert: 'Ensure cold water bag is 100% leak-proof so meat fibers do not absorb chlorine bath water.',
  },
  {
    id: 'thick-steaks-2lb',
    name: 'Thick Steaks / Pork Chops (2 lbs)',
    weightLbs: 2.0,
    fridgeThawHours: 36,
    coldWaterThawMinutes: 60,
    microwaveDefrostMinutes: 9,
    refreezeSafety: 'Safe to refreeze raw if fridge thawed.',
    dangerAlert: 'Microwave defrosting creates gray cooked edges before interior thaws; avoid for premium steaks.',
  },
  {
    id: 'pork-butt-8lb',
    name: 'Pork Butt / Whole Chicken (6–8 lbs)',
    weightLbs: 7.0,
    fridgeThawHours: 72,
    coldWaterThawMinutes: 210,
    microwaveDefrostMinutes: 25,
    refreezeSafety: 'Safe to refreeze raw if fridge thawed.',
    dangerAlert: 'Change cold water every 30 minutes to maintain active thermal convection below 40°F.',
  },
  {
    id: 'turkey-15lb',
    name: 'Whole Holiday Turkey (14–16 lbs)',
    weightLbs: 15.0,
    fridgeThawHours: 96, // 4 full days
    coldWaterThawMinutes: 450, // 7.5 hours
    microwaveDefrostMinutes: 45,
    refreezeSafety: 'Must be cooked immediately if thawed via cold water bath.',
    dangerAlert: 'Plan fridge thaw 4 to 5 days in advance on lowest bottom shelf with drip pan.',
  },
];

// ==========================================
// 21. FOOD COST & MEAL PREP BATCH SPECS
// ==========================================

export interface FoodCostItem {
  name: string;
  packagePrice: number;
  packageQuantity: number;
  packageUnit: string;
  recipeQuantity: number;
}

export interface FoodCostPreset {
  id: string;
  mealName: string;
  servings: number;
  restaurantEquivalentPrice: number;
  defaultItems: FoodCostItem[];
}

export const FOOD_COST_PRESETS: FoodCostPreset[] = [
  {
    id: 'chicken-rice-broccoli-prep',
    mealName: 'Gym Bro Chicken, Rice & Roasted Broccoli (5 Meals)',
    servings: 5,
    restaurantEquivalentPrice: 14.50,
    defaultItems: [
      { name: 'Boneless Chicken Breasts', packagePrice: 13.99, packageQuantity: 48, packageUnit: 'oz', recipeQuantity: 40 },
      { name: 'Jasmine Rice (5 lb bag)', packagePrice: 6.49, packageQuantity: 80, packageUnit: 'oz', recipeQuantity: 16 },
      { name: 'Fresh Broccoli Crowns', packagePrice: 3.99, packageQuantity: 32, packageUnit: 'oz', recipeQuantity: 24 },
      { name: 'Olive Oil & Seasonings', packagePrice: 8.99, packageQuantity: 30, packageUnit: 'tbsp', recipeQuantity: 5 },
    ],
  },
  {
    id: 'smash-burger-night',
    mealName: 'Double Smash Burgers & Air Fryer Fries (Family of 4)',
    servings: 4,
    restaurantEquivalentPrice: 16.00,
    defaultItems: [
      { name: '80/20 Ground Beef', packagePrice: 9.99, packageQuantity: 32, packageUnit: 'oz', recipeQuantity: 32 },
      { name: 'Brioche Buns (8 pack)', packagePrice: 4.29, packageQuantity: 8, packageUnit: 'count', recipeQuantity: 4 },
      { name: 'American Cheese Slices', packagePrice: 3.49, packageQuantity: 16, packageUnit: 'slices', recipeQuantity: 8 },
      { name: 'Russet Potatoes', packagePrice: 3.99, packageQuantity: 5, packageUnit: 'lbs', recipeQuantity: 2 },
    ],
  },
  {
    id: 'taco-tuesday-crew',
    mealName: 'Street Taco Bar (6 Adults)',
    servings: 6,
    restaurantEquivalentPrice: 15.00,
    defaultItems: [
      { name: 'Ground Beef / Flank', packagePrice: 14.99, packageQuantity: 48, packageUnit: 'oz', recipeQuantity: 40 },
      { name: 'Corn Tortillas (30 pack)', packagePrice: 2.29, packageQuantity: 30, packageUnit: 'tortillas', recipeQuantity: 18 },
      { name: 'Avocados (4 bag)', packagePrice: 3.99, packageQuantity: 4, packageUnit: 'count', recipeQuantity: 3 },
      { name: 'Cotija Cheese & Cilantro', packagePrice: 4.50, packageQuantity: 10, packageUnit: 'oz', recipeQuantity: 6 },
      { name: 'Black Beans (Can)', packagePrice: 1.19, packageQuantity: 15, packageUnit: 'oz', recipeQuantity: 30 },
    ],
  },
];

// ==========================================
// 22. MACRONUTRIENT PROTEIN TARGET SOURCES
// ==========================================

export interface MacroProteinSource {
  id: string;
  name: string;
  category: 'poultry' | 'beef' | 'seafood' | 'pork' | 'plant' | 'dairy';
  rawProteinPer100g: number;
  rawFatPer100g: number;
  rawCarbsPer100g: number;
  rawCaloriesPer100g: number;
  shrinkageWeightLossPct: number; // water/fat loss during cooking
  cookedProteinPerOz: number;
  optimalPortionNote: string;
}

export const MACRO_PROTEIN_SOURCES: MacroProteinSource[] = [
  {
    id: 'chicken-breast-raw',
    name: 'Chicken Breast (Boneless Skinless)',
    category: 'poultry',
    rawProteinPer100g: 23.0,
    rawFatPer100g: 1.5,
    rawCarbsPer100g: 0,
    rawCaloriesPer100g: 110,
    shrinkageWeightLossPct: 25,
    cookedProteinPerOz: 8.8,
    optimalPortionNote: '6 oz raw yields ~4.5 oz cooked with 39g pure protein and <3g fat.',
  },
  {
    id: 'chicken-thigh-boneless',
    name: 'Chicken Thighs (Boneless Skinless)',
    category: 'poultry',
    rawProteinPer100g: 20.0,
    rawFatPer100g: 4.5,
    rawCarbsPer100g: 0,
    rawCaloriesPer100g: 130,
    shrinkageWeightLossPct: 28,
    cookedProteinPerOz: 7.6,
    optimalPortionNote: 'Slightly higher fat, superior moisture retention in air fryer.',
  },
  {
    id: 'ground-beef-93-7',
    name: 'Ground Beef (93/7 Lean)',
    category: 'beef',
    rawProteinPer100g: 21.5,
    rawFatPer100g: 7.0,
    rawCarbsPer100g: 0,
    rawCaloriesPer100g: 150,
    shrinkageWeightLossPct: 22,
    cookedProteinPerOz: 7.8,
    optimalPortionNote: 'Best macro-to-flavor ratio for taco bowls and lean burgers.',
  },
  {
    id: 'ground-beef-80-20',
    name: 'Ground Beef (80/20 Chuck)',
    category: 'beef',
    rawProteinPer100g: 17.5,
    rawFatPer100g: 20.0,
    rawCarbsPer100g: 0,
    rawCaloriesPer100g: 250,
    shrinkageWeightLossPct: 32,
    cookedProteinPerOz: 7.2,
    optimalPortionNote: 'High fat render; draining skillet grease reduces fat by ~30%.',
  },
  {
    id: 'atlantic-salmon',
    name: 'Atlantic Salmon Fillet',
    category: 'seafood',
    rawProteinPer100g: 20.5,
    rawFatPer100g: 13.0,
    rawCarbsPer100g: 0,
    rawCaloriesPer100g: 205,
    shrinkageWeightLossPct: 18,
    cookedProteinPerOz: 7.1,
    optimalPortionNote: 'High in Omega-3 EPA/DHA healthy polyunsaturated fats.',
  },
  {
    id: 'pork-tenderloin',
    name: 'Pork Tenderloin (Center Cut)',
    category: 'pork',
    rawProteinPer100g: 22.0,
    rawFatPer100g: 2.2,
    rawCarbsPer100g: 0,
    rawCaloriesPer100g: 115,
    shrinkageWeightLossPct: 23,
    cookedProteinPerOz: 8.2,
    optimalPortionNote: 'As lean as boneless skinless chicken breast with high thiamine.',
  },
  {
    id: 'liquid-egg-whites',
    name: '100% Liquid Egg Whites',
    category: 'dairy',
    rawProteinPer100g: 11.0,
    rawFatPer100g: 0.2,
    rawCarbsPer100g: 0.7,
    rawCaloriesPer100g: 50,
    shrinkageWeightLossPct: 10,
    cookedProteinPerOz: 3.5,
    optimalPortionNote: '1 cup (8 oz) gives 26g pure protein with zero fat and zero cholesterol.',
  },
  {
    id: 'extra-firm-tofu',
    name: 'Extra Firm Tofu (Pressed)',
    category: 'plant',
    rawProteinPer100g: 10.0,
    rawFatPer100g: 5.0,
    rawCarbsPer100g: 2.0,
    rawCaloriesPer100g: 90,
    shrinkageWeightLossPct: 15,
    cookedProteinPerOz: 3.4,
    optimalPortionNote: 'Press moisture out with paper towels for 15 mins before air frying.',
  },
];

// ==========================================
// 23. COFFEE & TEA EXTRACTION CONSTANTS
// ==========================================

export interface CoffeeExtractionProfile {
  id: string;
  name: string;
  beverageType: 'coffee' | 'tea';
  defaultRatioGramsPerLiter: number; // e.g. 60g/L = 1:16.6
  ratioDisplay: string;
  waterTempF: number;
  waterTempC: number;
  grindSize: string;
  brewTimeSeconds: number;
  stepByStepKey: string;
}

export const COFFEE_EXTRACTION_PROFILES: CoffeeExtractionProfile[] = [
  {
    id: 'french-press',
    name: 'French Press (Immersion)',
    beverageType: 'coffee',
    defaultRatioGramsPerLiter: 65, // 1:15.4
    ratioDisplay: '1:15 ratio (65g coffee per 1000g water)',
    waterTempF: 205,
    waterTempC: 96,
    grindSize: 'Coarse (Sea salt consistency)',
    brewTimeSeconds: 240, // 4 mins
    stepByStepKey: 'Steep 4 mins, break crust with spoon, scoop foam, plunge gently without crushing bed.',
  },
  {
    id: 'v60-pour-over',
    name: 'V60 / Chemex (Pour Over)',
    beverageType: 'coffee',
    defaultRatioGramsPerLiter: 60, // 1:16.6
    ratioDisplay: '1:16.6 ratio (60g coffee per 1000g water)',
    waterTempF: 202,
    waterTempC: 94,
    grindSize: 'Medium-Fine (Table salt consistency)',
    brewTimeSeconds: 195, // 3:15
    stepByStepKey: '45s bloom with 3x coffee weight in water. Pour in gentle concentric spirals.',
  },
  {
    id: 'aeropress',
    name: 'AeroPress (Inverted Standard)',
    beverageType: 'coffee',
    defaultRatioGramsPerLiter: 75, // 1:13.3
    ratioDisplay: '1:13 ratio (15g coffee to 200g water)',
    waterTempF: 195,
    waterTempC: 90,
    grindSize: 'Fine (Between espresso and drip)',
    brewTimeSeconds: 90,
    stepByStepKey: 'Stir 10s vigorously, steep 60s, press gently for 20s stopping at hiss.',
  },
  {
    id: 'cold-brew-concentrate',
    name: 'Cold Brew Concentrate (1:8)',
    beverageType: 'coffee',
    defaultRatioGramsPerLiter: 125, // 1:8
    ratioDisplay: '1:8 concentrate (100g coffee per 800g water)',
    waterTempF: 68,
    waterTempC: 20,
    grindSize: 'Extra Coarse (Cracked peppercorns)',
    brewTimeSeconds: 57600, // 16 hours
    stepByStepKey: 'Steep at room temp for 16 hours, filter through paper filter, dilute 1:1 with cold milk/water.',
  },
  {
    id: 'japanese-green-tea',
    name: 'Japanese Sencha & Green Tea',
    beverageType: 'tea',
    defaultRatioGramsPerLiter: 15, // 3g per 200ml
    ratioDisplay: '1:65 ratio (3g loose leaf per 200ml water)',
    waterTempF: 175,
    waterTempC: 80,
    grindSize: 'Whole loose leaf',
    brewTimeSeconds: 90,
    stepByStepKey: 'Never use boiling water; 175°F protects delicate catechins and prevents bitter astringency.',
  },
  {
    id: 'black-tea-english',
    name: 'English Breakfast & Assam Black Tea',
    beverageType: 'tea',
    defaultRatioGramsPerLiter: 12,
    ratioDisplay: '1:80 ratio (3g per 250ml cup)',
    waterTempF: 212,
    waterTempC: 100,
    grindSize: 'Broken leaf / Whole leaf',
    brewTimeSeconds: 240,
    stepByStepKey: 'Full boiling water (212°F) required to extract robust polyphenols and tannins.',
  },
];

// ==========================================
// 24. BBQ BRISKET TIMELINE CONSTANTS
// ==========================================

export interface BrisketTimelineSpec {
  id: string;
  cutName: string;
  smokerTempF: number;
  estimatedMinutesPerLb: number;
  expectedStallTempF: number;
  butcherPaperWrapTempF: number;
  finalTargetTempF: number;
  minCoolerRestHours: number;
  maxCoolerRestHours: number;
  keyAction: string;
}

export const BRISKET_TIMELINE_SPECS: BrisketTimelineSpec[] = [
  {
    id: 'packer-brisket-225',
    cutName: 'Whole Packer Brisket (12–16 lbs @ 225°F)',
    smokerTempF: 225,
    estimatedMinutesPerLb: 70, // ~1.15 hrs/lb
    expectedStallTempF: 160,
    butcherPaperWrapTempF: 165,
    finalTargetTempF: 203,
    minCoolerRestHours: 2.5,
    maxCoolerRestHours: 6.0,
    keyAction: 'Wrap tightly in pink butcher paper with tallow once dark mahogany bark sets.',
  },
  {
    id: 'packer-brisket-275',
    cutName: 'Hot & Fast Packer Brisket (12–16 lbs @ 275°F)',
    smokerTempF: 275,
    estimatedMinutesPerLb: 45, // ~0.75 hrs/lb
    expectedStallTempF: 162,
    butcherPaperWrapTempF: 168,
    finalTargetTempF: 203,
    minCoolerRestHours: 2.0,
    maxCoolerRestHours: 5.0,
    keyAction: 'Cuts total smoke time from 14 hrs to 9 hrs; requires dedicated 2+ hr faux Cambro rest.',
  },
  {
    id: 'pork-butt-pulled',
    cutName: 'Bone-In Pork Shoulder Butt (8–10 lbs)',
    smokerTempF: 250,
    estimatedMinutesPerLb: 65,
    expectedStallTempF: 165,
    butcherPaperWrapTempF: 170,
    finalTargetTempF: 205,
    minCoolerRestHours: 1.5,
    maxCoolerRestHours: 4.0,
    keyAction: 'Probe bone with thermometer; should slide like warm butter with zero resistance.',
  },
];

// ==========================================
// 25. GROUND BEEF FAT YIELD & MACRO DATA
// ==========================================

export interface GroundBeefFatSpec {
  id: string;
  label: string;
  leanPct: number;
  fatPct: number;
  cookedYieldWeightPct: number; // percentage of raw weight remaining
  fatRenderedOzPerLbRaw: number;
  drainedCaloriesPer4ozCooked: number;
  drainedFatGramsPer4ozCooked: number;
  drainedProteinGramsPer4ozCooked: number;
  undrainedCaloriesPer4ozCooked: number;
  undrainedFatGramsPer4ozCooked: number;
  bestUse: string;
}

export const GROUND_BEEF_FAT_SPECS: GroundBeefFatSpec[] = [
  {
    id: 'beef-73-27',
    label: '73/27 Regular Ground Beef',
    leanPct: 73,
    fatPct: 27,
    cookedYieldWeightPct: 62,
    fatRenderedOzPerLbRaw: 4.2,
    drainedCaloriesPer4ozCooked: 240,
    drainedFatGramsPer4ozCooked: 14,
    drainedProteinGramsPer4ozCooked: 28,
    undrainedCaloriesPer4ozCooked: 350,
    undrainedFatGramsPer4ozCooked: 28,
    bestUse: 'High-fat campfire burgers or ground meat where grease is drained away completely for chili.',
  },
  {
    id: 'beef-80-20',
    label: '80/20 Ground Chuck (Burger Standard)',
    leanPct: 80,
    fatPct: 20,
    cookedYieldWeightPct: 70,
    fatRenderedOzPerLbRaw: 3.1,
    drainedCaloriesPer4ozCooked: 230,
    drainedFatGramsPer4ozCooked: 13,
    drainedProteinGramsPer4ozCooked: 28,
    undrainedCaloriesPer4ozCooked: 310,
    undrainedFatGramsPer4ozCooked: 22,
    bestUse: 'The undisputed gold standard for smash burgers, pub burgers, and meatloaf juiciness.',
  },
  {
    id: 'beef-85-15',
    label: '85/15 Ground Round',
    leanPct: 85,
    fatPct: 15,
    cookedYieldWeightPct: 75,
    fatRenderedOzPerLbRaw: 2.2,
    drainedCaloriesPer4ozCooked: 215,
    drainedFatGramsPer4ozCooked: 11,
    drainedProteinGramsPer4ozCooked: 29,
    undrainedCaloriesPer4ozCooked: 270,
    undrainedFatGramsPer4ozCooked: 17,
    bestUse: 'Italian bolognese sauces, stuffed peppers, and baked casseroles.',
  },
  {
    id: 'beef-90-10',
    label: '90/10 Ground Sirloin',
    leanPct: 90,
    fatPct: 10,
    cookedYieldWeightPct: 80,
    fatRenderedOzPerLbRaw: 1.4,
    drainedCaloriesPer4ozCooked: 200,
    drainedFatGramsPer4ozCooked: 9,
    drainedProteinGramsPer4ozCooked: 30,
    undrainedCaloriesPer4ozCooked: 230,
    undrainedFatGramsPer4ozCooked: 12,
    bestUse: 'Healthy weeknight tacos, burrito bowls, and quick skillet stir-fries.',
  },
  {
    id: 'beef-93-7',
    label: '93/7 Lean Ground Beef',
    leanPct: 93,
    fatPct: 7,
    cookedYieldWeightPct: 83,
    fatRenderedOzPerLbRaw: 0.9,
    drainedCaloriesPer4ozCooked: 175,
    drainedFatGramsPer4ozCooked: 6,
    drainedProteinGramsPer4ozCooked: 31,
    undrainedCaloriesPer4ozCooked: 195,
    undrainedFatGramsPer4ozCooked: 8,
    bestUse: 'Strict macro bodybuilder meal prep; cook in broth/marinara to prevent drying.',
  },
];

// ==========================================
// 26. DUTCH OVEN ARTISAN BREAD CONSTANTS
// ==========================================

export interface DutchOvenBreadSpec {
  id: string;
  name: string;
  flourWeightGrams: number;
  waterHydrationPct: number;
  preheatTempF: number;
  preheatDurationMins: number;
  lidOnSteamMins: number;
  lidOffBrowningMins: number;
  internalTargetTempF: number;
  coolingRestMins: number;
  techniqueTip: string;
}

export const DUTCH_OVEN_BREAD_SPECS: DutchOvenBreadSpec[] = [
  {
    id: 'standard-country-boule',
    name: 'Classic No-Knead Country Boule (500g Flour)',
    flourWeightGrams: 500,
    waterHydrationPct: 72,
    preheatTempF: 450,
    preheatDurationMins: 45,
    lidOnSteamMins: 25,
    lidOffBrowningMins: 18,
    internalTargetTempF: 208,
    coolingRestMins: 60,
    techniqueTip: 'Trapped steam in closed Dutch oven keeps crust supple for maximum oven spring expansion before gelatinizing.',
  },
  {
    id: 'high-hydration-sourdough',
    name: 'High Hydration Sourdough Batard',
    flourWeightGrams: 450,
    waterHydrationPct: 78,
    preheatTempF: 475,
    preheatDurationMins: 60,
    lidOnSteamMins: 20,
    lidOffBrowningMins: 22,
    internalTargetTempF: 210,
    coolingRestMins: 90,
    techniqueTip: 'Score at 30-degree angle with razor blade to guide steam release into a crisp protruding ear.',
  },
  {
    id: 'same-day-quick-dutch',
    name: '2-Hour Quick Yeast Pot Bread',
    flourWeightGrams: 450,
    waterHydrationPct: 68,
    preheatTempF: 425,
    preheatDurationMins: 30,
    lidOnSteamMins: 30,
    lidOffBrowningMins: 12,
    internalTargetTempF: 205,
    coolingRestMins: 45,
    techniqueTip: 'Drop 2 ice cubes between parchment paper and hot Dutch oven wall right before closing lid for extra steam burst.',
  },
];

// ==========================================
// 27. CHEESE MELTING & EMULSION MATRIX
// ==========================================

export interface CheeseMeltSpec {
  id: string;
  name: string;
  category: 'high-melt' | 'stretch' | 'hard-grating' | 'non-melting';
  meltingTempF: number;
  meltingTempC: number;
  moisturePct: number;
  fatPct: number;
  meltBehavior: 'Liquid Smooth' | 'Elastic Stringy' | 'Oils Off / Breaks' | 'Holds Solid Shape';
  sodiumCitrateGramsPer100g: number; // for silky mac & cheese / queso
  bestCulinaryUse: string;
}

export const CHEESE_MELT_SPECS: CheeseMeltSpec[] = [
  {
    id: 'low-moisture-mozzarella',
    name: 'Low-Moisture Whole Milk Mozzarella',
    category: 'stretch',
    meltingTempF: 130,
    meltingTempC: 54,
    moisturePct: 48,
    fatPct: 24,
    meltBehavior: 'Elastic Stringy',
    sodiumCitrateGramsPer100g: 2.5,
    bestCulinaryUse: 'Pizza topping, baked ziti, chicken parmesan; stretches without watery pooling.',
  },
  {
    id: 'sharp-cheddar-aged',
    name: 'Sharp Cheddar (Aged 9–12 Months)',
    category: 'high-melt',
    meltingTempF: 150,
    meltingTempC: 65,
    moisturePct: 37,
    fatPct: 33,
    meltBehavior: 'Oils Off / Breaks',
    sodiumCitrateGramsPer100g: 4.0,
    bestCulinaryUse: 'Requires sodium citrate or roux emulsion; melts cleanly on burgers @ 150°F.',
  },
  {
    id: 'american-cheese-pasteurized',
    name: 'American Cheese (Deli Slices)',
    category: 'high-melt',
    meltingTempF: 135,
    meltingTempC: 57,
    moisturePct: 44,
    fatPct: 28,
    meltBehavior: 'Liquid Smooth',
    sodiumCitrateGramsPer100g: 0,
    bestCulinaryUse: 'The definitive smash burger cheese; contains built-in sodium phosphate emulsifiers.',
  },
  {
    id: 'gruyere-swiss',
    name: 'Gruyère AOP',
    category: 'high-melt',
    meltingTempF: 145,
    meltingTempC: 63,
    moisturePct: 36,
    fatPct: 32,
    meltBehavior: 'Liquid Smooth',
    sodiumCitrateGramsPer100g: 3.0,
    bestCulinaryUse: 'French onion soup, fondue, Croque Monsieur; exceptional nutty meltability.',
  },
  {
    id: 'monterey-jack',
    name: 'Monterey Jack / Pepper Jack',
    category: 'high-melt',
    meltingTempF: 135,
    meltingTempC: 57,
    moisturePct: 44,
    fatPct: 31,
    meltBehavior: 'Liquid Smooth',
    sodiumCitrateGramsPer100g: 2.5,
    bestCulinaryUse: 'Quesadillas, nachos, enchiladas, grilled cheese.',
  },
  {
    id: 'queso-oaxaca',
    name: 'Queso Oaxaca (Mexican String Cheese)',
    category: 'stretch',
    meltingTempF: 132,
    meltingTempC: 55,
    moisturePct: 46,
    fatPct: 26,
    meltBehavior: 'Elastic Stringy',
    sodiumCitrateGramsPer100g: 2.5,
    bestCulinaryUse: 'Authentic Mexican quesadillas and tortas; ultra-long epic pull stretch.',
  },
  {
    id: 'parmigiano-reggiano',
    name: 'Parmigiano-Reggiano (24 Month)',
    category: 'hard-grating',
    meltingTempF: 180,
    meltingTempC: 82,
    moisturePct: 30,
    fatPct: 28,
    meltBehavior: 'Oils Off / Breaks',
    sodiumCitrateGramsPer100g: 4.5,
    bestCulinaryUse: 'Finishing garnish on pasta/salads; add rinds to simmering soups for rich umami.',
  },
  {
    id: 'halloumi',
    name: 'Halloumi & Queso Panela',
    category: 'non-melting',
    meltingTempF: 260,
    meltingTempC: 127,
    moisturePct: 46,
    fatPct: 26,
    meltBehavior: 'Holds Solid Shape',
    sodiumCitrateGramsPer100g: 0,
    bestCulinaryUse: 'Direct searing in dry skillet or grates on grill; develops golden crunchy crust without melting.',
  },
  {
    id: 'feta-greek-sheep',
    name: 'Authentic Greek Feta (Brined)',
    category: 'non-melting',
    meltingTempF: 200,
    meltingTempC: 93,
    moisturePct: 55,
    fatPct: 21,
    meltBehavior: 'Holds Solid Shape',
    sodiumCitrateGramsPer100g: 0,
    bestCulinaryUse: 'Baked feta pasta, Greek salads, roasted vegetable sheet pans; softens creamy without liquifying.',
  },
];

