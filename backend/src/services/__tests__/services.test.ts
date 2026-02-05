import { getSummary } from '../summaryService';
import { getDrivers } from '../driversService';

describe('Summary Service', () => {
  it('should return summary data structure', () => {
    const summary = getSummary();
    expect(summary).toHaveProperty('currentQuarterRevenue');
    expect(summary).toHaveProperty('target');
    expect(summary).toHaveProperty('gapPercentage');
    expect(summary).toHaveProperty('qoqChange');
    expect(typeof summary.currentQuarterRevenue).toBe('number');
    expect(typeof summary.target).toBe('number');
    expect(typeof summary.gapPercentage).toBe('number');
    expect(typeof summary.qoqChange).toBe('number');
  });

  it('should calculate revenue as non-negative', () => {
    const summary = getSummary();
    expect(summary.currentQuarterRevenue).toBeGreaterThanOrEqual(0);
  });

  it('should calculate target as non-negative', () => {
    const summary = getSummary();
    expect(summary.target).toBeGreaterThanOrEqual(0);
  });
});

describe('Drivers Service', () => {
  it('should return drivers data structure', () => {
    const drivers = getDrivers();
    expect(drivers).toHaveProperty('pipelineSize');
    expect(drivers).toHaveProperty('winRate');
    expect(drivers).toHaveProperty('averageDealSize');
    expect(drivers).toHaveProperty('salesCycleTime');
    expect(typeof drivers.pipelineSize).toBe('number');
    expect(typeof drivers.winRate).toBe('number');
    expect(typeof drivers.averageDealSize).toBe('number');
    expect(typeof drivers.salesCycleTime).toBe('number');
  });

  it('should calculate pipeline as non-negative', () => {
    const drivers = getDrivers();
    expect(drivers.pipelineSize).toBeGreaterThanOrEqual(0);
  });

  it('should calculate win rate between 0 and 100', () => {
    const drivers = getDrivers();
    expect(drivers.winRate).toBeGreaterThanOrEqual(0);
    expect(drivers.winRate).toBeLessThanOrEqual(100);
  });

  it('should calculate average deal size as non-negative', () => {
    const drivers = getDrivers();
    expect(drivers.averageDealSize).toBeGreaterThanOrEqual(0);
  });

  it('should calculate sales cycle time as non-negative', () => {
    const drivers = getDrivers();
    expect(drivers.salesCycleTime).toBeGreaterThanOrEqual(0);
  });
});
