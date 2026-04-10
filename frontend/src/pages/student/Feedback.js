import React, { useState, useEffect } from 'react';
import Topbar from '../../components/student/Topbar';

const CATEGORIES = ['Academic', 'Infrastructure', 'Teaching', 'Hostel', 'Canteen', 'General', 'Other'];
const RATING_LABELS = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent' };
const RATING_COLORS = { 1: '#ef4444', 2: '#f97316', 3: '#f59e0b', 4: '#4f8ef7', 5: '#10b981' };

export default function Feedback() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [myFeedbacks, setMyFeedbacks] = useState([]);
  const [form, setForm] = useState({ category: 'Academic', rating: 0, message: '', anonymous: false });
  const [step, setStep] = useState('form'); // form | loading | success
  const [toast, setToast] = useState('');

  const showToast = m => { setToast(m); setTimeout(() => setToast(''), 3000); };

  const load = async () => {
    if (!user.email) return;
    const d = await fetch(`http://localhost:8080/api/feedback/my/${encodeURIComponent(user.email)}`)
      .then(r => r.json()).catch(() => []);
    setMyFeedbacks(Array.isArray(d) ? d : []);
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
          authorName:  form.anonymous ? 'Anonymous' : (user.name || 'Student'),
          authorEmail: user.email || '',
          authorRole:  'Student',
          category:    form.category,
          rating:      String(form.rating),
          message:     form.message,
          anonymous:   form.anonymous,
        }),
      });
      if (res.ok) {
        setStep('success');
        await load();
        setTimeout(() => { setStep('form'); setForm({ category: 'Academic', rating: 0, message: '', anonymous: false }); }, 2500);
      } else { setStep('form'); showToast('Submission failed.'); }
    } catch { setStep('form'); showToast('Cannot connect to server.'); }
  };

  return (
    <div>
      <Topbar title="Feedback" subtitle="Share your experience and help us improve" />
      <div style={{ padding: '26px 30px', display: 'flex', flexDirection: 'column', gap: 22 }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

          {/* Submit form */}
          <div className="fade-up" style={S.card}>
            <div style={S.cardTitle}>📝 Post Feedback</div>

            {step === 'loading' && (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: 44, height: 44, border: '4px solid var(--border)', borderTop: '4px solid var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 14px' }} />
                <div style={{ color: 'var(--muted)', fontSize: 13 }}>Submitting…</div>
              </div>
            )}

            {step === 'success' && (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ fontSize: 52, marginBottom: 12 }}>🎉</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: '#10b981', marginBottom: 8 }}>Thank you!</div>
                <div style={{ fontSize: 13, color: 'var(--muted2)' }}>Your feedback has been submitted successfully.</div>
              </div>
            )}

            {step === 'form' && (<>
              {/* Category */}
              <div style={S.fw}>
                <label style={S.lbl}>Category</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {CATEGORIES.map(c => (
                    <div key={c} onClick={() => setForm(p => ({ ...p, category: c }))}
                      style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: `1px solid ${form.category === c ? 'var(--accent)' : 'var(--border)'}`, background: form.category === c ? 'rgba(79,142,247,.12)' : 'var(--surface2)', color: form.category === c ? 'var(--accent)' : 'var(--muted)' }}>
                      {c}
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div style={S.fw}>
                <label style={S.lbl}>Rating</label>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <div key={n} onClick={() => setForm(p => ({ ...p, rating: n }))}
                      style={{ width: 42, height: 42, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, cursor: 'pointer', border: `2px solid ${form.rating >= n ? RATING_COLORS[n] : 'var(--border)'}`, background: form.rating >= n ? RATING_COLORS[n] + '18' : 'var(--surface2)', transition: 'all .15s' }}>
                      ⭐
                    </div>
                  ))}
                  {form.rating > 0 && (
                    <span style={{ fontSize: 13, fontWeight: 700, color: RATING_COLORS[form.rating], marginLeft: 6 }}>
                      {RATING_LABELS[form.rating]}
                    </span>
                  )}
                </div>
              </div>

              {/* Message */}
              <div style={S.fw}>
                <label style={S.lbl}>Your Feedback</label>
                <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  placeholder="Share your thoughts, suggestions or concerns…"
                  style={{ ...S.inp, minHeight: 120, resize: 'vertical', lineHeight: 1.6 }} />
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4, textAlign: 'right' }}>{form.message.length} / 1000</div>
              </div>

              {/* Anonymous toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, padding: '12px 14px', background: 'var(--surface2)', borderRadius: 10, border: '1px solid var(--border)' }}>
                <div onClick={() => setForm(p => ({ ...p, anonymous: !p.anonymous }))}
                  style={{ width: 40, height: 22, borderRadius: 11, background: form.anonymous ? 'var(--accent)' : 'var(--border)', position: 'relative', cursor: 'pointer', transition: 'background .2s', flexShrink: 0 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: form.anonymous ? 20 : 2, transition: 'left .2s' }} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Submit Anonymously</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 1 }}>Your name won't be shown to faculty or admin</div>
                </div>
              </div>

              <button onClick={submit} style={S.btn}>Submit Feedback →</button>
            </>)}
          </div>

          {/* My past feedbacks */}
          <div className="fade-up1" style={S.card}>
            <div style={S.cardTitle}>📋 My Submissions ({myFeedbacks.length})</div>
            {myFeedbacks.length === 0 ? (
              <div style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center', padding: '32px 0' }}>No feedback submitted yet.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 520, overflowY: 'auto' }}>
                {[...myFeedbacks].reverse().map((f, i) => {
                  const r = parseInt(f.rating) || 0;
                  return (
                  <div key={i} style={{ padding: '14px 16px', background: 'var(--surface2)', borderRadius: 12, border: '1px solid var(--border)', borderLeft: `3px solid ${RATING_COLORS[r] || 'var(--accent)'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 9px', borderRadius: 20, background: 'rgba(79,142,247,.1)', color: 'var(--accent)' }}>{f.category}</span>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {[1,2,3,4,5].map(n => <span key={n} style={{ fontSize: 12, opacity: n <= r ? 1 : 0.25 }}>⭐</span>)}
                      </div>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--muted2)', lineHeight: 1.6, marginBottom: 6 }}>{f.message}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>{f.anonymous ? '🕵️ Anonymous' : f.authorName} · {f.date}</div>
                  </div>
                );})}
              </div>
            )}
          </div>
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: 28, right: 28, background: '#ef4444', color: '#fff', padding: '12px 20px', borderRadius: 10, fontSize: 13, fontWeight: 600, zIndex: 999 }}>{toast}</div>}
      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </div>
  );
}

const S = {
  card: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 },
  cardTitle: { fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 20 },
  fw: { marginBottom: 18 },
  lbl: { display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--muted2)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 8 },
  inp: { width: '100%', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)', fontFamily: "'DM Sans',sans-serif", fontSize: 13, padding: '10px 13px', outline: 'none' },
  btn: { width: '100%', padding: 12, borderRadius: 10, background: 'linear-gradient(135deg,var(--accent),#3b6fd4)', color: '#fff', border: 'none', fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, cursor: 'pointer' },
};
