import React, { useState, useEffect, useRef } from 'react';
import Topbar from '../../components/teacher/Topbar';

const SUBJECTS=[{code:'CS501',name:'Machine Learning',color:'#6366f1',count:62},{code:'CS604',name:'ML Lab',color:'#f59e0b',count:58},{code:'CS606',name:'Deep Learning',color:'#ec4899',count:58},{code:'CS606T',name:'DL Tutorial',color:'#22d3ee',count:30}];
const NAMES=['Riya Sharma','Arjun Mehta','Priya Patel','Rohit Kumar','Sneha Das','Vikram Singh','Anjali Nair','Kiran Rao','Deepak Jha','Pooja Mishra','Aditya Verma','Neha Gupta','Saurabh Yadav','Kavya Reddy','Manish Tiwari','Isha Kapoor','Rahul Sinha','Simran Kaur','Nikhil Bose','Tanvi Desai'];
const COLORS=['#6366f1','#22d3ee','#10b981','#f59e0b','#ec4899','#f97316'];
function genStudents(n){return Array.from({length:Math.min(n,20)},(_,i)=>({id:i+1,name:NAMES[i%NAMES.length],roll:'22CS0'+String(i+101).padStart(3,'0'),color:COLORS[i%COLORS.length],att:Math.floor(Math.random()*30)+60,status:'P'}));}

