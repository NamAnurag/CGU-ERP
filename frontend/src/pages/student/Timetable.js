import React, { useState } from 'react';
import Topbar from '../../components/student/Topbar';

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat'];
const DATES = ['Mar 23','Mar 24','Mar 25','Mar 26','Mar 27','Mar 28'];
const SLOTS = ['8:00','9:00','10:00','11:00','12:00','1:00','2:00','3:00','4:00'];
const COLOR = {Theory:'#4f8ef7',Lab:'#f59e0b',Tutorial:'#22d3ee',Elective:'#ec4899'};

const SCHEDULE = {
  Mon:[
    {slot:'8:00',name:'Machine Learning',code:'CS501',room:'LH-205',type:'Theory'},
    {slot:'10:00',name:'Deep Learning',code:'CS606',room:'LH-205',type:'Theory'},
    {slot:'2:00',name:'Computer Vision',code:'CS607',room:'LH-301',type:'Theory'},
  ],
  Tue:[
    {slot:'9:00',name:'ML Lab',code:'CS604',room:'Lab-3',type:'Lab'},
    {slot:'11:00',name:'DL Tutorial',code:'CS606T',room:'SR-10',type:'Tutorial'},
    {slot:'3:00',name:'Computer Vision',code:'CS607',room:'LH-301',type:'Theory'},
  ],
  Wed:[
    {slot:'8:00',name:'Machine Learning',code:'CS501',room:'LH-205',type:'Theory'},
    {slot:'10:00',name:'Deep Learning',code:'CS606',room:'LH-205',type:'Theory'},
    {slot:'2:00',name:'Open Elective',code:'OE-01',room:'LH-102',type:'Elective'},
  ],
  Thu:[
    {slot:'8:00',name:'Machine Learning',code:'CS501',room:'LH-205',type:'Theory'},
    {slot:'10:00',name:'Deep Learning',code:'CS606',room:'LH-205',type:'Theory'},
    {slot:'12:00',name:'ML Lab',code:'CS604',room:'Lab-3',type:'Lab'},
    {slot:'3:00',name:'DL Tutorial',code:'CS606T',room:'SR-10',type:'Tutorial'},
  ],
  Fri:[
    {slot:'9:00',name:'Computer Vision',code:'CS607',room:'LH-301',type:'Theory'},
    {slot:'11:00',name:'Machine Learning',code:'CS501',room:'LH-205',type:'Theory'},
    {slot:'2:00',name:'Open Elective',code:'OE-01',room:'LH-102',type:'Elective'},
  ],
  Sat:[
    {slot:'9:00',name:'ML Lab',code:'CS604',room:'Lab-3',type:'Lab'},
    {slot:'11:00',name:'Deep Learning',code:'CS606',room:'LH-205',type:'Theory'},
  ],
};

const TODAY_IDX = 3; // Thursday

