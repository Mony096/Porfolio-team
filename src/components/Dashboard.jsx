import { profilesData } from '../data/profilesData';
import useInView from '../hooks/useInView';

export default function Dashboard({ onSelectProfile, theme }) {
  const [headerRef, headerVis] = useInView({ threshold: 0.1 });
  const [gridRef, gridVis] = useInView({ threshold: 0.1 });

  const profiles = Object.values(profilesData);

  // Helper to get secondary accent color or gradient based on profile id
  const getProfileTheme = (id) => {
    switch (id) {
      case 'mony':
        return {
          color: 'hsl(263, 90%, 65%)',
          glow: 'hsla(263, 90%, 65%, 0.25)',
          gradient: 'linear-gradient(135deg, hsl(263, 90%, 65%) 0%, hsl(190, 95%, 50%) 100%)',
          skills: ['React JS', 'Flutter', 'Node JS', 'SAP']
        };
      case 'kimchan':
        return {
          color: 'hsl(20, 90%, 55%)',
          glow: 'hsla(20, 90%, 55%, 0.25)',
          gradient: 'linear-gradient(135deg, hsl(20, 90%, 55%) 0%, hsl(325, 90%, 60%) 100%)',
          skills: ['HTML5 & CSS3', 'MS Office Tools', 'Adobe XD Design', 'UI/UX Prototyping']
        };
      case 'nida':
        return {
          color: 'hsl(35, 90%, 55%)',
          glow: 'hsla(35, 90%, 55%, 0.25)',
          gradient: 'linear-gradient(135deg, hsl(35, 90%, 55%) 0%, hsl(15, 85%, 50%) 100%)',
          skills: ['Medicine Sales', 'Ledger Audit', 'Pharma Logistics', 'Billing Portals']
        };
      default:
        return {
          color: 'var(--primary)',
          glow: 'var(--primary-glow)',
          gradient: 'var(--gradient-text)',
          skills: []
        };
    }
  };

  return (
    <section id="dashboard" className="section" style={{
      paddingTop: 'calc(var(--header-height) + 60px)',
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background glow blobs */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '20%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'var(--primary-glow)',
        filter: 'blur(130px)',
        zIndex: -1,
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '15%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'var(--secondary-glow)',
        filter: 'blur(120px)',
        zIndex: -1,
        pointerEvents: 'none'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Header Block */}
        <div className="section-header" ref={headerRef} style={{ marginBottom: '4rem' }}>
          <p className={`section-subtitle reveal ${headerVis ? 'visible' : ''}`} style={{ fontSize: '0.9rem', letterSpacing: '0.2em' }}>
            Team Portfolio Registry
          </p>
          <h1 className={`reveal ${headerVis ? 'visible' : ''} stagger-1`} style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            lineHeight: '1.1',
            margin: '0.5rem 0 1.25rem'
          }}>
            Collective <span className="gradient-text">Portfolio Hub</span>
          </h1>
          <p className={`reveal ${headerVis ? 'visible' : ''} stagger-2`} style={{ 
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            maxWidth: '650px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Discover the custom interactive workspaces of our team members. Select a developer or coordinator below to launch their personal SDLC roadmap and operations log.
          </p>
        </div>

        {/* Members Grid */}
        <div ref={gridRef} className="dashboard-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          maxWidth: '1100px',
          margin: '0 auto',
          alignItems: 'stretch'
        }}>
          {profiles.map((profile, idx) => {
            const config = getProfileTheme(profile.id);
            const isVis = gridVis ? 'visible' : '';

            return (
              <div 
                key={profile.id}
                className={`card reveal-scale ${isVis}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '2.5rem 2rem',
                  alignItems: 'center',
                  textAlign: 'center',
                  transitionDelay: `${idx * 150}ms`,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                onClick={() => onSelectProfile(profile.id)}
              >
                {/* Glow bar at top of card */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: config.gradient
                }}></div>

                {/* Avatar container */}
                <div className="dash-avatar-wrapper" style={{
                  position: 'relative',
                  width: '150px',
                  height: '150px',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Glowing rotating ring */}
                  <div className="dash-avatar-ring" style={{
                    position: 'absolute',
                    width: '112%',
                    height: '112%',
                    borderRadius: '50%',
                    border: `2px dashed ${config.color}`,
                    opacity: '0.45',
                    animation: 'dash-spin 25s linear infinite'
                  }}></div>

                  {/* Inner ring */}
                  <div style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: config.gradient,
                    padding: '3px',
                    boxShadow: `0 8px 20px ${config.glow}`
                  }}>
                    <div style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-color)',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <img 
                        src={profile.avatar} 
                        alt={profile.name} 
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.4s ease'
                        }}
                        className="dash-img"
                      />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
                  {profile.name}
                </h3>
                
                <p style={{
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  color: config.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '1rem'
                }}>
                  {profile.title}
                </p>

                {/* Tagline */}
                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem',
                  flexGrow: 1
                }}>
                  {profile.tagline}
                </p>

                {/* Core Specialties Badges */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.4rem',
                  justifyContent: 'center',
                  marginBottom: '2rem'
                }}>
                  {config.skills.map((skill) => (
                    <span 
                      key={skill}
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        border: `1px solid var(--card-border)`,
                        background: 'rgba(255, 255, 255, 0.03)',
                        color: 'var(--text-secondary)',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Action button */}
                <button 
                  className="btn" 
                  style={{
                    background: config.gradient,
                    color: 'white',
                    width: '100%',
                    boxShadow: `0 4px 15px ${config.glow}`,
                    border: 'none',
                    fontWeight: '700'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProfile(profile.id);
                  }}
                >
                  Launch Workspace
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '0.25rem' }}>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>

              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        @keyframes dash-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .card:hover .dash-img {
          transform: scale(1.1) rotate(2deg);
        }
        .card:hover .dash-avatar-ring {
          opacity: 0.8 !important;
          animation-duration: 12s !important;
        }
      `}</style>
    </section>
  );
}
