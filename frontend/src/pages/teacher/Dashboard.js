import React, { useState, useEffect, useRef } from 'react';
import Topbar from '../../components/teacher/Topbar';

const STATS = [
  { label: 'Total Students', val: '247', color: 'var(--t-accent)', icon: '👥' },
  { label: 'Avg Attendance', val: '81%',  color: 'var(--accent2)', icon: '📋' },
  { label: 'Assignments',    val: '18',   color: '#10b981', icon: '📝' },
  { label: 'Class Avg',      val: '74%',  color: '#f59e0b', icon: '⭐' },
];

const SCHEDULE = [
  { time: '8:00 AM',  name: 'Machine Learning — CS501', room: 'LH-205', type: 'done',    color: '#6366f1' },
  { time: '10:00 AM', name: 'Deep Learning — CS606',    room: 'LH-205', type: 'current', color: '#ec4899' },
  { time: '12:00 PM', name: 'ML Lab — CS604',           room: 'Lab-3',  type: 'upcoming',color: '#f59e0b' },
  { time: '3:00 PM',  name: 'DL Tutorial — CS606T',     room: 'SR-10',  type: 'upcoming',color: '#22d3ee' },
];

const ATT = [
  { name: 'Machine Learning (CS501)', pct: 88, color: '#6366f1' },
  { name: 'Deep Learning (CS606)',     pct: 81, color: '#ec4899' },
  { name: 'ML Lab (CS604)',            pct: 76, color: '#f59e0b' },
  { name: 'DL Tutorial (CS606-T)',     pct: 79, color: '#22d3ee' },
];

const TASKS = [
  { text: 'Mark attendance — CS606 (Mar 25)', due: 'Overdue', dc: '#ef4444' },
  { text: 'Grade CNN assignment submissions',  due: 'Due today', dc: '#f97316' },
  { text: 'Upload lecture slides — Unit 4',    due: 'Due Apr 1', dc: '#f59e0b' },
  { text: 'Submit mid-term marks to portal',   due: 'Apr 5',    dc: '#6366f1' },
];

