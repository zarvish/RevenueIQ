import {
  getDeals,
  getReps,
  getAccountById,
  getRepById,
  getDealsForRep,
  getActivitiesForDeal,
} from '../dataLoader';
import {
  RiskFactorsResponse,
  StaleDeal,
  UnderperformingRep,
  LowActivityAccount,
} from '../types';
import {
  getCurrentDate,
  calculateWinRate,
  filterClosedWonDeals,
  filterClosedLostDeals,
  filterOpenDeals,
  getDaysBetween,
  parseDate,
} from '../utils';

const STALE_THRESHOLD_DAYS = 60;
const LOW_ACTIVITY_DAYS = 30;
const UNDERPERFORMING_WIN_RATE_THRESHOLD = 40;
const UNDERPERFORMING_GAP_THRESHOLD = 20;

/**
 * Identify stale deals (open > 60 days)
 */
function identifyStaleDeals(): StaleDeal[] {
  const deals = getDeals();
  const currentDate = getCurrentDate();
  const openDeals = filterOpenDeals(deals);
  
  return openDeals
    .map(deal => {
      const daysOpen = getDaysBetween(deal.created_at, currentDate.toISOString().split('T')[0]);
      const account = getAccountById(deal.account_id);
      const rep = getRepById(deal.rep_id);
      
      return {
        dealId: deal.deal_id,
        accountName: account?.name || 'Unknown',
        daysOpen,
        amount: deal.amount || 0,
        stage: deal.stage,
        repName: rep?.name || 'Unknown',
      };
    })
    .filter(d => d.daysOpen > STALE_THRESHOLD_DAYS && d.amount > 0)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 10); // Top 10 by value
}

/**
 * Identify underperforming reps (win rate < 40% or < team avg - 20%)
 */
function identifyUnderperformingReps(): UnderperformingRep[] {
  const deals = getDeals();
  const reps = getReps();
  
  const teamWinRate = calculateWinRate(
    filterClosedWonDeals(deals).length,
    filterClosedLostDeals(deals).length
  );
  
  return reps
    .map(rep => {
      const repDeals = getDealsForRep(rep.rep_id);
      const won = filterClosedWonDeals(repDeals).length;
      const lost = filterClosedLostDeals(repDeals).length;
      const winRate = calculateWinRate(won, lost);
      
      return {
        repId: rep.rep_id,
        name: rep.name,
        winRate: Math.round(winRate * 10) / 10,
        dealsWon: won,
        dealsLost: lost,
        totalDeals: won + lost,
      };
    })
    .filter(r => 
      r.totalDeals > 0 && 
      (r.winRate < UNDERPERFORMING_WIN_RATE_THRESHOLD || 
       r.winRate < teamWinRate - UNDERPERFORMING_GAP_THRESHOLD)
    )
    .sort((a, b) => a.winRate - b.winRate);
}

/**
 * Identify low activity accounts (< 2 activities in last 30 days)
 */
function identifyLowActivityAccounts(): LowActivityAccount[] {
  const deals = getDeals();
  const currentDate = getCurrentDate();
  const openDeals = filterOpenDeals(deals);
  
  return openDeals
    .map(deal => {
      const dealActivities = getActivitiesForDeal(deal.deal_id);
      const account = getAccountById(deal.account_id);
      
      const lastActivity = dealActivities.length > 0
        ? dealActivities.sort((a, b) => 
            parseDate(b.timestamp).getTime() - parseDate(a.timestamp).getTime()
          )[0]
        : null;
      
      const daysSinceLastActivity = lastActivity
        ? getDaysBetween(lastActivity.timestamp, currentDate.toISOString().split('T')[0])
        : 999;
      
      return {
        accountId: deal.account_id,
        accountName: account?.name || 'Unknown',
        openDealValue: deal.amount || 0,
        daysSinceLastActivity,
        dealId: deal.deal_id,
      };
    })
    .filter(a => a.daysSinceLastActivity > LOW_ACTIVITY_DAYS && a.openDealValue > 0)
    .sort((a, b) => b.openDealValue - a.openDealValue)
    .slice(0, 10); // Top 10 by value
}

/**
 * Get all risk factors
 * Returns: stale deals, underperforming reps, low activity accounts
 */
export function getRiskFactors(): RiskFactorsResponse {
  return {
    staleDeals: identifyStaleDeals(),
    underperformingReps: identifyUnderperformingReps(),
    lowActivityAccounts: identifyLowActivityAccounts(),
  };
}
