import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ adminId:'', email:'', password:'' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!form.adminId || !form.email || !form.password) { setError('Please fill all fields.'); return; }
    setError(''); setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password, adminId: form.adminId }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.role !== 'Admin') {
          setError('Access denied. This portal is for administrators only.');
          setLoading(false);
          return;
        }
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch {
      setError('Cannot connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={S.page}>
      <div style={S.left}>
        <div onClick={() => navigate('/')} style={{ cursor:'pointer', marginBottom:32 }}>
          <div style={S.logo}>Edu<span style={{color:'var(--a-accent)'}}>Core</span></div>
          <div style={{fontSize:12,color:'var(--muted)',marginTop:4}}>← Back to Home</div>
        </div>
        <div style={S.shield}>🛡️</div>
        <div style={S.tagline}>Admin Panel</div>
        <p style={{fontSize:15,color:'var(--muted2)',lineHeight:1.7,marginBottom:28}}>Full control over the entire EduCore platform — users, access, data, settings and more.</p>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {['👥 Manage all students & faculty','🔐 Grant & revoke access instantly','📊 Platform-wide analytics','💳 Fee & scholarship management','📋 Edit / delete any record','⚙️ Full system configuration'].map(f=>(
            <div key={f} style={{display:'flex',alignItems:'center',gap:10,fontSize:14,color:'var(--muted2)'}}>{f}</div>
          ))}
        </div>
        <div style={{marginTop:28,padding:'14px 16px',background:'rgba(244,63,94,.08)',border:'1px solid rgba(244,63,94,.2)',borderRadius:'var(--radius-sm)'}}>
          <div style={{fontSize:12,color:'var(--a-accent)',fontWeight:600,marginBottom:4}}>⚠️ Restricted Access</div>
          <div style={{fontSize:12,color:'var(--muted2)',lineHeight:1.6}}>This panel is for authorized administrators only. All actions are logged and audited.</div>
        </div>
      </div>
      <div style={S.right}>
        <div style={S.card}>
          <div style={S.badge}>🛡️ Administrator Access</div>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:800,marginBottom:6}}>Admin Sign In</div>
          <div style={{fontSize:13,color:'var(--muted2)',marginBottom:28}}>Use your administrator credentials to continue</div>
          {error && <div style={{background:'rgba(244,63,94,.1)',border:'1px solid rgba(244,63,94,.25)',color:'var(--a-accent)',padding:'10px 14px',borderRadius:'var(--radius-sm)',fontSize:13,marginBottom:16}}>{error}</div>}
          {[{l:'Admin ID',p:'ADMIN-2024-001',k:'adminId'},{l:'Admin Email',p:'admin@college.edu.in',k:'email',t:'email'},{l:'Password',p:'Enter admin password',k:'password',t:'password'}].map(f=>(
            <div key={f.k} style={{marginBottom:16}}>
              <label style={{display:'block',fontSize:11,fontWeight:600,color:'var(--muted2)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:7}}>{f.l}</label>
              <input type={f.t||'text'} placeholder={f.p} value={form[f.k]} onChange={e=>setForm({...form,[f.k]:e.target.value})}
                style={{width:'100%',background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'10px 13px',outline:'none'}}/>
            </div>
          ))}
          <button onClick={handleSubmit} disabled={loading}
            style={{width:'100%',padding:13,borderRadius:'var(--radius-sm)',background:'linear-gradient(135deg,var(--a-accent),#e11d48)',color:'#fff',border:'none',fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,cursor:'pointer',boxShadow:'0 4px 18px rgba(244,63,94,.4)',opacity:loading?.7:1,marginTop:4}}>
            {loading ? 'Verifying credentials…' : '🛡️ Sign In to Admin Panel →'}
          </button>
          <div style={{textAlign:'center',marginTop:16,fontSize:12,color:'var(--muted)'}}>
            Not an admin? <span onClick={()=>navigate('/student/login')} style={{color:'var(--accent)',cursor:'pointer',fontWeight:600}}>Student Login</span> · <span onClick={()=>navigate('/teacher/login')} style={{color:'var(--t-accent)',cursor:'pointer',fontWeight:600}}>Faculty Login</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const S = {
  page:{display:'flex',minHeight:'100vh',background:'var(--bg)'},
  left:{flex:1,background:'linear-gradient(135deg,#0a0d1a 0%,#110a14 50%,#0b0a18 100%)',display:'flex',alignItems:'center',justifyContent:'center',padding:48,flexDirection:'column',alignItems:'flex-start'},
  logo:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:28},
  shield:{fontSize:56,marginBottom:12},
  tagline:{fontFamily:"'Syne',sans-serif",fontSize:32,fontWeight:800,marginBottom:16,color:'var(--text)'},
  right:{width:500,background:'var(--surface)',display:'flex',alignItems:'center',justifyContent:'center',padding:40},
  card:{width:'100%',maxWidth:420},
  badge:{display:'inline-block',background:'rgba(244,63,94,.1)',border:'1px solid rgba(244,63,94,.3)',color:'var(--a-accent)',fontSize:12,fontWeight:600,padding:'6px 14px',borderRadius:20,marginBottom:20},
};
