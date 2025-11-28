import axios from 'axios';

// API Base URL - can be configured via environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Dashboard API endpoints
export const dashboardAPI = {
  // Get all dashboard data at once
  getAllDashboardData: async (timePeriod = 30) => {
    const response = await api.get(`/dashboard/all?days=${timePeriod}`);
    return response.data;
  },
  
  // Get lead metrics (for UserPanel)
  getLeadMetrics: async (timePeriod = 30) => {
    const response = await api.get(`/dashboard/lead-metrics?days=${timePeriod}`);
    return response.data;
  },
  
  // Get approvals data
  getApprovals: async (timePeriod = 30) => {
    const response = await api.get(`/dashboard/approvals?days=${timePeriod}`);
    return response.data;
  },
  
  // Get today's performance metrics
  getPerformanceMetrics: async () => {
    const response = await api.get(`/dashboard/performance`);
    return response.data;
  },
  
  // Get leads funnel
  getLeadsFunnel: async (timePeriod = 30) => {
    const response = await api.get(`/dashboard/funnel?days=${timePeriod}`);
    return response.data;
  },
};

// Mock data generator for development (when API is not available)
export const generateMockDashboardData = (timePeriod = 30) => {
  const generateDaysData = () => {
    const days = [];
    for (let i = 1; i <= timePeriod; i++) {
      days.push({
        day: i,
        value: Math.floor(Math.random() * 40) + 5,
        sales: Math.floor(Math.random() * 40000) + 10000,
        reports: Math.floor(Math.random() * 20) + 5,
      });
    }
    return days;
  };

  return {
    reportOverview: {
      metrics: {
        totalReports: Math.floor(Math.random() * 300) + 200,
        completion: Math.floor(Math.random() * 20) + 80,
        new: Math.floor(Math.random() * 20) + 5,
      },
      chartData: generateDaysData().map((d) => ({ day: d.day, value: d.reports })),
    },
    leadOverview: {
      metrics: {
        totalLeads: Math.floor(Math.random() * 100) + 150,
        conversion: Math.floor(Math.random() * 50) + 150,
        newLeads: Math.floor(Math.random() * 30) + 150,
      },
      chartData: [
        { name: 'Website', value: 45, color: '#60A5FA' },
        { name: 'Social Media', value: 30, color: '#3B82F6' },
        { name: 'Referral', value: 15, color: '#FBBF24' },
        { name: 'Direct', value: 8, color: '#10B981' },
        { name: 'Other', value: 2, color: '#A78BFA' },
      ],
    },
    salesForecasting: {
      metrics: {
        forecasted: Math.floor(Math.random() * 50000) + 100000,
        committed: Math.floor(Math.random() * 50000) + 80000,
        accuracy: Math.floor(Math.random() * 20) + 70,
      },
      chartData: generateDaysData().map((d) => ({ day: d.day, value: d.sales })),
    },
    marketOverview: {
      metrics: {
        impression: (Math.random() * 2 + 4).toFixed(1) + 'K',
        ctr: (Math.random() * 2 + 3).toFixed(1) + '%',
        cpc: '$' + (Math.random() * 1 + 2).toFixed(2),
      },
      chartData: [
        { name: 'Google Ads', value: Math.floor(Math.random() * 10) + 25 },
        { name: 'Facebook', value: Math.floor(Math.random() * 10) + 20 },
        { name: 'Email', value: Math.floor(Math.random() * 10) + 15 },
        { name: 'Organic', value: Math.floor(Math.random() * 10) + 12 },
        { name: 'Direct', value: Math.floor(Math.random() * 10) + 10 },
      ],
    },
    leadsFunnel: {
      metrics: {
        leads: (Math.random() * 2 + 4).toFixed(1) + 'K',
        qualified: Math.floor(Math.random() * 500) + 800,
        proposal: Math.floor(Math.random() * 30) + 70,
        negotiation: Math.floor(Math.random() * 20) + 50,
        converted: Math.floor(Math.random() * 30) + 80,
      },
      chartData: [
        { name: 'Leads', value: Math.floor(Math.random() * 1000) + 4500 },
        { name: 'Qualified', value: Math.floor(Math.random() * 200) + 900 },
        { name: 'Proposal', value: Math.floor(Math.random() * 20) + 70 },
        { name: 'Negotiation', value: Math.floor(Math.random() * 15) + 50 },
        { name: 'Converted', value: Math.floor(Math.random() * 20) + 80 },
      ],
      trendData: generateDaysData().map((d) => ({ day: d.day, value: d.value })),
    },
    leadMetrics: [
      { id: 'newLead', value: Math.floor(Math.random() * 100) + 10, change: (Math.random() * 20 - 10).toFixed(1) },
      { id: 'missedCalls', value: Math.floor(Math.random() * 100) + 10, change: (Math.random() * 20 - 10).toFixed(1) },
      { id: 'unreadEmail', value: Math.floor(Math.random() * 100) + 10, change: (Math.random() * 20 - 10).toFixed(1) },
      { id: 'unreadWA', value: Math.floor(Math.random() * 100) + 10, change: (Math.random() * 20 - 10).toFixed(1) },
      { id: 'reEngaged', value: Math.floor(Math.random() * 100) + 10, change: (Math.random() * 20 - 10).toFixed(1) },
      { id: 'prospect', value: Math.floor(Math.random() * 100) + 10, change: (Math.random() * 20 - 10).toFixed(1) },
      { id: 'untouched', value: Math.floor(Math.random() * 100) + 10, change: (Math.random() * 20 - 10).toFixed(1) },
      { id: 'attempt', value: Math.floor(Math.random() * 100) + 10, change: (Math.random() * 20 - 10).toFixed(1) },
      { id: 'onHold', value: Math.floor(Math.random() * 100) + 10, change: (Math.random() * 20 - 10).toFixed(1) },
      { id: 'enrolled', value: Math.floor(Math.random() * 100) + 10, change: (Math.random() * 20 - 10).toFixed(1) },
    ],
    approvals: {
      sent: Math.floor(Math.random() * 30) + 50,
      received: Math.floor(Math.random() * 30) + 40,
      all: Math.floor(Math.random() * 20) + 15,
    },
    performance: {
      totalCalls: Math.floor(Math.random() * 90) + 10,
      totalTalk: Math.floor(Math.random() * 90) + 10,
      aveCallDuration: `${Math.floor(Math.random() * 6) + 2}M`,
      leadWorked: Math.floor(Math.random() * 90) + 10,
      followUpCreated: Math.floor(Math.random() * 90) + 10,
      firstCall: Math.floor(Math.random() * 90) + 10,
      demoDone: Math.floor(Math.random() * 90) + 10,
      prospects1: Math.floor(Math.random() * 90) + 10,
      prospects2: Math.floor(Math.random() * 90) + 10,
      prospects3: Math.floor(Math.random() * 90) + 10,
    },
  };
};

export default api;

