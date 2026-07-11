import { describe, expect, it } from 'vitest';
import { calculateRating } from '../src/utils/rating';

describe('calculateRating', () => {
  it('uses the editorial weights and rounds to one decimal', () => {
    expect(
      calculateRating({
        outputQuality: 8,
        easeOfUse: 7,
        features: 9,
        valueForMoney: 6,
        reliability: 8,
        integrationsAndExport: 7,
        documentationAndSupport: 6,
      }),
    ).toBe(7.5);
  });
});
