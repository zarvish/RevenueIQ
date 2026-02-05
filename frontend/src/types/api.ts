// API Response Types (matching backend)

export interface SummaryResponse {
  currentQuarterRevenue: number;
  target: number;
  gapPercentage: number;
  qoqChange: number;
}

export interface DriversResponse {
  pipelineSize: number;
  winRate: number;
  averageDealSize: number;
  salesCycleTime: number;
}

export interface StaleDeal {
  dealId: string;
  accountName: string;
  daysOpen: number;
  amount: number;
  stage: string;
  repName: string;
}

export interface UnderperformingRep {
  repId: string;
  name: string;
  winRate: number;
  dealsWon: number;
  dealsLost: number;
  totalDeals: number;
}

export interface LowActivityAccount {
  accountId: string;
  accountName: string;
  openDealValue: number;
  daysSinceLastActivity: number;
  dealId: string;
}

export interface RiskFactorsResponse {
  staleDeals: StaleDeal[];
  underperformingReps: UnderperformingRep[];
  lowActivityAccounts: LowActivityAccount[];
}

export interface Recommendation {
  priority: 'high' | 'medium' | 'low';
  category: 'deals' | 'coaching' | 'activity' | 'strategic';
  message: string;
  impact: string;
}

export interface RecommendationsResponse {
  recommendations: Recommendation[];
}
