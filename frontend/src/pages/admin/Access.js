import React, { useState } from 'react';
import Topbar from '../../components/admin/Topbar';

const INIT_REQUESTS = [
  {id:1,name:'Sneha Das',      role:'Student', email:'22cs0105@college.edu.in',dept:'CSE',reason:'Need access to ML lab resources for project',requested:'Mar 25, 2026',status:'pending'},
  {id:2,name:'Prof. V. Singh', role:'Faculty', email:'v.singh@college.edu.in',  dept:'ECE',reason:'Need admin access to upload bulk marks for ECE dept',requested:'Mar 24, 2026',status:'pending'},
  {id:3,name:'Kiran Rao',      role:'Student', email:'22cs0108@college.edu.in',dept:'CSE',reason:'Access to previous semester question papers',requested:'Mar 23, 2026',status:'pending'},
  {id:4,name:'Anjali Nair',    role:'Faculty', email:'a.nair@college.edu.in',  dept:'CSE',reason:'Portal access for new faculty onboarding',requested:'Mar 22, 2026',status:'approved'},
  {id:5,name:'Rohit Kumar',    role:'Student', email:'22me0031@college.edu.in',dept:'ME', reason:'Account activation after re-admission',requested:'Mar 20, 2026',status:'rejected'},
];

const PERMISSIONS = [
  {module:'Student Portal',   roles:['Student','Faculty','Admin'],    desc:'Access to student dashboard, results, attendance'},
  {module:'Faculty Portal',   roles:['Faculty','Admin'],              desc:'Manage attendance, marks, assignments'},
  {module:'Admin Panel',      roles:['Admin'],                        desc:'Full system control'},
  {module:'Bulk Upload',      roles:['Faculty','Admin'],              desc:'Import student/marks data via CSV'},
  {module:'Fee Management',   roles:['Admin'],                        desc:'Modify fee records and scholarships'},
  {module:'Report Generation',roles:['Faculty','Admin'],              desc:'Download analytics and reports'},
  {module:'System Settings',  roles:['Admin'],                        desc:'Platform configuration'},
  {module:'Grievance Admin',  roles:['Faculty','Admin'],              desc:'View and resolve student grievances'},
];

