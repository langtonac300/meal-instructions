import { Category } from '@/lib/types';

export interface CategoryGuide {
  category: Category;
  title: string;
  tagline: string;
  overview: string;
  logisticsProtocol: string[];
  goldenRules: {
    title: string;
    description: string;
  }[];
  essentialGear: string[];
  pantryStaples: string[];
  failureModes: {
    mistake: string;
    fix: string;
  }[];
  faqs: {
    q: string;
    a: string;
  }[];
}

export const CATEGORY_GUIDES: Record<Category, CategoryGuide> = {
  '15-minute': {
    category: '15-minute',
    title: 'The 15-Minute Weeknight Dinner Protocol',
    tagline: 'High-speed execution when the kids are starving and bedtime is ticking.',
    overview:
      'A true 15-minute meal is an exercise in kitchen physics and staging logistics. It does not mean rushing or cutting safety corners; it means selecting proteins with high surface-area-to-volume ratios (shrimp, ground beef, shaved ribeye, thinly cut cutlets) and pairing them with high-thermal-conductance cooking methods like preheated cast iron or high-velocity convection. When prep is reduced to zero and cooking surfaces are properly preheated, hot dinner is on the table before takeout could even confirm an order.',
    logisticsProtocol: [
      'Preheat the pan or air fryer before opening the refrigerator door. Cold pans waste 4 to 6 critical minutes.',
      'Rely on pre-washed, pre-cut vegetables (slaw mixes, broccoli florets, baby spinach) that cook in under 4 minutes without knife work.',
      'Use high heat and rapid evaporation. Low heat causes high-moisture proteins to simmer and steam rather than brown.',
      'Stage every sauce and seasoning in advance. In a 15-minute cook, searching for a spice jar burns your protein.'
    ],
    goldenRules: [
      {
        title: 'Surface Area Dictates Cook Time',
        description: 'Thick chicken breasts take 20+ minutes. Sliced into 1/2-inch cutlets or stir-fry strips, that exact same meat cooks in 4 to 5 minutes with superior browning.'
      },
      {
        title: 'Dry Surfaces Before Heat Contact',
        description: 'Moisture is the enemy of fast cooking. Water requires 2,260 joules per gram to vaporize before browning can begin. Pat proteins dry with a paper towel so Maillard browning starts immediately.'
      },
      {
        title: 'Do Not Crowd the Cooking Vessel',
        description: 'Overcrowding traps steam, dropping pan temperatures below 212°F (100°C). Cook in two rapid batches rather than overloading one pan.'
      },
      {
        title: 'Single-Stage Starch Pairing',
        description: 'Pair with 90-second microwave rice, steam-in-bag veggies, warm corn tortillas, or pre-cooked noodles to keep starch timelines aligned with your protein.'
      }
    ],
    essentialGear: [
      '12-Inch Heavy Skillet or Wok',
      'High-Power Instant-Read Thermometer',
      'Wide Fish Spatula / Meat Chopper',
      'Paper Towel Roll for Rapid Drying'
    ],
    pantryStaples: [
      'Neutral High-Smoke-Point Oil (Avocado or Canola)',
      'Coarse Kosher Salt & Coarse Black Pepper',
      'Pre-Minced Garlic & Ginger Paste',
      'Soy Sauce, Toasted Sesame Oil & Sriracha'
    ],
    failureModes: [
      {
        mistake: 'Throwing cold meat into a cold pan',
        fix: 'Preheat your skillet over medium-high heat for a full 3 minutes until a drop of water skitters across the surface.'
      },
      {
        mistake: 'Flipping and stirring constantly',
        fix: 'Let ground beef or shrimp sit undisturbed for the first 2 minutes so a caramelized crust forms before moving.'
      },
      {
        mistake: 'Starting starches after the meat is done',
        fix: 'Start your rice, tortillas, or pasta water before taking the meat out of the fridge.'
      }
    ],
    faqs: [
      {
        q: 'How do you cook chicken in under 15 minutes safely?',
        a: 'Use chicken tenderloins or slice boneless chicken breasts horizontally into cutlets under 1/2-inch thickness. In a preheated 400°F air fryer or hot skillet, cutlets reach 165°F internal in 6 to 8 minutes total.'
      },
      {
        q: 'Can 15-minute meals feed a family of 5?',
        a: 'Yes, by utilizing 12-inch wide skillets or large air fryers. Dishes like Egg Roll in a Bowl (ground pork, cabbage slaw, garlic, ginger) scale cleanly to 2 lbs of meat without adding extra cook time.'
      },
      {
        q: 'What is the fastest vegetable side dish?',
        a: 'Baby spinach or shaved cabbage slaw tossed directly into the pan juices during the final 90 seconds of cooking, or pre-cut broccoli florets air fried at 400°F for 6 minutes.'
      }
    ]
  },

  'high-protein': {
    category: 'high-protein',
    title: 'The High-Protein Weeknight Playbook',
    tagline: '30g to 50g of clean protein per serving without protein powder or filler.',
    overview:
      'High-protein family cooking is about density, moisture preservation, and satiety. Lean proteins like skinless chicken breast, 93/7 ground turkey, top sirloin, and wild salmon have virtually zero margin for thermal error. Overcooking a lean cut by even 5°F expels intracellular moisture, turning a tender dinner into rubbery shoe leather. By combining precise internal pull temperatures with high-heat searing and proper resting protocols, you maximize protein macros while delivering juicy, flavorful meals the family loves.',
    logisticsProtocol: [
      'Anchor meals around whole muscle proteins: aim for 6 to 8 raw ounces per adult serving to net 35-45g cooked protein.',
      'Use dry brining (salting meat 30-60 minutes ahead) to denature surface myosin and trap moisture inside lean cuts.',
      'Pull lean poultry at 160°F and rely on carryover cooking to hit the USDA 165°F threshold during rest.',
      'Pair lean proteins with vegetable-dense fiber (broccoli, asparagus, green beans) to maintain macro balance.'
    ],
    goldenRules: [
      {
        title: 'Precision Temperature Management',
        description: 'Fatty meats forgive 10°F of overcooking; lean chicken breast and pork tenderloin do not. Always use a probe thermometer.'
      },
      {
        title: 'Dry Brining Is Non-Negotiable',
        description: 'Salting chicken breasts or steak 45 minutes ahead allows salt to dissolve, penetrate, and alter protein structure so cells hold onto 15% more water during cooking.'
      },
      {
        title: 'High Heat Exterior, Gentle Core',
        description: 'Sear hard and fast to build savory crust, then pull immediately once core temperature is reached. Lingering heat ruins lean macros.'
      },
      {
        title: 'Resting Protects Protein Integrity',
        description: 'Slice meat too soon and you leave 20% of the natural juices on the cutting board. Rest 5 minutes for chicken, 7 minutes for steak.'
      }
    ],
    essentialGear: [
      'Instant-Read Thermocouple Thermometer',
      'Heavy 12-Inch Cast Iron Skillet',
      'Wire Cooling / Resting Rack',
      'Sharp Chef Knife for Clean Slicing'
    ],
    pantryStaples: [
      'Diamond Crystal Kosher Salt',
      'Smoked Paprika & Garlic Powder',
      'Low-Sodium Chicken Bone Broth',
      'Dijon Mustard & Red Wine Vinegar'
    ],
    failureModes: [
      {
        mistake: 'Cooking chicken breast until it looks white and chalky inside',
        fix: 'Pull chicken at exactly 160°F internal. Carryover heat will bring it to 165°F while resting, preserving moisture.'
      },
      {
        mistake: 'Cutting steak or chicken immediately out of the pan',
        fix: 'Rest on a warm plate or wire rack for at least 5 minutes so muscle fibers relax and reabsorb moisture.'
      },
      {
        mistake: 'Using fat-free sauces with high corn syrup',
        fix: 'Build pan sauces using reduced bone broth, garlic, fresh herbs, and lemon juice for zero-filler flavor.'
      }
    ],
    faqs: [
      {
        q: 'How much protein should I plan per person?',
        a: 'Plan on 6 to 8 ounces of raw meat or fish per adult (which cooks down to approximately 4.5 to 6 ounces), delivering 35g to 45g of complete bioavailable protein.'
      },
      {
        q: 'How do you keep 93/7 lean ground beef or turkey juicy?',
        a: 'Add 2 tablespoons of tomato paste, a splash of beef bone broth, and do not over-brown past the point where pink disappears.'
      },
      {
        q: 'Which cuts provide the highest protein per dollar?',
        a: 'Boneless skinless chicken breasts on sale ($2.49-$2.99/lb), pork tenderloin ($3.49/lb), and 90/10 ground beef bought in bulk.'
      }
    ]
  },

  'kid-approved': {
    category: 'kid-approved',
    title: 'The Picky-Eater Defense Framework',
    tagline: 'Cook one meal for the entire house. Zero separate short-order cooking.',
    overview:
      'The biggest drain on a parent’s weeknight sanity is cooking one dinner for the adults and heating up a box of nuggets for the kids. The Kid-Approved framework eliminates the short-order trap by engineering adult-satisfying meals with built-in deconstruction options. Kids do not hate flavor; they hate unexpected textures, touching foods, and overwhelming bitter greens. By keeping sauces on the side, crisping textures, and offering plain protein options from the same pan, the entire house eats dinner together from a single cooking vessel.',
    logisticsProtocol: [
      'Separate sauce components: dress adult portions in the pan, keep kid portions plain with dip on the side.',
      'Focus on texture: kids strongly prefer crunch (panko, crispy skin, air fryer fries) over soft or soggy textures.',
      'Deconstruct complex dishes: tacos, fajitas, and bowl meals allow children to assemble their own plates without confrontation.',
      'Cut proteins into uniform, bite-sized finger foods that toddlers and young kids can handle independently.'
    ],
    goldenRules: [
      {
        title: 'The "Deconstructed" Principle',
        description: 'Do not mix the salsa, sour cream, and cilantro into the meat. Serve elements in separate sections of a plate so kids maintain autonomy.'
      },
      {
        title: 'Crunch Is King',
        description: 'When vegetables or proteins are crispy (via air fryer or sheet pan roasting), children accept them with 80% higher frequency than steamed alternatives.'
      },
      {
        title: 'Mild Base, Adult Finishers',
        description: 'Season the main dish with garlic, onion, and mild paprika. Add jalapeños, red pepper flakes, or sriracha to adult plates at the table.'
      },
      {
        title: 'Dip Architecture',
        description: 'A 2-ounce ramekin of honey mustard, ranch, or mild barbecue sauce turns virtually any protein or roasted veggie into an engaging activity.'
      }
    ],
    essentialGear: [
      'Divided Plate or Stainless Compartment Tray',
      'Air Fryer for Maximum Crunch',
      'Kitchen Shears for Rapid Food Cutting',
      'Small Ramekins for Dipping Sauces'
    ],
    pantryStaples: [
      'Panko Japanese Breadcrumbs',
      'Ranch Seasoning Packet & Honey Mustard',
      'Mild Cheddar Cheese & Mozzarella',
      'Baby Carrots & Apple Slices'
    ],
    failureModes: [
      {
        mistake: 'Mixing everything together into an unfamiliar casserole',
        fix: 'Present components side-by-side so children can identify every ingredient visually before tasting.'
      },
      {
        mistake: 'Steaming vegetables until they become mushy',
        fix: 'Roast broccoli or carrots at 400°F until edges are golden brown and sweet from natural caramelization.'
      },
      {
        mistake: 'Giving in and cooking a second separate dinner',
        fix: 'Offer bread and butter or a string cheese alongside the family meal without cooking an alternative entree.'
      }
    ],
    faqs: [
      {
        q: 'How do you season food so adults and kids both enjoy it?',
        a: 'Build a savory, non-spicy foundation: salt, garlic powder, onion powder, smoked paprika, and a touch of brown sugar. Adults can finish with chili crisp, hot sauce, or fresh herbs at the table.'
      },
      {
        q: 'What is the most foolproof kid-approved vegetable?',
        a: 'Air fryer broccoli florets tossed with olive oil, salt, and parmesan cheese at 380°F for 7 minutes. The tips get crispy like chips, eliminating bitterness.'
      },
      {
        q: 'How do I introduce new proteins like salmon or pork chops?',
        a: 'Cut them into "dippers" or tenders, coat lightly in panko, and air fry to golden crispness with their favorite dipping sauce.'
      }
    ]
  },

  'budget': {
    category: 'budget',
    title: 'The Sub-$12 Family Dinner System',
    tagline: 'High culinary technique meets everyday Costco and grocery staples.',
    overview:
      'Feeding a hungry family on a budget does not mean subsisting on instant ramen or processed frozen packages. It means applying restaurant culinary techniques to economical cuts: bone-in chicken thighs, pork loin, 80/20 ground beef, dry beans, eggs, and hearty root vegetables. By maximizing browning, using pan deglazing to build rich sauces from fond, and stretching proteins with affordable aromatics, you can serve restaurant-quality meals for under $3 per adult serving.',
    logisticsProtocol: [
      'Focus on high-yield, low-cost proteins: bone-in chicken thighs ($1.49-$1.99/lb) and whole pork loin ($1.99/lb).',
      'Use thermal deglazing: the brown residue stuck to the skillet (fond) is free, concentrated flavor. Water, stock, or vinegar turns it into rich sauce.',
      'Stretch ground meats with fiber: incorporating black beans, diced mushrooms, or lentils into taco meat doubles yield without diluting flavor.',
      'Repurpose leftovers intentionally: roast a 5-lb chicken on Sunday; use shredded meat for quesadillas Tuesday and bones for soup Wednesday.'
    ],
    goldenRules: [
      {
        title: 'Buy Bone-In, Debone Yourself',
        description: 'Bone-in, skin-on chicken thighs cost half the price of boneless skinless breasts. A 3-minute deboning yields meat plus bones for rich stock.'
      },
      {
        title: 'Never Waste the Fond',
        description: 'After searing meats, splash in 1/2 cup of water or broth to lift the caramelized crust. Whisk with a teaspoon of butter for instant pan sauce.'
      },
      {
        title: 'Starch and Acid Balancing',
        description: 'Potatoes, rice, and dried beans cost pennies per portion. Brighten them with cheap acid (lemon juice, apple cider vinegar) for premium flavor.'
      },
      {
        title: 'Bulk Batching & Freezing',
        description: 'Cook 3 lbs of taco meat or pulled pork at once. Portion and freeze in quart bags for 10-minute zero-cost future dinners.'
      }
    ],
    essentialGear: [
      'Heavy 5-to-7 Quart Dutch Oven',
      '12-Inch Rimmed Sheet Pan',
      'Chef Knife with Good Honing Steel',
      'Freezer-Safe Storage Bags'
    ],
    pantryStaples: [
      'Russet Potatoes & Yellow Onions',
      'Canned Black & Pinto Beans',
      'Long Grain White Rice',
      'Canned Crushed Tomatoes & Tomato Paste'
    ],
    failureModes: [
      {
        mistake: 'Throwing away bones and vegetable scraps',
        fix: 'Toss chicken bones, onion skins, and carrot tops into a freezer bag. Simmer with water for free, rich homemade stock.'
      },
      {
        mistake: 'Buying pre-marinated or pre-cut meats at double the price',
        fix: 'Buy whole pork loins or family packs of thighs and portion them into freezer bags with homemade marinades.'
      },
      {
        mistake: 'Letting produce rot in the vegetable drawer',
        fix: 'Toss limp bell peppers, celery, or zucchini into a hot skillet with ground meat before they spoil.'
      }
    ],
    faqs: [
      {
        q: 'What is the most cost-effective dinner protein?',
        a: 'Pork loin roasts (frequently $1.79 to $2.29/lb) and bone-in chicken thighs ($1.49/lb). A 4-lb pork loin yields 8-10 hearty adult portions.'
      },
      {
        q: 'How do you make cheap cuts of meat tender?',
        a: 'Low and slow braising in a Dutch oven or high-pressure cooking in an Instant Pot breaks down collagen into rich, melting gelatin.'
      },
      {
        q: 'How much does an average Meal Instructions budget meal cost?',
        a: 'Our budget-tagged recipes target $2.25 to $3.00 per adult serving, allowing a family of 4 to eat well for under $12 total.'
      }
    ]
  },

  'no-thaw': {
    category: 'no-thaw',
    title: 'The Frozen-to-Table Emergency Guide',
    tagline: 'Forgot to thaw the meat? Cook safely from solid ice with zero microwave defrosting.',
    overview:
      'We have all stood in front of the freezer at 5:45 PM staring at rock-hard frozen chicken breasts or vacuum-sealed salmon fillets. Traditional advice says to thaw overnight in the fridge or use the dreaded microwave defrost setting that turns the edges grey and rubbery while leaving the center frozen. The No-Thaw protocol uses high-velocity convection (air fryer) or radiant sheet pan heating with calibrated thermal curves: a lower initial temperature to thaw the core safely through the danger zone, followed by high heat to crisp the surface.',
    logisticsProtocol: [
      'Never thaw chicken or burgers in warm water on the counter; bacteria multiply rapidly between 40°F and 140°F.',
      'For air frying: start at 360°F for the first 8-10 minutes to drive heat into the core, then increase to 400°F for the final 4-6 minutes to brown.',
      'Separate frozen items before cooking: run sealed vacuum packs under cold tap water for 60 seconds to release ice bonds between pieces.',
      'Always use an instant-read probe thermometer inserted into the geometric center to verify safe pasteurization.'
    ],
    goldenRules: [
      {
        title: 'Two-Stage Temperature Staging',
        description: 'Do not blast frozen meat at 400°F immediately or the exterior will char before the center thaws. Start at 360°F, finish at 400°F.'
      },
      {
        title: 'Oil After Surface Thaw',
        description: 'Oil spray slides off rock-hard ice. Air fry or bake for 4 minutes until surface frost melts, then spray with oil and apply dry rub.'
      },
      {
        title: 'Flat Frozen Profiles Only',
        description: 'Individually frozen burgers, tenders, salmon fillets, and sausages cook beautifully from frozen. Thick 4-lb whole roasts should never be cooked from frozen.'
      },
      {
        title: 'Add 30-40% Cook Time',
        description: 'A fresh burger patty takes 8 minutes; a rock-hard frozen patty takes 12-14 minutes. Plan timing accordingly.'
      }
    ],
    essentialGear: [
      'Basket Air Fryer with Digital Temp Control',
      'Instant-Read Core Thermometer',
      'Heavy-Duty Stainless Steel Tongs',
      'Cold Water Bowl for Quick Release'
    ],
    pantryStaples: [
      'High-Smoke-Point Oil Spray (Avocado)',
      'Dry Rub Seasoning Blends (Garlic, Paprika, Brown Sugar)',
      'Pre-Frozen Individually Wrapped Salmon Fillets',
      'Pre-Formed Frozen Burger Patties'
    ],
    failureModes: [
      {
        mistake: 'Spraying oil and dry seasoning onto frost-covered meat',
        fix: 'Cook 4 minutes first to melt exterior ice crystals, pat dry with a paper towel, then apply oil and rub.'
      },
      {
        mistake: 'Cooking thick bone-in roasts from frozen in a slow cooker',
        fix: 'Never slow cook large frozen roasts; the interior lingers too long in the bacterial danger zone (40°F–140°F).'
      },
      {
        mistake: 'Pulling when the outside looks browned without probing',
        fix: 'Exterior browning happens fast. Always probe the exact center to verify it hits USDA safe temperatures.'
      }
    ],
    faqs: [
      {
        q: 'Is it safe to cook chicken breast directly from frozen?',
        a: 'Yes, provided it is cooked in an oven or air fryer where the temperature rises quickly through the danger zone to reach 165°F core temp. Never cook frozen chicken in a slow cooker.'
      },
      {
        q: 'How do you cook frozen salmon without it drying out?',
        a: 'Air fry skin-side down at 390°F for 10-12 minutes. The high heat thaws and roasts the fillet quickly, preserving delicate oils.'
      },
      {
        q: 'Why do frozen burgers taste just as good as fresh?',
        a: 'Commercial flash-freezing locks in moisture. Searing them directly in a hot air fryer or cast iron skillet produces a delicious, juicy crust.'
      }
    ]
  },

  'one-pan': {
    category: 'one-pan',
    title: 'The Single-Vessel Kitchen Architecture',
    tagline: 'Feed the whole crew with restaurant satisfaction and a 2-minute sink cleanup.',
    overview:
      'The true cost of cooking dinner is not just prep and cook time; it is the demoralizing sink full of pots, pans, cutting boards, and spatulas waiting for you at 7:30 PM. One-pan cooking re-engineers dinner so the protein, starch, and vegetables cook synchronously on a single 18x13-inch rimmed sheet pan, inside a 12-inch cast iron skillet, or within a heavy Dutch oven. By staggering ingredient placement according to cooking density, everything finishes at the exact same second with one pan to wash.',
    logisticsProtocol: [
      'Use heavy half-sheet pans (18x13 inches) made of 18-gauge commercial aluminum that will not warp under high heat.',
      'Line pans with unbleached parchment paper or heavy-duty aluminum foil for zero-scrub cleanup.',
      'Stagger dense ingredients: toss root vegetables (potatoes, carrots) in first for 15 minutes, then add proteins and quick-cooking greens.',
      'Space ingredients evenly: if food is piled high, it steams rather than roasts. Use the entire pan surface.'
    ],
    goldenRules: [
      {
        title: 'Thermal Staggering',
        description: 'Potatoes take 30 minutes; salmon takes 12 minutes. Start the potatoes first, push them aside, and add the salmon at the 18-minute mark.'
      },
      {
        title: 'Uniform Knife Cuts',
        description: 'Cut vegetables to matching dimensions (1-inch potato cubes, 1-inch bell pepper squares) so they cook at an identical rate.'
      },
      {
        title: 'High Heat Convection Roasting',
        description: 'Roast at 400°F to 425°F. High heat caramelizes natural sugars in vegetables while crisping protein edges.'
      },
      {
        title: 'Parchment Paper Barrier',
        description: 'Quality parchment paper prevents stuck cheese or charred sauces from bonding to metal, reducing cleanup to a 30-second wipe.'
      }
    ],
    essentialGear: [
      'Commercial 18x13-Inch Half Sheet Pan',
      'Unbleached Parchment Paper Sheets',
      '12-Inch Cast Iron Skillet',
      'Heavy 6-Quart Enameled Dutch Oven'
    ],
    pantryStaples: [
      'Extra Virgin Olive Oil',
      'Smoked Sausage / Kielbasa Links',
      'Mini Baby Potatoes (No Peeling Needed)',
      'Bell Peppers & Sweet Onions'
    ],
    failureModes: [
      {
        mistake: 'Using flimsy non-stick cookie sheets that buckle and warp in the oven',
        fix: 'Invest in commercial-grade 18-gauge rimmed aluminum half sheet pans ($15 at restaurant supply or online).'
      },
      {
        mistake: 'Putting delicate vegetables like asparagus in at the beginning with potatoes',
        fix: 'Add quick-cooking greens during the final 8-10 minutes of the bake.'
      },
      {
        mistake: 'Overcrowding the pan until vegetables turn soggy',
        fix: 'Leave space between ingredients. If cooking for 6+ people, use two separate sheet pans on different oven racks.'
      }
    ],
    faqs: [
      {
        q: 'What sheet pan size should every family own?',
        a: 'A standard half-sheet pan measuring 18x13 inches with a 1-inch rolled rim. It fits all standard home ovens and provides 234 square inches of cooking space.'
      },
      {
        q: 'Can you cook chicken breasts and vegetables on the same pan safely?',
        a: 'Yes, provided the chicken reaches 165°F internal and juices that render onto the vegetables are exposed to the same 400°F oven heat.'
      },
      {
        q: 'Is parchment paper safe at 425°F?',
        a: 'Yes, quality parchment paper is rated up to 425°F-450°F. Keep it trimmed so edges do not touch oven heating elements.'
      }
    ]
  },

  'five-ingredient': {
    category: 'five-ingredient',
    title: 'The Five-Ingredient Minimalist Standard',
    tagline: 'Zero specialty grocery store trips. Maximum flavor derived from heat and technique.',
    overview:
      'Long ingredient lists create decision fatigue and lead to half-empty jars of obscure spices rotting in your pantry. The Five-Ingredient philosophy strips dinner down to its essential core: a quality protein, an aromatic anchor, a high-heat cooking fat, a fresh vegetable or starch, and a balancing acid or savory finisher (salt, black pepper, and cooking oil are pantry freebies). When you eliminate ingredient clutter, proper cooking technique—high-heat searing, reduction, and temperature precision—steps up to deliver clean, memorable flavor.',
    logisticsProtocol: [
      'Select ingredients that carry multi-dimensional flavor: bacon, parmesan cheese, pesto, Dijon mustard, and soy sauce.',
      'Rely on the Maillard reaction rather than heavy spice blends to generate deep savory savoriness (umami).',
      'Keep grocery shopping under 5 minutes: you can memorize the entire ingredient list without a written note.',
      'Master the pan sauce: deglazing browned meat bits with broth, butter, or lemon produces a 5-star sauce without extra purchases.'
    ],
    goldenRules: [
      {
        title: 'Ingredient Density',
        description: 'Choose ingredients that do double duty: bacon provides both savory meat and cooking fat; parmesan provides salt and umami.'
      },
      {
        title: 'Technique Replaces Spice Clutter',
        description: 'Proper searing, garlic caramelization, and pan deglazing produce deeper complexity than shaking 8 dried spices into a pan.'
      },
      {
        title: 'Salt, Pepper & Oil Are Free',
        description: 'Core pantry basics (kosher salt, black pepper, neutral oil) do not count toward your 5 ingredients.'
      },
      {
        title: 'Finish with Acid',
        description: 'A squeeze of fresh lemon juice or a dash of vinegar balances rich fats and makes simple flavors pop.'
      }
    ],
    essentialGear: [
      '12-Inch Stainless Steel or Cast Iron Pan',
      'Microplane Zester / Grater',
      'Instant-Read Digital Thermometer',
      'Solid Metal Whisk'
    ],
    pantryStaples: [
      'Block of Parmigiano Reggiano',
      'Fresh Lemons & Garlic Cloves',
      'Dijon Mustard & Soy Sauce',
      'Unsalted Butter'
    ],
    failureModes: [
      {
        mistake: 'Using pre-shredded cheese with anti-caking starches',
        fix: 'Buy block cheese and grate it fresh. It melts smoothly into pan sauces instead of clumping.'
      },
      {
        mistake: 'Under-salting simple ingredients',
        fix: 'With fewer ingredients, proper seasoning is critical. Salt meat generously at least 15 minutes before cooking.'
      },
      {
        mistake: 'Burning the garlic over high heat',
        fix: 'Add minced garlic during the final 60 seconds of cooking so it blooms in the oil without scorching.'
      }
    ],
    faqs: [
      {
        q: 'What counts as the 5 ingredients?',
        a: 'The 5 ingredients are your core grocery items (e.g. chicken thighs, garlic, honey, soy sauce, green beans). Water, salt, black pepper, and standard cooking oil are pantry constants.'
      },
      {
        q: 'How can 5-ingredient meals taste rich without long simmer times?',
        a: 'By utilizing natural umami boosters like seared meat fond, parmesan cheese, aged balsamic, or concentrated tomato paste.'
      },
      {
        q: 'Are five-ingredient meals healthy?',
        a: 'Extremely. Eliminating processed marinades and complex sauces naturally keeps meals centered around whole meats and fresh produce.'
      }
    ]
  },

  'sides': {
    category: 'sides',
    title: 'High-Speed Sides & Vegetable Mechanics',
    tagline: 'Crispy broccoli, perfect potatoes, and vibrant greens in under 10 minutes.',
    overview:
      'Too many home cooks spend all their mental energy on the steak or chicken, leaving vegetables as an unseasoned, soggy afterthought. The Secret to great side dishes is high-velocity heat, minimal moisture, and aggressive seasoning. Steaming vegetables in boiling water washes away water-soluble vitamins and leaves them limp; blasting them in an air fryer or searing them in cast iron caramelizes surface sugars and creates irresistible crispy edges that kids and adults fight over.',
    logisticsProtocol: [
      'Always dry washed vegetables thoroughly before cooking; surface water boils into steam and prevents roasting.',
      'Cut vegetables into equal-thickness pieces to guarantee uniform tenderness throughout the batch.',
      'Toss vegetables in oil before seasoning so spices adhere evenly instead of pooling at the bottom of the bowl.',
      'Time sides to finish 2 minutes before the meat finishes resting so everything arrives piping hot.'
    ],
    goldenRules: [
      {
        title: 'Total Moisture Removal',
        description: 'Spin or towel-dry greens, broccoli, and potatoes. Dry vegetables crisp; wet vegetables turn to mush.'
      },
      {
        title: 'Aggressive Convection Heat',
        description: 'Roast vegetables at 400°F in an air fryer or 425°F in an oven. High heat browns edges before interiors overcook.'
      },
      {
        title: 'Season After the Oil',
        description: 'Oil first, then salt and spices. Salt draws out moisture; oil coats and creates a protective frying barrier.'
      },
      {
        title: 'Acid & Fat Finish',
        description: 'A toss with lemon zest, grated parmesan, or melted herb butter immediately out of the heat elevates plain veggies.'
      }
    ],
    essentialGear: [
      'Salad Spinner / Lint-Free Kitchen Towel',
      'Air Fryer with Wire Crisp Plate',
      'Stainless Steel Mixing Bowls',
      'Silicone Pastry Brush'
    ],
    pantryStaples: [
      'Fresh Broccoli Crowns & Asparagus',
      'Baby Gold / Red Potatoes',
      'Garlic Powder & Smoked Paprika',
      'Fresh Lemons & Grated Parmesan'
    ],
    failureModes: [
      {
        mistake: 'Crowding the air fryer basket with wet broccoli florets',
        fix: 'Dry thoroughly and cook in a single layer with space for airflow so the florets crisp like chips.'
      },
      {
        mistake: 'Boiling potatoes without salting the cooking water heavily',
        fix: 'Salt potato water until it tastes like the ocean; potatoes absorb salt internally only during cooking.'
      },
      {
        mistake: 'Overcooking asparagus until it bends limp',
        fix: 'Roast at 425°F for just 6 to 8 minutes until bright green with lightly charred tips.'
      }
    ],
    faqs: [
      {
        q: 'What is the fastest vegetable side dish in the air fryer?',
        a: 'Broccoli florets or trimmed asparagus. Tossed with olive oil and salt, both cook to crispy perfection in 6 to 7 minutes at 380°F.'
      },
      {
        q: 'How do you get baked potatoes with crispy skin and fluffy centers?',
        a: 'Wash, dry, pierce with a fork, rub with oil and coarse kosher salt, and bake directly on the oven rack at 400°F for 50 minutes.'
      },
      {
        q: 'Can you reheat vegetable sides without sogginess?',
        a: 'Always reheat in the air fryer at 360°F for 3 minutes. Never microwave roasted vegetables.'
      }
    ]
  },

  'snacks': {
    category: 'snacks',
    title: 'The Late-Night & High-Speed Crunch Matrix',
    tagline: 'Maximum crunch and flavor in single-serving speed with zero oil splatter.',
    overview:
      'Late-night cravings, game breaks, and after-school hunger demand immediate crunch without the mess of deep fryers or 20-minute oven preheats. Modern air fryer technology makes classic bar bites—mozzarella sticks, taquitos, quesadillas, and wings—crunchier, faster, and far cleaner than shallow-frying in oil. By mastering rapid turnover techniques and single-layer spacing, you can deliver tavern-grade crunch in under 8 minutes.',
    logisticsProtocol: [
      'Preheat the air fryer for 2 minutes to ensure immediate exterior crisping upon contact.',
      'Space frozen appetizers at least 1/2-inch apart to allow high-velocity air circulation around all sides.',
      'Shake the basket at the exact halfway mark to redistribute hot spots and ensure uniform browning.',
      'Rest crunchy snacks on a wire rack for 60 seconds; resting on a flat plate traps steam and softens bottoms.'
    ],
    goldenRules: [
      {
        title: 'Single-Layer Airflow',
        description: 'Never pile mozzarella sticks or egg rolls on top of each other. Overlapping areas remain doughy and pale.'
      },
      {
        title: 'Light Oil Spray on Dry Surfaces',
        description: 'A light mist of avocado oil spray triggers rapid Maillard browning on frozen breading and tortillas.'
      },
      {
        title: 'Watch the Cheese Melt Window',
        description: 'Mozzarella sticks blowout if left 60 seconds too long. Pull them the instant you see the first bead of melted cheese appear.'
      },
      {
        title: 'The Wire Rack Rest',
        description: 'Steam escaping from hot snacks condenses on cold plates. Resting on a wire rack keeps bases ultra-crisp.'
      }
    ],
    essentialGear: [
      'Compact Air Fryer',
      'Small Wire Cooling Grid',
      'Silicone Tipped Tongs',
      'Oil Sprayer Bottle'
    ],
    pantryStaples: [
      'Flour Tortillas & Shredded Monterey Jack',
      'Frozen Mozzarella Sticks & Taquitos',
      'Marinara Sauce & Ranch Dressing',
      'Avocado Oil Cooking Spray'
    ],
    failureModes: [
      {
        mistake: 'Leaving mozzarella sticks in the air fryer until cheese explodes into the basket',
        fix: 'Cook at 380°F for exactly 5 to 6 minutes. Pull immediately when you see the first tiny cheese bulge.'
      },
      {
        mistake: 'Quesadilla top tortilla flying up into the heating element',
        fix: 'Weigh down the top tortilla with a lightweight butter knife or silicone utensil during the first 2 minutes.'
      },
      {
        mistake: 'Soggy bottoms on reheated pizza slices',
        fix: 'Air fry pizza directly on the grate at 370°F for 3 to 4 minutes for a crust crisper than day one.'
      }
    ],
    faqs: [
      {
        q: 'What is the absolute best way to reheat pizza?',
        a: 'In an air fryer at 370°F for 3 to 4 minutes. The crust gets blistered and crunchy while the cheese bubbles without drying out.'
      },
      {
        q: 'How do you make frozen fries taste like restaurant fries?',
        a: 'Air fry at 400°F, shake the basket every 4 minutes, and toss in a metal bowl with fine popcorn salt immediately upon pulling.'
      },
      {
        q: 'Can you make a crispy quesadilla in an air fryer?',
        a: 'Yes. Lightly spray the outside of the tortilla with oil, cook at 380°F for 5 minutes, flip, and cook 2 more minutes until golden.'
      }
    ]
  },

  'game-day': {
    category: 'game-day',
    title: 'The Game Day Crowd Feeding Operations Guide',
    tagline: 'Wings, smash burgers, nachos, and sliders built to feed hungry crowds with zero timing stress.',
    overview:
      'Hosting a crowd for game day is a logistics challenge: you need high-volume, high-flavor finger foods that hold up over several quarters without turning soggy, cold, or rubbery. The key is separating active cooking from ambient holding. By utilizing sheet pans for high-surface-area nacho melts, batching air fryer wings with dry baking powder brine, and setting up self-serve slider stations, the host actually gets to watch the game instead of being chained to the kitchen.',
    logisticsProtocol: [
      'Pre-season wings 4 to 24 hours in advance with kosher salt and aluminum-free baking powder for blistered, glass-like skin.',
      'Use half sheet pans for nachos: build a single, wide layer of chips and toppings so every chip gets cheese and meat with zero soggy center.',
      'Batch cook smash burger patties or sliders on an outdoor flat-top griddle or large cast iron pan to serve 8+ people at once.',
      'Keep a low-oven holding station (175°F with a wire rack) to keep finished batches hot and crispy while the next batch cooks.'
    ],
    goldenRules: [
      {
        title: 'The Baking Powder Skin Trick',
        description: 'Tossing wings with 1 tsp baking powder per pound alters skin pH, allowing proteins to break down and blister into deep fryer crunch.'
      },
      {
        title: 'Single-Layer Nacho Geometry',
        description: 'Piles of chips result in burnt tops and soggy bottoms. Spread chips across a full sheet pan so heat reaches every chip evenly.'
      },
      {
        title: 'Sauce Just Before Serving',
        description: 'Toss wings in buffalo sauce or BBQ glaze the moment they hit the platter. Pre-sauced wings turn soggy within 10 minutes.'
      },
      {
        title: 'Self-Serve Assembly Lines',
        description: 'Set out toppings (jalapeños, sour cream, salsa, pickles) in ramekins so guests customize their own food.'
      }
    ],
    essentialGear: [
      'Two Commercial Half Sheet Pans',
      'Cast Iron Griddle / Smash Burger Press',
      'Large Stainless Steel Wing Tossing Bowl',
      'Heavy-Duty Aluminum Foil'
    ],
    pantryStaples: [
      'Frank’s RedHot & Unsalted Butter',
      'Tortilla Chips & Pickled Jalapeños',
      'Hawaiian Sweet Slider Rolls',
      'Aluminum-Free Baking Powder'
    ],
    failureModes: [
      {
        mistake: 'Piling chips 4 layers deep on a nacho platter',
        fix: 'Spread chips across an entire 18x13 sheet pan in one even layer so every bite gets melted cheese.'
      },
      {
        mistake: 'Saucing wings too early before guests arrive',
        fix: 'Keep wings crisp on a warm wire rack and toss in warm sauce right as kickoff starts.'
      },
      {
        mistake: 'Using regular baking powder with aluminum',
        fix: 'Verify your baking powder is aluminum-free (e.g. Rumford) to avoid a bitter, metallic aftertaste on chicken wings.'
      }
    ],
    faqs: [
      {
        q: 'How many chicken wings should I plan per person?',
        a: 'Plan on 1 to 1.25 pounds of party wings per adult (approximately 8-10 wingettes/drumettes) for an appetizer, or 1.75 lbs for a main meal.'
      },
      {
        q: 'What is the best cheese blend for sheet pan nachos?',
        a: 'A 50/50 mix of freshly grated sharp cheddar (for bold flavor) and Monterey Jack or Oaxaca (for ultra-smooth, creamy melt).'
      },
      {
        q: 'How do you keep smash burgers warm for a crowd?',
        a: 'Place cooked patties on sweet slider buns and wrap loosely in foil in a 170°F oven; the trapped steam softens the bun like a diner burger.'
      }
    ]
  },

  'breakfast': {
    category: 'breakfast',
    title: 'The Weekend Breakfast Griddle & Skillet Masterclass',
    tagline: 'Buttermilk pancakes, diner hash, splatter-free bacon, and breakfast tacos.',
    overview:
      'Saturday and Sunday mornings belong to the griddle. Feeding a family breakfast is all about timing management: getting fluffy pancakes, crispy bacon, and eggs to the table at the exact same moment without burning butter or cold plates. By utilizing the oven or air fryer for mess-free, splatter-free bacon, your stovetop remains completely clear for diner-style smash hash browns and golden buttermilk pancakes.',
    logisticsProtocol: [
      'Cook bacon in the oven or air fryer: 400°F on a parchment-lined sheet pan yields flat, perfectly crisp strips with zero stovetop grease splatter.',
      'Squeeze moisture out of shredded potatoes before hash brown cooking: starchy water prevents crisping and causes grey, gummy centers.',
      'Rest pancake batter for 10 minutes: allowing flour to hydrate and baking powder to bloom produces tall, fluffy diner-style pancakes.',
      'Cook eggs last: eggs take 90 to 120 seconds. Never start eggs until bacon and pancakes are resting in a warm holding oven.'
    ],
    goldenRules: [
      {
        title: 'Sheet Pan Bacon Rule',
        description: 'Never fry bacon in a skillet for a family. 1 lb of bacon fits on one sheet pan at 400°F for 18-20 minutes with zero cleanup.'
      },
      {
        title: 'Dry Potatoes for Real Diner Hash',
        description: 'Grate russet potatoes, rinse with cold water, and squeeze dry in a clean kitchen towel until bone dry before hitting hot oil.'
      },
      {
        title: 'Watch for the Pancake Bubbles',
        description: 'Do not flip pancakes when bubbles appear; flip when bubbles burst and leave open craters that do not immediately fill in.'
      },
      {
        title: 'Low Heat for Soft Scrambled Eggs',
        description: 'High heat makes eggs watery and rubbery. Pull soft curds off the heat while they still look slightly wet; residual heat finishes them.'
      }
    ],
    essentialGear: [
      'Two-Burner Cast Iron Griddle / Large Skillet',
      'Sheet Pan with Wire Rack for Bacon',
      'Clean Cotton Kitchen Towel for Potatoes',
      'Wide Pancake Spatula'
    ],
    pantryStaples: [
      'Thick-Cut Applewood Bacon',
      'Buttermilk & Large Eggs',
      'Russet Potatoes & Yellow Onions',
      'Real Grade A Maple Syrup'
    ],
    failureModes: [
      {
        mistake: 'Flipping pancakes too early before bubbles pop',
        fix: 'Wait until edges look matte and set, and center bubbles burst open without closing back up.'
      },
      {
        mistake: 'Putting wet shredded potatoes into the pan',
        fix: 'Twist grated potatoes inside a clean kitchen towel over the sink until every drop of water is expelled.'
      },
      {
        mistake: 'Cooking bacon over smoking hot stovetop heat',
        fix: 'Bake at 400°F on a parchment sheet pan. It cooks flat, evenly, and without grease burns.'
      }
    ],
    faqs: [
      {
        q: 'How do you make restaurant-fluffy pancakes at home?',
        a: 'Use real buttermilk, do not overmix the batter (lumps are good!), and let the batter rest 10 minutes on the counter before pouring onto a 350°F griddle.'
      },
      {
        q: 'Can you freeze extra pancakes and waffles?',
        a: 'Yes. Freeze flat on a baking sheet, then transfer to a freezer bag. Reheat in a standard toaster for fresh-off-the-griddle crunch.'
      },
      {
        q: 'How do you keep breakfast warm while finishing multiple items?',
        a: 'Set your oven to 175°F (Warm setting). Place finished bacon, pancakes, and hash browns on an oven-safe platter while you scramble the eggs.'
      }
    ]
  },

  'weekend': {
    category: 'weekend',
    title: 'The Weekend Project Cook Architecture',
    tagline: 'Low-and-slow smoked ribs, reverse-sear steaks, and braised chuck roasts.',
    overview:
      'When the weeknight sprint ends, cooking transforms from a chore into a relaxing, rewarding craft. Weekend project cooks are built on multi-hour thermal diffusion: tenderizing tough collagen in a smoker, building a deep caramelized bark on a brisket, slow-braising short ribs in a wine reduction, or reverse-searing a 2-inch thick tomahawk ribeye. These cooks cannot be rushed, but they reward patience with showstopping meals that bring family and friends together.',
    logisticsProtocol: [
      'Dry brine thick meats 12 to 24 hours in advance: salt penetrates deeply into 2-inch steaks and roasts, seasoning muscle fibers throughout.',
      'Maintain steady thermal equilibrium: keep smokers at 225°F-250°F and resist opening lids (if you are looking, you are not cooking).',
      'Cook to internal temperature and probe tenderness, not the clock: meat is done when the probe slides in like warm butter, regardless of time.',
      'Factor in generous resting windows: large roasts and briskets require a 1 to 2-hour rest in an insulated cooler to reabsorb rendered juices.'
    ],
    goldenRules: [
      {
        title: 'The Reverse-Sear Mandate',
        description: 'For steaks thicker than 1.5 inches, bring internal temp to 115°F slowly in a 225°F oven/smoker, then sear hard in cast iron for 60 seconds per side.'
      },
      {
        title: 'Bark Formation Physics',
        description: 'Surface bark on smoked meats requires smoke, spices, and fat rendering over hours. Do not wrap meat in foil until bark is firmly set.'
      },
      {
        title: 'Probe Feel Over Clocks',
        description: 'Every piece of meat has different collagen density. Trust thermometer probe resistance (feels like peanut butter) over arbitrary time estimates.'
      },
      {
        title: 'The Faux-Cambro Resting Technique',
        description: 'Wrap finished pork butts or briskets in peach butcher paper and towels, then place inside a dry camping cooler for 2 hours before slicing.'
      }
    ],
    essentialGear: [
      'Heavy Cast Iron Dutch Oven (6-7 qt)',
      'Dual-Probe Remote Wireless Thermometer',
      'Peach Butcher Paper Roll',
      'Insulated Cooler for Meat Resting'
    ],
    pantryStaples: [
      'Diamond Crystal Kosher Salt & 16-Mesh Black Pepper',
      'Dry Red Wine (Cabernet or Pinot Noir for Braising)',
      'Beef Bone Broth & Fresh Thyme / Rosemary',
      'Hardwood Pellets / Wood Chunks (Hickory, Oak, Apple)'
    ],
    failureModes: [
      {
        mistake: 'Panicking during the smoking "stall" at 160°F and turning up heat',
        fix: 'The stall is evaporative cooling. Be patient, or wrap in peach butcher paper to push through the plateau smoothly.'
      },
      {
        mistake: 'Searing thick steaks in a hot pan from cold raw state',
        fix: 'Direct searing creates a grey overcooked band with a raw cold center. Always reverse-sear thick steaks.'
      },
      {
        mistake: 'Slicing brisket or pork shoulder immediately after pulling',
        fix: 'Rest at least 1 hour wrapped in a cooler so the boiling juices settle and re-incorporate into the meat.'
      }
    ],
    faqs: [
      {
        q: 'What is the easiest weekend smoker recipe for beginners?',
        a: 'Smoked pork butt (pulled pork). Its high intramuscular fat content makes it virtually impossible to dry out or ruin, even with minor smoker temperature fluctuations.'
      },
      {
        q: 'Why use butcher paper instead of aluminum foil for smoking ribs and brisket?',
        a: 'Peach butcher paper is breathable. It allows excess steam to escape, preserving your crispy smoked bark, whereas foil steams the meat and softens the exterior.'
      },
      {
        q: 'How do you know when braised pot roast is actually done?',
        a: 'When a dinner fork inserted into the center twists and separates the beef fibers with zero resistance. If it feels tight, continue braising for another 30-45 minutes.'
      }
    ]
  }
};

export function getCategoryGuide(category: Category): CategoryGuide | undefined {
  return CATEGORY_GUIDES[category];
}
