import useInView from '../hooks/useInView';

export default function Experience({ profileData }) {
  const [headerRef, headerVis] = useInView({ threshold: 0.2 });

  const experiences = profileData.experiences;

  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-header" ref={headerRef}>
          <p className={`section-subtitle reveal ${headerVis ? 'visible' : ''}`}>Execution Flow</p>
          <h2 className={`reveal ${headerVis ? 'visible' : ''} stagger-1`}>Work Experience</h2>
        </div>

        <div className="timeline">
          {experiences.map((exp, idx) => (
            <TimelineItem key={idx} exp={exp} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ exp, index }) {
  const [ref, vis] = useInView({ threshold: 0.15 });
  const direction = index % 2 === 0 ? 'reveal-left' : 'reveal-right';

  return (
    <div ref={ref} className={`timeline-item ${direction} ${vis ? 'visible' : ''}`} style={{ transitionDelay: `${index * 150}ms` }}>
      <div className="timeline-dot"></div>
      <div className="timeline-content">
        <p className="timeline-date">{exp.date}</p>
        <h3 className="timeline-role">{exp.role}</h3>
        <p className="timeline-company">{exp.company}</p>
        
        <ul style={{ 
          listStyle: 'none', 
          padding: 0, 
          margin: '0.75rem 0 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          {exp.highlights.map((h, hIdx) => {
            const isObject = typeof h === 'object';
            const text = isObject ? h.text : h;
            const tags = isObject ? h.tags : [];
            return (
              <li key={hIdx} style={{ 
                fontSize: '0.95rem', 
                lineHeight: '1.6',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                alignItems: 'flex-start'
              }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }}>▸</span>
                  <span>{text}</span>
                </div>
                {tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.35rem', marginLeft: '1.25rem', marginTop: '0.15rem', flexWrap: 'wrap' }}>
                    {tags.map((tag, tIdx) => {
                      let tagColor = 'var(--text-muted)';
                      let tagBg = 'rgba(255,255,255,0.05)';
                      if (tag === 'React JS') {
                        tagColor = 'hsl(195, 100%, 50%)';
                        tagBg = 'hsla(195, 100%, 50%, 0.1)';
                      } else if (tag === 'Flutter') {
                        tagColor = 'hsl(200, 100%, 60%)';
                        tagBg = 'hsla(200, 100%, 60%, 0.1)';
                      } else if (tag === 'Node JS') {
                        tagColor = 'hsl(120, 80%, 45%)';
                        tagBg = 'hsla(120, 80%, 45%, 0.1)';
                      } else if (tag === 'SAP') {
                        tagColor = 'hsl(280, 80%, 60%)';
                        tagBg = 'hsla(280, 80%, 60%, 0.1)';
                      }
                      return (
                        <span key={tIdx} style={{
                          fontSize: '0.75rem',
                          padding: '0.05rem 0.45rem',
                          borderRadius: '4px',
                          color: tagColor,
                          backgroundColor: tagBg,
                          fontWeight: '600',
                          border: `1px solid ${tagColor}30`,
                          fontFamily: 'var(--font-mono)'
                        }}>
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="badge-container" style={{ gap: '0.5rem' }}>
          {exp.tech.map((t, tIdx) => (
            <span
              key={tIdx}
              className="badge"
              style={{ fontSize: '0.8rem', padding: '0.2rem 0.7rem' }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
