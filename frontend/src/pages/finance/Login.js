import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FinanceLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!form.email || !form.password) { setError('Please fill all fields.'); return; }
    setError(''); setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.role !== 'Finance') { setError('Access denied. Finance team only.'); setLoading(false); return; }
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/finance/dashboard');
      } else { setError('Invalid credentials.'); }
    } catch { setError('Cannot connect to server.'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ flex: 1, background: 'linear-gradient(135deg,#0a1628,#0d2040)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, flexDirection: 'column', alignItems: 'flex-start' }}>
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer', marginBottom: 32 }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 28 }}>Edu<span style={{ color: '#10b981' }}>Core</span></div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>← Back to Home</div>
        </div>
        <div style={{ fontSize: 56, marginBottom: 12 }}>💳</div>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Finance Portal</div>
        <p style={{ fontSize: 15, color: 'var(--muted2)', lineHeight: 1.7, maxWidth: 400 }}>
          Review, approve and reject student fee payment submissions. All actions are logged.
        </p>
        <div style={{ marginTop: 24, padding: '14px 16px', background: 'rgba(16,185,129,.08)', border: '1px solid rgba(16,185,129,.2)', borderRadius: 10 }}>
          <div style={{ fontSize: 12, color: '#10b981', fontWeight: 600, marginBottom: 4 }}>💡 Finance Team Access Only</div>
          <div style={{ fontSize: 12, color: 'var(--muted2)' }}>You can only view and manage payment transactions.</div>
        </div>
      </div>
      <div style={{ width: 480, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ display: 'inline-block', background: 'rgba(16,185,129,.1)', border: '1px solid rgba(16,185,129,.3)', color: '#10b981', fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 20, marginBottom: 20 }}>💳 Finance Team Access</div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Finance Sign In</div>
          <div style={{ fontSize: 13, color: 'var(--muted2)', marginBottom: 28 }}>Use your finance team credentials</div>
          {error && <div style={{ background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.25)', color: '#ef4444', padding: '10px 14px', borderRadius: 10, fontSize: 13, marginBottom: 16 }}>{error}</div>}
          {[{ l: 'Email', k: 'email', t: 'email', p: 'finance@college.edu.in' }, { l: 'Password', k: 'password', t: 'password', p: 'Enter password' }].map(f => (
            <div key={f.k} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--muted2)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 7 }}>{f.l}</label>
              <input type={f.t} placeholder={f.p} value={form[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.value })}
                style={{ width: '100%', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)', fontFamily: "'DM Sans',sans-serif", fontSize: 13, padding: '10px 13px', outline: 'none' }} />
            </div>
          ))}
          <button onClick={handleSubmit} disabled={loading}
            style={{ width: '100%', padding: 13, borderRadius: 10, background: 'linear-gradient(135deg,#10b981,#059669)', color: '#fff', border: 'none', fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, cursor: 'pointer', opacity: loading ? .7 : 1, marginTop: 4 }}>
            {loading ? 'Signing in…' : '💳 Sign In to Finance Portal →'}
          </button>
        </div>
      </div>
    </div>
  );
}
