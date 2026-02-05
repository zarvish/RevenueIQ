import { getDeals } from '../dataLoader';
import { DriversResponse } from '../types';
import {
  calculateWinRate,
  calculateAverage,
  filterClosedWonDeals,
  filterClosedLostDeals,
  filterOpenDeals,
  filterDealsWithAmount,
  sumDealAmounts,
  calculateSalesCycle,
} from '../utils';

/**
 * Get revenue performance drivers
 * Returns: pipeline size, win rate, avg deal size, sales cycle time
 */
export function getDrivers(): DriversResponse {
  const deals = getDeals();
  
  // Pipeline size (open deals)
  const openDeals = filterOpenDeals(deals);
  const pipelineSize = sumDealAmounts(openDeals);
  
  // Win rate
  const wonDeals = filterClosedWonDeals(deals);
  const lostDeals = filterClosedLostDeals(deals);
  const winRate = calculateWinRate(wonDeals.length, lostDeals.length);
  
  // Average deal size (from won deals with amounts)
  const wonDealsWithAmount = filterDealsWithAmount(wonDeals);
  const averageDealSize = wonDealsWithAmount.length > 0
    ? sumDealAmounts(wonDealsWithAmount) / wonDealsWithAmount.length
    : 0;
  
  // Sales cycle time
  const closedDeals = [...wonDeals, ...lostDeals];
  const salesCycles = closedDeals
    .map(d => calculateSalesCycle(d))
    .filter((cycle): cycle is number => cycle !== null);
  const salesCycleTime = calculateAverage(salesCycles);
  
  return {
    pipelineSize: Math.round(pipelineSize),
    winRate: Math.round(winRate * 10) / 10,
    averageDealSize: Math.round(averageDealSize),
    salesCycleTime: Math.round(salesCycleTime),
  };
}
