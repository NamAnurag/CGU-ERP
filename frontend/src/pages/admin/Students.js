import React, { useState } from 'react';
import Topbar from '../../components/admin/Topbar';

const DEPTS = ['CSE','ECE','ME','CE','EEE','IT'];
const COLORS = ['#4f8ef7','#22d3ee','#10b981','#f59e0b','#ec4899','#f97316'];
const NAMES = ['Ashish Kumar','Riya Sharma','Arjun Mehta','Priya Patel','Rohit Kumar','Sneha Das','Vikram Singh','Anjali Nair','Kiran Rao','Deepak Jha','Pooja Mishra','Aditya Verma','Neha Gupta','Saurabh Yadav','Kavya Reddy'];

const INIT = Array.from({length:15},(_,i)=>({
  id:i+1, name:NAMES[i], roll:`22CS0${String(i+101).padStart(3,'0')}`,
  email:`${NAMES[i].toLowerCase().replace(' ','.')}@college.edu.in`,
  dept:DEPTS[i%DEPTS.length], sem:((i%6)+1), cgpa:(7.5+Math.random()*2.5).toFixed(1),
  att:Math.floor(60+Math.random()*35), color:COLORS[i%COLORS.length], status:'active',
}));

export default function AdminStudents() {
  const [students, setStudents] = useState(INIT);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [editS, setEditS] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (m) => { setToast(m); setTimeout(()=>setToast(''),3000); };
  const filtered = students.filter(s => {
    const qm = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.toLowerCase().includes(search.toLowerCase());
    const dm = deptFilter==='all'||s.dept===deptFilter;
    return qm && dm;
  });

  const deleteStudent = (id) => { setStudents(p=>p.filter(s=>s.id!==id)); showToast('🗑️ Student deleted'); };
  const saveEdit = () => { setStudents(p=>p.map(s=>s.id===editS.id?editS:s)); setEditS(null); showToast('✓ Student updated'); };

  return (
    <div>
      <Topbar title="Student Management" subtitle="View, edit and manage all students"/>
      <div style={{padding:'26px 30px',display:'flex',flexDirection:'column',gap:18}}>
        <div className="fade-up" style={{display:'flex',gap:14,flexWrap:'wrap',alignItems:'center'}}>
          {[{l:'Total',v:students.length,c:'var(--accent)'},{l:'Active',v:students.filter(s=>s.status==='active').length,c:'#10b981'},{l:'At Risk',v:students.filter(s=>s.att<75).length,c:'#ef4444'},{l:'Avg CGPA',v:(students.reduce((a,s)=>a+parseFloat(s.cgpa),0)/students.length).toFixed(1),c:'#f59e0b'}].map(s=>(
            <div key={s.l} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'14px 20px',textAlign:'center'}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:800,color:s.c}}>{s.v}</div>
              <div style={{fontSize:10,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.4px',marginTop:3}}>{s.l}</div>
            </div>
          ))}
        </div>
        <div className="fade-up1" style={{display:'flex',gap:10,flexWrap:'wrap',alignItems:'center'}}>
          <div style={{position:'relative',flex:1,minWidth:220}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search student…" style={{width:'100%',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'9px 13px 9px 36px',outline:'none'}}/>
            <span style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',color:'var(--muted)'}}>🔍</span>
          </div>
          <select value={deptFilter} onChange={e=>setDeptFilter(e.target.value)} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'9px 14px',outline:'none'}}>
            <option value="all">All Depts</option>
            {DEPTS.map(d=><option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="fade-up2" style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',overflow:'hidden'}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead><tr style={{background:'var(--surface2)'}}>
              {['Student','Roll No.','Dept','Sem','CGPA','Attendance','Status','Actions'].map(h=><th key={h} style={{padding:'11px 16px',textAlign:'left',fontSize:11,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.5px',fontWeight:600,borderBottom:'1px solid var(--border)'}}>{h}</th>)}
            </tr></thead>
            <tbody>
              {filtered.map((s,i)=>(
                <tr key={i} style={{borderBottom:'1px solid rgba(31,48,80,.5)'}}>
                  <td style={{padding:'12px 16px'}}><div style={{display:'flex',alignItems:'center',gap:9}}><div style={{width:30,height:30,borderRadius:8,background:s.color,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:800,color:'#fff',flexShrink:0}}>{s.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div><span style={{fontSize:13,fontWeight:600}}>{s.name}</span></div></td>
                  <td style={{padding:'12px 16px',fontFamily:'monospace',fontSize:12,color:'var(--muted2)'}}>{s.roll}</td>
                  <td style={{padding:'12px 16px',fontSize:13}}>{s.dept}</td>
                  <td style={{padding:'12px 16px',fontSize:13}}>Sem {s.sem}</td>
                  <td style={{padding:'12px 16px',fontFamily:"'Syne',sans-serif",fontWeight:700,color:'var(--accent)'}}>{s.cgpa}</td>
                  <td style={{padding:'12px 16px',fontFamily:"'Syne',sans-serif",fontWeight:700,color:s.att>=75?'#10b981':'#ef4444'}}>{s.att}%</td>
                  <td style={{padding:'12px 16px'}}><span style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:20,background:s.status==='active'?'rgba(16,185,129,.12)':'rgba(239,68,68,.12)',color:s.status==='active'?'#10b981':'#ef4444'}}>{s.status}</span></td>
                  <td style={{padding:'12px 16px'}}>
                    <div style={{display:'flex',gap:6}}>
                      <button onClick={()=>setEditS({...s})} style={{fontSize:11,fontWeight:600,padding:'4px 10px',borderRadius:7,background:'rgba(79,142,247,.12)',color:'var(--accent)',border:'1px solid rgba(79,142,247,.25)',cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>Edit</button>
                      <button onClick={()=>deleteStudent(s.id)} style={{fontSize:11,fontWeight:600,padding:'4px 10px',borderRadius:7,background:'rgba(239,68,68,.1)',color:'#ef4444',border:'1px solid rgba(239,68,68,.2)',cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {editS&&(<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',backdropFilter:'blur(7px)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:24}} onClick={()=>setEditS(null)}>
        <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:20,width:'100%',maxWidth:500,animation:'modalIn .3s cubic-bezier(.34,1.56,.64,1)'}} onClick={e=>e.stopPropagation()}>
          <div style={{padding:'20px 24px 18px',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center'}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800}}>Edit Student</div><div onClick={()=>setEditS(null)} style={{cursor:'pointer',color:'var(--muted)',fontSize:20}}>✕</div></div>
          <div style={{padding:'22px 24px 28px'}}>
            {[{l:'Full Name',k:'name'},{l:'Email',k:'email',t:'email'},{l:'Roll Number',k:'roll'}].map(f=>(
              <div key={f.k} style={{marginBottom:14}}><label style={{display:'block',fontSize:11,fontWeight:600,color:'var(--muted2)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:6}}>{f.l}</label><input type={f.t||'text'} value={editS[f.k]} onChange={e=>setEditS(p=>({...p,[f.k]:e.target.value}))} style={{width:'100%',background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'10px 13px',outline:'none'}}/></div>
            ))}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              <div style={{marginBottom:14}}><label style={{display:'block',fontSize:11,fontWeight:600,color:'var(--muted2)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:6}}>Department</label><select value={editS.dept} onChange={e=>setEditS(p=>({...p,dept:e.target.value}))} style={{width:'100%',background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'10px 13px',outline:'none'}}>{DEPTS.map(d=><option key={d}>{d}</option>)}</select></div>
              <div style={{marginBottom:14}}><label style={{display:'block',fontSize:11,fontWeight:600,color:'var(--muted2)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:6}}>Status</label><select value={editS.status} onChange={e=>setEditS(p=>({...p,status:e.target.value}))} style={{width:'100%',background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'10px 13px',outline:'none'}}>{['active','suspended'].map(s=><option key={s}>{s}</option>)}</select></div>
            </div>
            <button onClick={saveEdit} style={{width:'100%',padding:12,borderRadius:'var(--radius-sm)',background:'linear-gradient(135deg,var(--a-accent),#e11d48)',color:'#fff',border:'none',fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,cursor:'pointer'}}>Save Changes</button>
          </div>
        </div>
      </div>)}
      {toast&&<div style={{position:'fixed',bottom:28,right:28,background:'#10b981',color:'#fff',padding:'12px 20px',borderRadius:'var(--radius-sm)',fontSize:13,fontWeight:600,boxShadow:'0 8px 28px rgba(0,0,0,.3)',zIndex:999}}>{toast}</div>}
    </div>
  );
}
