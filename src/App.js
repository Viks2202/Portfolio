import { useState, useEffect, useRef } from 'react';

const NAV_LINKS = ['home', 'about', 'skills', 'projects', 'contact'];

const SKILLS = [
  { category: 'Backend', icon: '⚙️', color: '#3b82f6', items: ['Node.js', 'Express.js', 'REST API', 'JWT Auth', 'bcrypt', 'Middleware'] },
  { category: 'Database', icon: '🗄️', color: '#8b5cf6', items: ['MongoDB', 'Mongoose', 'Redis', 'MySQL', 'Aggregation', 'Indexing'] },
  { category: 'Frontend', icon: '🎨', color: '#ec4899', items: ['React.js', 'Tailwind CSS', 'Context API', 'React Router', 'Axios', 'HTML/CSS'] },
  { category: 'DevOps & Tools', icon: '🚀', color: '#10b981', items: ['Git & GitHub', 'Render', 'Vercel', 'Postman', 'VS Code', 'Swagger'] },
  { category: 'Security', icon: '🔒', color: '#f59e0b', items: ['Helmet.js', 'CORS', 'Rate Limiting', 'XSS Protection', 'NoSQL Inject Prevention'] },
  { category: 'Integrations', icon: '🔗', color: '#ef4444', items: ['Razorpay', 'Cloudinary', 'Nodemailer', 'Mailtrap', 'OpenAPI/Swagger'] },
];

const PROJECTS = [
  {
    title: 'DevMart — Full Stack E-Commerce',
    description: 'Production-grade e-commerce platform with JWT auth, Razorpay payment gateway, coupon/discount system, wishlist, AI recommendations, and admin panel. React frontend with complete backend API.',
    tech: ['Node.js', 'Express', 'MongoDB', 'React', 'Razorpay', 'Cloudinary', 'JWT'],
    live: 'https://devmart-frontend.vercel.app',
    api: 'https://devmart-api.onrender.com',
    docs: 'https://devmart-api.onrender.com/api-docs',
    github: 'https://github.com/Viks2202/devmart',
    type: 'Full Stack',
    color: '#e94560',
    emoji: '🛒',
    highlights: ['Razorpay Payment Integration', 'AI-based Recommendations', 'Admin Dashboard', 'Swagger Docs'],
  },
  {
    title: 'HireFlow — Job Board Platform',
    description: 'Multi-role job board API with candidate, employer, and admin roles. Features PDF resume upload, skill-based job recommendations, application tracking, email notifications, and API documentation.',
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Cloudinary', 'Swagger', 'Nodemailer'],
    live: 'https://hireflow-api.onrender.com',
    docs: 'https://hireflow-api.onrender.com/api-docs',
    github: 'https://github.com/Viks2202/hireflow',
    type: 'Backend API',
    color: '#3b82f6',
    emoji: '💼',
    highlights: ['3-Role RBAC System', 'PDF Resume Upload', 'Skill Matching', 'Email Notifications'],
  },
  {
    title: 'Game Hub',
    description: 'Dynamic gaming platform built with React.js offering seamless discovery and interactive experience for browsing games across multiple genres and platforms.',
    tech: ['React.js', 'CSS3', 'REST API'],
    live: 'https://game-hub-sigma-virid.vercel.app/',
    github: 'https://github.com/Viks2202',
    type: 'Frontend',
    color: '#10b981',
    emoji: '🎮',
    highlights: ['Game Discovery', 'Responsive Design', 'API Integration'],
  },
];

const STATS = [
  { label: 'Projects Deployed', value: '2', suffix: '+' },
  { label: 'API Endpoints Built', value: '40', suffix: '+' },
  { label: 'GitHub Commits', value: '100', suffix: '+' },
  { label: 'Tech Stack', value: '15', suffix: '+' },
];

function TypeWriter({ texts }) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!deleting && charIndex < current.length) {
        setDisplayText(current.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      } else if (!deleting && charIndex === current.length) {
        setTimeout(() => setDeleting(true), 1500);
      } else if (deleting && charIndex > 0) {
        setDisplayText(current.slice(0, charIndex - 1));
        setCharIndex(c => c - 1);
      } else if (deleting && charIndex === 0) {
        setDeleting(false);
        setTextIndex(t => (t + 1) % texts.length);
      }
    }, deleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, textIndex, texts]);

  return (
    <span>
      {displayText}
      <span style={{ animation: 'blink 1s infinite', borderRight: '3px solid #3b82f6' }}></span>
    </span>
  );
}

