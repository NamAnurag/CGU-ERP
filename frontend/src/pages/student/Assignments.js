import React, { useState } from 'react';
import Topbar from '../../components/student/Topbar';

const ASSIGNMENTS = [
  {id:1,title:'CNN Implementation — CIFAR-10',subject:'CS606',type:'Project',marks:30,deadline:'2026-03-30',status:'pending',submitted:false,desc:'Build and train a CNN on CIFAR-10 achieving ≥75% accuracy using TensorFlow/Keras.'},
  {id:2,title:'K-Means Clustering on Retail Dataset',subject:'CS604',type:'Lab',marks:20,deadline:'2026-03-20',status:'submitted',submitted:true,desc:'Apply K-Means clustering and use the elbow method to determine optimal K.'},
  {id:3,title:'Regression Model Comparison',subject:'CS501',type:'Assignment',marks:25,deadline:'2026-04-05',status:'pending',submitted:false,desc:'Compare Linear, Ridge, and Lasso regression on the given dataset.'},
  {id:4,title:'Backpropagation from Scratch',subject:'CS606',type:'Assignment',marks:25,deadline:'2026-03-08',status:'graded',submitted:true,grade:22,feedback:'Excellent implementation! Minor issue with learning rate scheduling.'},
  {id:5,title:'Feature Engineering Lab',subject:'CS604',type:'Lab',marks:20,deadline:'2026-03-15',status:'graded',submitted:true,grade:18,feedback:'Good work on PCA. Encoding section needs improvement.'},
];

const SUBJ_COLORS = {CS501:'#4f8ef7',CS604:'#f59e0b',CS606:'#ec4899',CS502:'#10b981'};
const STATUS_STYLE = {
  pending: {color:'#f97316',bg:'rgba(249,115,22,.12)',label:'Pending'},
  submitted:{color:'#4f8ef7',bg:'rgba(79,142,247,.12)',label:'Submitted'},
  graded:  {color:'#10b981',bg:'rgba(16,185,129,.12)',label:'Graded'},
  overdue: {color:'#ef4444',bg:'rgba(239,68,68,.12)',label:'Overdue'},
};

function daysLeft(d){return Math.ceil((new Date(d)-new Date('2026-03-26'))/(1000*60*60*24));}
function fmt(d){return new Date(d).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});}

