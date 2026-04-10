import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TeacherLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', empId: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password, empId: form.empId }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.role !== 'Faculty') {
          alert('Access denied. This portal is for faculty only.');
          setLoading(false);
          return;
        }
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/teacher/dashboard');
      } else {
        alert('Invalid credentials.');
      }
    } catch {
      alert('Cannot connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={S.page}>
      <div style={S.left}>
        <div style={S.leftContent}>
          <div onClick={() => navigate('/')} style={{ cursor: 'pointer', marginBottom: 32 }}>
            <div style={S.logo}>Edu<span style={{ color: 'var(--t-accent)' }}>Core</span></div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>← Back to Home</div>
          </div>
          <div style={S.tagline}>Faculty Portal</div>
          <p style={{ fontSize: 15, color: 'var(--muted2)', lineHeight: 1.7, marginBottom: 28 }}>
            Manage attendance, assignments, marks, student lists, announcements and leave — all from one dashboard.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['📋 Mark & manage attendance', '📝 Post & grade assignments', '⭐ Marks & grade distribution', '👥 Student at-risk alerts', '📢 Targeted announcements', '🗓️ Leave management'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--muted2)' }}>{f}</div>
            ))}
          </div>
        </div>
      </div>
      <div style={S.right}>
        <div style={S.card}>
          <div style={S.badge}>👨‍🏫 Faculty Access</div>
          <div style={{ marginBottom: 24 }}>
            <div style={S.cardTitle}>Faculty Sign In</div>
            <div style={{ fontSize: 13, color: 'var(--muted2)', marginTop: 4 }}>Use your college faculty credentials</div>
          </div>
          <Field label="Employee ID" placeholder="FAC-2019-0042" value={form.empId} onChange={v => setForm({ ...form, empId: v })} />
          <Field label="College Email" type="email" placeholder="t.mishra@college.edu.in" value={form.email} onChange={v => setForm({ ...form, email: v })} />
          <Field label="Password" type="password" placeholder="Enter your password" value={form.password} onChange={v => setForm({ ...form, password: v })} />
          <button onClick={handleSubmit} style={{ ...S.submitBtn, opacity: loading ? .7 : 1 }}>
            {loading ? 'Signing in…' : 'Sign In to Faculty Portal →'}
          </button>
          <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'var(--muted)' }}>
            Are you a student? <span onClick={() => navigate('/student/login')} style={{ color: 'var(--accent)', cursor: 'pointer', fontWeight: 600 }}>Student Login →</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, type = 'text', placeholder, value, onChange }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--muted2)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 7 }}>{label}</label>
      <input type={type} style={{ width: '100%', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text)', fontFamily: "'DM Sans',sans-serif", fontSize: 13, padding: '10px 13px', outline: 'none' }}
        placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}

const S = {
  page: { display: 'flex', minHeight: '100vh', background: 'var(--bg)' },
  left: { flex: 1, background: 'linear-gradient(135deg,#0a0d1f 0%,#0e1430 50%,#080c1c 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 },
  leftContent: { maxWidth: 460 },
  logo: { fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 28 },
  tagline: { fontFamily: "'Syne',sans-serif", fontSize: 32, fontWeight: 800, lineHeight: 1.2, marginBottom: 16, color: 'var(--text)' },
  right: { width: 480, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 },
  card: { width: '100%', maxWidth: 400 },
  badge: { display: 'inline-block', background: 'rgba(99,102,241,.12)', border: '1px solid rgba(99,102,241,.3)', color: 'var(--t-accent)', fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 20, marginBottom: 20 },
  cardTitle: { fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800 },
  submitBtn: { width: '100%', padding: 13, borderRadius: 'var(--radius-sm)', background: 'linear-gradient(135deg,var(--t-accent),#4f46e5)', color: '#fff', border: 'none', fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 18px rgba(99,102,241,.35)', marginTop: 8 },
};
