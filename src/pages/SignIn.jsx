import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export function SignInForm({ onToggleAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ width: '100%', maxWidth: '400px', margin: '0' }}>
      <h2 className="page-title text-green" style={{ textAlign: 'center' }}>Welcome to Manzil</h2>
      <p className="page-subtitle" style={{ textAlign: 'center', marginBottom: '24px' }}>Sign in to continue your journey</p>
      
      {error && <div style={{ color: '#E74C3C', marginBottom: '16px', textAlign: 'center', fontSize: '0.9rem', background: 'rgba(231, 76, 60, 0.1)', padding: '8px', borderRadius: 'var(--radius-sm)' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Gmail</label>
          <input 
            type="email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="example@gmail.com"
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input 
            type="password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••"
          />
        </div>
        <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '16px', width: '100%' }}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
        <span style={{ color: 'var(--text-muted)' }}>Don't have an account? </span>
        {onToggleAuth ? (
          <button 
            onClick={() => onToggleAuth('signup')}
            style={{ color: 'var(--primary-green)', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '0.9rem' }}
          >
            Sign Up
          </button>
        ) : (
          <Link to="/signup" style={{ color: 'var(--primary-green)', fontWeight: '600', textDecoration: 'none' }}>Sign Up</Link>
        )}
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <div className="page-container" style={{ justifyContent: 'center', padding: '20px' }}>
      <SignInForm />
    </div>
  );
}
