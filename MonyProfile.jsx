import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './MonyProfile.css'

const profileData = {
  name: 'Reaksmey Kunmony',
  title: 'Full Stack Developer',
  tagline: 'Bridging complex SAP backend architectures with modern frontend experiences',
  email: 'kunmony.reaksmey@bizdimension.com',
  phone: '(+855) 96 58 09 395',
  avatar: '/mony1.png',
  profile: 'A dedicated Full Stack Developer with a unique foundation in stock operations and retail sales, enabling me to build highly practical, business-driven software. I specialize in bridging complex SAP backend architectures with modern frontend experiences (UI5, ReactJS, and Flutter). My track record ranges from architecting gas station management systems and logistics apps to building high-performance automation services like Node JS Cron Jobs and File Synchronization systems.',
  education: [
    { school: 'National Polytechnic Techo Sen Institute', period: '2019 – 2025', degree: 'Undergraduate Program' },
    { school: 'Hunsen Serey Pheap', period: '2013 – 2019', degree: 'High School Diploma' },
    { school: 'Hunsen Prek Russey', period: '2006 – 2013', degree: 'Primary & Secondary Education' },
  ],
  certifications: [
    'Critical Thinking & Analytics Frameworks',
    'Advanced ReactJS & Frontend Architectures',
  ],
  experiences: [
    {
      company: 'BizDimension co., ltd',
      role: 'Developer (Full Stack & Mobile)',
      period: '2023 – Present',
      highlights: [
        'Architected the Tela Web App system using ReactJS and SAP integration, backed by high-performance Node JS Cron Jobs.',
        'Designed & developed the Technician Service Flutter app for equipment maintenance, featuring real-time SAP syncing and PDF generation.',
        'Engineered the Delivery Tracking Flutter app for logistics, integrating Proof-of-Delivery (POD), signature capture, and photo verification.',
        'Automated the flow from SAP Delivery Notes to the mobile driver application, optimizing the entire shipment lifecycle.',
      ],
    },
    {
      company: 'Baby Care Shop (Takhmao)',
      role: 'Stock Controller & Sales Consultant',
      period: '2019 – 2023',
      highlights: [
        'Managed inventory accuracy and logistics operations, providing a solid foundation for current enterprise ERP/SAP work.',
        'Developed customer-centric communication skills and a deep understanding of retail business flow.',
      ],
    },
  ],
  skills: [
    { name: 'ReactJS / UI5', level: 90, type: 'front' },
    { name: 'Flutter (Mobile)', level: 85, type: 'front' },
    { name: 'Node JS / Backend', level: 88, type: 'back' },
    { name: 'SAP Integration', level: 85, type: 'back' },
    { name: 'Creativity & Logic', level: 95, type: 'core' },
    { name: 'Architecture Design', level: 88, type: 'core' },
  ],
  languages: [
    { name: 'Khmer', level: 'Native' },
    { name: 'English', level: 'Proficient' },
  ],
  projects: [
    {
      name: 'Tela Web App',
      desc: 'ReactJS & SAP integrated web automation system with Node JS cron jobs.',
      tech: ['ReactJS', 'Node JS', 'SAP'],
      type: 'fullstack'
    },
    {
      name: 'Technician Mobile Service',
      desc: 'Flutter service app featuring real-time SAP syncing & PDF signature generation.',
      tech: ['Flutter', 'SAP', 'Mobile'],
      type: 'fullstack'
    },
    {
      name: 'Delivery Tracking System',
      desc: 'Real-time logistics tracking, POD with signatures & photo verification.',
      tech: ['Flutter', 'Logistics', 'SAP'],
      type: 'frontend'
    },
    {
      name: 'Retail Stock Operations',
      desc: 'Foundation of current logistics understanding and user-centric flows.',
      tech: ['Retail', 'Logistics', 'Operations'],
      type: 'backend'
    },
  ],
}

function useInView(options = { threshold: 0.1 }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.unobserve(e.target) }
    }, options)
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [options.threshold])
  return [ref, vis]
}

