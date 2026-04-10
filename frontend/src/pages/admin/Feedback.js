import React, { useState, useEffect } from 'react';
import Topbar from '../../components/admin/Topbar';

const RATING_COLORS = { 1: '#ef4444', 2: '#f97316', 3: '#f59e0b', 4: '#4f8ef7', 5: '#10b981' };

export default function AdminFeedback() {
  const [all, setAll]         = useState([]);
  const [roleFilter, setRole] = useState('All');
  const [catFilter, setCat]   = useState('All');
  const [search, setSearch]   = useState('');
  const [toast, setToast]     = useState('');

  const showToast = m => { setToast(m); setTimeout(() => setToast(''), 3000); };

  useEffect(() => {
    fetch('http://localhost:8080/api/feedback')
      .then(r => r.json()).then(d => setAll(Array.isArray(d) ? d : [])).catch(() => {});
  }, []);

  const deleteFeedback = async (id) => {
    await fetch(`http://localhost:8080/api/feedback/${id}`, { method: 'DELETE' });
    setAll(p => p.filter(f => f.id !== id));
    showToast('🗑️ Feedback deleted');
  };

  const categories = ['All', ...new Set(all.map(f => f.category))];
  const filtered = all.filter(f => {
    const rm = roleFilter === 'All' || f.authorRole === roleFilter;
    const cm = catFilter  === 'All' || f.category   === catFilter;
    const sm = !search || f.message.toLowerCase().includes(search.toLowerCase()) || f.authorName.toLowerCase().includes(search.toLowerCase());
    return rm && cm && sm;
  });

  const students = all.filter(f => f.authorRole === 'Student');
  const faculty  = all.filter(f => f.authorRole === 'Faculty');
  const avgAll   = all.length ? (all.reduce((a, f) => a + parseInt(f.rating || 0), 0) / all.length).toFixed(1) : '—';
  const avgStu   = students.length ? (students.reduce((a, f) => a + parseInt(f.rating || 0), 0) / students.length).toFixed(1) : '—';

  // Rating distribution
  const dist = [1,2,3,4,5].map(n => ({ n, count: all.filter(f => parseInt(f.rating) === n).length }));
  const maxDist = Math.max(...dist.map(d => d.count), 1);

  return (
    <div>
      <Topbar title="Feedback Overview" subtitle="All student and faculty feedback" />
      <div style={{ padding: '26px 30px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Stats */}
        <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14 }}>
          {[
            { l: 'Total Feedback', v: all.length,       c: 'var(--a-accent)' },
            { l: 'From Students',  v: students.length,  c: 'var(--accent)' },
            { l: 'From Faculty',   v: faculty.length,   c: 'var(--t-accent)' },
            { l: 'Overall Avg',    v: avgAll + ' ⭐',   c: '#10b981' },
            { l: 'Student Avg',    v: avgStu + ' ⭐',   c: '#f59e0b' },
          ].map(s => (
            <div key={s.l} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '16px 18px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.4px', marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div className="fade-up1" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Filters */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search feedback…"
                  style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)', fontFamily: "'DM Sans',sans-serif", fontSize: 13, padding: '9px 13px 9px 36px', outline: 'none' }} />
                <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}>🔍</span>
              </div>
              {['All', 'Student', 'Faculty'].map(r => (
                <div key={r} onClick={() => setRole(r)} style={{ padding: '8px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: '1px solid var(--border)', background: roleFilter === r ? 'rgba(244,63,94,.12)' : 'var(--surface)', color: roleFilter === r ? 'var(--a-accent)' : 'var(--muted)', borderColor: roleFilter === r ? 'rgba(244,63,94,.4)' : 'var(--border)' }}>{r}</div>
              ))}
              <select value={catFilter} onChange={e => setCat(e.target.value)}
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)', fontFamily: "'DM Sans',sans-serif", fontSize: 13, padding: '9px 14px', outline: 'none' }}>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            {/* Feedback list */}
            {filtered.length === 0 ? (
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 40, textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>No feedback found.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[...filtered].reverse().map((f, i) => {
                  const r = parseInt(f.rating) || 0;
                  const rc = f.authorRole === 'Student' ? 'var(--accent)' : 'var(--t-accent)';
                  return (
                    <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 18px', borderLeft: `3px solid ${RATING_COLORS[r] || 'var(--accent)'}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: rc + '18', color: rc }}>{f.authorRole}</span>
                          <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--muted2)' }}>{f.category}</span>
                          <div style={{ display: 'flex', gap: 2 }}>{[1,2,3,4,5].map(n => <span key={n} style={{ fontSize: 12, opacity: n <= r ? 1 : 0.2 }}>⭐</span>)}</div>
                        </div>
                        <button onClick={() => deleteFeedback(f.id)} style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 7, background: 'rgba(239,68,68,.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,.2)', cursor: 'pointer' }}>Delete</button>
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--muted2)', lineHeight: 1.6, marginBottom: 8 }}>{f.message}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                        {f.anonymous ? (f.authorRole === 'Student' ? '🕵️ Anonymous Student' : '🕵️ Anonymous Faculty') : f.authorName} · {f.date}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Rating distribution sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 20 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Rating Distribution</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[5,4,3,2,1].map(n => (
                  <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: RATING_COLORS[n], minWidth: 14 }}>{n}</div>
                    <span style={{ fontSize: 12 }}>⭐</span>
                    <div style={{ flex: 1, height: 8, background: 'var(--surface2)', borderRadius: 10, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: (dist.find(d => d.n === n)?.count / maxDist * 100) + '%', background: RATING_COLORS[n], borderRadius: 10, transition: 'width .8s' }} />
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', minWidth: 20, textAlign: 'right' }}>{dist.find(d => d.n === n)?.count}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 20 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 14 }}>By Category</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[...new Set(all.map(f => f.category))].map((c, i) => {
                  const count = all.filter(f => f.category === c).length;
                  return (
                    <div key={c} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--surface2)', borderRadius: 8, border: '1px solid var(--border)' }}>
                      <span style={{ fontSize: 12, fontWeight: 500 }}>{c}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>{count}</span>
                    </div>
                  );
                })}
                {all.length === 0 && <div style={{ fontSize: 12, color: 'var(--muted)' }}>No data yet.</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 28, right: 28, background: '#10b981', color: '#fff', padding: '12px 20px', borderRadius: 10, fontSize: 13, fontWeight: 600, zIndex: 999 }}>{toast}</div>}
    </div>
  );
}
