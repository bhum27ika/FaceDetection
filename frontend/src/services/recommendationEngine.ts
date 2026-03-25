import { INGREDIENTS } from './ingredients';

export interface RecommendedIngredient {
  ingredientId: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

const CONCERN_INGREDIENTS: Record<string, RecommendedIngredient[]> = {
  'acne': [
    { ingredientId: 'salicylic-acid', reason: 'Exfoliates and clears pores', priority: 'high' },
    { ingredientId: 'niacinamide', reason: 'Regulates oil production', priority: 'high' },
    { ingredientId: 'neem', reason: 'Antibacterial properties', priority: 'medium' },
  ],
  'wrinkles': [
    { ingredientId: 'retinol', reason: 'Boosts collagen production', priority: 'high' },
    { ingredientId: 'vitamin-c', reason: 'Powerful antioxidant', priority: 'high' },
    { ingredientId: 'hyaluronic-acid', reason: 'Plumps and hydrates', priority: 'medium' },
  ],
  'dark spots': [
    { ingredientId: 'kojic-acid', reason: 'Brightens and fades spots', priority: 'high' },
    { ingredientId: 'vitamin-c', reason: 'Brightening effect', priority: 'high' },
    { ingredientId: 'glycolic-acid', reason: 'Improves texture and tone', priority: 'medium' },
  ],
  'redness': [
    { ingredientId: 'niacinamide', reason: 'Reduces inflammation', priority: 'high' },
    { ingredientId: 'turmeric', reason: 'Anti-inflammatory', priority: 'high' },
    { ingredientId: 'sandalwood', reason: 'Calming and soothing', priority: 'medium' },
  ],
  'dryness': [
    { ingredientId: 'hyaluronic-acid', reason: 'Deep hydration', priority: 'high' },
    { ingredientId: 'niacinamide', reason: 'Strengthens barrier', priority: 'high' },
    { ingredientId: 'sandalwood', reason: 'Balancing and soothing', priority: 'medium' },
  ],
  'sensitivity': [
    { ingredientId: 'niacinamide', reason: 'Calms and strengthens', priority: 'high' },
    { ingredientId: 'sandalwood', reason: 'Soothing properties', priority: 'high' },
    { ingredientId: 'hyaluronic-acid', reason: 'Gentle hydration', priority: 'medium' },
  ],
  'oiliness': [
    { ingredientId: 'salicylic-acid', reason: 'Exfoliates excess oil', priority: 'high' },
    { ingredientId: 'niacinamide', reason: 'Regulates sebum', priority: 'high' },
    { ingredientId: 'glycolic-acid', reason: 'Improves texture', priority: 'medium' },
  ],
  'fine lines': [
    { ingredientId: 'retinol', reason: 'Anti-aging benefits', priority: 'high' },
    { ingredientId: 'hyaluronic-acid', reason: 'Plumps fine lines', priority: 'high' },
    { ingredientId: 'vitamin-c', reason: 'Boosts collagen', priority: 'medium' },
  ],
};

export function recommendIngredientsForConditions(
  concerns: string[],
  skinType: string,
  allergies: string[] = []
): RecommendedIngredient[] {
  const recommended = new Map<string, RecommendedIngredient>();

  // Get recommendations for each concern
  concerns.forEach(concern => {
    const lowerConcern = concern.toLowerCase();
    const concernRecs = CONCERN_INGREDIENTS[lowerConcern] || [];

    concernRecs.forEach(rec => {
      if (!recommended.has(rec.ingredientId)) {
        recommended.set(rec.ingredientId, rec);
      }
    });
  });

  // Filter out allergies
  const filtered = Array.from(recommended.values()).filter(rec => {
    const ingredient = INGREDIENTS[rec.ingredientId];
    return !allergies.some(allergy =>
      ingredient?.name.toLowerCase().includes(allergy.toLowerCase())
    );
  });

  // Sort by priority
  return filtered.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

export interface RoutineStep {
  time: 'morning' | 'evening';
  steps: string[];
}

export function buildSkincareRoutine(ingredients: RecommendedIngredient[]): RoutineStep[] {
  return [
    {
      time: 'morning',
      steps: ['Cleanser', 'Toner', 'Serum', 'Moisturizer', 'SPF 30+'],
    },
    {
      time: 'evening',
      steps: ['Cleanser', 'Essence', 'Targeted Serum', 'Moisturizer', 'Night Cream'],
    },
  ];
}
