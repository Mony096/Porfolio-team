import useInView from '../hooks/useInView';

export default function Projects({ profileData }) {
  const [headerRef, headerVis] = useInView({ threshold: 0.2 });

  const projectsList = profileData.projects;

  return (
    <section id="projects" className="section">
      <div className="container">
        
        <div className="section-header" ref={headerRef}>
          <p className={`section-subtitle reveal ${headerVis ? 'visible' : ''}`}>Architected Deployments</p>
          <h2 className={`reveal ${headerVis ? 'visible' : ''} stagger-1`}>My Projects</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {projectsList.map((project, idx) => (
            <ProjectCard key={idx} project={project} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [ref, vis] = useInView({ threshold: 0.1 });

  return (
    <article ref={ref} className={`card reveal-scale ${vis ? 'visible' : ''}`} style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '0',
      overflow: 'hidden',
      transitionDelay: `${index * 120}ms`
    }}>
      
      {/* Premium mock browser header */}
      <div style={{
        height: '130px',
        background: project.color,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}>
        {/* Browser dots */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '16px',
          display: 'flex',
          gap: '6px'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.35)' }}></span>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.35)' }}></span>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.35)' }}></span>
        </div>

        <div style={{
          fontSize: '2.5rem',
          filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.25))'
        }}>
          {project.icon}
        </div>
      </div>

      {/* Card body */}
      <div style={{
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
      }}>
        <h3 style={{
          fontSize: '1.3rem',
          color: 'var(--text-primary)',
          marginBottom: '0.75rem'
        }}>
          {project.title}
        </h3>
        
        <p style={{
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          marginBottom: '1.5rem',
          flexGrow: 1
        }}>
          {project.description}
        </p>

        {/* Tech Badges */}
        <div className="badge-container" style={{ gap: '0.5rem' }}>
          {project.tech.map((t, tIdx) => (
            <span key={tIdx} className="badge" style={{ 
              fontSize: '0.8rem',
              padding: '0.2rem 0.75rem'
            }}>{t}</span>
          ))}
        </div>
      </div>

    </article>
  );
}
