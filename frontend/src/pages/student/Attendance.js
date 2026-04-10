import React, { useState, useEffect, useRef } from 'react';
import Topbar from '../../components/student/Topbar';

const SUBJECTS = [
  { code:'CS501', name:'Machine Learning',   classes:38, present:31, color:'#4f8ef7' },
  { code:'CS502', name:'Computer Networks',  classes:35, present:27, color:'#10b981' },
  { code:'CS604', name:'ML Lab',             classes:20, present:18, color:'#f59e0b' },
  { code:'CS606', name:'Deep Learning',      classes:36, present:28, color:'#ec4899' },
  { code:'CS606T',name:'DL Tutorial',        classes:18, present:13, color:'#22d3ee' },
];

const MONTHS = ['Jan','Feb','Mar'];
const HEAT = Array.from({length:31},(_,i)=>{
  const r=Math.random();
  return r<0.15?'absent':r<0.25?'late':'present';
});

export default function Attendance() {
  const [activeSubj, setActiveSubj] = useState(0);
  const donutRef = useRef();

  const subj = SUBJECTS[activeSubj];
  const pct = Math.round((subj.present/subj.classes)*100);
  const circ = 314;
  const dash = circ*(pct/100);

  useEffect(() => {
    if(donutRef.current) donutRef.current.style.strokeDashoffset = circ-dash;
  }, [activeSubj, dash]);

  const alertColor = pct < 65 ? '#ef4444' : pct < 75 ? '#f97316' : '#10b981';
  const alertMsg = pct < 65
    ? `⚠️ Critical! Need ${Math.ceil((0.75*subj.classes-subj.present)/(1-0.75))} more classes to reach 75%`
    : pct < 75
    ? `⚠️ Warning! Need ${Math.ceil((0.75*subj.classes-subj.present)/(1-0.75))} more classes to reach 75%`
    : `✅ Safe! You can miss ${Math.floor((subj.present-0.75*subj.classes)/(0.75))} more classes`;

  return (
    <div>
      <Topbar title="Attendance" subtitle="Semester 6 · Academic Year 2025–26"/>
      <div style={S.content}>

        {/* Subject tabs */}
        <div className="fade-up" style={S.tabs}>
          {SUBJECTS.map((s,i)=>(
            <div key={i} onClick={()=>setActiveSubj(i)} style={{
              ...S.tab,
              ...(i===activeSubj?{borderColor:s.color,background:s.color+'18',color:s.color}:{})
            }}>
              <span style={{width:8,height:8,borderRadius:'50%',background:s.color,display:'inline-block'}}/>
              {s.code}
            </div>
          ))}
        </div>

        {/* Alert banner */}
        <div className="fade-up1" style={{...S.alert,background:alertColor+'12',border:`1px solid ${alertColor}30`,color:alertColor}}>
          {alertMsg}
        </div>

        {/* Main layout */}
        <div className="fade-up2" style={S.mainLayout}>
          {/* Left - subject cards */}
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            {SUBJECTS.map((s,i)=>{
              const p=Math.round((s.present/s.classes)*100);
              const c=p>=75?'#10b981':p>=65?'#f97316':'#ef4444';
              return (
                <div key={i} onClick={()=>setActiveSubj(i)} style={{...S.subjCard,borderColor:i===activeSubj?s.color:'var(--border)',cursor:'pointer'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
                    <div>
                      <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700}}>{s.name}</div>
                      <div style={{fontSize:12,color:'var(--muted)',marginTop:2}}>{s.code} · {s.classes} classes held</div>
                    </div>
                    <div style={{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:c}}>{p}%</div>
                  </div>
                  <div style={{height:5,background:'var(--surface2)',borderRadius:10,overflow:'hidden'}}>
                    <AnimBar value={p} color={c}/>
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',marginTop:8,fontSize:11,color:'var(--muted)'}}>
                    <span>Present: <b style={{color:'#10b981'}}>{s.present}</b></span>
                    <span>Absent: <b style={{color:'#ef4444'}}>{s.classes-s.present}</b></span>
                    <span style={{color:c,fontWeight:600}}>{p<75?`Need ${Math.ceil((0.75*s.classes-s.present)/(1-0.75))} more`:`Can miss ${Math.floor((s.present-0.75*s.classes)/0.75)} more`}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right - donut + calendar */}
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            {/* Donut */}
            <div style={S.sideCard}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,marginBottom:16}}>Overall — {subj.code}</div>
              <div style={{position:'relative',width:140,height:140,margin:'0 auto 16px'}}>
                <svg width="140" height="140" viewBox="0 0 120 120" style={{transform:'rotate(-90deg)'}}>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="var(--surface2)" strokeWidth="12"/>
                  <circle ref={donutRef} cx="60" cy="60" r="50" fill="none"
                    stroke={alertColor} strokeWidth="12" strokeLinecap="round"
                    strokeDasharray={circ} strokeDashoffset={circ}
                    style={{transition:'stroke-dashoffset 1.2s cubic-bezier(.34,1.56,.64,1)'}}/>
                </svg>
                <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:alertColor}}>{pct}%</div>
                  <div style={{fontSize:10,color:'var(--muted)'}}>Attendance</div>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                <div style={{background:'rgba(16,185,129,.08)',borderRadius:8,padding:'10px',textAlign:'center'}}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:'#10b981'}}>{subj.present}</div>
                  <div style={{fontSize:10,color:'var(--muted)',marginTop:2}}>Present</div>
                </div>
                <div style={{background:'rgba(239,68,68,.08)',borderRadius:8,padding:'10px',textAlign:'center'}}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:'#ef4444'}}>{subj.classes-subj.present}</div>
                  <div style={{fontSize:10,color:'var(--muted)',marginTop:2}}>Absent</div>
                </div>
              </div>
            </div>

            {/* Monthly heatmap */}
            <div style={S.sideCard}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,marginBottom:14}}>March 2026 · Heatmap</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:4}}>
                {['M','T','W','T','F','S','S'].map((d,i)=><div key={i} style={{textAlign:'center',fontSize:9,color:'var(--muted)',paddingBottom:4}}>{d}</div>)}
                {HEAT.slice(0,31).map((h,i)=>(
                  <div key={i} title={`Mar ${i+1}`} style={{
                    height:22,borderRadius:5,cursor:'pointer',
                    background:h==='present'?'#10b981':h==='absent'?'#ef4444':'#f59e0b',
                    opacity:.7,
                  }}/>
                ))}
              </div>
              <div style={{display:'flex',gap:14,marginTop:12}}>
                {[{c:'#10b981',l:'Present'},{c:'#ef4444',l:'Absent'},{c:'#f59e0b',l:'Late'}].map(x=>(
                  <div key={x.l} style={{display:'flex',alignItems:'center',gap:5,fontSize:11,color:'var(--muted)'}}>
                    <div style={{width:10,height:10,borderRadius:3,background:x.c}}/>
                    {x.l}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimBar({value,color}){
  const ref=useRef();
  useEffect(()=>{setTimeout(()=>{if(ref.current)ref.current.style.width=value+'%';},200);},[value]);
  return <div ref={ref} style={{height:'100%',width:'0%',background:color,borderRadius:10,transition:'width .9s cubic-bezier(.34,1.56,.64,1)'}}/>;
}

const S={
  content:{padding:'26px 30px',display:'flex',flexDirection:'column',gap:20},
  tabs:{display:'flex',gap:10,flexWrap:'wrap'},
  tab:{display:'flex',alignItems:'center',gap:7,padding:'9px 16px',borderRadius:'var(--radius-sm)',border:'1px solid var(--border)',background:'var(--surface)',color:'var(--muted)',fontSize:13,fontWeight:500,cursor:'pointer',transition:'all .2s'},
  alert:{padding:'12px 18px',borderRadius:'var(--radius-sm)',fontSize:13,fontWeight:600},
  mainLayout:{display:'grid',gridTemplateColumns:'1fr 320px',gap:22},
  subjCard:{background:'var(--surface)',border:'1px solid',borderRadius:'var(--radius)',padding:18,transition:'border-color .2s'},
  sideCard:{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:18},
};
