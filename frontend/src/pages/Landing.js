import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const STATS = [{ val:'12,000+',label:'Students'},{val:'480+',label:'Faculty'},{val:'28',label:'Departments'},{val:'98%',label:'Uptime'}];
const FEATURES = [
  {icon:'📊',title:'Real-time Attendance',desc:'Track attendance with live dashboards and smart at-risk alerts.'},
  {icon:'📝',title:'Assignment Management',desc:'Create, submit and grade assignments seamlessly.'},
  {icon:'⭐',title:'Results & Grading',desc:'Auto-compute grades, CGPA, and generate marksheets.'},
  {icon:'💳',title:'Fee Management',desc:'Online payments, scholarship tracking and receipts.'},
  {icon:'🔐',title:'Access Control',desc:'Admin controls who gets access to what, instantly.'},
  {icon:'📢',title:'Announcements',desc:'Targeted announcements to batches, subjects or all users.'},
];

export default function Landing() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 40); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);

  const PANELS = [
    { key:'student', icon:'🎓', title:'Student Portal', accent:'var(--accent)', grad:'linear-gradient(135deg,var(--accent),#3b6fd4)', glow:'rgba(79,142,247,.25)', path:'/student/login',
      desc:'Access attendance, results, assignments, exams, fees and more.',
      features:['📊 Attendance & alerts','⭐ Results & CGPA','📝 Assignment submissions','💳 Online fee payment','📅 Exam schedules','🔔 Grievance portal'] },
    { key:'teacher', icon:'👨‍🏫', title:'Faculty Portal', accent:'var(--t-accent)', grad:'linear-gradient(135deg,var(--t-accent),#4f46e5)', glow:'rgba(99,102,241,.25)', path:'/teacher/login',
      desc:'Manage classes, marks, attendance and student progress.',
      features:['📋 Mark attendance','📝 Post & grade assignments','⭐ Marks & grade distribution','👥 Student at-risk alerts','📢 Announcements','🗓️ Leave management'] },
    { key:'admin', icon:'🛡️', title:'Admin Panel', accent:'var(--a-accent)', grad:'linear-gradient(135deg,var(--a-accent),#e11d48)', glow:'rgba(244,63,94,.25)', path:'/admin/login',
      desc:'Full control — manage users, access, data and the entire platform.',
      features:['👥 Manage all users','🔐 Grant / revoke access','📋 Control all records','💳 Fee & scholarship mgmt','📊 Platform-wide analytics','⚙️ System settings'] },
  ];

  return (
    <div style={S.page}>
      <nav style={{...S.nav,...(scrolled?S.navScrolled:{})}}>
        <div style={S.navLogo}>Edu<span style={{color:'var(--accent)'}}>Core</span></div>
        <div style={S.navLinks}>
          <a href="#panels" style={S.navLink}>Portals</a>
          <a href="#features" style={S.navLink}>Features</a>
          <a href="#stats" style={S.navLink}>About</a>
        </div>
        <div style={{display:'flex',gap:10}}>
          <button onClick={()=>navigate('/student/login')} style={S.navBtnOutline}>Student</button>
          <button onClick={()=>navigate('/teacher/login')} style={{...S.navBtnOutline,borderColor:'rgba(99,102,241,.4)',color:'var(--t-accent)'}}>Faculty</button>
          <button onClick={()=>navigate('/admin/login')} style={{...S.navBtnSolid,background:'var(--a-accent)',boxShadow:'0 4px 14px rgba(244,63,94,.35)'}}>Admin</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={S.hero}>
        <div style={S.blob1}/><div style={S.blob2}/><div style={S.blob3}/>
        <div style={S.heroContent}>
          <div className="fade-up" style={S.heroBadge}>🎓 Next-Gen College ERP Platform</div>
          <h1 className="fade-up1" style={S.heroTitle}>Your Complete<br/><span style={{color:'var(--accent)'}}>Academic Universe</span></h1>
          <p className="fade-up2" style={S.heroSub}>EduCore unifies student learning, faculty management, attendance, results, fees and administration — all in one powerful platform.</p>
          <div className="fade-up3" style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <button onClick={()=>navigate('/student/login')} style={S.btnBlue}>Student Portal →</button>
            <button onClick={()=>navigate('/teacher/login')} style={S.btnIndigo}>Faculty Portal →</button>
            <button onClick={()=>navigate('/admin/login')} style={S.btnRose}>Admin Panel →</button>
          </div>
        </div>
        <div className="fade-up2" style={S.heroCards}>
          {[{icon:'📊',val:'81%',lbl:'Avg Attendance',c:'#10b981'},{icon:'⭐',val:'8.6',lbl:'Avg CGPA',c:'var(--accent)'},{icon:'🛡️',val:'100%',lbl:'Data Security',c:'var(--a-accent)'}].map((c,i)=>(
            <div key={i} style={{...S.floatCard,animation:`float 3s ease-in-out infinite ${i}s`}}>
              <div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color:c.c}}>{c.val}</div>
              <div style={{fontSize:11,color:'var(--muted)'}}>{c.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Panel Cards */}
      <section id="panels" style={S.panels}>
        <div style={S.sectionHead}>
          <div style={S.sectionBadge}>Choose Your Portal</div>
          <h2 style={S.sectionTitle}>Three Portals, One Platform</h2>
          <p style={S.sectionSub}>Every role has its own dedicated portal — designed for exactly what they need.</p>
        </div>
        <div style={S.panelGrid}>
          {PANELS.map(p=>(
            <div key={p.key} onMouseEnter={()=>setHovered(p.key)} onMouseLeave={()=>setHovered(null)} onClick={()=>navigate(p.path)}
              style={{...S.panelCard,...(hovered===p.key?S.panelHover:{}),borderColor:hovered===p.key?p.accent:'var(--border)'}}>
              <div style={{...S.panelGlow,background:`radial-gradient(circle at 50% 0%, ${p.glow} 0%, transparent 70%)`}}/>
              <div style={{...S.panelIcon,background:p.grad}}>{p.icon}</div>
              <h3 style={S.panelTitle}>{p.title}</h3>
              <p style={S.panelDesc}>{p.desc}</p>
              <ul style={S.panelList}>{p.features.map(f=><li key={f} style={S.panelLi}>{f}</li>)}</ul>
              <div style={{...S.panelBtn,background:p.grad,boxShadow:hovered===p.key?`0 8px 28px ${p.glow}`:`0 4px 14px ${p.glow}`}}>Enter {p.title} →</div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section id="stats" style={S.statsSection}>
        {STATS.map((s,i)=>(
          <div key={i} style={S.statCard}>
            <div style={S.statVal}>{s.val}</div>
            <div style={S.statLbl}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section id="features" style={S.featuresSection}>
        <div style={S.sectionHead}>
          <div style={S.sectionBadge}>Platform Features</div>
          <h2 style={S.sectionTitle}>Everything in One Place</h2>
        </div>
        <div style={S.featuresGrid}>
          {FEATURES.map((f,i)=>(
            <div key={i} style={S.featureCard}>
              <div style={{fontSize:28,marginBottom:12}}>{f.icon}</div>
              <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:700,marginBottom:8}}>{f.title}</div>
              <div style={{fontSize:13,color:'var(--muted2)',lineHeight:1.6}}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section style={S.footerCta}>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:36,fontWeight:800,marginBottom:12,position:'relative'}}>Ready to get started?</h2>
        <p style={{fontSize:15,color:'var(--muted2)',marginBottom:28,position:'relative'}}>Choose your role and sign in to EduCore ERP.</p>
        <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap',position:'relative'}}>
          <button onClick={()=>navigate('/student/login')} style={S.btnBlue}>🎓 Student Login</button>
          <button onClick={()=>navigate('/teacher/login')} style={S.btnIndigo}>👨‍🏫 Faculty Login</button>
          <button onClick={()=>navigate('/admin/login')} style={S.btnRose}>🛡️ Admin Login</button>
        </div>
      </section>

      <footer style={S.footer}>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:16}}>Edu<span style={{color:'var(--accent)'}}>Core</span> ERP</div>
        <div style={{fontSize:12,color:'var(--muted)'}}>© 2026 EduCore. All rights reserved.</div>
      </footer>
    </div>
  );
}

const S = {
  page:{background:'var(--bg)',minHeight:'100vh',overflowX:'hidden'},
  nav:{position:'fixed',top:0,left:0,right:0,zIndex:200,display:'flex',alignItems:'center',padding:'18px 60px',gap:40,transition:'all .3s'},
  navScrolled:{background:'rgba(11,15,26,.92)',backdropFilter:'blur(16px)',borderBottom:'1px solid var(--border)',padding:'14px 60px'},
  navLogo:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:22,letterSpacing:'-0.5px'},
  navLinks:{display:'flex',gap:28,flex:1,justifyContent:'center'},
  navLink:{fontSize:14,color:'var(--muted2)',fontWeight:500,cursor:'pointer'},
  navBtnOutline:{padding:'8px 16px',borderRadius:10,border:'1px solid var(--border)',background:'transparent',color:'var(--muted2)',fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,cursor:'pointer'},
  navBtnSolid:{padding:'8px 16px',borderRadius:10,border:'none',color:'#fff',fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:600,cursor:'pointer'},
  hero:{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'120px 60px 80px',gap:60,position:'relative',overflow:'hidden'},
  blob1:{position:'absolute',top:-100,right:-100,width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(79,142,247,.15) 0%,transparent 70%)',pointerEvents:'none'},
  blob2:{position:'absolute',bottom:-100,left:-100,width:400,height:400,borderRadius:'50%',background:'radial-gradient(circle,rgba(99,102,241,.12) 0%,transparent 70%)',pointerEvents:'none'},
  blob3:{position:'absolute',top:'40%',left:'40%',width:300,height:300,borderRadius:'50%',background:'radial-gradient(circle,rgba(244,63,94,.08) 0%,transparent 70%)',pointerEvents:'none'},
  heroContent:{flex:1,maxWidth:580,position:'relative',zIndex:1},
  heroBadge:{display:'inline-block',background:'rgba(79,142,247,.1)',border:'1px solid rgba(79,142,247,.25)',color:'var(--accent)',fontSize:13,fontWeight:600,padding:'7px 16px',borderRadius:20,marginBottom:22},
  heroTitle:{fontFamily:"'Syne',sans-serif",fontSize:56,fontWeight:800,lineHeight:1.1,marginBottom:20},
  heroSub:{fontSize:16,color:'var(--muted2)',lineHeight:1.7,marginBottom:32,maxWidth:480},
  heroCards:{display:'flex',flexDirection:'column',gap:16,position:'relative',zIndex:1},
  floatCard:{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:16,padding:'20px 28px',textAlign:'center',boxShadow:'0 20px 60px rgba(0,0,0,.3)'},
  btnBlue:{padding:'13px 24px',borderRadius:12,border:'none',background:'linear-gradient(135deg,var(--accent),#3b6fd4)',color:'#fff',fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,cursor:'pointer',boxShadow:'0 6px 24px rgba(79,142,247,.4)'},
  btnIndigo:{padding:'13px 24px',borderRadius:12,border:'none',background:'linear-gradient(135deg,var(--t-accent),#4f46e5)',color:'#fff',fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,cursor:'pointer',boxShadow:'0 6px 24px rgba(99,102,241,.4)'},
  btnRose:{padding:'13px 24px',borderRadius:12,border:'none',background:'linear-gradient(135deg,var(--a-accent),#e11d48)',color:'#fff',fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,cursor:'pointer',boxShadow:'0 6px 24px rgba(244,63,94,.4)'},
  panels:{padding:'80px 60px',maxWidth:1300,margin:'0 auto'},
  sectionHead:{textAlign:'center',marginBottom:48},
  sectionBadge:{display:'inline-block',background:'rgba(79,142,247,.1)',border:'1px solid rgba(79,142,247,.2)',color:'var(--accent)',fontSize:12,fontWeight:700,padding:'6px 16px',borderRadius:20,marginBottom:14,textTransform:'uppercase',letterSpacing:'.5px'},
  sectionTitle:{fontFamily:"'Syne',sans-serif",fontSize:38,fontWeight:800,marginBottom:12},
  sectionSub:{fontSize:15,color:'var(--muted2)',maxWidth:520,margin:'0 auto',lineHeight:1.7},
  panelGrid:{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24},
  panelCard:{background:'var(--surface)',border:'2px solid var(--border)',borderRadius:24,padding:'32px 28px',cursor:'pointer',transition:'transform .25s,box-shadow .25s,border-color .25s',position:'relative',overflow:'hidden'},
  panelHover:{transform:'translateY(-6px)',boxShadow:'0 24px 60px rgba(0,0,0,.4)'},
  panelGlow:{position:'absolute',top:0,left:0,right:0,height:200,pointerEvents:'none'},
  panelIcon:{width:60,height:60,borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,marginBottom:18,position:'relative'},
  panelTitle:{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,marginBottom:10,position:'relative'},
  panelDesc:{fontSize:14,color:'var(--muted2)',lineHeight:1.7,marginBottom:18,position:'relative'},
  panelList:{listStyle:'none',display:'flex',flexDirection:'column',gap:8,marginBottom:24,position:'relative'},
  panelLi:{fontSize:13,color:'var(--muted2)'},
  panelBtn:{width:'100%',padding:'13px',borderRadius:12,color:'#fff',border:'none',fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,cursor:'pointer',textAlign:'center',position:'relative',transition:'box-shadow .25s'},
  statsSection:{display:'grid',gridTemplateColumns:'repeat(4,1fr)',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)',background:'var(--surface)'},
  statCard:{padding:'40px 20px',textAlign:'center',borderRight:'1px solid var(--border)'},
  statVal:{fontFamily:"'Syne',sans-serif",fontSize:40,fontWeight:800,color:'var(--accent)',marginBottom:6},
  statLbl:{fontSize:13,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.5px'},
  featuresSection:{padding:'80px 60px',maxWidth:1200,margin:'0 auto'},
  featuresGrid:{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18},
  featureCard:{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:18,padding:'24px 22px'},
  footerCta:{padding:'80px 60px',textAlign:'center',position:'relative',overflow:'hidden'},
  footer:{padding:'24px 60px',borderTop:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center',background:'var(--surface)'},
};
