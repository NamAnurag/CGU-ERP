import React, { useState } from 'react';
import Topbar from '../../components/student/Topbar';

const GRIEVANCES = [
  {id:'GRV-2026-0015',title:'Attendance not updated after medical leave',category:'Attendance',status:'open',priority:'high',date:'Mar 24, 2026',desc:'My attendance for March 10-11 was not updated despite submitting medical certificate to the faculty.',timeline:[{step:'Filed',date:'Mar 24',done:true},{step:'Under Review',date:'Mar 25',done:true},{step:'Resolved',date:'—',done:false}]},
  {id:'GRV-2026-0011',title:'ML Lab marks not reflecting on portal',category:'Marks',status:'in-progress',priority:'medium',date:'Mar 18, 2026',desc:'The marks for ML Lab experiment 4 submitted on March 15 are not visible on the student portal.',timeline:[{step:'Filed',date:'Mar 18',done:true},{step:'Under Review',date:'Mar 19',done:true},{step:'Resolved',date:'—',done:false}]},
  {id:'GRV-2026-0008',title:'Assignment re-evaluation request — CS606',category:'Assignments',status:'resolved',priority:'low',date:'Mar 10, 2026',desc:'Request for re-evaluation of backpropagation assignment where marks deducted seem incorrect.',timeline:[{step:'Filed',date:'Mar 10',done:true},{step:'Under Review',date:'Mar 11',done:true},{step:'Resolved',date:'Mar 14',done:true}]},
];

const STATUS_STYLE={open:{color:'#f97316',bg:'rgba(249,115,22,.12)',label:'Open'},['in-progress']:{color:'#4f8ef7',bg:'rgba(79,142,247,.12)',label:'In Progress'},resolved:{color:'#10b981',bg:'rgba(16,185,129,.12)',label:'Resolved'}};
const PRIORITY_STYLE={high:{color:'#ef4444',bg:'rgba(239,68,68,.1)'},medium:{color:'#f59e0b',bg:'rgba(245,158,11,.1)'},low:{color:'#10b981',bg:'rgba(16,185,129,.1)'}};

