# RevenueIQ - Terminologies, Data Structure & API Requirements Guide 📚

> **Quick Reference Guide**: Understanding the data files and API requirements for the RevenueIQ sales analytics system

---

## 📁 Data Files Overview

### 1. **accounts.json** - Customer Companies Directory

**Purpose**: List of all companies you're selling to or trying to sell to

**Fields**:
- `account_id`: Unique identifier (A1, A2, A3...)
- `name`: Company name (Company_1, Company_2...)
- `industry`: Business sector
  - SaaS (Software as a Service)
  - FinTech (Financial Technology)
  - Healthcare
  - EdTech (Education Technology)
  - Ecommerce
- `segment`: Company size category
  - **SMB**: Small/Medium Business
  - **Mid-Market**: Medium-sized companies
  - **Enterprise**: Large corporations

**Example**:
```json
{
  "account_id": "A85",
  "name": "Company_85",
  "industry": "SaaS",
  "segment": "Enterprise"
}
```

---

### 2. **reps.json** - Sales Team Roster

**Purpose**: Your sales representatives who handle deals

**Fields**:
- `rep_id`: Unique identifier (R1, R2, R3...)
- `name`: Salesperson's name (Ankit, Priya, Rahul...)

**Example**:
```json
{
  "rep_id": "R7",
  "name": "Neha"
}
```

**Total**: 15 sales reps (R1 through R15)

---

### 3. **deals.json** - Sales Opportunities

**Purpose**: Each potential sale or closed transaction

**Fields**:
- `deal_id`: Unique identifier (D1, D2, D3...)
- `account_id`: Which company (links to accounts.json)
- `rep_id`: Which salesperson (links to reps.json)
- `stage`: Current status
  - **Prospecting**: Initial contact phase
  - **Negotiation**: Discussing terms and pricing
  - **Closed Won**: Successfully sold! ✅
  - **Closed Lost**: Deal failed ❌
- `amount`: Deal value in dollars (can be null)
- `created_at`: Deal start date (YYYY-MM-DD)
- `closed_at`: Deal end date (YYYY-MM-DD or null if still open)

**Example**:
```json
{
  "deal_id": "D1",
  "account_id": "A85",
  "rep_id": "R7",
  "stage": "Closed Won",
  "amount": 60519,
  "created_at": "2025-04-08",
  "closed_at": null
}
```

---

### 4. **activities.json** - Sales Actions Log

**Purpose**: Record of every interaction with customers

**Fields**:
- `activity_id`: Unique identifier (ACT1, ACT2...)
- `deal_id`: Which deal (links to deals.json)
- `type`: Type of interaction
  - **email**: Email sent to customer
  - **call**: Phone conversation
  - **demo**: Product demonstration
- `timestamp`: When it happened (YYYY-MM-DD)

**Example**:
```json
{
  "activity_id": "ACT48",
  "deal_id": "D1",
  "type": "call",
  "timestamp": "2025-02-14"
}
```

---

### 5. **targets.json** - Monthly Revenue Goals

**Purpose**: Company's revenue targets for each month

**Fields**:
- `month`: Month identifier (YYYY-MM)
- `target`: Revenue goal in dollars

**Example**:
```json
{
  "month": "2025-04",
  "target": 190480
}
```

---

## 🔗 How Data Files Connect

```
┌─────────────────┐
│  TARGETS.json   │ ← Monthly revenue goals
└────────┬────────┘
         │
         ↓ (Measure against)
┌─────────────────┐
│   DEALS.json    │ ← Sales opportunities
└────┬────────┬───┘
     │        │
     ↓        ↓
┌─────────┐  ┌──────────┐
│ACCOUNTS │  │   REPS   │
│  .json  │  │  .json   │
└─────────┘  └──────────┘
     ↑
     │ (Track engagement)
┌─────────────────┐
│ ACTIVITIES.json │
└─────────────────┘
```

**Real Example Flow**:
1. **Neha** (R7) from reps.json
2. Works with **Company_85** (A85) from accounts.json
3. Creates **Deal D1** worth $60,519 in deals.json
4. Makes a **phone call** (ACT48) logged in activities.json
5. Closes the deal, contributing to **April 2025 target** ($190,480) from targets.json

