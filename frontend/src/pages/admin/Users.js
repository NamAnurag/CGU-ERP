import React, { useState } from 'react';
import Topbar from '../../components/admin/Topbar';

const ROLE_COLORS = { Student:'var(--accent)', Faculty:'var(--t-accent)', Admin:'var(--a-accent)' };
const STATUS_STYLE = { active:{c:'#10b981',bg:'rgba(16,185,129,.12)'}, suspended:{c:'#ef4444',bg:'rgba(239,68,68,.12)'}, pending:{c:'#f59e0b',bg:'rgba(245,158,11,.12)'} };

const INIT_USERS = [
  {id:1,name:'Ashish Kumar',    email:'22cs0142@college.edu.in',role:'Student', dept:'CSE', status:'active',  joined:'Jan 2022'},
  {id:2,name:'Dr. T. Mishra',   email:'t.mishra@college.edu.in', role:'Faculty', dept:'CSE', status:'active',  joined:'Aug 2019'},
  {id:3,name:'Riya Sharma',     email:'22cs0101@college.edu.in',role:'Student', dept:'CSE', status:'active',  joined:'Jan 2022'},
  {id:4,name:'Prof. A. Nair',   email:'a.nair@college.edu.in',  role:'Faculty', dept:'ECE', status:'active',  joined:'Jul 2018'},
  {id:5,name:'Arjun Mehta',     email:'22cs0102@college.edu.in',role:'Student', dept:'CSE', status:'suspended',joined:'Jan 2022'},
  {id:6,name:'Priya Patel',     email:'22ec0055@college.edu.in',role:'Student', dept:'ECE', status:'active',  joined:'Jan 2022'},
  {id:7,name:'Dr. R. Sharma',   email:'r.sharma@college.edu.in',role:'Faculty', dept:'ME',  status:'active',  joined:'Jun 2020'},
  {id:8,name:'Rohit Kumar',     email:'22me0031@college.edu.in',role:'Student', dept:'ME',  status:'pending', joined:'Jan 2024'},
];

