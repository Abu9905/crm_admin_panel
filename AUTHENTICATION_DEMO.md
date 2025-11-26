# Authentication Demo Guide

This document explains the authentication system and demo credentials for testing the application.

## 🚀 Quick Start

1. **Start the application** - The app will redirect to `/login` if not authenticated
2. **Use demo credentials** - Click the demo buttons or enter credentials manually
3. **Automatic redirect** - After login, you'll be redirected based on your role

## 🔐 Demo Credentials

### Admin Account
- **Email:** `admin@example.com`
- **Password:** `admin123`
- **Redirects to:** `/layout/dashboard` (Admin Dashboard)
- **Access:** Full access to all features including Admin Panel

### User Account
- **Email:** `user@example.com`
- **Password:** `user123`
- **Redirects to:** `/layout/user-panel` (User Dashboard)
- **Access:** User-specific features and limited access

### Manager Account
- **Email:** `manager@example.com`
- **Password:** `manager123`
- **Redirects to:** `/layout/dashboard` (Dashboard)
- **Access:** Manager-level features

## 📋 Features

### Login Page
- Beautiful, responsive login form
- Demo credential buttons for quick testing
- Password visibility toggle
- Remember me checkbox
- Error handling and validation
- Dark mode support

### Role-Based Routing

#### Admin Login Flow:
1. Admin logs in → Redirected to `/layout/dashboard`
2. Can access:
   - Dashboard (full analytics)
   - Admin Panel (user management)
   - All lead management features
   - Reports and analytics
   - Settings

#### User Login Flow:
1. User logs in → Redirected to `/layout/user-panel`
2. Can access:
   - User Dashboard (personal stats)
   - My Leads
   - My Tasks
   - Profile settings
   - Limited access to other features

### Protected Routes
- All routes under `/layout/*` require authentication
- Admin Panel (`/layout/admin-panel`) is restricted to Admin role only
- Unauthorized access attempts redirect to appropriate dashboard

## 🔒 Authentication Flow

1. **Unauthenticated User:**
   - Accessing any protected route → Redirected to `/login`
   - Can only access `/login` page

2. **After Login:**
   - Token stored in `localStorage` as `authToken`
   - User data stored in `localStorage` as `user`
   - Redirected based on role:
     - Admin → Dashboard
     - User → User Panel
     - Manager → Dashboard

3. **Session Persistence:**
   - User stays logged in on page refresh
   - Token automatically included in API requests
   - Logout clears all stored data

4. **Logout:**
   - Click logout button in top navbar
   - Clears authentication data
   - Redirects to `/login`

## 🛡️ Security Features

- **Protected Routes:** All routes are protected by `ProtectedRoute` component
- **Role-Based Access:** Admin Panel restricted to Admin role only
- **Token Management:** Automatic token injection in API requests
- **Session Handling:** Persistent sessions with localStorage
- **Auto-Logout:** 401 responses trigger automatic logout

## 📁 File Structure

```
src/
├── contexts/
│   └── AuthContext.jsx          # Authentication context provider
├── components/
│   └── auth/
│       ├── Login.jsx            # Login page component
│       └── ProtectedRoute.jsx   # Route protection component
└── routes/
    └── index.jsx                 # Route configuration with protection
```

## 🔄 Integration with Real API

To integrate with a real backend API:

1. **Update `AuthContext.jsx`:**
   - Replace demo login with actual API call
   - Handle real authentication tokens
   - Update user data structure

2. **Update API Service:**
   - Configure `VITE_API_BASE_URL` in `.env`
   - API should return user object with role
   - Token should be JWT or similar

3. **API Endpoints Expected:**
   - `POST /api/auth/login` - Login endpoint
   - `POST /api/auth/logout` - Logout endpoint (optional)
   - `GET /api/auth/me` - Get current user (optional)

## 🧪 Testing

### Test Admin Login:
1. Go to `/login`
2. Click "Admin" button or enter credentials
3. Should redirect to `/layout/dashboard`
4. Should see admin features and Admin Panel access

### Test User Login:
1. Go to `/login`
2. Click "User" button or enter credentials
3. Should redirect to `/layout/user-panel`
4. Should see user-specific dashboard

### Test Protected Routes:
1. Logout
2. Try accessing `/layout/dashboard` directly
3. Should redirect to `/login`
4. After login, should redirect to appropriate dashboard

### Test Role-Based Access:
1. Login as User
2. Try accessing `/layout/admin-panel`
3. Should redirect to `/layout/user-panel` (user's default)

## 🎨 UI Features

- **Responsive Design:** Works on all screen sizes
- **Dark Mode:** Full dark mode support
- **Loading States:** Shows loading indicators during authentication
- **Error Handling:** User-friendly error messages
- **User Info Display:** Shows logged-in user name and role in navbar
- **Logout Button:** Easy logout from top navbar

## 📝 Notes

- Demo credentials are for development/testing only
- In production, replace with real authentication API
- All passwords are plain text in demo (use hashed passwords in production)
- Token format is mock (`mock_token_${timestamp}_${userId}`)
- Replace with JWT or secure token in production

