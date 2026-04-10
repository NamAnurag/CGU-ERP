import React, { useState, useEffect, useRef } from 'react';
import Topbar from '../../components/teacher/Topbar';

const SUBJECTS=[{code:'CS501',name:'Machine Learning',color:'#6366f1',n:62},{code:'CS604',name:'ML Lab',color:'#f59e0b',n:58},{code:'CS606',name:'Deep Learning',color:'#ec4899',n:58}];
const EXAM_TYPES=['Internal','Mid-Term','End-Term'];
const NAMES=['Riya Sharma','Arjun Mehta','Priya Patel','Rohit Kumar','Sneha Das','Vikram Singh','Anjali Nair','Kiran Rao','Deepak Jha','Pooja Mishra','Aditya Verma','Neha Gupta','Saurabh Yadav','Kavya Reddy','Manish Tiwari','Isha Kapoor','Rahul Sinha','Simran Kaur','Nikhil Bose','Tanvi Desai'];
const COLORS=['#6366f1','#22d3ee','#10b981','#f59e0b','#ec4899','#f97316'];
const GC={'O':'#10b981','A+':'#6366f1','A':'#22d3ee','B+':'#f59e0b','B':'#f97316','C':'#ec4899','F':'#ef4444'};
function grade(m,max){if(!m&&m!==0)return'–';const p=m/max*100;if(p>=90)return'O';if(p>=80)return'A+';if(p>=70)return'A';if(p>=60)return'B+';if(p>=50)return'B';if(p>=40)return'C';return'F';}
function genData(n,et){const maxMap={Internal:40,'Mid-Term':30,'End-Term':70};const max=maxMap[et]||40;return Array.from({length:Math.min(n,20)},(_,i)=>({id:i+1,name:NAMES[i%NAMES.length],roll:'22CS0'+String(i+101).padStart(3,'0'),color:COLORS[i%COLORS.length],marks:et==='End-Term'?null:Math.floor(Math.random()*(max*.6))+Math.floor(max*.4),max}));}