export default function AdminUsers() {
  const [users, setUsers] = useState(INIT_USERS);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [editUser, setEditUser] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newUser, setNewUser] = useState({name:'',email:'',role:'Student',dept:'CSE',status:'active'});
  const [toast, setToast] = useState('');

  const filtered = users.filter(u => {
    const qm = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const rm = roleFilter === 'all' || u.role === roleFilter;
    return qm && rm;
  });

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const deleteUser = (id) => { setUsers(p => p.filter(u => u.id !== id)); showToast('🗑️ User deleted successfully'); };
  const toggleStatus = (id) => {
    setUsers(p => p.map(u => u.id === id ? {...u, status: u.status === 'active' ? 'suspended' : 'active'} : u));
    showToast('✓ User status updated');
  };
  const saveEdit = () => {
    setUsers(p => p.map(u => u.id === editUser.id ? editUser : u));
    setEditUser(null); showToast('✓ User updated successfully');
  };
  const addUser = () => {
    if (!newUser.name || !newUser.email) { alert('Fill all fields'); return; }
    setUsers(p => [...p, {...newUser, id: Date.now(), joined: 'Mar 2026'}]);
    setShowAdd(false); setNewUser({name:'',email:'',role:'Student',dept:'CSE',status:'active'});
    showToast('✓ User added successfully');
  };

  return (
    <div>
      <Topbar title="All Users" subtitle="Manage every user on the platform"/>
      <div style={S.content}>
        {/* Summary */}
        <div className="fade-up" style={S.summary}>
          {[{l:'Total',v:users.length,c:'var(--a-accent)'},{l:'Students',v:users.filter(u=>u.role==='Student').length,c:'var(--accent)'},{l:'Faculty',v:users.filter(u=>u.role==='Faculty').length,c:'var(--t-accent)'},{l:'Suspended',v:users.filter(u=>u.status==='suspended').length,c:'#ef4444'},{l:'Pending',v:users.filter(u=>u.status==='pending').length,c:'#f59e0b'}].map(s=>(
            <div key={s.l} style={S.sumCard}>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:26,fontWeight:800,color:s.c}}>{s.v}</div>
              <div style={{fontSize:10,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.4px',marginTop:3}}>{s.l}</div>
            </div>
          ))}
          <button onClick={()=>setShowAdd(true)} style={S.addBtn}>+ Add User</button>
        </div>

        {/* Toolbar */}
        <div className="fade-up1" style={{display:'flex',gap:10,flexWrap:'wrap',alignItems:'center'}}>
          <div style={{position:'relative',flex:1,minWidth:220}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or email…" style={S.searchInput}/>
            <span style={{position:'absolute',left:11,top:'50%',transform:'translateY(-50%)',color:'var(--muted)'}}>🔍</span>
          </div>
          {['all','Student','Faculty','Admin'].map(r=>(
            <div key={r} onClick={()=>setRoleFilter(r)} style={{...S.chip,...(roleFilter===r?{background:'rgba(244,63,94,.12)',borderColor:'rgba(244,63,94,.4)',color:'var(--a-accent)'}:{})}}>
              {r==='all'?'All Roles':r}
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="fade-up2" style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',overflow:'hidden'}}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'var(--surface2)'}}>
                {['User','Email','Role','Department','Status','Joined','Actions'].map(h=>(
                  <th key={h} style={{padding:'12px 16px',textAlign:'left',fontSize:11,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.5px',fontWeight:600,borderBottom:'1px solid var(--border)'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u,i)=>{
                const ss = STATUS_STYLE[u.status] || STATUS_STYLE.active;
                const rc = ROLE_COLORS[u.role] || 'var(--muted)';
                return (
                  <tr key={i} style={{borderBottom:'1px solid rgba(31,48,80,.5)'}}>
                    <td style={{padding:'13px 16px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:10}}>
                        <div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${rc},${rc}88)`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:800,color:'#fff',flexShrink:0}}>
                          {u.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                        </div>
                        <span style={{fontSize:13,fontWeight:600}}>{u.name}</span>
                      </div>
                    </td>
                    <td style={{padding:'13px 16px',fontSize:12,color:'var(--muted2)'}}>{u.email}</td>
                    <td style={{padding:'13px 16px'}}>
                      <span style={{fontSize:11,fontWeight:600,padding:'3px 10px',borderRadius:20,background:rc+'18',color:rc,border:`1px solid ${rc}30`}}>{u.role}</span>
                    </td>
                    <td style={{padding:'13px 16px',fontSize:13,color:'var(--muted2)'}}>{u.dept}</td>
                    <td style={{padding:'13px 16px'}}>
                      <span style={{fontSize:11,fontWeight:600,padding:'3px 10px',borderRadius:20,background:ss.bg,color:ss.c}}>{u.status.charAt(0).toUpperCase()+u.status.slice(1)}</span>
                    </td>
                    <td style={{padding:'13px 16px',fontSize:12,color:'var(--muted)'}}>{u.joined}</td>
                    <td style={{padding:'13px 16px'}}>
                      <div style={{display:'flex',gap:6}}>
                        <button onClick={()=>setEditUser({...u})} style={S.actionBtn('#4f8ef7')}>Edit</button>
                        <button onClick={()=>toggleStatus(u.id)} style={S.actionBtn(u.status==='active'?'#f97316':'#10b981')}>{u.status==='active'?'Suspend':'Activate'}</button>
                        <button onClick={()=>deleteUser(u.id)} style={S.actionBtn('#ef4444')}>Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editUser && (
        <Modal title="Edit User" onClose={()=>setEditUser(null)}>
          {[{l:'Full Name',k:'name'},{l:'Email',k:'email',t:'email'}].map(f=>(
            <FW key={f.k} label={f.l}><input type={f.t||'text'} value={editUser[f.k]} onChange={e=>setEditUser(p=>({...p,[f.k]:e.target.value}))} style={INP}/></FW>
          ))}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <FW label="Role"><select value={editUser.role} onChange={e=>setEditUser(p=>({...p,role:e.target.value}))} style={INP}>{['Student','Faculty','Admin'].map(r=><option key={r}>{r}</option>)}</select></FW>
            <FW label="Status"><select value={editUser.status} onChange={e=>setEditUser(p=>({...p,status:e.target.value}))} style={INP}>{['active','suspended','pending'].map(s=><option key={s}>{s}</option>)}</select></FW>
          </div>
          <FW label="Department"><select value={editUser.dept} onChange={e=>setEditUser(p=>({...p,dept:e.target.value}))} style={INP}>{['CSE','ECE','ME','CE','EEE','IT'].map(d=><option key={d}>{d}</option>)}</select></FW>
          <button onClick={saveEdit} style={SUBMIT}>Save Changes</button>
        </Modal>
      )}

      {/* Add User Modal */}
      {showAdd && (
        <Modal title="Add New User" onClose={()=>setShowAdd(false)}>
          {[{l:'Full Name',k:'name'},{l:'Email',k:'email',t:'email'}].map(f=>(
            <FW key={f.k} label={f.l}><input type={f.t||'text'} value={newUser[f.k]} onChange={e=>setNewUser(p=>({...p,[f.k]:e.target.value}))} style={INP} placeholder={f.l}/></FW>
          ))}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <FW label="Role"><select value={newUser.role} onChange={e=>setNewUser(p=>({...p,role:e.target.value}))} style={INP}>{['Student','Faculty','Admin'].map(r=><option key={r}>{r}</option>)}</select></FW>
            <FW label="Department"><select value={newUser.dept} onChange={e=>setNewUser(p=>({...p,dept:e.target.value}))} style={INP}>{['CSE','ECE','ME','CE','EEE','IT'].map(d=><option key={d}>{d}</option>)}</select></FW>
          </div>
          <button onClick={addUser} style={SUBMIT}>Add User</button>
        </Modal>
      )}

      {toast && <Toast msg={toast}/>}
    </div>
  );
}

function Modal({title,onClose,children}){return(<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',backdropFilter:'blur(7px)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:24}} onClick={onClose}><div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:20,width:'100%',maxWidth:520,animation:'modalIn .3s cubic-bezier(.34,1.56,.64,1)'}} onClick={e=>e.stopPropagation()}><div style={{padding:'20px 24px 18px',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center'}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800}}>{title}</div><div onClick={onClose} style={{cursor:'pointer',color:'var(--muted)',fontSize:20}}>✕</div></div><div style={{padding:'22px 24px 28px'}}>{children}</div></div></div>);}
function FW({label,children}){return <div style={{marginBottom:14}}><label style={{display:'block',fontSize:11,fontWeight:600,color:'var(--muted2)',textTransform:'uppercase',letterSpacing:'.5px',marginBottom:6}}>{label}</label>{children}</div>;}
function Toast({msg}){return <div style={{position:'fixed',bottom:28,right:28,background:'#10b981',color:'#fff',padding:'12px 20px',borderRadius:'var(--radius-sm)',fontSize:13,fontWeight:600,boxShadow:'0 8px 28px rgba(0,0,0,.3)',zIndex:999,animation:'slideIn .3s ease'}}>{msg}</div>;}
const INP={width:'100%',background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'10px 13px',outline:'none'};
const SUBMIT={width:'100%',padding:12,borderRadius:'var(--radius-sm)',background:'linear-gradient(135deg,var(--a-accent),#e11d48)',color:'#fff',border:'none',fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,cursor:'pointer',marginTop:4};
const S = {
  content:{padding:'26px 30px',display:'flex',flexDirection:'column',gap:18},
  summary:{display:'flex',gap:14,alignItems:'center',flexWrap:'wrap'},
  sumCard:{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'14px 20px',textAlign:'center',flexShrink:0},
  addBtn:{marginLeft:'auto',padding:'10px 20px',borderRadius:'var(--radius-sm)',background:'var(--a-accent)',color:'#fff',border:'none',fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,cursor:'pointer'},
  searchInput:{width:'100%',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',color:'var(--text)',fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:'9px 13px 9px 36px',outline:'none'},
  chip:{padding:'8px 14px',borderRadius:20,fontSize:12,fontWeight:500,cursor:'pointer',border:'1px solid var(--border)',background:'var(--surface)',color:'var(--muted)',transition:'all .2s'},
  actionBtn:(c)=>({fontSize:11,fontWeight:600,padding:'4px 10px',borderRadius:7,background:c+'18',color:c,border:`1px solid ${c}25`,cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}),
};
