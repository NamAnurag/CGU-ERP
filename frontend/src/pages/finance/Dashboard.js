import React, { useState, useEffect } from 'react';

const STATUS = {
  pending:  { c: '#f59e0b', bg: 'rgba(245,158,11,.12)' },
  approved: { c: '#10b981', bg: 'rgba(16,185,129,.12)' },
  rejected: { c: '#ef4444', bg: 'rgba(239,68,68,.12)' },
};

export default function FinanceDashboard() {
  const [txns, setTxns] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [rejectModal, setRejectModal] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [toast, setToast] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{"name":"Finance Team"}');

  const showToast = (m) => { setToast(m); setTimeout(() => setToast(''), 3000); };

  const load = () => {
    fetch('http://localhost:8080/api/payments')
      .then(r => r.json()).then(setTxns).catch(() => {});
  };

  useEffect(() => { load(); }, []);

  const filtered = txns.filter(t => filter === 'all' || t.status === filter);

  const approve = async (id) => {
    await fetch(`http://localhost:8080/api/payments/${id}/approve`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reviewedBy: user.name }),
    });
    showToast('✅ Payment approved & fee record updated');
    load();
  };

  const reject = async () => {
    if (!remarks.trim()) { alert('Please add rejection remarks.'); return; }
    await fetch(`http://localhost:8080/api/payments/${rejectModal}/reject`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ remarks, reviewedBy: user.name }),
    });
    setRejectModal(null); setRemarks('');
    showToast('❌ Payment rejected with remarks');
    load();
  };

  const pending = txns.filter(t => t.status === 'pending').length;
  const approved = txns.filter(t => t.status === 'approved').length;
  const totalApproved = txns.filter(t => t.status === 'approved').reduce((a, t) => a + t.amount, 0);

  return (
    <div style={{ padding: '26px 30px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        {[
          { l: 'Pending Review', v: pending, c: '#f59e0b' },
          { l: 'Approved', v: approved, c: '#10b981' },
          { l: 'Rejected', v: txns.filter(t => t.status === 'rejected').length, c: '#ef4444' },
          { l: 'Total Approved', v: '₹' + totalApproved.toLocaleString('en-IN'), c: '#10b981' },
        ].map(s => (
          <div key={s.l} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '16px 18px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, color: s.c }}>{s.v}</div>
            <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.4px', marginTop: 3 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8 }}>
        {['all', 'pending', 'approved', 'rejected'].map(f => (
          <div key={f} onClick={() => setFilter(f)} style={{ padding: '8px 16px', borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: 'pointer', border: '1px solid var(--border)', background: filter === f ? 'rgba(16,185,129,.12)' : 'var(--surface)', color: filter === f ? '#10b981' : 'var(--muted)', borderColor: filter === f ? 'rgba(16,185,129,.4)' : 'var(--border)' }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </div>
        ))}
      </div>

      {/* Transactions table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>No {filter} payments found.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface2)' }}>
                {['Transaction ID', 'Student', 'Roll', 'Amount', 'Method', 'Submitted', 'Status', 'Remarks', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '11px 14px', textAlign: 'left', fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.5px', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => {
                const ss = STATUS[t.status] || STATUS.pending;
                return (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(31,48,80,.4)' }}>
                    <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontSize: 11, color: 'var(--accent)' }}>{t.txnId}</td>
                    <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 600 }}>{t.studentName}</td>
                    <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontSize: 11, color: 'var(--muted2)' }}>{t.studentRoll}</td>
                    <td style={{ padding: '12px 14px', fontFamily: "'Syne',sans-serif", fontWeight: 700, color: '#10b981' }}>₹{t.amount?.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px 14px', fontSize: 12, color: 'var(--muted2)', textTransform: 'uppercase' }}>{t.paymentMethod}</td>
                    <td style={{ padding: '12px 14px', fontSize: 11, color: 'var(--muted)' }}>{t.submittedAt ? new Date(t.submittedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—'}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: ss.bg, color: ss.c }}>{t.status.charAt(0).toUpperCase() + t.status.slice(1)}</span>
                    </td>
                    <td style={{ padding: '12px 14px', fontSize: 11, color: '#ef4444', maxWidth: 160 }}>{t.remarks || '—'}</td>
                    <td style={{ padding: '12px 14px' }}>
                      {t.status === 'pending' && (
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button onClick={() => approve(t.id)} style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 7, background: 'rgba(16,185,129,.12)', color: '#10b981', border: '1px solid rgba(16,185,129,.25)', cursor: 'pointer' }}>✅ Approve</button>
                          <button onClick={() => { setRejectModal(t.id); setRemarks(''); }} style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 7, background: 'rgba(239,68,68,.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,.2)', cursor: 'pointer' }}>❌ Reject</button>
                        </div>
                      )}
                      {t.status !== 'pending' && <span style={{ fontSize: 11, color: 'var(--muted)' }}>by {t.reviewedBy || '—'}</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Reject modal */}
      {rejectModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)', backdropFilter: 'blur(7px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setRejectModal(null)}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, width: '100%', maxWidth: 460, padding: 28 }} onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 800, marginBottom: 16 }}>❌ Reject Payment</div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--muted2)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 8 }}>Rejection Remarks *</label>
            <textarea value={remarks} onChange={e => setRemarks(e.target.value)} placeholder="Explain why this payment is being rejected…"
              style={{ width: '100%', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)', fontFamily: "'DM Sans',sans-serif", fontSize: 13, padding: '10px 13px', outline: 'none', minHeight: 100, resize: 'vertical', lineHeight: 1.6 }} />
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button onClick={reject} style={{ flex: 1, padding: 12, borderRadius: 10, background: '#ef4444', color: '#fff', border: 'none', fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Confirm Reject</button>
              <button onClick={() => setRejectModal(null)} style={{ flex: 1, padding: 12, borderRadius: 10, background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--muted2)', fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div style={{ position: 'fixed', bottom: 28, right: 28, background: '#10b981', color: '#fff', padding: '12px 20px', borderRadius: 10, fontSize: 13, fontWeight: 600, boxShadow: '0 8px 28px rgba(0,0,0,.3)', zIndex: 999 }}>{toast}</div>}
    </div>
  );
}
