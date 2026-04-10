import React, { useState, useEffect, useRef } from 'react';
import Topbar from '../../components/student/Topbar';

const SEMESTERS = [
  { sem:1, sgpa:7.8, credits:24, courses:[{name:'Engineering Maths-I',code:'MA101',int:38,ext:62,total:100,grade:'A',gp:8},{name:'Engineering Physics',code:'PH101',int:35,ext:58,total:93,grade:'A',gp:8},{name:'Programming in C',code:'CS101',int:40,ext:65,total:105,grade:'O',gp:10},{name:'Basic Electronics',code:'EC101',int:34,ext:55,total:89,grade:'B+',gp:7}]},
  { sem:2, sgpa:8.1, credits:24, courses:[{name:'Engineering Maths-II',code:'MA102',int:37,ext:60,total:97,grade:'A',gp:8},{name:'Data Structures',code:'CS201',int:40,ext:68,total:108,grade:'O',gp:10},{name:'Digital Logic',code:'EC201',int:36,ext:59,total:95,grade:'A',gp:8},{name:'Communication Skills',code:'HS201',int:38,ext:56,total:94,grade:'A',gp:8}]},
  { sem:3, sgpa:8.4, credits:26, courses:[{name:'Discrete Mathematics',code:'MA301',int:39,ext:66,total:105,grade:'O',gp:10},{name:'OOP with Java',code:'CS301',int:40,ext:70,total:110,grade:'O',gp:10},{name:'Computer Org.',code:'CS302',int:37,ext:61,total:98,grade:'A',gp:8},{name:'DBMS',code:'CS303',int:38,ext:63,total:101,grade:'A+',gp:9}]},
  { sem:4, sgpa:8.7, credits:26, courses:[{name:'Operating Systems',code:'CS401',int:39,ext:68,total:107,grade:'O',gp:10},{name:'Computer Networks',code:'CS402',int:37,ext:62,total:99,grade:'A',gp:8},{name:'Algorithm Design',code:'CS403',int:40,ext:70,total:110,grade:'O',gp:10},{name:'Software Engg.',code:'CS404',int:38,ext:65,total:103,grade:'A+',gp:9}]},
  { sem:5, sgpa:8.9, credits:26, courses:[{name:'Machine Learning',code:'CS501',int:40,ext:69,total:109,grade:'O',gp:10},{name:'Computer Networks',code:'CS502',int:38,ext:63,total:101,grade:'A+',gp:9},{name:'Cloud Computing',code:'CS503',int:37,ext:61,total:98,grade:'A',gp:8},{name:'Web Technologies',code:'CS504',int:39,ext:66,total:105,grade:'O',gp:10}]},
  { sem:6, sgpa:null, credits:0, courses:[{name:'Deep Learning',code:'CS606',int:38,ext:null,total:null,grade:'—',gp:null},{name:'ML Lab',code:'CS604',int:40,ext:null,total:null,grade:'—',gp:null},{name:'Computer Vision',code:'CS607',int:37,ext:null,total:null,grade:'—',gp:null}]},
];

const SGPA_DATA = [7.8,8.1,8.4,8.7,8.9];
const GRADE_COLOR = {O:'#10b981','A+':'#4f8ef7',A:'#22d3ee','B+':'#f59e0b',B:'#f97316',C:'#ec4899','—':'#5a7090'};

