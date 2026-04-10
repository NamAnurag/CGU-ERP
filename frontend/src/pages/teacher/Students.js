import React, { useState, useEffect, useRef } from 'react';
import Topbar from '../../components/teacher/Topbar';

const SUBJECTS=[{code:'CS501',name:'Machine Learning',color:'#6366f1',n:62},{code:'CS604',name:'ML Lab',color:'#f59e0b',n:58},{code:'CS606',name:'Deep Learning',color:'#ec4899',n:58}];
const NAMES=['Riya Sharma','Arjun Mehta','Priya Patel','Rohit Kumar','Sneha Das','Vikram Singh','Anjali Nair','Kiran Rao','Deepak Jha','Pooja Mishra','Aditya Verma','Neha Gupta','Saurabh Yadav','Kavya Reddy','Manish Tiwari','Isha Kapoor','Rahul Sinha','Simran Kaur','Nikhil Bose','Tanvi Desai'];
const COLORS=['#6366f1','#22d3ee','#10b981','#f59e0b','#ec4899','#f97316'];
function gen(n){return Array.from({length:Math.min(n,20)},(_,i)=>({id:i+1,name:NAMES[i%NAMES.length],roll:'22CS0'+String(i+101).padStart(3,'0'),color:COLORS[i%COLORS.length],att:Math.floor(Math.random()*30)+60,cgpa:(Math.random()*3+7).toFixed(1)}));}

