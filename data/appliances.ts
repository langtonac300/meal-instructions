import { ApplianceMeta } from '@/lib/types';

export const APPLIANCES: ApplianceMeta[] = [
  {
    slug: 'air-fryer',
    name: 'Air Fryer',
    shortDescription: 'High-velocity convection airflow in a compact chamber. Delivers 360° crispiness in 40% less time with minimal oil.',
    tempRange: '300°F – 400°F (149°C – 204°C)',
    tempGuide: [
      { food: 'Chicken Tenders (Fresh)', temp: '400°F (204°C)', time: '10-12 mins', shake: 'Flip at 5 mins' },
      { food: 'Chicken Wings (Party Wings)', temp: '380°F then 400°F', time: '20 mins', shake: 'Shake at 10 mins' },
      { food: 'Beef Burger Patties (1/3 lb)', temp: '375°F (190°C)', time: '10 mins', shake: 'Flip at 6 mins' },
      { food: 'Salmon Fillets (Center Cut)', temp: '400°F (204°C)', time: '8-10 mins', shake: 'Skin down, no flip' },
      { food: 'Sirloin Steak Bites', temp: '400°F (204°C)', time: '6-8 mins', shake: 'Shake at 4 mins' },
      { food: 'Pork Chops (1-inch)', temp: '380°F (193°C)', time: '12-14 mins', shake: 'Flip at 7 mins' },
      { food: 'Thick Cut Bacon', temp: '375°F (190°C)', time: '8-10 mins', shake: 'Single layer' },
      { food: 'Bratwurst & Italian Sausages', temp: '375°F (190°C)', time: '12-15 mins', shake: 'Roll at 7 mins' },
      { food: 'Frozen French Fries', temp: '400°F (204°C)', time: '14-16 mins', shake: 'Shake at 5 & 10 mins' },
      { food: 'Broccoli Florets (Fresh)', temp: '380°F (193°C)', time: '8 mins', shake: 'Shake at 4 mins' },
      { food: 'Whole Baked Russet Potatoes', temp: '400°F (204°C)', time: '40-45 mins', shake: 'Flip at 20 mins' },
      { food: 'Frozen Mozzarella Sticks', temp: '380°F (193°C)', time: '5-6 mins', shake: 'Flip at 3 mins' },
      { food: 'Frozen Dumplings & Gyoza', temp: '380°F (193°C)', time: '8-10 mins', shake: 'Flip at 5 mins' }
    ]
  },
  {
    slug: 'skillet',
    name: '12-Inch Skillet / Non-Stick',
    shortDescription: 'High-speed weeknight stovetop pan cooking for quick ground meats, stir-fries, pan sauces, and eggs.',
    tempRange: 'Medium-Low to High Heat',
    tempGuide: [
      { food: 'Ground Beef Taco Meat', temp: 'Medium-High (375°F)', time: '9-12 mins', shake: 'Chop & stir frequently' },
      { food: 'Sausage & Peppers Sauté', temp: 'Medium-High', time: '12-14 mins', shake: 'Toss every 3 mins' },
      { food: 'Shaved Ribeye Cheesesteak', temp: 'High Heat', time: '6-8 mins', shake: 'Chop & flip continuously' },
      { food: 'Quick Breakfast Hash', temp: 'Medium', time: '10-12 mins', shake: 'Flip in sections' }
    ]
  },
  {
    slug: 'sheet-pan',
    name: 'Sheet Pan (Convection Bake)',
    shortDescription: 'Large surface area roasting on parchment paper. Feeds the whole family simultaneously with single-pan cleanup.',
    tempRange: '375°F – 450°F (190°C – 232°C)',
    tempGuide: [
      { food: 'Chicken & Pepper Fajita Strips', temp: '425°F (218°C)', time: '15-18 mins', shake: 'Stir at 8 mins' },
      { food: 'Smoked Sausage, Peppers & Potatoes', temp: '400°F (204°C)', time: '25 mins', shake: 'Flip at 15 mins' },
      { food: 'Honey Mustard Salmon & Asparagus', temp: '400°F (204°C)', time: '14 mins', shake: 'Rotate pan once' },
      { food: 'Sheet Pan Loaded Nachos', temp: '400°F (204°C)', time: '8-10 mins', shake: 'Broil 1 min to finish' }
    ]
  },
  {
    slug: 'cast-iron',
    name: 'Cast Iron Skillet',
    shortDescription: 'Maximum thermal mass and heat retention for diner smash burgers, crusty steaks, and blackened fish.',
    tempRange: '400°F – 550°F (204°C – 288°C)',
    tempGuide: [
      { food: 'Smash Burger Patties (2 oz balls)', temp: 'Smoking Hot (450°F+)', time: '3-4 mins', shake: 'Smash hard 2 min, flip 1 min' },
      { food: 'Thick Ribeye Steak (Butter Basted)', temp: 'High Heat (450°F)', time: '7-9 mins', shake: 'Flip every 60s, baste 2m' },
      { food: 'Blackened Salmon Fillets', temp: 'High Heat (425°F)', time: '6-8 mins', shake: 'Flip at 4 mins' },
      { food: 'Skillet Cornbread', temp: '425°F (in oven)', time: '20 mins', shake: 'Toothpick test at center' }
    ]
  },
  {
    slug: 'grill',
    name: 'Gas or Charcoal Grill',
    shortDescription: 'Direct flame sear and radiant heat for outdoor cookouts, steaks, burgers, chicken, and charred veggies.',
    tempRange: '350°F – 500°F (177°C – 260°C)',
    tempGuide: [
      { food: 'Backyard Beef Burgers (1/3 lb)', temp: '450°F Direct Heat', time: '8-10 mins', shake: 'Flip once at 5 mins' },
      { food: 'BBQ Chicken Breasts', temp: '375°F Indirect Heat', time: '14-16 mins', shake: 'Glaze sauce in last 3 mins' },
      { food: 'Grilled Bratwurst Links', temp: '350°F Medium Heat', time: '15-18 mins', shake: 'Turn every 4 mins' },
      { food: 'Corn on the Cob (in husks)', temp: '400°F Direct Heat', time: '15 mins', shake: 'Turn 1/4 every 4 mins' }
    ]
  },
  {
    slug: 'dutch-oven',
    name: 'Dutch Oven / Heavy Pot',
    shortDescription: 'Heavy enameled cast iron for one-pot stews, chili, braises, and 15-minute pasta boils.',
    tempRange: 'Simmer to 400°F (93°C – 204°C)',
    tempGuide: [
      { food: 'Cheesy Taco Beef Pasta', temp: 'Medium Simmer', time: '15 mins', shake: 'Stir occasionally' },
      { food: 'Classic Weeknight Chili', temp: 'Low Simmer Covered', time: '30-45 mins', shake: 'Stir every 10 mins' },
      { food: 'Sloppy Joe Ground Beef Simmer', temp: 'Medium-Low', time: '12-15 mins', shake: 'Stir until glossy' }
    ]
  },
  {
    slug: 'slow-cooker',
    name: 'Slow Cooker / Crockpot',
    shortDescription: 'Hands-off low-temperature braising over 4–8 hours for tender shredded meats and family roasts.',
    tempRange: 'LOW (190°F–200°F) / HIGH (290°F–300°F)',
    tempGuide: [
      { food: 'Shredded Mexican Salsa Chicken', temp: 'LOW (4-5 hrs) or HIGH (2.5 hrs)', time: '4-5 hours', shake: 'Shred with two forks' },
      { food: 'BBQ Pulled Pork (Pork Shoulder)', temp: 'LOW (8 hrs)', time: '8 hours', shake: 'Drain liquid & shred' },
      { food: 'Chuck Roast with Carrots & Potatoes', temp: 'LOW (8-9 hrs)', time: '8-9 hours', shake: 'No stirring needed' }
    ]
  },
  {
    slug: 'smoker',
    name: 'Pellet or Charcoal Smoker',
    shortDescription: 'Low and slow indirect wood-fired smoking at 225°F–275°F for Texas-style brisket, pork shoulder, and ribs.',
    tempRange: '200°F – 275°F (93°C – 135°C)',
    tempGuide: [
      { food: 'St. Louis Style Pork Ribs (3-2-1)', temp: '225°F (107°C)', time: '5.5-6 hours', shake: 'Wrap at 3 hrs, glaze at 5 hrs' },
      { food: 'Smoked Pork Butt / Shoulder', temp: '225°F–250°F', time: '8-10 hours', shake: 'Wrap at 165°F internal' },
      { food: 'Smoked Whole Chicken', temp: '250°F then 350°F', time: '3 hours', shake: 'Crisp skin at finish' }
    ]
  }
];

export function getApplianceMeta(slug: string): ApplianceMeta | undefined {
  return APPLIANCES.find((a) => a.slug === slug);
}
