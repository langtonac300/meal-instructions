import type { ProteinType } from '@/lib/types';

/**
 * The pantry vocabulary behind /what-can-i-make.
 *
 * Recipe ingredient lines are free text ("bone-in, skin-on chicken thighs",
 * "kosher salt & black pepper"). Each pantry item below owns a few regex
 * sources; a line belongs to every item whose pattern hits it and whose
 * exclusions do not. The mapping is checked by `npm run report:pantry`, which
 * lists every ingredient line that maps to nothing — run it after adding
 * recipes, and add a pattern here rather than editing the recipe.
 *
 * Nothing in here is a number: which meals show, and what they are missing,
 * is derived from the recipe data at render time (HR-2).
 */
export interface PantryItem {
  id: string;
  label: string;
  /** Case-insensitive regex sources tested against ingredient lines, and against the recipe title. */
  match: string[];
  /** A text matching any of these is not this item, even when `match` hits ("garlic powder" is not fresh garlic). */
  exclude?: string[];
  /** Extra sources tested against the title only ("Cheesy …" makes the cheese required). */
  titleMatch?: string[];
  /** Meat, seafood, eggs: when this covers the recipe's main protein, the item is required. */
  protein?: ProteinType | ProteinType[];
  /**
   * Items that stand in for each other when only the family is named. A title
   * saying "cheese" requires one cheese the recipe uses, not every one of them.
   */
  family?: string;
  /** Having any of these counts as having this one (garlic powder for fresh garlic, lime for lemon). */
  swaps?: string[];
  /**
   * Cuts that can stand in for this one with a note: a required item whose
   * cousin is ticked is listed as missing instead of hiding the meal, so
   * thigh recipes stay in view for someone with breasts.
   */
  cousins?: string[];
}

export interface PantryGroup {
  id: string;
  label: string;
  items: PantryItem[];
}

const CHEESE_TITLE = ['\\bchees(e|y)\\b', 'cheeseburger', 'quesadilla', 'pizza'];

