import React from 'react';
import { useTheme } from '../../ThemeContext';

export default function Topbar({ title, subtitle }) {
  const { theme, toggle } = useTheme();
  return (
    <header style={{ height: 62, background: 'var(--surface)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 30px', gap: 14, position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 19, fontWeight: 700 }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 1 }}>{subtitle}</div>}
      </div>
      <div style={{ background: 'rgba(99,102,241,.1)', border: '1px solid rgba(99,102,241,.25)', color: 'var(--t-accent)', fontSize: 12, fontWeight: 500, padding: '6px 14px', borderRadius: 20 }}>Semester 6 · Even Sem</div>
      <button onClick={toggle} title="Toggle theme" style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--surface2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16 }}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </header>
  );
}
