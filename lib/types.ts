export type Appliance =
  | 'air-fryer'
  | 'oven'
  | 'instant-pot'
  | 'skillet'
  | 'sheet-pan'
  | 'cast-iron'
  | 'grill'
  | 'dutch-oven'
  | 'slow-cooker'
  | 'smoker'
  | 'boiling';

// Categories describe constraints and intent only (HR-13: no overlap with hardware)
export type Category =
  | '15-minute'
  | 'high-protein'
  | 'kid-approved'
  | 'budget'
  | 'no-thaw'
  | 'one-pan'
  | 'five-ingredient'
  | 'sides'
  | 'snacks'
  | 'game-day'
  | 'breakfast'
  | 'weekend';

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
  qty: string; // display value, always present, e.g. "1 1/2" or "to taste"
  qtyNumeric?: number; // ONLY when genuinely scalable by the portion scaler
  unit: string; // "" is valid, e.g. for "2 eggs"
  notes?: string;
}

export interface DetailedStep {
  stepNumber: number;
  title: string;
  instruction: string;
  proTip?: string;
  timerMinutes?: number;
  targetTemp?: string; // e.g. "165°F internal"
}

export interface QuickInstruction {
  temp: string; // e.g. "400°F (204°C)"
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
  source: string; // HR-2: Source required (e.g. "USDA FoodData Central #171077")
}

export interface Recipe {
  id: string; // e.g. "0001"
  slug: string; // e.g. "crispy-air-fryer-chicken-tenders"
  title: string;
  tagline: string; // HR-4: Unique per recipe
  appliance: Appliance;
  categories: Category[];
  protein: ProteinType;

  // Timing & Serving
  prepMinutes: number;
  cookMinutes: number;
  totalMinutes: number;
  defaultServings: number;
  basis: string; // HR-2: Verification basis (required)
  costEstimateUSD?: number; // Required if 'budget' in categories

  // Safety & Technical
  safeInternalTempF?: number; // USDA safe minimum for this protein
  restMinutes?: number;
  fromFrozen?: {
    supported: boolean;
    cookMinutes?: number;
    note?: string;
  };
  applianceNotes?: {
    model: string;
    adjustment: string;
  }[];

  // Temperature & Equipment
  cookTemp: string; // e.g. "400°F (204°C)"
  cookTempF: number;
  cookTempC: number;
  equipmentNeeded: string[];

  // Core Dual Modes (HR-6: Both present in SSR HTML)
  quickVersion: QuickInstruction;
  detailedSteps: DetailedStep[];

  // Ingredients (HR-14)
  ingredients: Ingredient[];

  // Dad Knowledge & Pro Notes (fluff-free, unique per recipe)
  dadProTip: string;
  kidAdjustment?: string;
  sideSuggestions: string[];
  reheatInstructions: string;
  faqs?: {
    q: string;
    a: string;
  }[];

  // Nutritional & Rating
  nutrition?: NutritionInfo; // source required inside object, or omit entirely
  kidRating: number; // 1 to 5 stars
  difficulty: 'Dead Simple' | 'Easy' | 'Weekend Project';

  // SEO & Semantic
  keywords: string[];
  datePublished: string;
  lastUpdated: string;
  image?: string; // e.g. "/images/hero/air-fryer-tenders.jpg"
}

export interface CategoryMeta {
  slug: Category;
  name: string;
  shortDescription: string;
  fullDescription: string;
  heroTag: string;
  image?: string;
}

export interface ApplianceMeta {
  slug: Appliance;
  name: string;
  shortDescription: string;
  tempRange: string;
  image?: string;
  tempGuide?: {
    food: string;
    temp: string;
    time: string;
    shake: string;
  }[];
}

// Parametric Cooking Datasheet (The BradyBNumbers SEO & LLM engine)
export interface CookTimeDatasheet {
  id: string;
  slug: string; // e.g. "air-fryer-chicken-breast-boneless"
  food: string; // e.g. "Chicken Breast (Boneless, Skinless)"
  foodSlug: string; // e.g. "chicken-breast-boneless"
  appliance: Appliance;
  cutOrPrep: string; // e.g. "6-8 oz breast, 1-inch thick"
  state: 'fresh' | 'frozen' | 'refrigerated';
  tempF: number;
  tempC: number;
  tempFormatted: string; // e.g. "380°F (193°C)"
  timeMinMinutes: number;
  timeMaxMinutes: number;
  timeFormatted: string; // e.g. "14-16 mins"
  flipAtMinutes: number;
  internalTempTargetF: number;
  internalTempTargetFormatted: string; // e.g. "165°F (74°C)"
  restMinutes: number;
  donenessCue: string;
  oilSprayRequired: boolean;
  proTip: string;
  verificationBasis: string; // HR-2: Source / tested hardware
  relatedRecipeSlug?: string;
  keywords?: string[];
  metaDescription?: string;
  pressureMinutes?: number;
  releaseMethod?: 'natural' | 'quick' | '10-min-natural';
}

export type BlogCategory =
  | 'food-science'
  | 'equipment'
  | 'technique'
  | 'weeknight-ops'
  | 'safety-temperatures';

export interface BlogPost {
  id: string; // e.g. "blog-001"
  slug: string; // e.g. "maillard-reaction-steak-searing"
  title: string;
  subtitle: string;
  summary: string;
  category: BlogCategory;
  categoryName: string;
  readMinutes: number;
  datePublished: string;
  lastUpdated: string;
  author: string;
  keywords: string[];
  keyTakeaways: string[];
  contentMarkdown: string;
  faq?: {
    q: string;
    a: string;
  }[];
  relatedToolLinks?: {
    title: string;
    href: string;
    description: string;
  }[];
  relatedRecipeSlugs?: string[];
  relatedDatasheetSlugs?: string[];
}

