import fs from 'fs';
import path from 'path';
import { Account, Rep, Deal, Activity, Target } from './types';

// Data storage
let accounts: Account[] = [];
let reps: Rep[] = [];
let deals: Deal[] = [];
let activities: Activity[] = [];
let targets: Target[] = [];

// Load all JSON data files
export function loadData(): void {
  const dataDir = path.join(__dirname, '../../data');
  
  try {
    accounts = JSON.parse(fs.readFileSync(path.join(dataDir, 'accounts.json'), 'utf-8'));
    reps = JSON.parse(fs.readFileSync(path.join(dataDir, 'reps.json'), 'utf-8'));
    deals = JSON.parse(fs.readFileSync(path.join(dataDir, 'deals.json'), 'utf-8'));
    activities = JSON.parse(fs.readFileSync(path.join(dataDir, 'activities.json'), 'utf-8'));
    targets = JSON.parse(fs.readFileSync(path.join(dataDir, 'targets.json'), 'utf-8'));
    
    console.log('✅ Data loaded successfully:');
    console.log(`   - ${accounts.length} accounts`);
    console.log(`   - ${reps.length} reps`);
    console.log(`   - ${deals.length} deals`);
    console.log(`   - ${activities.length} activities`);
    console.log(`   - ${targets.length} targets`);
  } catch (error) {
    console.error('❌ Error loading data:', error);
    throw error;
  }
}

// Getters for data access
export const getAccounts = (): Account[] => accounts;
export const getReps = (): Rep[] => reps;
export const getDeals = (): Deal[] => deals;
export const getActivities = (): Activity[] => activities;
export const getTargets = (): Target[] => targets;

// Helper: Get account by ID
export const getAccountById = (accountId: string): Account | undefined => {
  return accounts.find(a => a.account_id === accountId);
};

// Helper: Get rep by ID
export const getRepById = (repId: string): Rep | undefined => {
  return reps.find(r => r.rep_id === repId);
};

// Helper: Get activities for a deal
export const getActivitiesForDeal = (dealId: string): Activity[] => {
  return activities.filter(a => a.deal_id === dealId);
};

// Helper: Get deals for an account
export const getDealsForAccount = (accountId: string): Deal[] => {
  return deals.filter(d => d.account_id === accountId);
};

// Helper: Get deals for a rep
export const getDealsForRep = (repId: string): Deal[] => {
  return deals.filter(d => d.rep_id === repId);
};
