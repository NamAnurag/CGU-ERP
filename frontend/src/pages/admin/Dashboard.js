import React, { useEffect, useRef } from 'react';
import Topbar from '../../components/admin/Topbar';

const STATS = [
  {label:'Total Users',    val:'12,743', sub:'Students + Faculty', color:'var(--a-accent)', icon:'👥'},
  {label:'Active Sessions',val:'1,284',  sub:'Right now',          color:'#10b981',         icon:'🟢'},
  {label:'Pending Access', val:'12',     sub:'Awaiting approval',  color:'#f59e0b',         icon:'🔐'},
  {label:'Fee Collected',  val:'₹2.4Cr', sub:'This semester',      color:'var(--accent)',   icon:'💳'},
  {label:'Grievances',     val:'28',     sub:'Open tickets',       color:'#f97316',         icon:'🔔'},
  {label:'System Health',  val:'98.7%',  sub:'Uptime this month',  color:'#10b981',         icon:'⚙️'},
];

const RECENT_ACTIONS = [
  {action:'Access granted to student 22CS0198',  by:'Admin',  time:'2 min ago',  type:'access'},
  {action:'Faculty Dr. S. Rao deleted',          by:'Admin',  time:'14 min ago', type:'delete'},
  {action:'Course CS610 added to curriculum',    by:'Admin',  time:'1 hr ago',   type:'add'},
  {action:'Fee waiver approved — 22CS0142',      by:'Admin',  time:'2 hr ago',   type:'approve'},
  {action:'Student 22EC0055 account suspended',  by:'Admin',  time:'3 hr ago',   type:'suspend'},
  {action:'Bulk import: 340 new students added', by:'System', time:'Yesterday',  type:'import'},
];

const ACTION_COLORS = {access:'#10b981',delete:'#ef4444',add:'#4f8ef7',approve:'#10b981',suspend:'#f97316',import:'#6366f1'};