---

## 🎯 API Requirements

### 1. `/api/summary` - Dashboard Overview

**Purpose**: High-level performance snapshot

**Calculations**:

#### Current Quarter Revenue
- **What**: Total money earned this quarter
- **How**: Sum all `amount` from deals where:
  - `stage = "Closed Won"`
  - `closed_at` is in current quarter
- **Example**: Q2 2025 (Apr-Jun) = all won deals from April 1 to June 30

#### Target
- **What**: Revenue goal for current quarter
- **How**: Sum 3 months of targets from targets.json
- **Example**: Q2 2025 = April ($190,480) + May ($241,349) + June ($187,956) = $619,785

#### Gap (%)
- **What**: Performance vs target
- **Formula**: `((Current Revenue - Target) / Target) × 100`
- **Example**: $500K revenue vs $619K target = -19.3% (behind target)

#### YoY or QoQ Change
- **What**: Growth compared to previous period
- **YoY**: Year over Year (Q2 2025 vs Q2 2024)
- **QoQ**: Quarter over Quarter (Q2 2025 vs Q1 2025)
- **Formula**: `((This Quarter - Previous Quarter) / Previous Quarter) × 100`
- **Example**: $400K → $500K = +25% growth

**Response Example**:
```json
{
  "currentQuarterRevenue": 500000,
  "target": 619785,
  "gapPercentage": -19.3,
  "qoqChange": 25.0
}
```

---

### 2. `/api/drivers` - Performance Metrics

**Purpose**: Explain WHY revenue is what it is

**Calculations**:

#### Pipeline Size
- **What**: Total value of open deals
- **How**: Sum `amount` from deals where:
  - `stage = "Prospecting"` OR `stage = "Negotiation"`
- **Why it matters**: Shows future revenue potential
- **Example**: 50 open deals = $2M pipeline

#### Win Rate
- **What**: Percentage of deals won
- **Formula**: `(Closed Won / (Closed Won + Closed Lost)) × 100`
- **Why it matters**: Measures sales effectiveness
- **Example**: 30 won + 20 lost = 60% win rate

#### Average Deal Size
- **What**: Typical deal value
- **Formula**: `Total Revenue / Number of Won Deals`
- **Why it matters**: Bigger deals = more efficient revenue
- **Example**: $500K ÷ 30 deals = $16,667 per deal

#### Sales Cycle Time
- **What**: Average days to close a deal
- **Formula**: Average of `(closed_at - created_at)` for all closed deals
- **Why it matters**: Shorter = faster revenue
- **Example**: Average 45 days from start to close

**Response Example**:
```json
{
  "pipelineSize": 2000000,
  "winRate": 60.0,
  "averageDealSize": 16667,
  "salesCycleTime": 45
}
```

---

### 3. `/api/risk-factors` - Early Warning System

**Purpose**: Identify problems before they become critical

**Identifications**:

#### Stale Deals
- **What**: Deals open too long without closing
- **How to identify**: 
  - Find deals with `stage = "Prospecting"` or `"Negotiation"`
  - Calculate days since `created_at`
  - Flag if > 30-60 days old
- **Why it matters**: Old deals rarely close - need action or abandonment
- **Example**: Deal D123 in Negotiation for 90 days with $50K value

#### Underperforming Reps
- **What**: Salespeople with low win rates
- **How to identify**:
  - Calculate win rate per rep
  - Compare to team average
  - Flag if < 50% or significantly below average
- **Why it matters**: May need coaching or training
- **Example**: Rahul (R3) has 20% win rate vs team average 60%

#### Low Activity Accounts
- **What**: Accounts with open deals but no recent contact
- **How to identify**:
  - For each account with open deals
  - Count activities in last 30 days
  - Flag if < 2 activities per month
- **Why it matters**: No contact = no progress = no sale
- **Example**: Company_78 has $50K deal but zero contact in 45 days

