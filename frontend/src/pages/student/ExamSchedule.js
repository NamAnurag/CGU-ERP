import React, { useState, useEffect } from 'react';
import Topbar from '../../components/student/Topbar';

const EXAMS = {
  'Mid-Term':[
    {subject:'Machine Learning',code:'CS501',date:'2026-04-10',time:'10:00 AM',hall:'EH-1',seat:'B-24',syllabus:['Regression','Classification','Clustering','Neural Net Basics']},
    {subject:'Deep Learning',code:'CS606',date:'2026-04-12',time:'2:00 PM',hall:'EH-2',seat:'C-15',syllabus:['Backpropagation','CNNs','RNNs','Attention']},
    {subject:'Computer Vision',code:'CS607',date:'2026-04-14',time:'10:00 AM',hall:'EH-3',seat:'A-31',syllabus:['Image Processing','Edge Detection','Feature Extraction']},
  ],
  'End-Term':[
    {subject:'Machine Learning',code:'CS501',date:'2026-05-05',time:'10:00 AM',hall:'EH-1',seat:'B-24',syllabus:['Full Syllabus']},
    {subject:'Deep Learning',code:'CS606',date:'2026-05-08',time:'2:00 PM',hall:'EH-2',seat:'C-15',syllabus:['Full Syllabus']},
    {subject:'Computer Vision',code:'CS607',date:'2026-05-11',time:'10:00 AM',hall:'EH-3',seat:'A-31',syllabus:['Full Syllabus']},
    {subject:'Computer Networks',code:'CS502',date:'2026-05-14',time:'10:00 AM',hall:'EH-1',seat:'B-24',syllabus:['Full Syllabus']},
  ],
  'Practical':[
    {subject:'ML Lab',code:'CS604',date:'2026-04-18',time:'9:00 AM',hall:'Lab-3',seat:'Batch B',syllabus:['Scikit-learn','TensorFlow Basics','Model Evaluation']},
  ],
};

function countdown(dateStr){
  const diff = new Date(dateStr+' 10:00') - new Date();
  if(diff<=0) return {d:0,h:0,m:0,s:0};
  const d=Math.floor(diff/(1000*60*60*24));
  const h=Math.floor((diff%(1000*60*60*24))/(1000*60*60));
  const m=Math.floor((diff%(1000*60*60))/(1000*60));
  const s=Math.floor((diff%(1000*60))/1000);
  return {d,h,m,s};
}