export default function TeacherDashboard() {
  const [tasks, setTasks] = useState(TASKS.map(t => ({ ...t, done: false })));
  const barRefs = useRef([]);
  const user = JSON.parse(localStorage.getItem('user') || '{"name":"Faculty"}');
  const firstName = user.name.replace(/^(Dr\.|Prof\.)\s*/i, '').split(' ')[0];

  useEffect(() => {
    setTimeout(() => {
      barRefs.current.forEach((el, i) => { if (el) el.style.width = ATT[i].pct + '%'; });
    }, 400);
  }, []);

  return (
    <div>
      <Topbar title="Faculty Dashboard" subtitle="Thursday, March 26, 2026 · Academic Year 2025–26" />
      <div style={S.content}>

        <div className="fade-up" style={S.greeting}>
          <div>
            <h1 style={S.greetH}>Good morning, {firstName}! 👋</h1>
            <p style={S.greetP}>4 classes today · 3 pending attendance sessions · 5 assignments to review</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={S.btnSec}>Mark Attendance</button>
            <button style={S.btnPri}>+ New Announcement</button>
          </div>
        </div>

        <div className="fade-up1" style={S.statsGrid}>
          {STATS.map((s, i) => (
            <div key={i} style={S.statCard}>
              <div style={{ ...S.statIcon, background: s.color + '18', color: s.color }}>{s.icon}</div>
              <div style={S.statLbl}>{s.label}</div>
              <div style={{ ...S.statVal, color: s.color }}>{s.val}</div>
            </div>
          ))}
        </div>

        <div className="fade-up2" style={S.midRow}>
          <div style={S.card}>
            <div style={S.cardHead}><div style={S.cardTitle}>Today's Schedule</div></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SCHEDULE.map((c, i) => (
                <div key={i} style={{ ...S.classItem, borderColor: c.type === 'current' ? c.color : 'var(--border)', background: c.type === 'current' ? c.color + '08' : 'var(--surface2)' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted2)', minWidth: 70 }}>{c.time}</div>
                  <div style={{ width: 4, height: 36, borderRadius: 10, background: c.color, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{c.room}</div>
                  </div>
                  {c.type === 'current' && <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 20, background: c.color, color: '#fff', letterSpacing: '.5px' }}>NOW</span>}
                  {c.type === 'done' && <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: 'rgba(16,185,129,.12)', color: '#10b981' }}>Done</span>}
                </div>
              ))}
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardHead}><div style={S.cardTitle}>Attendance Overview</div></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {ATT.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 500, flex: 1, color: 'var(--muted2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</div>
                  <div style={{ flex: 1, height: 5, background: 'var(--surface2)', borderRadius: 10, overflow: 'hidden' }}>
                    <div ref={el => barRefs.current[i] = el} style={{ height: '100%', width: '0%', background: a.color, borderRadius: 10, transition: `width .9s cubic-bezier(.34,1.56,.64,1) ${i * 0.1}s` }} />
                  </div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 12, fontWeight: 700, color: a.pct >= 85 ? '#10b981' : a.pct >= 75 ? '#f59e0b' : '#ef4444', minWidth: 36, textAlign: 'right' }}>{a.pct}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="fade-up3" style={S.botRow}>
          <div style={S.card}>
            <div style={S.cardHead}><div style={S.cardTitle}>Pending Tasks</div></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {tasks.map((t, i) => (
                <div key={i} onClick={() => setTasks(prev => prev.map((x, j) => j === i ? { ...x, done: !x.done } : x))}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', background: 'var(--surface2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', cursor: 'pointer', opacity: t.done ? .6 : 1 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 5, border: '2px solid', borderColor: t.done ? '#10b981' : 'var(--border)', background: t.done ? '#10b981' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{t.done ? '✓' : ''}</div>
                  <div style={{ flex: 1, fontSize: 13, textDecoration: t.done ? 'line-through' : 'none', color: t.done ? 'var(--muted)' : 'inherit' }}>{t.text}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 20, background: t.dc + '18', color: t.dc }}>{t.due}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardHead}><div style={S.cardTitle}>Student Grievances</div></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[{ title: 'Study material not uploaded for CS606', id: 'GRV-2026-0012', date: 'Mar 24', status: 'Open', sc: '#f97316' },
                { title: 'ML Lab marks not updated on portal', id: 'GRV-2026-0009', date: 'Mar 20', status: 'In Review', sc: '#6366f1' },
                { title: 'Backpropagation assignment re-evaluation', id: 'GRV-2026-0008', date: 'Mar 19', status: 'Resolved', sc: '#10b981' }
              ].map((g, i) => (
                <div key={i} style={{ padding: '11px 14px', background: 'var(--surface2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', borderLeft: `3px solid ${g.sc}` }}>
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 3 }}>{g.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{g.id} · {g.date} · <span style={{ color: g.sc, fontWeight: 600 }}>{g.status}</span></div>
                </div>
              ))}
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardHead}><div style={S.cardTitle}>Recent Announcements</div></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[{ badge: 'Urgent', bc: '#ef4444', title: 'End-Term marks due by April 25', time: 'Mar 25' },
                { badge: 'Notice', bc: '#6366f1', title: 'Faculty meeting — April 2 at 11 AM', time: 'Mar 22' },
                { badge: 'Info', bc: '#10b981', title: 'Upload Sem 6 records before April 10', time: 'Mar 18' }
              ].map((a, i) => (
                <div key={i} style={{ padding: '11px 14px', background: 'var(--surface2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', cursor: 'pointer' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, display: 'inline-block', background: a.bc + '18', color: a.bc, marginBottom: 5 }}>{a.badge}</div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{a.title}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 3 }}>{a.time}, 2026</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const S = {
  content: { padding: '26px 30px', display: 'flex', flexDirection: 'column', gap: 22 },
  greeting: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 },
  greetH: { fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800 },
  greetP: { fontSize: 13, color: 'var(--muted2)', marginTop: 4 },
  btnPri: { padding: '9px 18px', borderRadius: 'var(--radius-sm)', background: 'var(--t-accent)', color: '#fff', border: 'none', fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 14px rgba(99,102,241,.3)' },
  btnSec: { padding: '9px 18px', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted2)', fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 },
  statCard: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 22px' },
  statIcon: { width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: 14 },
  statLbl: { fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.5px' },
  statVal: { fontFamily: "'Syne',sans-serif", fontSize: 30, fontWeight: 800, marginTop: 4 },
  midRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 },
  botRow: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 },
  card: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 22 },
  cardHead: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  cardTitle: { fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700 },
  classItem: { display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', border: '1px solid', borderRadius: 'var(--radius-sm)', transition: 'border-color .2s' },
};
