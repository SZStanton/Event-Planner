import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../context/useAuth';

//=== REGISTER PAGE ===
// Handles user registration using AuthContext
function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle form submit
  const handleSubmit = e => {
    e.preventDefault();

    const result = register({
      name,
      email,
      username,
      password,
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    // Redirect to dashboard on success
    navigate('/');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center auth-wrapper">
      <div className="card p-4 w-100 auth-card">
        <h3 className="mb-3 text-center">Register</h3>

        {/* Error message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Registration form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter full name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <button className="btn btn-success w-100">Create Account</button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

