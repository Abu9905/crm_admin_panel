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

    // Check demo users first
    let user = null;
    const demoUser = demoUsers[email.toLowerCase()];
    
    if (demoUser && demoUser.password === password) {
      user = {
        id: demoUser.id,
        name: demoUser.name,
        email: demoUser.email,
        role: demoUser.role,
      };
    } else {
      // If not found in demo users, check managed users from localStorage
      try {
        const managedUsersStr = localStorage.getItem('managedUsers');
        if (managedUsersStr) {
          const managedUsers = JSON.parse(managedUsersStr);
          const managedUser = managedUsers.find(
            u => u.email.toLowerCase() === email.toLowerCase()
          );
          if (managedUser && managedUser.password === password) {
            // Create user object without password
            user = {
              id: managedUser.id,
              name: managedUser.name,
              email: managedUser.email,
              role: managedUser.role,
            };
          }
        }
      } catch (error) {
        console.error('Error checking managed users:', error);
      }
    }

    if (user) {
      // Generate a mock token
      const token = `mock_token_${Date.now()}_${user.id}`;
      
      // Create user object without password for storage
      const userToStore = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      
      // Store user and token
      localStorage.setItem('user', JSON.stringify(userToStore));
      localStorage.setItem('authToken', token);
      
      setUser(userToStore);
      setLoading(false);
      return { success: true, user: userToStore };
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

