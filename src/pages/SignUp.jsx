import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { validatePassword, validatePhone } from '../utils/validation';

export function SignUpForm({ onToggleAuth }) {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    age: '',
    gender: 'Male',
    city: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    const validation = validatePassword(formData.password);
    if (!validation.isValid) {
      setError(`Password must include ${validation.errors.join(', ')}`);
      return;
    }

    if (!validatePhone(formData.phone)) {
      setError("Phone number must be exactly 10 digits");
      return;
    }

    setError('');
    setLoading(true);
    try {
      const { confirmPassword, ...dataToSubmit } = formData;
      await signUp(dataToSubmit);
    } catch (err) {
      setError(err.message || 'Failed to configure account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ width: '100%', maxWidth: '420px', margin: '0' }}>
      <h2 className="page-title text-green" style={{ textAlign: 'center' }}>Create Account</h2>
      <p className="page-subtitle" style={{ textAlign: 'center', marginBottom: '24px' }}>Join Manzil for smart alerts</p>
      
      {error && <div style={{ color: '#E74C3C', marginBottom: '16px', textAlign: 'center', fontSize: '0.9rem', background: 'rgba(231, 76, 60, 0.1)', padding: '8px', borderRadius: 'var(--radius-sm)' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Full Name</label>
          <input type="text" name="fullName" required onChange={handleChange} value={formData.fullName} />
        </div>
        
        <div className="input-group">
          <label>Gmail</label>
          <input type="email" name="email" required onChange={handleChange} value={formData.email} />
        </div>
        
        <div className="form-grid">
          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" required onChange={handleChange} value={formData.password} />
          </div>
          <div className="input-group">
            <label>Confirm</label>
            <input type="password" name="confirmPassword" required onChange={handleChange} value={formData.confirmPassword} />
          </div>
        </div>
        
        <div className="input-group">
          <label>Phone</label>
          <input type="tel" name="phone" required onChange={handleChange} value={formData.phone} />
        </div>
        
        <div className="form-grid">
          <div className="input-group">
            <label>Age</label>
            <input type="number" name="age" required onChange={handleChange} value={formData.age} />
          </div>
          <div className="input-group">
            <label>Gender</label>
            <select name="gender" onChange={handleChange} value={formData.gender}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        
        <div className="input-group">
          <label>City</label>
          <input type="text" name="city" required onChange={handleChange} value={formData.city} />
        </div>
        
        <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '16px', width: '100%' }}>
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
        <span style={{ color: 'var(--text-muted)' }}>Already have an account? </span>
        {onToggleAuth ? (
          <button 
            onClick={() => onToggleAuth('signin')}
            style={{ color: 'var(--primary-green)', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '0.9rem' }}
          >
            Sign In
          </button>
        ) : (
          <Link to="/signin" style={{ color: 'var(--primary-green)', fontWeight: '600', textDecoration: 'none' }}>Sign In</Link>
        )}
      </div>
    </div>
  );
}

export default function SignUp() {
  return (
    <div className="page-container" style={{ padding: '20px' }}>
      <SignUpForm />
    </div>
  );
}
