export interface AyurvedicTreatment {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  frequency: string;
  benefits: string[];
  suitableFor: string[];
  duration: string;
  diy: boolean;
}

export const ayurvedicTreatments: AyurvedicTreatment[] = [
  {
    id: 'turmeric-pack',
    name: 'Turmeric & Besan Face Pack',
    description: 'Traditional Indian brightening and anti-inflammatory mask',
    ingredients: ['1 tsp turmeric powder', '2 tbsp besan (chickpea flour)', '1 tbsp raw milk', '1 tsp honey'],
    instructions: [
      'Mix all ingredients into a smooth paste',
      'Apply evenly on face and neck',
      'Let it dry for 20-30 minutes',
      'Dampen with water and gently massage',
      'Rinse with lukewarm water',
      'Pat dry and apply moisturizer',
    ],
    frequency: '2-3 times per week',
    benefits: ['Brightens skin', 'Reduces acne', 'Anti-inflammatory', 'Even skin tone'],
    suitableFor: ['Acne', 'Dark spots', 'Dull skin', 'All skin types'],
    duration: '20-30 minutes',
    diy: true,
  },
  {
    id: 'neem-paste',
    name: 'Neem & Tulsi Pack',
    description: 'Powerful antibacterial Ayurvedic treatment for acne',
    ingredients: ['Handful of neem leaves', 'Handful of tulsi leaves', '1 tbsp water', '1 tsp honey'],
    instructions: [
      'Grind fresh neem and tulsi leaves with water',
      'Add honey and mix well',
      'Apply directly on affected areas or entire face',
      'Leave for 20 minutes',
      'Rinse with cool water',
    ],
    frequency: 'Daily or 4-5 times per week',
    benefits: ['Antibacterial', 'Reduces acne', 'Prevents scars', 'Purifies skin'],
    suitableFor: ['Acne-prone', 'Oily skin', 'Infected acne'],
    duration: '15-20 minutes',
    diy: true,
  },
  {
    id: 'sandalwood-rose',
    name: 'Sandalwood & Rose Water Pack',
    description: 'Cooling and soothing Ayurvedic mask',
    ingredients: ['2 tbsp sandalwood powder', '2 tbsp rose water', '1 tsp honey', '1 drop rose essential oil'],
    instructions: [
      'Mix sandalwood powder with rose water to form paste',
      'Add honey and essential oil',
      'Apply generously on face',
      'Leave for 30 minutes until completely dry',
      'Rinse with lukewarm water',
    ],
    frequency: '2 times per week',
    benefits: ['Cools skin', 'Reduces redness', 'Even skin tone', 'Soothing'],
    suitableFor: ['Sensitive skin', 'Irritation', 'Redness', 'All skin types'],
    duration: '25-30 minutes',
    diy: true,
  },
  {
    id: 'ubtan',
    name: 'Traditional Ubtan',
    description: 'Complete Ayurvedic scrub and mask',
    ingredients: [
      '2 tbsp besan',
      '1 tbsp turmeric powder',
      '1 tbsp raw milk',
      '1 tbsp yogurt',
      '1 tsp honey',
      '1 tsp rose water',
    ],
    instructions: [
      'Mix all dry ingredients first',
      'Add wet ingredients and mix into smooth paste',
      'Apply with upward strokes on face and neck',
      'Gently scrub in circular motions for 5 minutes',
      'Leave for 15 minutes',
      'Rinse with lukewarm water',
    ],
    frequency: 'Once per week',
    benefits: ['Exfoliates', 'Brightens', 'Removes dead skin', 'Improves texture'],
    suitableFor: ['All skin types', 'Dull skin', 'Uneven tone'],
    duration: '20 minutes',
    diy: true,
  },
  {
    id: 'honey-yogurt',
    name: 'Honey & Yogurt Mask',
    description: 'Hydrating and soothing natural treatment',
    ingredients: ['2 tbsp raw honey', '3 tbsp plain yogurt', '1 tsp turmeric powder'],
    instructions: [
      'Mix honey and yogurt well',
      'Add turmeric and stir',
      'Apply evenly on face',
      'Leave for 20 minutes',
      'Rinse with lukewarm water',
      'Pat dry and moisturize',
    ],
    frequency: '2-3 times per week',
    benefits: ['Hydrates', 'Soothes irritation', 'Brightens', 'Gentle exfoliation'],
    suitableFor: ['Sensitive skin', 'Dry skin', 'Acne-prone'],
    duration: '15-20 minutes',
    diy: true,
  },
  {
    id: 'aloe-cucumber',
    name: 'Aloe Vera & Cucumber Mask',
    description: 'Cooling and healing treatment',
    ingredients: ['2 tbsp aloe vera gel', '1 cucumber (blended)', '1 tsp honey'],
    instructions: [
      'Blend fresh cucumber into fine paste',
      'Mix with aloe vera gel and honey',
      'Apply on clean face',
      'Leave for 20 minutes',
      'Rinse with cool water',
    ],
    frequency: 'Daily or alternate days',
    benefits: ['Cools skin', 'Hydrates', 'Reduces redness', 'Soothes acne'],
    suitableFor: ['Irritated skin', 'Sunburned skin', 'Sensitive skin'],
    duration: '15-20 minutes',
    diy: true,
  },
  {
    id: 'multani-mitti',
    name: 'Multani Mitti (Fuller\'s Earth) Mask',
    description: 'Detoxifying and oil-absorbing clay mask',
    ingredients: ['2 tbsp multani mitti', '1 tbsp rose water', '1 tsp honey', 'Few drops lemon juice'],
    instructions: [
      'Mix multani mitti with rose water',
      'Add honey and lemon juice',
      'Apply on face and neck',
      'Let dry for 15-20 minutes',
      'Rinse gently with lukewarm water',
    ],
    frequency: 'Once per week',
    benefits: ['Absorbs oil', 'Deep cleansing', 'Removes impurities', 'Shrinks pores'],
    suitableFor: ['Oily skin', 'Acne-prone', 'Combination skin'],
    duration: '15-20 minutes',
    diy: true,
  },
  {
    id: 'sesame-oil',
    name: 'Sesame Oil Massage (Abhyanga)',
    description: 'Traditional oil massage for nourishment',
    ingredients: ['Pure sesame oil (warm)', 'Optional: few drops essential oil'],
    instructions: [
      'Warm sesame oil slightly',
      'Apply on face in gentle upward strokes',
      'Massage for 10-15 minutes',
      'Leave for 20 minutes or overnight',
      'Remove with warm water and gentle cleanser',
    ],
    frequency: '2-3 times per week',
    benefits: ['Nourishes', 'Deep moisturizes', 'Improves circulation', 'Anti-aging'],
    suitableFor: ['Dry skin', 'Mature skin', 'All skin types'],
    duration: '30-45 minutes',
    diy: true,
  },
];

export function getAyurvedicTreatmentsForCondition(condition: string): AyurvedicTreatment[] {
  const conditionMap: Record<string, string[]> = {
    acne: ['turmeric-pack', 'neem-paste', 'multani-mitti'],
    'dark spots': ['turmeric-pack', 'ubtan'],
    'dull skin': ['turmeric-pack', 'ubtan', 'sesame-oil'],
    'oily skin': ['multani-mitti', 'neem-paste'],
    'dry skin': ['honey-yogurt', 'aloe-cucumber', 'sesame-oil'],
    'sensitive skin': ['sandalwood-rose', 'honey-yogurt', 'aloe-cucumber'],
    redness: ['sandalwood-rose', 'aloe-cucumber'],
  };

  const relevantIds = conditionMap[condition.toLowerCase()] || [];
  return ayurvedicTreatments.filter(t => relevantIds.includes(t.id));
}
