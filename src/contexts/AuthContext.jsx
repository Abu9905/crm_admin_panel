import { createContext, useContext, useState, useEffect } from 'react';
import { USER_ROLES } from '../constants';

const AuthContext = createContext(null);

// This file intentionally exports both provider and hook.
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('authToken');
    
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      }
    }
    setLoading(false);
  }, []);

  // Demo login function - replace with actual API call
  const login = async (email, password) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Demo credentials - replace with actual API authentication
    const demoUsers = {
      'admin@example.com': {
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        role: USER_ROLES.ADMIN,
        password: 'admin123', // In real app, this would be hashed
      },
      'user@example.com': {
        id: 2,
        name: 'John Doe',
        email: 'user@example.com',
        role: USER_ROLES.USER,
        password: 'user123', // In real app, this would be hashed
      },
      'manager@example.com': {
        id: 3,
        name: 'Jane Manager',
        email: 'manager@example.com',
        role: USER_ROLES.MANAGER,
        password: 'manager123',
      },
    };

    const user = demoUsers[email.toLowerCase()];

    if (user && user.password === password) {
      // Generate a mock token
      const token = `mock_token_${Date.now()}_${user.id}`;
      
      // Store user and token
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('authToken', token);
      
      setUser(user);
      setLoading(false);
      return { success: true, user };
    } else {
      setLoading(false);
      return { 
        success: false, 
        error: 'Invalid email or password' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const isAdmin = () => {
    return user?.role === USER_ROLES.ADMIN;
  };

  const isManager = () => {
    return user?.role === USER_ROLES.MANAGER;
  };

  const isUser = () => {
    return user?.role === USER_ROLES.USER;
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAdmin,
    isManager,
    isUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

