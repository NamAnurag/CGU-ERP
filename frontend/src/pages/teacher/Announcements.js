import React, { useState, useEffect, useRef } from 'react';
import Topbar from '../../components/teacher/Topbar';

const INIT=[
  {id:1,title:'End-Term Practical Exam Schedule Released',body:'The End-Term practical exam for CS604 is scheduled for April 18–19, 2026.',urgency:'Urgent',subject:'CS604',audience:'Sem 6 Students',date:'Mar 26, 2026'},
  {id:2,title:'Assignment Deadline Extended — CNN Implementation',body:'Deadline extended to April 2, 2026. No further extensions will be granted.',urgency:'Notice',subject:'CS606',audience:'All Students',date:'Mar 24, 2026'},
  {id:3,title:'Guest Lecture: Transformer Architectures',body:'Guest lecture by Dr. Ramesh Iyer (IIT Bombay) on April 5, 2026 at 2 PM.',urgency:'Info',subject:'CS606',audience:'Sem 6 Students',date:'Mar 22, 2026'},
  {id:4,title:'Mid-Term Results Published on Portal',body:'Marks for CS501 Mid-Term uploaded. Re-evaluation requests within 7 days.',urgency:'Notice',subject:'CS501',audience:'Sem 5 Students',date:'Mar 20, 2026'},
];
const UC={'Urgent':'#ef4444','Notice':'#6366f1','Info':'#10b981'};
const US={'Urgent':'linear-gradient(90deg,#ef4444,#f87171)','Notice':'linear-gradient(90deg,#6366f1,#818cf8)','Info':'linear-gradient(90deg,#10b981,#34d399)'};