function CountUp({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const end = parseInt(target);
        const duration = 1500;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);
  const [activeSkillCat, setActiveSkillCat] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState('all');

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: 'smooth' }); setActiveSection(id); setMenuOpen(false); }
  };

  useEffect(() => {
    const handleScroll = () => {
      NAV_LINKS.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) setActiveSection(id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setFormSent(false), 4000);
  };

  const filteredProjects = visibleProjects === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.type.toLowerCase().includes(visibleProjects));

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#0f172a', color: '#e2e8f0', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 3px; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(59,130,246,0.3)} 50%{box-shadow:0 0 40px rgba(59,130,246,0.6)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .fade-in { animation: fadeIn 0.6s ease forwards; }
        .float { animation: float 3s ease-in-out infinite; }
        .glow { animation: glow 2s ease-in-out infinite; }
        section { animation: fadeIn 0.5s ease; }
        a { text-decoration: none; }
        .gradient-text { background: linear-gradient(135deg, #3b82f6, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .glass { background: rgba(30,41,59,0.8); backdrop-filter: blur(10px); border: 1px solid rgba(59,130,246,0.2); }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(59,130,246,0.2); }
        @media (max-width: 768px) {
          .hero-title { font-size: 2rem !important; }
          .hero-sub { font-size: 1rem !important; }
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: 1fr 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(59,130,246,0.2)',
        padding: '0 24px', height: '65px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div onClick={() => scrollToSection('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: 36, height: 36, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
            borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 900, color: 'white'
          }}>VS</div>
          <span style={{ fontWeight: 800, fontSize: 18, color: 'white' }}>Vikas<span style={{ color: '#3b82f6' }}>Sharma</span></span>
        </div>

        <div className="nav-desktop" style={{ display: 'flex', gap: 8 }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollToSection(link)}
              style={{
                background: activeSection === link ? 'rgba(59,130,246,0.2)' : 'transparent',
                border: 'none', color: activeSection === link ? '#3b82f6' : '#94a3b8',
                padding: '8px 16px', borderRadius: 8, cursor: 'pointer',
                fontWeight: 600, fontSize: 14, textTransform: 'capitalize',
                borderBottom: activeSection === link ? '2px solid #3b82f6' : '2px solid transparent',
                transition: 'all 0.3s'
              }}>
              {link}
            </button>
          ))}
        </div>

        <button className="nav-mobile-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'none', background: 'none', border: 'none', color: 'white', fontSize: 24, cursor: 'pointer', flexDirection: 'column', gap: 4 }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {menuOpen && (
        <div style={{
          position: 'fixed', top: 65, left: 0, right: 0, zIndex: 999,
          background: 'rgba(15,23,42,0.98)', borderBottom: '1px solid rgba(59,130,246,0.2)',
          padding: 16, display: 'flex', flexDirection: 'column', gap: 8
        }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollToSection(link)}
              style={{
                background: activeSection === link ? 'rgba(59,130,246,0.2)' : 'transparent',
                border: 'none', color: activeSection === link ? '#3b82f6' : '#94a3b8',
                padding: '12px 16px', borderRadius: 8, cursor: 'pointer',
                fontWeight: 600, fontSize: 15, textTransform: 'capitalize', textAlign: 'left'
              }}>
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 65, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.1) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.1) 0%, transparent 60%)' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', width: '100%' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 50, padding: '6px 16px', marginBottom: 20 }}>
              <span style={{ width: 8, height: 8, background: '#10b981', borderRadius: '50%', animation: 'glow 2s infinite' }}></span>
              <span style={{ color: '#3b82f6', fontSize: 13, fontWeight: 600 }}>Open to Work — Backend & Full Stack</span>
            </div>

            <h1 className="hero-title" style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1.15, marginBottom: 16, color: 'white' }}>
              Hi, I'm <span className="gradient-text">Vikas Sharma</span>
            </h1>

            <h2 className="hero-sub" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#94a3b8', marginBottom: 24, minHeight: 30 }}>
              <TypeWriter texts={['Backend Developer', 'Node.js Engineer', 'Full Stack Developer', 'REST API Specialist', 'MongoDB Expert']} />
            </h2>

            <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: 32, fontSize: 15 }}>
              MCA graduate who builds production-grade REST APIs and full-stack applications. 
              Passionate about clean architecture, API security, and shipping real products that work.
              Currently seeking backend and full-stack opportunities in Delhi NCR and remote.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={() => scrollToSection('projects')}
                style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', border: 'none', color: 'white', padding: '13px 28px', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s' }}
                onMouseOver={e => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={e => e.target.style.transform = 'translateY(0)'}>
                View Projects →
              </button>
              <a href="https://github.com/Viks2202" target="_blank" rel="noreferrer"
                style={{ background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(59,130,246,0.3)', color: '#94a3b8', padding: '13px 28px', borderRadius: 12, fontSize: 15, fontWeight: 700, display: 'inline-block', transition: 'all 0.3s' }}>
                GitHub ↗
              </a>
              <a href="http://www.linkedin.com/in/vikas2103" target="_blank" rel="noreferrer"
                style={{ background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(59,130,246,0.3)', color: '#94a3b8', padding: '13px 28px', borderRadius: 12, fontSize: 15, fontWeight: 700, display: 'inline-block', transition: 'all 0.3s' }}>
                LinkedIn ↗
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="float" style={{ position: 'relative' }}>
              <div style={{
                width: 280, height: 280, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))',
                border: '2px solid rgba(59,130,246,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 80, position: 'relative'
              }}>
                <span>👨‍💻</span>
                {[
                  { emoji: '⚙️', top: -10, right: 20, bg: '#3b82f6' },
                  { emoji: '🛒', top: 20, left: -20, bg: '#e94560' },
                  { emoji: '💼', bottom: 20, right: -20, bg: '#8b5cf6' },
                  { emoji: '🗄️', bottom: -10, left: 20, bg: '#10b981' },
                ].map(({ emoji, bg, ...pos }, i) => (
                  <div key={i} style={{
                    position: 'absolute', ...pos,
                    width: 48, height: 48, borderRadius: 12,
                    background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, boxShadow: `0 8px 20px ${bg}66`
                  }}>{emoji}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ background: 'rgba(30,41,59,0.5)', borderTop: '1px solid rgba(59,130,246,0.15)', borderBottom: '1px solid rgba(59,130,246,0.15)', padding: '32px 24px' }}>
        <div className="stats-grid" style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
          {STATS.map(({ label, value, suffix }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#3b82f6', marginBottom: 4 }}>
                <CountUp target={value} suffix={suffix} />
              </div>
              <div style={{ color: '#64748b', fontSize: 13, fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: 'white', marginBottom: 12 }}>About <span className="gradient-text">Me</span></h2>
            <div style={{ width: 60, height: 4, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', margin: '0 auto', borderRadius: 2 }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
            <div>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 20, fontSize: 15 }}>
                I'm a <strong style={{ color: 'white' }}>Backend Developer</strong> from Delhi, India with an MCA from JIMS Rohini (GGSIPU). I specialize in building production-ready REST APIs using Node.js, Express.js, and MongoDB.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: 20, fontSize: 15 }}>
                I've built and deployed two complete projects — <strong style={{ color: '#e94560' }}>DevMart</strong> (full-stack e-commerce with Razorpay, AI recommendations, admin panel) and <strong style={{ color: '#3b82f6' }}>HireFlow</strong> (multi-role job board API with Swagger docs).
              </p>
              <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 15 }}>
                I believe in shipping real products, not just tutorials. Every project I build is deployed, documented, and publicly accessible.
              </p>

              <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                <a href="http://www.linkedin.com/in/vikas2103" target="_blank" rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', color: '#3b82f6', padding: '10px 20px', borderRadius: 10, fontWeight: 600, fontSize: 14 }}>
                  🔗 LinkedIn
                </a>
                <a href="https://github.com/Viks2202" target="_blank" rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(100,116,139,0.3)', color: '#94a3b8', padding: '10px 20px', borderRadius: 10, fontWeight: 600, fontSize: 14 }}>
                  📁 GitHub
                </a>
                <a href="https://leetcode.com/u/VIKAS_SK/" target="_blank" rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b', padding: '10px 20px', borderRadius: 10, fontWeight: 600, fontSize: 14 }}>
                  💡 LeetCode
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'Education', value: 'MCA — JIMS Rohini (GGSIPU) | 89%', icon: '🎓' },
                { label: 'Location', value: 'Delhi, India | Open to Remote Opportunities', icon: '📍' },
                { label: 'Experience', value: 'UI Developer Intern — Meritto', icon: '💼' },
                { label: 'Status', value: 'Actively looking for opportunities', icon: '🟢' },
                { label: 'Focus', value: 'Backend · Full Stack · REST APIs', icon: '⚙️' },
              ].map(({ label, value, icon }) => (
                <div key={label} className="glass card-hover" style={{ padding: '14px 18px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{icon}</span>
                  <div>
                    <div style={{ color: '#64748b', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
                    <div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 500, marginTop: 2 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: '80px 24px', background: 'rgba(15,23,42,0.5)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: 'white', marginBottom: 12 }}>Technical <span className="gradient-text">Skills</span></h2>
            <div style={{ width: 60, height: 4, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', margin: '0 auto 16px', borderRadius: 2 }} />
            <p style={{ color: '#64748b', fontSize: 15 }}>Click any category to explore the skills</p>
          </div>

          <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {SKILLS.map((cat) => (
              <div key={cat.category}
                className="glass card-hover"
                onClick={() => setActiveSkillCat(activeSkillCat === cat.category ? null : cat.category)}
                style={{ padding: 20, borderRadius: 16, cursor: 'pointer', border: activeSkillCat === cat.category ? `1px solid ${cat.color}` : '1px solid rgba(59,130,246,0.2)', transition: 'all 0.3s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: activeSkillCat === cat.category ? 14 : 0 }}>
                  <span style={{ fontSize: 24 }}>{cat.icon}</span>
                  <span style={{ fontWeight: 700, color: 'white', fontSize: 15 }}>{cat.category}</span>
                  <span style={{ marginLeft: 'auto', color: cat.color, fontSize: 12 }}>{activeSkillCat === cat.category ? '▲' : '▼'}</span>
                </div>
                {activeSkillCat === cat.category && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {cat.items.map(item => (
                      <span key={item} style={{ background: `${cat.color}22`, border: `1px solid ${cat.color}44`, color: cat.color, padding: '4px 12px', borderRadius: 50, fontSize: 13, fontWeight: 500 }}>
                        {item}
                      </span>
                    ))}
                  </div>
                )}
                {activeSkillCat !== cat.category && (
                  <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>
                    {cat.items.slice(0, 3).join(' · ')} {cat.items.length > 3 ? `+${cat.items.length - 3}` : ''}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: 'white', marginBottom: 12 }}>Featured <span className="gradient-text">Projects</span></h2>
            <div style={{ width: 60, height: 4, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', margin: '0 auto 24px', borderRadius: 2 }} />

            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['all', 'full stack', 'backend', 'frontend'].map(filter => (
                <button key={filter} onClick={() => setVisibleProjects(filter)}
                  style={{ background: visibleProjects === filter ? 'linear-gradient(135deg,#3b82f6,#8b5cf6)' : 'rgba(30,41,59,0.8)', border: 'none', color: visibleProjects === filter ? 'white' : '#94a3b8', padding: '8px 20px', borderRadius: 50, cursor: 'pointer', fontWeight: 600, fontSize: 14, textTransform: 'capitalize', transition: 'all 0.3s' }}>
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: 24 }}>
            {filteredProjects.map((project, i) => (
              <div key={i} className="glass card-hover" style={{ borderRadius: 20, overflow: 'hidden', border: `1px solid ${project.color}33` }}>
                <div style={{ padding: '24px 24px 16px', borderBottom: `1px solid ${project.color}22` }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 44, height: 44, background: `${project.color}22`, border: `1px solid ${project.color}44`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                        {project.emoji}
                      </div>
                      <div>
                        <span style={{ background: `${project.color}22`, color: project.color, padding: '2px 10px', borderRadius: 50, fontSize: 12, fontWeight: 600 }}>{project.type}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <a href={project.github} target="_blank" rel="noreferrer"
                        style={{ background: 'rgba(100,116,139,0.2)', color: '#94a3b8', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600 }}>GitHub</a>
                      {project.docs && (
                        <a href={project.docs} target="_blank" rel="noreferrer"
                          style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600 }}>Docs</a>
                      )}
                    </div>
                  </div>
                  <h3 style={{ color: 'white', fontWeight: 800, fontSize: 18, marginBottom: 10 }}>{project.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{project.description}</p>
                </div>

                <div style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                    {project.tech.map(t => (
                      <span key={t} style={{ background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(100,116,139,0.3)', color: '#64748b', padding: '3px 10px', borderRadius: 50, fontSize: 12 }}>{t}</span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
                    {project.highlights.map(h => (
                      <span key={h} style={{ display: 'flex', alignItems: 'center', gap: 4, color: project.color, fontSize: 12, fontWeight: 500 }}>
                        <span>✓</span>{h}
                      </span>
                    ))}
                  </div>

                  <a href={project.live} target="_blank" rel="noreferrer"
                    style={{ display: 'block', textAlign: 'center', background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)`, color: 'white', padding: '11px', borderRadius: 12, fontWeight: 700, fontSize: 14, transition: 'all 0.3s' }}
                    onMouseOver={e => e.target.style.opacity = 0.9}
                    onMouseOut={e => e.target.style.opacity = 1}>
                    🚀 View Live Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: '80px 24px', background: 'rgba(15,23,42,0.5)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: 'white', marginBottom: 12 }}>Get In <span className="gradient-text">Touch</span></h2>
            <div style={{ width: 60, height: 4, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', margin: '0 auto 16px', borderRadius: 2 }} />
            <p style={{ color: '#64748b', fontSize: 15 }}>Open to backend, full-stack, and remote opportunities. Let's talk!</p>
          </div>

          <div className="glass" style={{ borderRadius: 20, padding: 36 }}>
            {formSent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 60, marginBottom: 16 }}>✅</div>
                <h3 style={{ color: '#10b981', fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ color: '#64748b' }}>Thank you for reaching out. I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[
                    { label: 'Your Name', key: 'name', type: 'text', placeholder: 'Rohit Sharma' },
                    { label: 'Your Email', key: 'email', type: 'email', placeholder: 'rohit@company.com' },
                  ].map(field => (
                    <div key={field.key}>
                      <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{field.label}</label>
                      <input
                        type={field.type}
                        value={formData[field.key]}
                        onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        required
                        style={{ width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 10, padding: '12px 16px', color: 'white', fontSize: 14, outline: 'none' }}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Message</label>
                  <textarea
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Vikas, I'd love to discuss a backend role at our company..."
                    rows={5}
                    required
                    style={{ width: '100%', background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 10, padding: '12px 16px', color: 'white', fontSize: 14, resize: 'vertical', outline: 'none', fontFamily: 'inherit' }}
                  />
                </div>
                <button type="submit"
                  style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', border: 'none', color: 'white', padding: '14px', borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: 'pointer', transition: 'all 0.3s' }}
                  onMouseOver={e => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={e => e.target.style.transform = 'translateY(0)'}>
                  Send Message 🚀
                </button>
              </form>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 32 }}>
            {[
              { label: 'LinkedIn', url: 'http://www.linkedin.com/in/vikas2103', color: '#0077b5', icon: '🔗' },
              { label: 'GitHub', url: 'https://github.com/Viks2202', color: '#6e5494', icon: '📁' },
              { label: 'LeetCode', url: 'https://leetcode.com/u/VIKAS_SK/', color: '#f59e0b', icon: '💡' },
            ].map(({ label, url, color, icon }) => (
              <a key={label} href={url} target="_blank" rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 6, background: `${color}22`, border: `1px solid ${color}44`, color: color, padding: '10px 18px', borderRadius: 10, fontWeight: 600, fontSize: 14, transition: 'all 0.3s' }}
                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                {icon} {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'rgba(15,23,42,0.95)', borderTop: '1px solid rgba(59,130,246,0.2)', padding: '24px', textAlign: 'center' }}>
        <p style={{ color: '#475569', fontSize: 14 }}>
          Built by <strong style={{ color: '#3b82f6' }}>Vikas Sharma</strong> with React.js
          {' · '}
          <a href="https://devmart-api.onrender.com/api-docs" target="_blank" rel="noreferrer" style={{ color: '#3b82f6' }}>DevMart API</a>
          {' · '}
          <a href="https://hireflow-api.onrender.com/api-docs" target="_blank" rel="noreferrer" style={{ color: '#3b82f6' }}>HireFlow API</a>
        </p>
      </footer>
    </div>
  );
}
