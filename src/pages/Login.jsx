import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../context/useAuth';

//=== LOGIN PAGE ===
// Handles user login using AuthContext
function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle form submit
  const handleSubmit = e => {
    e.preventDefault();
    const result = login({ identifier, password });

    if (!result.success) {
      setError(result.message);
      return;
    }
    // Redirect to dashboard on success
    navigate('/');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card p-4 w-100" style={{ maxWidth: '400px' }}>
        <h3 className="mb-3 text-center">Login</h3>

        {/* Error message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Login form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username or Email</label>
            <input
              className="form-control"
              value={identifier}
              onChange={e => setIdentifier(e.target.value)}
              placeholder="Enter username or email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <button className="btn btn-primary w-100">Login</button>
        </form>

        <p className="text-center mt-3 mb-0">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

