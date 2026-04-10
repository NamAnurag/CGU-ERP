import React, { useState } from 'react';
import Topbar from '../../components/admin/Topbar';
const RECORDS=[
  {id:1,name:'Ashish Kumar',roll:'22CS0142',dept:'CSE',year:4,total:183000,paid:138000,due:45000,status:'partial',scholarship:15000},
  {id:2,name:'Riya Sharma',  roll:'22CS0101',dept:'CSE',year:4,total:183000,paid:183000,due:0,status:'paid',scholarship:0},
  {id:3,name:'Arjun Mehta',  roll:'22CS0102',dept:'CSE',year:4,total:183000,paid:0,due:183000,status:'unpaid',scholarship:0},
  {id:4,name:'Priya Patel',  roll:'22EC0055',dept:'ECE',year:4,total:176000,paid:176000,due:0,status:'paid',scholarship:20000},
  {id:5,name:'Rohit Kumar',  roll:'22ME0031',dept:'ME', year:4,total:168000,paid:84000,due:84000,status:'partial',scholarship:0},
  {id:6,name:'Sneha Das',    roll:'22CS0105',dept:'CSE',year:3,total:183000,paid:183000,due:0,status:'paid',scholarship:15000},
];
const SS={paid:{c:'#10b981',bg:'rgba(16,185,129,.12)'},partial:{c:'#f59e0b',bg:'rgba(245,158,11,.12)'},unpaid:{c:'#ef4444',bg:'rgba(239,68,68,.12)'}};
export default function AdminFees(){
  const [records,setRecords]=useState(RECORDS);const [filter,setFilter]=useState('all');const [search,setSearch]=useState('');const [edit,setEdit]=useState(null);const [toast,setToast]=useState('');
  const showToast=(m)=>{setToast(m);setTimeout(()=>setToast(''),3000);};
  const filtered=records.filter(r=>{const qm=!search||r.name.toLowerCase().includes(search.toLowerCase())||r.roll.toLowerCase().includes(search.toLowerCase());const fm=filter==='all'||r.status===filter;return qm&&fm;});
  const totalCollected=records.reduce((a,r)=>a+r.paid,0);
  const totalDue=records.reduce((a,r)=>a+r.due,0);
  return(
    <div>
      <Topbar title="Fee Management" subtitle="View, update and manage all fee records"/>
      <div style={{padding:'26px 30px',display:'flex',flexDirection:'column',gap:18}}>
        <div className="fade-up" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14}}>
          {[{l:'Total Collected',v:'₹'+totalCollected.toLocaleString('en-IN'),c:'#10b981'},{l:'Total Due',v:'₹'+totalDue.toLocaleString('en-IN'),c:'#ef4444'},{l:'Paid Students',v:records.filter(r=>r.status==='paid').length,c:'#10b981'},{l:'Scholarships',v:'₹'+records.reduce((a,r)=>a+r.scholarship,0).toLocaleString('en-IN'),c:'#6366f1'}].map(s=>(
            <div key={s.l} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'16px 18px',textAlign:'center'}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:s.c}}>{s.v}</div>
              <div style={{fontSize:10,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.4px',marginTop:3}}>{s.l}</div>
            </div>
          ))}
        </div>
        <div className="fade-up1" style={{display:'flex',gap:10,flexWrap:'wrap',alignItems:'center'}}>
          <div style={{position:'relative',flex:1,minWidth:220}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search student…" style={{width:'100%',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'9px 13px 9px 36px',outline:'none'}}/>
            <span style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',color:'var(--muted)'}}>🔍</span>
          </div>
          {['all','paid','partial','unpaid'].map(f=><div key={f} onClick={()=>setFilter(f)} style={{padding:'8px 14px',borderRadius:20,fontSize:12,fontWeight:500,cursor:'pointer',border:'1px solid var(--border)',background:filter===f?'rgba(244,63,94,.12)':'var(--surface)',color:filter===f?'var(--a-accent)':'var(--muted)',borderColor:filter===f?'rgba(244,63,94,.4)':'var(--border)'}}>{f.charAt(0).toUpperCase()+f.slice(1)}</div>)}
        </div>
        <div className="fade-up2" style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',overflow:'hidden'}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead><tr style={{background:'var(--surface2)'}}>
              {['Student','Roll','Dept','Total Fee','Paid','Due','Scholarship','Status','Action'].map(h=><th key={h} style={{padding:'11px 14px',textAlign:'left',fontSize:11,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.5px',fontWeight:600,borderBottom:'1px solid var(--border)'}}>{h}</th>)}
            </tr></thead>
            <tbody>
              {filtered.map((r,i)=>{const ss=SS[r.status];return(
                <tr key={i} style={{borderBottom:'1px solid rgba(31,48,80,.5)'}}>
                  <td style={{padding:'12px 14px',fontSize:13,fontWeight:600}}>{r.name}</td>
                  <td style={{padding:'12px 14px',fontFamily:'monospace',fontSize:11,color:'var(--muted2)'}}>{r.roll}</td>
                  <td style={{padding:'12px 14px',fontSize:12,color:'var(--muted2)'}}>{r.dept}</td>
                  <td style={{padding:'12px 14px',fontFamily:"'Syne',sans-serif",fontWeight:700}}>₹{r.total.toLocaleString('en-IN')}</td>
                  <td style={{padding:'12px 14px',fontFamily:"'Syne',sans-serif",fontWeight:700,color:'#10b981'}}>₹{r.paid.toLocaleString('en-IN')}</td>
                  <td style={{padding:'12px 14px',fontFamily:"'Syne',sans-serif",fontWeight:700,color:r.due>0?'#ef4444':'#10b981'}}>₹{r.due.toLocaleString('en-IN')}</td>
                  <td style={{padding:'12px 14px',fontFamily:"'Syne',sans-serif",fontWeight:700,color:'#6366f1'}}>{r.scholarship>0?'₹'+r.scholarship.toLocaleString('en-IN'):'—'}</td>
                  <td style={{padding:'12px 14px'}}><span style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:20,background:ss.bg,color:ss.c}}>{r.status.charAt(0).toUpperCase()+r.status.slice(1)}</span></td>
                  <td style={{padding:'12px 14px'}}>
                    <div style={{display:'flex',gap:5}}>
                      <button onClick={()=>setEdit({...r})} style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:7,background:'rgba(79,142,247,.12)',color:'var(--accent)',border:'1px solid rgba(79,142,247,.2)',cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>Edit</button>
                      {r.due>0&&<button onClick={()=>{setRecords(p=>p.map(x=>x.id===r.id?{...x,paid:x.total,due:0,status:'paid'}:x));showToast('✓ Marked as fully paid');}} style={{fontSize:11,fontWeight:600,padding:'3px 9px',borderRadius:7,background:'rgba(16,185,129,.1)',color:'#10b981',border:'1px solid rgba(16,185,129,.2)',cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>Mark Paid</button>}
                    </div>
                  </td>
                </tr>
              );})}
            </tbody>
          </table>
        </div>
      </div>
      {edit&&(<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',backdropFilter:'blur(7px)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:24}} onClick={()=>setEdit(null)}>
        <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:20,width:'100%',maxWidth:480,animation:'modalIn .3s cubic-bezier(.34,1.56,.64,1)'}} onClick={e=>e.stopPropagation()}>
          <div style={{padding:'20px 24px 18px',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between'}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800}}>Edit Fee Record — {edit.name}</div><div onClick={()=>setEdit(null)} style={{cursor:'pointer',color:'var(--muted)',fontSize:20}}>✕</div></div>
          <div style={{padding:'22px 24px 28px'}}>
            {[{l:'Total Fee',k:'total',t:'number'},{l:'Paid Amount',k:'paid',t:'number'},{l:'Scholarship Amount',k:'scholarship',t:'number'}].map(f=>(
              <div key={f.k} style={{marginBottom:14}}><label style={{display:'block',fontSize:11,fontWeight:600,color:'var(--muted2)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:6}}>{f.l}</label><input type="number" value={edit[f.k]} onChange={e=>{const v=parseInt(e.target.value)||0;setEdit(p=>({...p,[f.k]:v,due:f.k==='paid'?Math.max(0,p.total-v):f.k==='total'?Math.max(0,v-p.paid):p.due,status:f.k==='paid'?v>=p.total?'paid':v>0?'partial':'unpaid':p.status}));}} style={{width:'100%',background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'10px 13px',outline:'none'}}/></div>
            ))}
            <div style={{background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',padding:'12px 14px',marginBottom:16,fontSize:13}}>Due Amount: <b style={{color:edit.due>0?'#ef4444':'#10b981'}}>₹{Math.max(0,edit.total-edit.paid).toLocaleString('en-IN')}</b></div>
            <button onClick={()=>{setRecords(p=>p.map(r=>r.id===edit.id?{...edit,due:Math.max(0,edit.total-edit.paid),status:edit.paid>=edit.total?'paid':edit.paid>0?'partial':'unpaid'}:r));setEdit(null);showToast('✓ Fee record updated');}} style={{width:'100%',padding:12,borderRadius:'var(--radius-sm)',background:'linear-gradient(135deg,var(--a-accent),#e11d48)',color:'#fff',border:'none',fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,cursor:'pointer'}}>Save Fee Record</button>
          </div>
        </div>
      </div>)}
      {toast&&<div style={{position:'fixed',bottom:28,right:28,background:'#10b981',color:'#fff',padding:'12px 20px',borderRadius:'var(--radius-sm)',fontSize:13,fontWeight:600,boxShadow:'0 8px 28px rgba(0,0,0,.3)',zIndex:999}}>{toast}</div>}
    </div>
  );
}
