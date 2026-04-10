import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTheme } from '../../ThemeContext';

export default function FinanceLayout() {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const user = JSON.parse(localStorage.getItem('user') || '{"name":"Finance Team"}');
  const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <aside style={{ width: 260, minHeight: '100vh', background: 'var(--surface)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, zIndex: 100 }}>
        <div style={{ padding: '24px 22px 20px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20 }}>Edu<span style={{ color: '#10b981' }}>Core</span></div>
          <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase', marginTop: 2 }}>Finance Portal</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(16,185,129,.12)', border: '1px solid rgba(16,185,129,.25)', borderRadius: 8, padding: '6px 10px', marginTop: 12 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#10b981' }}>FINANCE ACCESS</span>
          </div>
        </div>
        <div style={{ flex: 1, padding: '16px 12px' }}>
          <div onClick={() => navigate('/finance/dashboard')} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 12px', borderRadius: 10, fontSize: 13.5, fontWeight: 500, cursor: 'pointer', background: 'rgba(16,185,129,.13)', color: '#10b981' }}>
            <span>💳</span><span>Payment Approvals</span>
          </div>
        </div>
        <div style={{ padding: 16, borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 12px', borderRadius: 10, background: 'var(--surface2)', border: '1px solid var(--border)', marginBottom: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#10b981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 14, color: '#fff', flexShrink: 0 }}>{initials}</div>
            <div><div style={{ fontSize: 13, fontWeight: 600 }}>{user.name}</div><div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 1 }}>Finance Team</div></div>
          </div>
          <button onClick={() => navigate('/')} style={{ width: '100%', padding: 9, borderRadius: 10, background: 'rgba(16,185,129,.08)', border: '1px solid rgba(16,185,129,.2)', color: '#10b981', fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>← Back to Home</button>
        </div>
      </aside>
      <main style={{ marginLeft: 260, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: 62, background: 'var(--surface)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 30px', gap: 14, position: 'sticky', top: 0, zIndex: 50 }}>
          <div style={{ flex: 1, fontFamily: "'Syne',sans-serif", fontSize: 19, fontWeight: 700 }}>Payment Approvals</div>
          <button onClick={toggle} style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--surface2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16 }}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
