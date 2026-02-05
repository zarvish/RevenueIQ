import { Deal } from '../../types';
import { 
  filterClosedWonDeals, 
  filterClosedLostDeals, 
  filterOpenDeals,
  filterDealsWithAmount,
  sumDealAmounts,
  calculateSalesCycle
} from '../dealUtils';

const mockDeals: Deal[] = [
  {
    deal_id: 'D001',
    account_id: 'A001',
    rep_id: 'R001',
    stage: 'Closed Won',
    amount: 50000,
    created_at: '2025-10-01',
    closed_at: '2025-11-15',
  },
  {
    deal_id: 'D002',
    account_id: 'A002',
    rep_id: 'R002',
    stage: 'Closed Lost',
    amount: 30000,
    created_at: '2025-09-01',
    closed_at: '2025-10-10',
  },
  {
    deal_id: 'D003',
    account_id: 'A003',
    rep_id: 'R003',
    stage: 'Prospecting',
    amount: 75000,
    created_at: '2025-11-01',
    closed_at: null,
  },
  {
    deal_id: 'D004',
    account_id: 'A004',
    rep_id: 'R004',
    stage: 'Negotiation',
    amount: 100000,
    created_at: '2025-12-01',
    closed_at: null,
  },
  {
    deal_id: 'D005',
    account_id: 'A005',
    rep_id: 'R005',
    stage: 'Closed Won',
    amount: null,
    created_at: '2025-08-01',
    closed_at: '2025-09-15',
  },
];

describe('Deal Utilities', () => {
  describe('filterClosedWonDeals', () => {
    it('should filter closed won deals', () => {
      const wonDeals = filterClosedWonDeals(mockDeals);
      expect(wonDeals).toHaveLength(2);
      expect(wonDeals.every(d => d.stage === 'Closed Won')).toBe(true);
    });
  });

  describe('filterClosedLostDeals', () => {
    it('should filter closed lost deals', () => {
      const lostDeals = filterClosedLostDeals(mockDeals);
      expect(lostDeals).toHaveLength(1);
      expect(lostDeals[0].deal_id).toBe('D002');
    });
  });

  describe('filterOpenDeals', () => {
    it('should return only open deals', () => {
      const openDeals = filterOpenDeals(mockDeals);
      expect(openDeals).toHaveLength(2); // D003 and D004
      expect(openDeals.every(d => d.stage === 'Prospecting' || d.stage === 'Negotiation')).toBe(true);
    });

    it('should exclude closed deals', () => {
      const openDeals = filterOpenDeals(mockDeals);
      expect(openDeals.every(d => d.stage !== 'Closed Won' && d.stage !== 'Closed Lost')).toBe(true);
    });

    it('should handle empty array', () => {
      const result = filterOpenDeals([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('filterDealsWithAmount', () => {
    it('should filter deals with non-null amounts', () => {
      const dealsWithAmount = filterDealsWithAmount(mockDeals);
      expect(dealsWithAmount).toHaveLength(4);
      expect(dealsWithAmount.every(d => d.amount !== null)).toBe(true);
    });
  });

  describe('sumDealAmounts', () => {
    it('should sum all deal amounts', () => {
      const total = sumDealAmounts(mockDeals);
      expect(total).toBe(255000); // 50000 + 30000 + 75000 + 100000
    });

    it('should exclude null amounts', () => {
      const total = sumDealAmounts(mockDeals);
      expect(total).toBe(255000); // D005 has null amount
    });

    it('should handle empty array', () => {
      expect(sumDealAmounts([])).toBe(0);
    });
  });

  describe('calculateSalesCycle', () => {
    it('should calculate sales cycle for closed deals', () => {
      const cycle = calculateSalesCycle(mockDeals[0]);
      expect(cycle).toBe(45); // Oct 1 to Nov 15
    });

    it('should return null for open deals', () => {
      const cycle = calculateSalesCycle(mockDeals[2]);
      expect(cycle).toBeNull();
    });
  });
});
