import React, { useState } from 'react';
import Topbar from '../../components/admin/Topbar';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    collegeName:'ABC Engineering College', city:'Bhubaneswar', state:'Odisha',
    phone:'+91 98765 43210', email:'admin@college.edu.in', website:'www.college.edu.in',
    currentSem:'6', academicYear:'2025-26', maxCredits:'30',
    allowStudentReg:true, allowFacultyReg:false, maintenanceMode:false,
    emailNotif:true, smsNotif:true, pushNotif:false,
    sessionTimeout:'30', maxLoginAttempts:'5', twoFactor:false,
  });
  const [toast, setToast] = useState('');
  const [activeSection, setActiveSection] = useState('general');

  const showToast = (m) => { setToast(m); setTimeout(() => setToast(''), 3000); };
  const save = () => showToast('✓ Settings saved successfully!');

  const Toggle = ({ k }) => (
    <div onClick={() => setSettings(p => ({...p,[k]:!p[k]}))}
      style={{width:44,height:24,borderRadius:12,background:settings[k]?'var(--a-accent)':'var(--surface2)',border:'1px solid var(--border)',cursor:'pointer',position:'relative',transition:'background .2s',flexShrink:0}}>
      <div style={{width:18,height:18,borderRadius:'50%',background:'#fff',position:'absolute',top:2,left:settings[k]?22:2,transition:'left .2s',boxShadow:'0 2px 6px rgba(0,0,0,.3)'}}/>
    </div>
  );

  const SECTIONS = [
    {k:'general',l:'General',icon:'🏫'},
    {k:'academic',l:'Academic',icon:'📚'},
    {k:'registration',l:'Registration',icon:'👤'},
    {k:'notifications',l:'Notifications',icon:'🔔'},
    {k:'security',l:'Security',icon:'🔐'},
  ];

  return (
    <div>
      <Topbar title="System Settings" subtitle="Configure the EduCore platform"/>
      <div style={{padding:'26px 30px',display:'flex',gap:24}}>
        {/* Sidebar */}
        <div style={{width:200,flexShrink:0}}>
          <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',overflow:'hidden'}}>
            {SECTIONS.map(s=>(
              <div key={s.k} onClick={()=>setActiveSection(s.k)}
                style={{display:'flex',alignItems:'center',gap:10,padding:'13px 16px',cursor:'pointer',borderBottom:'1px solid var(--border)',background:activeSection===s.k?'rgba(244,63,94,.1)':'transparent',color:activeSection===s.k?'var(--a-accent)':'var(--muted2)',fontSize:13,fontWeight:activeSection===s.k?600:400}}>
                <span>{s.icon}</span><span>{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{flex:1,display:'flex',flexDirection:'column',gap:16}}>
          {activeSection === 'general' && (
            <div className="fade-up" style={S.section}>
              <div style={S.sectionTitle}>🏫 General Information</div>
              <div style={S.grid2}>
                {[{l:'College Name',k:'collegeName'},{l:'City',k:'city'},{l:'State',k:'state'},{l:'Phone',k:'phone'},{l:'Email',k:'email',t:'email'},{l:'Website',k:'website'}].map(f=>(
                  <div key={f.k}><label style={S.lbl}>{f.l}</label><input type={f.t||'text'} value={settings[f.k]} onChange={e=>setSettings(p=>({...p,[f.k]:e.target.value}))} style={S.inp}/></div>
                ))}
              </div>
            </div>
          )}
          {activeSection === 'academic' && (
            <div className="fade-up" style={S.section}>
              <div style={S.sectionTitle}>📚 Academic Configuration</div>
              <div style={S.grid2}>
                {[{l:'Current Semester',k:'currentSem'},{l:'Academic Year',k:'academicYear'},{l:'Max Credits per Semester',k:'maxCredits'}].map(f=>(
                  <div key={f.k}><label style={S.lbl}>{f.l}</label><input value={settings[f.k]} onChange={e=>setSettings(p=>({...p,[f.k]:e.target.value}))} style={S.inp}/></div>
                ))}
              </div>
            </div>
          )}
          {activeSection === 'registration' && (
            <div className="fade-up" style={S.section}>
              <div style={S.sectionTitle}>👤 Registration Settings</div>
              {[{l:'Allow Student Self-Registration',sub:'Students can register their own accounts',k:'allowStudentReg'},{l:'Allow Faculty Self-Registration',sub:'Faculty can register without admin approval',k:'allowFacultyReg'},{l:'Maintenance Mode',sub:'Disable all logins except admin',k:'maintenanceMode'}].map(s=>(
                <div key={s.k} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 18px',background:'var(--surface2)',borderRadius:'var(--radius-sm)',border:'1px solid var(--border)',marginBottom:10}}>
                  <div><div style={{fontSize:13,fontWeight:600}}>{s.l}</div><div style={{fontSize:12,color:'var(--muted)',marginTop:3}}>{s.sub}</div></div>
                  <Toggle k={s.k}/>
                </div>
              ))}
            </div>
          )}
          {activeSection === 'notifications' && (
            <div className="fade-up" style={S.section}>
              <div style={S.sectionTitle}>🔔 Notification Settings</div>
              {[{l:'Email Notifications',sub:'Send notifications via email',k:'emailNotif'},{l:'SMS Notifications',sub:'Send notifications via SMS',k:'smsNotif'},{l:'Push Notifications',sub:'Browser/app push notifications',k:'pushNotif'}].map(s=>(
                <div key={s.k} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 18px',background:'var(--surface2)',borderRadius:'var(--radius-sm)',border:'1px solid var(--border)',marginBottom:10}}>
                  <div><div style={{fontSize:13,fontWeight:600}}>{s.l}</div><div style={{fontSize:12,color:'var(--muted)',marginTop:3}}>{s.sub}</div></div>
                  <Toggle k={s.k}/>
                </div>
              ))}
            </div>
          )}
          {activeSection === 'security' && (
            <div className="fade-up" style={S.section}>
              <div style={S.sectionTitle}>🔐 Security Settings</div>
              <div style={S.grid2}>
                {[{l:'Session Timeout (minutes)',k:'sessionTimeout'},{l:'Max Login Attempts',k:'maxLoginAttempts'}].map(f=>(
                  <div key={f.k}><label style={S.lbl}>{f.l}</label><input value={settings[f.k]} onChange={e=>setSettings(p=>({...p,[f.k]:e.target.value}))} style={S.inp}/></div>
                ))}
              </div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 18px',background:'var(--surface2)',borderRadius:'var(--radius-sm)',border:'1px solid var(--border)',marginTop:4}}>
                <div><div style={{fontSize:13,fontWeight:600}}>Two-Factor Authentication</div><div style={{fontSize:12,color:'var(--muted)',marginTop:3}}>Require 2FA for admin logins</div></div>
                <Toggle k="twoFactor"/>
              </div>
              <div style={{marginTop:16,padding:'14px 16px',background:'rgba(244,63,94,.06)',border:'1px solid rgba(244,63,94,.2)',borderRadius:'var(--radius-sm)'}}>
                <div style={{fontSize:13,fontWeight:600,color:'var(--a-accent)',marginBottom:8}}>🗑️ Danger Zone</div>
                <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
                  <button style={{padding:'9px 16px',borderRadius:'var(--radius-sm)',background:'rgba(239,68,68,.1)',border:'1px solid rgba(239,68,68,.3)',color:'#ef4444',fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,cursor:'pointer'}} onClick={()=>alert('This would clear all session data in production.')}>Clear All Sessions</button>
                  <button style={{padding:'9px 16px',borderRadius:'var(--radius-sm)',background:'rgba(239,68,68,.1)',border:'1px solid rgba(239,68,68,.3)',color:'#ef4444',fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,cursor:'pointer'}} onClick={()=>alert('Database backup initiated.')}>Backup Database</button>
                </div>
              </div>
            </div>
          )}

          <button onClick={save} style={{alignSelf:'flex-start',padding:'12px 28px',borderRadius:'var(--radius-sm)',background:'linear-gradient(135deg,var(--a-accent),#e11d48)',color:'#fff',border:'none',fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,cursor:'pointer',boxShadow:'0 4px 16px rgba(244,63,94,.35)'}}>
            Save Settings
          </button>
        </div>
      </div>
      {toast&&<div style={{position:'fixed',bottom:28,right:28,background:'#10b981',color:'#fff',padding:'12px 20px',borderRadius:'var(--radius-sm)',fontSize:13,fontWeight:600,boxShadow:'0 8px 28px rgba(0,0,0,.3)',zIndex:999}}>{toast}</div>}
    </div>
  );
}

const S = {
  section:{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:24},
  sectionTitle:{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,marginBottom:20},
  grid2:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14},
  lbl:{display:'block',fontSize:11,fontWeight:600,color:'var(--muted2)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:6},
  inp:{width:'100%',background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'10px 13px',outline:'none'},
};