export default function Results() {
  const [activeSem, setActiveSem] = useState(4);
  const [view, setView] = useState('marksheet');
  const barsRef = useRef([]);

  useEffect(()=>{
    setTimeout(()=>{barsRef.current.forEach((el,i)=>{if(el)el.style.height=((SGPA_DATA[i]-6)/(10-6)*100)+'%';});},400);
  },[]);

  const sem = SEMESTERS[activeSem];

  return (
    <div>
      <Topbar title="Results" subtitle="Academic performance · All semesters"/>
      <div style={S.content}>

        {/* Hero */}
        <div className="fade-up" style={S.hero}>
          <div style={S.heroLeft}>
            <div style={S.heroLabel}>Cumulative GPA</div>
            <div style={S.heroVal}>8.6</div>
            <div style={S.heroSub}>Based on 5 completed semesters</div>
            <div style={{display:'flex',gap:14,marginTop:16}}>
              <div style={S.heroBadge}><span style={{color:'var(--accent)'}}>🏆</span> Class Rank #12 / 120</div>
              <div style={S.heroBadge}><span style={{color:'var(--green)'}}>✅</span> 126 Credits Earned</div>
            </div>
          </div>
          {/* Mini SGPA bar chart */}
          <div style={S.heroChart}>
            <div style={{fontSize:12,color:'var(--muted)',marginBottom:12}}>SGPA Trend</div>
            <div style={{display:'flex',gap:10,alignItems:'flex-end',height:80}}>
              {SGPA_DATA.map((v,i)=>(
                <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                  <div style={{fontSize:10,fontWeight:700,color:'var(--accent)'}}>{v}</div>
                  <div style={{width:'100%',background:'var(--surface2)',borderRadius:'4px 4px 0 0',overflow:'hidden',height:60,display:'flex',alignItems:'flex-end'}}>
                    <div ref={el=>barsRef.current[i]=el} style={{width:'100%',height:'0%',background:'linear-gradient(to top,var(--accent),var(--accent2))',borderRadius:'4px 4px 0 0',transition:`height .8s cubic-bezier(.34,1.56,.64,1) ${i*0.1}s`}}/>
                  </div>
                  <div style={{fontSize:10,color:'var(--muted)'}}>S{i+1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sem tabs */}
        <div className="fade-up1" style={S.tabs}>
          {SEMESTERS.map((s,i)=>(
            <div key={i} onClick={()=>setActiveSem(i)} style={{...S.tab,...(i===activeSem?S.tabActive:{})}}>
              Sem {s.sem} {s.sgpa?`· ${s.sgpa}`:' · Current'}
            </div>
          ))}
        </div>

        {/* View toggle */}
        <div className="fade-up2" style={{display:'flex',gap:8,marginBottom:4}}>
          {['marksheet','cards'].map(v=>(
            <div key={v} onClick={()=>setView(v)} style={{padding:'8px 18px',borderRadius:'var(--radius-sm)',border:'1px solid var(--border)',fontSize:13,fontWeight:500,cursor:'pointer',background:view===v?'var(--accent)':'var(--surface)',color:view===v?'#fff':'var(--muted2)',transition:'all .2s'}}>
              {v==='marksheet'?'📋 Marksheet':'🃏 Card View'}
            </div>
          ))}
          {sem.sgpa && <button style={S.downloadBtn}>⬇ Download Transcript</button>}
        </div>

        {/* Content */}
        <div className="fade-up3">
          {view==='marksheet' ? (
            <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',overflow:'hidden'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{background:'var(--surface2)'}}>
                    {['Subject','Code','Internal','External','Total','Grade','GP'].map(h=>(
                      <th key={h} style={S.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sem.courses.map((c,i)=>(
                    <tr key={i} style={{borderBottom:'1px solid rgba(31,48,80,.5)'}}>
                      <td style={S.td}>{c.name}</td>
                      <td style={{...S.td,fontFamily:'monospace',fontSize:12,color:'var(--muted2)'}}>{c.code}</td>
                      <td style={{...S.td,textAlign:'center'}}>{c.int}</td>
                      <td style={{...S.td,textAlign:'center',color:c.ext?'inherit':'var(--muted)'}}>{c.ext??'—'}</td>
                      <td style={{...S.td,textAlign:'center',fontFamily:"'Syne',sans-serif",fontWeight:700}}>{c.total??'—'}</td>
                      <td style={{...S.td,textAlign:'center'}}>
                        <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',minWidth:36,height:28,borderRadius:8,background:(GRADE_COLOR[c.grade]||'var(--muted)')+'18',color:GRADE_COLOR[c.grade]||'var(--muted)',fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:800,padding:'0 8px'}}>{c.grade}</span>
                      </td>
                      <td style={{...S.td,textAlign:'center',fontFamily:"'Syne',sans-serif",fontWeight:700,color:c.gp?'var(--accent)':'var(--muted)'}}>{c.gp??'—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {sem.sgpa && (
                <div style={{padding:'14px 18px',background:'var(--surface2)',borderTop:'1px solid var(--border)',display:'flex',gap:24}}>
                  <span style={{fontSize:13}}>SGPA: <b style={{color:'var(--accent)',fontFamily:"'Syne',sans-serif",fontSize:15}}>{sem.sgpa}</b></span>
                  <span style={{fontSize:13}}>Credits: <b style={{color:'var(--green)'}}>{sem.credits}</b></span>
                </div>
              )}
            </div>
          ):(
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
              {sem.courses.map((c,i)=>(
                <div key={i} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:20,borderTop:`3px solid ${GRADE_COLOR[c.grade]||'var(--muted)'}`}}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,marginBottom:4}}>{c.name}</div>
                  <div style={{fontSize:12,color:'var(--muted)',marginBottom:14}}>{c.code}</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:48,fontWeight:800,color:GRADE_COLOR[c.grade]||'var(--muted)',textAlign:'center',margin:'8px 0'}}>{c.grade}</div>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'var(--muted2)'}}>
                    <span>Total: <b style={{color:'var(--text)'}}>{c.total??'—'}</b></span>
                    <span>GP: <b style={{color:'var(--accent)'}}>{c.gp??'—'}</b></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const S={
  content:{padding:'26px 30px',display:'flex',flexDirection:'column',gap:20},
  hero:{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'24px 28px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:24},
  heroLeft:{flex:1},
  heroLabel:{fontSize:11,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:6},
  heroVal:{fontFamily:"'Syne',sans-serif",fontSize:56,fontWeight:800,color:'var(--accent)',lineHeight:1},
  heroSub:{fontSize:13,color:'var(--muted2)',marginTop:6},
  heroBadge:{background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:20,padding:'6px 14px',fontSize:12,fontWeight:600},
  heroChart:{background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',padding:'16px 20px',minWidth:260},
  tabs:{display:'flex',gap:8,flexWrap:'wrap'},
  tab:{padding:'8px 16px',borderRadius:'var(--radius-sm)',border:'1px solid var(--border)',background:'var(--surface)',color:'var(--muted)',fontSize:12,fontWeight:500,cursor:'pointer',transition:'all .2s'},
  tabActive:{background:'rgba(79,142,247,.12)',borderColor:'rgba(79,142,247,.4)',color:'var(--accent)'},
  th:{padding:'11px 16px',textAlign:'left',fontSize:11,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.5px',fontWeight:600},
  td:{padding:'12px 16px',fontSize:13},
  downloadBtn:{marginLeft:'auto',padding:'8px 18px',borderRadius:'var(--radius-sm)',background:'rgba(16,185,129,.12)',border:'1px solid rgba(16,185,129,.25)',color:'var(--green)',fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,cursor:'pointer'},
};
