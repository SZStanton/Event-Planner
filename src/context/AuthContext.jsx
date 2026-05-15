import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const USER_KEY = 'planner-users';
const SESSION_KEY = 'planner-session';

const loadUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || '[]');
  } catch {
    return [];
  }
};

const loadUser = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  } catch {
    return null;
  }
};

function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => loadUsers());
  const [user, setUser] = useState(() => loadUser());

  useEffect(() => {
    localStorage.setItem(USER_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [user]);

  const register = ([name, email, username, password]) => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanName || !cleanEmail || !cleanUsername || !cleanPassword) {
      return {
        success: false,
        message: 'All registration fields are required.',
      };
    }
  };
}

export { AuthProvider, useAuth };

