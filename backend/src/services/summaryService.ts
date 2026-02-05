import {
  getDeals,
  getTargets,
} from '../dataLoader';
import { SummaryResponse } from '../types';
import {
  getCurrentDate,
  getQuarter,
  getYear,
  isInQuarter,
  getQuarterMonths,
  calculatePercentageChange,
  filterClosedWonDeals,
  sumDealAmounts,
} from '../utils';

/**
 * Get current quarter performance summary
 * Returns: revenue, target, gap %, and QoQ change
 */
export function getSummary(): SummaryResponse {
  const currentDate = getCurrentDate();
  const currentYear = getYear(currentDate);
  const currentQuarter = getQuarter(currentDate);
  
  const deals = getDeals();
  const targets = getTargets();
  
  // Current quarter revenue
  const currentQuarterDeals = filterClosedWonDeals(deals).filter(d =>
    d.closed_at && isInQuarter(d.closed_at, currentYear, currentQuarter)
  );
  const currentQuarterRevenue = sumDealAmounts(currentQuarterDeals);
  
  // Current quarter target
  const quarterMonths = getQuarterMonths(currentYear, currentQuarter);
  const target = targets
    .filter(t => quarterMonths.includes(t.month))
    .reduce((sum, t) => sum + t.target, 0);
  
  // Gap percentage
  const gapPercentage = calculatePercentageChange(currentQuarterRevenue, target);
  
  // QoQ change (previous quarter)
  const prevQuarter = currentQuarter === 1 ? 4 : currentQuarter - 1;
  const prevYear = currentQuarter === 1 ? currentYear - 1 : currentYear;
  const prevQuarterDeals = filterClosedWonDeals(deals).filter(d =>
    d.closed_at && isInQuarter(d.closed_at, prevYear, prevQuarter)
  );
  const prevQuarterRevenue = sumDealAmounts(prevQuarterDeals);
  const qoqChange = calculatePercentageChange(currentQuarterRevenue, prevQuarterRevenue);
  
  return {
    currentQuarterRevenue: Math.round(currentQuarterRevenue),
    target: Math.round(target),
    gapPercentage: Math.round(gapPercentage * 10) / 10,
    qoqChange: Math.round(qoqChange * 10) / 10,
  };
}