export default function TeacherStudents(){
  const [aS,setAS]=useState(0);const [filter,setFilter]=useState('all');const [search,setSearch]=useState('');const [view,setView]=useState('grid');const [profile,setProfile]=useState(null);
  const students=gen(SUBJECTS[aS].n);
  const filtered=students.filter(s=>{const qm=!search||s.name.toLowerCase().includes(search.toLowerCase())||s.roll.toLowerCase().includes(search.toLowerCase());const fm=filter==='all'||(filter==='risk'&&s.att<75)||(filter==='good'&&s.att>=75);return qm&&fm;});

  return(
    <div>
      <Topbar title="Student List" subtitle="View all students across your subjects"/>
      <div style={{padding:'26px 30px',display:'flex',flexDirection:'column',gap:18}}>
        <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
          {SUBJECTS.map((s,i)=><div key={i} onClick={()=>setAS(i)} style={{padding:'9px 16px',borderRadius:'var(--radius-sm)',border:`1px solid ${i===aS?s.color:'var(--border)'}`,background:i===aS?s.color+'14':'var(--surface)',color:i===aS?s.color:'var(--muted)',fontSize:13,fontWeight:500,cursor:'pointer'}}>{s.code} — {s.name}</div>)}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14}}>
          {[{l:'Total',v:filtered.length,c:'var(--t-accent)'},{l:'Avg Att',v:Math.round(students.reduce((a,x)=>a+x.att,0)/students.length)+'%',c:'#10b981'},{l:'At Risk',v:students.filter(s=>s.att<75).length,c:'#ef4444'},{l:'Avg CGPA',v:(students.reduce((a,x)=>a+parseFloat(x.cgpa),0)/students.length).toFixed(1),c:'#f59e0b'}].map(s=>(
            <div key={s.l} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'14px 16px',display:'flex',alignItems:'center',gap:12}}>
              <div style={{flex:1}}><div style={{fontSize:10,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.4px'}}>  {s.l}</div><div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:s.c,marginTop:2}}>{s.v}</div></div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
          <div style={{position:'relative',flex:1,minWidth:200}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or roll…" style={{width:'100%',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'9px 13px 9px 36px',outline:'none'}}/>
            <span style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',color:'var(--muted)'}}>🔍</span>
          </div>
          {['all','risk','good'].map(f=><div key={f} onClick={()=>setFilter(f)} style={{padding:'8px 14px',borderRadius:20,fontSize:12,fontWeight:500,cursor:'pointer',border:'1px solid var(--border)',background:filter===f?'rgba(99,102,241,.12)':'var(--surface)',color:filter===f?'var(--t-accent)':'var(--muted)',borderColor:filter===f?'rgba(99,102,241,.4)':'var(--border)'}}>{f==='all'?'All':f==='risk'?'⚠️ At Risk':'✅ Good Standing'}</div>)}
          <div style={{display:'flex',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',padding:3,gap:3}}>
            {['grid','table'].map(v=><div key={v} onClick={()=>setView(v)} style={{padding:'7px 12px',borderRadius:7,fontSize:12,cursor:'pointer',color:view===v?'#fff':'var(--muted)',background:view===v?'var(--t-accent)':'transparent'}}>{v==='grid'?'⊞':'≡'}</div>)}
          </div>
        </div>

        {view==='grid'?(
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14}}>
            {filtered.map((s,i)=>(
              <div key={i} onClick={()=>setProfile(s)} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:18,cursor:'pointer',transition:'transform .2s,box-shadow .2s'}}>
                <div style={{width:48,height:48,borderRadius:12,background:s.color,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,color:'#fff',marginBottom:12}}>{s.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700}}>{s.name}</div>
                <div style={{fontSize:11,color:'var(--muted)',marginBottom:10}}>{s.roll}</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
                  <div style={{background:'var(--surface2)',borderRadius:7,padding:'7px',textAlign:'center'}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800,color:s.att>=75?'#10b981':'#ef4444'}}>{s.att}%</div><div style={{fontSize:9,color:'var(--muted)'}}>Attend.</div></div>
                  <div style={{background:'var(--surface2)',borderRadius:7,padding:'7px',textAlign:'center'}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800,color:'var(--t-accent)'}}>{s.cgpa}</div><div style={{fontSize:9,color:'var(--muted)'}}>CGPA</div></div>
                </div>
                {s.att<75&&<div style={{marginTop:8,fontSize:9,fontWeight:700,padding:'2px 7px',borderRadius:20,display:'inline-block',background:'rgba(239,68,68,.12)',color:'#ef4444',border:'1px solid rgba(239,68,68,.2)'}}>⚠️ At Risk</div>}
              </div>
            ))}
          </div>
        ):(
          <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',overflow:'hidden'}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead><tr style={{background:'var(--surface2)'}}>
                {['#','Student','Roll','Attendance','CGPA','Status'].map(h=><th key={h} style={{padding:'11px 16px',textAlign:'left',fontSize:11,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.5px',fontWeight:600}}>{h}</th>)}
              </tr></thead>
              <tbody>
                {filtered.map((s,i)=>(
                  <tr key={i} onClick={()=>setProfile(s)} style={{borderBottom:'1px solid rgba(31,48,80,.5)',cursor:'pointer'}}>
                    <td style={{padding:'12px 16px',fontSize:12,color:'var(--muted)'}}>{String(i+1).padStart(2,'0')}</td>
                    <td style={{padding:'12px 16px'}}><div style={{display:'flex',alignItems:'center',gap:9}}><div style={{width:28,height:28,borderRadius:7,background:s.color,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:800,color:'#fff'}}>{s.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div><span style={{fontSize:13,fontWeight:500}}>{s.name}</span></div></td>
                    <td style={{padding:'12px 16px',fontFamily:'monospace',fontSize:12,color:'var(--muted2)'}}>{s.roll}</td>
                    <td style={{padding:'12px 16px',fontFamily:"'Syne',sans-serif",fontWeight:700,color:s.att>=75?'#10b981':'#ef4444'}}>{s.att}%</td>
                    <td style={{padding:'12px 16px',fontFamily:"'Syne',sans-serif",fontWeight:700,color:'var(--t-accent)'}}>{s.cgpa}</td>
                    <td style={{padding:'12px 16px'}}><span style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:20,background:s.att<75?'rgba(239,68,68,.12)':'rgba(16,185,129,.12)',color:s.att<75?'#ef4444':'#10b981'}}>{s.att<75?'At Risk':'Good'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {profile&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',backdropFilter:'blur(7px)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:24}} onClick={()=>setProfile(null)}>
          <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:20,width:'100%',maxWidth:480,animation:'modalIn .3s cubic-bezier(.34,1.56,.64,1)'}} onClick={e=>e.stopPropagation()}>
            <div style={{padding:'20px 24px 18px',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800}}>Student Profile</div>
              <div onClick={()=>setProfile(null)} style={{cursor:'pointer',color:'var(--muted)',fontSize:20}}>✕</div>
            </div>
            <div style={{padding:'20px 24px 28px'}}>
              <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:22}}>
                <div style={{width:60,height:60,borderRadius:14,background:profile.color,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:'#fff'}}>{profile.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                <div><div style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:800}}>{profile.name}</div><div style={{fontSize:12,color:'var(--muted2)',marginTop:3}}>{profile.roll} · {SUBJECTS[aS].code}</div></div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:18}}>
                <div style={{background:'var(--surface2)',borderRadius:10,padding:14,textAlign:'center'}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:profile.att>=75?'#10b981':'#ef4444'}}>{profile.att}%</div><div style={{fontSize:10,color:'var(--muted)',marginTop:3}}>ATTENDANCE</div></div>
                <div style={{background:'var(--surface2)',borderRadius:10,padding:14,textAlign:'center'}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:'var(--t-accent)'}}>{profile.cgpa}</div><div style={{fontSize:10,color:'var(--muted)',marginTop:3}}>CGPA</div></div>
                <div style={{background:'var(--surface2)',borderRadius:10,padding:14,textAlign:'center'}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:'#22d3ee'}}>8/10</div><div style={{fontSize:10,color:'var(--muted)',marginTop:3}}>ASSIGNMENTS</div></div>
              </div>
              {profile.att<75&&<div style={{background:'rgba(239,68,68,.08)',border:'1px solid rgba(239,68,68,.2)',borderRadius:10,padding:'13px 15px',marginBottom:16,fontSize:13,color:'#ef4444'}}>⚠️ At-risk student with {profile.att}% attendance. Consider sending an alert.</div>}
              <button style={{width:'100%',padding:11,borderRadius:'var(--radius-sm)',background:'var(--t-accent)',color:'#fff',border:'none',fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,cursor:'pointer'}}>✉️ Send Attendance Alert</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
