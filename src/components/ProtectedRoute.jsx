import { Navigate } from 'react-router-dom';
import useAuth from '../context/useAuth';

//=== ROUTE PROTECTION ===
// Blocks access if user is not logged in
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, allow access
  return children;
}

export default ProtectedRoute;

