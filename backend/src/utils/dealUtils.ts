import { Deal } from '../types';
import { getDaysBetween } from './dateUtils';

// Deal filtering utilities

export function filterClosedWonDeals(deals: Deal[]): Deal[] {
  return deals.filter(d => d.stage === 'Closed Won');
}

export function filterClosedLostDeals(deals: Deal[]): Deal[] {
  return deals.filter(d => d.stage === 'Closed Lost');
}

export function filterOpenDeals(deals: Deal[]): Deal[] {
  return deals.filter(d => d.stage === 'Prospecting' || d.stage === 'Negotiation');
}

export function filterDealsWithAmount(deals: Deal[]): Deal[] {
  return deals.filter(d => d.amount !== null && d.amount !== undefined);
}

export function sumDealAmounts(deals: Deal[]): number {
  return deals
    .filter(d => d.amount !== null && d.amount !== undefined)
    .reduce((sum, d) => sum + (d.amount as number), 0);
}

export function calculateSalesCycle(deal: Deal): number | null {
  if (!deal.closed_at) return null;
  return getDaysBetween(deal.created_at, deal.closed_at);
}
