import React, { useState } from 'react';
import Topbar from '../../components/admin/Topbar';
const FACULTY = [
  {id:1,name:'Dr. T. Mishra',  empId:'FAC-2019-042',email:'t.mishra@college.edu.in', dept:'CSE',designation:'Assoc. Professor',subjects:'ML, Deep Learning',status:'active',color:'#6366f1'},
  {id:2,name:'Prof. A. Nair',  empId:'FAC-2018-031',email:'a.nair@college.edu.in',   dept:'ECE',designation:'Professor',        subjects:'Digital Circuits',    status:'active',color:'#f59e0b'},
  {id:3,name:'Dr. R. Sharma',  empId:'FAC-2020-055',email:'r.sharma@college.edu.in', dept:'ME', designation:'Asst. Professor',   subjects:'Thermodynamics',     status:'active',color:'#10b981'},
  {id:4,name:'Prof. S. Rao',   empId:'FAC-2017-018',email:'s.rao@college.edu.in',    dept:'CE', designation:'Professor',        subjects:'Structural Engg.',   status:'on-leave',color:'#22d3ee'},
  {id:5,name:'Dr. P. Kumar',   empId:'FAC-2021-067',email:'p.kumar@college.edu.in',  dept:'CSE',designation:'Asst. Professor',   subjects:'Computer Networks',  status:'active',color:'#ec4899'},
];
export default function AdminFaculty(){
  const [faculty,setFaculty]=useState(FACULTY);const [search,setSearch]=useState('');const [edit,setEdit]=useState(null);const [toast,setToast]=useState('');
  const showToast=(m)=>{setToast(m);setTimeout(()=>setToast(''),3000);};
  const filtered=faculty.filter(f=>!search||f.name.toLowerCase().includes(search.toLowerCase())||f.empId.toLowerCase().includes(search.toLowerCase()));
  return(
    <div>
      <Topbar title="Faculty Management" subtitle="View, edit and manage all faculty members"/>
      <div style={{padding:'26px 30px',display:'flex',flexDirection:'column',gap:18}}>
        <div className="fade-up" style={{display:'flex',gap:14,flexWrap:'wrap',alignItems:'center'}}>
          {[{l:'Total Faculty',v:faculty.length,c:'var(--t-accent)'},{l:'Active',v:faculty.filter(f=>f.status==='active').length,c:'#10b981'},{l:'On Leave',v:faculty.filter(f=>f.status==='on-leave').length,c:'#f59e0b'},{l:'Departments',v:[...new Set(faculty.map(f=>f.dept))].length,c:'var(--accent2)'}].map(s=>(
            <div key={s.l} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'14px 20px',textAlign:'center'}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:800,color:s.c}}>{s.v}</div>
              <div style={{fontSize:10,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.4px',marginTop:3}}>{s.l}</div>
            </div>
          ))}
          <button onClick={()=>setEdit({id:Date.now(),name:'',empId:'',email:'',dept:'CSE',designation:'Asst. Professor',subjects:'',status:'active',color:'#6366f1',_new:true})} style={{marginLeft:'auto',padding:'10px 20px',borderRadius:'var(--radius-sm)',background:'var(--a-accent)',color:'#fff',border:'none',fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,cursor:'pointer'}}>+ Add Faculty</button>
        </div>
        <div className="fade-up1" style={{position:'relative'}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search faculty…" style={{width:'100%',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'9px 13px 9px 36px',outline:'none'}}/>
          <span style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',color:'var(--muted)'}}>🔍</span>
        </div>
        <div className="fade-up2" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
          {filtered.map((f,i)=>(
            <div key={i} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:20,borderTop:`3px solid ${f.color}`}}>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
                <div style={{width:44,height:44,borderRadius:12,background:f.color,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:800,color:'#fff',flexShrink:0}}>{f.name.split(' ').slice(-1)[0][0]}{f.name.split(' ')[0][0]}</div>
                <div><div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700}}>{f.name}</div><div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>{f.empId}</div></div>
              </div>
              <div style={{fontSize:12,color:'var(--muted2)',marginBottom:4}}>📧 {f.email}</div>
              <div style={{fontSize:12,color:'var(--muted2)',marginBottom:4}}>🏢 {f.dept} · {f.designation}</div>
              <div style={{fontSize:12,color:'var(--muted2)',marginBottom:12}}>📚 {f.subjects}</div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:20,background:f.status==='active'?'rgba(16,185,129,.12)':'rgba(245,158,11,.12)',color:f.status==='active'?'#10b981':'#f59e0b'}}>{f.status}</span>
                <div style={{display:'flex',gap:6}}>
                  <button onClick={()=>setEdit({...f})} style={{fontSize:11,fontWeight:600,padding:'4px 10px',borderRadius:7,background:'rgba(99,102,241,.12)',color:'var(--t-accent)',border:'1px solid rgba(99,102,241,.2)',cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>Edit</button>
                  <button onClick={()=>{setFaculty(p=>p.filter(x=>x.id!==f.id));showToast('🗑️ Faculty deleted');}} style={{fontSize:11,fontWeight:600,padding:'4px 10px',borderRadius:7,background:'rgba(239,68,68,.1)',color:'#ef4444',border:'1px solid rgba(239,68,68,.2)',cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {edit&&(<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',backdropFilter:'blur(7px)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:24}} onClick={()=>setEdit(null)}>
        <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:20,width:'100%',maxWidth:520,animation:'modalIn .3s cubic-bezier(.34,1.56,.64,1)'}} onClick={e=>e.stopPropagation()}>
          <div style={{padding:'20px 24px 18px',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between'}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800}}>{edit._new?'Add Faculty':'Edit Faculty'}</div><div onClick={()=>setEdit(null)} style={{cursor:'pointer',color:'var(--muted)',fontSize:20}}>✕</div></div>
          <div style={{padding:'22px 24px 28px'}}>
            {[{l:'Full Name',k:'name'},{l:'Employee ID',k:'empId'},{l:'Email',k:'email',t:'email'},{l:'Subjects',k:'subjects'}].map(f=>(
              <div key={f.k} style={{marginBottom:14}}><label style={{display:'block',fontSize:11,fontWeight:600,color:'var(--muted2)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:6}}>{f.l}</label><input type={f.t||'text'} value={edit[f.k]} onChange={e=>setEdit(p=>({...p,[f.k]:e.target.value}))} style={{width:'100%',background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'10px 13px',outline:'none'}}/></div>
            ))}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              <div style={{marginBottom:14}}><label style={{display:'block',fontSize:11,fontWeight:600,color:'var(--muted2)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:6}}>Department</label><select value={edit.dept} onChange={e=>setEdit(p=>({...p,dept:e.target.value}))} style={{width:'100%',background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'10px 13px',outline:'none'}}>
                {['CSE','ECE','ME','CE','EEE','IT'].map(d=><option key={d}>{d}</option>)}</select></div>
              <div style={{marginBottom:14}}><label style={{display:'block',fontSize:11,fontWeight:600,color:'var(--muted2)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:6}}>Designation</label><select value={edit.designation} onChange={e=>setEdit(p=>({...p,designation:e.target.value}))} style={{width:'100%',background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'10px 13px',outline:'none'}}>
                {['Asst. Professor','Assoc. Professor','Professor','HOD'].map(d=><option key={d}>{d}</option>)}</select></div>
            </div>
            <button onClick={()=>{if(edit._new){setFaculty(p=>[...p,{...edit,_new:undefined}]);}else{setFaculty(p=>p.map(f=>f.id===edit.id?edit:f));}setEdit(null);showToast('✓ Faculty saved!');}} style={{width:'100%',padding:12,borderRadius:'var(--radius-sm)',background:'linear-gradient(135deg,var(--a-accent),#e11d48)',color:'#fff',border:'none',fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,cursor:'pointer'}}>Save</button>
          </div>
        </div>
      </div>)}
      {toast&&<div style={{position:'fixed',bottom:28,right:28,background:'#10b981',color:'#fff',padding:'12px 20px',borderRadius:'var(--radius-sm)',fontSize:13,fontWeight:600,boxShadow:'0 8px 28px rgba(0,0,0,.3)',zIndex:999}}>{toast}</div>}
    </div>
  );
}