export default function Assignments() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [assignments, setAssignments] = useState(ASSIGNMENTS);

  const filtered = assignments.filter(a => {
    const matchFilter = filter==='all'||a.status===filter;
    const matchSearch = !search||a.title.toLowerCase().includes(search.toLowerCase())||a.subject.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = React.useRef();

  const handleSubmit = (id) => {
    if (!file) { alert('Please select a file to submit.'); return; }
    setUploading(true);
    // Simulate upload delay (replace with real API call when file storage is added)
    setTimeout(() => {
      setAssignments(prev => prev.map(a => a.id === id ? { ...a, status: 'submitted', submitted: true } : a));
      setUploading(false);
      setFile(null);
      setSelected(null);
    }, 1200);
  };

  return (
    <div>
      <Topbar title="Assignments" subtitle="Track, submit and view your assignments"/>
      <div style={S.content}>

        {/* Summary strip */}
        <div className="fade-up" style={S.summary}>
          {[
            {label:'Total',val:assignments.length,color:'var(--accent)'},
            {label:'Pending',val:assignments.filter(a=>a.status==='pending').length,color:'#f97316'},
            {label:'Submitted',val:assignments.filter(a=>a.status==='submitted').length,color:'var(--accent)'},
            {label:'Graded',val:assignments.filter(a=>a.status==='graded').length,color:'#10b981'},
          ].map(s=>(
            <div key={s.label} style={S.sumCard}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:s.color}}>{s.val}</div>
              <div style={{fontSize:11,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.4px',marginTop:3}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter row */}
        <div className="fade-up1" style={S.filterRow}>
          <div style={S.searchWrap}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.8" style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)'}}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search assignments…" style={S.searchInput}/>
          </div>
          {['all','pending','submitted','graded'].map(f=>(
            <div key={f} onClick={()=>setFilter(f)} style={{...S.chip,...(filter===f?S.chipActive:{})}}>
              {f.charAt(0).toUpperCase()+f.slice(1)}
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="fade-up2" style={{display:'flex',flexDirection:'column',gap:12}}>
          {filtered.map(a=>{
            const color = SUBJ_COLORS[a.subject]||'var(--accent)';
            const ss = STATUS_STYLE[a.status]||STATUS_STYLE.pending;
            const days = daysLeft(a.deadline);
            return (
              <div key={a.id} onClick={()=>setSelected(a)} style={{...S.aCard,cursor:'pointer'}}>
                <div style={{height:3,background:`linear-gradient(90deg,${color},${color}88)`,borderRadius:'var(--radius) var(--radius) 0 0'}}/>
                <div style={S.aBody}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:12}}>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',gap:7,marginBottom:7,flexWrap:'wrap'}}>
                        <span style={{fontSize:10,fontWeight:700,padding:'3px 9px',borderRadius:20,background:color+'18',color,border:`1px solid ${color}30`}}>{a.subject}</span>
                        <span style={{fontSize:10,fontWeight:700,padding:'3px 9px',borderRadius:20,background:'rgba(34,211,238,.1)',color:'var(--accent2)'}}>{a.type}</span>
                        {days<0&&<span style={{fontSize:10,fontWeight:700,padding:'3px 9px',borderRadius:20,background:'rgba(239,68,68,.1)',color:'#ef4444'}}>Overdue</span>}
                        {days>=0&&days<=3&&<span style={{fontSize:10,fontWeight:700,padding:'3px 9px',borderRadius:20,background:'rgba(249,115,22,.1)',color:'#f97316'}}>Due in {days}d</span>}
                      </div>
                      <div style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,marginBottom:4}}>{a.title}</div>
                      <div style={{fontSize:12,color:'var(--muted2)'}}>{a.desc}</div>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:8,flexShrink:0}}>
                      <span style={{fontSize:11,fontWeight:600,padding:'4px 10px',borderRadius:20,background:ss.bg,color:ss.color,border:`1px solid ${ss.color}30`}}>{ss.label}</span>
                      <div style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:800}}>{a.marks} <span style={{fontSize:11,color:'var(--muted)',fontFamily:"'DM Sans',sans-serif"}}>marks</span></div>
                    </div>
                  </div>
                  <div style={{display:'flex',gap:14,marginTop:10,fontSize:11,color:'var(--muted2)'}}>
                    <span>📅 {fmt(a.deadline)}</span>
                    {a.status==='graded'&&<span style={{color:'#10b981'}}>✅ Grade: {a.grade}/{a.marks}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div style={S.overlay} onClick={()=>{setSelected(null);setFile(null);}}>
          <div style={S.modal} onClick={e=>e.stopPropagation()}>
            <div style={S.modalHead}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800}}>{selected.title}</div>
              <div onClick={()=>{setSelected(null);setFile(null);}} style={{cursor:'pointer',color:'var(--muted)',fontSize:20}}>✕</div>
            </div>
            <div style={{padding:'20px 24px 28px'}}>
              <div style={{display:'flex',gap:8,marginBottom:16,flexWrap:'wrap'}}>
                {[selected.subject, selected.type, `${selected.marks} Marks`, fmt(selected.deadline)].map(t=>(
                  <span key={t} style={{fontSize:12,fontWeight:600,padding:'4px 12px',borderRadius:20,background:'var(--surface2)',border:'1px solid var(--border)'}}>{t}</span>
                ))}
              </div>
              <p style={{fontSize:13,color:'var(--muted2)',lineHeight:1.7,marginBottom:20,background:'var(--surface2)',padding:'13px 15px',borderRadius:'var(--radius-sm)',border:'1px solid var(--border)'}}>{selected.desc}</p>
              {selected.status==='graded'&&(
                <div style={{background:'rgba(16,185,129,.08)',border:'1px solid rgba(16,185,129,.2)',borderRadius:'var(--radius-sm)',padding:'14px 16px',marginBottom:16}}>
                  <div style={{fontWeight:600,color:'#10b981',marginBottom:6}}>Grade: {selected.grade}/{selected.marks} — {Math.round(selected.grade/selected.marks*100)}%</div>
                  <div style={{fontSize:13,color:'var(--muted2)'}}>{selected.feedback}</div>
                </div>
              )}
              {!selected.submitted && (
                <div>
                  <input ref={fileRef} type="file" style={{display:'none'}} onChange={e => setFile(e.target.files[0])}
                    accept=".pdf,.doc,.docx,.zip,.py,.ipynb,.txt,.png,.jpg" />
                  <div onClick={() => fileRef.current.click()}
                    style={{border:`2px dashed ${file ? 'var(--accent)' : 'var(--border)'}`,borderRadius:'var(--radius-sm)',padding:20,textAlign:'center',marginBottom:14,cursor:'pointer',background:file?'rgba(79,142,247,.05)':'transparent',transition:'all .2s'}}>
                    <div style={{fontSize:24,marginBottom:6}}>{file ? '✅' : '📎'}</div>
                    {file
                      ? <><div style={{fontSize:13,fontWeight:600,color:'var(--accent)'}}>{file.name}</div><div style={{fontSize:11,color:'var(--muted)',marginTop:4}}>{(file.size/1024).toFixed(1)} KB · Click to change</div></>
                      : <><div style={{fontSize:13,fontWeight:600}}>Click to select file</div><div style={{fontSize:11,color:'var(--muted)',marginTop:4}}>PDF, DOC, ZIP, PY, IPYNB, PNG accepted</div></>}
                  </div>
                  <button onClick={() => handleSubmit(selected.id)} disabled={uploading}
                    style={{...S.submitBtn, opacity: uploading ? .7 : 1}}>
                    {uploading ? 'Submitting…' : file ? `Submit "${file.name}" →` : 'Select a file first'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const S={
  content:{padding:'26px 30px',display:'flex',flexDirection:'column',gap:18},
  summary:{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14},
  sumCard:{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'16px 18px',textAlign:'center'},
  filterRow:{display:'flex',gap:10,flexWrap:'wrap',alignItems:'center'},
  searchWrap:{position:'relative',flex:1,minWidth:200},
  searchInput:{width:'100%',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'9px 13px 9px 36px',outline:'none'},
  chip:{padding:'8px 14px',borderRadius:20,fontSize:12,fontWeight:500,cursor:'pointer',border:'1px solid var(--border)',background:'var(--surface)',color:'var(--muted)',transition:'all .2s'},
  chipActive:{background:'rgba(79,142,247,.12)',borderColor:'rgba(79,142,247,.4)',color:'var(--accent)'},
  aCard:{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',overflow:'hidden',transition:'transform .2s,box-shadow .2s'},
  aBody:{padding:'16px 18px'},
  overlay:{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',backdropFilter:'blur(7px)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:24},
  modal:{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:20,width:'100%',maxWidth:560,maxHeight:'88vh',overflowY:'auto',animation:'modalIn .3s cubic-bezier(.34,1.56,.64,1)'},
  modalHead:{padding:'22px 24px 18px',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center'},
  submitBtn:{width:'100%',padding:12,borderRadius:'var(--radius-sm)',background:'linear-gradient(135deg,var(--accent),#3b6fd4)',color:'#fff',border:'none',fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,cursor:'pointer'},
};
