import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { USER_ROLES } from '../../constants';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If specific roles are required, check if user has one of them
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect based on user role
    if (user.role === USER_ROLES.ADMIN) {
      return <Navigate to="/layout/dashboard" replace />;
    } else if (user.role === USER_ROLES.USER) {
      return <Navigate to="/layout/user-panel" replace />;
    } else {
      return <Navigate to="/layout/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;

