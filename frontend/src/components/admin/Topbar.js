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
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ background: 'rgba(244,63,94,.1)', border: '1px solid rgba(244,63,94,.25)', color: 'var(--a-accent)', fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 20 }}>ADMIN ACCESS</div>
        <button onClick={toggle} title="Toggle theme" style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--surface2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16 }}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--surface2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span style={{ position: 'absolute', top: 7, right: 7, width: 7, height: 7, borderRadius: '50%', background: 'var(--a-accent)', border: '1.5px solid var(--surface)' }} />
        </div>
      </div>
    </header>
  );
}
