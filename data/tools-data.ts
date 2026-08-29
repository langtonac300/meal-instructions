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
