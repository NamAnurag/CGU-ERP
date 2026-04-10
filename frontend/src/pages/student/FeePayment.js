import React, { useState, useEffect } from 'react';
import Topbar from '../../components/student/Topbar';

const STATUS_STYLE = {
  pending:  { c: '#f59e0b', bg: 'rgba(245,158,11,.12)', label: '⏳ Pending Verification' },
  approved: { c: '#10b981', bg: 'rgba(16,185,129,.12)', label: '✅ Approved' },
  rejected: { c: '#ef4444', bg: 'rgba(239,68,68,.12)', label: '❌ Rejected' },
};

export default function FeePayment() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [feeRecord, setFeeRecord] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [payModal, setPayModal] = useState(false);
  const [payStep, setPayStep] = useState('form');
  const [payMethod, setPayMethod] = useState('upi');
  const [submittedTxn, setSubmittedTxn] = useState(null);

  const loadData = () => {
    if (user.roll) {
      fetch(`http://localhost:8080/api/fees/student/${user.roll}`)
        .then(r => r.json()).then(d => { if (d.length) setFeeRecord(d[0]); }).catch(() => {});
      fetch(`http://localhost:8080/api/payments/student/${user.roll}`)
        .then(r => r.json()).then(setTransactions).catch(() => {});
    }
  };

  useEffect(() => { loadData(); }, []);

  const handlePay = async () => {
    if (!feeRecord) return;
    setPayStep('loading');
    try {
      const res = await fetch('http://localhost:8080/api/payments', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentRoll: user.roll,
          studentName: user.name,
          studentEmail: user.email,
          amount: feeRecord.due,
          paymentMethod: payMethod,
        }),
      });
      if (res.ok) {
        const txn = await res.json();
        setSubmittedTxn(txn);
        setPayStep('success');
        loadData();
      } else { setPayStep('form'); alert('Submission failed.'); }
    } catch { setPayStep('form'); alert('Cannot connect to server.'); }
  };

  const due = feeRecord?.due ?? 0;
  const paid = feeRecord?.paid ?? 0;
  const total = feeRecord?.total ?? 0;
  const pct = total > 0 ? Math.round(paid / total * 100) : 0;

  return (
    <div>
      <Topbar title="Fee Payment" subtitle="Fee records · Payment history · Receipts" />
      <div style={S.content}>

        {/* Hero */}
        <div className="fade-up" style={S.hero}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 8 }}>Total Fee Due</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 52, fontWeight: 800, color: due > 0 ? '#ef4444' : '#10b981', lineHeight: 1 }}>
              ₹{due.toLocaleString('en-IN')}
            </div>
            {due > 0 && <div style={{ fontSize: 13, color: 'var(--muted2)', marginTop: 8 }}>Deadline: <span style={{ color: '#f97316', fontWeight: 600 }}>April 30, 2026</span></div>}
            {due > 0 && (
              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                <button onClick={() => { setPayModal(true); setPayStep('form'); }} style={S.payBtn}>Pay Now →</button>
              </div>
            )}
            {due === 0 && <div style={{ marginTop: 12, fontSize: 14, color: '#10b981', fontWeight: 600 }}>🎉 All fees paid!</div>}
          </div>
          <div style={{ minWidth: 200 }}>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10 }}>Payment Progress</div>
            <div style={{ height: 8, background: 'var(--surface2)', borderRadius: 10, overflow: 'hidden', marginBottom: 8 }}>
              <div style={{ height: '100%', width: pct + '%', background: 'linear-gradient(90deg,var(--accent),var(--accent2))', borderRadius: 10, transition: 'width 1s' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <span style={{ color: '#10b981' }}>Paid: ₹{paid.toLocaleString('en-IN')}</span>
              <span style={{ color: '#ef4444' }}>Due: ₹{due.toLocaleString('en-IN')}</span>
            </div>
            {feeRecord?.scholarship > 0 && (
              <div style={{ background: 'rgba(16,185,129,.08)', border: '1px solid rgba(16,185,129,.2)', borderRadius: 10, padding: '10px 14px', marginTop: 12 }}>
                <div style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>🏆 Scholarship Applied</div>
                <div style={{ fontSize: 12, color: 'var(--muted2)', marginTop: 3 }}>₹{feeRecord.scholarship.toLocaleString('en-IN')} deducted</div>
              </div>
            )}
          </div>
        </div>

        {/* Transactions */}
        <div className="fade-up1">
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Payment History</div>
          {transactions.length === 0 ? (
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>No transactions yet.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {transactions.map((t, i) => {
                const ss = STATUS_STYLE[t.status] || STATUS_STYLE.pending;
                return (
                  <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '16px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: '#10b981' }}>₹{t.amount?.toLocaleString('en-IN')}</div>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 20, background: ss.bg, color: ss.c }}>{ss.label}</span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Fee Payment — {t.paymentMethod?.toUpperCase()}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <span>{t.submittedAt ? new Date(t.submittedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : ''}</span>
                      <span style={{ fontFamily: 'monospace', color: 'var(--accent)' }}>{t.txnId}</span>
                    </div>
                    {t.status === 'pending' && (
                      <div style={{ marginTop: 10, padding: '10px 14px', background: 'rgba(245,158,11,.08)', border: '1px solid rgba(245,158,11,.2)', borderRadius: 8, fontSize: 12, color: '#f59e0b' }}>
                        ⏳ Your payment is under review. The finance team will verify and update your fee record shortly.
                      </div>
                    )}
                    {t.status === 'rejected' && t.remarks && (
                      <div style={{ marginTop: 10, padding: '10px 14px', background: 'rgba(239,68,68,.08)', border: '1px solid rgba(239,68,68,.2)', borderRadius: 8, fontSize: 12, color: '#ef4444' }}>
                        ❌ Rejected: {t.remarks}
                      </div>
                    )}
                    {t.status === 'approved' && (
                      <div style={{ marginTop: 10, padding: '10px 14px', background: 'rgba(16,185,129,.08)', border: '1px solid rgba(16,185,129,.2)', borderRadius: 8, fontSize: 12, color: '#10b981' }}>
                        ✅ Payment verified and fee record updated by {t.reviewedBy || 'Finance Team'}.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {payModal && (
        <div style={S.overlay} onClick={() => { if (payStep !== 'loading') { setPayModal(false); setPayStep('form'); } }}>
          <div style={S.modal} onClick={e => e.stopPropagation()}>
            <div style={S.modalHead}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 800 }}>
                {payStep === 'success' ? 'Payment Submitted 🎉' : 'Make Payment'}
              </div>
              {payStep !== 'loading' && <div onClick={() => { setPayModal(false); setPayStep('form'); }} style={{ cursor: 'pointer', color: 'var(--muted)', fontSize: 20 }}>✕</div>}
            </div>
            <div style={{ padding: 24 }}>
              {payStep === 'form' && (
                <>
                  <div style={{ background: 'rgba(79,142,247,.08)', border: '1px solid rgba(79,142,247,.2)', borderRadius: 10, padding: '14px 16px', marginBottom: 20 }}>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>Amount to Pay</div>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: 'var(--accent)', marginTop: 4 }}>₹{due.toLocaleString('en-IN')}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                    {['upi', 'card', 'netbanking'].map(m => (
                      <div key={m} onClick={() => setPayMethod(m)} style={{ flex: 1, padding: '10px', borderRadius: 10, border: `2px solid ${payMethod === m ? 'var(--accent)' : 'var(--border)'}`, background: payMethod === m ? 'rgba(79,142,247,.08)' : 'var(--surface2)', cursor: 'pointer', textAlign: 'center', fontSize: 12, fontWeight: 600, color: payMethod === m ? 'var(--accent)' : 'var(--muted)' }}>
                        {m === 'upi' ? '📱 UPI' : m === 'card' ? '💳 Card' : '🏦 Net Banking'}
                      </div>
                    ))}
                  </div>
                  {payMethod === 'upi' && <div style={S.inputWrap}><label style={S.label}>UPI ID</label><input placeholder="name@upi" style={S.input} /></div>}
                  {payMethod === 'card' && <><div style={S.inputWrap}><label style={S.label}>Card Number</label><input placeholder="•••• •••• •••• ••••" style={S.input} /></div><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}><div style={S.inputWrap}><label style={S.label}>Expiry</label><input placeholder="MM/YY" style={S.input} /></div><div style={S.inputWrap}><label style={S.label}>CVV</label><input placeholder="•••" style={S.input} /></div></div></>}
                  {payMethod === 'netbanking' && <div style={S.inputWrap}><label style={S.label}>Select Bank</label><select style={S.input}><option>SBI</option><option>HDFC</option><option>ICICI</option><option>Axis</option></select></div>}
                  <div style={{ background: 'rgba(245,158,11,.08)', border: '1px solid rgba(245,158,11,.2)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 12, color: '#f59e0b' }}>
                    ⏳ After submission, the finance team will verify your payment and update your records.
                  </div>
                  <button onClick={handlePay} style={S.submitBtn}>Submit Payment ₹{due.toLocaleString('en-IN')} →</button>
                </>
              )}
              {payStep === 'loading' && (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ width: 48, height: 48, border: '4px solid var(--border)', borderTop: '4px solid var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
                  <div style={{ fontSize: 14, color: 'var(--muted2)' }}>Submitting payment…</div>
                </div>
              )}
              {payStep === 'success' && (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ fontSize: 56, marginBottom: 12 }}>⏳</div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: '#f59e0b', marginBottom: 8 }}>Payment Submitted!</div>
                  <div style={{ fontSize: 13, color: 'var(--muted2)', marginBottom: 16 }}>Your payment of ₹{due.toLocaleString('en-IN')} has been submitted for verification.</div>
                  <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 16px', display: 'inline-block', marginBottom: 16 }}>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>Transaction ID</div>
                    <div style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginTop: 3 }}>{submittedTxn?.txnId}</div>
                  </div>
                  <div style={{ background: 'rgba(245,158,11,.08)', border: '1px solid rgba(245,158,11,.2)', borderRadius: 8, padding: '12px 16px', fontSize: 13, color: '#f59e0b', marginBottom: 20, textAlign: 'left' }}>
                    The college finance team will verify your payment and update your fee records. You'll see the status update in your Payment History.
                  </div>
                  <button onClick={() => { setPayModal(false); setPayStep('form'); }} style={{ ...S.submitBtn, background: 'linear-gradient(135deg,#10b981,#059669)' }}>Close</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </div>
  );
}

const S = {
  content: { padding: '26px 30px', display: 'flex', flexDirection: 'column', gap: 22 },
  hero: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px 28px', display: 'flex', gap: 32, alignItems: 'flex-start' },
  payBtn: { padding: '11px 22px', borderRadius: 10, background: 'linear-gradient(135deg,var(--accent),#3b6fd4)', color: '#fff', border: 'none', fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, cursor: 'pointer' },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)', backdropFilter: 'blur(7px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 },
  modal: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, width: '100%', maxWidth: 480, maxHeight: '90vh', overflowY: 'auto', animation: 'modalIn .3s cubic-bezier(.34,1.56,.64,1)' },
  modalHead: { padding: '20px 24px 18px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  inputWrap: { marginBottom: 14 },
  label: { display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--muted2)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 6 },
  input: { width: '100%', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)', fontFamily: "'DM Sans',sans-serif", fontSize: 13, padding: '10px 13px', outline: 'none' },
  submitBtn: { width: '100%', padding: 13, borderRadius: 10, background: 'linear-gradient(135deg,var(--accent),#3b6fd4)', color: '#fff', border: 'none', fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700, cursor: 'pointer', marginTop: 4 },
};
