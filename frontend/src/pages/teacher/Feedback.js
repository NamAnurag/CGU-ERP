import React, { useState, useEffect } from 'react';
import Topbar from '../../components/teacher/Topbar';

const CATEGORIES = ['Curriculum', 'Infrastructure', 'Administration', 'Student Engagement', 'Resources', 'General', 'Other'];
const RATING_LABELS = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent' };
const RATING_COLORS = { 1: '#ef4444', 2: '#f97316', 3: '#f59e0b', 4: '#4f8ef7', 5: '#10b981' };
const CAT_COLORS = ['#4f8ef7','#6366f1','#10b981','#f59e0b','#ec4899','#22d3ee','#f97316'];

export default function FacultyFeedback() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [studentFeedbacks, setStudentFeedbacks] = useState([]);
  const [myFeedbacks, setMyFeedbacks]           = useState([]);
  const [tab, setTab]     = useState('view');   // view | post
  const [filter, setFilter] = useState('All');
  const [form, setForm]   = useState({ category: 'Curriculum', rating: 0, message: '', anonymous: false });
  const [step, setStep]   = useState('form');
  const [toast, setToast] = useState('');

  const showToast = m => { setToast(m); setTimeout(() => setToast(''), 3000); };

  const load = () => {
    fetch('http://localhost:8080/api/feedback/students')
      .then(r => r.json()).then(d => setStudentFeedbacks(Array.isArray(d) ? d : [])).catch(() => {});
    if (user.email)
      fetch(`http://localhost:8080/api/feedback/my/${encodeURIComponent(user.email)}`)
        .then(r => r.json()).then(d => setMyFeedbacks(Array.isArray(d) ? d : [])).catch(() => {});
  };

  useEffect(() => { load(); }, []);

  const submit = async () => {
    if (!form.rating) { showToast('Please select a rating.'); return; }
    if (!form.message.trim()) { showToast('Please write your feedback.'); return; }
    setStep('loading');
    try {
      const res = await fetch('http://localhost:8080/api/feedback', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName:  form.anonymous ? 'Anonymous Faculty' : user.name,
          authorEmail: user.email,
          authorRole:  'Faculty',
          category:    form.category,
          rating:      String(form.rating),
          message:     form.message,
          anonymous:   form.anonymous,
        }),
      });
      if (res.ok) {
        setStep('success'); load();
        setTimeout(() => { setStep('form'); setForm({ category: 'Curriculum', rating: 0, message: '', anonymous: false }); setTab('view'); }, 2000);
      } else { setStep('form'); showToast('Submission failed.'); }
    } catch { setStep('form'); showToast('Cannot connect to server.'); }
  };

  const categories = ['All', ...new Set(studentFeedbacks.map(f => f.category))];
  const filtered = filter === 'All' ? studentFeedbacks : studentFeedbacks.filter(f => f.category === filter);

  const avgRating = studentFeedbacks.length
    ? (studentFeedbacks.reduce((a, f) => a + parseInt(f.rating || 0), 0) / studentFeedbacks.length).toFixed(1)
    : '—';

  return (
    <div>
      <Topbar title="Feedback" subtitle="View student feedback · Share your own" />
      <div style={{ padding: '26px 30px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Stats */}
        <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {[
            { l: 'Total Student Feedback', v: studentFeedbacks.length, c: 'var(--accent)' },
            { l: 'Avg Rating', v: avgRating + ' / 5', c: '#10b981' },
            { l: 'My Submissions', v: myFeedbacks.length, c: 'var(--t-accent)' },
            { l: 'Categories', v: new Set(studentFeedbacks.map(f => f.category)).size, c: '#f59e0b' },
          ].map(s => (
            <div key={s.l} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '16px 18px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 800, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.4px', marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="fade-up1" style={{ display: 'flex', gap: 8 }}>
          {['view', 'post'].map(t => (
            <div key={t} onClick={() => setTab(t)} style={{ padding: '9px 20px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: '1px solid var(--border)', background: tab === t ? 'rgba(99,102,241,.12)' : 'var(--surface)', color: tab === t ? 'var(--t-accent)' : 'var(--muted)', borderColor: tab === t ? 'rgba(99,102,241,.4)' : 'var(--border)' }}>
              {t === 'view' ? '👥 Student Feedbacks' : '✏️ Post My Feedback'}
            </div>
          ))}
        </div>

        {/* View student feedbacks */}
        {tab === 'view' && (
          <div className="fade-up2">
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              {categories.map(c => (
                <div key={c} onClick={() => setFilter(c)} style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: 'pointer', border: '1px solid var(--border)', background: filter === c ? 'rgba(99,102,241,.12)' : 'var(--surface)', color: filter === c ? 'var(--t-accent)' : 'var(--muted)', borderColor: filter === c ? 'rgba(99,102,241,.4)' : 'var(--border)' }}>{c}</div>
              ))}
            </div>
            {filtered.length === 0 ? (
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 40, textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>No student feedback yet.</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[...filtered].reverse().map((f, i) => {
                  const r = parseInt(f.rating) || 0;
                  const ci = Math.abs(f.category ? f.category.charCodeAt(0) : 0) % CAT_COLORS.length;
                  return (
                  <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 18px', borderLeft: `3px solid ${RATING_COLORS[r] || 'var(--accent)'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20, background: CAT_COLORS[ci] + '18', color: CAT_COLORS[ci] }}>{f.category}</span>
                      <div style={{ display: 'flex', gap: 2 }}>{[1,2,3,4,5].map(n => <span key={n} style={{ fontSize: 12, opacity: n <= r ? 1 : 0.2 }}>⭐</span>)}</div>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--muted2)', lineHeight: 1.6, marginBottom: 8 }}>{f.message}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                      {f.anonymous ? '🕵️ Anonymous Student' : f.authorName} · {f.date}
                    </div>
                  </div>
                );})}
              </div>
            )}
          </div>
        )}

        {/* Post feedback */}
        {tab === 'post' && (
          <div className="fade-up2" style={{ maxWidth: 600 }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 20 }}>✏️ Submit Your Feedback</div>

              {step === 'loading' && <div style={{ textAlign: 'center', padding: '40px 0' }}><div style={{ width: 44, height: 44, border: '4px solid var(--border)', borderTop: '4px solid var(--t-accent)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 14px' }} /><div style={{ color: 'var(--muted)', fontSize: 13 }}>Submitting…</div></div>}
              {step === 'success' && <div style={{ textAlign: 'center', padding: '32px 0' }}><div style={{ fontSize: 52, marginBottom: 12 }}>🎉</div><div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: '#10b981' }}>Feedback Submitted!</div></div>}

              {step === 'form' && (<>
                <div style={{ marginBottom: 18 }}>
                  <label style={S.lbl}>Category</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {CATEGORIES.map(c => (
                      <div key={c} onClick={() => setForm(p => ({ ...p, category: c }))}
                        style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: `1px solid ${form.category === c ? 'var(--t-accent)' : 'var(--border)'}`, background: form.category === c ? 'rgba(99,102,241,.12)' : 'var(--surface2)', color: form.category === c ? 'var(--t-accent)' : 'var(--muted)' }}>{c}</div>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={S.lbl}>Rating</label>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    {[1,2,3,4,5].map(n => (
                      <div key={n} onClick={() => setForm(p => ({ ...p, rating: n }))}
                        style={{ width: 42, height: 42, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, cursor: 'pointer', border: `2px solid ${form.rating >= n ? RATING_COLORS[n] : 'var(--border)'}`, background: form.rating >= n ? RATING_COLORS[n] + '18' : 'var(--surface2)', transition: 'all .15s' }}>⭐</div>
                    ))}
                    {form.rating > 0 && <span style={{ fontSize: 13, fontWeight: 700, color: RATING_COLORS[form.rating], marginLeft: 6 }}>{RATING_LABELS[form.rating]}</span>}
                  </div>
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={S.lbl}>Message</label>
                  <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Share your thoughts…"
                    style={{ width: '100%', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)', fontFamily: "'DM Sans',sans-serif", fontSize: 13, padding: '10px 13px', outline: 'none', minHeight: 110, resize: 'vertical', lineHeight: 1.6 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, padding: '12px 14px', background: 'var(--surface2)', borderRadius: 10, border: '1px solid var(--border)' }}>
                  <div onClick={() => setForm(p => ({ ...p, anonymous: !p.anonymous }))}
                    style={{ width: 40, height: 22, borderRadius: 11, background: form.anonymous ? 'var(--t-accent)' : 'var(--border)', position: 'relative', cursor: 'pointer', transition: 'background .2s', flexShrink: 0 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: form.anonymous ? 20 : 2, transition: 'left .2s' }} />
                  </div>
                  <div><div style={{ fontSize: 13, fontWeight: 600 }}>Submit Anonymously</div><div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 1 }}>Admin won't see your name</div></div>
                </div>
                <button onClick={submit} style={{ width: '100%', padding: 12, borderRadius: 10, background: 'linear-gradient(135deg,var(--t-accent),#4f46e5)', color: '#fff', border: 'none', fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Submit Feedback →</button>
              </>)}
            </div>
          </div>
        )}
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 28, right: 28, background: '#ef4444', color: '#fff', padding: '12px 20px', borderRadius: 10, fontSize: 13, fontWeight: 600, zIndex: 999 }}>{toast}</div>}
      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </div>
  );
}

const S = {
  lbl: { display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--muted2)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 8 },
};
