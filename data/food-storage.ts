import type { FoodStorageDatasheet } from '@/lib/types';

export const FOOD_STORAGE_DATASHEETS: FoodStorageDatasheet[] = [
  // ── POULTRY ──────────────────────────────────────────────────────────
  {
    id: 'FS-001',
    slug: 'cooked-chicken',
    food: 'Cooked Chicken (All Cuts)',
    foodCategory: 'poultry',
    state: 'cooked',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 3,
        maxDays: 4,
        formatted: '3–4 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Store within 2 hours of cooking.',
      },
      {
        location: 'freezer',
        minDays: 60,
        maxDays: 180,
        formatted: '2–6 months',
        tempRange: '0°F (−18°C)',
        notes: 'Best quality within 4 months.',
      },
    ],
    bestMethod:
      'Let chicken cool slightly, then refrigerate in a shallow airtight container within 2 hours of cooking.',
    containerType: 'Shallow airtight container or heavy-duty freezer bag',
    spoilageSigns: [
      'Slimy or tacky surface texture',
      'Sour or ammonia-like smell',
      'Gray or greenish discoloration',
      'Mold spots on surface',
    ],
    safetyNote:
      'Discard cooked chicken left at room temperature for more than 2 hours (1 hour if above 90°F).',
    proTip:
      'Shred leftover chicken before storing — it reheats more evenly and is ready for tacos, salads, or sandwiches.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does cooked chicken last in the fridge',
      'can you freeze cooked chicken',
      'how long is leftover chicken good for',
      'cooked chicken shelf life',
      'how to store leftover chicken',
      'does cooked chicken go bad',
    ],
    metaDescription:
      'Cooked chicken lasts 3–4 days in the fridge and 2–6 months in the freezer. Learn proper storage, spoilage signs, and safety tips.',
  },
  {
    id: 'FS-002',
    slug: 'raw-chicken',
    food: 'Raw Chicken (Whole & Parts)',
    foodCategory: 'poultry',
    state: 'raw',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 1,
        maxDays: 2,
        formatted: '1–2 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Store on the lowest shelf to prevent drips.',
      },
      {
        location: 'freezer',
        minDays: 270,
        maxDays: 365,
        formatted: '9–12 months',
        tempRange: '0°F (−18°C)',
        notes: 'Whole chickens hold quality longer than parts.',
      },
    ],
    bestMethod:
      'Keep in original packaging on the lowest refrigerator shelf, or rewrap tightly in freezer wrap for freezing.',
    containerType: 'Original packaging on a rimmed plate, or vacuum-sealed freezer bag',
    spoilageSigns: [
      'Sticky or slimy skin',
      'Strong foul or sulfur odor',
      'Gray or yellow patches on flesh',
      'Packaging is bloated or leaking',
    ],
    safetyNote:
      'Never thaw raw chicken on the counter; use the refrigerator, cold water, or microwave method.',
    proTip:
      'Freeze chicken in marinades — it absorbs flavor as it thaws and you save a step on busy weeknights.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does raw chicken last in the fridge',
      'can you freeze raw chicken',
      'raw chicken shelf life',
      'how long is chicken good for in the fridge',
      'how to store raw chicken',
      'how long can chicken stay in the fridge',
    ],
    metaDescription:
      'Raw chicken lasts 1–2 days in the fridge and up to 12 months in the freezer. USDA storage guidelines, spoilage signs, and tips.',
  },
  {
    id: 'FS-003',
    slug: 'cooked-turkey',
    food: 'Cooked Turkey',
    foodCategory: 'poultry',
    state: 'cooked',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 3,
        maxDays: 4,
        formatted: '3–4 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Remove meat from the bone before storing.',
      },
      {
        location: 'freezer',
        minDays: 60,
        maxDays: 180,
        formatted: '2–6 months',
        tempRange: '0°F (−18°C)',
        notes: 'Slice or shred before freezing for easier portioning.',
      },
    ],
    bestMethod:
      'Remove turkey from the bone, slice or shred, and refrigerate in shallow airtight containers within 2 hours.',
    containerType: 'Shallow airtight container or resealable freezer bag',
    spoilageSigns: [
      'Slimy texture on the surface',
      'Sour or off-putting odor',
      'Dull gray or greenish tint',
      'Dried-out or crusty edges',
    ],
    safetyNote:
      'Refrigerate leftover turkey within 2 hours of carving; do not leave on the table all day.',
    proTip:
      'Pour a little turkey broth over sliced meat before sealing the container — it stays way more juicy when you reheat.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does cooked turkey last in the fridge',
      'can you freeze leftover turkey',
      'how long is leftover turkey good for',
      'cooked turkey shelf life',
      'how to store leftover turkey',
      'how long does Thanksgiving turkey last',
    ],
    metaDescription:
      'Cooked turkey lasts 3–4 days in the fridge and 2–6 months frozen. Proper storage tips and spoilage signs from USDA guidelines.',
  },
  {
    id: 'FS-004',
    slug: 'raw-ground-turkey',
    food: 'Raw Ground Turkey',
    foodCategory: 'poultry',
    state: 'raw',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 1,
        maxDays: 2,
        formatted: '1–2 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Use quickly — ground poultry is highly perishable.',
      },
      {
        location: 'freezer',
        minDays: 90,
        maxDays: 120,
        formatted: '3–4 months',
        tempRange: '0°F (−18°C)',
        notes: 'Flatten into thin slabs for faster thawing.',
      },
    ],
    bestMethod:
      'Refrigerate in original packaging on a plate on the lowest shelf; freeze in portioned amounts if not using within 2 days.',
    containerType: 'Original packaging, or freezer bag with air pressed out',
    spoilageSigns: [
      'Slimy or sticky feel',
      'Strong sour or rancid smell',
      'Dull brownish-gray color throughout',
      'Packaging puffed with gas',
    ],
    safetyNote:
      'Cook ground turkey to an internal temperature of 165°F (74°C) — never rely on color alone.',
    proTip:
      'Flatten ground turkey in a freezer bag before freezing — it thaws in half the time and stacks like a file folder.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does ground turkey last in the fridge',
      'can you freeze ground turkey',
      'ground turkey shelf life',
      'how long is ground turkey good for',
      'raw ground turkey storage',
      'how to store ground turkey',
    ],
    metaDescription:
      'Raw ground turkey lasts 1–2 days in the fridge and 3–4 months in the freezer. USDA-based storage and safety tips.',
  },

  // ── BEEF ─────────────────────────────────────────────────────────────
  {
    id: 'FS-005',
    slug: 'cooked-ground-beef',
    food: 'Cooked Ground Beef',
    foodCategory: 'beef',
    state: 'cooked',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 3,
        maxDays: 4,
        formatted: '3–4 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Cool and refrigerate within 2 hours of cooking.',
      },
      {
        location: 'freezer',
        minDays: 60,
        maxDays: 90,
        formatted: '2–3 months',
        tempRange: '0°F (−18°C)',
        notes: 'Label containers with the date and amount.',
      },
    ],
    bestMethod:
      'Spread cooked ground beef in a shallow container to cool quickly, then seal and refrigerate within 2 hours.',
    containerType: 'Shallow airtight container or heavy-duty freezer bag',
    spoilageSigns: [
      'Sour or rancid odor',
      'Slimy or sticky texture',
      'Dark gray or greenish color',
      'Mold spots visible on surface',
    ],
    safetyNote:
      'Discard cooked ground beef left at room temperature for more than 2 hours.',
    proTip:
      'Brown a big batch on Sunday and freeze in 1-pound portions — instant taco night any day of the week.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does cooked ground beef last in the fridge',
      'can you freeze cooked ground beef',
      'leftover ground beef shelf life',
      'how long is cooked ground beef good for',
      'how to store cooked ground beef',
      'cooked ground beef storage time',
    ],
    metaDescription:
      'Cooked ground beef stays good 3–4 days in the fridge and 2–3 months in the freezer. Storage tips and spoilage signs.',
  },
  {
    id: 'FS-006',
    slug: 'raw-ground-beef',
    food: 'Raw Ground Beef',
    foodCategory: 'beef',
    state: 'raw',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 1,
        maxDays: 2,
        formatted: '1–2 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Store on the lowest shelf to avoid cross-contamination.',
      },
      {
        location: 'freezer',
        minDays: 90,
        maxDays: 120,
        formatted: '3–4 months',
        tempRange: '0°F (−18°C)',
        notes: 'Wrap tightly or vacuum seal to prevent freezer burn.',
      },
    ],
    bestMethod:
      'Keep in original store packaging on a plate; if freezing, rewrap in freezer paper or vacuum seal.',
    containerType: 'Original packaging on a plate, or vacuum-sealed freezer bag',
    spoilageSigns: [
      'Slimy or tacky exterior',
      'Strong sour or putrid smell',
      'Grayish-brown color throughout',
      'Packaging bloated or leaking',
    ],
    safetyNote:
      'Cook ground beef to 160°F (71°C) internal temperature; ground meat has more surface area exposed to bacteria.',
    proTip:
      'Use a chopstick to score frozen ground beef into quarters through the bag before freezing — snap off only what you need later.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does ground beef last in the fridge',
      'can you freeze ground beef',
      'raw ground beef shelf life',
      'how long is ground beef good for',
      'ground beef storage time',
      'how to tell if ground beef is bad',
    ],
    metaDescription:
      'Raw ground beef lasts 1–2 days in the fridge and 3–4 months in the freezer. USDA storage guidelines and spoilage signs.',
  },
  {
    id: 'FS-007',
    slug: 'cooked-steak',
    food: 'Cooked Steak',
    foodCategory: 'beef',
    state: 'cooked',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 3,
        maxDays: 4,
        formatted: '3–4 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Wrap tightly or store in a sealed container.',
      },
      {
        location: 'freezer',
        minDays: 60,
        maxDays: 90,
        formatted: '2–3 months',
        tempRange: '0°F (−18°C)',
        notes: 'Slice before freezing for faster, more even reheating.',
      },
    ],
    bestMethod:
      'Let the steak rest for 10 minutes, then wrap tightly in foil or place in an airtight container and refrigerate.',
    containerType: 'Airtight container or tightly wrapped aluminum foil',
    spoilageSigns: [
      'Sour or off smell when unwrapped',
      'Slimy surface coating',
      'Dull grayish-brown color',
      'Dry, tough edges with discoloration',
    ],
    safetyNote:
      'Reheat leftover steak to 165°F (74°C) internal temperature before eating.',
    proTip:
      'Reheat sliced steak in a skillet with a splash of beef broth over medium heat — way better than the microwave.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does cooked steak last in the fridge',
      'can you freeze leftover steak',
      'leftover steak shelf life',
      'how long is cooked steak good for',
      'how to store leftover steak',
      'how to reheat steak',
    ],
    metaDescription:
      'Cooked steak lasts 3–4 days in the fridge and 2–3 months frozen. Learn the best way to store and reheat leftover steak.',
  },
  {
    id: 'FS-008',
    slug: 'raw-steak',
    food: 'Raw Steak',
    foodCategory: 'beef',
    state: 'raw',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 3,
        maxDays: 5,
        formatted: '3–5 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Steaks and roasts keep longer than ground beef.',
      },
      {
        location: 'freezer',
        minDays: 120,
        maxDays: 365,
        formatted: '4–12 months',
        tempRange: '0°F (−18°C)',
        notes: 'Vacuum sealing extends quality toward the longer end.',
      },
    ],
    bestMethod:
      'Store in original packaging on the lowest shelf for immediate use; vacuum seal for freezer storage.',
    containerType: 'Original store packaging or vacuum-sealed freezer bag',
    spoilageSigns: [
      'Sticky or slimy surface',
      'Strong sour or rotten-egg smell',
      'Dark brown or green patches',
      'Dried-out or crusty edges',
    ],
    safetyNote:
      'A slight brown tint on vacuum-packed steak is normal (lack of oxygen); smell is a more reliable indicator than color.',
    proTip:
      'Dry-brine steaks with salt a day before cooking — they stay fresh in the fridge window and taste incredible.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does steak last in the fridge',
      'can you freeze steak',
      'raw steak shelf life',
      'how long is steak good for in the fridge',
      'how to store raw steak',
      'how long can you keep steak in the fridge',
    ],
    metaDescription:
      'Raw steak lasts 3–5 days in the fridge and 4–12 months in the freezer. USDA guidelines for storage, spoilage, and safety.',
  },
  {
    id: 'FS-009',
    slug: 'cooked-roast-beef',
    food: 'Cooked Roast Beef',
    foodCategory: 'beef',
    state: 'cooked',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 3,
        maxDays: 4,
        formatted: '3–4 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Slice and store in shallow containers for even cooling.',
      },
      {
        location: 'freezer',
        minDays: 60,
        maxDays: 90,
        formatted: '2–3 months',
        tempRange: '0°F (−18°C)',
        notes: 'Freeze with pan juices to retain moisture.',
      },
    ],
    bestMethod:
      'Slice the roast, place in a shallow airtight container with juices, and refrigerate within 2 hours.',
    containerType: 'Shallow airtight container with pan juices, or vacuum-sealed bag',
    spoilageSigns: [
      'Sour or tangy odor',
      'Slimy or sticky surface',
      'Grayish-green discoloration',
      'Mold growth on edges',
    ],
    safetyNote:
      'Large cuts cool slowly — slice or separate into smaller portions so they chill below 40°F within 2 hours.',
    proTip:
      'Save those pan drippings separately in an ice cube tray — frozen beef jus cubes are liquid gold for gravy and sauces.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does roast beef last in the fridge',
      'can you freeze cooked roast beef',
      'leftover roast beef shelf life',
      'how long is roast beef good for',
      'how to store leftover roast beef',
      'cooked roast beef storage',
    ],
    metaDescription:
      'Cooked roast beef lasts 3–4 days in the fridge and 2–3 months in the freezer. Storage tips and spoilage signs.',
  },

  // ── PORK ─────────────────────────────────────────────────────────────
  {
    id: 'FS-010',
    slug: 'cooked-pork-chops',
    food: 'Cooked Pork Chops',
    foodCategory: 'pork',
    state: 'cooked',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 3,
        maxDays: 4,
        formatted: '3–4 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Cool to room temperature briefly before sealing.',
      },
      {
        location: 'freezer',
        minDays: 60,
        maxDays: 90,
        formatted: '2–3 months',
        tempRange: '0°F (−18°C)',
        notes: 'Wrap individually so you can thaw one at a time.',
      },
    ],
    bestMethod:
      'Wrap each chop individually in foil or plastic wrap, then place in an airtight container and refrigerate.',
    containerType: 'Individually wrapped in foil, stored in airtight container or freezer bag',
    spoilageSigns: [
      'Sour or rancid smell',
      'Slimy or tacky surface',
      'Dull gray or greenish tint',
      'Dried-out or hardened texture',
    ],
    safetyNote:
      'Reheat cooked pork to 165°F (74°C) before serving leftovers.',
    proTip:
      'Reheat pork chops low and slow in the oven at 275°F with a splash of broth — keeps them from turning into hockey pucks.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long do cooked pork chops last in the fridge',
      'can you freeze cooked pork chops',
      'leftover pork chops shelf life',
      'how long are pork chops good for',
      'how to store leftover pork chops',
      'cooked pork chops storage',
    ],
    metaDescription:
      'Cooked pork chops last 3–4 days in the fridge and 2–3 months frozen. USDA storage guidelines and reheating tips.',
  },
  {
    id: 'FS-011',
    slug: 'raw-pork',
    food: 'Raw Pork',
    foodCategory: 'pork',
    state: 'raw',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 3,
        maxDays: 5,
        formatted: '3–5 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Chops and roasts keep 3–5 days; ground pork only 1–2 days.',
      },
      {
        location: 'freezer',
        minDays: 120,
        maxDays: 180,
        formatted: '4–6 months',
        tempRange: '0°F (−18°C)',
        notes: 'Wrap tightly in freezer paper or vacuum seal.',
      },
    ],
    bestMethod:
      'Keep in original store packaging on the lowest shelf; for freezing, overwrap with freezer paper or use a vacuum sealer.',
    containerType: 'Original packaging on a rimmed plate, or vacuum-sealed freezer bag',
    spoilageSigns: [
      'Slimy or sticky surface',
      'Sour or ammonia-like smell',
      'Grayish or greenish discoloration',
      'Packaging bloated with gas',
    ],
    safetyNote:
      'Cook pork chops and roasts to a minimum of 145°F (63°C) with a 3-minute rest; ground pork to 160°F (71°C).',
    proTip:
      'Brine pork chops in salt water for 30 minutes before cooking — they come out juicier and more forgiving even when slightly overcooked.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does raw pork last in the fridge',
      'can you freeze pork chops',
      'raw pork shelf life',
      'how long is pork good for in the fridge',
      'how to store raw pork',
      'pork chops fridge storage time',
    ],
    metaDescription:
      'Raw pork chops and roasts last 3–5 days in the fridge and 4–6 months frozen. USDA storage guidelines and safety tips.',
  },
  {
    id: 'FS-012',
    slug: 'cooked-bacon',
    food: 'Cooked Bacon',
    foodCategory: 'pork',
    state: 'cooked',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 4,
        maxDays: 5,
        formatted: '4–5 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Drain grease and pat dry before storing.',
      },
      {
        location: 'freezer',
        minDays: 30,
        maxDays: 30,
        formatted: '~1 month',
        tempRange: '0°F (−18°C)',
        notes: 'Freeze on a parchment-lined tray first, then bag.',
      },
    ],
    bestMethod:
      'Drain on paper towels, let cool, then store in an airtight container lined with paper towels.',
    containerType: 'Airtight container lined with paper towels, or resealable bag',
    spoilageSigns: [
      'Sour or rancid grease smell',
      'Slimy or sticky texture',
      'Changed from red-brown to gray',
      'Mold spots on surface',
    ],
    safetyNote:
      'Pre-cooked bacon can grow bacteria quickly if left at room temperature — refrigerate within 2 hours.',
    proTip:
      'Cook a whole pound at once on a sheet pan in the oven at 400°F, then freeze individual strips for instant bacon any morning.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does cooked bacon last in the fridge',
      'can you freeze cooked bacon',
      'cooked bacon shelf life',
      'how long is cooked bacon good for',
      'how to store cooked bacon',
      'leftover bacon storage',
    ],
    metaDescription:
      'Cooked bacon lasts 4–5 days in the fridge and about 1 month in the freezer. Best storage methods and spoilage signs.',
  },
  {
    id: 'FS-013',
    slug: 'deli-meat-opened',
    food: 'Deli Meat / Lunch Meat (Opened Package)',
    foodCategory: 'pork',
    state: 'opened',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 3,
        maxDays: 5,
        formatted: '3–5 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Reseal tightly after each use.',
      },
      {
        location: 'freezer',
        minDays: 30,
        maxDays: 60,
        formatted: '1–2 months',
        tempRange: '0°F (−18°C)',
        notes: 'Texture may change slightly after thawing.',
      },
    ],
    bestMethod:
      'Reseal in the original packaging or transfer to a resealable bag, pressing out air, and refrigerate immediately.',
    containerType: 'Resealable bag or tightly wrapped in plastic wrap',
    spoilageSigns: [
      'Slimy or wet film on surface',
      'Sour or vinegar-like odor',
      'Faded or iridescent sheen on edges',
      'Stale or off taste',
    ],
    safetyNote:
      'Deli meats can harbor Listeria even when refrigerated — pregnant women and immunocompromised individuals should heat to 165°F before eating.',
    proTip:
      'Place a folded paper towel inside the package to absorb excess moisture — it keeps deli meat fresh a day or two longer.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does deli meat last in the fridge',
      'how long does lunch meat last after opening',
      'can you freeze deli meat',
      'deli meat shelf life opened',
      'how long is lunch meat good for',
      'opened deli meat storage',
    ],
    metaDescription:
      'Opened deli meat lasts 3–5 days in the fridge and 1–2 months in the freezer. USDA storage guidelines and Listeria safety.',
  },
  {
    id: 'FS-014',
    slug: 'cooked-ham',
    food: 'Cooked Ham',
    foodCategory: 'pork',
    state: 'cooked',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 3,
        maxDays: 5,
        formatted: '3–5 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Wrap tightly to prevent drying out.',
      },
      {
        location: 'freezer',
        minDays: 30,
        maxDays: 60,
        formatted: '1–2 months',
        tempRange: '0°F (−18°C)',
        notes: 'Slice before freezing for easier portioning.',
      },
    ],
    bestMethod:
      'Wrap ham slices tightly in aluminum foil or plastic wrap and store in an airtight container.',
    containerType: 'Airtight container or tightly wrapped in foil and plastic wrap',
    spoilageSigns: [
      'Sour or off smell',
      'Slimy or sticky surface',
      'Gray or green discoloration',
      'Dried-out or hardened edges',
    ],
    safetyNote:
      'Even cured ham should be refrigerated and consumed within 5 days of cooking or opening.',
    proTip:
      'Freeze the ham bone with some meat attached — it makes the best split pea soup base you have ever tasted.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does cooked ham last in the fridge',
      'can you freeze leftover ham',
      'cooked ham shelf life',
      'how long is ham good for after cooking',
      'how to store leftover ham',
      'leftover ham storage time',
    ],
    metaDescription:
      'Cooked ham lasts 3–5 days in the fridge and 1–2 months in the freezer. Proper storage, spoilage signs, and safety tips.',
  },
  {
    id: 'FS-015',
    slug: 'cooked-sausage',
    food: 'Cooked Sausage (Links & Patties)',
    foodCategory: 'pork',
    state: 'cooked',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 3,
        maxDays: 4,
        formatted: '3–4 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Store in a sealed container to contain odors.',
      },
      {
        location: 'freezer',
        minDays: 60,
        maxDays: 90,
        formatted: '2–3 months',
        tempRange: '0°F (−18°C)',
        notes: 'Wrap individually for grab-and-go convenience.',
      },
    ],
    bestMethod:
      'Let sausages cool, then store in an airtight container or wrap individually in plastic wrap and place in a freezer bag.',
    containerType: 'Airtight container or individually wrapped in freezer bag',
    spoilageSigns: [
      'Sour or rancid odor',
      'Slimy casing surface',
      'Gray or brownish discoloration',
      'Mold visible on the casing',
    ],
    safetyNote:
      'Even pre-cooked sausages should be reheated to 165°F (74°C) when serving as leftovers.',
    proTip:
      'Flash-freeze cooked sausage links on a sheet pan, then bag them — they will not stick together and you can grab one at a time.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does cooked sausage last in the fridge',
      'can you freeze cooked sausage',
      'cooked sausage shelf life',
      'how long are cooked sausages good for',
      'leftover sausage storage',
      'how to store cooked sausage links',
    ],
    metaDescription:
      'Cooked sausage lasts 3–4 days in the fridge and 2–3 months in the freezer. Storage tips and spoilage signs for links and patties.',
  },

  // ── SEAFOOD ──────────────────────────────────────────────────────────
  {
    id: 'FS-016',
    slug: 'cooked-shrimp',
    food: 'Cooked Shrimp',
    foodCategory: 'seafood',
    state: 'cooked',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 3,
        maxDays: 4,
        formatted: '3–4 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Cool and refrigerate within 1–2 hours.',
      },
      {
        location: 'freezer',
        minDays: 60,
        maxDays: 90,
        formatted: '2–3 months',
        tempRange: '0°F (−18°C)',
        notes: 'Freeze in a single layer first, then transfer to a bag.',
      },
    ],
    bestMethod:
      'Cool quickly, place in an airtight container or freezer bag, and refrigerate within 2 hours.',
    containerType: 'Airtight container or resealable freezer bag',
    spoilageSigns: [
      'Strong fishy or ammonia smell',
      'Slimy or mushy texture',
      'Dull, opaque appearance',
      'Sour or off-putting taste',
    ],
    safetyNote:
      'Cooked shellfish is more perishable than most meats — when in doubt, throw it out.',
    proTip:
      'Toss leftover shrimp cold into a salad or pasta — reheating makes them rubbery, but cold shrimp stays tender.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does cooked shrimp last in the fridge',
      'can you freeze cooked shrimp',
      'cooked shrimp shelf life',
      'how long is leftover shrimp good for',
      'how to store cooked shrimp',
      'leftover shrimp storage',
    ],
    metaDescription:
      'Cooked shrimp lasts 3–4 days in the fridge and 2–3 months in the freezer. Storage tips and spoilage signs from USDA guidelines.',
  },
  {
    id: 'FS-017',
    slug: 'raw-shrimp',
    food: 'Raw Shrimp',
    foodCategory: 'seafood',
    state: 'raw',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 1,
        maxDays: 2,
        formatted: '1–2 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Keep in the coldest part of the fridge.',
      },
      {
        location: 'freezer',
        minDays: 90,
        maxDays: 180,
        formatted: '3–6 months',
        tempRange: '0°F (−18°C)',
        notes: 'Freeze in original packaging or in an ice glaze for best quality.',
      },
    ],
    bestMethod:
      'Store in the coldest part of the refrigerator in a bowl of ice if possible; freeze in original packaging or a sealed bag.',
    containerType: 'Bowl of ice in the fridge, or airtight freezer bag',
    spoilageSigns: [
      'Strong ammonia or bleach-like odor',
      'Slimy shell or flesh',
      'Black spots on the shell',
      'Mushy or disintegrating texture',
    ],
    safetyNote:
      'Never thaw shrimp on the counter; use the refrigerator or a cold-water bath.',
    proTip:
      'Buy frozen raw shrimp instead of "fresh" at the counter — most counter shrimp was previously frozen anyway, and you control the thaw timing.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does raw shrimp last in the fridge',
      'can you freeze raw shrimp',
      'raw shrimp shelf life',
      'how long is shrimp good for in the fridge',
      'how to store raw shrimp',
      'fresh shrimp storage time',
    ],
    metaDescription:
      'Raw shrimp lasts 1–2 days in the fridge and 3–6 months in the freezer. USDA-based storage tips and spoilage signs.',
  },
  {
    id: 'FS-018',
    slug: 'cooked-salmon',
    food: 'Cooked Salmon',
    foodCategory: 'seafood',
    state: 'cooked',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 3,
        maxDays: 4,
        formatted: '3–4 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Store in a sealed container to prevent odor transfer.',
      },
      {
        location: 'freezer',
        minDays: 60,
        maxDays: 90,
        formatted: '2–3 months',
        tempRange: '0°F (−18°C)',
        notes: 'Wrap tightly to prevent freezer burn on delicate fish.',
      },
    ],
    bestMethod:
      'Cool the salmon, wrap tightly in plastic wrap or foil, and place in an airtight container before refrigerating.',
    containerType: 'Airtight container with tight-fitting lid',
    spoilageSigns: [
      'Strong fishy or sour odor',
      'Slimy white film on surface',
      'Dull or discolored flesh',
      'Mushy or flaky-falling-apart texture',
    ],
    safetyNote:
      'Fish spoils faster than meat — err on the side of caution and discard if it smells off.',
    proTip:
      'Flake leftover salmon onto a sheet of nori with rice for quick sushi bowls — it tastes better cold than reheated.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does cooked salmon last in the fridge',
      'can you freeze cooked salmon',
      'leftover salmon shelf life',
      'how long is cooked salmon good for',
      'how to store leftover salmon',
      'cooked salmon storage time',
    ],
    metaDescription:
      'Cooked salmon lasts 3–4 days in the fridge and 2–3 months frozen. Storage best practices and spoilage signs.',
  },
  {
    id: 'FS-019',
    slug: 'raw-fish',
    food: 'Raw Fish (General)',
    foodCategory: 'seafood',
    state: 'raw',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 1,
        maxDays: 2,
        formatted: '1–2 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Use the same day for peak freshness and flavor.',
      },
      {
        location: 'freezer',
        minDays: 90,
        maxDays: 240,
        formatted: '3–8 months',
        tempRange: '0°F (−18°C)',
        notes: 'Lean fish (cod, tilapia) keeps longer than fatty fish (salmon, mackerel).',
      },
    ],
    bestMethod:
      'Pat dry, wrap tightly in plastic wrap, store in the coldest part of the fridge on a bed of ice if possible.',
    containerType: 'Tightly wrapped in plastic on a plate, or vacuum-sealed freezer bag',
    spoilageSigns: [
      'Strong fishy or ammonia odor',
      'Slimy or sticky surface',
      'Dull, sunken eyes (whole fish)',
      'Discolored or dried-out flesh',
    ],
    safetyNote:
      'Cook fish to an internal temperature of 145°F (63°C); discard any fish left at room temperature for more than 2 hours.',
    proTip:
      'Press a finger into the fillet — fresh fish springs back immediately; if the dent stays, it is past its prime.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does fish last in the fridge',
      'can you freeze fresh fish',
      'raw fish shelf life',
      'how long is fish good for in the fridge',
      'how to store fresh fish',
      'fresh fish storage time',
      'how long does salmon last in the fridge',
    ],
    metaDescription:
      'Raw fish lasts 1–2 days in the fridge and 3–8 months frozen. USDA guidelines for storing fresh fish safely.',
  },

  // ── GRAINS & PASTA ──────────────────────────────────────────────────
  {
    id: 'FS-020',
    slug: 'cooked-rice',
    food: 'Cooked Rice',
    foodCategory: 'grains-pasta',
    state: 'cooked',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 4,
        maxDays: 6,
        formatted: '4–6 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Spread in a thin layer to cool quickly before refrigerating.',
      },
      {
        location: 'freezer',
        minDays: 30,
        maxDays: 180,
        formatted: '1–6 months',
        tempRange: '0°F (−18°C)',
        notes: 'Freeze in single-serving portions for quick reheating.',
      },
    ],
    bestMethod:
      'Spread rice in a thin layer on a sheet pan to cool quickly, then transfer to shallow airtight containers and refrigerate within 1 hour.',
    containerType: 'Shallow airtight container or resealable freezer bag',
    spoilageSigns: [
      'Sour or musty smell',
      'Hard, dry, or crunchy texture',
      'Visible mold spots',
      'Slimy or clumpy consistency',
    ],
    safetyNote:
      'Cooked rice can harbor Bacillus cereus spores — cool and refrigerate within 1 hour to prevent toxin production.',
    proTip:
      'Day-old fridge rice makes the best fried rice — the drier texture prevents sogginess and gets a better sear in the wok.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does cooked rice last in the fridge',
      'can you freeze cooked rice',
      'cooked rice shelf life',
      'how long is leftover rice good for',
      'how to store cooked rice',
      'is leftover rice safe to eat',
    ],
    metaDescription:
      'Cooked rice lasts 4–6 days in the fridge and up to 6 months frozen. Learn safe storage to avoid Bacillus cereus risk.',
  },
  {
    id: 'FS-021',
    slug: 'cooked-pasta',
    food: 'Cooked Pasta',
    foodCategory: 'grains-pasta',
    state: 'cooked',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 3,
        maxDays: 5,
        formatted: '3–5 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Toss with a little olive oil to prevent sticking.',
      },
      {
        location: 'freezer',
        minDays: 30,
        maxDays: 60,
        formatted: '1–2 months',
        tempRange: '0°F (−18°C)',
        notes: 'Slightly undercook pasta you plan to freeze.',
      },
    ],
    bestMethod:
      'Toss plain pasta with a drizzle of olive oil, let cool, and store in an airtight container.',
    containerType: 'Airtight container or resealable bag',
    spoilageSigns: [
      'Sour or off smell',
      'Slimy or gummy texture',
      'Visible mold spots',
      'Discoloration or dark spots',
    ],
    safetyNote:
      'Pasta with sauce (especially cream-based) should be treated like the most perishable ingredient — refrigerate within 2 hours.',
    proTip:
      'Freeze pasta and sauce in separate containers — the pasta keeps its texture much better that way.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does cooked pasta last in the fridge',
      'can you freeze cooked pasta',
      'leftover pasta shelf life',
      'how long is pasta good for in the fridge',
      'how to store cooked pasta',
      'cooked pasta storage time',
    ],
    metaDescription:
      'Cooked pasta lasts 3–5 days in the fridge and 1–2 months frozen. Tips for storing plain and sauced pasta properly.',
  },
  {
    id: 'FS-022',
    slug: 'cooked-quinoa',
    food: 'Cooked Quinoa',
    foodCategory: 'grains-pasta',
    state: 'cooked',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 5,
        maxDays: 7,
        formatted: '5–7 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Fluff and let cool completely before sealing.',
      },
      {
        location: 'freezer',
        minDays: 60,
        maxDays: 240,
        formatted: '2–8 months',
        tempRange: '0°F (−18°C)',
        notes: 'Freeze flat in bags for easy stacking.',
      },
    ],
    bestMethod:
      'Spread cooked quinoa on a sheet pan to cool, then transfer to an airtight container and refrigerate.',
    containerType: 'Airtight container or resealable freezer bag',
    spoilageSigns: [
      'Sour or fermented smell',
      'Hard, overly dry texture',
      'Visible mold growth',
      'Slimy or clumped together',
    ],
    safetyNote:
      'Like rice, cooked quinoa should be cooled and refrigerated within 2 hours to prevent bacterial growth.',
    proTip:
      'Freeze quinoa in a muffin tin for perfectly portioned pucks — pop one out and microwave for an instant grain bowl base.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does cooked quinoa last in the fridge',
      'can you freeze cooked quinoa',
      'cooked quinoa shelf life',
      'how long is quinoa good for in the fridge',
      'how to store cooked quinoa',
      'leftover quinoa storage',
    ],
    metaDescription:
      'Cooked quinoa lasts 5–7 days in the fridge and 2–8 months frozen. Proper cooling and storage tips for meal prep.',
  },

  // ── DAIRY & EGGS ────────────────────────────────────────────────────
  {
    id: 'FS-023',
    slug: 'hard-boiled-eggs',
    food: 'Hard-Boiled Eggs',
    foodCategory: 'dairy-eggs',
    state: 'cooked',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 7,
        maxDays: 7,
        formatted: 'Up to 7 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Keep in shells for maximum shelf life.',
      },
    ],
    bestMethod:
      'Store unpeeled in the original carton or a covered container in the refrigerator.',
    containerType: 'Covered container with a damp paper towel, or original carton',
    spoilageSigns: [
      'Strong sulfur smell',
      'Slimy or chalky white surface',
      'Gray or green ring around yolk (overcooked but safe)',
      'Off or sour odor when peeled',
    ],
    safetyNote:
      'Hard-boiled eggs do not freeze well — freezing changes the texture of the white and is not recommended.',
    proTip:
      'Add a teaspoon of baking soda to the boiling water — it raises the pH and makes shells practically fall off.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long do hard boiled eggs last in the fridge',
      'hard boiled egg shelf life',
      'how long are boiled eggs good for',
      'can you freeze hard boiled eggs',
      'how to store hard boiled eggs',
      'how long do peeled eggs last',
    ],
    metaDescription:
      'Hard-boiled eggs last up to 7 days in the fridge (unpeeled). Storage tips, spoilage signs, and why you should skip freezing.',
  },
  {
    id: 'FS-024',
    slug: 'butter-opened',
    food: 'Butter (Opened)',
    foodCategory: 'dairy-eggs',
    state: 'opened',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 30,
        maxDays: 90,
        formatted: '1–3 months',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Wrap tightly or use a butter dish with a cover.',
      },
      {
        location: 'freezer',
        minDays: 180,
        maxDays: 365,
        formatted: '6–12 months',
        tempRange: '0°F (−18°C)',
        notes: 'Freeze in original packaging overwrapped with foil.',
      },
      {
        location: 'counter',
        minDays: 1,
        maxDays: 2,
        formatted: '1–2 days',
        tempRange: 'Room Temperature (68°F–72°F)',
        notes: 'Only salted butter; keep in a covered butter dish away from light.',
      },
    ],
    bestMethod:
      'Keep a small amount in a covered butter dish at room temperature for easy spreading; refrigerate the rest.',
    containerType: 'Covered butter dish (counter) or original wrapper in fridge',
    spoilageSigns: [
      'Sour or cheesy off-flavor',
      'Darker yellow or discolored edges',
      'Rancid smell when unwrapped',
      'Mold spots on surface',
    ],
    safetyNote:
      'Unsalted butter is more perishable than salted — keep it refrigerated and use within a month.',
    proTip:
      'Keep one stick on the counter in a covered dish and the rest in the freezer — you always have soft butter for toast and frozen backup for baking.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does butter last in the fridge',
      'can you leave butter on the counter',
      'does butter go bad',
      'how long is butter good for',
      'can you freeze butter',
      'butter shelf life after opening',
      'how to store butter',
    ],
    metaDescription:
      'Opened butter lasts 1–3 months in the fridge, 6–12 months frozen, and 1–2 days on the counter. Storage and spoilage guide.',
  },
  {
    id: 'FS-025',
    slug: 'cream-cheese-opened',
    food: 'Cream Cheese (Opened)',
    foodCategory: 'dairy-eggs',
    state: 'opened',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 7,
        maxDays: 10,
        formatted: '7–10 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Reseal tightly or wrap in plastic wrap after each use.',
      },
      {
        location: 'freezer',
        minDays: 30,
        maxDays: 60,
        formatted: '1–2 months',
        tempRange: '0°F (−18°C)',
        notes: 'Texture becomes crumbly — best for cooking, not spreading.',
      },
    ],
    bestMethod:
      'Fold the foil wrapper tightly over the exposed surface, or transfer to an airtight container and refrigerate.',
    containerType: 'Original foil wrapper sealed tightly, or small airtight container',
    spoilageSigns: [
      'Visible mold (any color)',
      'Sour or tangy off-smell',
      'Watery separation on surface',
      'Yellowish or dried-out edges',
    ],
    safetyNote:
      'Do not cut away mold and use the rest — soft cheeses like cream cheese should be discarded entirely if mold appears.',
    proTip:
      'Freeze cream cheese only if you plan to use it in baked recipes like cheesecake — it bakes perfectly even after thawing.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does cream cheese last after opening',
      'can you freeze cream cheese',
      'cream cheese shelf life opened',
      'how long is cream cheese good for',
      'does cream cheese go bad',
      'how to store cream cheese',
    ],
    metaDescription:
      'Opened cream cheese lasts 7–10 days in the fridge. Learn spoilage signs, freezing tips, and USDA safety guidelines.',
  },
  {
    id: 'FS-026',
    slug: 'sour-cream-opened',
    food: 'Sour Cream (Opened)',
    foodCategory: 'dairy-eggs',
    state: 'opened',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 7,
        maxDays: 21,
        formatted: '1–3 weeks',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Always use a clean spoon to prevent contamination.',
      },
    ],
    bestMethod:
      'Keep in the original container with the lid tightly sealed; store toward the back of the fridge where it is coldest.',
    containerType: 'Original container with tight-fitting lid',
    spoilageSigns: [
      'Mold on surface (any color)',
      'Strong sour or bitter smell',
      'Yellow discoloration on top',
      'Excessive watery separation',
    ],
    safetyNote:
      'Discard the entire container if mold is found — do not scoop it out and use the rest.',
    proTip:
      'Store the container upside down in the fridge — the seal created by the cream against the lid keeps air out and extends freshness.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does sour cream last after opening',
      'does sour cream go bad',
      'sour cream shelf life opened',
      'how long is sour cream good for',
      'how to tell if sour cream is bad',
      'can you freeze sour cream',
    ],
    metaDescription:
      'Opened sour cream lasts 1–3 weeks in the fridge. Spoilage signs, storage tips, and USDA food safety guidelines.',
  },
  {
    id: 'FS-027',
    slug: 'shredded-cheese-opened',
    food: 'Shredded Cheese (Opened)',
    foodCategory: 'dairy-eggs',
    state: 'opened',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 5,
        maxDays: 7,
        formatted: '5–7 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Press out all air and reseal the bag after each use.',
      },
      {
        location: 'freezer',
        minDays: 60,
        maxDays: 240,
        formatted: '2–8 months',
        tempRange: '0°F (−18°C)',
        notes: 'Shredded cheese freezes better than block cheese.',
      },
    ],
    bestMethod:
      'Press out all air from the bag and reseal tightly, or transfer to a resealable freezer bag.',
    containerType: 'Original resealable bag or airtight freezer bag',
    spoilageSigns: [
      'Mold patches (blue, green, or white)',
      'Strong sour or ammonia smell',
      'Clumped or hardened texture',
      'Off-flavor or excessive tanginess',
    ],
    safetyNote:
      'Pre-shredded cheese has more surface area exposed to air and bacteria — it spoils faster than block cheese.',
    proTip:
      'Toss shredded cheese with a tablespoon of cornstarch before freezing — it keeps the shreds from clumping into one solid brick.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does shredded cheese last after opening',
      'can you freeze shredded cheese',
      'shredded cheese shelf life opened',
      'how long is shredded cheese good for',
      'does shredded cheese go bad',
      'how to store opened shredded cheese',
    ],
    metaDescription:
      'Opened shredded cheese lasts 5–7 days in the fridge and 2–8 months frozen. Storage tips and spoilage signs.',
  },
  {
    id: 'FS-028',
    slug: 'milk-opened',
    food: 'Milk (Opened)',
    foodCategory: 'dairy-eggs',
    state: 'opened',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 5,
        maxDays: 7,
        formatted: '5–7 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Store on an interior shelf, not in the door.',
      },
    ],
    bestMethod:
      'Return to the fridge immediately after pouring; store on an interior shelf where the temperature is most consistent.',
    containerType: 'Original container, tightly sealed',
    spoilageSigns: [
      'Sour or off smell',
      'Lumpy or curdled texture',
      'Yellowish discoloration',
      'Sour taste when sipped',
    ],
    safetyNote:
      'Milk left out at room temperature for more than 2 hours should be discarded, even if it smells fine.',
    proTip:
      'Stop storing milk in the fridge door — the door is the warmest spot. Move it to the back of a middle shelf and it will last days longer.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does milk last after opening',
      'does milk go bad',
      'how long is milk good for in the fridge',
      'opened milk shelf life',
      'how to tell if milk is bad',
      'how long can milk sit out',
      'milk storage tips',
    ],
    metaDescription:
      'Opened milk lasts 5–7 days in the fridge. Learn proper storage, spoilage signs, and why the door shelf is the worst spot.',
  },

  // ── PREPARED FOODS ──────────────────────────────────────────────────
  {
    id: 'FS-029',
    slug: 'leftover-pizza',
    food: 'Leftover Pizza',
    foodCategory: 'prepared-foods',
    state: 'cooked',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 3,
        maxDays: 4,
        formatted: '3–4 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Stack slices with parchment paper between them.',
      },
      {
        location: 'freezer',
        minDays: 30,
        maxDays: 60,
        formatted: '1–2 months',
        tempRange: '0°F (−18°C)',
        notes: 'Wrap each slice individually in foil or plastic wrap.',
      },
    ],
    bestMethod:
      'Stack slices in an airtight container with parchment between layers, or wrap individually for freezing.',
    containerType: 'Airtight container with parchment paper, or individually wrapped in foil',
    spoilageSigns: [
      'Sour or yeasty off-smell',
      'Mold on crust or toppings',
      'Slimy or mushy toppings',
      'Hard, dried-out crust',
    ],
    safetyNote:
      'Pizza left out overnight should be discarded — bacteria multiply rapidly at room temperature.',
    proTip:
      'Reheat pizza in a skillet on medium heat with a lid on — crispy bottom, melty top, zero sogginess. Trust the process.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does pizza last in the fridge',
      'can you freeze leftover pizza',
      'leftover pizza shelf life',
      'how long is pizza good for',
      'how to store leftover pizza',
      'how to reheat pizza',
      'is day old pizza safe to eat',
    ],
    metaDescription:
      'Leftover pizza lasts 3–4 days in the fridge and 1–2 months frozen. Best reheating method and USDA storage guidelines.',
  },
  {
    id: 'FS-030',
    slug: 'soup-and-stew',
    food: 'Soup & Stew',
    foodCategory: 'prepared-foods',
    state: 'cooked',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 3,
        maxDays: 4,
        formatted: '3–4 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Cool in an ice bath before refrigerating large pots.',
      },
      {
        location: 'freezer',
        minDays: 60,
        maxDays: 90,
        formatted: '2–3 months',
        tempRange: '0°F (−18°C)',
        notes: 'Leave headspace in containers for expansion.',
      },
    ],
    bestMethod:
      'Cool large batches quickly using an ice-water bath, then ladle into portion-sized airtight containers and refrigerate.',
    containerType: 'Portion-sized airtight containers or freezer-safe jars (leave 1 inch headspace)',
    spoilageSigns: [
      'Sour or fermented odor',
      'Mold on the surface',
      'Cloudy or slimy broth',
      'Bubbling when container is opened',
    ],
    safetyNote:
      'Do not cool a large pot of soup on the counter for hours — use an ice-water bath to bring it below 40°F within 2 hours.',
    proTip:
      'Freeze soup in muffin tins for single-serving pucks — pop them out, bag them, and microwave one at a time for lunch.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does soup last in the fridge',
      'can you freeze soup',
      'leftover soup shelf life',
      'how long is homemade soup good for',
      'how to store leftover soup',
      'how long does stew last in the fridge',
    ],
    metaDescription:
      'Soup and stew last 3–4 days in the fridge and 2–3 months in the freezer. Cooling tips and safe storage guidelines.',
  },
  {
    id: 'FS-031',
    slug: 'casserole',
    food: 'Casserole',
    foodCategory: 'prepared-foods',
    state: 'cooked',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 3,
        maxDays: 4,
        formatted: '3–4 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Cover tightly with foil or a lid.',
      },
      {
        location: 'freezer',
        minDays: 60,
        maxDays: 90,
        formatted: '2–3 months',
        tempRange: '0°F (−18°C)',
        notes: 'Freeze in portions for quicker, more even reheating.',
      },
    ],
    bestMethod:
      'Cover the baking dish tightly with aluminum foil or transfer portions to airtight containers before refrigerating.',
    containerType: 'Foil-covered baking dish or airtight portion-sized containers',
    spoilageSigns: [
      'Sour or off smell',
      'Mold spots on surface',
      'Watery or separated liquid',
      'Slimy or discolored top layer',
    ],
    safetyNote:
      'Reheat casseroles to 165°F (74°C) throughout — check the center with a food thermometer.',
    proTip:
      'Line the baking dish with foil before assembling, freeze the casserole, then pop it out — now the dish is free and the casserole is stackable.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does casserole last in the fridge',
      'can you freeze casserole',
      'leftover casserole shelf life',
      'how long is casserole good for',
      'how to store leftover casserole',
      'casserole storage time',
    ],
    metaDescription:
      'Casserole lasts 3–4 days in the fridge and 2–3 months in the freezer. Portioning, storage, and reheating tips.',
  },
  {
    id: 'FS-032',
    slug: 'guacamole',
    food: 'Guacamole',
    foodCategory: 'prepared-foods',
    state: 'cooked',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 1,
        maxDays: 3,
        formatted: '1–3 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Press plastic wrap directly onto surface to prevent browning.',
      },
      {
        location: 'freezer',
        minDays: 90,
        maxDays: 120,
        formatted: '3–4 months',
        tempRange: '0°F (−18°C)',
        notes: 'Texture is best for dips and spreads after thawing, not topping.',
      },
    ],
    bestMethod:
      'Press plastic wrap directly onto the surface of the guacamole (no air gap), seal the container, and refrigerate.',
    containerType: 'Airtight container with plastic wrap pressed on surface',
    spoilageSigns: [
      'Dark brown or black throughout (not just surface)',
      'Sour or fermented smell',
      'Watery separation with off odor',
      'Mold spots on surface',
    ],
    safetyNote:
      'Surface browning (oxidation) is cosmetic and safe — stir it in. Discard only if it smells sour or has mold.',
    proTip:
      'Squeeze a thin layer of lime juice on top before pressing the plastic wrap — the acid creates a barrier that keeps it green for days.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does guacamole last in the fridge',
      'can you freeze guacamole',
      'guacamole shelf life',
      'how long is guacamole good for',
      'how to keep guacamole from turning brown',
      'how to store guacamole',
    ],
    metaDescription:
      'Guacamole lasts 1–3 days in the fridge and 3–4 months frozen. Tips to prevent browning and keep it fresh longer.',
  },
  {
    id: 'FS-033',
    slug: 'mashed-potatoes',
    food: 'Mashed Potatoes',
    foodCategory: 'prepared-foods',
    state: 'cooked',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 3,
        maxDays: 5,
        formatted: '3–5 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Store in a sealed container to prevent drying out.',
      },
      {
        location: 'freezer',
        minDays: 60,
        maxDays: 365,
        formatted: '2–12 months',
        tempRange: '0°F (−18°C)',
        notes: 'Extra butter and cream helps them freeze better.',
      },
    ],
    bestMethod:
      'Transfer to a shallow airtight container while still slightly warm (but not hot) and refrigerate promptly.',
    containerType: 'Airtight container or resealable freezer bag (flattened)',
    spoilageSigns: [
      'Sour or off smell',
      'Watery liquid separation',
      'Mold spots on surface',
      'Gluey or sticky texture change',
    ],
    safetyNote:
      'Like all prepared foods, discard mashed potatoes left at room temperature for more than 2 hours.',
    proTip:
      'Add a little extra butter and cream to potatoes you plan to freeze — the fat protects the texture and they reheat like fresh.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long do mashed potatoes last in the fridge',
      'can you freeze mashed potatoes',
      'mashed potatoes shelf life',
      'how long are mashed potatoes good for',
      'how to store leftover mashed potatoes',
      'leftover mashed potatoes storage',
    ],
    metaDescription:
      'Mashed potatoes last 3–5 days in the fridge and up to 12 months frozen. Storage tips for creamy reheated potatoes.',
  },
  {
    id: 'FS-034',
    slug: 'macaroni-and-cheese',
    food: 'Macaroni and Cheese',
    foodCategory: 'prepared-foods',
    state: 'cooked',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 3,
        maxDays: 5,
        formatted: '3–5 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Cover tightly to prevent a dried-out surface.',
      },
      {
        location: 'freezer',
        minDays: 30,
        maxDays: 60,
        formatted: '1–2 months',
        tempRange: '0°F (−18°C)',
        notes: 'Cream-based sauces may separate slightly — stir well after reheating.',
      },
    ],
    bestMethod:
      'Transfer to a shallow airtight container, cover tightly, and refrigerate within 2 hours.',
    containerType: 'Shallow airtight container or foil-covered baking dish',
    spoilageSigns: [
      'Sour or off smell',
      'Mold on surface or edges',
      'Grainy or separated sauce',
      'Slimy texture on pasta',
    ],
    safetyNote:
      'Dairy-based dishes like mac and cheese are perishable — do not leave at room temperature for more than 2 hours.',
    proTip:
      'When reheating, stir in a splash of milk before microwaving — it brings the creamy sauce back to life.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does mac and cheese last in the fridge',
      'can you freeze macaroni and cheese',
      'leftover mac and cheese shelf life',
      'how long is mac and cheese good for',
      'how to store leftover mac and cheese',
      'macaroni and cheese storage time',
    ],
    metaDescription:
      'Mac and cheese lasts 3–5 days in the fridge and 1–2 months frozen. Reheating tips to keep it creamy, not grainy.',
  },

  // ── PRODUCE ─────────────────────────────────────────────────────────
  {
    id: 'FS-035',
    slug: 'cut-avocado',
    food: 'Cut Avocado',
    foodCategory: 'produce',
    state: 'raw',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 1,
        maxDays: 3,
        formatted: '1–3 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Leave the pit in the unused half and wrap tightly.',
      },
      {
        location: 'freezer',
        minDays: 90,
        maxDays: 180,
        formatted: '3–6 months',
        tempRange: '0°F (−18°C)',
        notes: 'Mash with lemon juice before freezing for best results.',
      },
    ],
    bestMethod:
      'Brush the exposed flesh with lemon juice, press plastic wrap directly against the surface, and refrigerate.',
    containerType: 'Tightly wrapped in plastic wrap, or airtight container with lemon juice',
    spoilageSigns: [
      'Dark brown or black flesh throughout',
      'Mushy or slimy texture',
      'Sour or off smell',
      'Mold on skin or surface',
    ],
    safetyNote:
      'Minor surface browning is oxidation and safe to eat — scrape it off. Discard if the entire interior is brown and mushy.',
    proTip:
      'Store a cut avocado face-down in a container with a thin layer of water on the bottom — it blocks air and stays green for days.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long does cut avocado last in the fridge',
      'how to keep avocado from turning brown',
      'can you freeze avocado',
      'cut avocado shelf life',
      'how long is avocado good for',
      'how to store half an avocado',
      'avocado storage tips',
    ],
    metaDescription:
      'Cut avocado lasts 1–3 days in the fridge and 3–6 months frozen (mashed). Tips to prevent browning and extend freshness.',
  },
  {
    id: 'FS-036',
    slug: 'cooked-vegetables',
    food: 'Cooked Vegetables (General)',
    foodCategory: 'produce',
    state: 'cooked',
    storageTimeframes: [
      {
        location: 'fridge',
        minDays: 3,
        maxDays: 7,
        formatted: '3–7 days',
        tempRange: '32°F–40°F (0°C–4°C)',
        notes: 'Dense vegetables (root veg) last longer than leafy ones.',
      },
      {
        location: 'freezer',
        minDays: 60,
        maxDays: 365,
        formatted: '2–12 months',
        tempRange: '0°F (−18°C)',
        notes: 'Blanched vegetables freeze better than fully cooked.',
      },
    ],
    bestMethod:
      'Cool quickly, then store in shallow airtight containers. Keep different vegetables separate when possible.',
    containerType: 'Shallow airtight container or resealable freezer bag',
    spoilageSigns: [
      'Slimy or mushy texture',
      'Sour or fermented smell',
      'Visible mold growth',
      'Dark discoloration or wilting',
    ],
    safetyNote:
      'Like all cooked foods, vegetables should be refrigerated within 2 hours and reheated to 165°F (74°C).',
    proTip:
      'Roast a big sheet pan of mixed vegetables on Sunday and store them — they hold up great all week for grain bowls, wraps, and sides.',
    verificationBasis: 'USDA FoodSafety.gov Cold Food Storage Chart',
    keywords: [
      'how long do cooked vegetables last in the fridge',
      'can you freeze cooked vegetables',
      'leftover vegetables shelf life',
      'how long are cooked veggies good for',
      'how to store leftover vegetables',
      'cooked vegetables storage time',
      'how to freeze roasted vegetables',
    ],
    metaDescription:
      'Cooked vegetables last 3–7 days in the fridge and 2–12 months frozen. Storage tips for meal prep and reducing food waste.',
  },
];
