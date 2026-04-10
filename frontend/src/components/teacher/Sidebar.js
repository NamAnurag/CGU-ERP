import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
const NAV = [
  { section: 'Main', items: [
    { to: '/teacher/dashboard',     label: 'Dashboard',       icon: '▦' },
    { to: '/teacher/attendance',    label: 'Attendance',       icon: '📊', badge: '3', bc: '#f97316' },
    { to: '/teacher/assignments',   label: 'Assignments',      icon: '📝', badge: '5', bc: '#6366f1' },
    { to: '/teacher/marks',         label: 'Marks & Grading',  icon: '⭐' },
  ]},
  { section: 'Management', items: [
    { to: '/teacher/students',      label: 'Student List',     icon: '👥' },
    { to: '/teacher/announcements', label: 'Announcements',    icon: '📢' },
    { to: '/teacher/leave',         label: 'Leave Application',icon: '📅', badge: '1', bc: '#10b981' },
    { to: '/teacher/feedback',      label: 'Feedback',         icon: '💬' },
  ]},
];
export default function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{"name":"Faculty","dept":"N/A"}');
  const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  return (
    <aside style={S.sidebar}>
      <div style={S.top}>
        <div style={S.logo}>Edu<span style={{ color: 'var(--t-accent)' }}>Core</span></div>
        <div style={S.sub}>Faculty Portal</div>
        <div style={S.chip}><span style={S.dot} /><span style={S.chipTxt}>FACULTY ACCESS</span></div>
      </div>
      <div style={S.nav}>
        {NAV.map(sec => (
          <div key={sec.section} style={S.sec}>
            <div style={S.secLbl}>{sec.section}</div>
            {sec.items.map(item => (
              <NavLink key={item.to} to={item.to} style={({ isActive }) => ({ ...S.item, ...(isActive ? S.active : {}) })}>
                {({ isActive }) => (<>
                  {isActive && <span style={S.bar} />}
                  <span style={{ fontSize: 15 }}>{item.icon}</span>
                  <span style={{ flex: 1, color: isActive ? 'var(--t-accent)' : 'var(--muted2)' }}>{item.label}</span>
                  {item.badge && <span style={{ ...S.badge, background: item.bc }}>{item.badge}</span>}
                </>)}
              </NavLink>
            ))}
          </div>
        ))}
      </div>
      <div style={S.footer}>
        <div style={S.profile}>
          <div style={S.avatar}>{initials}</div>
          <div><div style={S.name}>{user.name}</div><div style={S.meta}>{user.dept}</div></div>
        </div>
        <button onClick={() => navigate('/')} style={S.logout}>← Back to Home</button>
      </div>
    </aside>
  );
}
const S = {
  sidebar: { width: 'var(--sidebar-w)', minHeight: '100vh', background: 'var(--surface)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, zIndex: 100 },
  top: { padding: '24px 22px 20px', borderBottom: '1px solid var(--border)' },
  logo: { fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: '-0.5px' },
  sub: { fontSize: 10, color: 'var(--muted)', letterSpacing: '2px', textTransform: 'uppercase', marginTop: 2 },
  chip: { display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(99,102,241,.12)', border: '1px solid rgba(99,102,241,.25)', borderRadius: 8, padding: '6px 10px', marginTop: 12 },
  dot: { width: 7, height: 7, borderRadius: '50%', background: 'var(--t-accent)', display: 'inline-block', animation: 'pulse .9s infinite' },
  chipTxt: { fontSize: 11, fontWeight: 600, color: 'var(--t-accent)' },
  nav: { flex: 1, overflowY: 'auto', padding: '8px 0' },
  sec: { padding: '12px 12px 4px' },
  secLbl: { fontSize: 9, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--muted)', padding: '4px 10px 6px', fontWeight: 600 },
  item: { display: 'flex', alignItems: 'center', gap: 11, padding: '10px 12px', borderRadius: 'var(--radius-sm)', fontSize: 13.5, fontWeight: 500, cursor: 'pointer', marginBottom: 2, position: 'relative', color: 'var(--muted2)' },
  active: { background: 'rgba(99,102,241,.13)' },
  bar: { position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 3, background: 'var(--t-accent)', borderRadius: '0 3px 3px 0' },
  badge: { fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 20, color: '#fff' },
  footer: { padding: 16, borderTop: '1px solid var(--border)' },
  profile: { display: 'flex', alignItems: 'center', gap: 11, padding: '11px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--surface2)', border: '1px solid var(--border)', marginBottom: 10 },
  avatar: { width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,var(--t-accent),var(--t-accent2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 14, color: '#fff', flexShrink: 0 },
  name: { fontSize: 13, fontWeight: 600 },
  meta: { fontSize: 11, color: 'var(--muted)', marginTop: 1 },
  logout: { width: '100%', padding: 9, borderRadius: 'var(--radius-sm)', background: 'rgba(99,102,241,.08)', border: '1px solid rgba(99,102,241,.2)', color: 'var(--t-accent)', fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer' },
};
