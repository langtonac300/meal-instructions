import { ApplianceMeta } from '@/lib/types';

export const APPLIANCES: ApplianceMeta[] = [
  {
    slug: 'air-fryer',
    name: 'Air Fryer',
    shortDescription: 'Convection heat in a compact basket. Cuts cooking time by 40% and produces extreme crispiness.',
    tempGuide: [
      { food: 'Chicken Tenders (Fresh)', temp: '400°F (204°C)', time: '10-12 mins', shake: 'Flip at 6 mins' },
      { food: 'Chicken Wings (Fresh)', temp: '380°F then 400°F', time: '20 mins', shake: 'Shake every 6 mins' },
      { food: 'Beef Burgers (1/3 lb)', temp: '375°F (190°C)', time: '10 mins', shake: 'Flip at 6 mins' },
      { food: 'Salmon Fillets', temp: '400°F (204°C)', time: '8-10 mins', shake: 'Skin down, no flip' },
      { food: 'Pork Chops (1-inch)', temp: '380°F (193°C)', time: '12-14 mins', shake: 'Flip at 7 mins' },
      { food: 'Frozen French Fries', temp: '400°F (204°C)', time: '14-16 mins', shake: 'Shake at 5 & 10 mins' },
      { food: 'Frozen Chicken Nuggets', temp: '400°F (204°C)', time: '8-10 mins', shake: 'Shake at 5 mins' },
      { food: 'Broccoli Florets', temp: '380°F (193°C)', time: '8 mins', shake: 'Shake at 4 mins' },
      { food: 'Mozzarella Sticks (Frozen)', temp: '380°F (193°C)', time: '5-6 mins', shake: 'Flip at 3 mins' },
      { food: 'Steak Bites (Sirloin Cubes)', temp: '400°F (204°C)', time: '6-8 mins', shake: 'Shake at 4 mins' },
      { food: 'Bacon Slices', temp: '375°F (190°C)', time: '8-10 mins', shake: 'Single layer' },
      { food: 'Hot Dogs / Bratwurst', temp: '390°F (199°C)', time: '6 mins', shake: 'Roll at 3 mins' },
    ],
  },
  {
    slug: 'sheet-pan',
    name: 'Sheet Pan (Oven Convection)',
    shortDescription: 'Feed the whole crew on one single parchment-lined pan. Zero sink full of pots.',
    tempGuide: [
      { food: 'Chicken & Bell Pepper Fajitas', temp: '425°F (218°C)', time: '15-18 mins', shake: 'Stir at 10 mins' },
      { food: 'Loaded Family Quesadillas', temp: '425°F (218°C)', time: '12-15 mins', shake: 'Flip once at 8 mins' },
      { food: 'Sausage, Peppers & Potatoes', temp: '400°F (204°C)', time: '25-30 mins', shake: 'Flip at 15 mins' },
      { food: 'Salmon & Asparagus', temp: '400°F (204°C)', time: '12-14 mins', shake: 'No flip' },
      { food: 'Sheet Pan Nachos', temp: '400°F (204°C)', time: '8-10 mins', shake: 'Rotate pan once' },
    ],
  },
  {
    slug: 'skillet',
    name: '12-Inch Skillet / Non-Stick',
    shortDescription: 'High-speed weeknight pan cooking for quick proteins, taco fillings, and pasta tosses.',
    tempGuide: [
      { food: 'Ground Beef Taco Meat', temp: 'Medium-High', time: '8-10 mins', shake: 'Break up constantly' },
      { food: 'Crispy Boneless Chicken Breasts', temp: 'Medium-High', time: '12 mins', shake: '6 mins per side' },
      { food: 'Scrambled Eggs (Diner Style)', temp: 'Medium-Low', time: '3-4 mins', shake: 'Push gently with spatula' },
      { food: 'Fried Rice with Spam/Chicken', temp: 'High Heat', time: '6-8 mins', shake: 'Toss every 30s' },
    ],
  },
  {
    slug: 'cast-iron',
    name: 'Cast Iron Skillet',
    shortDescription: 'Maximum heat retention for thick crust sears, smash burgers, and restaurant-quality steaks.',
    tempGuide: [
      { food: 'Smash Burgers (Lacy Edge)', temp: 'Smoking Hot', time: '4 mins', shake: 'Press hard 10s, flip at 2m30s' },
      { food: 'Thick Ribeye / NY Strip', temp: 'High Heat + Butter Baste', time: '6-8 mins', shake: 'Flip every 60s' },
      { food: 'Cast Iron Cornbread', temp: '400°F in Oven', time: '20-22 mins', shake: 'Preheat skillet with butter' },
      { food: 'Crispy Skinned Salmon', temp: 'Medium-High', time: '7 mins', shake: '5m skin down, 2m top' },
    ],
  },
  {
    slug: 'grill',
    name: 'Gas or Charcoal Grill',
    shortDescription: 'Open flame, high heat, and wood smoke for family BBQ dinners.',
    tempGuide: [
      { food: 'Burgers (1/2 lb patties)', temp: '450°F Direct', time: '8-10 mins', shake: 'Flip once at 5 mins' },
      { food: 'BBQ Chicken Thighs', temp: '375°F Indirect', time: '25-30 mins', shake: 'Sauce in last 5 mins' },
      { food: 'Grilled Corn on the Cob', temp: '400°F Direct', time: '12-15 mins', shake: 'Turn every 3 mins' },
      { food: 'Marinated Skirt Steak', temp: '500°F Direct', time: '5-6 mins', shake: 'Flip at 3 mins' },
    ],
  },
  {
    slug: 'one-pot',
    name: 'One-Pot / Dutch Oven',
    shortDescription: 'Deep pot cooking where pasta, rice, and meats cook together in one single vessel.',
    tempGuide: [
      { food: 'One-Pot Taco Pasta', temp: 'Simmer Medium', time: '15 mins', shake: 'Stir every 3 mins' },
      { food: 'Dad Chili (Ground Beef)', temp: 'Low Simmer', time: '30-45 mins', shake: 'Stir occasionally' },
      { food: 'Chicken Tortellini Soup', temp: 'Medium Simmer', time: '15 mins', shake: 'Add tortellini last 5m' },
    ],
  },
  {
    slug: 'slow-cooker',
    name: 'Slow Cooker / Crockpot',
    shortDescription: 'Set it before leaving for work, come home to fork-tender pulled pork and roasts.',
    tempGuide: [
      { food: 'BBQ Pulled Pork Shoulder', temp: 'LOW', time: '8 hours', shake: 'Shred in bowl' },
      { food: 'Salsa Shredded Chicken', temp: 'LOW', time: '6 hours', shake: 'Shred with forks' },
      { food: 'Beef Pot Roast with Carrots', temp: 'LOW', time: '8 hours', shake: 'Check fork tender' },
    ],
  },
  {
    slug: 'smoker',
    name: 'Pellet or Charcoal Smoker',
    shortDescription: 'Low & slow wood-fired smoking at 225°F to 275°F for ribs, brisket, and wings.',
    tempGuide: [
      { food: 'St. Louis Style Ribs (3-2-1)', temp: '225°F', time: '6 hours', shake: 'Spritz every hour' },
      { food: 'Smoked Buffalo Wings', temp: '225°F then 400°F', time: '90 mins', shake: 'Flip at 45 mins' },
      { food: 'Smoked Pork Butt', temp: '250°F', time: '8-10 hours', shake: 'Wrap at 165°F internal' },
    ],
  },
  {
    slug: 'oven',
    name: 'Standard Oven Baking',
    shortDescription: 'Even convection and conventional baking for casseroles and sheet pizzas.',
    tempGuide: [
      { food: 'Baked Ziti Casserole', temp: '375°F (190°C)', time: '25-30 mins', shake: 'Covered 20m, uncovered 10m' },
      { food: 'Sheet Pan Pepperoni Pizza', temp: '450°F (232°C)', time: '14-16 mins', shake: 'Rotate at 8 mins' },
    ],
  },
];
