import { getDaysBetween, isInQuarter, getQuarterMonths } from '../dateUtils';

describe('Date Utilities', () => {
  describe('getDaysBetween', () => {
    it('should calculate days between two dates', () => {
      expect(getDaysBetween('2025-01-01', '2025-01-10')).toBe(9);
      expect(getDaysBetween('2025-01-01', '2025-02-01')).toBe(31);
    });

    it('should handle same date', () => {
      expect(getDaysBetween('2025-01-01', '2025-01-01')).toBe(0);
    });

    it('should handle negative differences (earlier to later)', () => {
      expect(getDaysBetween('2025-01-10', '2025-01-01')).toBe(9); // Always positive
    });
  });

  describe('isInQuarter', () => {
    it('should identify Q4 2025 dates correctly', () => {
      expect(isInQuarter('2025-10-15', 2025, 4)).toBe(true);
      expect(isInQuarter('2025-11-01', 2025, 4)).toBe(true);
      expect(isInQuarter('2025-12-31', 2025, 4)).toBe(true);
    });

    it('should reject dates outside Q4 2025', () => {
      expect(isInQuarter('2025-09-30', 2025, 4)).toBe(false);
      expect(isInQuarter('2026-01-01', 2026, 4)).toBe(false);
      expect(isInQuarter('2024-10-15', 2024, 4)).toBe(true); // This IS in Q4 2024
    });

    it('should handle Q1 correctly', () => {
      expect(isInQuarter('2025-01-15', 2025, 1)).toBe(true);
      expect(isInQuarter('2025-02-15', 2025, 1)).toBe(true);
      expect(isInQuarter('2025-03-15', 2025, 1)).toBe(true);
      expect(isInQuarter('2025-04-01', 2025, 1)).toBe(false);
    });
  });

  describe('getQuarterMonths', () => {
    it('should return correct months for Q4', () => {
      const months = getQuarterMonths(2025, 4);
      expect(months).toEqual(['2025-10', '2025-11', '2025-12']);
    });

    it('should return correct months for Q1', () => {
      const months = getQuarterMonths(2025, 1);
      expect(months).toEqual(['2025-01', '2025-02', '2025-03']);
    });

    it('should return correct months for Q2', () => {
      const months = getQuarterMonths(2025, 2);
      expect(months).toEqual(['2025-04', '2025-05', '2025-06']);
    });

    it('should return correct months for Q3', () => {
      const months = getQuarterMonths(2025, 3);
      expect(months).toEqual(['2025-07', '2025-08', '2025-09']);
    });
  });
});
