import React, { useEffect, useRef, useState } from 'react';
import Topbar from '../../components/student/Topbar';
import { useNavigate } from 'react-router-dom';

const ATT_MONTHS = ['Oct','Nov','Dec','Jan','Feb','Mar'];

export default function Dashboard() {
  const barsRef = useRef([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{"name":"Student"}');
  const firstName = user.name.split(' ')[0];

  const [feeRecord, setFeeRecord]     = useState(null);
  const [attendance, setAttendance]   = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Fee record
    if (user.roll) {
      fetch(`http://localhost:8080/api/fees/student/${user.roll}`)
        .then(r => r.json()).then(d => { if (d.length) setFeeRecord(d[0]); }).catch(() => {});
    }
    // Assignments
    fetch('http://localhost:8080/api/assignments')
      .then(r => r.json()).then(setAssignments).catch(() => {});
    // Announcements
    fetch('http://localhost:8080/api/announcements')
      .then(r => r.json()).then(d => setAnnouncements(d.slice(0, 4))).catch(() => {});
  }, []);

  // Derive stats from real data
  const attPct   = user.attendance ?? '—';
  const cgpa     = user.cgpa ?? '—';
  const sem      = user.sem ?? '—';
  const dept     = user.dept ?? 'B.Tech';
  const feeDue   = feeRecord ? feeRecord.due : null;
  const feePaid  = feeRecord ? feeRecord.paid : null;
  const feeTotal = feeRecord ? feeRecord.total : null;
  const pendingAssignments = assignments.length;

  // Fake monthly attendance trend based on real overall %
  const base = typeof attPct === 'number' ? attPct : 78;
  const ATT_DATA = ATT_MONTHS.map((_, i) => Math.min(100, Math.max(50, Math.round(base + (Math.sin(i) * 8)))));

  useEffect(() => {
    setTimeout(() => {
      barsRef.current.forEach((el, i) => {
        if (el) el.style.height = ATT_DATA[i] + '%';
      });
    }, 300);
  }, [attPct]);

  const STATS = [
    { label: 'Attendance',  value: attPct !== '—' ? attPct + '%' : '—',  sub: attPct >= 75 ? '✅ Safe' : '⚠️ Below 75%', color: attPct >= 75 ? '#4f8ef7' : '#ef4444', icon: '📊' },
    { label: 'CGPA',        value: cgpa,  sub: `Sem ${sem} · ${dept}`,   color: '#10b981', icon: '⭐' },
    { label: 'Assignments', value: pendingAssignments, sub: 'Active this semester', color: '#f97316', icon: '📝' },
    { label: 'Fee Due',     value: feeDue !== null ? (feeDue === 0 ? '₹0' : '₹' + (feeDue / 1000).toFixed(0) + 'K') : '—',
      sub: feeDue === 0 ? 'All paid ✅' : feeDue !== null ? 'Due: April 30' : 'Loading…',
      color: feeDue === 0 ? '#10b981' : '#ef4444', icon: '💳' },
  ];

  return (
    <div>
      <Topbar title="Dashboard" subtitle={`Academic Year 2025–26 · Semester ${sem}`} />
      <div style={S.content}>

        <div className="fade-up" style={S.greeting}>
          <div>
            <h1 style={S.greetH1}>Good morning, {firstName}! 👋</h1>
            <p style={S.greetP}>Here's your academic overview for today.</p>
          </div>
          <div style={S.greetBadge}>Semester {sem} · {dept}</div>
        </div>

        <div className="fade-up1" style={S.statsGrid}>
          {STATS.map((s, i) => (
            <div key={i} style={S.statCard}>
              <div style={{ ...S.statIcon, background: s.color + '18', color: s.color }}>{s.icon}</div>
              <div style={S.statLabel}>{s.label}</div>
              <div style={{ ...S.statValue, color: s.color }}>{s.value}</div>
              <div style={S.statSub}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="fade-up2" style={S.midRow}>
          {/* Attendance chart */}
          <div style={S.card}>
            <div style={S.cardHead}>
              <div>
                <div style={S.cardTitle}>Attendance Trend</div>
                <div style={S.cardSub}>Oct 2025 – Mar 2026</div>
              </div>
              <span onClick={() => navigate('/student/attendance')} style={S.viewAll}>View details →</span>
            </div>
            <div style={S.barChart}>
              {ATT_DATA.map((v, i) => (
                <div key={i} style={S.barCol}>
                  <div style={S.barTrack}>
                    <div ref={el => barsRef.current[i] = el}
                      style={{ ...S.barFill, background: v >= 75 ? 'var(--accent)' : '#ef4444', transition: `height .8s cubic-bezier(.34,1.56,.64,1) ${i * 0.08}s`, height: '0%' }} />
                  </div>
                  <div style={S.barVal}>{v}%</div>
                  <div style={S.barMonth}>{ATT_MONTHS[i]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div style={S.card}>
            <div style={S.cardHead}>
              <div style={S.cardTitle}>Announcements</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {announcements.length === 0 && <div style={{ fontSize: 13, color: 'var(--muted)' }}>No announcements.</div>}
              {announcements.map((a, i) => {
                const uc = a.urgency === 'Urgent' ? '#ef4444' : a.urgency === 'Notice' ? '#6366f1' : '#10b981';
                return (
                  <div key={i} style={{ ...S.eventItem, borderLeftColor: uc }}>
                    <div style={S.eventTitle}>{a.title}</div>
                    <div style={{ ...S.eventTime, color: uc }}>{a.urgency} · {a.date}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="fade-up3" style={S.botRow}>
          {/* Assignments list */}
          <div style={{ ...S.card, gridColumn: '1 / span 2' }}>
            <div style={S.cardHead}>
              <div style={S.cardTitle}>Active Assignments</div>
              <span onClick={() => navigate('/student/assignments')} style={S.viewAll}>All assignments →</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {assignments.length === 0 && <div style={{ fontSize: 13, color: 'var(--muted)' }}>No assignments found.</div>}
              {assignments.slice(0, 4).map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '11px 14px', background: 'var(--surface2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', borderLeft: `3px solid ${a.color || 'var(--accent)'}` }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{a.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{a.subject} · Due: {a.deadline}</div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>{a.marks} marks</div>
                </div>
              ))}
            </div>
          </div>

          {/* Fee summary */}
          <div style={S.card}>
            <div style={S.cardHead}><div style={S.cardTitle}>Fee Summary</div></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Total Fee', val: feeTotal !== null ? '₹' + feeTotal.toLocaleString('en-IN') : '—', color: 'var(--text)' },
                { label: 'Paid',      val: feePaid  !== null ? '₹' + feePaid.toLocaleString('en-IN')  : '—', color: 'var(--green)' },
                { label: 'Due',       val: feeDue   !== null ? '₹' + feeDue.toLocaleString('en-IN')   : '—', color: feeDue === 0 ? 'var(--green)' : 'var(--red)' },
                { label: 'Due Date',  val: 'Apr 30, 2026', color: 'var(--orange)' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--surface2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 13, color: 'var(--muted2)' }}>{r.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: r.color }}>{r.val}</span>
                </div>
              ))}
              <button onClick={() => navigate('/student/fees')} style={S.payBtn}>
                {feeDue === 0 ? 'View Receipts →' : 'Pay Now →'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function ProgressBar({ value, color, delay = 0 }) {
  const ref = useRef();
  useEffect(() => { setTimeout(() => { if (ref.current) ref.current.style.width = value + '%'; }, 400); }, [value]);
  return (
    <div style={{ height: 6, background: 'var(--surface2)', borderRadius: 10, overflow: 'hidden' }}>
      <div ref={ref} style={{ height: '100%', width: '0%', background: color, borderRadius: 10, transition: `width .9s cubic-bezier(.34,1.56,.64,1) ${delay}s` }} />
    </div>
  );
}

const S = {
  content: { padding: '26px 30px', display: 'flex', flexDirection: 'column', gap: 22 },
  greeting: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  greetH1: { fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800 },
  greetP: { fontSize: 14, color: 'var(--muted2)', marginTop: 4 },
  greetBadge: { background: 'rgba(79,142,247,.1)', border: '1px solid rgba(79,142,247,.25)', color: 'var(--accent)', fontSize: 12, fontWeight: 600, padding: '8px 18px', borderRadius: 20 },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 },
  statCard: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 22px' },
  statIcon: { width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: 14 },
  statLabel: { fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.5px' },
  statValue: { fontFamily: "'Syne',sans-serif", fontSize: 32, fontWeight: 800, margin: '4px 0 2px' },
  statSub: { fontSize: 12, color: 'var(--muted2)' },
  midRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 },
  botRow: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 },
  card: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 22 },
  cardHead: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  cardTitle: { fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700 },
  cardSub: { fontSize: 12, color: 'var(--muted)', marginTop: 2 },
  viewAll: { fontSize: 12, color: 'var(--accent)', cursor: 'pointer' },
  barChart: { display: 'flex', gap: 8, alignItems: 'flex-end', height: 120 },
  barCol: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 },
  barTrack: { flex: 1, width: '100%', background: 'var(--surface2)', borderRadius: '4px 4px 0 0', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' },
  barFill: { width: '100%', borderRadius: '4px 4px 0 0' },
  barVal: { fontSize: 10, fontWeight: 700, color: 'var(--muted2)' },
  barMonth: { fontSize: 10, color: 'var(--muted)' },
  eventItem: { padding: '11px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderLeft: '3px solid', borderRadius: 'var(--radius-sm)' },
  eventTitle: { fontSize: 13, fontWeight: 600, marginBottom: 3 },
  eventTime: { fontSize: 11, fontWeight: 600 },
  payBtn: { width: '100%', padding: '11px', marginTop: 4, borderRadius: 'var(--radius-sm)', background: 'linear-gradient(135deg,var(--accent),#3b6fd4)', color: '#fff', border: 'none', fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, cursor: 'pointer' },
};
