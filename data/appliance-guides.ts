import { Appliance } from '@/lib/types';

export interface ApplianceGuide {
  appliance: Appliance;
  title: string;
  tagline: string;
  thermalPhysics: string;
  preheatProtocol: string;
  careAndCleaning: string;
  fiveMistakes: {
    mistake: string;
    physicsWhy: string;
    fix: string;
  }[];
  faqs: {
    q: string;
    a: string;
  }[];
}

export const APPLIANCE_GUIDES: Record<Appliance, ApplianceGuide> = {
  'air-fryer': {
    appliance: 'air-fryer',
    title: 'Air Fryer Operating & Convection Dynamics Guide',
    tagline: 'High-velocity convection in a compact chamber: 360° crispiness in 40% less time.',
    thermalPhysics:
      'An air fryer is not a fryer; it is an ultra-compact convection oven equipped with an overhead heating element and a high-RPM convection fan. In a conventional oven, stagnant cool air creates an insulating boundary layer around food that slows heat transfer. The air fryer fan generates extreme airflow velocities that continuously strip this boundary layer away, rapidly evaporating surface moisture. This creates immediate evaporative drying, allowing surface starches and proteins to enter the Maillard reaction zone (300°F–330°F) in minutes without submerging food in pools of oil.',
    preheatProtocol:
      'Always preheat for 3 minutes at your target cooking temperature. While small chambers heat rapidly, starting in a cold basket causes high-fat proteins to render slowly and soak into breading before frying begins. A preheated basket instantly sears food on contact, preventing sticking and maximizing initial crisping.',
    careAndCleaning:
      'Never soak a non-stick air fryer basket in cold water while hot; thermal shock causes Teflon and ceramic coatings to warp and peel. Allow the basket to cool to room temperature, wipe out excess grease with a dry paper towel, then wash using a soft microfiber sponge with warm soapy water. Never use aerosol cooking sprays with soy lecithin or chemical propellants, which polymerize onto the basket and form an irreversible sticky gummy residue. Use an aerosol-free pump sprayer with pure avocado or canola oil.',
    fiveMistakes: [
      {
        mistake: 'Overcrowding the basket with food piled two layers deep',
        physicsWhy: 'High-velocity convection requires unobstructed 360° airflow. Stacking food traps steam in the micro-gaps, causing soggy, rubbery textures.',
        fix: 'Arrange food in a single layer with at least 1/4-inch space between pieces. Cook in two quick batches if feeding 4+ people.'
      },
      {
        mistake: 'Using aerosol non-stick cooking spray (Pam)',
        physicsWhy: 'Propellants and lecithin emulsifiers degrade non-stick surfaces at temperatures above 350°F, creating a sticky permanent film.',
        fix: 'Buy a refillable oil mister and fill with 100% pure avocado or light olive oil.'
      },
      {
        mistake: 'Forgetting the halfway basket shake or flip',
        physicsWhy: 'Heat radiates downwards from the top heating coil. Even with convection air, the top receives 25% higher radiant intensity than the bottom.',
        fix: 'Always flip proteins or shake vegetable baskets at the exact halfway mark.'
      },
      {
        mistake: 'Putting lightweight food (tortillas, bread) in without weighing it down',
        physicsWhy: 'The violent updraft fan can suck lightweight foods into the red-hot heating element, creating smoke and burning.',
        fix: 'Weigh down loose foods with a stainless butter knife, spoon, or wire trivet during the first 2 minutes.'
      },
      {
        mistake: 'Cooking greasy fatty foods (bacon, burgers) without water in the drawer',
        physicsWhy: 'Rendered animal fat dripping onto the hot bottom drawer vaporizes and burns, filling the kitchen with acrid white smoke.',
        fix: 'Add 2 tablespoons of water or a slice of bread to the bottom drip pan below the crisper plate to catch grease without smoking.'
      }
    ],
    faqs: [
      {
        q: 'Can you put aluminum foil or parchment paper in an air fryer?',
        a: 'Yes, but only perforated air fryer liners, and NEVER add paper or foil during preheat without food weighing it down, or it will fly into the heating element and catch fire.'
      },
      {
        q: 'How do you convert conventional oven recipes to the air fryer?',
        a: 'Apply the 25/20 Rule: Reduce the oven temperature by 25°F (15°C) and reduce the cooking time by 20% to 25%. Always check doneness early.'
      },
      {
        q: 'Why did my chicken wings turn out dry instead of crispy?',
        a: 'The wings were either overcooked past 185°F without sufficient fat, or were not patted dry with paper towels prior to cooking. Moisture prevents crisping.'
      }
    ]
  },

  'oven': {
    appliance: 'oven',
    title: 'Standard Home Oven Thermal & Baking Guide',
    tagline: 'Uniform ambient radiation and high-volume multi-rack roasting.',
    thermalPhysics:
      'A residential oven heats via dual radiant elements (bottom bake element and top broil element) that heat the chamber walls and surrounding air. Unlike forced-air convection, natural oven airflow is gentle, relying on thermal buoyancy. This makes standard ovens ideal for high-volume family cooking, deep casseroles, and gentle roasts where aggressive surface drying would cause foods to dry out before interior heat penetrates. Because radiant elements cycle on and off to maintain a set temperature, oven chambers experience a ±15°F to 25°F temperature swing during normal operation.',
    preheatProtocol:
      'Allow at least 15 to 20 minutes of preheating. Most oven beepers sound when the air sensor hits temperature, but the heavy interior metal walls are still cold. Opening the door before the walls are fully saturated causes a catastrophic 50°F to 75°F temperature drop that takes 10 minutes to recover. Use an independent oven thermometer hung from the center rack.',
    careAndCleaning:
      'Avoid commercial caustic oven cleaners that leave chemical residues. Use baking soda and water paste on burnt spots. Place an aluminum rimmed sheet pan on the lowest rack to catch drips rather than lining the oven floor directly, which can block airflow and damage heating elements.',
    fiveMistakes: [
      {
        mistake: 'Trusting the built-in oven thermostat beeper',
        physicsWhy: 'Built-in sensors measure ambient air near the wall, which reaches temperature 10 minutes before the structural steel walls do.',
        fix: 'Hang a $7 analog oven thermometer in the center of the rack and wait until the dial stabilizes at your target temperature.'
      },
      {
        mistake: 'Opening the oven door repeatedly to inspect food',
        physicsWhy: 'Every time you open the door, 25°F to 50°F of heat escapes into the kitchen within 5 seconds, extending cook times by 10-15%.',
        fix: 'Turn on the internal oven light and look through the glass window instead.'
      },
      {
        mistake: 'Using dark, black non-stick baking pans instead of aluminum',
        physicsWhy: 'Dark pans absorb radiant heat aggressively, burning the bottom of cookies, breads, and sheet pan meals before tops are cooked.',
        fix: 'Use natural 18-gauge commercial aluminum sheet pans for even, golden browning.'
      },
      {
        mistake: 'Baking on the wrong rack level',
        physicsWhy: 'The top rack receives intense radiant heat reflected off the ceiling; the bottom rack receives harsh direct heat from the bake element.',
        fix: 'Keep your primary rack in the exact vertical center of the oven for 90% of roasting and baking tasks.'
      },
      {
        mistake: 'Overloading multiple crowded racks without rotating',
        physicsWhy: 'Lower pans shield upper pans from radiant heat, creating uneven cooking and soggy bottoms on the upper tray.',
        fix: 'Stagger pans diagonally across racks and rotate trays front-to-back halfway through cooking.'
      }
    ],
    faqs: [
      {
        q: 'Why do my baked goods burn on the bottom?',
        a: 'You are likely using dark non-stick bakeware or the rack is positioned too close to the bottom heating element. Switch to aluminum pans and move to the center rack.'
      },
      {
        q: 'What is the difference between Bake and Broil?',
        a: 'Bake heats primarily from the bottom element to create ambient convection. Broil engages only the top element at maximum wattage (500°F+ direct infrared radiation) to rapidly brown surfaces like an upside-down grill.'
      },
      {
        q: 'Do I need convection mode if my oven has it?',
        a: 'Convection is great for roasting meats, chicken wings, and vegetables because the circulating fan accelerates browning. Avoid convection for cakes and souffles where moving air causes batter to drift and crack.'
      }
    ]
  },

  'instant-pot': {
    appliance: 'instant-pot',
    title: 'Electric Pressure Cooker Engineering Guide',
    tagline: 'Saturated steam pressure at 10-12 PSI: ultra-fast braising and collagen breakdown.',
    thermalPhysics:
      'In an open vessel, boiling water cannot exceed 212°F (100°C) at sea level because excess energy escapes as steam. Inside an Instant Pot, the sealed lid traps expanding steam, building 10.15 to 11.6 PSI of internal pressure. Under pressure, the boiling point of water rises to 239°F–244°F (115°C–118°C). This 27°F increase accelerates the chemical breakdown of tough collagen into rich gelatin by up to 70%, allowing 3-hour pot roasts and dried beans to cook to fork-tender perfection in under 60 minutes while keeping 100% of moisture inside.',
    preheatProtocol:
      'The Instant Pot requires liquid to create steam pressure (1 cup minimum for 6-quart models; 1.5 cups for 8-quart models). Always deglaze the stainless steel inner pot with a splash of liquid after using the Sauté function to scrape up every bit of browned fond. Stuck food on the base will trigger the overheat "BURN" warning and prevent pressurization.',
    careAndCleaning:
      'The silicone sealing ring absorbs food aromas over time. Wash the ring in the top rack of the dishwasher, or steam with 1 cup of water and 1 cup of white vinegar on High Pressure for 3 minutes to deodorize. Inspect the anti-block shield and float valve for food particles after cooking thick or starchy foods like beans and oatmeal.',
    fiveMistakes: [
      {
        mistake: 'Forgetting to deglaze fond after the Sauté function',
        physicsWhy: 'Caramelized food stuck to the bottom blocks heat transfer to the thermal sensor, causing local overheating that triggers the "BURN" safety lockout.',
        fix: 'Pour in 1/2 cup of broth or water and vigorously scrape the bottom with a flat wooden spoon until spotless before pressure cooking.'
      },
      {
        mistake: 'Using Quick Release on large roasts or bone-in meats',
        physicsWhy: 'Sudden pressure release causes boiling liquids inside the meat fibers to violently expand and vaporize, boiling off internal juices and leaving meat stringy and dry.',
        fix: 'Always use a 10 to 15-minute Natural Release (NR) for meats so internal juices settle before opening.'
      },
      {
        mistake: 'Thickening sauces with cornstarch or flour before pressure cooking',
        physicsWhy: 'Starches sink to the bottom and scorch against the heating element before pressure can build, triggering the burn sensor.',
        fix: 'Pressure cook with thin liquid, then switch to Sauté after opening to stir in cornstarch slurries or cream.'
      },
      {
        mistake: 'Filling the pot past the max fill line with expanding foods',
        physicsWhy: 'Beans, grains, and rice expand and produce foam that can clog the pressure release valve and safety float.',
        fix: 'Never fill past the 1/2 line for beans, rice, and grains; never fill past the 2/3 line for all other foods.'
      },
      {
        mistake: 'Counting only pressure cooking time and forgetting pressure build-up',
        physicsWhy: 'The heating element takes 10 to 15 minutes to boil liquid and build pressure before the countdown timer begins.',
        fix: 'Add 15 minutes for pressurization and 10-15 minutes for natural release to your total dinner planning timeline.'
      }
    ],
    faqs: [
      {
        q: 'What is the difference between Natural Release and Quick Release?',
        a: 'Natural Release lets the pot cool down gradually on its own until pressure drops (10-25 mins), preserving meat moisture. Quick Release turns the steam valve open manually, venting pressure in 2 minutes (best for delicate veggies, eggs, and pasta).'
      },
      {
        q: 'Can I put frozen chicken breast directly into the Instant Pot?',
        a: 'Yes. Add 1 cup of broth, arrange frozen breasts flat, and cook on High Pressure for 10-12 minutes with a 5-minute natural release. They thaw and cook safely under steam.'
      },
      {
        q: 'Why did my Instant Pot say "BURN"?',
        a: 'Food or starch scorched onto the bottom of the inner pot, blocking heat flow to the sensor. Vent steam, scrape the bottom clean with a wooden spatula, add 1/2 cup thin liquid, and restart.'
      }
    ]
  },

  'skillet': {
    appliance: 'skillet',
    title: '12-Inch Stovetop Skillet Mastery Guide',
    tagline: 'High-speed conductive searing, rapid reductions, and weeknight sauté.',
    thermalPhysics:
      'A 12-inch skillet provides direct conductive heat transfer from burner to cooking fat to food. Unlike enclosed ovens, the open geometry allows continuous moisture evaporation. This makes skillets the premier tool for recipes requiring fond development and deglazing: as protein juices brown on the hot surface, water vaporizes into the room while concentrated amino acids and sugars stick to the metal as savory fond, creating the foundation for world-class pan sauces in under 2 minutes.',
    preheatProtocol:
      'Preheat your skillet dry over medium heat for 2 to 3 minutes. Add cooking fat only once the pan is hot. You know an un-coated pan is ready when a droplet of water dances into a bead across the surface (the Leidenfrost effect, around 380°F). Adding oil to a preheated pan seals micro-crevices in the metal and prevents proteins from sticking.',
    careAndCleaning:
      'For stainless steel skillets, deglaze immediately after cooking while the pan is still warm with warm water and soap; burnt spots dissolve with Bar Keepers Friend (oxalic acid). For non-stick skillets, never use metal utensils, avoid high heat above 450°F which degrades PTFE coatings, and hand-wash with a soft sponge.',
    fiveMistakes: [
      {
        mistake: 'Crowding the pan with too much meat at once',
        physicsWhy: 'Too much cold food causes the pan temperature to drop below boiling; moisture pooling in the pan steams the meat instead of searing.',
        fix: 'Leave at least 1/2 inch of space between pieces. Cook in two sequential batches for a deep mahogany crust.'
      },
      {
        mistake: 'Adding cooking oil to a cold pan',
        physicsWhy: 'Cold oil breaks down and polymerizes as it heats slowly with the pan, losing lubricity and causing food to bond to the metal.',
        fix: 'Heat the dry pan first until warm, add oil, swirl to coat, and wait 30 seconds until the oil shimmers before adding food.'
      },
      {
        mistake: 'Flipping meat prematurely before it naturally releases',
        physicsWhy: 'Proteins bond to hot metal during initial cooking. As the crust forms and dehydrates, it contracts and releases itself naturally.',
        fix: 'If the meat resists your spatula, leave it alone for another 60 to 90 seconds until it lifts freely.'
      },
      {
        mistake: 'Using high heat with extra virgin olive oil or butter from the start',
        physicsWhy: 'Butter solids burn at 350°F and extra virgin olive oil smokes at 375°F, imparting an acrid, bitter flavor.',
        fix: 'Sear with high-smoke-point avocado or canola oil (450°F+), then add butter during the final 60 seconds for basting.'
      },
      {
        mistake: 'Dumping pan juices and fond down the sink drain',
        physicsWhy: 'The caramelized browned proteins stuck to the bottom of the skillet (fond) represent concentrated glutamates and umami created by the Maillard reaction.',
        fix: 'That brown residue is pure flavor. Pour in 1/2 cup of broth, wine, or water, scrape the pan, and swirl with butter for an instant sauce.'
      }
    ],
    faqs: [
      {
        q: 'How do I prevent eggs and fish from sticking to stainless steel?',
        a: 'Ensure the pan is properly preheated using the water droplet test, add oil until it shimmers, and ensure fish fillets are patted completely dry with paper towels.'
      },
      {
        q: 'What size skillet does every family kitchen need?',
        a: 'A 12-inch skillet is the universal standard. It provides 113 square inches of cooking area, enough to brown 1.5 lbs of ground meat or 4 chicken thighs without crowding.'
      },
      {
        q: 'When should I use a non-stick skillet versus stainless steel?',
        a: 'Use non-stick exclusively for delicate egg dishes, crepes, and fragile fish. Use stainless steel or cast iron for everything else to build fond for pan sauces.'
      }
    ]
  },

  'sheet-pan': {
    appliance: 'sheet-pan',
    title: 'Sheet Pan Roasting & Multi-Portion Logistics',
    tagline: 'Feed the whole house on one 18x13 pan with 2-minute cleanup.',
    thermalPhysics:
      'Sheet pan roasting relies on the combination of a low 1-inch rim and a wide 234-square-inch surface area. Unlike high-walled roasting pans that trap steam and condense moisture back onto food, the low rim permits radiant heat and ambient air to circulate directly over ingredient surfaces, driving rapid moisture evaporation. Using heavy 18-gauge commercial aluminum ensures fast, uniform conductive heat transfer from the pan bottom, producing caramelized undersides while radiant oven air roasts the tops.',
    preheatProtocol:
      'For maximum crispness on potatoes, vegetables, and chicken skin, preheat the empty sheet pan inside a 425°F oven for 10 minutes. When tossed ingredients land on the sizzling preheated pan, bottom searing starts instantly, shaving 5 minutes off cook time.',
    careAndCleaning:
      'Line sheet pans with unbleached parchment paper for effortless cleanup. Never put aluminum sheet pans in the dishwasher; harsh alkaline dishwasher detergents oxidize and darken the aluminum surface. Wash with warm water, soap, and a non-abrasive scrubber.',
    fiveMistakes: [
      {
        mistake: 'Using flimsy non-stick cookie sheets without rims',
        physicsWhy: 'Thin stamped steel warps under high heat, slinging hot oil into the oven, and lacks rims to contain rendering fat.',
        fix: 'Use commercial 18-gauge aluminum half sheet pans (18x13 inches) with wire-reinforced rolled rims.'
      },
      {
        mistake: 'Putting all ingredients in at the exact same time',
        physicsWhy: 'Root vegetables require 30 minutes to soften; delicate proteins and green vegetables overcook and turn to mush in 15 minutes.',
        fix: 'Stagger cooking times: roast potatoes for 15 minutes first, then add chicken, sausages, or broccoli for the remainder.'
      },
      {
        mistake: 'Piling ingredients into a mound in the center',
        physicsWhy: 'Overcrowding traps water vapor, dropping local temperatures and steaming ingredients rather than roasting them.',
        fix: 'Spread ingredients in a single flat layer with space between each item. Use two pans if cooking for more than 4 people.'
      },
      {
        mistake: 'Using too much oil on roasted vegetables',
        physicsWhy: 'Excess oil forms an insulating grease bath that turns vegetables soggy instead of crisp.',
        fix: 'Use 1 to 1.5 tablespoons of oil per sheet pan; toss vigorously in a large bowl so every surface is lightly coated.'
      },
      {
        mistake: 'Cutting vegetables into wildly different sizes',
        physicsWhy: 'Small pieces burn while large chunks remain raw in the center.',
        fix: 'Cut root vegetables and proteins into uniform 1-inch dimensions for consistent cooking.'
      }
    ],
    faqs: [
      {
        q: 'What is the difference between parchment paper and wax paper?',
        a: 'Parchment paper is silicone-coated and oven-safe up to 450°F. Wax paper is paraffin-coated and will melt and catch fire in a hot oven. Never put wax paper in the oven.'
      },
      {
        q: 'Can I put two sheet pans in the oven at the same time?',
        a: 'Yes, place one on the upper-middle rack and one on the lower-middle rack, staggered. Swap rack positions and rotate pans front-to-back halfway through cooking.'
      },
      {
        q: 'How do you get roasted broccoli crispy on a sheet pan?',
        a: 'Wash and thoroughly dry the florets, toss with 1 tbsp olive oil and salt, and roast at 425°F for 18-20 minutes until the tips are dark golden and crisp.'
      }
    ]
  },

  'cast-iron': {
    appliance: 'cast-iron',
    title: 'Cast Iron Thermal Mass & Searing Science',
    tagline: 'Extreme heat retention for lacy smash burgers, crusty steaks, and blackened fish.',
    thermalPhysics:
      'Cast iron has poor thermal conductivity compared to aluminum or copper, but it has massive volumetric heat capacity (density). A 5-pound 12-inch cast iron skillet holds immense stored thermal energy. When a thick, cold 1-pound steak hits a hot cast iron pan, the pan temperature barely drops. This immediate, sustained 450°F+ contact temperature instantly vaporizes surface moisture and drives aggressive Maillard browning, creating a deep, crunchy caramelized crust that thin pans cannot replicate.',
    preheatProtocol:
      'Cast iron heats slowly and unevenly on modern burners. Preheat your skillet over medium-low heat for a full 5 to 7 minutes, rotating the pan occasionally. Allow the heat to diffuse from the center out to the thick perimeter walls before turning up to high heat. When properly preheated, the entire pan radiates intense, even heat.',
    careAndCleaning:
      'The myth that soap ruins cast iron comes from the era of harsh lye-based soaps. Modern mild dish soap will not strip polymerized oil seasoning. Wash with warm water, mild soap, and a chainmail scrubber or stiff brush. Dry immediately on a warm stovetop burner for 2 minutes to eliminate moisture, then rub with 3 drops of neutral oil (canola, grapeseed) while warm to protect from rust.',
    fiveMistakes: [
      {
        mistake: 'Putting food into a cast iron pan that was heated for only 60 seconds',
        physicsWhy: 'Because cast iron conducts heat slowly, a quick preheat creates an intense hot spot over the flame while the edges remain cold.',
        fix: 'Preheat over medium-low heat for 5 full minutes so thermal energy saturates the entire heavy iron casting.'
      },
      {
        mistake: 'Letting cast iron air-dry in the dish drying rack',
        physicsWhy: 'Bare iron oxidizes rapidly in the presence of water and oxygen, forming red surface rust within hours.',
        fix: 'Dry with a towel, set on a warm stovetop burner for 2 minutes to evaporate all moisture, and rub with a drop of oil.'
      },
      {
        mistake: 'Simmering acidic tomato sauces for hours in young cast iron',
        physicsWhy: 'High acidity dissolves thin seasoning layers and leaches metallic iron flavor into your sauce.',
        fix: 'Use enameled cast iron (Dutch oven) or stainless steel for long-simmered tomato sauces; use raw cast iron once seasoning is deeply established.'
      },
      {
        mistake: 'Trying to flip smash burgers with a flimsy plastic spatula',
        physicsWhy: 'Smash burgers bond to hot iron to create a crispy lace edge; you need a sharp, rigid steel edge to scrape the crust free without tearing.',
        fix: 'Use a heavy-duty, bevel-edged stainless steel grill scraper or stiff metal spatula.'
      },
      {
        mistake: 'Slathering thick coats of oil to "season" the pan',
        physicsWhy: 'Excess oil does not polymerize cleanly; it turns into a sticky, gummy, rancid brown sludge that flakes off into food.',
        fix: 'Apply oil and then wipe it all off with a clean paper towel as if you made a mistake. Only a microscopic oil film should remain.'
      }
    ],
    faqs: [
      {
        q: 'Does cooking in cast iron really add dietary iron to food?',
        a: 'Yes, especially when cooking slightly acidic or moist foods. Research shows measurable, bioavailable iron transfer into food cooked in well-maintained cast iron.'
      },
      {
        q: 'How do I fix a rusty cast iron pan?',
        a: 'Scrub the rust away using steel wool and warm soapy water, rinse, dry thoroughly on a burner, and apply 2-3 cycles of oven seasoning at 450°F with grapeseed oil.'
      },
      {
        q: 'What is seasoning on cast iron?',
        a: 'Seasoning is not grease. It is a hard, slick polymer formed when unsaturated fatty acids cross-link and bond molecularly to the iron under high heat.'
      }
    ]
  },

  'grill': {
    appliance: 'grill',
    title: 'Outdoor Grilling & Direct Flame Physics',
    tagline: 'Direct infrared radiation and smoke vaporization for burgers, steaks, and charred vegetables.',
    thermalPhysics:
      'Grilling combines direct infrared radiation from burning gas flames or glowing charcoal (radiating at 600°F–1000°F) with conductive contact from heavy cast iron or stainless steel grates. Flavor in grilling is driven by the vaporization of drippings: as fats and marinades drip onto hot flavorizer bars or coals, they instantly vaporize into aromatic aerosolized compounds that rise and coat the meat, producing authentic smoky barbecue flavor that indoor kitchens cannot match.',
    preheatProtocol:
      'Ignite all burners on High (or light a full chimney of charcoal) and close the lid for 10 to 15 minutes. High heat carbonizes old food debris on the grates. Scrape clean with a wire-free wooden or brass grill scraper, then wipe grates with an oiled paper towel using tongs just before laying down food to create a lubricated, non-stick surface.',
    careAndCleaning:
      'Clean grates while smoking hot immediately after preheating and immediately after cooking. Empty the grease management tray every 3 cooks to prevent grease fires. Store outdoor grills with a waterproof, breathable cover to prevent burner rust.',
    fiveMistakes: [
      {
        mistake: 'Cooking over a single uniform heat level with no cool safety zone',
        physicsWhy: 'Fat drippings cause flare-ups that char the outside of food while leaving the inside raw if you have nowhere to move the food.',
        fix: 'Always set up a Two-Zone Fire: high heat on one side for searing; low/off on the other side for gentle indirect cooking.'
      },
      {
        mistake: 'Pressing down on burgers and chicken breasts with a spatula',
        physicsWhy: 'Pressing forces flavorful meat juices out into the fire, fueling grease flare-ups and drying out your meat.',
        fix: 'Never press grilled meats. Let them cook undisturbed until ready to flip.'
      },
      {
        mistake: 'Lifting the grill lid every 60 seconds',
        physicsWhy: 'Opening the lid vents convective heat into the atmosphere and feeds excess oxygen to flare-ups.',
        fix: 'Keep the lid down. If you are lookin\', you ain\'t cookin\'.'
      },
      {
        mistake: 'Applying sugary barbecue sauces at the beginning of the cook',
        physicsWhy: 'Sugar in barbecue sauce burns and blackens into bitter carbon at temperatures above 325°F within 3 minutes.',
        fix: 'Brush BBQ sauce on during the final 3 to 5 minutes of cooking, just long enough to glaze and caramelize without burning.'
      },
      {
        mistake: 'Using wire bristle brushes that shed dangerous metal needles into food',
        physicsWhy: 'Thin steel wire bristles break off due to metal fatigue from repeated scrubbing against rough cast iron or stainless steel grates, adhering to meat surfaces and posing severe gastrointestinal puncture hazards.',
        fix: 'Switch to a wire-free cedar scraper, pumice grill stone, or twisted coil scrubber for safe grate cleaning.'
      }
    ],
    faqs: [
      {
        q: 'What is two-zone grilling and why is it essential?',
        a: 'Two-zone grilling means lighting burners on one half of the grill while leaving the other half off. Sear meat over the direct flame, then move it to the indirect side to finish cooking gently without burning.'
      },
      {
        q: 'How do you stop chicken skin from sticking to grill grates?',
        a: 'Make sure grates are smoking hot and scraped clean, brush the chicken skin with oil, and do not try to move the chicken until it naturally releases (usually 5-6 mins).'
      },
      {
        q: 'Gas vs Charcoal: which is better?',
        a: 'Gas offers convenience, precise temperature control, and 5-minute preheats for weeknight dinners. Charcoal produces higher infrared heat and richer wood-smoke flavor for weekend cooks.'
      }
    ]
  },

  'dutch-oven': {
    appliance: 'dutch-oven',
    title: 'Enameled Dutch Oven Braising & Baking Guide',
    tagline: 'Massive thermal mass and steam-trapping lids for artisan bread and slow braises.',
    thermalPhysics:
      'A heavy enameled cast iron Dutch oven is a self-contained thermal micro-climate. The thick cast iron walls absorb and emit uniform infrared radiation from all sides, preventing hot spots that cause sauces to scorch on the bottom. The heavy, tight-fitting lid prevents moisture loss, trapping evaporating steam inside. Condensation beads on the lid underside and rains back down over the meat (continuous self-basting), keeping connective tissues lubricated as collagen melts into rich gelatin over hours of braising.',
    preheatProtocol:
      'Never heat an empty enameled Dutch oven dry over high heat; the enamel glass coating expands at a different rate than the underlying iron and will crack or craze. Always heat with a tablespoon of cooking oil over low to medium heat for 3 to 4 minutes before searing.',
    careAndCleaning:
      'Never use metal utensils that can scratch the smooth enamel glass interior; use wooden spoons or heat-safe silicone spatulas. To remove stubborn browned spots after a long braise, boil 2 cups of water with 2 tablespoons of baking soda for 5 minutes; residue wipes away with a sponge.',
    fiveMistakes: [
      {
        mistake: 'Submerging meat completely in liquid during a braise',
        physicsWhy: 'Completely covering meat in water or broth boils it rather than braising, washing out flavor into the broth.',
        fix: 'Liquid should come only 1/3 to 1/2 of the way up the side of the meat; the exposed top browns in radiant heat while the bottom braises.'
      },
      {
        mistake: 'Braising on the stovetop instead of inside the oven',
        physicsWhy: 'Stovetop burners direct 100% of heat to the bottom of the pot, requiring constant stirring to prevent scorching.',
        fix: 'Transfer the covered Dutch oven into a 300°F–325°F oven. 360° radiant oven heat cooks evenly with zero bottom scorching.'
      },
      {
        mistake: 'Skipping the initial meat sear before adding liquids',
        physicsWhy: 'Once liquid is added, temperatures can never exceed 212°F, preventing Maillard browning.',
        fix: 'Sear meat in batches over medium-high heat until deeply browned on all sides before adding aromatics and liquid.'
      },
      {
        mistake: 'Using metal scrubbers or bleach on stained enamel',
        physicsWhy: 'Harsh abrasives etch micro-scratches into the vitreous enamel, making it dull and prone to future sticking.',
        fix: 'Clean with baking soda paste or Bar Keepers Friend Cookware Cleanser.'
      },
      {
        mistake: 'Boiling a braise too violently over high heat',
        physicsWhy: 'Violent boiling toughens muscle fibers and squeezes out moisture before collagen can dissolve.',
        fix: 'Maintain a gentle, lazy simmer with small, occasional bubbles (around 195°F–205°F).'
      }
    ],
    faqs: [
      {
        q: 'Why does bread bake better in a Dutch oven?',
        a: 'The preheated Dutch oven traps moisture released by the dough, creating a localized steam room. Steam delays crust formation, allowing the bread to expand fully (maximum oven spring) with a thin, blistered, shatteringly crisp crust.'
      },
      {
        q: 'What size Dutch oven is best for a family?',
        a: 'A 5.5 to 6-quart round Dutch oven is the universal gold standard. It fits a 4-lb whole chicken, a 4-lb chuck roast, or a standard round sourdough loaf with room to spare.'
      },
      {
        q: 'Can a Dutch oven go in the oven at 450°F or 500°F?',
        a: 'Yes, the cast iron and enamel can handle 500°F+. However, verify that the lid knob is stainless steel. If it has a black composite/phenolic knob, replace it with a metal knob for bread baking above 375°F.'
      }
    ]
  },

  'slow-cooker': {
    appliance: 'slow-cooker',
    title: 'Slow Cooker Chemistry & Low-Heat Thermodynamics',
    tagline: 'Effortless all-day braises: tender pulled meats with zero active monitoring.',
    thermalPhysics:
      'A slow cooker uses low-wattage electrical resistance elements wrapped around the sides of a heavy ceramic stoneware crock. The low, gradual heat rises through the crock walls and heats food via slow thermal conduction. Because the glass lid condensation seal prevents steam loss, zero moisture evaporates. Low settings hold food around 190°F–200°F; High settings hold food near a gentle simmer (205°F–210°F). This gentle, continuous heat slowly converts tough collagen fibers into gelatin over 6 to 8 hours without requiring stove monitoring.',
    preheatProtocol:
      'Slow cookers do not require preheating. For optimal flavor, sear proteins in a separate skillet on the stovetop first to create Maillard fond before transferring to the crock. If using root vegetables, layer them along the bottom and sides where heat transfer is highest.',
    careAndCleaning:
      'Allow the ceramic insert to cool completely before washing; cold water on a hot ceramic crock causes thermal shock and catastrophic cracking. Soak in warm soapy water to lift dried sauce rings. Never immerse the electrical metal heating base in water.',
    fiveMistakes: [
      {
        mistake: 'Adding too much liquid to the slow cooker',
        physicsWhy: 'Unlike stovetop braising, slow cookers produce zero evaporation. Meat and vegetables release 1 to 2 cups of natural juices as they cook.',
        fix: 'Cut liquid in standard recipes by 30% to 50%. A half-cup of liquid is plenty for a 4-lb roast.'
      },
      {
        mistake: 'Opening the lid repeatedly to check on dinner',
        physicsWhy: 'Slow cookers operate on low wattage (150-250W). Lifting the lid releases accumulated steam heat, dropping the crock temperature by 15°F and adding 20 minutes to cook time.',
        fix: 'Keep the lid securely closed until the final 30 minutes of the cook cycle.'
      },
      {
        mistake: 'Adding fresh dairy (milk, cream, sour cream) at the beginning of an 8-hour cook',
        physicsWhy: 'Prolonged low heat breaks dairy emulsions, causing milk proteins to curdle and separate into watery liquid and grain.',
        fix: 'Stir in cream, sour cream, or cream cheese during the final 15 minutes of cooking on the Warm setting.'
      },
      {
        mistake: 'Putting frozen whole roasts or frozen chicken breasts directly into a slow cooker',
        physicsWhy: 'Slow cookers take hours to bring large cold masses up to temperature, keeping meat in the bacterial danger zone (40°F–140°F) for hours.',
        fix: 'Always thaw meats in the refrigerator before adding to a slow cooker.'
      },
      {
        mistake: 'Using lean cuts like chicken breast or pork tenderloin for 8-hour cooks',
        physicsWhy: 'Lean cuts have no collagen or intramuscular fat; 8 hours of slow cooking leaves them stringy, dry, and chalky.',
        fix: 'Use collagen-rich, well-marbled cuts: chicken thighs, pork shoulder, and beef chuck roast.'
      }
    ],
    faqs: [
      {
        q: 'What is the difference between Low and High settings?',
        a: 'Both Low and High settings reach the same final temperature (approx. 209°F). The difference is the time it takes to get there: High reaches boiling in about 3-4 hours; Low reaches it in 7-8 hours.'
      },
      {
        q: 'Do I really need to sear meat before putting it in the slow cooker?',
        a: 'You can skip it for convenience, but searing in a hot pan first adds immense savory flavor via the Maillard reaction that a slow cooker cannot produce on its own.'
      },
      {
        q: 'How do you thicken watery sauce in a slow cooker?',
        a: 'Remove the lid, switch to High for 30 minutes to evaporate liquid, or stir in a slurry of 1 tbsp cornstarch and 1 tbsp cold water during the final 15 minutes.'
      }
    ]
  },

  'smoker': {
    appliance: 'smoker',
    title: 'Smoker & Outdoor Wood-Fired Barbecue Guide',
    tagline: 'Low-and-slow convection (225°F-275°F) with hardwood vapor diffusion for deep smoke rings and bark.',
    thermalPhysics:
      'Smokers (pellet grills, offset stick burners, drum smokers) operate via indirect convective airflow at 225°F–275°F fueled by clean-burning hardwoods (hickory, oak, apple). Smoked barbecue flavor comes from nitrogen dioxide (NO) and carbon monoxide (CO) in wood smoke dissolving into moist surface meat proteins, forming a chemical bond with myoglobin that preserves the iconic pink "smoke ring". Meanwhile, smoke particles, rendered fat, and dissolved rub spices polymerize on the surface over 6 to 14 hours into a mahogany-black crust known as bark.',
    preheatProtocol:
      'Preheat your smoker for 30 to 45 minutes until clean, thin blue smoke (or clear convection vapor) is exiting the exhaust stack. Thick, billowy white smoke indicates incomplete wood combustion and deposits acrid, bitter creosote onto your meat.',
    careAndCleaning:
      'Scrape the drip tray and vacuum the fire pot (for pellet smokers) every 2 to 3 cooks to prevent dangerous ash buildup and grease fires. Keep food-contact grates clean with a brass or wooden scraper.',
    fiveMistakes: [
      {
        mistake: 'Putting meat on while the smoker is belching thick white smoke',
        physicsWhy: 'Smoldering wood with insufficient airflow produces creosote—a toxic, bitter chemical compound that ruins barbecue flavor.',
        fix: 'Wait until fire reaches clean combustion: look for faint, translucent "thin blue smoke" before laying down meat.'
      },
      {
        mistake: 'Panicking during the "stall" at 155°F–165°F and cranking the heat',
        physicsWhy: 'The stall is not meat failing to cook; it is evaporative cooling as moisture moves to the surface and evaporates at the exact rate of heat input.',
        fix: 'Be patient, or wrap tightly in peach butcher paper (the Texas Crutch) to prevent evaporation and power through the stall.'
      },
      {
        mistake: 'Cooking to strict clock time instead of internal probe feel',
        physicsWhy: 'Every pork shoulder and brisket has unique muscle density; one 8-lb pork butt may take 8 hours while another takes 11 hours.',
        fix: 'Cook until an instant-read probe inserts into the meat with zero resistance, like sliding into warm peanut butter (usually 203°F–207°F).'
      },
      {
        mistake: 'Wrapping smoked meats in aluminum foil too early',
        physicsWhy: 'Foil traps 100% of moisture, steaming the meat and turning your crisp, flavorful bark into mush.',
        fix: 'Only wrap once the surface bark is completely set and does not scrape away when rubbed with a finger, and use breathable butcher paper.'
      },
      {
        mistake: 'Slicing smoked brisket or pulled pork immediately out of the smoker',
        physicsWhy: 'Superheated meat expels boiling juices when cut. Resting allows proteins to cool slightly, gelatinizing juices back into the meat.',
        fix: 'Rest wrapped in towels inside an insulated cooler for at least 60 to 120 minutes before carving.'
      }
    ],
    faqs: [
      {
        q: 'What is the best wood for smoking?',
        a: 'Oak and pecan provide smooth, versatile all-purpose smoke for beef, pork, and poultry. Hickory provides bold, traditional bacon-like flavor. Fruitwoods (apple, cherry) provide sweet, gentle smoke and beautiful red color for pork and chicken.'
      },
      {
        q: 'What is the 3-2-1 method for ribs?',
        a: '3 hours smoking unwrapped at 225°F; 2 hours wrapped in butcher paper or foil with butter and cider; 1 hour unwrapped to glaze with sauce and firm up the bark.'
      },
      {
        q: 'Why is there a pink ring around the edge of my smoked chicken and pork?',
        a: 'That is the smoke ring—a harmless, highly prized chemical reaction between nitrogen dioxide in wood smoke and myoglobin in the meat. It does not mean the meat is undercooked.'
      }
    ]
  },

  'boiling': {
    appliance: 'boiling',
    title: 'Stovetop Water Boiling & Starch Hydration Guide',
    tagline: 'Turbulent 212°F convective immersion for al dente pasta, perfect eggs, and blanched greens.',
    thermalPhysics:
      'Boiling is pure liquid convective immersion. Water has a thermal conductivity 25 times greater than air and a high specific heat capacity. At sea level, boiling water is thermally locked at exactly 212°F (100°C). This makes boiling the most consistent and uniform heat transfer environment in the kitchen: food submerged in rapidly boiling water receives violent, instantaneous thermal energy from all sides simultaneously, rapidly hydrating starches (pasta, rice) and denaturing egg proteins with zero risk of burning.',
    preheatProtocol:
      'Always cover the pot with a lid while bringing water to a boil. Covering traps evaporating steam and cuts the pre-boil time by up to 40%. Once water reaches a rolling boil, remove the lid before adding pasta or vegetables to prevent starchy foam from boiling over.',
    careAndCleaning:
      'Mineral deposits from hard tap water leave white cloudy scale on stainless steel pots. Remove scale effortlessly by boiling 1 cup of white vinegar and water for 2 minutes; the acid dissolves calcium carbonate instantly.',
    fiveMistakes: [
      {
        mistake: 'Adding cooking oil to pasta water',
        physicsWhy: 'Oil floats on top of the water and coats the cooked pasta as it drains, preventing tomato and cheese sauces from adhering to the noodles.',
        fix: 'Never add oil to pasta water. Use plenty of water and stir vigorously during the first 60 seconds to prevent noodles from sticking.'
      },
      {
        mistake: 'Under-salting pasta and potato cooking water',
        physicsWhy: 'Pasta and potatoes absorb water as their starches gelatinize. Salt added after cooking sits only on the outside and tastes harsh.',
        fix: 'Salt your water generously (1 to 2 tablespoons kosher salt per 4 quarts of water). It should taste noticeably seasoned, like mild sea water.'
      },
      {
        mistake: 'Dumping 100% of pasta cooking water down the drain',
        physicsWhy: 'Starchy pasta water is the secret emulsion binder for restaurant sauces (cacio e pepe, carbonara, aglio e olio).',
        fix: 'Always scoop out 1 cup of cloudy pasta water before draining; stir it into your pan sauce with butter or cheese for a velvety glaze.'
      },
      {
        mistake: 'Putting eggs into cold water to boil them',
        physicsWhy: 'Heating eggs slowly from cold water causes egg white proteins to fuse tightly to the inner shell membrane, making eggs impossible to peel.',
        fix: 'Always lower cold eggs directly into already-boiling water (hot start) for 12 minutes, then shock in an ice bath. Shells slide off effortlessly.'
      },
      {
        mistake: 'Boiling green vegetables without an ice bath shock',
        physicsWhy: 'Residual heat continues cooking green vegetables on the counter, turning vibrant chlorophyll army-green and mushy within minutes.',
        fix: 'Plunge boiled broccoli or green beans into ice water for 60 seconds immediately after pulling to lock in crunch and neon-green color.'
      }
    ],
    faqs: [
      {
        q: 'How much water do you really need to cook pasta?',
        a: 'The traditional rule is 4 quarts of water per pound of pasta. However, for quick weeknight cooking, 2 to 3 quarts in a wide skillet works equally well and produces starchier, more concentrated pasta water for pan sauces.'
      },
      {
        q: 'How do you make hard-boiled eggs easy to peel?',
        a: 'Lower eggs into boiling water (never cold water), boil for 11-12 minutes, and transfer immediately to an ice water bath for 5 minutes. The rapid temperature shock shrinks the egg away from the shell.'
      },
      {
        q: 'Does adding salt to water make it boil faster?',
        a: 'Theoretically, salt raises the boiling point (boiling point elevation), but the culinary amount of salt changes the boiling time by less than a second. Salt is strictly for seasoning the food internally.'
      }
    ]
  }
};

export function getApplianceGuide(appliance: Appliance): ApplianceGuide | undefined {
  return APPLIANCE_GUIDES[appliance];
}