**Response Example**:
```json
{
  "staleDeals": [
    {
      "dealId": "D123",
      "accountName": "Company_45",
      "daysOpen": 90,
      "amount": 50000,
      "stage": "Negotiation"
    }
  ],
  "underperformingReps": [
    {
      "repId": "R3",
      "name": "Rahul",
      "winRate": 20.0,
      "dealsWon": 3,
      "dealsLost": 12
    }
  ],
  "lowActivityAccounts": [
    {
      "accountId": "A78",
      "accountName": "Company_78",
      "openDealValue": 50000,
      "daysSinceLastActivity": 45
    }
  ]
}
```

---

### 4. `/api/recommendations` - AI Sales Coach

**Purpose**: Provide 3-5 specific, actionable suggestions

**Recommendation Types**:

#### Deal-Focused
- **When**: Stale deals identified
- **Example**: *"Focus on Enterprise deals older than 30 days - there are 5 deals worth $250K at risk"*
- **How to generate**: Group stale deals by segment, prioritize highest value

#### Rep Coaching
- **When**: Underperforming reps identified
- **Example**: *"Coach Rep Rahul (R3) on win rate - currently at 20% vs team average of 60%"*
- **How to generate**: Compare individual vs team metrics, suggest coaching

#### Activity-Based
- **When**: Low activity accounts found
- **Example**: *"Increase activity for Mid-Market segment - 8 accounts have had no contact in 30+ days"*
- **How to generate**: Group low-activity accounts, suggest outreach campaigns

#### Strategic
- **When**: Data shows opportunities
- **Example**: *"Average deal size in Healthcare is 2x higher - consider focusing more resources there"*
- **How to generate**: Analyze performance by industry/segment, suggest resource allocation

**Response Example**:
```json
{
  "recommendations": [
    {
      "priority": "high",
      "category": "deals",
      "message": "Focus on Enterprise deals older than 30 days - there are 5 deals worth $250K at risk",
      "impact": "Could recover $250K in revenue"
    },
    {
      "priority": "high",
      "category": "coaching",
      "message": "Coach Rep Rahul (R3) on win rate - currently at 20% vs team average of 60%",
      "impact": "Could improve team win rate by 5%"
    },
    {
      "priority": "medium",
      "category": "activity",
      "message": "Increase activity for Mid-Market segment - 8 accounts have had no contact in 30+ days",
      "impact": "Re-engage $180K in pipeline"
    }
  ]
}
```

---

## 📊 Key Metrics Glossary

| Metric | Definition | Formula | Good Benchmark |
|--------|------------|---------|----------------|
| **Win Rate** | % of deals won | Won / (Won + Lost) × 100 | > 50% |
| **Pipeline Size** | Value of open deals | Sum of open deal amounts | 3-4x quarterly target |
| **Sales Cycle** | Days to close | Avg (closed_at - created_at) | < 60 days |
| **Average Deal Size** | Revenue per deal | Total Revenue / # Deals | Industry dependent |
| **Gap %** | Target performance | (Actual - Target) / Target × 100 | > 0% (on/above target) |

---

## 🎓 Quick Reference: Business Terms

- **Quarter (Q)**: 3-month period (Q1: Jan-Mar, Q2: Apr-Jun, Q3: Jul-Sep, Q4: Oct-Dec)
- **YoY**: Year over Year comparison (same period, different years)
- **QoQ**: Quarter over Quarter comparison (consecutive quarters)
- **Pipeline**: Collection of potential future deals
- **Stale Deal**: Deal open too long without progress
- **Win Rate**: Success rate in closing deals
- **Sales Cycle**: Time from first contact to deal close
- **SMB**: Small/Medium Business (typically < 500 employees)
- **Mid-Market**: Medium companies (500-5000 employees)
- **Enterprise**: Large corporations (> 5000 employees)

---

## 🚀 System Purpose

This system acts as a **24/7 sales analyst** that:
1. 📊 **Shows the scoreboard** (Summary API)
2. 🔍 **Explains the score** (Drivers API)
3. 🚨 **Warns about problems** (Risk Factors API)
4. 💡 **Recommends actions** (Recommendations API)

**Goal**: Help sales teams make data-driven decisions to close more deals and hit revenue targets!
