import { getDeals, getAccountById } from '../dataLoader';
import { RecommendationsResponse, Recommendation } from '../types';
import { filterClosedWonDeals, filterOpenDeals } from '../utils';
import { getSummary } from './summaryService';
import { getRiskFactors } from './riskFactorsService';

/**
 * Generate stale deals recommendation
 */
function generateStaleDealsRecommendation(staleDeals: any[]): Recommendation | null {
  if (staleDeals.length === 0) return null;
  
  const enterpriseStale = staleDeals.filter(d => {
    const account = getAccountById(d.accountId || '');
    return account?.segment === 'Enterprise';
  });
  
  if (enterpriseStale.length > 0) {
    const totalValue = enterpriseStale.reduce((sum, d) => sum + d.amount, 0);
    return {
      priority: 'high',
      category: 'deals',
      message: `Focus on ${enterpriseStale.length} Enterprise deals older than 60 days`,
      impact: `Could recover $${Math.round(totalValue).toLocaleString()} in pipeline`,
    };
  }
  
  const totalValue = staleDeals.slice(0, 5).reduce((sum, d) => sum + d.amount, 0);
  return {
    priority: 'high',
    category: 'deals',
    message: `Address ${staleDeals.length} stale deals - top 5 worth $${Math.round(totalValue).toLocaleString()}`,
    impact: 'Prevent pipeline decay',
  };
}

/**
 * Generate underperforming reps recommendation
 */
function generateCoachingRecommendation(underperformingReps: any[]): Recommendation | null {
  if (underperformingReps.length === 0) return null;
  
  const worstRep = underperformingReps[0];
  return {
    priority: 'high',
    category: 'coaching',
    message: `Coach ${worstRep.name} on win rate - currently at ${worstRep.winRate}% vs team average`,
    impact: `Could improve team performance by ${underperformingReps.length} reps`,
  };
}

/**
 * Generate low activity accounts recommendation
 */
function generateActivityRecommendation(lowActivityAccounts: any[]): Recommendation | null {
  if (lowActivityAccounts.length === 0) return null;
  
  const totalValue = lowActivityAccounts.reduce((sum, a) => sum + a.openDealValue, 0);
  return {
    priority: 'medium',
    category: 'activity',
    message: `Increase activity for ${lowActivityAccounts.length} accounts with no contact in 30+ days`,
    impact: `Re-engage $${Math.round(totalValue).toLocaleString()} in pipeline`,
  };
}

/**
 * Generate industry-based strategic recommendation
 */
function generateIndustryRecommendation(): Recommendation | null {
  const deals = getDeals();
  const wonDeals = filterClosedWonDeals(deals);
  const industryPerformance = new Map<string, { revenue: number; count: number }>();
  
  wonDeals.forEach(deal => {
    const account = getAccountById(deal.account_id);
    if (account && deal.amount) {
      const current = industryPerformance.get(account.industry) || { revenue: 0, count: 0 };
      industryPerformance.set(account.industry, {
        revenue: current.revenue + deal.amount,
        count: current.count + 1,
      });
    }
  });
  
  let bestIndustry = '';
  let bestAvg = 0;
  industryPerformance.forEach((data, industry) => {
    const avg = data.revenue / data.count;
    if (avg > bestAvg) {
      bestAvg = avg;
      bestIndustry = industry;
    }
  });
  
  if (!bestIndustry) return null;
  
  return {
    priority: 'medium',
    category: 'strategic',
    message: `${bestIndustry} deals have ${Math.round(bestAvg / 1000)}K average deal size - consider focusing more resources here`,
    impact: 'Optimize resource allocation for higher returns',
  };
}

/**
 * Generate pipeline health recommendation
 */
function generatePipelineHealthRecommendation(): Recommendation | null {
  const summary = getSummary();
  
  if (summary.gapPercentage >= -10) return null;
  
  return {
    priority: 'high',
    category: 'strategic',
    message: `Currently ${Math.abs(summary.gapPercentage).toFixed(1)}% behind target - accelerate deal closures and increase pipeline generation`,
    impact: `Need $${Math.round(summary.target - summary.currentQuarterRevenue).toLocaleString()} to hit target`,
  };
}

/**
 * Get actionable recommendations (3-5 suggestions)
 */
export function getRecommendations(): RecommendationsResponse {
  const riskFactors = getRiskFactors();
  const recommendations: Recommendation[] = [];
  
  // Generate all possible recommendations
  const staleDealsRec = generateStaleDealsRecommendation(riskFactors.staleDeals);
  const coachingRec = generateCoachingRecommendation(riskFactors.underperformingReps);
  const activityRec = generateActivityRecommendation(riskFactors.lowActivityAccounts);
  const industryRec = generateIndustryRecommendation();
  const pipelineHealthRec = generatePipelineHealthRecommendation();
  
  // Add non-null recommendations
  if (staleDealsRec) recommendations.push(staleDealsRec);
  if (coachingRec) recommendations.push(coachingRec);
  if (activityRec) recommendations.push(activityRec);
  if (industryRec) recommendations.push(industryRec);
  if (pipelineHealthRec) recommendations.push(pipelineHealthRec);
  
  // Sort by priority and return top 5
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  return {
    recommendations: recommendations
      .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
      .slice(0, 5),
  };
}