export const PANTRY_GROUPS: PantryGroup[] = [
  {
    id: 'meat',
    label: 'Meat & poultry',
    items: [
      {
        id: 'chicken-breast',
        label: 'Chicken breast',
        match: ['chicken breasts?', 'chicken cutlets?', 'chicken tenderloins?', 'chicken tenders?'],
        protein: 'chicken',
        cousins: ['chicken-thighs'],
      },
      {
        id: 'chicken-thighs',
        label: 'Chicken thighs',
        match: ['chicken thighs?'],
        protein: 'chicken',
        cousins: ['chicken-breast'],
      },
      {
        id: 'chicken-wings',
        label: 'Chicken wings',
        match: ['chicken (party )?wings?', 'party wings'],
        protein: 'chicken',
      },
      {
        id: 'chicken-whole',
        label: 'Whole chicken / pieces',
        match: [
          'whole chickens?',
          'chicken pieces',
          'chicken drumsticks?',
          'chicken (leg )?quarters',
          'cornish (game )?hens?',
        ],
        protein: 'chicken',
      },
      {
        id: 'chicken-cooked',
        label: 'Cooked / rotisserie chicken',
        match: ['rotisserie chicken', 'shredded chicken', 'cooked chicken'],
        protein: 'chicken',
        cousins: ['chicken-breast', 'chicken-thighs'],
      },
      {
        id: 'ground-beef',
        label: 'Ground beef',
        match: ['ground beef', 'ground chuck'],
        protein: 'beef',
        cousins: ['ground-turkey', 'ground-pork'],
      },
      {
        id: 'steak',
        label: 'Steak',
        match: ['steaks?\\b', 'ribeye', 'sirloin', 'filet mignon', 'flank', 'skirt'],
        exclude: ['tuna'],
        protein: 'beef',
      },
      {
        id: 'beef-roast',
        label: 'Beef roast (chuck, rib, short ribs)',
        match: ['chuck roast', 'rib roast', 'tri-tip', 'short ribs', 'pot roast'],
        protein: 'beef',
      },
      { id: 'brisket', label: 'Brisket', match: ['brisket'], protein: 'beef' },
      {
        id: 'pork-chops',
        label: 'Pork chops',
        match: ['pork( rib)? chops?'],
        protein: 'pork',
        cousins: ['pork-tenderloin'],
      },
      {
        id: 'pork-shoulder',
        label: 'Pork shoulder / butt',
        match: ['pork shoulder', 'pork butt', 'boston butt'],
        protein: 'pork',
      },
      {
        id: 'pork-tenderloin',
        label: 'Pork tenderloin',
        match: ['pork tenderloins?'],
        protein: 'pork',
        cousins: ['pork-chops'],
      },
      {
        id: 'pork-ribs',
        label: 'Pork ribs',
        match: ['pork ribs', 'back ribs', 'st\\. louis', 'spare ?ribs'],
        protein: 'pork',
      },
      { id: 'pork-belly', label: 'Pork belly', match: ['pork belly'], protein: 'pork' },
      {
        id: 'ground-pork',
        label: 'Ground pork',
        match: ['ground pork'],
        protein: 'pork',
        cousins: ['ground-beef', 'ground-turkey'],
      },
      { id: 'bacon', label: 'Bacon', match: ['bacon'], protein: 'pork' },
      {
        id: 'sausage',
        label: 'Sausage (fresh or smoked)',
        match: ['sausage', 'kielbasa', 'andouille', 'bratwurst', 'chorizo'],
        exclude: ['buns?'],
        protein: 'pork',
      },
      { id: 'ham', label: 'Ham', match: ['\\bham\\b'], protein: 'pork' },
      {
        id: 'ground-turkey',
        label: 'Ground turkey',
        match: ['ground turkey'],
        protein: 'turkey',
        cousins: ['ground-beef'],
      },
      {
        id: 'turkey',
        label: 'Turkey (whole or breast)',
        match: ['turkey breasts?', 'whole turkey'],
        protein: 'turkey',
      },
      { id: 'lamb', label: 'Lamb', match: ['\\blamb\\b'], protein: 'lamb' },
      { id: 'duck', label: 'Duck', match: ['\\bduck\\b'], protein: 'duck' },
      { id: 'venison', label: 'Venison', match: ['venison'], protein: 'game' },
    ],
  },
  {
    id: 'seafood',
    label: 'Seafood',
    items: [
      { id: 'shrimp', label: 'Shrimp', match: ['shrimp', 'prawns?'], protein: 'seafood' },
      { id: 'salmon', label: 'Salmon', match: ['salmon'], protein: 'seafood' },
      {
        id: 'white-fish',
        label: 'White fish (cod, tilapia, mahi)',
        match: ['\\bcod\\b', 'tilapia', 'mahi', 'white fish', 'halibut', 'haddock'],
        protein: 'seafood',
      },
      { id: 'tuna-steak', label: 'Tuna steak', match: ['tuna'], protein: 'seafood' },
      { id: 'scallops', label: 'Scallops', match: ['scallops?'], protein: 'seafood' },
      { id: 'crab', label: 'Crab', match: ['\\bcrab\\b'], protein: 'seafood' },
      { id: 'lobster', label: 'Lobster', match: ['lobster'], protein: 'seafood' },
    ],
  },
  {
    id: 'dairy',
    label: 'Dairy & eggs',
    items: [
      {
        id: 'eggs',
        label: 'Eggs',
        match: ['\\beggs?\\b'],
        exclude: ['noodles?', 'egg roll', 'eggplant'],
        protein: 'dairy-eggs',
      },
      {
        id: 'butter',
        label: 'Butter',
        match: ['butter'],
        exclude: ['peanut butter', 'buttermilk', 'butternut'],
      },
      { id: 'milk', label: 'Milk', match: ['\\bmilk\\b'], exclude: ['coconut'] },
      {
        id: 'heavy-cream',
        label: 'Heavy cream',
        match: ['heavy (whipping )?cream', 'half-and-half', 'whipping cream'],
      },
      {
        id: 'sour-cream',
        label: 'Sour cream',
        match: ['sour cream', '\\bcrema\\b'],
        swaps: ['yogurt'],
      },
      { id: 'cream-cheese', label: 'Cream cheese', match: ['cream cheese'] },
      {
        id: 'cheddar',
        label: 'Cheddar / American',
        match: ['cheddar', 'american cheese', 'mexican blend', 'colby'],
        titleMatch: CHEESE_TITLE,
        family: 'cheese',
      },
      {
        id: 'mozzarella',
        label: 'Mozzarella',
        match: ['mozzarella'],
        exclude: ['sticks'],
        titleMatch: CHEESE_TITLE,
        family: 'cheese',
      },
      {
        id: 'parmesan',
        label: 'Parmesan',
        match: ['parmesan', 'pecorino', 'parmigiano'],
        titleMatch: CHEESE_TITLE,
        family: 'cheese',
      },
      {
        id: 'jack-cheese',
        label: 'Monterey / pepper jack',
        match: ['monterey', 'pepper jack', 'colby jack'],
        titleMatch: CHEESE_TITLE,
        family: 'cheese',
      },
      {
        id: 'other-cheese',
        label: 'Other cheese (provolone, feta, gruyère, blue…)',
        match: [
          'provolone',
          'feta',
          'gruy[eè]re',
          'gouda',
          'blue cheese',
          'cotija',
          'queso fresco',
          'ricotta',
          'swiss cheese',
          'goat cheese',
        ],
        titleMatch: CHEESE_TITLE,
        family: 'cheese',
      },
      { id: 'buttermilk', label: 'Buttermilk', match: ['buttermilk'], exclude: ['biscuits?'] },
      { id: 'yogurt', label: 'Plain yogurt', match: ['yogurt', 'yoghurt'] },
    ],
  },
  {
    id: 'produce',
    label: 'Produce',
    items: [
      {
        id: 'onion',
        label: 'Onion',
        match: ['onions?\\b'],
        exclude: ['powder', 'green onion', 'soup mix'],
        swaps: ['onion-powder'],
      },
      {
        id: 'garlic',
        label: 'Garlic (fresh)',
        match: ['garlic'],
        exclude: ['powder'],
        swaps: ['garlic-powder'],
      },
      {
        id: 'green-onions',
        label: 'Green onions / chives',
        match: ['green onions?', 'scallions?', 'chives'],
      },
      { id: 'ginger', label: 'Fresh ginger', match: ['ginger'] },
      {
        id: 'bell-peppers',
        label: 'Bell peppers',
        match: ['bell peppers?'],
        titleMatch: ['\\bpeppers\\b', 'fajita'],
      },
      { id: 'jalapeno', label: 'Jalapeño', match: ['jalape[nñ]o'], exclude: ['pickled'] },
      { id: 'carrots', label: 'Carrots', match: ['carrots?'], exclude: ['coleslaw', 'frozen'] },
      { id: 'celery', label: 'Celery', match: ['celery'] },
      {
        id: 'potatoes',
        label: 'Potatoes',
        match: ['potato(es)?'],
        exclude: ['sweet potato', 'buns', 'gnocchi', 'chips'],
        titleMatch: ['hash browns?'],
      },
      { id: 'sweet-potatoes', label: 'Sweet potatoes', match: ['sweet potato(es)?'] },
      {
        id: 'tomatoes',
        label: 'Fresh tomatoes',
        match: ['tomato(es)?'],
        exclude: [
          'paste',
          'sauce',
          'crushed',
          'diced',
          'canned',
          'sun-dried',
          'whole peeled',
          'salsa',
          'fire-roasted',
          'lettuce',
        ],
      },
      { id: 'lemon', label: 'Lemon', match: ['lemon'], swaps: ['lime'] },
      { id: 'lime', label: 'Lime', match: ['\\blimes?\\b'], swaps: ['lemon'] },
      { id: 'orange', label: 'Orange', match: ['orange'] },
      { id: 'parsley', label: 'Fresh parsley', match: ['parsley'] },
      { id: 'cilantro', label: 'Fresh cilantro', match: ['cilantro'] },
      { id: 'basil', label: 'Fresh basil', match: ['basil'], exclude: ['dried'] },
      {
        id: 'fresh-thyme-rosemary',
        label: 'Fresh thyme / rosemary',
        match: ['fresh (thyme|rosemary)'],
        swaps: ['dried-thyme', 'dried-rosemary'],
      },
      {
        id: 'fresh-dill-sage',
        label: 'Fresh dill / sage / oregano',
        match: ['fresh dill', 'fresh sage', 'fresh oregano', 'dill or parsley'],
      },
      { id: 'broccoli', label: 'Broccoli', match: ['broccoli'] },
      { id: 'cauliflower', label: 'Cauliflower', match: ['cauliflower'] },
      { id: 'brussels', label: 'Brussels sprouts', match: ['brussels?'] },
      { id: 'asparagus', label: 'Asparagus', match: ['asparagus'] },
      { id: 'green-beans', label: 'Green beans', match: ['green beans'] },
      { id: 'spinach', label: 'Spinach', match: ['spinach'] },
      { id: 'cabbage', label: 'Cabbage / slaw mix', match: ['cabbage', 'coleslaw', '\\bslaw\\b'] },
      { id: 'mushrooms', label: 'Mushrooms', match: ['mushrooms?', 'cremini', 'portobello'] },
      { id: 'zucchini', label: 'Zucchini', match: ['zucchini'] },
      {
        id: 'corn',
        label: 'Corn (fresh or frozen)',
        match: ['\\bcorn\\b'],
        exclude: ['tortilla', 'cornstarch', 'cornmeal', 'popcorn'],
      },
      { id: 'avocado', label: 'Avocado', match: ['avocado', 'guacamole'], exclude: ['oil'] },
      {
        id: 'apples',
        label: 'Apples / pears',
        match: ['\\bapples?\\b', 'asian pear'],
        exclude: ['cider', 'juice'],
      },
      { id: 'bananas', label: 'Bananas', match: ['bananas?'] },
      { id: 'mango', label: 'Mango', match: ['mango'] },
      { id: 'tofu', label: 'Tofu', match: ['tofu'], protein: 'vegetarian' },
    ],
  },
  {
    id: 'pantry',
    label: 'Pantry & dry goods',
    items: [
      {
        id: 'olive-oil',
        label: 'Olive oil',
        match: ['olive oil'],
        exclude: ['spray'],
        swaps: ['neutral-oil'],
      },
      {
        id: 'neutral-oil',
        label: 'Neutral oil (canola, vegetable, avocado)',
        match: [
          'avocado oil',
          'canola',
          'vegetable oil',
          'neutral( frying| vegetable)? oil',
          'frying oil',
          'tallow',
          'peanut oil',
        ],
        exclude: ['spray'],
        swaps: ['olive-oil'],
      },
      {
        id: 'cooking-spray',
        label: 'Cooking spray',
        match: ['cooking spray', 'oil spray'],
      },
      {
        id: 'flour',
        label: 'All-purpose flour',
        match: ['flour'],
        exclude: ['tortillas?'],
      },
      {
        id: 'sugar',
        label: 'Sugar',
        match: ['\\bsugar\\b'],
        exclude: ['brown', 'powdered'],
      },
      { id: 'brown-sugar', label: 'Brown sugar', match: ['brown sugar'] },
      { id: 'powdered-sugar', label: 'Powdered sugar', match: ['powdered sugar'] },
      { id: 'cornstarch', label: 'Cornstarch', match: ['cornstarch', 'corn starch'] },
      { id: 'baking-powder-soda', label: 'Baking powder / soda', match: ['baking (powder|soda)'] },
      { id: 'yeast', label: 'Yeast', match: ['yeast'] },
      { id: 'cornmeal', label: 'Cornmeal', match: ['cornmeal'], titleMatch: ['cornbread'] },
      { id: 'breadcrumbs', label: 'Breadcrumbs / panko', match: ['panko', 'bread ?crumbs'] },
      {
        id: 'pasta',
        label: 'Pasta',
        match: [
          'pasta',
          'macaroni',
          'spaghetti',
          'penne',
          'rigatoni',
          'ziti',
          'fettuccine',
          'lasagna',
          'egg noodles',
          'linguine',
        ],
        titleMatch: ['\\bmac\\b'],
      },
      { id: 'rice', label: 'Rice', match: ['\\brice\\b'], exclude: ['vinegar'] },
      { id: 'oats', label: 'Oats', match: ['\\boats\\b', 'oatmeal'] },
      { id: 'lentils', label: 'Lentils / split peas', match: ['lentils?', 'split peas?'] },
      { id: 'quinoa', label: 'Quinoa', match: ['quinoa'] },
      {
        id: 'beans',
        label: 'Canned beans (black, kidney, white)',
        match: [
          'black beans?',
          'kidney beans?',
          'cannellini',
          'chickpeas?',
          'pinto beans?',
          'white beans?',
          'navy beans?',
        ],
      },
      {
        id: 'canned-tomatoes',
        label: 'Canned tomatoes',
        match: [
          'crushed( san marzano)? tomatoes',
          'diced tomatoes',
          'whole peeled tomatoes',
          'canned tomatoes',
        ],
      },
      { id: 'tomato-paste', label: 'Tomato paste', match: ['tomato paste'] },
      {
        id: 'broth',
        label: 'Broth, stock, or soup mix',
        match: ['broth', 'stock\\b', 'consomm[eé]', 'bouillon', 'soup mix'],
      },
      { id: 'coconut-milk', label: 'Coconut milk', match: ['coconut milk'] },
      {
        id: 'tortillas',
        label: 'Tortillas',
        match: ['tortillas?'],
        exclude: ['chips', 'strips'],
        titleMatch: ['\\btacos?\\b', 'fajita', 'quesadilla', 'burrito', 'enchilada'],
      },
      {
        id: 'tortilla-chips',
        label: 'Tortilla chips',
        match: ['tortilla (chips|strips)', 'nachos'],
      },
      {
        id: 'bread',
        label: 'Bread / buns / rolls',
        match: [
          'buns?\\b',
          'rolls?\\b',
          'bread\\b',
          'pita',
          'hoagie',
          'sourdough',
          'brioche',
          'baguette',
        ],
        exclude: ['bread ?crumbs', 'bread flour', 'egg roll'],
        titleMatch: ['toast', 'sandwich(es)?', 'sliders?', '\\bsubs?\\b', 'french dip'],
      },
      { id: 'honey', label: 'Honey', match: ['\\bhoney\\b'] },
      { id: 'maple-syrup', label: 'Maple syrup', match: ['maple syrup'] },
      {
        id: 'vinegar',
        label: 'Vinegar (cider, rice, balsamic, red wine)',
        match: ['vinegar', 'balsamic'],
      },
      {
        id: 'wine',
        label: 'Wine',
        match: ['\\bwine\\b', 'burgundy', 'pinot'],
        exclude: ['vinegar'],
      },
      { id: 'beer', label: 'Beer', match: ['\\bbeer\\b', 'lager'] },
      {
        id: 'apple-juice',
        label: 'Apple juice / cider',
        match: ['apple (juice|cider)'],
        exclude: ['vinegar'],
      },
      {
        id: 'nuts',
        label: 'Nuts (walnuts, pecans, almonds)',
        match: ['walnuts?', 'pecans?', 'almonds?', 'peanuts', 'cashews?'],
      },
      { id: 'vanilla', label: 'Vanilla / cocoa', match: ['vanilla', 'cocoa'] },
    ],
  },
  {
    id: 'spices',
    label: 'Spices & dried herbs',
    items: [
      { id: 'salt', label: 'Salt', match: ['\\bsalt\\b'] },
      {
        id: 'black-pepper',
        label: 'Black pepper',
        match: ['black pepper', 'cracked pepper', 'white pepper', 'peppercorns?'],
      },
      {
        id: 'garlic-powder',
        label: 'Garlic powder',
        match: ['garlic powder'],
        swaps: ['garlic'],
      },
      {
        id: 'onion-powder',
        label: 'Onion powder',
        match: ['onion powder'],
        swaps: ['onion'],
      },
      {
        id: 'smoked-paprika',
        label: 'Smoked paprika',
        match: ['smoked paprika'],
        swaps: ['paprika'],
      },
      {
        id: 'paprika',
        label: 'Paprika (sweet)',
        match: ['paprika'],
        exclude: ['smoked'],
        swaps: ['smoked-paprika'],
      },
      { id: 'cumin', label: 'Cumin', match: ['cumin'] },
      { id: 'chili-powder', label: 'Chili powder', match: ['chili powder'] },
      { id: 'oregano', label: 'Dried oregano', match: ['oregano'], exclude: ['fresh'] },
      {
        id: 'dried-thyme',
        label: 'Dried thyme',
        match: ['dried thyme', 'rosemary & thyme', 'sage & thyme'],
        exclude: ['fresh'],
        swaps: ['fresh-thyme-rosemary'],
      },
      {
        id: 'dried-rosemary',
        label: 'Dried rosemary',
        match: ['dried rosemary'],
        swaps: ['fresh-thyme-rosemary'],
      },
      { id: 'italian-seasoning', label: 'Italian seasoning', match: ['italian (herb )?seasoning'] },
      { id: 'cayenne', label: 'Cayenne', match: ['cayenne'] },
      { id: 'red-pepper-flakes', label: 'Red pepper flakes', match: ['pepper flakes', 'aleppo'] },
      { id: 'cinnamon', label: 'Cinnamon', match: ['cinnamon'] },
      { id: 'taco-seasoning', label: 'Taco seasoning', match: ['taco seasoning'] },
      { id: 'old-bay', label: 'Old Bay', match: ['old bay'] },
      {
        id: 'cajun',
        label: 'Cajun / blackening seasoning',
        match: ['cajun', 'blackened', 'blackening'],
      },
      {
        id: 'garam-masala',
        label: 'Garam masala / curry powder',
        match: ['garam masala', 'curry powder'],
      },
      { id: 'turmeric', label: 'Turmeric', match: ['turmeric'] },
      { id: 'coriander', label: 'Ground coriander', match: ['coriander'] },
      { id: 'mustard-powder', label: 'Mustard powder', match: ['mustard powder', 'dry mustard'] },
      { id: 'bay-leaves', label: 'Bay leaves', match: ['bay lea(f|ves)'] },
      { id: 'sesame-seeds', label: 'Sesame seeds', match: ['sesame seeds'] },
      { id: 'bbq-rub', label: 'BBQ rub', match: ['dry rub', '\\brub\\b'] },
      {
        id: 'other-dried-herbs',
        label: 'Other dried herbs (basil, dill, poultry seasoning)',
        match: [
          'dried basil',
          'dried dill',
          'dried sage',
          'poultry seasoning',
          'herbes de provence',
        ],
        swaps: ['italian-seasoning'],
      },
      {
        id: 'other-spices',
        label: 'Other spices (five-spice, cloves, caraway)',
        match: ['five.spice', '\\bcloves\\b', 'caraway', 'allspice', 'nutmeg', 'cardamom'],
        exclude: ['garlic cloves?'],
      },
    ],
  },
  {
    id: 'condiments',
    label: 'Condiments & sauces',
    items: [
      { id: 'mayo', label: 'Mayonnaise', match: ['mayo(nnaise)?'] },
      { id: 'ketchup', label: 'Ketchup', match: ['ketchup'] },
      {
        id: 'mustard',
        label: 'Mustard (yellow, brown, whole-grain)',
        match: [
          'yellow mustard',
          'spicy brown mustard',
          'whole-grain mustard',
          'stone-ground mustard',
        ],
        swaps: ['dijon'],
      },
      { id: 'dijon', label: 'Dijon mustard', match: ['dijon'], swaps: ['mustard'] },
      { id: 'worcestershire', label: 'Worcestershire', match: ['worcestershire'] },
      { id: 'soy-sauce', label: 'Soy sauce', match: ['soy sauce', 'tamari'] },
      {
        id: 'hot-sauce',
        label: 'Hot sauce (Frank’s, sriracha)',
        match: ['hot sauce', "frank'?s", 'sriracha', 'chili crisp', 'buffalo'],
      },
      {
        id: 'bbq-sauce',
        label: 'BBQ sauce',
        match: ['bbq sauce', 'barbecue sauce', 'or bbq'],
        titleMatch: ['\\bbbq\\b', 'barbecue'],
      },
      {
        id: 'marinara',
        label: 'Marinara / tomato sauce',
        match: ['marinara', 'tomato sauce', 'pizza sauce'],
      },
      {
        id: 'salsa',
        label: 'Salsa / enchilada sauce / green chiles',
        match: ['salsa', 'enchilada sauce', 'green chiles'],
      },
      { id: 'sesame-oil', label: 'Sesame oil', match: ['sesame oil'] },
      {
        id: 'asian-sauces',
        label: 'Hoisin / gochujang / mirin',
        match: ['hoisin', 'gochujang', 'mirin', 'oyster sauce', 'fish sauce'],
      },
      { id: 'pickles', label: 'Pickles / pickled jalapeños', match: ['pickles?\\b', 'pickled'] },
      {
        id: 'jarred-bits',
        label: 'Olives, capers, sun-dried tomatoes',
        match: ['capers', 'olives', 'sun-dried'],
      },
      { id: 'ranch', label: 'Ranch dressing', match: ['ranch'] },
      { id: 'chipotle-adobo', label: 'Chipotles in adobo', match: ['chipotle', 'adobo'] },
    ],
  },
  {
    id: 'frozen',
    label: 'Freezer & convenience',
    items: [
      {
        id: 'frozen-fries',
        label: 'Frozen fries / tots',
        match: ['french fries', 'tater tots?', 'frozen fries'],
        titleMatch: ['\\bfries\\b'],
      },
      {
        id: 'frozen-nuggets',
        label: 'Frozen chicken nuggets',
        match: ['chicken nuggets'],
        protein: 'chicken',
      },
      {
        id: 'frozen-taquitos',
        label: 'Frozen taquitos',
        match: ['taquitos'],
        protein: ['chicken', 'beef'],
      },
      {
        id: 'frozen-mozz-sticks',
        label: 'Frozen mozzarella sticks',
        match: ['mozzarella sticks'],
        protein: 'dairy-eggs',
      },
      {
        id: 'potstickers',
        label: 'Frozen potstickers',
        match: ['potstickers', 'gyoza'],
        protein: ['pork', 'chicken'],
      },
      {
        id: 'frozen-veg',
        label: 'Frozen vegetables (peas, mixed)',
        match: [
          'frozen (sweet )?peas',
          'peas and carrots',
          'pearl onions',
          'stir-fry vegetable',
          'frozen vegetables',
        ],
      },
      { id: 'biscuit-dough', label: 'Canned biscuit dough', match: ['biscuits'] },
      { id: 'tortellini-gnocchi', label: 'Tortellini / gnocchi', match: ['tortellini', 'gnocchi'] },
      {
        id: 'meatballs',
        label: 'Cooked meatballs',
        match: ['meatballs'],
        protein: ['turkey', 'beef', 'pork'],
      },
    ],
  },
];

export const PANTRY_ITEMS: PantryItem[] = PANTRY_GROUPS.flatMap((g) => g.items);

export const PANTRY_ITEM_BY_ID: ReadonlyMap<string, PantryItem> = new Map(
  PANTRY_ITEMS.map((item) => [item.id, item]),
);
