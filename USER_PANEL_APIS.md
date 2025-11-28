# UserPanel API Requirements

This document outlines all the APIs required to make the UserPanel component fully dynamic.

## Summary

**Total APIs Required: 4**

The UserPanel component requires **4 distinct API endpoints** to fetch all its data dynamically:

1. **Lead Metrics API** - `/dashboard/lead-metrics`
2. **Approvals API** - `/dashboard/approvals`
3. **Performance Metrics API** - `/dashboard/performance`
4. **Leads Funnel API** - `/dashboard/funnel`

---

## API Details

### 1. Lead Metrics API

**Endpoint:** `GET /dashboard/lead-metrics?days={timePeriod}`

**Purpose:** Fetches metrics for 10 different lead statuses/categories

**Query Parameters:**

- `days` (number): Time period in days (7, 30, or 90). Default: 30

**Response Structure:**

```json
{
  "metrics": [
    {
      "id": "newLead",
      "value": 45,
      "change": "12.5"
    },
    {
      "id": "missedCalls",
      "value": 23,
      "change": "-5.2"
    },
    {
      "id": "unreadEmail",
      "value": 67,
      "change": "8.3"
    },
    {
      "id": "unreadWA",
      "value": 34,
      "change": "15.7"
    },
    {
      "id": "reEngaged",
      "value": 28,
      "change": "3.1"
    },
    {
      "id": "prospect",
      "value": 56,
      "change": "10.2"
    },
    {
      "id": "untouched",
      "value": 19,
      "change": "-2.4"
    },
    {
      "id": "attempt",
      "value": 42,
      "change": "7.8"
    },
    {
      "id": "onHold",
      "value": 15,
      "change": "-1.5"
    },
    {
      "id": "enrolled",
      "value": 89,
      "change": "18.9"
    }
  ]
}
```

**Required Metric IDs:**

- `newLead` - New Lead count
- `missedCalls` - Missed Calls count
- `unreadEmail` - Unread Email count
- `unreadWA` - Unread WhatsApp count
- `reEngaged` - Re-engaged leads count
- `prospect` - Prospect count
- `untouched` - Untouched leads count
- `attempt` - Attempt count
- `onHold` - On Hold count
- `enrolled` - Enrolled count

**Fields:**

- `id` (string): Unique identifier matching the metric type
- `value` (number): Current count/value
- `change` (string): Percentage change from previous period (can be positive or negative)

---

### 2. Approvals API

**Endpoint:** `GET /dashboard/approvals?days={timePeriod}`

**Purpose:** Fetches approval statistics

**Query Parameters:**

- `days` (number): Time period in days (7, 30, or 90). Default: 30

**Response Structure:**

```json
{
  "sent": 75,
  "received": 62,
  "all": 28
}
```

**Fields:**

- `sent` (number): Number of approvals sent
- `received` (number): Number of approvals received
- `all` (number): Total number of all approvals

---

### 3. Performance Metrics API

**Endpoint:** `GET /dashboard/performance`

**Purpose:** Fetches today's performance metrics

**Query Parameters:** None (always returns today's data)

**Response Structure:**

```json
{
  "metrics": {
    "totalCalls": 145,
    "totalTalk": 320,
    "aveCallDuration": "5M",
    "leadWorked": 89,
    "followUpCreated": 67,
    "firstCall": 45,
    "demoDone": 23,
    "prospects1": 56,
    "prospects2": 34,
    "prospects3": 28
  }
}
```

**Required Metric Keys:**

- `totalCalls` (number): Total number of calls made today
- `totalTalk` (number): Total talk time (in minutes)
- `aveCallDuration` (string): Average call duration (format: "5M" for 5 minutes)
- `leadWorked` (number): Number of leads worked on today
- `followUpCreated` (number): Number of follow-ups created today
- `firstCall` (number): Number of first calls made today
- `demoDone` (number): Number of demos completed today
- `prospects1` (number): Prospects metric 1
- `prospects2` (number): Prospects metric 2
- `prospects3` (number): Prospects metric 3

**Note:** `aveCallDuration` must be returned as a string with format like "5M" (minutes) or "2H" (hours).

---

### 4. Leads Funnel API

**Endpoint:** `GET /dashboard/funnel?days={timePeriod}`

**Purpose:** Fetches lead funnel data for charts

**Query Parameters:**

- `days` (number): Time period in days (7, 30, or 90). Default: 30

**Response Structure:**

```json
{
  "metrics": {
    "leads": "5.2K",
    "qualified": 1000,
    "proposal": 77,
    "negotiation": 55,
    "converted": 85
  },
  "chartData": [
    { "name": "Leads", "value": 5200 },
    { "name": "Qualified", "value": 1000 },
    { "name": "Proposal", "value": 77 },
    { "name": "Negotiation", "value": 55 },
    { "name": "Converted", "value": 85 }
  ],
  "trendData": [
    { "day": 1, "value": 15 },
    { "day": 2, "value": 20 }
  ]
}
```

**Fields:**

- `metrics.leads` (string): Total leads (can be formatted like "5.2K")
- `metrics.qualified` (number): Qualified leads count
- `metrics.proposal` (number): Proposal stage count
- `metrics.negotiation` (number): Negotiation stage count
- `metrics.converted` (number): Converted leads count
- `chartData` (array): Array of funnel stages with name and value
- `trendData` (array): Optional trend data for time-series charts

**Chart Data Requirements:**

- Must include exactly 5 stages: "Leads", "Qualified", "Proposal", "Negotiation", "Converted"
- Each item must have `name` (string) and `value` (number)

---

## Implementation Notes

### Error Handling

- All APIs should handle errors gracefully
- If an API fails, the component will fall back to mock data
- The component uses `Promise.allSettled()` to fetch all APIs in parallel, so one failure won't block others

### Performance

- All 4 APIs are fetched in parallel for optimal performance
- Each API call is independent and can succeed or fail independently

### Authentication

- All endpoints require Bearer token authentication
- Token is automatically included via axios interceptors

### Time Period Support

- 3 APIs support time period filtering (7, 30, or 90 days)
- Performance Metrics API always returns today's data only

---

## Frontend Implementation

The UserPanel component uses these API methods:

```javascript
import { dashboardAPI } from "../../services/api";

// Fetch all data
const [leadMetrics, approvals, performance, funnel] = await Promise.allSettled([
  dashboardAPI.getLeadMetrics(timeRange),
  dashboardAPI.getApprovals(timeRange),
  dashboardAPI.getPerformanceMetrics(),
  dashboardAPI.getLeadsFunnel(timeRange),
]);
```

---

## Mock Data Fallback

If any API is unavailable, the component will:

1. Try to use mock data from `generateMockDashboardData()`
2. Display a warning in the console
3. Continue functioning with generated sample data

This ensures the dashboard remains functional during development or when the backend is unavailable.

---

## Testing

To test the UserPanel:

1. Ensure all 4 APIs are implemented on the backend
2. Verify authentication is working
3. Test with different time periods (7, 30, 90 days)
4. Test error scenarios (API failures, network issues)
5. Verify data is displayed correctly in the UI

---

## Summary Table

| API Endpoint              | Method | Time Period     | Purpose             | Required Fields                          |
| ------------------------- | ------ | --------------- | ------------------- | ---------------------------------------- |
| `/dashboard/lead-metrics` | GET    | Yes (7/30/90)   | Lead status metrics | 10 metric objects with id, value, change |
| `/dashboard/approvals`    | GET    | Yes (7/30/90)   | Approval statistics | sent, received, all                      |
| `/dashboard/performance`  | GET    | No (today only) | Today's performance | 10 metric keys                           |
| `/dashboard/funnel`       | GET    | Yes (7/30/90)   | Lead funnel chart   | metrics, chartData (5 stages)            |

**Total: 4 APIs required for fully dynamic UserPanel**
