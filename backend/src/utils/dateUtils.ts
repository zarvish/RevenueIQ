// Date-related utility functions

export function parseDate(dateStr: string): Date {
  return new Date(dateStr);
}

export function getDaysBetween(date1: string, date2: string): number {
  const d1 = parseDate(date1);
  const d2 = parseDate(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getCurrentDate(): Date {
  // For this assignment, we'll use Q4 2025 as "current quarter"
  // This aligns with the data which spans 2025
  return new Date('2025-12-31');
}

export function getQuarter(date: Date): number {
  return Math.floor(date.getMonth() / 3) + 1;
}

export function getYear(date: Date): number {
  return date.getFullYear();
}

export function isInQuarter(dateStr: string, year: number, quarter: number): boolean {
  const date = parseDate(dateStr);
  return getYear(date) === year && getQuarter(date) === quarter;
}

export function getQuarterMonths(year: number, quarter: number): string[] {
  const startMonth = (quarter - 1) * 3 + 1;
  const months: string[] = [];
  
  for (let i = 0; i < 3; i++) {
    const month = startMonth + i;
    const monthStr = month.toString().padStart(2, '0');
    months.push(`${year}-${monthStr}`);
  }
  
  return months;
}
