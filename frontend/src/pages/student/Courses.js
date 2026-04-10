import React, { useState } from 'react';
import Topbar from '../../components/student/Topbar';

const SEMS = [
  { sem:6, sgpa:null, courses:[
    {name:'Machine Learning',code:'CS501',credits:4,units:['Introduction to ML','Regression Models','Classification','Clustering','Neural Networks'],progress:72,color:'#4f8ef7'},
    {name:'Deep Learning',code:'CS606',credits:4,units:['Neural Nets','CNNs','RNNs','Transformers','GANs'],progress:58,color:'#ec4899'},
    {name:'ML Lab',code:'CS604',credits:2,units:['Lab 1: Python ML','Lab 2: Scikit-learn','Lab 3: TensorFlow','Lab 4: PyTorch'],progress:85,color:'#f59e0b'},
    {name:'Computer Vision',code:'CS607',credits:4,units:['Image Processing','Feature Extraction','Object Detection','Segmentation'],progress:45,color:'#10b981'},
  ]},
  { sem:5, sgpa:8.9, courses:[
    {name:'Computer Networks',code:'CS502',credits:4,units:['Intro to Networks','TCP/IP','Routing','Security'],progress:100,color:'#10b981'},
    {name:'Cloud Computing',code:'CS503',credits:4,units:['Cloud Basics','AWS','Docker','Kubernetes'],progress:100,color:'#22d3ee'},
    {name:'Web Technologies',code:'CS504',credits:4,units:['HTML/CSS','JavaScript','React','Node.js'],progress:100,color:'#f97316'},
  ]},
  { sem:4, sgpa:8.7, courses:[
    {name:'Operating Systems',code:'CS401',credits:4,units:['Processes','Memory','File Systems','Security'],progress:100,color:'#6366f1'},
    {name:'Algorithm Design',code:'CS403',credits:4,units:['Complexity','DP','Graphs','NP'],progress:100,color:'#ec4899'},
  ]},
];

const STATUS_COLORS = ['#10b981','#4f8ef7','#f59e0b','#ec4899'];

export default function Courses() {
  const [activeSem, setActiveSem] = useState(0);
  const [detail, setDetail] = useState(null);
  const sem = SEMS[activeSem];

  return (
    <div>
      <Topbar title="Courses" subtitle="All semesters · Syllabus & resources"/>
      <div style={S.content}>

        {/* Sem tabs */}
        <div className="fade-up" style={S.tabs}>
          {SEMS.map((s,i)=>(
            <div key={i} onClick={()=>setActiveSem(i)} style={{...S.tab,...(i===activeSem?S.tabActive:{})}}>
              Sem {s.sem} {s.sgpa?`· SGPA ${s.sgpa}`:' · Current'}
            </div>
          ))}
        </div>

        {/* Course cards */}
        <div className="fade-up1" style={S.grid}>
          {sem.courses.map((c,i)=>(
            <div key={i} onClick={()=>setDetail(c)} style={S.courseCard}>
              <div style={{height:3,background:c.color,borderRadius:'var(--radius) var(--radius) 0 0'}}/>
              <div style={{padding:'18px 20px'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
                  <div>
                    <div style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700}}>{c.name}</div>
                    <div style={{fontSize:12,color:'var(--muted)',marginTop:3}}>{c.code} · {c.credits} Credits</div>
                  </div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:c.color}}>{c.progress}%</div>
                </div>
                <div style={{height:5,background:'var(--surface2)',borderRadius:10,overflow:'hidden',marginBottom:12}}>
                  <div style={{height:'100%',width:c.progress+'%',background:c.color,borderRadius:10,transition:'width .9s'}}/>
                </div>
                <div style={{fontSize:12,color:'var(--muted2)'}}>
                  {c.units.length} Units · Click to view syllabus
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {detail && (
        <div style={S.overlay} onClick={()=>setDetail(null)}>
          <div style={S.modal} onClick={e=>e.stopPropagation()}>
            <div style={{height:4,background:detail.color}}/>
            <div style={S.modalHead}>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:800}}>{detail.name}</div>
                <div style={{fontSize:12,color:'var(--muted)',marginTop:3}}>{detail.code} · {detail.credits} Credits</div>
              </div>
              <div onClick={()=>setDetail(null)} style={{cursor:'pointer',color:'var(--muted)',fontSize:20}}>✕</div>
            </div>
            <div style={{padding:'20px 24px 28px'}}>
              <div style={{marginBottom:18}}>
                <div style={{fontSize:11,fontWeight:700,color:'var(--muted2)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:10}}>Syllabus Units</div>
                {detail.units.map((u,i)=>{
                  const stat = detail.progress>=100?'completed':i<Math.floor(detail.units.length*(detail.progress/100))?'completed':i===Math.floor(detail.units.length*(detail.progress/100))?'in-progress':'pending';
                  const sc = stat==='completed'?'#10b981':stat==='in-progress'?'#f59e0b':'#5a7090';
                  return (
                    <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'11px 14px',background:'var(--surface2)',borderRadius:'var(--radius-sm)',border:'1px solid var(--border)',marginBottom:8}}>
                      <div style={{width:26,height:26,borderRadius:7,background:sc+'18',border:`1px solid ${sc}30`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:sc,flexShrink:0}}>
                        {stat==='completed'?'✓':stat==='in-progress'?'►':i+1}
                      </div>
                      <div style={{flex:1,fontSize:13,fontWeight:500}}>Unit {i+1}: {u}</div>
                      <span style={{fontSize:10,fontWeight:600,padding:'3px 8px',borderRadius:20,background:sc+'12',color:sc}}>{stat==='in-progress'?'In Progress':stat.charAt(0).toUpperCase()+stat.slice(1)}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{marginTop:4}}>
                <div style={{fontSize:11,fontWeight:700,color:'var(--muted2)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:10}}>Study Resources</div>
                {['Lecture Slides — Unit 1-3','Reference Book: Pattern Recognition (Bishop)','Lab Manual PDF','Previous Year Papers'].map((r,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',background:'var(--surface2)',borderRadius:'var(--radius-sm)',border:'1px solid var(--border)',marginBottom:8,cursor:'pointer'}}>
                    <span style={{fontSize:16}}>📄</span>
                    <span style={{fontSize:13,flex:1}}>{r}</span>
                    <span style={{fontSize:11,color:'var(--accent)'}}>Download</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const S={
  content:{padding:'26px 30px',display:'flex',flexDirection:'column',gap:20},
  tabs:{display:'flex',gap:8,flexWrap:'wrap'},
  tab:{padding:'9px 18px',borderRadius:'var(--radius-sm)',border:'1px solid var(--border)',background:'var(--surface)',color:'var(--muted)',fontSize:13,fontWeight:500,cursor:'pointer',transition:'all .2s'},
  tabActive:{background:'rgba(79,142,247,.12)',borderColor:'rgba(79,142,247,.4)',color:'var(--accent)'},
  grid:{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16},
  courseCard:{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',overflow:'hidden',cursor:'pointer',transition:'transform .2s,box-shadow .2s'},
  overlay:{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',backdropFilter:'blur(7px)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:24},
  modal:{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:20,width:'100%',maxWidth:560,maxHeight:'88vh',overflowY:'auto',animation:'modalIn .3s cubic-bezier(.34,1.56,.64,1)'},
  modalHead:{padding:'20px 24px 18px',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'flex-start'},
};
