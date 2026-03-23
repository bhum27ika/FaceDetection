import { ingredients } from './ingredients';

export interface IngredientRecommendation {
  ingredientId: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

export function recommendIngredientsForConditions(
  conditions: string[],
  skinType: string,
  allergies: string[]
): IngredientRecommendation[] {
  const conditionIngredientsMap: Record<string, string[]> = {
    'acne': ['niacinamide', 'salicylic-acid', 'neem', 'zinc-pca'],
    'dark spots': ['kojic-acid', 'vitamin-c', 'glycolic-acid'],
    'fine lines': ['retinol', 'hyaluronic-acid', 'vitamin-c'],
    'puffiness': ['hyaluronic-acid', 'aloe'],
    'redness': ['niacinamide', 'turmeric', 'sandalwood', 'aloe'],
    'dryness': ['hyaluronic-acid', 'aloe'],
    'oiliness': ['niacinamide', 'salicylic-acid', 'zinc-pca'],
    'large pores': ['niacinamide', 'salicylic-acid', 'zinc-pca'],
    'texture issues': ['glycolic-acid', 'retinol', 'salicylic-acid'],
    'uneven tone': ['vitamin-c', 'kojic-acid', 'glycolic-acid'],
  };

  // Skin type specific considerations
  const skinTypePreferences: Record<string, string[]> = {
    'oily': ['niacinamide', 'salicylic-acid', 'zinc-pca'],
    'dry': ['hyaluronic-acid', 'aloe'],
    'sensitive': ['hyaluronic-acid', 'aloe', 'niacinamide', 'turmeric'],
    'combination': ['niacinamide', 'hyaluronic-acid'],
    'normal': ['vitamin-c', 'niacinamide', 'hyaluronic-acid'],
  };

  // Collect ingredient suggestions
  const ingredientScores: Record<string, { score: number; reasons: string[] }> = {};

  // Add ingredients from conditions
  conditions.forEach(condition => {
    const ingredients = conditionIngredientsMap[condition.toLowerCase()] || [];
    ingredients.forEach(ingredientId => {
      if (!ingredientScores[ingredientId]) {
        ingredientScores[ingredientId] = { score: 0, reasons: [] };
      }
      ingredientScores[ingredientId].score += 3;
      ingredientScores[ingredientId].reasons.push(`Targets ${condition}`);
    });
  });

  // Add ingredients from skin type
  const skinPrefs = skinTypePreferences[skinType.toLowerCase()] || [];
  skinPrefs.forEach(ingredientId => {
    if (!ingredientScores[ingredientId]) {
      ingredientScores[ingredientId] = { score: 0, reasons: [] };
    }
    ingredientScores[ingredientId].score += 1;
    ingredientScores[ingredientId].reasons.push(`Suited for ${skinType} skin`);
  });

  // Filter out allergies
  const safeIngredients = Object.entries(ingredientScores).filter(
    ([ingredientId]) => !isIngredientsAllergenic(ingredientId, allergies)
  );

  // Sort by score and convert to recommendations
  const recommendations = safeIngredients
    .sort(([, a], [, b]) => b.score - a.score)
    .slice(0, 5) // Top 5 recommendations
    .map(([ingredientId, data]) => ({
      ingredientId,
      reason: data.reasons.join(', '),
      priority: data.score >= 4 ? 'high' : data.score >= 2 ? 'medium' : 'low',
    }));

  return recommendations;
}

function isIngredientsAllergenic(ingredientId: string, allergies: string[]): boolean {
  if (allergies.length === 0) return false;

  // Map common allergens to ingredients
  const allergyMap: Record<string, string[]> = {
    'Fragrance': [],
    'Sulfates': ['salicylic-acid'],
    'Parabens': [],
    'Silicones': [],
    'Alcohol': [],
  };

  const problematicIngredients = allergies.flatMap(a => allergyMap[a] || []);
  return problematicIngredients.includes(ingredientId);
}

export function getProductsForIngredient(ingredientId: string) {
  // This would typically fetch from a products database
  // For now, returning mock products
  const productMap: Record<string, Array<{ name: string; type: string; brand: string }>> = {
    'niacinamide': [
      { name: 'The Ordinary Niacinamide 10%', type: 'serum', brand: 'The Ordinary' },
      { name: 'CeraVe Daily Moisturizing Lotion', type: 'moisturizer', brand: 'CeraVe' },
    ],
    'hyaluronic-acid': [
      { name: 'The Ordinary Hyaluronic Acid 2%', type: 'serum', brand: 'The Ordinary' },
      { name: 'Tatcha Luminous Dewy Skin Mist', type: 'mist', brand: 'Tatcha' },
    ],
    'retinol': [
      { name: 'The Ordinary Retinol 0.2%', type: 'serum', brand: 'The Ordinary' },
      { name: 'RoC Retinol Correxion Night Serum', type: 'serum', brand: 'RoC' },
    ],
    'salicylic-acid': [
      { name: 'Neutrogena Salicylic Acid Cleanser', type: 'cleanser', brand: 'Neutrogena' },
      { name: 'Paula\'s Choice 2% BHA Liquid', type: 'exfoliant', brand: 'Paula\'s Choice' },
    ],
    'kojic-acid': [
      { name: 'Kojic Acid Serum', type: 'serum', brand: 'Generic' },
      { name: 'Brightening Soap Bar', type: 'cleanser', brand: 'Generic' },
    ],
    'vitamin-c': [
      { name: 'Skinceuticals C E Ferulic', type: 'serum', brand: 'SkinCeuticals' },
      { name: 'The Ordinary Vitamin C Suspension', type: 'serum', brand: 'The Ordinary' },
    ],
    'glycolic-acid': [
      { name: 'NYKAA Naturals Glycolic Acid Toner', type: 'toner', brand: 'NYKAA' },
      { name: 'Pixi Glow Tonic', type: 'toner', brand: 'Pixi' },
    ],
  };

  return productMap[ingredientId] || [];
}

export function buildSkincareRoutine(recommendations: IngredientRecommendation[]) {
  return {
    morning: [
      'Cleanser (gentle)',
      'Toner (optional)',
      ...recommendations.filter(r => r.priority === 'high').map(r => {
        const ingredient = ingredients[r.ingredientId.replace('-', '')];
        return ingredient?.name || r.ingredientId;
      }).slice(0, 2),
      'Moisturizer',
      'Sunscreen SPF 30+',
    ],
    night: [
      'Cleanser (gentle)',
      'Toner (optional)',
      ...recommendations.map(r => {
        const ingredient = ingredients[r.ingredientId.replace('-', '')];
        return ingredient?.name || r.ingredientId;
      }).slice(0, 3),
      'Night Moisturizer',
    ],
    weekly: [
      'Exfoliant (1-2 times per week)',
      'Face Mask (1-2 times per week)',
      'Deep hydrating treatment (1 time per week)',
    ],
  };
}
