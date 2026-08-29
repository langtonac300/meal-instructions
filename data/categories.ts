import { CategoryMeta } from '@/lib/types';

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: '15-minute',
    name: '15-Minute Meals',
    shortDescription: 'From cold fridge to hot dinner table in 15 minutes flat. High-speed dinners before meltdown.',
    fullDescription: 'Every meal here is engineered for maximum speed. No marinating, no multi-pot choreography, no extended prep. Just high heat, simple seasoning, and dinner on the table.',
    heroTag: 'SUB-15 MINUTE EXECUTION',
    image: '/images/categories/15-minute-skillet.jpg'
  },
  {
    slug: 'high-protein',
    name: 'High Protein / Lean',
    shortDescription: 'Steak, chicken, salmon, and ground beef macros that fill the family with 30g+ protein per serving.',
    fullDescription: 'High-protein dinners built around whole muscle meats, poultry, and fish. Low filler, zero starch sludge, high satiety.',
    heroTag: '30G+ PROTEIN PER SERVING',
    image: '/images/categories/high-protein-plate.jpg'
  },
  {
    slug: 'kid-approved',
    name: 'Kid & Toddler Approved',
    shortDescription: 'Unanimous dinner table approvals. Zero vegetable negotiations and easy modifications.',
    fullDescription: 'Meals tested on real kids. Includes plain-flavor adjustments, sauce separation tips, and picky-eater modifications that keep everyone eating from one meal.',
    heroTag: 'UNANIMOUS TABLE APPROVAL',
    image: '/images/categories/kid-approved-nuggets.jpg'
  },
  {
    slug: 'budget',
    name: 'Budget & Pantry Staples',
    shortDescription: 'Under $12 total family meal costs using everyday grocery staples with zero specialty imports.',
    fullDescription: 'Cost-effective dinners utilizing ground beef, chicken thighs, canned tomatoes, potatoes, and pantry spices to deliver restaurant-level satisfaction under $3/serving.',
    heroTag: 'UNDER $12 FAMILY MEAL',
    image: '/images/categories/budget-taco-skillet.jpg'
  },
  {
    slug: 'no-thaw',
    name: 'No-Thaw / From Frozen',
    shortDescription: 'Forgot to thaw the meat? Cook chicken tenders, salmon, and burgers straight from frozen with zero prep.',
    fullDescription: 'Specific air fryer and convection time curves calibrated to thaw the center and crisp the exterior simultaneously without drying out.',
    heroTag: 'ZERO DEFROST REQUIRED',
    image: '/images/hero/lemon-salmon.jpg'
  },
  {
    slug: 'one-pan',
    name: 'One-Pan & Sheet Pan',
    shortDescription: 'Cook the protein and side simultaneously on a single pan or skillet. Zero sink full of pots.',
    fullDescription: 'Single-vessel cooking workflows using rimmed sheet pans, large skillets, or Dutch ovens so cleanup takes under 2 minutes.',
    heroTag: 'SINGLE VESSEL CLEANUP',
    image: '/images/hero/sheet-pan-fajitas.jpg'
  },
  {
    slug: 'five-ingredient',
    name: 'Five-Ingredient Staples',
    shortDescription: 'Short grocery lists using 5 core ingredients or less plus pantry salt, pepper, and cooking oil.',
    fullDescription: 'Minimalist recipes where high cooking technique and proper temperature control replace long ingredient lists.',
    heroTag: '5 INGREDIENTS OR FEWER',
    image: '/images/hero/steak-bites.jpg'
  },
  {
    slug: 'sides',
    name: 'Rapid Sides & Veggies',
    shortDescription: 'Crispy broccoli, asparagus, fries, baked potatoes, and garlic toast ready in under 10 minutes.',
    fullDescription: 'Vegetable and starch side dishes that cook in parallel with your main or take under 10 minutes in the air fryer.',
    heroTag: 'UNDER 10-MIN SIDES',
    image: '/images/categories/speed-sides-broccoli.jpg'
  },
  {
    slug: 'snacks',
    name: 'Late Night Snacks',
    shortDescription: 'Quick bites, mozzarella sticks, taquitos, and quesadillas for late-night cravings.',
    fullDescription: 'Quick single-serving or late-night family snacks that deliver maximum crunch with zero oil splatter.',
    heroTag: 'INSTANT LATE NIGHT BITES',
    image: '/images/categories/late-night-quesadilla.jpg'
  },
  {
    slug: 'game-day',
    name: 'Game Day & Finger Foods',
    shortDescription: 'Wings, smash burgers, nachos, and sliders built for crowd feeding and game day watch parties.',
    fullDescription: 'High-volume finger foods and party appetizers engineered to stay crispy on the platter.',
    heroTag: 'CROWD-FEEDING APPETIZERS',
    image: '/images/categories/game-day-nachos.jpg'
  },
  {
    slug: 'breakfast',
    name: 'Dad Weekend Breakfast',
    shortDescription: 'Buttermilk pancakes, diner hash, crispy air-fryer bacon, and breakfast tacos.',
    fullDescription: 'Weekend breakfast and brunch classics perfected on cast iron griddles and air fryer trays.',
    heroTag: 'WEEKEND GRIDDLE CLASSICS',
    image: '/images/categories/weekend-breakfast-feasts.jpg'
  },
  {
    slug: 'weekend',
    name: 'Weekend Project Cooks',
    shortDescription: 'Smoked ribs, reverse-sear thick steaks, and slow-braised chuck roasts for relaxed weekend cooking.',
    fullDescription: 'Rewarding multi-hour cooks for when you have time to tend the smoker, fire up the grill, or slow-braise a roast.',
    heroTag: 'RELAXED WEEKEND MASTERY',
    image: '/images/categories/sunday-meal-prep.jpg'
  }
];

export function getCategoryMeta(slug: string): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