export default function ExamSchedule(){
  const [activeTab, setActiveTab] = useState('Mid-Term');
  const [detail, setDetail] = useState(null);
  const [checklist, setChecklist] = useState({});
  const [time, setTime] = useState(countdown('2026-04-10'));

  useEffect(()=>{const t=setInterval(()=>setTime(countdown('2026-04-10')),1000);return()=>clearInterval(t);},[]);

  const exams = EXAMS[activeTab]||[];
  const tabs = Object.keys(EXAMS);

  return(
    <div>
      <Topbar title="Exam Schedule" subtitle="Mid-Term · End-Term · Practical"/>
      <div style={S.content}>

        {/* Countdown hero */}
        <div className="fade-up" style={S.hero}>
          <div>
            <div style={{fontSize:12,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:6}}>Next Exam — ML Mid-Term</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800}}>Machine Learning · CS501</div>
            <div style={{fontSize:13,color:'var(--muted2)',marginTop:4}}>April 10, 2026 · 10:00 AM · EH-1 · Seat B-24</div>
          </div>
          <div style={S.countdown}>
            {[{v:time.d,l:'Days'},{v:time.h,l:'Hrs'},{v:time.m,l:'Min'},{v:time.s,l:'Sec'}].map(({v,l})=>(
              <div key={l} style={S.cdUnit}>
                <div style={S.cdVal}>{String(v).padStart(2,'0')}</div>
                <div style={S.cdLbl}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="fade-up1" style={S.tabs}>
          {tabs.map(t=>(
            <div key={t} onClick={()=>setActiveTab(t)} style={{...S.tab,...(t===activeTab?S.tabActive:{})}}>{t}</div>
          ))}
        </div>

        {/* Exam cards */}
        <div className="fade-up2" style={{display:'flex',flexDirection:'column',gap:12}}>
          {exams.map((e,i)=>{
            const daysLeft=Math.ceil((new Date(e.date)-new Date('2026-03-26'))/(1000*60*60*24));
            const urgColor=daysLeft<=7?'#ef4444':daysLeft<=14?'#f97316':'#4f8ef7';
            return(
              <div key={i} onClick={()=>setDetail(e)} style={{...S.examCard,cursor:'pointer',borderLeft:`4px solid ${urgColor}`}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:16}}>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700}}>{e.subject}</div>
                    <div style={{fontSize:12,color:'var(--muted)',marginTop:3}}>{e.code} · Hall: {e.hall} · Seat: {e.seat}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700}}>{new Date(e.date).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}</div>
                    <div style={{fontSize:12,color:'var(--muted)',marginTop:2}}>{e.time}</div>
                  </div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:800,padding:'6px 14px',borderRadius:20,background:urgColor+'18',color:urgColor,flexShrink:0}}>
                    {daysLeft}d left
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail modal */}
      {detail&&(
        <div style={S.overlay} onClick={()=>setDetail(null)}>
          <div style={S.modal} onClick={e=>e.stopPropagation()}>
            <div style={S.modalHead}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800}}>{detail.subject} — {activeTab}</div>
              <div onClick={()=>setDetail(null)} style={{cursor:'pointer',color:'var(--muted)',fontSize:20}}>✕</div>
            </div>
            <div style={{padding:'20px 24px 28px'}}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:20}}>
                {[{l:'Date',v:new Date(detail.date).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'})},{l:'Time',v:detail.time},{l:'Hall',v:detail.hall},{l:'Seat No.',v:detail.seat}].map(r=>(
                  <div key={r.l} style={{background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',padding:'12px 14px'}}>
                    <div style={{fontSize:10,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:4}}>{r.l}</div>
                    <div style={{fontSize:14,fontWeight:600}}>{r.v}</div>
                  </div>
                ))}
              </div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,marginBottom:10}}>Syllabus Checklist</div>
              {detail.syllabus.map((u,i)=>{
                const key=`${detail.code}-${i}`;
                return(
                  <div key={i} onClick={()=>setChecklist(p=>({...p,[key]:!p[key]}))}
                    style={{display:'flex',alignItems:'center',gap:12,padding:'11px 14px',background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',marginBottom:8,cursor:'pointer',opacity:checklist[key]?.6:1}}>
                    <div style={{width:20,height:20,borderRadius:5,border:'2px solid',borderColor:checklist[key]?'#10b981':'var(--border)',background:checklist[key]?'#10b981':'transparent',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:11,fontWeight:700,flexShrink:0}}>
                      {checklist[key]?'✓':''}
                    </div>
                    <span style={{fontSize:13,textDecoration:checklist[key]?'line-through':'none',color:checklist[key]?'var(--muted)':'inherit'}}>{u}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const S={
  content:{padding:'26px 30px',display:'flex',flexDirection:'column',gap:20},
  hero:{background:'linear-gradient(135deg,#0d1f3c,#0f2a4a)',border:'1px solid rgba(79,142,247,.3)',borderRadius:'var(--radius)',padding:'24px 28px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:20},
  countdown:{display:'flex',gap:12},
  cdUnit:{textAlign:'center',background:'rgba(79,142,247,.12)',border:'1px solid rgba(79,142,247,.2)',borderRadius:10,padding:'12px 16px',minWidth:64},
  cdVal:{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:'var(--accent)'},
  cdLbl:{fontSize:10,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.5px',marginTop:2},
  tabs:{display:'flex',gap:8},
  tab:{padding:'9px 18px',borderRadius:'var(--radius-sm)',border:'1px solid var(--border)',background:'var(--surface)',color:'var(--muted)',fontSize:13,fontWeight:500,cursor:'pointer',transition:'all .2s'},
  tabActive:{background:'rgba(79,142,247,.12)',borderColor:'rgba(79,142,247,.4)',color:'var(--accent)'},
  examCard:{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'16px 20px',transition:'transform .2s,box-shadow .2s'},
  overlay:{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',backdropFilter:'blur(7px)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:24},
  modal:{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:20,width:'100%',maxWidth:520,maxHeight:'88vh',overflowY:'auto',animation:'modalIn .3s cubic-bezier(.34,1.56,.64,1)'},
  modalHead:{padding:'20px 24px 18px',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center'},
};
