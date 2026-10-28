export const equipmentLabels = {
  'air-fryer': 'Air fryer',
  oven: 'Piekarnik',
  grill: 'Grill elektryczny',
  waffle: 'Gofrownica',
  stovetop: 'Patelnia / garnek',
} as const;
export type Equipment = keyof typeof equipmentLabels;

/** Browser-safe shared inference for legacy and custom recipes; does not alter stored data. */
export function recipeEquipment(recipe: { equipment?: Equipment[]; steps: string[] }): Equipment[] {
  if (recipe.equipment) return recipe.equipment;
  const steps = recipe.steps.join(' ').toLowerCase();
  const tags: Equipment[] = [];
  if (/air.?fryer|frytkownic/.test(steps)) tags.push('air-fryer');
  if (/piekarnik|piecz|zapiecz/.test(steps) && !/gofrownic/.test(steps)) tags.push('oven');
  if (/grill/.test(steps)) tags.push('grill');
  if (/gofrownic/.test(steps)) tags.push('waffle');
  if (/patelni|garnk|gotuj|ugotuj|zagotuj|podgotuj|smaż|podsmaż|obsmaż|duś|podd[uś]/.test(steps)) tags.push('stovetop');
  return tags;
}