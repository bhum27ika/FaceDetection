export interface Ingredient {
  id: string;
  name: string;
  benefits: string[];
  suitableFor: string[];
  notSuitableFor: string[];
  concentration: string;
  timeToResults: string;
  description: string;
}

export const INGREDIENTS: Record<string, Ingredient> = {
  'niacinamide': {
    id: 'niacinamide',
    name: 'Niacinamide',
    benefits: ['Regulates oil production', 'Strengthens skin barrier', 'Reduces redness', 'Minimizes pores'],
    suitableFor: ['Oily', 'Combination', 'Sensitive'],
    notSuitableFor: [],
    concentration: '4-5%',
    timeToResults: '4-12 weeks',
    description: 'Vitamin B3 derivative that helps regulate sebum and improves skin barrier function.',
  },
  'retinol': {
    id: 'retinol',
    name: 'Retinol',
    benefits: ['Anti-aging', 'Boosts collagen', 'Reduces wrinkles', 'Improves texture'],
    suitableFor: ['All skin types'],
    notSuitableFor: ['Very sensitive'],
    concentration: '0.25-1%',
    timeToResults: '12-16 weeks',
    description: 'Vitamin A derivative that promotes cell turnover and collagen production.',
  },
  'hyaluronic-acid': {
    id: 'hyaluronic-acid',
    name: 'Hyaluronic Acid',
    benefits: ['Deep hydration', 'Plumps skin', 'Reduces fine lines', 'Lightweight'],
    suitableFor: ['All skin types'],
    notSuitableFor: [],
    concentration: '0.5-2%',
    timeToResults: '2-4 weeks',
    description: 'Humectant that holds up to 1000x its weight in water for intense hydration.',
  },
  'salicylic-acid': {
    id: 'salicylic-acid',
    name: 'Salicylic Acid',
    benefits: ['Exfoliates', 'Clears pores', 'Fights acne', 'Reduces blackheads'],
    suitableFor: ['Oily', 'Acne-prone'],
    notSuitableFor: ['Very dry', 'Sensitive'],
    concentration: '0.5-2%',
    timeToResults: '2-6 weeks',
    description: 'Beta hydroxy acid (BHA) that penetrates pores to exfoliate and unclog.',
  },
  'vitamin-c': {
    id: 'vitamin-c',
    name: 'Vitamin C',
    benefits: ['Brightening', 'Antioxidant', 'Boosts collagen', 'Even skin tone'],
    suitableFor: ['All skin types'],
    notSuitableFor: [],
    concentration: '10-20%',
    timeToResults: '8-12 weeks',
    description: 'Powerful antioxidant that brightens and protects skin from environmental damage.',
  },
  'glycolic-acid': {
    id: 'glycolic-acid',
    name: 'Glycolic Acid',
    benefits: ['Exfoliates', 'Brightens', 'Smooths texture', 'Improves absorption'],
    suitableFor: ['All skin types'],
    notSuitableFor: ['Very sensitive'],
    concentration: '5-15%',
    timeToResults: '2-6 weeks',
    description: 'Alpha hydroxy acid (AHA) that gently exfoliates the surface layer.',
  },
  'kojic-acid': {
    id: 'kojic-acid',
    name: 'Kojic Acid',
    benefits: ['Brightening', 'Fades dark spots', 'Even skin tone', 'Antifungal'],
    suitableFor: ['All skin types'],
    notSuitableFor: [],
    concentration: '1-2%',
    timeToResults: '8-12 weeks',
    description: 'Natural brightening agent that inhibits melanin production.',
  },
  'neem': {
    id: 'neem',
    name: 'Neem',
    benefits: ['Antibacterial', 'Acne-fighting', 'Soothing', 'Natural'],
    suitableFor: ['Oily', 'Acne-prone'],
    notSuitableFor: [],
    concentration: '2-5%',
    timeToResults: '2-4 weeks',
    description: 'Traditional ingredient from Ayurveda with powerful antibacterial properties.',
  },
  'turmeric': {
    id: 'turmeric',
    name: 'Turmeric',
    benefits: ['Anti-inflammatory', 'Brightening', 'Antioxidant', 'Soothing'],
    suitableFor: ['All skin types'],
    notSuitableFor: [],
    concentration: '1-3%',
    timeToResults: '4-8 weeks',
    description: 'Golden spice with strong anti-inflammatory and brightening properties.',
  },
  'sandalwood': {
    id: 'sandalwood',
    name: 'Sandalwood',
    benefits: ['Soothing', 'Anti-inflammatory', 'Fragrant', 'Balancing'],
    suitableFor: ['Sensitive', 'Irritated'],
    notSuitableFor: [],
    concentration: '1-3%',
    timeToResults: '1-2 weeks',
    description: 'Calming botanical extract used in traditional skincare.',
  },
};

export function getIngredientById(id: string): Ingredient | undefined {
  return INGREDIENTS[id];
}

export function filterIngredients(skinType: string, allergies: string[]): Ingredient[] {
  return Object.values(INGREDIENTS).filter(
    ingredient =>
      ingredient.suitableFor.some(s => s.toLowerCase() === skinType.toLowerCase() || s === 'All skin types') &&
      !allergies.some(allergy => ingredient.name.toLowerCase().includes(allergy.toLowerCase()))
  );
}