export default function Timetable() {
  const [view, setView] = useState('week');
  const [activeDay, setActiveDay] = useState(TODAY_IDX);

  const todaySlots = SCHEDULE[DAYS[activeDay]] || [];

  return (
    <div>
      <Topbar title="Timetable" subtitle="B.Tech CSE Sem 6 · 2025–26"/>
      <div style={S.content}>

        {/* View toggle + day strip */}
        <div className="fade-up" style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
          <div style={S.dayStrip}>
            {DAYS.map((d,i)=>(
              <div key={i} onClick={()=>setActiveDay(i)} style={{...S.dayItem,...(i===activeDay?S.dayActive:{})}}>
                <div style={{fontSize:11,fontWeight:600,color:i===activeDay?'inherit':'var(--muted)'}}>{d}</div>
                <div style={{fontSize:13,fontWeight:700}}>{DATES[i].split(' ')[1]}</div>
                {i===TODAY_IDX&&<div style={{width:5,height:5,borderRadius:'50%',background:i===activeDay?'#fff':'var(--accent)',margin:'2px auto 0'}}/>}
              </div>
            ))}
          </div>
          <div style={S.viewToggle}>
            {['week','day'].map(v=>(
              <div key={v} onClick={()=>setView(v)} style={{...S.vBtn,...(view===v?S.vBtnActive:{})}}>
                {v==='week'?'Week View':'Day View'}
              </div>
            ))}
          </div>
        </div>

        {view==='week' ? (
          <div className="fade-up1" style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',overflow:'hidden'}}>
            {/* Grid header */}
            <div style={{display:'grid',gridTemplateColumns:'70px repeat(6,1fr)',borderBottom:'1px solid var(--border)'}}>
              <div style={S.th}></div>
              {DAYS.map((d,i)=>(
                <div key={i} style={{...S.th,...(i===TODAY_IDX?{background:'rgba(79,142,247,.08)',color:'var(--accent)'}:{})}}>
                  <div style={{fontWeight:700}}>{d}</div>
                  <div style={{fontSize:10,color:i===TODAY_IDX?'var(--accent)':'var(--muted)',marginTop:2}}>{DATES[i]}</div>
                </div>
              ))}
            </div>
            {/* Slots */}
            {SLOTS.map(slot=>(
              <div key={slot} style={{display:'grid',gridTemplateColumns:'70px repeat(6,1fr)',borderBottom:'1px solid rgba(31,48,80,.4)',minHeight:52}}>
                <div style={{padding:'6px 10px',fontSize:11,color:'var(--muted)',display:'flex',alignItems:'center'}}>{slot}</div>
                {DAYS.map((d,di)=>{
                  const cls = (SCHEDULE[d]||[]).find(c=>c.slot===slot);
                  return (
                    <div key={di} style={{padding:4,background:di===TODAY_IDX?'rgba(79,142,247,.03)':''}}>
                      {cls&&(
                        <div style={{background:COLOR[cls.type]+'18',border:`1px solid ${COLOR[cls.type]}35`,borderRadius:8,padding:'6px 8px',height:'100%'}}>
                          <div style={{fontSize:11,fontWeight:700,color:COLOR[cls.type]}}>{cls.code}</div>
                          <div style={{fontSize:10,color:'var(--muted)',marginTop:1}}>{cls.room}</div>
                          <div style={{fontSize:9,color:'var(--muted)',marginTop:1}}>{cls.type}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ):(
          <div className="fade-up1" style={{display:'flex',flexDirection:'column',gap:12}}>
            {todaySlots.length===0?(<div style={{textAlign:'center',padding:48,color:'var(--muted)'}}>No classes today 🎉</div>)
            :todaySlots.map((cls,i)=>(
              <div key={i} style={{display:'flex',gap:16,padding:'16px 20px',background:'var(--surface)',border:`1px solid var(--border)`,borderLeft:`4px solid ${COLOR[cls.type]}`,borderRadius:'var(--radius)'}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:'var(--muted2)',minWidth:56}}>{cls.slot}</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700}}>{cls.name}</div>
                  <div style={{fontSize:12,color:'var(--muted)',marginTop:3}}>{cls.code} · {cls.room}</div>
                </div>
                <span style={{fontSize:11,fontWeight:600,padding:'4px 10px',borderRadius:20,background:COLOR[cls.type]+'18',color:COLOR[cls.type],alignSelf:'center'}}>{cls.type}</span>
              </div>
            ))}
          </div>
        )}

        {/* Legend */}
        <div className="fade-up2" style={{display:'flex',gap:16,flexWrap:'wrap'}}>
          {Object.entries(COLOR).map(([k,v])=>(
            <div key={k} style={{display:'flex',alignItems:'center',gap:7,fontSize:12,color:'var(--muted2)'}}>
              <div style={{width:12,height:12,borderRadius:3,background:v}}/>
              {k}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const S={
  content:{padding:'26px 30px',display:'flex',flexDirection:'column',gap:20},
  dayStrip:{display:'flex',gap:6},
  dayItem:{padding:'8px 14px',borderRadius:'var(--radius-sm)',border:'1px solid var(--border)',background:'var(--surface)',cursor:'pointer',textAlign:'center',transition:'all .2s',color:'var(--muted2)'},
  dayActive:{background:'var(--accent)',borderColor:'var(--accent)',color:'#fff'},
  viewToggle:{display:'flex',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',padding:3,gap:3},
  vBtn:{padding:'8px 16px',borderRadius:8,fontSize:12,fontWeight:500,cursor:'pointer',color:'var(--muted)',transition:'all .2s'},
  vBtnActive:{background:'var(--accent)',color:'#fff'},
  th:{padding:'12px 14px',background:'var(--surface2)',fontSize:12,color:'var(--muted2)',fontWeight:600,textAlign:'center'},
};
