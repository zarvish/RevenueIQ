# Backend Testing Guide

## Test Suite Overview

The RevenueIQ backend has comprehensive test coverage using **Jest** and **TypeScript** to ensure all critical business logic is correct.

### Test Statistics
- **Test Suites**: 4
- **Total Tests**: 45
- **Coverage**: All utilities and service smoke tests

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Files

### 1. Date Utilities Tests
**File**: `src/utils/__tests__/dateUtils.test.ts`  
**Tests**: 16  
**Coverage**:
- `getDaysBetween()` - 3 tests
  - Calculate days between dates
  - Handle same date
  - Handle date order
- `isInQuarter()` - 9 tests
  - Identify Q4 2025 dates
  - Reject dates outside quarter
  - Handle Q1 correctly
- `getQuarterMonths()` - 4 tests
  - Return correct months for Q1-Q4

### 2. Calculation Utilities Tests
**File**: `src/utils/__tests__/calculationUtils.test.ts`  
**Tests**: 18  
**Coverage**:
- `calculateWinRate()` - 6 tests
  - Calculate win rate correctly
  - Handle zero total deals
  - Handle 100% and 0% win rates
  - Round to decimal places
- `calculateAverage()` - 5 tests
  - Calculate average correctly
  - Handle single value
  - Handle empty array
  - Handle decimals
  - Round to whole number
- `calculatePercentageChange()` - 7 tests
  - Calculate positive/negative changes
  - Handle zero values
  - Handle no change
  - Round to one decimal place

### 3. Deal Utilities Tests
**File**: `src/utils/__tests__/dealUtils.test.ts`  
**Tests**: 8  
**Coverage**:
- `filterClosedWonDeals()` - 1 test
- `filterClosedLostDeals()` - 1 test
- `filterOpenDeals()` - 3 tests
- `filterDealsWithAmount()` - 1 test
- `sumDealAmounts()` - 3 tests
- `calculateSalesCycle()` - 2 tests

### 4. Service Tests
**File**: `src/services/__tests__/services.test.ts`  
**Tests**: 3  
**Coverage**:
- `getSummary()` - Smoke tests for data structure
- `getDrivers()` - Smoke tests for data structure

## Test Configuration

### Jest Config (`jest.config.cjs`)
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
```

## Why Backend Testing Matters

### Critical Business Logic
The backend contains all the revenue intelligence calculations:

1. **Revenue Calculations**
   - Quarterly revenue aggregation
   - Target tracking
   - Gap analysis

2. **Win Rate Computation**
   - Deal success rates
   - Performance metrics

3. **Risk Detection**
   - Stale deal identification
   - Underperforming rep detection
   - Low activity account tracking

4. **Recommendations**
   - Priority-based suggestions
   - Impact calculations

**If these calculations are wrong, the entire product is wrong.**

## Testing Best Practices

### 1. Utility Testing
- Test edge cases (zero, negative, large numbers)
- Test boundary conditions
- Verify rounding and precision

### 2. Service Testing
- Use smoke tests for complex services
- Verify data structure integrity
- Test constraints (non-negative values, ranges)

### 3. Mock Data
- Use realistic test data
- Cover multiple scenarios
- Test null/undefined handling

## Example Test

```typescript
import { calculateWinRate } from '../calculationUtils';

describe('Calculation Utilities', () => {
  describe('calculateWinRate', () => {
    it('should calculate win rate correctly', () => {
      expect(calculateWinRate(50, 50)).toBe(50); // 50 won, 50 lost = 50%
      expect(calculateWinRate(25, 75)).toBe(25); // 25 won, 75 lost = 25%
    });

    it('should handle zero total deals', () => {
      expect(calculateWinRate(0, 0)).toBe(0);
    });
  });
});
```

## Coverage Goals

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

## Test Results

```
Test Suites: 4 passed, 4 total
Tests:       45 passed, 45 total
Snapshots:   0 total
Time:        ~3.5s
```

✅ **All tests passing!**

## Future Test Enhancements

- [ ] Add integration tests for API endpoints
- [ ] Add tests for risk factors service
- [ ] Add tests for recommendations service
- [ ] Increase coverage to 80%+
- [ ] Add performance benchmarks
- [ ] Add data validation tests

## Dependencies

```json
{
  "devDependencies": {
    "jest": "^29.x",
    "@types/jest": "^29.x",
    "ts-jest": "^29.x"
  }
}
```

## Troubleshooting

### Common Issues

**Issue**: `Cannot find module` errors  
**Solution**: Ensure import paths are correct (use `../../` for parent directories)

**Issue**: Tests timing out  
**Solution**: Check for infinite loops or missing async/await

**Issue**: Mock not working  
**Solution**: Ensure `jest.mock()` is called before imports

## Key Takeaways

1. **Backend = Business Logic** - All critical calculations happen here
2. **Test Utilities First** - They're the building blocks
3. **Smoke Tests for Services** - Verify structure and constraints
4. **Edge Cases Matter** - Zero, null, negative values
5. **Keep Tests Fast** - Avoid external dependencies

---

**Remember**: The backend is the source of truth for all revenue intelligence. Comprehensive testing ensures accuracy and reliability.