export default function TeacherAttendance(){
  const [activeSubj,setActiveSubj]=useState(0);
  const [students,setStudents]=useState(()=>{const d={};SUBJECTS.forEach(s=>{d[s.code]=genStudents(s.count);});return d;});
  const [search,setSearch]=useState('');
  const [toast,setToast]=useState('');

  const sub=SUBJECTS[activeSubj];
  const sts=students[sub.code];
  const filtered=search?sts.filter(s=>s.name.toLowerCase().includes(search.toLowerCase())||s.roll.toLowerCase().includes(search.toLowerCase())):sts;
  const P=sts.filter(s=>s.status==='P').length, A=sts.filter(s=>s.status==='A').length;
  const pct=Math.round(P/sts.length*100);

  const setStatus=(id,status)=>setStudents(prev=>({...prev,[sub.code]:prev[sub.code].map(s=>s.id===id?{...s,status}:s)}));
  const markAll=status=>setStudents(prev=>({...prev,[sub.code]:prev[sub.code].map(s=>({...s,status}))}));
  const save=()=>{setToast('✓ Attendance saved!');setTimeout(()=>setToast(''),3000);};

  return(
    <div>
      <Topbar title="Attendance Management" subtitle="Mark and track student attendance"/>
      <div style={{padding:'26px 30px',display:'flex',flexDirection:'column',gap:18}}>
        <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
          {SUBJECTS.map((s,i)=><div key={i} onClick={()=>setActiveSubj(i)} style={{padding:'9px 16px',borderRadius:'var(--radius-sm)',border:`1px solid ${i===activeSubj?s.color:'var(--border)'}`,background:i===activeSubj?s.color+'14':'var(--surface)',color:i===activeSubj?s.color:'var(--muted)',fontSize:13,fontWeight:500,cursor:'pointer',display:'flex',alignItems:'center',gap:7}}><span style={{width:8,height:8,borderRadius:'50%',background:s.color,display:'inline-block'}}/>{s.code}</div>)}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:20}}>
          <div>
            <div style={{display:'flex',gap:10,marginBottom:16,alignItems:'center',flexWrap:'wrap'}}>
              <div style={{position:'relative',flex:1,minWidth:180}}>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search student…" style={{width:'100%',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'9px 13px 9px 36px',outline:'none'}}/>
                <span style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',color:'var(--muted)'}}>🔍</span>
              </div>
              <button onClick={()=>markAll('P')} style={{padding:'8px 14px',borderRadius:'var(--radius-sm)',background:'rgba(16,185,129,.15)',color:'#10b981',border:'1px solid rgba(16,185,129,.3)',fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600,cursor:'pointer'}}>✓ All Present</button>
              <button onClick={()=>markAll('A')} style={{padding:'8px 14px',borderRadius:'var(--radius-sm)',background:'rgba(239,68,68,.12)',color:'#ef4444',border:'1px solid rgba(239,68,68,.25)',fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600,cursor:'pointer'}}>✗ All Absent</button>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              {filtered.map((s,i)=>{
                const borderColor=s.status==='P'?'#10b981':s.status==='A'?'#ef4444':'#f59e0b';
                return(<div key={i} style={{display:'flex',alignItems:'center',gap:14,padding:'11px 16px',background:'var(--surface)',border:'1px solid var(--border)',borderLeft:`3px solid ${borderColor}`,borderRadius:'var(--radius-sm)'}}>
                  <div style={{width:32,height:32,borderRadius:8,background:s.color,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:800,color:'#fff',flexShrink:0}}>{s.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                  <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{s.name}</div><div style={{fontSize:11,color:'var(--muted)',marginTop:1}}>{s.roll}</div></div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:s.att>=75?'#10b981':'#ef4444',minWidth:40,textAlign:'right'}}>{s.att}%</div>
                  <div style={{display:'flex',border:'1px solid var(--border)',borderRadius:8,overflow:'hidden'}}>
                    {['P','A','L'].map(st=><button key={st} onClick={()=>setStatus(s.id,st)} style={{padding:'6px 12px',fontSize:11,fontWeight:700,cursor:'pointer',border:'none',background:s.status===st?(st==='P'?'#10b981':st==='A'?'#ef4444':'#f59e0b'):'transparent',color:s.status===st?'#fff':'var(--muted)',fontFamily:"'DM Sans',sans-serif"}}>{st}</button>)}
                  </div>
                </div>);
              })}
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:18}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,marginBottom:14}}>Session Stats</div>
              <div style={{position:'relative',width:120,height:120,margin:'0 auto 14px'}}>
                <svg width="120" height="120" viewBox="0 0 120 120" style={{transform:'rotate(-90deg)'}}>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="var(--surface2)" strokeWidth="12"/>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#10b981" strokeWidth="12" strokeLinecap="round" strokeDasharray="314" strokeDashoffset={314-314*(pct/100)} style={{transition:'stroke-dashoffset .8s'}}/>
                </svg>
                <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:'#10b981'}}>{pct}%</div>
                  <div style={{fontSize:10,color:'var(--muted)'}}>Present</div>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                <div style={{background:'rgba(16,185,129,.08)',borderRadius:8,padding:'10px',textAlign:'center'}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:'#10b981'}}>{P}</div><div style={{fontSize:10,color:'var(--muted)'}}>Present</div></div>
                <div style={{background:'rgba(239,68,68,.08)',borderRadius:8,padding:'10px',textAlign:'center'}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:'#ef4444'}}>{A}</div><div style={{fontSize:10,color:'var(--muted)'}}>Absent</div></div>
              </div>
              <button onClick={save} style={{width:'100%',marginTop:14,padding:'11px',borderRadius:'var(--radius-sm)',background:'linear-gradient(135deg,var(--t-accent),#4f46e5)',color:'#fff',border:'none',fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,cursor:'pointer'}}>Save Attendance</button>
            </div>
            <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:18}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,marginBottom:12}}>⚠️ At-Risk Students</div>
              {sts.filter(s=>s.att<75).slice(0,4).map((s,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 10px',background:'rgba(239,68,68,.06)',border:'1px solid rgba(239,68,68,.18)',borderRadius:9,marginBottom:7}}>
                  <div style={{width:28,height:28,borderRadius:7,background:s.color,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:800,color:'#fff'}}>{s.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                  <div style={{flex:1,fontSize:12,fontWeight:600}}>{s.name}</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:800,color:'#ef4444'}}>{s.att}%</div>
                </div>
              ))}
              {sts.filter(s=>s.att<75).length===0&&<div style={{fontSize:12,color:'var(--muted)'}}>No at-risk students 🎉</div>}
            </div>
          </div>
        </div>
      </div>
      {toast&&<div style={{position:'fixed',bottom:28,right:28,background:'#10b981',color:'#fff',padding:'12px 20px',borderRadius:'var(--radius-sm)',fontSize:13,fontWeight:600,boxShadow:'0 8px 28px rgba(0,0,0,.3)',zIndex:999}}>{toast}</div>}
    </div>
  );
}
