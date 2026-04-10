import React, { useState, useEffect, useRef } from 'react';
import Topbar from '../../components/teacher/Topbar';

const HISTORY=[
  {type:'Casual',color:'#6366f1',from:'Mar 10',to:'Mar 11',days:2,status:'approved',reason:'Personal work'},
  {type:'On Duty',color:'#f59e0b',from:'Feb 20',to:'Feb 21',days:2,status:'approved',reason:'ICICV Conference, Bangalore'},
  {type:'Medical',color:'#22d3ee',from:'Jan 15',to:'Jan 15',days:1,status:'approved',reason:'Doctor consultation'},
  {type:'Earned',color:'#10b981',from:'Nov 5',to:'Nov 9',days:5,status:'pending',reason:'Family function'},
];
const SC={approved:{c:'#10b981',bg:'rgba(16,185,129,.12)'},pending:{c:'#f59e0b',bg:'rgba(245,158,11,.12)'},rejected:{c:'#ef4444',bg:'rgba(239,68,68,.12)'}};

export default function TeacherLeave(){
  const [form,setForm]=useState({type:'Casual',from:'',to:'',reason:'',substitute:''});
  const [history,setHistory]=useState(HISTORY);
  const [toast,setToast]=useState('');
  const [selected,setSelected]=useState('Casual');

  const TYPES=[{n:'Casual',c:'#6366f1',used:7,total:12},{n:'Medical',c:'#22d3ee',used:2,total:10},{n:'Earned',c:'#10b981',used:5,total:15},{n:'On Duty',c:'#f59e0b',used:2,total:5}];

  const submit=()=>{
    if(!form.reason||!form.from||!form.to){alert('Fill required fields.');return;}
    setHistory(p=>[{type:form.type,color:TYPES.find(t=>t.n===form.type)?.c||'#6366f1',from:new Date(form.from).toLocaleDateString('en-IN',{day:'numeric',month:'short'}),to:new Date(form.to).toLocaleDateString('en-IN',{day:'numeric',month:'short'}),days:Math.max(1,Math.ceil((new Date(form.to)-new Date(form.from))/(1000*60*60*24))+1),status:'pending',reason:form.reason},...p]);
    setForm({...form,from:'',to:'',reason:'',substitute:''});
    setToast('Leave application submitted!');setTimeout(()=>setToast(''),3000);
  };

  return(
    <div>
      <Topbar title="Leave Application" subtitle="Apply for leave and track approvals"/>
      <div style={{padding:'26px 30px',display:'flex',flexDirection:'column',gap:20}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14}}>
          {TYPES.map(t=>(
            <div key={t.n} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'18px 20px',textAlign:'center'}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:36,fontWeight:800,color:t.c,lineHeight:1}}>{t.total}</div>
              <div style={{fontSize:11,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.5px',marginTop:5}}>{t.n} Leave</div>
              <div style={{height:5,background:'var(--surface2)',borderRadius:10,overflow:'hidden',marginTop:10}}>
                <div style={{height:'100%',width:Math.round(t.used/t.total*100)+'%',background:t.c,borderRadius:10}}/>
              </div>
              <div style={{fontSize:10,color:'var(--muted)',marginTop:4}}>{t.used} used · {t.total-t.used} remaining</div>
            </div>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:22}}>
          <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:24}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:700,marginBottom:20}}>Apply for Leave</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:700,color:'var(--muted2)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:10}}>Leave Type</div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:20}}>
              {TYPES.map(t=><div key={t.n} onClick={()=>{setSelected(t.n);setForm(p=>({...p,type:t.n}));}} style={{padding:'9px 16px',borderRadius:'var(--radius-sm)',border:`2px solid ${selected===t.n?t.c:'var(--border)'}`,background:selected===t.n?t.c+'14':'transparent',color:selected===t.n?t.c:'var(--muted)',fontSize:12,fontWeight:600,cursor:'pointer'}}>{t.n}</div>)}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              <FW label="From Date"><input type="date" value={form.from} onChange={e=>setForm(p=>({...p,from:e.target.value}))} style={INP}/></FW>
              <FW label="To Date"><input type="date" value={form.to} onChange={e=>setForm(p=>({...p,to:e.target.value}))} style={INP}/></FW>
            </div>
            <FW label="Reason"><textarea value={form.reason} onChange={e=>setForm(p=>({...p,reason:e.target.value}))} placeholder="Describe the reason for leave…" style={{...INP,minHeight:90,resize:'vertical',lineHeight:1.6}}/></FW>
            <FW label="Substitute Faculty (optional)"><input value={form.substitute} onChange={e=>setForm(p=>({...p,substitute:e.target.value}))} placeholder="Name of colleague covering classes" style={INP}/></FW>
            <button onClick={submit} style={{width:'100%',padding:12,borderRadius:'var(--radius-sm)',background:'linear-gradient(135deg,var(--t-accent),#4f46e5)',color:'#fff',border:'none',fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,cursor:'pointer'}}>Submit Leave Application</button>
          </div>
          <div>
            <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:18}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,marginBottom:14}}>Leave History</div>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {history.map((h,i)=>{const ss=SC[h.status]||SC.pending;return(
                  <div key={i} style={{padding:'12px 14px',background:'var(--surface2)',border:'1px solid var(--border)',borderLeft:`3px solid ${h.color}`,borderRadius:'var(--radius-sm)'}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                      <div style={{fontSize:12,fontWeight:600,color:h.color}}>{h.type} · {h.days}d</div>
                      <div style={{fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:20,background:ss.bg,color:ss.c}}>{h.status.charAt(0).toUpperCase()+h.status.slice(1)}</div>
                    </div>
                    <div style={{fontSize:12,color:'var(--muted2)'}}>{h.from} – {h.to}</div>
                    <div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>{h.reason}</div>
                  </div>
                );})}
              </div>
            </div>
          </div>
        </div>
      </div>
      {toast&&<div style={{position:'fixed',bottom:28,right:28,background:'#10b981',color:'#fff',padding:'12px 20px',borderRadius:'var(--radius-sm)',fontSize:13,fontWeight:600,boxShadow:'0 8px 28px rgba(0,0,0,.3)',zIndex:999}}>{toast}</div>}
    </div>
  );
}

function FW({label,children}){return <div style={{marginBottom:14}}><label style={{display:'block',fontSize:11,fontWeight:600,color:'var(--muted2)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:6}}>{label}</label>{children}</div>;}
const INP={width:'100%',background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'10px 13px',outline:'none'};
