import { calculateWinRate, calculateAverage, calculatePercentageChange } from '../calculationUtils';

describe('Calculation Utilities', () => {
  describe('calculateWinRate', () => {
    it('should calculate win rate correctly', () => {
      expect(calculateWinRate(50, 50)).toBe(50); // 50 won, 50 lost = 50%
      expect(calculateWinRate(25, 75)).toBe(25); // 25 won, 75 lost = 25%
      expect(calculateWinRate(75, 25)).toBe(75); // 75 won, 25 lost = 75%
    });

    it('should handle zero total deals', () => {
      expect(calculateWinRate(0, 0)).toBe(0);
    });

    it('should handle 100% win rate', () => {
      expect(calculateWinRate(10, 0)).toBe(100);
    });

    it('should handle 0% win rate', () => {
      expect(calculateWinRate(0, 10)).toBe(0);
    });

    it('should round to decimal places', () => {
      expect(calculateWinRate(1, 2)).toBeCloseTo(33.3, 1);
      expect(calculateWinRate(2, 1)).toBeCloseTo(66.7, 1);
    });
  });

  describe('calculateAverage', () => {
    it('should calculate average correctly', () => {
      expect(calculateAverage([10, 20, 30])).toBe(20);
      expect(calculateAverage([100, 200, 300])).toBe(200);
    });

    it('should handle single value', () => {
      expect(calculateAverage([42])).toBe(42);
    });

    it('should handle empty array', () => {
      expect(calculateAverage([])).toBe(0);
    });

    it('should handle decimals', () => {
      expect(calculateAverage([1.5, 2.5, 3.5])).toBeCloseTo(2.5, 1);
    });

    it('should round to whole number', () => {
      expect(calculateAverage([10, 15, 20])).toBe(15);
    });
  });

  describe('calculatePercentageChange', () => {
    it('should calculate positive percentage change', () => {
      expect(calculatePercentageChange(150, 100)).toBeCloseTo(50, 1);
      expect(calculatePercentageChange(300, 200)).toBeCloseTo(50, 1);
    });

    it('should calculate negative percentage change', () => {
      expect(calculatePercentageChange(100, 150)).toBeCloseTo(-33.3, 1);
      expect(calculatePercentageChange(200, 300)).toBeCloseTo(-33.3, 1);
    });

    it('should handle zero previous value', () => {
      expect(calculatePercentageChange(100, 0)).toBe(100);
      expect(calculatePercentageChange(0, 0)).toBe(0);
    });

    it('should handle zero current value', () => {
      expect(calculatePercentageChange(0, 100)).toBeCloseTo(-100, 1);
    });

    it('should handle no change', () => {
      expect(calculatePercentageChange(100, 100)).toBe(0);
    });

    it('should round to one decimal place', () => {
      expect(calculatePercentageChange(133.333, 100)).toBeCloseTo(33.3, 1);
    });
  });
});
