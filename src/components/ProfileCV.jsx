import React from 'react';

export default function ProfileCV({ profileData }) {
  if (!profileData) return null;

  const { name, title, tagline, avatar, contact, about, experiences, projects } = profileData;
  const education = about?.education || [];
  const secondarySkills = about?.secondarySkills || [];
  const languages = about?.languages || [];
  const skillsConsole = about?.skillsConsole || {};

  return (
    <div className="print-cv-container" style={{
      fontFamily: "'Outfit', 'Segoe UI', Roboto, sans-serif",
      color: '#2d3748',
      background: '#ffffff',
      padding: '0',
      margin: '0',
      lineHeight: '1.4',
      fontSize: '11pt'
    }}>
      {/* Header Block */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '2px solid #2b6cb0',
        paddingBottom: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {avatar && (
            <img 
              src={avatar} 
              alt={name} 
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #2b6cb0'
              }}
            />
          )}
          <div>
            <h1 style={{ fontSize: '26pt', fontWeight: '800', margin: '0', color: '#1a365d', letterSpacing: '-0.02em', lineHeight: '1.1' }}>{name}</h1>
            <p style={{ fontSize: '14pt', fontWeight: '600', margin: '5px 0 0', color: '#2b6cb0' }}>{title}</p>
          </div>
        </div>
        
        {/* Contact Info Panel */}
        <div style={{
          textAlign: 'right',
          fontSize: '9.5pt',
          color: '#4a5568',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          {contact?.email && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
              <span>{contact.email}</span>
              <span style={{ color: '#2b6cb0', fontWeight: 'bold' }}>✉</span>
            </div>
          )}
          {contact?.phone && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
              <span>{contact.phone}</span>
              <span style={{ color: '#2b6cb0', fontWeight: 'bold' }}>☎</span>
            </div>
          )}
          {contact?.location && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
              <span>{contact.location}</span>
              <span style={{ color: '#2b6cb0', fontWeight: 'bold' }}>📍</span>
            </div>
          )}
        </div>
      </div>

      {/* Tagline / Professional Statement */}
      {tagline && (
        <div style={{ marginBottom: '1.5rem', fontStyle: 'italic', color: '#4a5568', fontSize: '11pt', borderLeft: '3px solid #cbd5e0', paddingLeft: '10px' }}>
          "{tagline}"
        </div>
      )}

      {/* Main Content Layout Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 2fr',
        gap: '2rem'
      }}>
        {/* Left Side Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* About Statement */}
          {about?.intro && (
            <div>
              <h3 style={{ fontSize: '12pt', fontWeight: '700', textTransform: 'uppercase', color: '#1a365d', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '8px' }}>About Me</h3>
              <p style={{ fontSize: '9.5pt', color: '#4a5568', margin: '0', lineHeight: '1.5' }}>{about.intro}</p>
            </div>
          )}

          {/* Education Block */}
          {education.length > 0 && (
            <div>
              <h3 style={{ fontSize: '12pt', fontWeight: '700', textTransform: 'uppercase', color: '#1a365d', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '8px' }}>Education</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {education.map((edu, idx) => (
                  <div key={idx} style={{ fontSize: '9.5pt' }}>
                    <p style={{ fontWeight: '700', margin: '0', color: '#2d3748' }}>{edu.degree}</p>
                    <p style={{ margin: '2px 0 0', color: '#4a5568' }}>{edu.school}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '8.5pt', color: '#718096', fontFamily: 'monospace' }}>{edu.period}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Technical Expertise */}
          {Object.keys(skillsConsole).length > 0 && (
            <div>
              <h3 style={{ fontSize: '12pt', fontWeight: '700', textTransform: 'uppercase', color: '#1a365d', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '8px' }}>Core Skills</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {Object.values(skillsConsole).filter(s => s && s.name).map((skill, idx) => (
                  <div key={idx} style={{ fontSize: '9.5pt' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                      <span style={{ fontWeight: '600', color: '#2d3748' }}>{skill.name}</span>
                      <span style={{ fontSize: '8.5pt', color: '#718096' }}>{skill.level}%</span>
                    </div>
                    {/* Skill progress bar indicator */}
                    <div style={{ height: '4px', background: '#edf2f7', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${skill.level}%`, background: '#2b6cb0' }}></div>
                    </div>
                    {/* Optional capability bullets */}
                    {skill.capabilities && skill.capabilities.length > 0 && (
                      <ul style={{ margin: '4px 0 0', paddingLeft: '12px', fontSize: '8.5pt', color: '#718096', listStyleType: 'circle' }}>
                        {skill.capabilities.slice(0, 3).map((cap, cIdx) => (
                          <li key={cIdx}>{cap}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Skills */}
          {secondarySkills.length > 0 && (
            <div>
              <h3 style={{ fontSize: '12pt', fontWeight: '700', textTransform: 'uppercase', color: '#1a365d', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '8px' }}>Skills & Tools</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {secondarySkills.map((skill, idx) => (
                  <span key={idx} style={{
                    fontSize: '8.5pt',
                    padding: '2px 8px',
                    background: '#edf2f7',
                    borderRadius: '4px',
                    color: '#4a5568',
                    border: '1px solid #e2e8f0'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h3 style={{ fontSize: '12pt', fontWeight: '700', textTransform: 'uppercase', color: '#1a365d', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '8px' }}>Languages</h3>
              <p style={{ fontSize: '9.5pt', color: '#4a5568', margin: '0' }}>
                {languages.join(', ')}
              </p>
            </div>
          )}

        </div>

        {/* Right Side Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Work Experience */}
          {experiences.length > 0 && (
            <div>
              <h3 style={{ fontSize: '12pt', fontWeight: '700', textTransform: 'uppercase', color: '#1a365d', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '1rem' }}>Work Experience</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {experiences.map((exp, idx) => (
                  <div key={idx} style={{ pageBreakInside: 'avoid' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '11pt', fontWeight: '700', margin: '0', color: '#2d3748' }}>{exp.role}</h4>
                      <span style={{ fontSize: '8.5pt', color: '#718096', fontWeight: '600', fontFamily: 'monospace' }}>{exp.date}</span>
                    </div>
                    <p style={{ fontSize: '9.5pt', fontWeight: '600', margin: '0 0 6px', color: '#2b6cb0' }}>{exp.company}</p>
                    
                    <ul style={{ margin: '0 0 8px', paddingLeft: '15px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {exp.highlights.map((h, hIdx) => {
                        const text = typeof h === 'object' ? h.text : h;
                        return (
                          <li key={hIdx} style={{ fontSize: '9pt', color: '#4a5568', lineHeight: '1.4' }}>{text}</li>
                        );
                      })}
                    </ul>

                    {exp.tech && exp.tech.length > 0 && (
                      <p style={{ fontSize: '8.5pt', color: '#718096', margin: '0' }}>
                        <strong>Technologies:</strong> {exp.tech.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Projects */}
          {projects.length > 0 && (
            <div>
              <h3 style={{ fontSize: '12pt', fontWeight: '700', textTransform: 'uppercase', color: '#1a365d', borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', marginBottom: '1rem' }}>Key Projects</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {projects.map((proj, idx) => (
                  <div key={idx} style={{ pageBreakInside: 'avoid' }}>
                    <h4 style={{ fontSize: '10.5pt', fontWeight: '700', margin: '0 0 3px', color: '#2d3748' }}>
                      {proj.icon} {proj.title}
                    </h4>
                    <p style={{ fontSize: '9pt', color: '#4a5568', margin: '0 0 4px', lineHeight: '1.4' }}>{proj.description}</p>
                    {proj.tech && proj.tech.length > 0 && (
                      <p style={{ fontSize: '8.5pt', color: '#718096', margin: '0' }}>
                        <strong>Stack:</strong> {Array.isArray(proj.tech) ? proj.tech.join(', ') : proj.tech}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