export default function MonyProfile() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="mn-stack-page">
      {/* Dynamic Dual-Layer Background */}
      <div className="mn-bg-layers">
        <div className="mn-grid-floor"></div>
        <div className="mn-glow-front"></div>
        <div className="mn-glow-back"></div>
        <div className="mn-float-layer mn-layer-1"></div>
        <div className="mn-float-layer mn-layer-2"></div>
      </div>

      {/* Navigation */}
      <nav className={`mn-nav ${loaded ? 'mn-nav--in' : ''}`}>
        <div className="mn-nav-container">
          <Link to="/" className="mn-logo-back">
            <div className="mn-poly-icon">
              <span></span><span></span>
            </div>
            Team Directory
          </Link>
          <div className="mn-nav-links">
            <a href="#mn-stack">Stack</a>
            <a href="#mn-logic">Logic</a>
            <a href="#mn-deploy">Deployments</a>
          </div>
        </div>
      </nav>

      <main className="mn-main">
        {/* HERO SECTION */}
        <header className={`mn-hero ${loaded ? 'mn-hero--in' : ''}`} id="mn-stack">
          <div className="mn-hero-split">

            <div className="mn-hero-left">
              <div className="mn-sys-badge">
                <span className="mn-badge-fe">UI/UX</span>
                <span className="mn-badge-sep">/</span>
                <span className="mn-badge-be">SERVER</span>
              </div>
              <h1 className="mn-hero-name">{profileData.name}</h1>
              <h2 className="mn-hero-role">{profileData.title}</h2>
              <p className="mn-hero-tagline">{profileData.tagline}</p>

              <div className="mn-hero-metrics">
                <div className="mn-metric">
                  <span className="mn-m-val">4+</span>
                  <span className="mn-m-lbl">Years Logic</span>
                </div>
                <div className="mn-metric">
                  <span className="mn-m-val">SAP</span>
                  <span className="mn-m-lbl">Architecture</span>
                </div>
                <div className="mn-metric">
                  <span className="mn-m-val">UI5</span>
                  <span className="mn-m-lbl">Frontend Eng</span>
                </div>
              </div>

              <div className="mn-hero-actions">
                <a href={`mailto:${profileData.email}`} className="mn-btn mn-btn-core">
                  INITIALIZE CONNECTION
                </a>
                <a href={`tel:${profileData.phone.replace(/\s+/g, '')}`} className="mn-btn mn-btn-ghost">
                  {profileData.phone}
                </a>
              </div>
            </div>

            <div className="mn-hero-right">
              <div className="mn-avatar-cube">
                <div className="mn-cube-face mn-cube-front"></div>
                <div className="mn-cube-face mn-cube-back"></div>
                <img src={profileData.avatar} alt={profileData.name} className="mn-avatar-img" />
              </div>
            </div>

          </div>
        </header>

        {/* DOUBLE COLUMN STACK */}
        <div className="mn-core-grid">
          {/* L Col */}
          <div className="mn-core-col">
            <StackSec title="System Overview" icon="⚡" side="left">
              <div className="mn-terminal-card">
                <div className="mn-term-head">
                  <i></i><i></i><i></i><span>bash — user@bizdimension:~$ ./run_profile.sh</span>
                </div>
                <div className="mn-term-body">
                  <p>{profileData.profile}</p>
                </div>
              </div>
            </StackSec>

            <StackSec title="Technical Layers" icon="🎛" side="left">
              <div className="mn-layers-box">
                {profileData.skills.map((skill, i) => (
                  <LayerBar key={i} skill={skill} index={i} />
                ))}
              </div>
            </StackSec>

            <StackSec title="Certifications" icon="🔐" side="left">
              <div className="mn-auth-card">
                <ul className="mn-auth-list">
                  {profileData.certifications.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </StackSec>
          </div>

          {/* R Col */}
          <div className="mn-core-col">
            <StackSec id="mn-logic" title="Execution Flow" icon="⚙" side="right">
              <div className="mn-flow-track">
                {profileData.experiences.map((exp, i) => (
                  <FlowNode key={i} exp={exp} index={i} />
                ))}
              </div>
            </StackSec>

            <StackSec title="Data Models (Education)" icon="💾" side="right">
              <div className="mn-db-grid">
                {profileData.education.map((edu, i) => (
                  <DbTable key={i} edu={edu} index={i} />
                ))}
              </div>
            </StackSec>
          </div>
        </div>

        {/* BOTTOM FULLSTACK CARDS */}
        <StackSec id="mn-deploy" title="Architected Deployments" icon="🚀" side="full">
          <div className="mn-deploy-grid">
            {profileData.projects.map((proj, i) => (
              <DeployCard key={i} proj={proj} index={i} />
            ))}
          </div>
        </StackSec>

      </main>

      <footer className="mn-footer">
        <div className="mn-footer-inner">
          <Link to="/" className="mn-foot-link">Return to Base</Link>
          <div className="mn-foot-copy">© 2026 Reaksmey Kunmony — Full Stack System End.</div>
        </div>
      </footer>
    </div>
  )
}

