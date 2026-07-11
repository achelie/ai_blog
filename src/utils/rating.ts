export const ratingWeights = {
  outputQuality: 0.25,
  easeOfUse: 0.2,
  features: 0.15,
  valueForMoney: 0.15,
  reliability: 0.1,
  integrationsAndExport: 0.1,
  documentationAndSupport: 0.05,
} as const;

export type RatingDimension = keyof typeof ratingWeights;
export type RatingScores = Record<RatingDimension, number>;

export function calculateRating(scores: RatingScores): number {
  const total = Object.entries(ratingWeights).reduce(
    (sum, [dimension, weight]) => sum + scores[dimension as RatingDimension] * weight,
    0,
  );
  return Math.round(total * 10) / 10;
}

export const ratingLabels: Record<RatingDimension, string> = {
  outputQuality: 'Output quality',
  easeOfUse: 'Ease of use',
  features: 'Features',
  valueForMoney: 'Value for money',
  reliability: 'Reliability',
  integrationsAndExport: 'Integrations & export',
  documentationAndSupport: 'Docs & support',
};
