import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/PageTransition';

export default function Profile() {
  const { user, updateProfile, signOut } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleSave = () => {
    updateProfile(formData);
    setEditing(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const compactInputStyle = { padding: '8px 12px', fontSize: '0.9rem' };

  return (
    <PageTransition>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 80px)', padding: '16px 24px', boxSizing: 'border-box', maxWidth: '800px', margin: '0 auto', width: '100%', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.3rem', margin: 0, color: 'white' }}>Profile</h1>
          <span className={`badge badge-${user?.plan}`} style={{ textTransform: 'capitalize' }}>
            {user?.plan} Plan
          </span>
        </div>

        <div className="card" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '0.95rem', margin: 0 }}>Personal Info</h2>
            <button style={{ color: 'var(--secondary-blue)', fontWeight: 600, fontSize: '0.9rem' }} onClick={() => editing ? handleSave() : setEditing(true)}>
              {editing ? 'Save' : 'Edit'}
            </button>
          </div>

          <div className="form-grid" style={{ marginBottom: '8px' }}>
            <div className="input-group">
              <label style={{ fontSize: '0.8rem' }}>Full Name</label>
              {editing ? <input name="fullName" value={formData.fullName} onChange={handleChange} style={compactInputStyle} /> : <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{user?.fullName}</div>}
            </div>
            <div className="input-group">
              <label style={{ fontSize: '0.8rem' }}>City</label>
              {editing ? <input name="city" value={formData.city} onChange={handleChange} style={compactInputStyle} /> : <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{user?.city}</div>}
            </div>
          </div>

          <div className="form-grid" style={{ marginBottom: '8px' }}>
            <div className="input-group">
              <label style={{ fontSize: '0.8rem' }}>Email</label>
              <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>{user?.email}</div>
            </div>
            <div className="input-group">
              <label style={{ fontSize: '0.8rem' }}>Phone</label>
              {editing ? <input name="phone" value={formData.phone} onChange={handleChange} style={compactInputStyle} /> : <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{user?.phone}</div>}
            </div>
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label style={{ fontSize: '0.8rem' }}>Age</label>
              {editing ? <input name="age" type="number" value={formData.age} onChange={handleChange} style={compactInputStyle} /> : <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{user?.age}</div>}
            </div>
            <div className="input-group">
              <label style={{ fontSize: '0.8rem' }}>Gender</label>
              {editing ? (
                <select name="gender" value={formData.gender} onChange={handleChange} style={compactInputStyle}>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              ) : <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{user?.gender}</div>}
            </div>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px 16px' }}>
          <button 
            onClick={() => setShowPasswordModal(true)}
            style={{ width: '100%', padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: 'var(--text-main)', borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem' }}
          >
            🔑 Change Password
          </button>
          <button 
            onClick={signOut}
            style={{ width: '100%', padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#E74C3C', fontSize: '0.9rem' }}
          >
            🚪 Sign Out
          </button>
        </div>

        {showPasswordModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div className="card" style={{ width: '90%', maxWidth: '350px' }}>
              <h3 style={{ marginBottom: '16px' }}>Change Password</h3>
              <input type="password" placeholder="Old Password" style={{ marginBottom: '12px' }} />
              <input type="password" placeholder="New Password" style={{ marginBottom: '16px' }} />
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn-primary" style={{ flex: 1 }} onClick={() => setShowPasswordModal(false)}>Update</button>
                <button style={{ flex: 1, backgroundColor: '#f5f5f5', borderRadius: 'var(--radius-md)', fontWeight: 600 }} onClick={() => setShowPasswordModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