export default function TeacherMarks(){
  const [aS,setAS]=useState(0);const [aE,setAE]=useState(0);
  const [data,setData]=useState(()=>{const d={};SUBJECTS.forEach(s=>{d[s.code]={};EXAM_TYPES.forEach(e=>{d[s.code][e]=genData(s.n,e);});});return d;});
  const [unsaved,setUnsaved]=useState(false);const [toast,setToast]=useState('');

  const cur=data[SUBJECTS[aS].code][EXAM_TYPES[aE]];
  const filled=cur.filter(x=>x.marks!==null&&x.marks!==undefined);
  const avg=filled.length?Math.round(filled.reduce((a,x)=>a+x.marks,0)/filled.length):0;
  const mx=filled.length?Math.max(...filled.map(x=>x.marks)):0;
  const mn=filled.length?Math.min(...filled.map(x=>x.marks)):0;

  const updateMark=(id,val)=>{
    setData(prev=>{const d=JSON.parse(JSON.stringify(prev));const idx=d[SUBJECTS[aS].code][EXAM_TYPES[aE]].findIndex(x=>x.id===id);if(idx>-1)d[SUBJECTS[aS].code][EXAM_TYPES[aE]][idx].marks=val===''?null:Math.min(parseInt(val)||0,cur[0]?.max||40);return d;});
    setUnsaved(true);
  };
  const save=()=>{setUnsaved(false);setToast('✓ Marks saved!');setTimeout(()=>setToast(''),3000);};

  const grades=['O','A+','A','B+','B','C','F'];
  const gradeCount={};grades.forEach(g=>gradeCount[g]=0);filled.forEach(x=>{const g=grade(x.marks,x.max);if(g in gradeCount)gradeCount[g]++;});
  const maxC=Math.max(...Object.values(gradeCount),1);

  return(
    <div>
      <Topbar title="Marks & Grading" subtitle="Enter marks · Auto-compute grades and ranks"/>
      <div style={{padding:'26px 30px',display:'flex',flexDirection:'column',gap:18}}>
        <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
          {SUBJECTS.map((s,i)=><div key={i} onClick={()=>setAS(i)} style={{padding:'9px 16px',borderRadius:'var(--radius-sm)',border:`1px solid ${i===aS?s.color:'var(--border)'}`,background:i===aS?s.color+'14':'var(--surface)',color:i===aS?s.color:'var(--muted)',fontSize:13,fontWeight:500,cursor:'pointer'}}>{s.code} — {s.name}</div>)}
        </div>
        <div style={{display:'flex',gap:10}}>
          {EXAM_TYPES.map((e,i)=><div key={i} onClick={()=>setAE(i)} style={{padding:'9px 16px',borderRadius:'var(--radius-sm)',border:'1px solid var(--border)',background:i===aE?'rgba(99,102,241,.12)':'var(--surface)',color:i===aE?'var(--t-accent)':'var(--muted)',fontSize:13,fontWeight:500,cursor:'pointer',borderColor:i===aE?'rgba(99,102,241,.4)':'var(--border)'}}>{e}</div>)}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:14}}>
          {[{l:'Entered',v:`${filled.length}/${cur.length}`},{l:'Avg',v:avg,c:'#10b981'},{l:'Highest',v:mx,c:'#6366f1'},{l:'Lowest',v:mn||'–',c:'#ef4444'},{l:'Passing',v:filled.filter(x=>(x.marks/x.max*100)>=40).length,c:'#f59e0b'}].map(s=>(
            <div key={s.l} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'14px 16px',textAlign:'center'}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:s.c||'var(--text)'}}>{s.v}</div>
              <div style={{fontSize:10,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.4px',marginTop:3}}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:20}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,marginBottom:14}}>Grade Distribution</div>
          <div style={{display:'flex',gap:8,alignItems:'flex-end',height:72}}>
            {grades.map(g=>(
              <div key={g} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:700,color:GC[g]}}>{gradeCount[g]}</div>
                <div style={{width:'100%',background:GC[g],borderRadius:'4px 4px 0 0',height:Math.round((gradeCount[g]/maxC)*60)+'px',transition:'height .8s'}}/>
                <div style={{fontSize:10,color:'var(--muted)'}}>{g}</div>
              </div>
            ))}
          </div>
        </div>
        {unsaved&&<div style={{background:'var(--t-accent)',color:'#fff',padding:'12px 20px',borderRadius:'var(--radius-sm)',display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:13,fontWeight:600}}>
          <span>⚠️ You have unsaved changes</span>
          <button onClick={save} style={{background:'#fff',color:'var(--t-accent)',border:'none',padding:'6px 16px',borderRadius:8,fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,cursor:'pointer'}}>Save Now</button>
        </div>}
        <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',overflow:'hidden'}}>
          <div style={{padding:'12px 18px',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{fontSize:13,color:'var(--muted2)'}}>{SUBJECTS[aS].code} · {EXAM_TYPES[aE]} · Max: {cur[0]?.max||0}</div>
            <button onClick={save} style={{padding:'7px 16px',borderRadius:8,background:'var(--t-accent)',color:'#fff',border:'none',fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,cursor:'pointer'}}>Save All</button>
          </div>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead><tr style={{background:'var(--surface2)'}}>
                {['#','Student','Roll','Marks','%','Grade','Rank'].map(h=><th key={h} style={{padding:'11px 16px',textAlign:'left',fontSize:11,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.5px',fontWeight:600}}>{h}</th>)}
              </tr></thead>
              <tbody>
                {cur.map((x,i)=>{const g=grade(x.marks,x.max);const gc=GC[g]||'var(--muted)';const pct=x.marks!=null?Math.round(x.marks/x.max*100):null;const rc=i===0?'#f59e0b':i===1?'#8aa0be':i===2?'#f97316':'var(--muted)';
                  return(<tr key={i} style={{borderBottom:'1px solid rgba(31,48,80,.5)'}}>
                    <td style={{padding:'12px 16px',fontSize:12,color:'var(--muted)'}}>{String(i+1).padStart(2,'0')}</td>
                    <td style={{padding:'12px 16px'}}><div style={{display:'flex',alignItems:'center',gap:9}}><div style={{width:28,height:28,borderRadius:7,background:x.color,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Syne',sans-serif",fontSize:10,fontWeight:800,color:'#fff',flexShrink:0}}>{x.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div><span style={{fontSize:13,fontWeight:500}}>{x.name}</span></div></td>
                    <td style={{padding:'12px 16px',fontFamily:'monospace',fontSize:12,color:'var(--muted2)'}}>{x.roll}</td>
                    <td style={{padding:'12px 16px',textAlign:'center'}}><input type="number" min="0" max={x.max} value={x.marks??''} placeholder="–" onChange={e=>updateMark(x.id,e.target.value)} style={{width:60,background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:7,color:'var(--text)',fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,padding:'5px 8px',textAlign:'center',outline:'none'}}/></td>
                    <td style={{padding:'12px 16px',textAlign:'center',fontFamily:"'Syne',sans-serif",fontWeight:700,color:pct>=75?'#10b981':pct>=50?'#f59e0b':pct!=null?'#ef4444':'var(--muted)'}}>{pct!=null?pct+'%':'–'}</td>
                    <td style={{padding:'12px 16px',textAlign:'center'}}><div style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:32,height:32,borderRadius:8,background:gc+'18',color:gc,fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:800,padding:'0 8px'}}>{g}</div></td>
                    <td style={{padding:'12px 16px',textAlign:'center'}}><div style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:26,height:26,borderRadius:6,background:rc+'18',color:rc,fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:800}}>#{i+1}</div></td>
                  </tr>);
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {toast&&<div style={{position:'fixed',bottom:28,right:28,background:'#10b981',color:'#fff',padding:'12px 20px',borderRadius:'var(--radius-sm)',fontSize:13,fontWeight:600,boxShadow:'0 8px 28px rgba(0,0,0,.3)',zIndex:999}}>{toast}</div>}
    </div>
  );
}
