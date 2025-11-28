import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Login from '../components/auth/Login';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import UserDashboard from '../components/dashboard/UserDashboard';
import LeadTable from '../components/leads/LeadTable';
import IndividualLeadDetails from '../components/leads/IndividualLeadDetails';
import DealsTable from '../components/deals/DealsTable';
import IndividualDealDetails from '../components/deals/IndividualDealDetails';
import Marketing from '../components/marketing/Marketing';
import Settings from '../components/settings/Settings';
import AdminPanel from '../components/admin/AdminPanel';
import { USER_ROLES } from '../constants';
import { useAuth } from '../contexts/AuthContext';

// Component to redirect based on user role
const RoleBasedRedirect = () => {
  const { user } = useAuth();
  
  if (user?.role === USER_ROLES.ADMIN) {
    return <Navigate to="/layout/dashboard" replace />;
  } else if (user?.role === USER_ROLES.USER) {
    return <Navigate to="/layout/user-panel" replace />;
  } else {
    return <Navigate to="/layout/dashboard" replace />;
  }
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Login Route - Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes - Redirect based on role */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <RoleBasedRedirect />
          </ProtectedRoute>
        }
      />

      {/* Main Layout Route - Protected */}
      <Route
        path="/layout"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Admin Dashboard - Only for Admin */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* User Dashboard - For regular users */}
        <Route path="user-panel" element={<UserDashboard />} />

        {/* Lead Management - Accessible to all */}
        <Route path="lead-management">
          <Route index element={<LeadTable />} />
          <Route path="leads" element={<LeadTable />} />
          <Route path="leads/:id" element={<IndividualLeadDetails />} />
          <Route path="deals" element={<DealsTable />} />
          <Route path="deals/:id" element={<IndividualDealDetails />} />
          <Route path="pipeline-analysis" element={<div>Pipeline Analysis</div>} />
          <Route path="new-leads" element={<div>New Leads</div>} />
          <Route path="follow-up" element={<div>Follow Up</div>} />
          <Route path="prospects" element={<div>Prospects</div>} />
          <Route path="opportunity" element={<div>Opportunity</div>} />
          <Route path="lost" element={<div>Lost Leads</div>} />
          <Route path="in-conversation" element={<div>In Conversation</div>} />
          <Route path="etc" element={<div>Etc</div>} />
          <Route path="custom-stage" element={<div>Custom Stage</div>} />
          {/* Fallback routes so nested Lead Management links (e.g. Data > New Data) still show the table */}
          <Route path=":category" element={<LeadTable />} />
          <Route path=":category/:subCategory" element={<LeadTable />} />
        </Route>

        {/* Conversation */}
        <Route path="email" element={<div>Email</div>} />
        <Route path="sms" element={<div>SMS</div>} />
        <Route path="whatsapp" element={<div>WhatsApp</div>} />
        <Route path="forms" element={<div>Forms</div>} />
        <Route path="calls" element={<div>Calls</div>} />

        {/* Tasks */}
        <Route path="all" element={<div>All Tasks</div>} />
        <Route path="open" element={<div>Open Tasks</div>} />
        <Route path="pending" element={<div>Pending Tasks</div>} />
        <Route path="closed" element={<div>Closed Tasks</div>} />
        <Route path="missed" element={<div>Missed Tasks</div>} />

        {/* Marketing */}
        <Route path="marketing" element={<Marketing />} />

        {/* Settings */}
        <Route path="setting" element={<Settings />} />

        {/* Admin Panel - Only for Admin */}
        <Route
          path="admin-panel"
          element={
            <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

      </Route>

      {/* Catch all - redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
