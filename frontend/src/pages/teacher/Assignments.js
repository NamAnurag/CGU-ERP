import React, { useState, useEffect, useRef } from 'react';
import Topbar from '../../components/teacher/Topbar';

const ASSIGNMENTS=[
  {id:1,title:'CNN Implementation — CIFAR-10',subject:'CS606',type:'Project',marks:30,deadline:'Mar 30',submitted:38,total:58,graded:0,color:'#ec4899'},
  {id:2,title:'K-Means Clustering on Retail Dataset',subject:'CS604',type:'Lab',marks:20,deadline:'Mar 20',submitted:52,total:58,graded:52,color:'#f59e0b'},
  {id:3,title:'Regression Model Comparison',subject:'CS501',type:'Assignment',marks:25,deadline:'Apr 5',submitted:21,total:62,graded:0,color:'#6366f1'},
  {id:4,title:'Feature Engineering Lab',subject:'CS604',type:'Lab',marks:20,deadline:'Mar 15',submitted:60,total:62,graded:47,color:'#10b981'},
];

export default function TeacherAssignments(){
  const [showCreate,setShowCreate]=useState(false);
  const [form,setForm]=useState({title:'',subject:'CS501',type:'Assignment',marks:25,deadline:''});
  const [step,setStep]=useState('form');

  const handleCreate=()=>{setStep('loading');setTimeout(()=>setStep('success'),1500);};

  return(
    <div>
      <Topbar title="Assignment Management" subtitle="Create, manage and grade assignments"/>
      <div style={{padding:'26px 30px',display:'flex',flexDirection:'column',gap:18}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,flex:1,marginRight:16}}>
            {[{l:'Total',v:18,c:'var(--t-accent)'},{l:'Active',v:5,c:'#f59e0b'},{l:'Needs Grading',v:47,c:'#ef4444'},{l:'Graded',v:132,c:'#10b981'}].map(s=>(
              <div key={s.l} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'14px 16px',textAlign:'center'}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:800,color:s.c}}>{s.v}</div>
                <div style={{fontSize:10,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.4px',marginTop:3}}>{s.l}</div>
              </div>
            ))}
          </div>
          <button onClick={()=>{setShowCreate(true);setStep('form');}} style={{padding:'10px 20px',borderRadius:'var(--radius-sm)',background:'var(--t-accent)',color:'#fff',border:'none',fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,cursor:'pointer',whiteSpace:'nowrap'}}>+ New Assignment</button>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {ASSIGNMENTS.map((a,i)=>{
            const subPct=Math.round(a.submitted/a.total*100);
            return(
              <div key={i} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',overflow:'hidden'}}>
                <div style={{height:3,background:`linear-gradient(90deg,${a.color},${a.color}88)`}}/>
                <div style={{padding:'16px 18px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:12,marginBottom:10}}>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',gap:7,marginBottom:7}}>
                        <span style={{fontSize:10,fontWeight:700,padding:'3px 9px',borderRadius:20,background:a.color+'18',color:a.color}}>{a.subject}</span>
                        <span style={{fontSize:10,fontWeight:700,padding:'3px 9px',borderRadius:20,background:'rgba(34,211,238,.1)',color:'var(--accent2)'}}>{a.type}</span>
                      </div>
                      <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700}}>{a.title}</div>
                      <div style={{fontSize:11,color:'var(--muted)',marginTop:6}}>Due: {a.deadline} · {a.submitted}/{a.total} submitted · {a.graded} graded {a.submitted-a.graded>0?`· ⚠️ ${a.submitted-a.graded} pending`:''}</div>
                    </div>
                    <div style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800}}>{a.marks}<span style={{fontSize:11,color:'var(--muted)',fontFamily:"'DM Sans',sans-serif"}}> marks</span></div>
                  </div>
                  <div style={{height:4,background:'var(--surface2)',borderRadius:10,overflow:'hidden'}}>
                    <div style={{height:'100%',width:subPct+'%',background:a.color,borderRadius:10,transition:'width .9s'}}/>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',marginTop:6,fontSize:11,color:'var(--muted)'}}>
                    <span>Submission Rate</span><span>{subPct}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showCreate&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',backdropFilter:'blur(7px)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:24}} onClick={()=>setShowCreate(false)}>
          <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:20,width:'100%',maxWidth:560,animation:'modalIn .3s cubic-bezier(.34,1.56,.64,1)'}} onClick={e=>e.stopPropagation()}>
            <div style={{padding:'20px 24px 18px',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800}}>Create New Assignment</div>
              <div onClick={()=>setShowCreate(false)} style={{cursor:'pointer',color:'var(--muted)',fontSize:20}}>✕</div>
            </div>
            <div style={{padding:'22px 24px 28px'}}>
              {step==='form'&&(<>
                <FW label="Subject"><select value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} style={INP}>{['CS501','CS604','CS606'].map(s=><option key={s}>{s}</option>)}</select></FW>
                <FW label="Title"><input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Assignment title" style={INP}/></FW>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12}}>
                  <FW label="Type"><select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} style={INP}>{['Assignment','Lab','Project','Quiz'].map(t=><option key={t}>{t}</option>)}</select></FW>
                  <FW label="Marks"><input type="number" value={form.marks} onChange={e=>setForm({...form,marks:e.target.value})} style={INP}/></FW>
                  <FW label="Deadline"><input type="date" value={form.deadline} onChange={e=>setForm({...form,deadline:e.target.value})} style={INP}/></FW>
                </div>
                <button onClick={handleCreate} style={{width:'100%',padding:12,borderRadius:'var(--radius-sm)',background:'linear-gradient(135deg,var(--t-accent),#4f46e5)',color:'#fff',border:'none',fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,cursor:'pointer',marginTop:4}}>Post Assignment</button>
              </>)}
              {step==='loading'&&<div style={{textAlign:'center',padding:'40px 0'}}><div style={{width:44,height:44,border:'4px solid var(--border)',borderTop:'4px solid var(--t-accent)',borderRadius:'50%',animation:'spin 1s linear infinite',margin:'0 auto 16px'}}/><div style={{fontSize:13,color:'var(--muted2)'}}>Posting…</div></div>}
              {step==='success'&&<div style={{textAlign:'center',padding:'32px 0'}}><div style={{fontSize:48,marginBottom:12}}>🎉</div><div style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:800,color:'#10b981',marginBottom:8}}>Assignment Posted!</div><div style={{fontSize:13,color:'var(--muted2)',marginBottom:16}}>Students will be notified immediately.</div><button onClick={()=>setShowCreate(false)} style={{padding:'10px 24px',borderRadius:'var(--radius-sm)',background:'var(--t-accent)',color:'#fff',border:'none',fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,cursor:'pointer'}}>Close</button></div>}
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </div>
  );
}

function FW({label,children}){return <div style={{marginBottom:14}}><label style={{display:'block',fontSize:11,fontWeight:600,color:'var(--muted2)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:6}}>{label}</label>{children}</div>;}
const INP={width:'100%',background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'10px 13px',outline:'none'};