export default function AdminAccess() {
  const [requests, setRequests] = useState(INIT_REQUESTS);
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState('requests');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const handleRequest = (id, action) => {
    setRequests(p => p.map(r => r.id === id ? {...r, status: action} : r));
    showToast(action === 'approved' ? '✅ Access granted!' : '❌ Request rejected');
  };

  const pending = requests.filter(r => r.status === 'pending');
  const resolved = requests.filter(r => r.status !== 'pending');

  return (
    <div>
      <Topbar title="Access Control" subtitle="Grant, revoke and manage user access"/>
      <div style={S.content}>

        {/* Stats */}
        <div className="fade-up" style={{display:'flex',gap:14,flexWrap:'wrap'}}>
          {[{l:'Pending Requests',v:pending.length,c:'#f59e0b'},{l:'Approved Today',v:resolved.filter(r=>r.status==='approved').length,c:'#10b981'},{l:'Rejected',v:resolved.filter(r=>r.status==='rejected').length,c:'#ef4444'},{l:'Total Requests',v:requests.length,c:'var(--a-accent)'}].map(s=>(
            <div key={s.l} style={S.sumCard}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:26,fontWeight:800,color:s.c}}>{s.v}</div>
              <div style={{fontSize:10,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.4px',marginTop:3}}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="fade-up1" style={{display:'flex',gap:10}}>
          {[{k:'requests',l:'Access Requests'},{k:'permissions',l:'Permission Matrix'}].map(t=>(
            <div key={t.k} onClick={()=>setActiveTab(t.k)} style={{padding:'9px 18px',borderRadius:'var(--radius-sm)',border:'1px solid var(--border)',background:activeTab===t.k?'rgba(244,63,94,.1)':'var(--surface)',color:activeTab===t.k?'var(--a-accent)':'var(--muted)',fontSize:13,fontWeight:500,cursor:'pointer',borderColor:activeTab===t.k?'rgba(244,63,94,.4)':'var(--border)'}}>
              {t.l} {t.k==='requests'&&pending.length>0&&<span style={{fontSize:10,fontWeight:700,padding:'1px 6px',borderRadius:20,background:'var(--a-accent)',color:'#fff',marginLeft:6}}>{pending.length}</span>}
            </div>
          ))}
        </div>

        {activeTab === 'requests' ? (
          <div className="fade-up2" style={{display:'flex',flexDirection:'column',gap:10}}>
            {/* Pending */}
            {pending.length > 0 && <>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:'#f59e0b',marginBottom:4}}>⏳ Pending Requests ({pending.length})</div>
              {pending.map(r=>(
                <div key={r.id} style={{background:'var(--surface)',border:'1px solid rgba(245,158,11,.3)',borderRadius:'var(--radius)',padding:'18px 20px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:16}}>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',gap:8,marginBottom:8,flexWrap:'wrap'}}>
                        <span style={{fontSize:12,fontWeight:700,padding:'3px 10px',borderRadius:20,background:'rgba(245,158,11,.12)',color:'#f59e0b'}}>Pending</span>
                        <span style={{fontSize:12,fontWeight:600,padding:'3px 10px',borderRadius:20,background:r.role==='Student'?'rgba(79,142,247,.1)':'rgba(99,102,241,.1)',color:r.role==='Student'?'var(--accent)':'var(--t-accent)'}}>{r.role}</span>
                        <span style={{fontSize:12,fontWeight:600,padding:'3px 10px',borderRadius:20,background:'rgba(34,211,238,.1)',color:'var(--accent2)'}}>{r.dept}</span>
                      </div>
                      <div style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,marginBottom:3}}>{r.name}</div>
                      <div style={{fontSize:12,color:'var(--muted)',marginBottom:8}}>{r.email} · Requested {r.requested}</div>
                      <div style={{fontSize:13,color:'var(--muted2)',background:'var(--surface2)',padding:'10px 13px',borderRadius:'var(--radius-sm)',border:'1px solid var(--border)'}}>
                        📋 <em>"{r.reason}"</em>
                      </div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:8,flexShrink:0}}>
                      <button onClick={()=>handleRequest(r.id,'approved')} style={{padding:'9px 18px',borderRadius:'var(--radius-sm)',background:'rgba(16,185,129,.15)',border:'1px solid rgba(16,185,129,.3)',color:'#10b981',fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,cursor:'pointer'}}>✅ Grant Access</button>
                      <button onClick={()=>handleRequest(r.id,'rejected')} style={{padding:'9px 18px',borderRadius:'var(--radius-sm)',background:'rgba(239,68,68,.1)',border:'1px solid rgba(239,68,68,.25)',color:'#ef4444',fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,cursor:'pointer'}}>❌ Reject</button>
                    </div>
                  </div>
                </div>
              ))}
            </>}

            {/* Resolved */}
            {resolved.length > 0 && <>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:'var(--muted2)',margin:'8px 0 4px'}}>📋 Resolved Requests</div>
              {resolved.map(r=>(
                <div key={r.id} style={{display:'flex',alignItems:'center',gap:14,padding:'13px 18px',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',borderLeft:`3px solid ${r.status==='approved'?'#10b981':'#ef4444'}`}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600}}>{r.name} <span style={{fontSize:11,color:'var(--muted)'}}>({r.role} · {r.dept})</span></div>
                    <div style={{fontSize:12,color:'var(--muted)',marginTop:2}}>{r.reason.slice(0,60)}…</div>
                  </div>
                  <span style={{fontSize:11,fontWeight:600,padding:'3px 10px',borderRadius:20,background:r.status==='approved'?'rgba(16,185,129,.12)':'rgba(239,68,68,.12)',color:r.status==='approved'?'#10b981':'#ef4444'}}>{r.status.charAt(0).toUpperCase()+r.status.slice(1)}</span>
                  {r.status==='rejected' && <button onClick={()=>handleRequest(r.id,'approved')} style={{fontSize:11,padding:'3px 10px',borderRadius:7,background:'rgba(16,185,129,.1)',color:'#10b981',border:'1px solid rgba(16,185,129,.2)',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>Re-approve</button>}
                </div>
              ))}
            </>}
          </div>
        ) : (
          <div className="fade-up2" style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',overflow:'hidden'}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead><tr style={{background:'var(--surface2)'}}>
                {['Module','Allowed Roles','Description'].map(h=><th key={h} style={{padding:'12px 18px',textAlign:'left',fontSize:11,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.5px',fontWeight:600,borderBottom:'1px solid var(--border)'}}>{h}</th>)}
              </tr></thead>
              <tbody>
                {PERMISSIONS.map((p,i)=>(
                  <tr key={i} style={{borderBottom:'1px solid rgba(31,48,80,.4)'}}>
                    <td style={{padding:'14px 18px',fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700}}>{p.module}</td>
                    <td style={{padding:'14px 18px'}}>
                      <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>
                        {p.roles.map(r=>(
                          <span key={r} style={{fontSize:11,fontWeight:600,padding:'3px 10px',borderRadius:20,background:r==='Student'?'rgba(79,142,247,.12)':r==='Faculty'?'rgba(99,102,241,.12)':'rgba(244,63,94,.12)',color:r==='Student'?'var(--accent)':r==='Faculty'?'var(--t-accent)':'var(--a-accent)'}}>{r}</span>
                        ))}
                      </div>
                    </td>
                    <td style={{padding:'14px 18px',fontSize:13,color:'var(--muted2)'}}>{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {toast && <div style={{position:'fixed',bottom:28,right:28,background:'#10b981',color:'#fff',padding:'12px 20px',borderRadius:'var(--radius-sm)',fontSize:13,fontWeight:600,boxShadow:'0 8px 28px rgba(0,0,0,.3)',zIndex:999}}>{toast}</div>}
    </div>
  );
}

const S = {
  content:{padding:'26px 30px',display:'flex',flexDirection:'column',gap:18},
  sumCard:{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'14px 20px',textAlign:'center'},
};