export default function Grievances(){
  const [grievances,setGrievances]=useState(GRIEVANCES);
  const [showModal,setShowModal]=useState(false);
  const [detail,setDetail]=useState(null);
  const [form,setForm]=useState({title:'',category:'Attendance',desc:'',priority:'medium'});
  const [step,setStep]=useState('form');
  const [ticketId,setTicketId]=useState('');
  const [rating,setRating]=useState({});

  const handleSubmit=()=>{
    if(!form.title||!form.desc){alert('Fill in all fields.');return;}
    setStep('loading');
    setTimeout(()=>{
      const tid='GRV-2026-00'+String(grievances.length+16);
      setTicketId(tid);
      setStep('success');
      setGrievances(prev=>[{id:tid,title:form.title,category:form.category,status:'open',priority:form.priority,date:'Mar 26, 2026',desc:form.desc,timeline:[{step:'Filed',date:'Mar 26',done:true},{step:'Under Review',date:'—',done:false},{step:'Resolved',date:'—',done:false}]},...prev]);
    },1500);
  };

  return(
    <div>
      <Topbar title="Grievances" subtitle="File, track and resolve academic grievances"/>
      <div style={S.content}>

        {/* Summary */}
        <div className="fade-up" style={S.summary}>
          {[{l:'Total',v:grievances.length,c:'var(--accent)'},{l:'Open',v:grievances.filter(g=>g.status==='open').length,c:'#f97316'},{l:'In Progress',v:grievances.filter(g=>g.status==='in-progress').length,c:'var(--accent)'},{l:'Resolved',v:grievances.filter(g=>g.status==='resolved').length,c:'#10b981'}].map(s=>(
            <div key={s.l} style={S.sumCard}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:s.c}}>{s.v}</div>
              <div style={{fontSize:11,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.4px',marginTop:3}}>{s.l}</div>
            </div>
          ))}
          <button onClick={()=>{setShowModal(true);setStep('form');}} style={S.fileBtn}>+ File Grievance</button>
        </div>

        {/* Grievance cards */}
        <div className="fade-up1" style={{display:'flex',flexDirection:'column',gap:12}}>
          {grievances.map((g,i)=>{
            const ss=STATUS_STYLE[g.status]||STATUS_STYLE.open;
            const ps=PRIORITY_STYLE[g.priority]||PRIORITY_STYLE.medium;
            return(
              <div key={i} onClick={()=>setDetail(g)} style={{...S.gCard,borderLeftColor:ss.color,cursor:'pointer'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:12}}>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',gap:7,marginBottom:7,flexWrap:'wrap'}}>
                      <span style={{fontSize:10,fontWeight:700,padding:'3px 9px',borderRadius:20,background:'rgba(79,142,247,.1)',color:'var(--accent)'}}>{g.category}</span>
                      <span style={{fontSize:10,fontWeight:700,padding:'3px 9px',borderRadius:20,background:ps.bg,color:ps.color}}>{g.priority} priority</span>
                    </div>
                    <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,marginBottom:3}}>{g.title}</div>
                    <div style={{fontSize:12,color:'var(--muted)'}}>{g.id} · Filed {g.date}</div>
                  </div>
                  <span style={{fontSize:11,fontWeight:600,padding:'4px 10px',borderRadius:20,background:ss.bg,color:ss.color,border:`1px solid ${ss.color}30`,flexShrink:0}}>{ss.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* File modal */}
      {showModal&&(
        <div style={S.overlay} onClick={()=>{if(step!=='loading'){setShowModal(false);}}}>
          <div style={S.modal} onClick={e=>e.stopPropagation()}>
            <div style={S.modalHead}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800}}>{step==='success'?'Grievance Filed! 🎉':'File a Grievance'}</div>
              {step!=='loading'&&<div onClick={()=>setShowModal(false)} style={{cursor:'pointer',color:'var(--muted)',fontSize:20}}>✕</div>}
            </div>
            <div style={{padding:'22px 24px 28px'}}>
              {step==='form'&&(
                <>
                  <Field label="Title" value={form.title} onChange={v=>setForm({...form,title:v})} placeholder="Briefly describe the issue"/>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                    <div style={S.fw}><label style={S.lbl}>Category</label><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} style={S.inp}>{['Attendance','Marks','Assignments','Fee','Facilities','Other'].map(c=><option key={c}>{c}</option>)}</select></div>
                    <div style={S.fw}><label style={S.lbl}>Priority</label><select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})} style={S.inp}>{['low','medium','high'].map(p=><option key={p}>{p}</option>)}</select></div>
                  </div>
                  <div style={S.fw}><label style={S.lbl}>Description</label><textarea value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} placeholder="Provide full details of your grievance…" style={{...S.inp,minHeight:100,resize:'vertical',lineHeight:1.6}}/></div>
                  <button onClick={handleSubmit} style={S.submitBtn}>Submit Grievance →</button>
                </>
              )}
              {step==='loading'&&<div style={{textAlign:'center',padding:'40px 0'}}><div style={{width:48,height:48,border:'4px solid var(--border)',borderTop:'4px solid var(--accent)',borderRadius:'50%',animation:'spin 1s linear infinite',margin:'0 auto 16px'}}/><div style={{fontSize:14,color:'var(--muted2)'}}>Submitting…</div></div>}
              {step==='success'&&<div style={{textAlign:'center',padding:'20px 0'}}><div style={{fontSize:52,marginBottom:14}}>✅</div><div style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:800,color:'#10b981',marginBottom:8}}>Filed Successfully!</div><div style={{fontSize:13,color:'var(--muted2)',marginBottom:16}}>Your grievance has been submitted and will be reviewed within 24 hours.</div><div style={{background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',padding:'12px 16px',display:'inline-block',marginBottom:20}}><div style={{fontSize:11,color:'var(--muted)'}}>Ticket ID</div><div style={{fontFamily:'monospace',fontSize:15,fontWeight:700,color:'var(--accent)',marginTop:3}}>{ticketId}</div></div><button onClick={()=>setShowModal(false)} style={S.submitBtn}>Close</button></div>}
            </div>
          </div>
        </div>
      )}

      {/* Detail modal */}
      {detail&&(
        <div style={S.overlay} onClick={()=>setDetail(null)}>
          <div style={S.modal} onClick={e=>e.stopPropagation()}>
            <div style={S.modalHead}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:800}}>{detail.title}</div>
              <div onClick={()=>setDetail(null)} style={{cursor:'pointer',color:'var(--muted)',fontSize:20}}>✕</div>
            </div>
            <div style={{padding:'20px 24px 28px'}}>
              <p style={{fontSize:13,color:'var(--muted2)',lineHeight:1.7,background:'var(--surface2)',padding:'13px 15px',borderRadius:'var(--radius-sm)',border:'1px solid var(--border)',marginBottom:18}}>{detail.desc}</p>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,marginBottom:12}}>Resolution Timeline</div>
              <div style={{display:'flex',flexDirection:'column',gap:0}}>
                {detail.timeline.map((t,i)=>(
                  <div key={i} style={{display:'flex',gap:14,paddingBottom:i<detail.timeline.length-1?14:0}}>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                      <div style={{width:22,height:22,borderRadius:'50%',background:t.done?'#10b981':'var(--surface2)',border:`2px solid ${t.done?'#10b981':'var(--border)'}`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:'#fff',fontSize:11,fontWeight:800}}>{t.done?'✓':''}</div>
                      {i<detail.timeline.length-1&&<div style={{width:2,flex:1,background:t.done?'#10b981':'var(--border)',marginTop:4}}/>}
                    </div>
                    <div style={{paddingBottom:4}}>
                      <div style={{fontSize:13,fontWeight:600,color:t.done?'var(--text)':'var(--muted)'}}>{t.step}</div>
                      <div style={{fontSize:11,color:'var(--muted)'}}>{t.date}</div>
                    </div>
                  </div>
                ))}
              </div>
              {detail.status==='resolved'&&(
                <div style={{marginTop:18}}>
                  <div style={{fontSize:13,fontWeight:700,marginBottom:10}}>Rate Resolution</div>
                  <div style={{display:'flex',gap:8}}>
                    {[1,2,3,4,5].map(s=>(
                      <div key={s} onClick={()=>setRating(p=>({...p,[detail.id]:s}))} style={{fontSize:24,cursor:'pointer',opacity:rating[detail.id]>=s?1:.3,transition:'opacity .2s'}}>⭐</div>
                    ))}
                  </div>
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

function Field({label,value,onChange,placeholder,type='text'}){
  return <div style={S.fw}><label style={S.lbl}>{label}</label><input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={S.inp}/></div>;
}

const S={
  content:{padding:'26px 30px',display:'flex',flexDirection:'column',gap:18},
  summary:{display:'flex',gap:14,alignItems:'center',flexWrap:'wrap'},
  sumCard:{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'16px 18px',textAlign:'center',flex:'0 0 auto'},
  fileBtn:{marginLeft:'auto',padding:'11px 22px',borderRadius:'var(--radius-sm)',background:'linear-gradient(135deg,var(--accent),#3b6fd4)',color:'#fff',border:'none',fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,cursor:'pointer'},
  gCard:{background:'var(--surface)',border:'1px solid var(--border)',borderLeft:'3px solid',borderRadius:'var(--radius)',padding:'16px 18px',transition:'border-color .2s'},
  overlay:{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',backdropFilter:'blur(7px)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:24},
  modal:{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:20,width:'100%',maxWidth:540,maxHeight:'88vh',overflowY:'auto',animation:'modalIn .3s cubic-bezier(.34,1.56,.64,1)'},
  modalHead:{padding:'20px 24px 18px',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center'},
  fw:{marginBottom:14},
  lbl:{display:'block',fontSize:11,fontWeight:600,color:'var(--muted2)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:6},
  inp:{width:'100%',background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'10px 13px',outline:'none'},
  submitBtn:{width:'100%',padding:12,borderRadius:'var(--radius-sm)',background:'linear-gradient(135deg,var(--accent),#3b6fd4)',color:'#fff',border:'none',fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,cursor:'pointer',marginTop:4},
};