export default function AdminDashboard() {
  const barsRef = useRef([]);
  const user = JSON.parse(localStorage.getItem('user') || '{"name":"Admin"}');
  const DATA = [65,72,80,76,88,92];
  const MONTHS = ['Oct','Nov','Dec','Jan','Feb','Mar'];
  useEffect(()=>{ setTimeout(()=>{ barsRef.current.forEach((el,i)=>{ if(el) el.style.height=DATA[i]+'%'; }); },400); },[]);

  return (
    <div>
      <Topbar title="Admin Dashboard" subtitle="Full platform overview · March 26, 2026"/>
      <div style={S.content}>
        <div className="fade-up" style={S.greeting}>
          <div>
            <h1 style={S.greetH}>Welcome, {user.name} 🛡️</h1>
            <p style={S.greetP}>You have 12 pending access requests and 28 open grievances today.</p>
          </div>
          <div style={{display:'flex',gap:10}}>
            <button style={S.btnDanger}>⚠️ System Alerts (3)</button>
            <button style={S.btnPrimary}>+ Add User</button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="fade-up1" style={S.statsGrid}>
          {STATS.map((s,i)=>(
            <div key={i} style={{...S.statCard,borderTop:`3px solid ${s.color}`}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
                <div style={{...S.statIcon,background:s.color+'18',color:s.color}}>{s.icon}</div>
                <div style={{fontSize:10,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.4px'}}>{s.label}</div>
              </div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,color:s.color}}>{s.val}</div>
              <div style={{fontSize:11,color:'var(--muted2)',marginTop:4}}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="fade-up2" style={S.midRow}>
          {/* Platform activity chart */}
          <div style={S.card}>
            <div style={S.cardHead}>
              <div style={S.cardTitle}>Platform Activity</div>
              <div style={{fontSize:12,color:'var(--muted)'}}>Active users / month</div>
            </div>
            <div style={{display:'flex',gap:10,alignItems:'flex-end',height:120}}>
              {DATA.map((v,i)=>(
                <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:5}}>
                  <div style={{fontSize:10,fontWeight:700,color:'var(--a-accent)'}}>{v}%</div>
                  <div style={{width:'100%',background:'var(--surface2)',borderRadius:'4px 4px 0 0',overflow:'hidden',height:100,display:'flex',alignItems:'flex-end'}}>
                    <div ref={el=>barsRef.current[i]=el} style={{width:'100%',height:'0%',background:`linear-gradient(to top,var(--a-accent),#fb7185)`,borderRadius:'4px 4px 0 0',transition:`height .8s cubic-bezier(.34,1.56,.64,1) ${i*0.1}s`}}/>
                  </div>
                  <div style={{fontSize:10,color:'var(--muted)'}}>{MONTHS[i]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div style={S.card}>
            <div style={S.cardHead}><div style={S.cardTitle}>Quick Actions</div></div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {[
                {icon:'👤',label:'Add Student',  color:'var(--accent)',   bg:'rgba(79,142,247,.1)'},
                {icon:'👨‍🏫',label:'Add Faculty',  color:'var(--t-accent)', bg:'rgba(99,102,241,.1)'},
                {icon:'🔐',label:'Manage Access', color:'#f59e0b',         bg:'rgba(245,158,11,.1)'},
                {icon:'📊',label:'View Reports',  color:'#10b981',         bg:'rgba(16,185,129,.1)'},
                {icon:'💳',label:'Fee Records',   color:'#22d3ee',         bg:'rgba(34,211,238,.1)'},
                {icon:'⚙️',label:'Settings',      color:'var(--a-accent)', bg:'rgba(244,63,94,.1)'},
              ].map((q,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',background:q.bg,border:`1px solid ${q.color}20`,borderRadius:'var(--radius-sm)',cursor:'pointer',transition:'transform .2s'}}>
                  <span style={{fontSize:18}}>{q.icon}</span>
                  <span style={{fontSize:13,fontWeight:600,color:q.color}}>{q.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="fade-up3" style={S.botRow}>
          {/* Recent admin actions */}
          <div style={{...S.card,gridColumn:'1 / span 2'}}>
            <div style={S.cardHead}>
              <div style={S.cardTitle}>Recent Admin Actions</div>
              <span style={{fontSize:12,color:'var(--a-accent)',cursor:'pointer'}}>View full log →</span>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {RECENT_ACTIONS.map((a,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:14,padding:'11px 14px',background:'var(--surface2)',borderRadius:'var(--radius-sm)',border:'1px solid var(--border)',borderLeft:`3px solid ${ACTION_COLORS[a.type]}`}}>
                  <div style={{width:8,height:8,borderRadius:'50%',background:ACTION_COLORS[a.type],flexShrink:0}}/>
                  <div style={{flex:1,fontSize:13}}>{a.action}</div>
                  <div style={{fontSize:11,color:'var(--muted)',display:'flex',gap:12,flexShrink:0}}>
                    <span>by {a.by}</span><span>{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System status */}
          <div style={S.card}>
            <div style={S.cardHead}><div style={S.cardTitle}>System Status</div></div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {[
                {name:'API Server',    status:'Operational', pct:99.9, c:'#10b981'},
                {name:'Database',      status:'Operational', pct:99.7, c:'#10b981'},
                {name:'File Storage',  status:'Operational', pct:98.2, c:'#10b981'},
                {name:'Email Service', status:'Degraded',    pct:87.0, c:'#f59e0b'},
                {name:'SMS Gateway',   status:'Operational', pct:96.5, c:'#10b981'},
              ].map((sv,i)=>(
                <div key={i} style={{padding:'10px 13px',background:'var(--surface2)',borderRadius:'var(--radius-sm)',border:'1px solid var(--border)'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                    <span style={{fontSize:12,fontWeight:600}}>{sv.name}</span>
                    <span style={{fontSize:11,fontWeight:600,color:sv.c}}>{sv.status}</span>
                  </div>
                  <div style={{height:3,background:'var(--border)',borderRadius:10,overflow:'hidden'}}>
                    <div style={{height:'100%',width:sv.pct+'%',background:sv.c,borderRadius:10}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const S={
  content:{padding:'26px 30px',display:'flex',flexDirection:'column',gap:22},
  greeting:{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:14},
  greetH:{fontFamily:"'Syne',sans-serif",fontSize:24,fontWeight:800},
  greetP:{fontSize:13,color:'var(--muted2)',marginTop:4},
  btnPrimary:{padding:'9px 18px',borderRadius:'var(--radius-sm)',background:'var(--a-accent)',color:'#fff',border:'none',fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,cursor:'pointer'},
  btnDanger:{padding:'9px 18px',borderRadius:'var(--radius-sm)',background:'rgba(245,158,11,.12)',border:'1px solid rgba(245,158,11,.3)',color:'#f59e0b',fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,cursor:'pointer'},
  statsGrid:{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16},
  statCard:{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'18px 20px'},
  statIcon:{width:38,height:38,borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16},
  midRow:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20},
  botRow:{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:20},
  card:{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:22},
  cardHead:{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:18},
  cardTitle:{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700},
};
