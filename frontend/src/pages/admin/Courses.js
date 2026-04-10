import React, { useState } from 'react';
import Topbar from '../../components/admin/Topbar';
const INIT=[
  {id:1,code:'CS501',name:'Machine Learning',dept:'CSE',sem:5,credits:4,faculty:'Dr. T. Mishra',students:62,status:'active',color:'#6366f1'},
  {id:2,code:'CS606',name:'Deep Learning',dept:'CSE',sem:6,credits:4,faculty:'Dr. T. Mishra',students:58,status:'active',color:'#ec4899'},
  {id:3,code:'CS604',name:'ML Lab',dept:'CSE',sem:6,credits:2,faculty:'Dr. T. Mishra',students:58,status:'active',color:'#f59e0b'},
  {id:4,code:'CS502',name:'Computer Networks',dept:'CSE',sem:5,credits:4,faculty:'Dr. P. Kumar',students:62,status:'active',color:'#10b981'},
  {id:5,code:'EC401',name:'Digital Signal Processing',dept:'ECE',sem:4,credits:4,faculty:'Prof. A. Nair',students:48,status:'active',color:'#22d3ee'},
  {id:6,code:'ME301',name:'Thermodynamics',dept:'ME',sem:3,credits:4,faculty:'Dr. R. Sharma',students:54,status:'inactive',color:'#f97316'},
];
export default function AdminCourses(){
  const [courses,setCourses]=useState(INIT);const [search,setSearch]=useState('');const [edit,setEdit]=useState(null);const [toast,setToast]=useState('');
  const showToast=(m)=>{setToast(m);setTimeout(()=>setToast(''),3000);};
  const filtered=courses.filter(c=>!search||c.name.toLowerCase().includes(search.toLowerCase())||c.code.toLowerCase().includes(search.toLowerCase()));
  return(
    <div>
      <Topbar title="Course Management" subtitle="Manage courses, curriculum and assignments"/>
      <div style={{padding:'26px 30px',display:'flex',flexDirection:'column',gap:18}}>
        <div className="fade-up" style={{display:'flex',gap:14,alignItems:'center',flexWrap:'wrap'}}>
          {[{l:'Total Courses',v:courses.length,c:'var(--a-accent)'},{l:'Active',v:courses.filter(c=>c.status==='active').length,c:'#10b981'},{l:'Inactive',v:courses.filter(c=>c.status==='inactive').length,c:'#ef4444'},{l:'Total Students',v:courses.reduce((a,c)=>a+c.students,0),c:'var(--accent)'}].map(s=>(
            <div key={s.l} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'14px 20px',textAlign:'center'}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:800,color:s.c}}>{s.v}</div>
              <div style={{fontSize:10,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.4px',marginTop:3}}>{s.l}</div>
            </div>
          ))}
          <button onClick={()=>setEdit({id:Date.now(),code:'',name:'',dept:'CSE',sem:1,credits:4,faculty:'',students:0,status:'active',color:'#6366f1',_new:true})} style={{marginLeft:'auto',padding:'10px 20px',borderRadius:'var(--radius-sm)',background:'var(--a-accent)',color:'#fff',border:'none',fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,cursor:'pointer'}}>+ Add Course</button>
        </div>
        <div className="fade-up1" style={{position:'relative'}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search courses…" style={{width:'100%',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'9px 13px 9px 36px',outline:'none'}}/>
          <span style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',color:'var(--muted)'}}>🔍</span>
        </div>
        <div className="fade-up2" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
          {filtered.map((c,i)=>(
            <div key={i} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',overflow:'hidden'}}>
              <div style={{height:3,background:c.color}}/>
              <div style={{padding:'16px 18px'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
                  <span style={{fontSize:11,fontWeight:700,padding:'3px 9px',borderRadius:20,background:c.color+'18',color:c.color}}>{c.code}</span>
                  <span style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:20,background:c.status==='active'?'rgba(16,185,129,.12)':'rgba(239,68,68,.12)',color:c.status==='active'?'#10b981':'#ef4444'}}>{c.status}</span>
                </div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,marginBottom:4}}>{c.name}</div>
                <div style={{fontSize:12,color:'var(--muted2)',marginBottom:10}}>{c.dept} · Sem {c.sem} · {c.credits} Credits</div>
                <div style={{fontSize:12,color:'var(--muted)',marginBottom:4}}>👨‍🏫 {c.faculty}</div>
                <div style={{fontSize:12,color:'var(--muted)',marginBottom:14}}>👥 {c.students} Students</div>
                <div style={{display:'flex',gap:6}}>
                  <button onClick={()=>setEdit({...c})} style={{flex:1,padding:'7px',borderRadius:8,background:'rgba(99,102,241,.1)',color:'var(--t-accent)',border:'1px solid rgba(99,102,241,.2)',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600}}>Edit</button>
                  <button onClick={()=>{setCourses(p=>p.filter(x=>x.id!==c.id));showToast('🗑️ Course deleted');}} style={{flex:1,padding:'7px',borderRadius:8,background:'rgba(239,68,68,.08)',color:'#ef4444',border:'1px solid rgba(239,68,68,.2)',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600}}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {edit&&(<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',backdropFilter:'blur(7px)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:24}} onClick={()=>setEdit(null)}>
        <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:20,width:'100%',maxWidth:520,animation:'modalIn .3s cubic-bezier(.34,1.56,.64,1)'}} onClick={e=>e.stopPropagation()}>
          <div style={{padding:'20px 24px 18px',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between'}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800}}>{edit._new?'Add Course':'Edit Course'}</div><div onClick={()=>setEdit(null)} style={{cursor:'pointer',color:'var(--muted)',fontSize:20}}>✕</div></div>
          <div style={{padding:'22px 24px 28px'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              {[{l:'Course Code',k:'code'},{l:'Course Name',k:'name'},{l:'Faculty',k:'faculty'},{l:'Students',k:'students',t:'number'}].map(f=>(
                <div key={f.k} style={{marginBottom:14}}><label style={{display:'block',fontSize:11,fontWeight:600,color:'var(--muted2)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:6}}>{f.l}</label><input type={f.t||'text'} value={edit[f.k]} onChange={e=>setEdit(p=>({...p,[f.k]:f.t==='number'?parseInt(e.target.value)||0:e.target.value}))} style={{width:'100%',background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'10px 13px',outline:'none'}}/></div>
              ))}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12}}>
              <div style={{marginBottom:14}}><label style={{display:'block',fontSize:11,fontWeight:600,color:'var(--muted2)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:6}}>Dept</label><select value={edit.dept} onChange={e=>setEdit(p=>({...p,dept:e.target.value}))} style={{width:'100%',background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'10px 13px',outline:'none'}}>{['CSE','ECE','ME','CE','EEE','IT'].map(d=><option key={d}>{d}</option>)}</select></div>
              <div style={{marginBottom:14}}><label style={{display:'block',fontSize:11,fontWeight:600,color:'var(--muted2)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:6}}>Semester</label><select value={edit.sem} onChange={e=>setEdit(p=>({...p,sem:parseInt(e.target.value)}))} style={{width:'100%',background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'10px 13px',outline:'none'}}>{[1,2,3,4,5,6,7,8].map(s=><option key={s}>{s}</option>)}</select></div>
              <div style={{marginBottom:14}}><label style={{display:'block',fontSize:11,fontWeight:600,color:'var(--muted2)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:6}}>Status</label><select value={edit.status} onChange={e=>setEdit(p=>({...p,status:e.target.value}))} style={{width:'100%',background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'10px 13px',outline:'none'}}>{['active','inactive'].map(s=><option key={s}>{s}</option>)}</select></div>
            </div>
            <button onClick={()=>{if(edit._new){setCourses(p=>[...p,{...edit,_new:undefined}]);}else{setCourses(p=>p.map(c=>c.id===edit.id?edit:c));}setEdit(null);showToast('✓ Course saved!');}} style={{width:'100%',padding:12,borderRadius:'var(--radius-sm)',background:'linear-gradient(135deg,var(--a-accent),#e11d48)',color:'#fff',border:'none',fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,cursor:'pointer'}}>Save Course</button>
          </div>
        </div>
      </div>)}
      {toast&&<div style={{position:'fixed',bottom:28,right:28,background:'#10b981',color:'#fff',padding:'12px 20px',borderRadius:'var(--radius-sm)',fontSize:13,fontWeight:600,boxShadow:'0 8px 28px rgba(0,0,0,.3)',zIndex:999}}>{toast}</div>}
    </div>
  );
}
