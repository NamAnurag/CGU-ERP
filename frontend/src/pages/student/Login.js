import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentLogin() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '', roll: '', dept: 'CSE' });
  const [strength, setStrength] = useState(0);
  const [loading, setLoading] = useState(false);

  const calcStrength = (p) => {
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    setStrength(s);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.role !== 'Student') {
          alert('Access denied. This portal is for students only.');
          setLoading(false);
          return;
        }
        // fetch student profile to get roll, sem etc.
        const profileRes = await fetch(`http://localhost:8080/api/students/email/${encodeURIComponent(data.email)}`);
        if (profileRes.ok) {
          const profile = await profileRes.json();
          localStorage.setItem('user', JSON.stringify({ ...data, roll: profile.roll, sem: profile.sem, cgpa: profile.cgpa }));
        } else {
          localStorage.setItem('user', JSON.stringify(data));
        }
        navigate('/student/dashboard');
      } else {
        alert('Invalid credentials.');
      }
    } catch {
      alert('Cannot connect to server.');
    } finally {
      setLoading(false);
    }
  };

  const strengthColors = ['#ef4444', '#f97316', '#f59e0b', '#10b981'];
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div style={S.page}>
      <div style={S.left}>
        <div style={S.leftContent}>
          <div onClick={() => navigate('/')} style={{ cursor: 'pointer', marginBottom: 32 }}>
            <div style={S.logo}>Edu<span style={{ color: 'var(--accent)' }}>Core</span></div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>← Back to Home</div>
          </div>
          <div style={S.tagline}>Student Portal</div>
          <p style={{ fontSize: 15, color: 'var(--muted2)', lineHeight: 1.7, marginBottom: 28 }}>
            Access your attendance, results, assignments, exams, fees and more — all in one place.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['📊 Real-time attendance tracking', '⭐ Results & CGPA', '📝 Assignment submissions', '💳 Online fee payment', '📅 Exam schedules', '🔔 Grievance portal'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--muted2)' }}>{f}</div>
            ))}
          </div>
        </div>
      </div>
      <div style={S.right}>
        <div style={S.card}>
          <div style={{ marginBottom: 24 }}>
            <div style={S.cardTitle}>Welcome back 👋</div>
            <div style={{ fontSize: 13, color: 'var(--muted2)', marginTop: 4 }}>Sign in to your student account</div>
          </div>
          <div style={S.tabs}>
            {['login', 'register'].map(t => (
              <div key={t} onClick={() => setTab(t)} style={{ ...S.tab, ...(tab === t ? S.tabActive : {}) }}>
                {t === 'login' ? 'Sign In' : 'Register'}
              </div>
            ))}
          </div>
          {tab === 'login' ? (
            <div>
              <Field label="College Email" type="email" placeholder="22cs0142@college.edu.in" value={form.email} onChange={v => setForm({ ...form, email: v })} />
              <Field label="Password" type="password" placeholder="Enter your password" value={form.password} onChange={v => setForm({ ...form, password: v })} />
              <button onClick={handleSubmit} style={{ ...S.submitBtn, opacity: loading ? .7 : 1 }}>
                {loading ? 'Signing in…' : 'Sign In →'}
              </button>
            </div>
          ) : (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Field label="First Name" placeholder="Ashish" value={form.firstName} onChange={v => setForm({ ...form, firstName: v })} />
                <Field label="Last Name" placeholder="Kumar" value={form.lastName} onChange={v => setForm({ ...form, lastName: v })} />
              </div>
              <Field label="Roll Number" placeholder="22CS0142" value={form.roll} onChange={v => setForm({ ...form, roll: v })} />
              <Field label="College Email" type="email" placeholder="22cs0142@college.edu.in" value={form.email} onChange={v => setForm({ ...form, email: v })} />
              <div style={S.fw}><label style={S.lbl}>Department</label>
                <select value={form.dept} onChange={e => setForm({ ...form, dept: e.target.value })} style={S.inp}>
                  {['CSE', 'ECE', 'ME', 'CE', 'EEE', 'IT'].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div style={S.fw}>
                <label style={S.lbl}>Password</label>
                <input type="password" style={S.inp} placeholder="Create a strong password"
                  value={form.password} onChange={e => { setForm({ ...form, password: e.target.value }); calcStrength(e.target.value); }} />
                {form.password && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                      {[0, 1, 2, 3].map(i => (
                        <div key={i} style={{ flex: 1, height: 3, borderRadius: 10, background: i < strength ? strengthColors[strength - 1] : 'var(--border)', transition: 'background .3s' }} />
                      ))}
                    </div>
                    <div style={{ fontSize: 11, color: strength > 0 ? strengthColors[strength - 1] : 'var(--muted)' }}>{strength > 0 ? strengthLabels[strength - 1] : ''}</div>
                  </div>
                )}
              </div>
              <button onClick={handleSubmit} style={{ ...S.submitBtn, marginTop: 8, opacity: loading ? .7 : 1 }}>
                {loading ? 'Creating account…' : 'Create Account →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, type = 'text', placeholder, value, onChange }) {
  return (
    <div style={S.fw}>
      <label style={S.lbl}>{label}</label>
      <input type={type} style={S.inp} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}

const S = {
  page: { display: 'flex', minHeight: '100vh', background: 'var(--bg)' },
  left: { flex: 1, background: 'linear-gradient(135deg,#0d1426 0%,#0f1e38 50%,#0b1628 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 },
  leftContent: { maxWidth: 460 },
  logo: { fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 28 },
  tagline: { fontFamily: "'Syne',sans-serif", fontSize: 32, fontWeight: 800, lineHeight: 1.2, marginBottom: 16, color: 'var(--text)' },
  right: { width: 480, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 },
  card: { width: '100%', maxWidth: 400 },
  cardTitle: { fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800 },
  tabs: { display: 'flex', background: 'var(--surface2)', borderRadius: 10, padding: 4, marginBottom: 24, gap: 4 },
  tab: { flex: 1, padding: '9px 0', textAlign: 'center', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', color: 'var(--muted)', transition: 'all .2s' },
  tabActive: { background: 'var(--accent)', color: '#fff', boxShadow: '0 4px 12px rgba(79,142,247,.3)' },
  fw: { marginBottom: 16 },
  lbl: { display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--muted2)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 7 },
  inp: { width: '100%', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', color: 'var(--text)', fontFamily: "'DM Sans',sans-serif", fontSize: 13, padding: '10px 13px', outline: 'none' },
  submitBtn: { width: '100%', padding: 13, borderRadius: 'var(--radius-sm)', background: 'linear-gradient(135deg,var(--accent),#3b6fd4)', color: '#fff', border: 'none', fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 18px rgba(79,142,247,.35)', marginTop: 8 },
};
