// Mathematical calculation utilities

export function calculateWinRate(wonDeals: number, lostDeals: number): number {
  const total = wonDeals + lostDeals;
  if (total === 0) return 0;
  return (wonDeals / total) * 100;
}

export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}
