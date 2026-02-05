// Core data models

export interface Account {
  account_id: string;
  name: string;
  industry: string;
  segment: 'SMB' | 'Mid-Market' | 'Enterprise';
}

export interface Rep {
  rep_id: string;
  name: string;
}

export interface Deal {
  deal_id: string;
  account_id: string;
  rep_id: string;
  stage: 'Prospecting' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  amount: number | null;
  created_at: string; // YYYY-MM-DD
  closed_at: string | null; // YYYY-MM-DD
}

export interface Activity {
  activity_id: string;
  deal_id: string;
  type: 'email' | 'call' | 'demo';
  timestamp: string; // YYYY-MM-DD
}

export interface Target {
  month: string; // YYYY-MM
  target: number;
}
