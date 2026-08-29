export type Appliance =
  | 'air-fryer'
  | 'skillet'
  | 'sheet-pan'
  | 'grill'
  | 'one-pot'
  | 'cast-iron'
  | 'slow-cooker'
  | 'smoker'
  | 'oven';

export type Category =
  | 'air-fryer'
  | '15-minute'
  | 'high-protein'
  | 'kid-approved'
  | 'budget'
  | 'sides'
  | 'snacks'
  | 'weekend-dad'
  | 'breakfast'
  | 'game-day'
  | 'meal-prep';

export type ProteinType =
  | 'chicken'
  | 'beef'
  | 'pork'
  | 'seafood'
  | 'turkey'
  | 'vegetarian'
  | 'dairy-eggs';

export interface Ingredient {
  item: string;
  amount: number; // base amount for default servings (usually 4)
  unit: string; // e.g. "lbs", "tbsp", "tsp", "cups", "cloves", "slices", "pieces", "can"
  notes?: string; // e.g. "boneless skinless", "shredded", "melted"
}

export interface DetailedStep {
  stepNumber: number;
  title: string;
  instruction: string;
  proTip?: string;
  timerMinutes?: number;
  timeSeconds?: number;
  targetTemp?: string; // e.g. "165°F internal"
}

export interface QuickInstruction {
  temp: string; // e.g. "400°F"
  totalTime: string; // e.g. "10-12 mins"
  timerMinutes: number;
  flipAtMinutes?: number;
  bullets: string[]; // 3-4 ultra-punchy bullet points (max 15-20 words each)
}

export interface NutritionInfo {
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
}

export interface Recipe {
  id: string; // e.g. "0001"
  slug: string; // e.g. "air-fryer-crispy-chicken-tenders"
  title: string; // e.g. "Crispy Air Fryer Chicken Tenders"
  tagline: string; // e.g. "Golden, crunchy outside, juicy inside in 10 minutes. Zero oil mess."
  appliance: Appliance;
  categories: Category[];
  protein: ProteinType;
  
  // Timing & Serving
  prepMinutes: number;
  cookMinutes: number;
  totalMinutes: number;
  defaultServings: number;
  
  // Temperature & Equipment
  cookTemp: string; // e.g. "400°F (204°C)"
  cookTempF: number; // 400
  cookTempC: number; // 204
  equipmentNeeded: string[]; // e.g. ["Air Fryer", "Tongs", "Meat Thermometer"]
  
  // Core Dual Modes
  quickVersion: QuickInstruction;
  detailedSteps: DetailedStep[];
  
  // Ingredients
  ingredients: Ingredient[];
  
  // Dad Knowledge & Pro Notes (fluff-free)
  dadProTip: string;
  kidAdjustment?: string;
  sideSuggestions: string[];
  reheatInstructions: string;
  
  // Nutritional & Rating
  nutrition: NutritionInfo;
  kidRating: number; // 1 to 5 stars
  difficulty: 'Easy' | 'Dead Simple' | 'Weekend Project';
  
  // SEO & Semantic
  keywords: string[];
  datePublished: string;
  lastUpdated: string;
}

export interface CategoryMeta {
  slug: Category;
  name: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  heroTag: string;
}

export interface ApplianceMeta {
  slug: Appliance;
  name: string;
  shortDescription: string;
  tempGuide: {
    food: string;
    temp: string;
    time: string;
    shake: string;
  }[];
}
