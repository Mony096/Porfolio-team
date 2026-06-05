import { useState } from 'react';
import useInView from '../hooks/useInView';

export default function About({ profileData }) {
  const [headerRef, headerVis] = useInView({ threshold: 0.2 });
  const [bioRef, bioVis] = useInView({ threshold: 0.15 });
  const [skillsRef, skillsVis] = useInView({ threshold: 0.15 });

  const skillsData = profileData.about.skillsConsole;
  const secondarySkills = profileData.about.secondarySkills;

  const [activeTab, setActiveTab] = useState(() => Object.keys(skillsData)[0] || 'react');

  return (
    <section id="about" className="section">
      <div className="container">
        
        <div className="section-header" ref={headerRef}>
          <p className={`section-subtitle reveal ${headerVis ? 'visible' : ''}`}>Get To Know Me</p>
          <h2 className={`reveal ${headerVis ? 'visible' : ''} stagger-1`}>About Me</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1.2fr)',
          gap: '3rem',
          alignItems: 'start'
        }} className="about-grid">
          
          {/* Bio text column */}
          <div ref={bioRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 className={`reveal-left ${bioVis ? 'visible' : ''}`} style={{ fontSize: '1.75rem', color: 'var(--text-primary)', lineHeight: '1.3' }}>
              {profileData.about.intro}
            </h3>
            
            <p className={`reveal-left ${bioVis ? 'visible' : ''} stagger-1`} style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
              {profileData.about.bio}
            </p>

            {/* Education */}
            <div className={`reveal-left ${bioVis ? 'visible' : ''} stagger-3`} style={{ marginTop: '0.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Education
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {profileData.about.education.map((edu, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <p style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '1rem' }}>{edu.school}</p>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{edu.degree}</p>
                    </div>
                    <span className="badge" style={{ fontSize: '0.8rem', padding: '0.2rem 0.7rem' }}>{edu.period}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className={`reveal-left ${bioVis ? 'visible' : ''} stagger-4`} style={{ marginTop: '0.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Languages</h3>
              <div className="badge-container">
                {profileData.about.languages.map((lang, idx) => (
                  <span key={idx} className="badge">{lang}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Core Stack Dashboard */}
          <div ref={skillsRef} className={`reveal-right ${skillsVis ? 'visible' : ''} console-container`} style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', margin: 0 }}>
                // CORE STACK CONSOLE
              </h3>
              {/* Decorative mini dots */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)' }}></span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)' }}></span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)' }}></span>
              </div>
            </div>

            {/* Tab controls */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {Object.keys(skillsData).map((key) => {
                const skill = skillsData[key];
                const isActive = activeTab === key;
                const activeBg = skill.color.replace(')', ', 0.15)').replace('hsl', 'hsla');
                const displayName = skill.name.split(' / ')[0].split(' (')[0];
                return (
                  <button 
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`tab-btn`}
                    style={{
                      padding: '0.5rem 0.25rem',
                      fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)',
                      fontWeight: '700',
                      border: '1px solid var(--card-border)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      background: isActive ? activeBg : 'transparent',
                      color: isActive ? skill.color : 'var(--text-secondary)',
                      borderColor: isActive ? skill.color : 'var(--card-border)',
                      transition: 'var(--transition)'
                    }}
                  >
                    {displayName}
                  </button>
                );
              })}
            </div>

            {/* Active Tech Console Body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '260px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h4 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
                  {skillsData[activeTab].name}
                </h4>
                <span style={{ fontSize: '0.8rem', color: skillsData[activeTab].color, fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
                  {skillsData[activeTab].type}
                </span>
              </div>

              {/* Progress bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                  <span>Expertise Level</span>
                  <span style={{ fontWeight: '700', color: skillsData[activeTab].color }}>{skillsData[activeTab].level}%</span>
                </div>
                <div style={{ height: '6px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${skillsData[activeTab].level}%`,
                    background: skillsData[activeTab].color,
                    borderRadius: '10px',
                    transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}></div>
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                {skillsData[activeTab].description}
              </p>

              {/* Capabilities checklist */}
              <div style={{ marginTop: '0.25rem' }}>
                <h5 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                  Capabilities & Implementation
                </h5>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {skillsData[activeTab].capabilities.map((cap, i) => (
                    <li key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      <span style={{ color: skillsData[activeTab].color, fontWeight: 'bold' }}>✦</span>
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Certifications and Secondary skills */}
            <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <h5 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                  Other Technical Skills
                </h5>
                <div className="badge-container">
                  {secondarySkills.map((skill, idx) => (
                    <span key={idx} className="badge" style={{ fontSize: '0.8rem', padding: '0.2rem 0.65rem' }}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
        .tab-btn:hover {
          background-color: rgba(255,255,255,0.03) !important;
          border-color: var(--card-border-hover) !important;
        }
        .active-react {
          box-shadow: 0 0 10px hsla(195, 100%, 50%, 0.15);
        }
        .active-flutter {
          box-shadow: 0 0 10px hsla(200, 100%, 60%, 0.15);
        }
        .active-node {
          box-shadow: 0 0 10px hsla(120, 80%, 45%, 0.15);
        }
      `}</style>
    </section>
  );
}
