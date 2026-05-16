import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

// Creating the authentication
const AuthContext = createContext(null);

// Local storage keys
const USER_KEY = 'planner-users';
const SESSION_KEY = 'planner-session';

// Load all registered users from local storage
const loadUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || '[]');
  } catch {
    return [];
  }
};

// Load the currently logged in user
const loadUser = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  } catch {
    return null;
  }
};

function AuthProvider({ children }) {
  // Store all users and current logged in user
  const [users, setUsers] = useState(() => loadUsers());
  const [user, setUser] = useState(() => loadUser());

  // Save users whenever the users state changes
  useEffect(() => {
    localStorage.setItem(USER_KEY, JSON.stringify(users));
  }, [users]);

  // Save or remove the current session user
  useEffect(() => {
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [user]);

  //==== REGISTER ====
  // Register a new user account
  const register = useCallback(
    ({ name, email, username, password }) => {
      const cleanName = name.trim();
      const cleanEmail = email.trim().toLowerCase();
      const cleanUsername = username.trim().toLowerCase();
      const cleanPassword = password.trim();
      // Validate empty fields
      if (!cleanName || !cleanEmail || !cleanUsername || !cleanPassword) {
        return {
          success: false,
          message: 'All registration fields are required.',
        };
      }

      // Check if email or username already exists
      const exists = users.some(
        item =>
          item.email.toLowerCase() === cleanEmail ||
          item.username.toLowerCase() === cleanUsername,
      );
      if (exists) {
        return {
          success: false,
          message: 'That email or username is already in use.',
        };
      }

      // Create the new user object
      const nextUser = {
        id: crypto.randomUUID(),
        name: cleanName,
        email: cleanEmail,
        username: cleanUsername,
        password: cleanPassword,
      };

      // Add the user and log them in immediately
      setUsers(list => [...list, nextUser]);

      setUser({
        id: nextUser.id,
        name: nextUser.name,
        email: nextUser.email,
        username: nextUser.username,
      });

      return {
        success: true,
        message: 'Account created successfully.',
      };
    },
    [users],
  );

  //=== LOGIN ===
  // Log a user into the app
  const login = useCallback(
    ({ identifier, password }) => {
      const cleanIdentifier = identifier.trim().toLowerCase();
      const cleanPassword = password.trim();
      // Validate login inputs
      if (!cleanIdentifier || !cleanPassword) {
        return {
          success: false,
          message: 'Please enter your username/email and password.',
        };
      }

      // Find matching username or email
      const found = users.find(
        item =>
          item.username.toLowerCase() === cleanIdentifier ||
          item.email.toLowerCase() === cleanIdentifier,
      );
      // Check if account exists and password matches
      if (!found || found.password !== cleanPassword) {
        return {
          success: false,
          message: 'Invalid login details.',
        };
      }

      // Save logged in user details
      setUser({
        id: found.id,
        name: found.name,
        email: found.email,
        username: found.username,
      });
      return {
        success: true,
        message: 'Logged in successfully.',
      };
    },
    [users],
  );

  //=== LOGOUT ===
  // Log the current user out
  const logout = useCallback(() => {
    setUser(null);
  }, []);

  //=== CONTEXT VALUES ===
  // Memoised context values to reduce unnecessary re-renders
  const value = useMemo(
    () => ({
      user,
      isLoggedIn: Boolean(user),
      register,
      login,
      logout,
    }),
    [user, register, login, logout],
  );

  // Provide authentication data to the app
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };

