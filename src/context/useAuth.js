import { useContext } from 'react';
import { AuthContext } from './AuthContext';

// Custom hook for accessing authentication context
function useAuth() {
  const context = useContext(AuthContext);
  // Prevent using the hook outside the provider
  if (!context) {
    throw new Error('useAuth must be used inside an Auth Provider.');
  }
  return context;
}

export default useAuth;

