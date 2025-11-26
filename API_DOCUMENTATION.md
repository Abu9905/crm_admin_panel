# Dashboard API Documentation

This document describes the API endpoints required for the dynamic dashboard functionality.

## Base URL
The API base URL can be configured via environment variable:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Authentication
All API requests require authentication via Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

The token is automatically retrieved from `localStorage.getItem('authToken')`.

## Endpoints

### 1. Get All Dashboard Data
**Endpoint:** `GET /dashboard/all?days={timePeriod}`

**Query Parameters:**
- `days` (number): Time period in days (7, 30, or 90)

**Response:**
```json
{
  "reportOverview": {
    "metrics": {
      "totalReports": 245,
      "completion": 87,
      "new": 12
    },
    "chartData": [
      { "day": 1, "value": 15 },
      { "day": 2, "value": 20 },
      ...
    ]
  },
  "leadOverview": {
    "metrics": {
      "totalLeads": 158,
      "conversion": 158,
      "newLeads": 158
    },
    "chartData": [
      { "name": "Website", "value": 45, "color": "#60A5FA" },
      { "name": "Social Media", "value": 30, "color": "#3B82F6" },
      ...
    ]
  },
  "salesForecasting": {
    "metrics": {
      "forecasted": 128000,
      "committed": 86000,
      "accuracy": 72
    },
    "chartData": [
      { "day": 1, "value": 25000 },
      { "day": 2, "value": 28000 },
      ...
    ]
  },
  "marketOverview": {
    "metrics": {
      "impression": "5.2K",
      "ctr": "3.8%",
      "cpc": "$2.14"
    },
    "chartData": [
      { "name": "Google Ads", "value": 28 },
      { "name": "Facebook", "value": 22 },
      ...
    ]
  },
  "leadsFunnel": {
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
      ...
    ],
    "trendData": [
      { "day": 1, "value": 15 },
      { "day": 2, "value": 20 },
      ...
    ]
  }
}
```

### 2. Get Report Overview
**Endpoint:** `GET /dashboard/reports?days={timePeriod}`

**Response:**
```json
{
  "metrics": {
    "totalReports": 245,
    "completion": 87,
    "new": 12
  },
  "chartData": [
    { "day": 1, "value": 15 },
    ...
  ]
}
```

### 3. Get Lead Overview
**Endpoint:** `GET /dashboard/leads?days={timePeriod}`

**Response:**
```json
{
  "metrics": {
    "totalLeads": 158,
    "conversion": 158,
    "newLeads": 158
  },
  "chartData": [
    { "name": "Website", "value": 45, "color": "#60A5FA" },
    ...
  ]
}
```

### 4. Get Sales Forecasting
**Endpoint:** `GET /dashboard/sales-forecast?days={timePeriod}`

**Response:**
```json
{
  "metrics": {
    "forecasted": 128000,
    "committed": 86000,
    "accuracy": 72
  },
  "chartData": [
    { "day": 1, "value": 25000 },
    ...
  ]
}
```

### 5. Get Market Overview
**Endpoint:** `GET /dashboard/market?days={timePeriod}`

**Response:**
```json
{
  "metrics": {
    "impression": "5.2K",
    "ctr": "3.8%",
    "cpc": "$2.14"
  },
  "chartData": [
    { "name": "Google Ads", "value": 28 },
    ...
  ]
}
```

### 6. Get Leads Funnel
**Endpoint:** `GET /dashboard/funnel?days={timePeriod}`

**Response:**
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
    ...
  ],
  "trendData": [
    { "day": 1, "value": 15 },
    ...
  ]
}
```

## Error Handling

### 401 Unauthorized
If the API returns a 401 status, the application will:
- Remove the auth token from localStorage
- Redirect to `/login`

### API Not Available
If the API is not available or returns an error, the application will:
- Fall back to mock data generation
- Display a warning in the console
- Continue functioning with generated sample data

## Mock Data Mode

When the API is not available, the application automatically generates mock data using the `generateMockDashboardData()` function. This ensures the dashboard remains functional during development or when the backend is unavailable.

## Usage

The dashboard automatically:
1. Fetches data on component mount
2. Refetches when the time period changes (7, 30, or 90 days)
3. Shows loading states during data fetching
4. Handles errors gracefully with fallback to mock data
5. Updates all charts and metrics dynamically