export default function TeacherAnnouncements(){
  const [anns,setAnns]=useState(INIT);const [filter,setFilter]=useState('all');const [showModal,setShowModal]=useState(false);
  const [form,setForm]=useState({title:'',body:'',urgency:'Notice',subject:'All Subjects',audience:'All Students'});
  const [toast,setToast]=useState('');

  const filtered=anns.filter(a=>filter==='all'||a.urgency.toLowerCase()===filter);

  const post=()=>{
    if(!form.title||!form.body){alert('Fill title and message.');return;}
    setAnns(p=>[{id:Date.now(),title:form.title,body:form.body,urgency:form.urgency,subject:form.subject,audience:form.audience,date:'Mar 26, 2026'},...p]);
    setShowModal(false);setForm({title:'',body:'',urgency:'Notice',subject:'All Subjects',audience:'All Students'});
    setToast('✓ Announcement posted!');setTimeout(()=>setToast(''),3000);
  };

  return(
    <div>
      <Topbar title="Announcements" subtitle="Post and manage announcements for students"/>
      <div style={{padding:'26px 30px',display:'flex',flexDirection:'column',gap:18}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
          <div style={{display:'flex',gap:8}}>
            {['all','urgent','notice','info'].map(f=><div key={f} onClick={()=>setFilter(f)} style={{padding:'8px 14px',borderRadius:20,fontSize:12,fontWeight:500,cursor:'pointer',border:'1px solid var(--border)',background:filter===f?'rgba(99,102,241,.12)':'var(--surface)',color:filter===f?'var(--t-accent)':'var(--muted)',borderColor:filter===f?'rgba(99,102,241,.4)':'var(--border)'}}>{f.charAt(0).toUpperCase()+f.slice(1)}</div>)}
          </div>
          <button onClick={()=>setShowModal(true)} style={{padding:'10px 20px',borderRadius:'var(--radius-sm)',background:'var(--t-accent)',color:'#fff',border:'none',fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,cursor:'pointer'}}>+ New Announcement</button>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {filtered.map((a,i)=>{const uc=UC[a.urgency]||'#6366f1';return(
            <div key={i} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',overflow:'hidden',borderColor:a.urgency==='Urgent'?'rgba(239,68,68,.25)':'var(--border)'}}>
              <div style={{height:3,background:US[a.urgency]}}/>
              <div style={{padding:'16px 18px'}}>
                <div style={{display:'flex',gap:7,marginBottom:8,flexWrap:'wrap'}}>
                  <span style={{fontSize:10,fontWeight:700,padding:'3px 9px',borderRadius:20,background:uc+'18',color:uc,border:`1px solid ${uc}30`}}>{a.urgency==='Urgent'?'🚨':a.urgency==='Notice'?'📌':'ℹ️'} {a.urgency}</span>
                  <span style={{fontSize:10,fontWeight:700,padding:'3px 9px',borderRadius:20,background:'rgba(34,211,238,.1)',color:'var(--accent2)'}}>{a.subject}</span>
                  <span style={{fontSize:10,fontWeight:700,padding:'3px 9px',borderRadius:20,background:'rgba(245,158,11,.1)',color:'#f59e0b'}}>{a.audience}</span>
                </div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,marginBottom:6}}>{a.title}</div>
                <div style={{fontSize:13,color:'var(--muted2)',lineHeight:1.6,marginBottom:10}}>{a.body}</div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div style={{fontSize:11,color:'var(--muted)'}}>📅 {a.date}</div>
                  <div style={{display:'flex',gap:8}}>
                    <button style={{fontSize:11,fontWeight:600,padding:'4px 12px',borderRadius:8,background:'rgba(99,102,241,.1)',color:'var(--t-accent)',border:'1px solid rgba(99,102,241,.25)',cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>Edit</button>
                    <button onClick={()=>setAnns(p=>p.filter(x=>x.id!==a.id))} style={{fontSize:11,fontWeight:600,padding:'4px 12px',borderRadius:8,background:'rgba(239,68,68,.08)',color:'#ef4444',border:'1px solid rgba(239,68,68,.2)',cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          );})}
        </div>
      </div>

      {showModal&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',backdropFilter:'blur(7px)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:24}} onClick={()=>setShowModal(false)}>
          <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:20,width:'100%',maxWidth:580,animation:'modalIn .3s cubic-bezier(.34,1.56,.64,1)'}} onClick={e=>e.stopPropagation()}>
            <div style={{padding:'20px 24px 18px',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800}}>New Announcement</div>
              <div onClick={()=>setShowModal(false)} style={{cursor:'pointer',color:'var(--muted)',fontSize:20}}>✕</div>
            </div>
            <div style={{padding:'22px 24px 28px'}}>
              <div style={{marginBottom:18}}>
                <label style={LBL}>Urgency Level</label>
                <div style={{display:'flex',gap:8}}>
                  {['Notice','Info','Urgent'].map(u=><div key={u} onClick={()=>setForm(p=>({...p,urgency:u}))} style={{flex:1,padding:'9px',borderRadius:'var(--radius-sm)',border:`2px solid ${form.urgency===u?UC[u]:'var(--border)'}`,background:form.urgency===u?UC[u]+'14':'transparent',color:form.urgency===u?UC[u]:'var(--muted)',fontSize:12,fontWeight:600,cursor:'pointer',textAlign:'center'}}>
                    {u==='Urgent'?'🚨':u==='Notice'?'📌':'ℹ️'} {u}
                  </div>)}
                </div>
              </div>
              <FW label="Title"><input value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} placeholder="Announcement title" style={INP}/></FW>
              <FW label="Message"><textarea value={form.body} onChange={e=>setForm(p=>({...p,body:e.target.value}))} placeholder="Write the full announcement…" style={{...INP,minHeight:90,resize:'vertical',lineHeight:1.6}}/></FW>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <FW label="Subject"><select value={form.subject} onChange={e=>setForm(p=>({...p,subject:e.target.value}))} style={INP}>{['All Subjects','CS501','CS604','CS606'].map(s=><option key={s}>{s}</option>)}</select></FW>
                <FW label="Audience"><select value={form.audience} onChange={e=>setForm(p=>({...p,audience:e.target.value}))} style={INP}>{['All Students','Sem 5 Students','Sem 6 Students','Lab Batch A','Lab Batch B'].map(a=><option key={a}>{a}</option>)}</select></FW>
              </div>
              <button onClick={post} style={{width:'100%',padding:12,borderRadius:'var(--radius-sm)',background:'linear-gradient(135deg,var(--t-accent),#4f46e5)',color:'#fff',border:'none',fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,cursor:'pointer',marginTop:4}}>Post Announcement</button>
            </div>
          </div>
        </div>
      )}
      {toast&&<div style={{position:'fixed',bottom:28,right:28,background:'#10b981',color:'#fff',padding:'12px 20px',borderRadius:'var(--radius-sm)',fontSize:13,fontWeight:600,boxShadow:'0 8px 28px rgba(0,0,0,.3)',zIndex:999}}>{toast}</div>}
    </div>
  );
}

function FW({label,children}){return <div style={{marginBottom:14}}><label style={LBL}>{label}</label>{children}</div>;}
const LBL={display:'block',fontSize:11,fontWeight:600,color:'var(--muted2)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:6};
const INP={width:'100%',background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'10px 13px',outline:'none'};
