// Authoring queue — 50 proposed recipes to take the catalog from 20 to 70.
// Built to close the empty/thin hubs identified in the Rev.B review, add the three
// missing proteins (turkey, vegetarian, dairy-eggs), and reuse cook-time entries that
// already exist so every new recipe lands with an internal link ready.
//
// `ct` = the foodSlug in data/cook-times.ts this recipe links to. null = needs a new entry.
// `why` = the search intent that earns the page. If it's weak, cut the recipe.

export const QUEUE = [
  // ── AIR FRYER (12) — flagship appliance, but capped so it stops being 90% of the site
  { n:1,  title:'Air Fryer Frozen Chicken Nuggets & Fries',        appliance:'air-fryer',   protein:'chicken',    cats:['no-thaw','kid-approved','five-ingredient'], ct:'frozen-french-fries',      why:'"air fryer frozen nuggets" — enormous volume, zero-skill entry point, both items one basket' },
  { n:2,  title:'Air Fryer Turkey Meatballs',                      appliance:'air-fryer',   protein:'turkey',     cats:['high-protein','kid-approved','budget'],     ct:'meatballs-fresh-beef',     why:'First turkey recipe on the site. "air fryer turkey meatballs" is underserved vs beef' },
  { n:3,  title:'Air Fryer Buffalo Cauliflower Bites',             appliance:'air-fryer',   protein:'vegetarian', cats:['sides','game-day','snacks'],                ct:null,                       why:'First vegetarian recipe. Fills sides AND game-day, both thin' },
  { n:4,  title:'Air Fryer Bacon (No Splatter)',                   appliance:'air-fryer',   protein:'pork',       cats:['breakfast','five-ingredient'],              ct:'bacon-thick-cut',          why:'"air fryer bacon" is a top-5 air fryer query. Opens the empty breakfast hub' },
  { n:5,  title:'Air Fryer "Hard-Boiled" Eggs',                    appliance:'air-fryer',   protein:'dairy-eggs', cats:['breakfast','five-ingredient','budget'],     ct:null,                       why:'First dairy-eggs recipe. High volume, genuinely useful, trivially verifiable' },
  { n:6,  title:'Air Fryer Frozen Mozzarella Sticks',              appliance:'air-fryer',   protein:'dairy-eggs', cats:['snacks','no-thaw','game-day'],              ct:'frozen-mozzarella-sticks', why:'Cook-time entry already exists with no recipe attached' },
  { n:7,  title:'Air Fryer Crispy-Skin Bone-In Chicken Thighs',    appliance:'air-fryer',   protein:'chicken',    cats:['high-protein','budget'],                    ct:'chicken-thighs-bone-in',   why:'Cheapest chicken cut, best air fryer result, existing cook-time entry' },
  { n:8,  title:'Air Fryer Pork Tenderloin',                       appliance:'air-fryer',   protein:'pork',       cats:['high-protein','weekend'],                   ct:'pork-tenderloin',          why:'Existing cook-time entry. Cut people routinely overcook — the doneness cue is the value' },
  { n:9,  title:'Air Fryer Frozen Taquitos',                       appliance:'air-fryer',   protein:'chicken',    cats:['snacks','no-thaw','game-day'],              ct:'frozen-taquitos',          why:'Existing cook-time entry. no-thaw is currently at 1 recipe' },
  { n:10, title:'Air Fryer Broccoli That Isn\'t Mushy',            appliance:'air-fryer',   protein:'vegetarian', cats:['sides','five-ingredient'],                  ct:'broccoli-florets-fresh',   why:'Existing cook-time entry. sides is at 1 recipe. The failure mode is the whole article' },
  { n:11, title:'Air Fryer Cod Fish Sticks From Scratch',          appliance:'air-fryer',   protein:'seafood',    cats:['kid-approved','high-protein'],              ct:'cod-whitefish-fillet',     why:'Existing cook-time entry. Cheap whitefish, kid-friendly framing' },
  { n:12, title:'Air Fryer Tater Tot Breakfast Casserole',         appliance:'air-fryer',   protein:'dairy-eggs', cats:['breakfast','budget','one-pan'],             ct:'tater-tots-frozen',        why:'Existing cook-time entry. Third breakfast recipe — hub clears the 3-recipe gate' },

  // ── SKILLET (8) — currently 3
  { n:13, title:'15-Minute Skillet Turkey Sloppy Joes',            appliance:'skillet',     protein:'turkey',     cats:['15-minute','kid-approved','budget'],        ct:null,                       why:'Turkey #2. Direct swap for the beef version everyone already searches' },
  { n:14, title:'Skillet Chicken Thigh Fajita Bowls',              appliance:'skillet',     protein:'chicken',    cats:['15-minute','one-pan','high-protein'],       ct:'chicken-fajita-strips',    why:'Existing cook-time entry. Bowl format outranks "fajitas" for meal-prep intent' },
  { n:15, title:'Dad\'s Skillet Fried Rice (Leftover Rescue)',     appliance:'skillet',     protein:'dairy-eggs', cats:['15-minute','budget','one-pan'],             ct:null,                       why:'"leftover rice" angle. Genuinely zero-cost meal, strong budget-hub filler' },
  { n:16, title:'Skillet Steak Bites & Crispy Potatoes',           appliance:'skillet',     protein:'beef',       cats:['15-minute','high-protein','one-pan'],       ct:'sirloin-steak-bites',      why:'Skillet counterpart to the existing air fryer version — cross-appliance link pair' },
  { n:17, title:'Skillet Sausage & Peppers (Sub Filling)',         appliance:'skillet',     protein:'pork',       cats:['15-minute','game-day'],                     ct:null,                       why:'game-day is at 2. Sub-filling framing separates it from the sheet-pan sausage recipe' },
  { n:18, title:'15-Minute Skillet Shrimp Tacos',                  appliance:'skillet',     protein:'seafood',    cats:['15-minute','five-ingredient'],              ct:'jumbo-shrimp-raw',         why:'Existing cook-time entry. Fastest protein in the kitchen — on-brand for the site' },
  { n:19, title:'Skillet Black Bean & Corn Quesadillas',           appliance:'skillet',     protein:'vegetarian', cats:['budget','kid-approved','five-ingredient'],  ct:null,                       why:'Vegetarian #2. Genuinely under $6 for four — supports the budget claim with real math' },
  { n:20, title:'One-Pan Skillet Chicken Parm (No Breading Mess)', appliance:'skillet',     protein:'chicken',    cats:['one-pan','kid-approved'],                   ct:'chicken-breast-boneless',  why:'"no breading" is the differentiator — the mess is the actual objection dads have' },

  // ── SHEET PAN (6) — currently 4
  { n:21, title:'Sheet Pan Turkey Meatball Sub Melts',             appliance:'sheet-pan',   protein:'turkey',     cats:['one-pan','kid-approved','game-day'],        ct:null,                       why:'Turkey #3. Melts under the broiler is a distinct technique from the meatball recipe' },
  { n:22, title:'Sheet Pan Chicken Thighs & Root Vegetables',      appliance:'sheet-pan',   protein:'chicken',    cats:['one-pan','budget'],                         ct:'chicken-thighs-bone-in',   why:'The canonical sheet-pan dinner. Timing veg against protein is the real problem to solve' },
  { n:23, title:'Sheet Pan Sausage & Egg Breakfast Hash',          appliance:'sheet-pan',   protein:'pork',       cats:['breakfast','one-pan'],                      ct:null,                       why:'Breakfast #4. Feeds six without standing at a stove — weekend-morning intent' },
  { n:24, title:'Sheet Pan Shrimp Boil (No Giant Pot)',            appliance:'sheet-pan',   protein:'seafood',    cats:['one-pan','weekend'],                        ct:'corn-on-the-cob',          why:'"shrimp boil without a pot" — real query, real problem, existing cook-time entry' },
  { n:25, title:'Sheet Pan Crispy Gnocchi & Vegetables',           appliance:'sheet-pan',   protein:'vegetarian', cats:['one-pan','five-ingredient'],                ct:null,                       why:'Vegetarian #3. Shelf-stable gnocchi straight to the pan — no boiling, on-brand' },
  { n:26, title:'Sheet Pan Pork Chops & Apples',                   appliance:'sheet-pan',   protein:'pork',       cats:['one-pan','weekend'],                        ct:'pork-chops-bone-in',       why:'Existing cook-time entry. Sheet-pan counterpart to the air fryer chop recipe' },

  // ── GRILL (7) — currently ZERO. Biggest hub gap and a core dad category.
  { n:27, title:'Backyard Grilled Burgers (The Baseline)',         appliance:'grill',       protein:'beef',       cats:['weekend','kid-approved'],                   ct:'backyard-beef-burgers',    why:'Opens the empty grill hub. Cook-time entry already exists' },
  { n:28, title:'Grilled BBQ Chicken Breasts That Aren\'t Dry',    appliance:'grill',       protein:'chicken',    cats:['high-protein','weekend'],                   ct:'bbq-chicken-breasts',      why:'Existing cook-time entry. Dryness is the universal failure — that IS the article' },
  { n:29, title:'Grilled Corn on the Cob',                         appliance:'grill',       protein:'vegetarian', cats:['sides','five-ingredient'],                  ct:'corn-on-the-cob',          why:'Existing cook-time entry. sides hub needs volume, and this is pure seasonal traffic' },
  { n:30, title:'Grilled Brats with Beer Onions',                  appliance:'grill',       protein:'pork',       cats:['game-day','weekend'],                       ct:'bratwurst-sausages',       why:'Existing cook-time entry. Clears game-day past the 3-recipe gate' },
  { n:31, title:'Grilled Chicken Kebabs (Kid Assembly Line)',      appliance:'grill',       protein:'chicken',    cats:['kid-approved','weekend'],                   ct:null,                       why:'The "let the kids build them" angle is the differentiator, not the marinade' },
  { n:32, title:'Grilled Reverse-Sear Ribeye',                     appliance:'grill',       protein:'beef',       cats:['weekend','high-protein'],                   ct:'grilled-ribeye-steak',     why:'Deliberate pair with the cast-iron ribeye — cross-link them, do NOT reuse the copy' },
  { n:33, title:'Grilled Turkey Burgers That Hold Together',       appliance:'grill',       protein:'turkey',     cats:['high-protein','weekend'],                   ct:null,                       why:'Turkey #4. Falling apart is the entire search intent behind this query' },

  // ── SLOW COOKER (6) — currently ZERO
  { n:34, title:'Slow Cooker Pot Roast',                           appliance:'slow-cooker', protein:'beef',       cats:['weekend','budget'],                         ct:'slow-cooker-pot-roast',    why:'Opens the empty slow-cooker hub. Cook-time entry already exists' },
  { n:35, title:'Slow Cooker Pulled Pork',                         appliance:'slow-cooker', protein:'pork',       cats:['weekend','game-day','budget'],              ct:'pork-butt-pulled-pork',    why:'Existing cook-time entry. Feeds a crowd for under $20 — real budget proof' },
  { n:36, title:'3-Ingredient Slow Cooker Salsa Chicken',          appliance:'slow-cooker', protein:'chicken',    cats:['five-ingredient','budget','no-thaw'],       ct:null,                       why:'Works from frozen breasts — clears no-thaw past the gate. Lowest-effort recipe on the site' },
  { n:37, title:'Slow Cooker Turkey & White Bean Chili',           appliance:'slow-cooker', protein:'turkey',     cats:['budget','high-protein','game-day'],         ct:null,                       why:'Turkey #5. MUST read as a distinct dish from the Dutch oven beef chili — white, not red' },
  { n:38, title:'Slow Cooker Beef & Broccoli',                     appliance:'slow-cooker', protein:'beef',       cats:['kid-approved','budget'],                    ct:null,                       why:'Takeout-replacement intent. Strong repeat-cook recipe' },
  { n:39, title:'Slow Cooker Overnight Steel-Cut Oats',            appliance:'slow-cooker', protein:'vegetarian', cats:['breakfast','budget','five-ingredient'],     ct:null,                       why:'Vegetarian #4, breakfast #5. Runs while everyone sleeps — zero morning effort' },

  // ── DUTCH OVEN (5) — currently 1
  { n:40, title:'Dutch Oven Chicken & Dumplings',                  appliance:'dutch-oven',  protein:'chicken',    cats:['weekend','kid-approved'],                   ct:null,                       why:'Highest-comfort one-pot dish. Dumpling timing is the technical content' },
  { n:41, title:'One-Pot Dutch Oven Mac & Cheese',                 appliance:'dutch-oven',  protein:'dairy-eggs', cats:['kid-approved','budget','one-pan'],          ct:null,                       why:'Pasta cooks in the milk — no draining, no roux. That mechanic is the whole page' },
  { n:42, title:'Dutch Oven Beef Stew',                            appliance:'dutch-oven',  protein:'beef',       cats:['weekend','budget'],                         ct:null,                       why:'Cheap chuck into something worth eating. Sear-then-braise is teachable' },
  { n:43, title:'One-Pot Creamy Sausage Tortellini',               appliance:'dutch-oven',  protein:'pork',       cats:['15-minute','one-pan','kid-approved'],       ct:null,                       why:'Fastest dutch-oven recipe on the site. 15-minute hub reinforcement' },
  { n:44, title:'Dutch Oven No-Knead Bread',                       appliance:'dutch-oven',  protein:'vegetarian', cats:['weekend','five-ingredient'],                ct:null,                       why:'Vegetarian #5. Four ingredients, no skill, huge perceived payoff. Link-worthy' },

  // ── CAST IRON (3) — currently 2
  { n:45, title:'Cast Iron Filet Mignon',                          appliance:'cast-iron',   protein:'beef',       cats:['weekend','high-protein'],                   ct:'filet-mignon-cast-iron',   why:'Existing cook-time entry with no recipe. Anniversary-dinner intent' },
  { n:46, title:'Cast Iron Breakfast Hash & Eggs',                 appliance:'cast-iron',   protein:'dairy-eggs', cats:['breakfast','one-pan','budget'],             ct:null,                       why:'Breakfast #6. Eggs finished in the same pan — one-pan claim is literally true' },
  { n:47, title:'Cast Iron Blackened Cod',                         appliance:'cast-iron',   protein:'seafood',    cats:['15-minute','high-protein'],                 ct:'cod-whitefish-fillet',     why:'Cast-iron counterpart to the air fryer cod — cross-link the pair' },

  // ── SMOKER (3) — currently 1
  { n:48, title:'Smoked Texas-Style Beef Brisket',                 appliance:'smoker',      protein:'beef',       cats:['weekend'],                                  ct:'texas-style-beef-brisket', why:'Existing cook-time entry. The definitive weekend project — highest time-on-page' },
  { n:49, title:'Smoked Chicken Wings (Crispy Skin)',              appliance:'smoker',      protein:'chicken',    cats:['game-day','weekend'],                       ct:null,                       why:'Crispy skin on a smoker is the hard part — that problem is the page' },
  { n:50, title:'Smoked Turkey Breast',                            appliance:'smoker',      protein:'turkey',     cats:['weekend','high-protein'],                   ct:null,                       why:'Seasonal Nov/Dec spike. Turkey is currently absent from the entire catalog' },
];
