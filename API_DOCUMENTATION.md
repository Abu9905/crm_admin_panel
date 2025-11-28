# Admin Panel API Documentation

This document describes all API endpoints required for the Admin Panel application.

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

The token is automatically retrieved from `localStorage.getItem('authToken')` and added to all requests via axios interceptors.

---

## Authentication Endpoints

### 1. Login
**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

### 2. Logout
**Endpoint:** `POST /auth/logout`

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### 3. Get Current User
**Endpoint:** `GET /auth/me`

**Response:**
```json
{
  "id": 1,
  "name": "Admin User",
  "email": "admin@example.com",
  "role": "admin"
}
```

### 4. Refresh Token
**Endpoint:** `POST /auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "refresh_token_string"
}
```

**Response:**
```json
{
  "token": "new_access_token",
  "refreshToken": "new_refresh_token"
}
```

---

## Dashboard Endpoints

### 1. Get All Dashboard Data
**Endpoint:** `GET /dashboard/all?days={timePeriod}`

**Query Parameters:**
- `days` (number): Time period in days (7, 30, or 90). Default: 30

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
      { "day": 2, "value": 20 }
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
      { "name": "Social Media", "value": 30, "color": "#3B82F6" }
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
      { "day": 2, "value": 28000 }
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
      { "name": "Facebook", "value": 22 }
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
      { "name": "Qualified", "value": 1000 }
    ],
    "trendData": [
      { "day": 1, "value": 15 },
      { "day": 2, "value": 20 }
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
    { "day": 1, "value": 15 }
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
    { "name": "Website", "value": 45, "color": "#60A5FA" }
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
    { "day": 1, "value": 25000 }
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
    { "name": "Google Ads", "value": 28 }
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
    { "name": "Leads", "value": 5200 }
  ],
  "trendData": [
    { "day": 1, "value": 15 }
  ]
}
```

### 7. Get Lead Metrics
**Endpoint:** `GET /dashboard/lead-metrics?days={timePeriod}`

**Query Parameters:**
- `days` (number): Time period in days (7, 30, or 90). Default: 30

**Response:**
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

**Note:** The `change` field represents the percentage change from the previous period (can be positive or negative).

### 8. Get Approvals
**Endpoint:** `GET /dashboard/approvals?days={timePeriod}`

**Query Parameters:**
- `days` (number): Time period in days (7, 30, or 90). Default: 30

**Response:**
```json
{
  "sent": 75,
  "received": 62,
  "all": 28
}
```

### 9. Get Performance Metrics
**Endpoint:** `GET /dashboard/performance`

**Response:**
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

**Note:** 
- `aveCallDuration` is returned as a string (e.g., "5M" for 5 minutes)
- All other metrics are numbers
- This endpoint returns today's performance metrics only (no time period parameter)

---

## Leads Endpoints

### 1. Get All Leads
**Endpoint:** `GET /leads`

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `status` (string): Filter by status (optional: "New Lead", "Hot Lead", "Warm Lead", "Cold Lead", "Gold Lead", "Unread")
- `source` (string): Filter by source (optional)
- `search` (string): Search by ID, name, email, mobile, source, status, location, or owner (optional)
- `owner` (string): Filter by lead owner (optional)

**Response:**
```json
{
  "data": [
    {
      "id": "0001",
      "name": "Neamatullah Meer",
      "mobile": "7457863240",
      "email": "Neamatullahmdmuslim31@gmail.com",
      "source": "Facebook",
      "status": "New Lead",
      "location": "Mumbai",
      "owner": "Ramij raj",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 500,
    "totalPages": 25
  }
}
```

### 2. Get Lead by ID
**Endpoint:** `GET /leads/:id`

**Response:**
```json
{
  "id": "0001",
  "name": "Neamatullah Meer",
  "mobile": "7457863240",
  "email": "Neamatullahmdmuslim31@gmail.com",
  "source": "Facebook",
  "status": "New Lead",
  "location": "Mumbai",
  "owner": "Ramij raj",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z",
  "notes": [],
  "activities": []
}
```

### 3. Create Lead
**Endpoint:** `POST /leads`

**Request Body:**
```json
{
  "name": "John Doe",
  "mobile": "9876543210",
  "email": "john@example.com",
  "source": "Website",
  "status": "New Lead",
  "location": "Delhi",
  "owner": "Sales Rep"
}
```

**Required Fields:** `name`, `mobile`, `email`

**Response:**
```json
{
  "id": "0002",
  "name": "John Doe",
  "mobile": "9876543210",
  "email": "john@example.com",
  "source": "Website",
  "status": "New Lead",
  "location": "Delhi",
  "owner": "Sales Rep",
  "createdAt": "2024-01-15T11:00:00Z",
  "updatedAt": "2024-01-15T11:00:00Z"
}
```

### 4. Update Lead
**Endpoint:** `PUT /leads/:id`

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "status": "Hot Lead",
  "owner": "New Owner"
}
```

**Response:**
```json
{
  "id": "0001",
  "name": "John Doe Updated",
  "mobile": "7457863240",
  "email": "Neamatullahmdmuslim31@gmail.com",
  "source": "Facebook",
  "status": "Hot Lead",
  "location": "Mumbai",
  "owner": "New Owner",
  "updatedAt": "2024-01-15T12:00:00Z"
}
```

### 5. Bulk Update Leads
**Endpoint:** `PUT /leads/bulk`

**Request Body:**
```json
{
  "leadIds": ["0001", "0002", "0003"],
  "updates": {
    "status": "Hot Lead",
    "owner": "New Owner"
  }
}
```

**Response:**
```json
{
  "success": true,
  "updated": 3,
  "message": "Successfully updated 3 leads"
}
```

### 6. Delete Lead
**Endpoint:** `DELETE /leads/:id`

**Response:**
```json
{
  "success": true,
  "message": "Lead deleted successfully"
}
```

### 7. Get Lead Sources
**Endpoint:** `GET /leads/sources`

**Response:**
```json
{
  "sources": [
    { "name": "Website", "count": 45 },
    { "name": "Facebook", "count": 30 },
    { "name": "Social Media", "count": 20 }
  ]
}
```

### 8. Get Lead Statistics
**Endpoint:** `GET /leads/statistics?days={timePeriod}`

**Response:**
```json
{
  "totalLeads": 500,
  "byStatus": {
    "New Lead": 150,
    "Hot Lead": 100,
    "Warm Lead": 80,
    "Cold Lead": 70,
    "Gold Lead": 50,
    "Unread": 50
  },
  "bySource": {
    "Website": 200,
    "Facebook": 150,
    "Social Media": 100,
    "Referral": 50
  }
}
```

---

## Deals Endpoints

### 1. Get All Deals
**Endpoint:** `GET /deals`

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `status` (string): Filter by status (optional)
- `search` (string): Search by ID, name, email, mobile (optional)

**Response:**
```json
{
  "data": [
    {
      "id": "0001",
      "name": "Neamatullah Meer",
      "mobile": "7457863240",
      "email": "Neamatullahmdmuslim3l@gmail.com",
      "source": "Facebook",
      "status": "New lead",
      "location": "Mumbai",
      "owner": "Ramij raj",
      "value": 50000,
      "stage": "Proposal",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### 2. Get Deal by ID
**Endpoint:** `GET /deals/:id`

**Response:**
```json
{
  "id": "0001",
  "name": "Neamatullah Meer",
  "mobile": "7457863240",
  "email": "Neamatullahmdmuslim3l@gmail.com",
  "source": "Facebook",
  "status": "New lead",
  "location": "Mumbai",
  "owner": "Ramij raj",
  "value": 50000,
  "stage": "Proposal",
  "probability": 75,
  "expectedCloseDate": "2024-02-15",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### 3. Create Deal
**Endpoint:** `POST /deals`

**Request Body:**
```json
{
  "leadId": "0001",
  "name": "John Doe",
  "value": 75000,
  "stage": "Qualification",
  "probability": 50,
  "expectedCloseDate": "2024-03-01",
  "owner": "Sales Rep"
}
```

**Response:**
```json
{
  "id": "D0001",
  "leadId": "0001",
  "name": "John Doe",
  "value": 75000,
  "stage": "Qualification",
  "probability": 50,
  "expectedCloseDate": "2024-03-01",
  "owner": "Sales Rep",
  "createdAt": "2024-01-15T11:00:00Z"
}
```

### 4. Update Deal
**Endpoint:** `PUT /deals/:id`

**Request Body:**
```json
{
  "stage": "Negotiation",
  "value": 80000,
  "probability": 80
}
```

**Response:**
```json
{
  "id": "D0001",
  "stage": "Negotiation",
  "value": 80000,
  "probability": 80,
  "updatedAt": "2024-01-15T12:00:00Z"
}
```

### 5. Delete Deal
**Endpoint:** `DELETE /deals/:id`

**Response:**
```json
{
  "success": true,
  "message": "Deal deleted successfully"
}
```

---

## Users Endpoints

### 1. Get All Users
**Endpoint:** `GET /users`

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `role` (string): Filter by role (optional: "admin", "user", "manager")
- `search` (string): Search by name or email (optional)

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin",
      "status": "active",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "totalPages": 3
  }
}
```

### 2. Get User by ID
**Endpoint:** `GET /users/:id`

**Response:**
```json
{
  "id": 1,
  "name": "Admin User",
  "email": "admin@example.com",
  "role": "admin",
  "status": "active",
  "permissions": ["read", "write", "delete"],
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

### 3. Create User
**Endpoint:** `POST /users`

**Request Body:**
```json
{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response:**
```json
{
  "id": 51,
  "name": "New User",
  "email": "newuser@example.com",
  "role": "user",
  "status": "active",
  "createdAt": "2024-01-15T11:00:00Z"
}
```

### 4. Update User
**Endpoint:** `PUT /users/:id`

**Request Body:**
```json
{
  "name": "Updated Name",
  "role": "manager",
  "status": "active"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Updated Name",
  "email": "admin@example.com",
  "role": "manager",
  "status": "active",
  "updatedAt": "2024-01-15T12:00:00Z"
}
```

### 5. Delete User
**Endpoint:** `DELETE /users/:id`

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

### 6. Update User Password
**Endpoint:** `PUT /users/:id/password`

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

---

## Marketing Endpoints

### 1. Get Marketing Campaigns
**Endpoint:** `GET /marketing/campaigns`

**Query Parameters:**
- `type` (string): Campaign type (optional: "email", "sms", "whatsapp", "facebook", "google")
- `status` (string): Campaign status (optional: "active", "paused", "completed")
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Q1 Email Campaign",
      "type": "email",
      "status": "active",
      "recipients": 1000,
      "sent": 850,
      "opened": 450,
      "clicked": 120,
      "createdAt": "2024-01-10T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "totalPages": 3
  }
}
```

### 2. Create Marketing Campaign
**Endpoint:** `POST /marketing/campaigns`

**Request Body:**
```json
{
  "name": "New Email Campaign",
  "type": "email",
  "subject": "Welcome Email",
  "content": "Email content here",
  "recipients": [1, 2, 3],
  "scheduledAt": "2024-01-20T10:00:00Z"
}
```

**Response:**
```json
{
  "id": 51,
  "name": "New Email Campaign",
  "type": "email",
  "status": "scheduled",
  "createdAt": "2024-01-15T11:00:00Z"
}
```

### 3. Get Marketing Integrations
**Endpoint:** `GET /marketing/integrations`

**Response:**
```json
{
  "integrations": [
    {
      "id": 1,
      "name": "Email Service",
      "type": "email",
      "status": "connected",
      "provider": "SendGrid"
    },
    {
      "id": 2,
      "name": "SMS Service",
      "type": "sms",
      "status": "disconnected",
      "provider": "Twilio"
    }
  ]
}
```

### 4. Get Marketing Templates
**Endpoint:** `GET /marketing/templates`

**Query Parameters:**
- `type` (string): Template type (optional: "email", "sms", "whatsapp")

**Response:**
```json
{
  "templates": [
    {
      "id": 1,
      "name": "Welcome Email Template",
      "type": "email",
      "subject": "Welcome to our service",
      "content": "Template content...",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

## Settings Endpoints

### 1. Get Settings
**Endpoint:** `GET /settings`

**Response:**
```json
{
  "general": {
    "companyName": "Admin Panel",
    "timezone": "UTC",
    "language": "en"
  },
  "notifications": {
    "email": true,
    "sms": false,
    "push": true
  },
  "integrations": {
    "apiKey": "***",
    "webhookUrl": ""
  }
}
```

### 2. Update Settings
**Endpoint:** `PUT /settings`

**Request Body:**
```json
{
  "general": {
    "companyName": "Updated Company Name",
    "timezone": "America/New_York"
  },
  "notifications": {
    "email": true,
    "sms": true
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Settings updated successfully"
}
```

---

## Error Handling

### Standard Error Response Format
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

### HTTP Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required or invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `422 Unprocessable Entity` - Validation error
- `500 Internal Server Error` - Server error

### 401 Unauthorized
If the API returns a 401 status, the application will:
- Remove the auth token from localStorage
- Remove user data from localStorage
- Redirect to `/login`

### API Not Available
If the API is not available or returns an error, the application will:
- Fall back to mock data generation (for dashboard endpoints)
- Display a warning in the console
- Continue functioning with generated sample data where applicable

---

## Mock Data Mode

When the API is not available, the application automatically generates mock data using the `generateMockDashboardData()` function. This ensures the dashboard remains functional during development or when the backend is unavailable.

**Note:** Mock data is only available for dashboard endpoints. Other endpoints (leads, deals, users, etc.) will show appropriate error messages when the API is unavailable.

---

## Usage Examples

### Using the API Service

```javascript
import { dashboardAPI } from './services/api';
import api from './services/api';

// Dashboard data
const dashboardData = await dashboardAPI.getAllDashboardData(30);

// Custom API call
const leads = await api.get('/leads', {
  params: { page: 1, limit: 20, status: 'New Lead' }
});

// Create lead
const newLead = await api.post('/leads', {
  name: 'John Doe',
  mobile: '9876543210',
  email: 'john@example.com',
  source: 'Website',
  status: 'New Lead'
});
```

### Authentication Flow

1. User submits login form
2. Frontend calls `POST /auth/login`
3. Backend validates credentials and returns token + user data
4. Frontend stores token in localStorage
5. All subsequent requests include token in Authorization header
6. On 401 response, frontend clears token and redirects to login

---

## Rate Limiting

API requests may be rate-limited. Typical limits:
- **Authentication endpoints:** 5 requests per minute
- **Dashboard endpoints:** 60 requests per minute
- **CRUD endpoints:** 100 requests per minute

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640000000
```

---

## Pagination

All list endpoints support pagination with the following query parameters:
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20, max: 100)

Response includes pagination metadata:
```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 500,
    "totalPages": 25
  }
}
```

---

## Search and Filtering

Most list endpoints support:
- **Search:** Full-text search across relevant fields
- **Filtering:** Filter by specific fields (status, source, role, etc.)
- **Sorting:** Sort by field and direction (e.g., `sort=createdAt&order=desc`)

Example:
```
GET /leads?search=john&status=New Lead&source=Website&sort=createdAt&order=desc
```

---

## Webhooks (Future)

The API may support webhooks for real-time updates:
- Lead status changes
- New deal creation
- User activity events

Webhook configuration will be available in Settings.

---

## Versioning

API versioning is handled via URL path:
- Current version: `/api/v1/...`
- Future versions: `/api/v2/...`

Default version is v1 if not specified.

---

## Support

For API support or questions:
- Check this documentation
- Review error messages and status codes
- Contact the development team
