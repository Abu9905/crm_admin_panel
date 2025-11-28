import { createContext, useContext, useState, useEffect } from 'react';
import { USER_ROLES } from '../constants';

const UserManagementContext = createContext(null);

export const useUserManagement = () => {
  const context = useContext(UserManagementContext);
  if (!context) {
    throw new Error('useUserManagement must be used within a UserManagementProvider');
  }
  return context;
};

export const UserManagementProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load users from localStorage on mount
  useEffect(() => {
    const loadUsers = () => {
      try {
        const storedUsers = localStorage.getItem('managedUsers');
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
        } else {
          // Initialize with default demo users
          const defaultUsers = [
            {
              id: 2,
              name: 'John Doe',
              email: 'user@example.com',
              role: USER_ROLES.USER,
              password: 'user123',
              createdAt: new Date().toISOString(),
            },
            {
              id: 3,
              name: 'Jane Manager',
              email: 'manager@example.com',
              role: USER_ROLES.MANAGER,
              password: 'manager123',
              createdAt: new Date().toISOString(),
            },
          ];
          setUsers(defaultUsers);
          localStorage.setItem('managedUsers', JSON.stringify(defaultUsers));
        }
      } catch (error) {
        console.error('Error loading users:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Save users to localStorage whenever users change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem('managedUsers', JSON.stringify(users));
      } catch (error) {
        console.error('Error saving users:', error);
      }
    }
  }, [users, loading]);

  const createUser = (userData) => {
    const newUser = {
      id: Date.now(), // Simple ID generation - in production, use proper ID
      name: userData.name,
      email: userData.email.toLowerCase(),
      role: userData.role || USER_ROLES.USER,
      password: userData.password, // In production, this should be hashed
      createdAt: new Date().toISOString(),
    };

    // Check if email already exists
    if (users.some(u => u.email === newUser.email)) {
      throw new Error('User with this email already exists');
    }

    setUsers(prev => [...prev, newUser]);
    return newUser;
  };

  const updateUser = (userId, userData) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? { ...user, ...userData, updatedAt: new Date().toISOString() }
          : user
      )
    );
  };

  const deleteUser = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const getUserById = (userId) => {
    return users.find(user => user.id === userId);
  };

  const getUserByEmail = (email) => {
    return users.find(user => user.email === email.toLowerCase());
  };

  const value = {
    users,
    loading,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    getUserByEmail,
  };

  return (
    <UserManagementContext.Provider value={value}>
      {children}
    </UserManagementContext.Provider>
  );
};