function StackSec({ id, title, icon, children, side }) {
  const [ref, vis] = useInView()
  return (
    <section id={id} ref={ref} className={`mn-sec mn-sec-${side} ${vis ? 'mn-sec--in' : ''}`}>
      <h3 className="mn-sec-title">
        <span className="mn-sec-icon">{icon}</span>
        {title}
      </h3>
      <div className="mn-sec-content">{children}</div>
    </section>
  )
}

function LayerBar({ skill, index }) {
  const [ref, vis] = useInView()
  return (
    <div ref={ref} className={`mn-layer ${vis ? 'mn-layer--in' : ''}`} style={{ transitionDelay: `${index * 80}ms` }}>
      <div className="mn-layer-meta">
        <span className="mn-l-name">{skill.name}</span>
        <span className={`mn-l-type mn-l-type-${skill.type}`}>{skill.type}</span>
      </div>
      <div className="mn-layer-track">
        <div
          className={`mn-layer-fill mn-layer-fill-${skill.type}`}
          style={{ width: vis ? `${skill.level}%` : '0%', transitionDelay: `${index * 80 + 200}ms` }}
        ></div>
      </div>
    </div>
  )
}

function FlowNode({ exp, index }) {
  const [ref, vis] = useInView()
  return (
    <div ref={ref} className={`mn-flow-node ${vis ? 'mn-flow-node--in' : ''}`} style={{ transitionDelay: `${index * 120}ms` }}>
      <div className="mn-flow-spine">
        <div className="mn-flow-dot"></div>
        <div className="mn-flow-line"></div>
      </div>
      <div className="mn-flow-card">
        <div className="mn-flow-head">
          <div className="mn-f-left">
            <h4 className="mn-f-role">{exp.role}</h4>
            <span className="mn-f-comp">{exp.company}</span>
          </div>
          <div className="mn-f-period">{exp.period}</div>
        </div>
        <ul className="mn-f-logs">
          {exp.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function DbTable({ edu, index }) {
  const [ref, vis] = useInView()
  return (
    <div ref={ref} className={`mn-db-table ${vis ? 'mn-db-table--in' : ''}`} style={{ transitionDelay: `${index * 100}ms` }}>
      <div className="mn-db-head">TABLE: {edu.degree.replace(/\s+/g, '_').toUpperCase()}</div>
      <div className="mn-db-row">
        <span>SCHOOL:</span>
        <strong>{edu.school}</strong>
      </div>
      <div className="mn-db-row">
        <span>TIMESTAMP:</span>
        <strong>{edu.period}</strong>
      </div>
    </div>
  )
}

function DeployCard({ proj, index }) {
  const [ref, vis] = useInView()
  return (
    <div ref={ref} className={`mn-deploy-card ${vis ? 'mn-deploy-card--in' : ''}`} style={{ transitionDelay: `${index * 100}ms` }}>
      <div className={`mn-deploy-top mn-deploy-top-${proj.type}`}></div>
      <div className="mn-deploy-body">
        <h4 className="mn-deploy-name">{proj.name}</h4>
        <p className="mn-deploy-desc">{proj.desc}</p>
        <div className="mn-deploy-tags">
          {proj.tech.map((t, i) => (
            <span key={i} className="mn-deploy-tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
