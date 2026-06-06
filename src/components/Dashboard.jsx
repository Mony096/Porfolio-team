import { useEffect, useRef } from 'react';
import useInView from '../hooks/useInView';

export default function Dashboard({ onSelectProfile, theme, profiles }) {
  const [headerRef, headerVis] = useInView({ threshold: 0.1 });
  const [gridRef, gridVis] = useInView({ threshold: 0.1 });

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);

  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const parallaxRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const profilesList = profiles ? Object.values(profiles) : [];

  const getProfileTheme = (profile) => {
    const id = profile.id;
    const skills = profile.about && profile.about.secondarySkills
      ? profile.about.secondarySkills.slice(0, 4)
      : [];

    switch (id) {
      case 'mony':
        return {
          color: 'hsl(263, 90%, 65%)',
          glow: 'hsla(263, 90%, 65%, 0.25)',
          gradient: 'linear-gradient(135deg, hsl(263, 90%, 65%) 0%, hsl(190, 95%, 50%) 100%)',
          skills
        };
      case 'kimchan':
        return {
          color: 'hsl(20, 90%, 55%)',
          glow: 'hsla(20, 90%, 55%, 0.25)',
          gradient: 'linear-gradient(135deg, hsl(20, 90%, 55%) 0%, hsl(325, 90%, 60%) 100%)',
          skills
        };
      case 'nida':
        return {
          color: 'hsl(35, 90%, 55%)',
          glow: 'hsla(35, 90%, 55%, 0.25)',
          gradient: 'linear-gradient(135deg, hsl(35, 90%, 55%) 0%, hsl(15, 85%, 50%) 100%)',
          skills
        };
      default:
        return {
          color: 'var(--primary)',
          glow: 'var(--primary-glow)',
          gradient: 'var(--gradient-text)',
          skills
        };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    
    window.addEventListener('resize', handleResize);

    const isLightTheme = theme === 'light' || document.documentElement.classList.contains('light-theme');
    
    const config = {
      preset: localStorage.getItem('dashboard_bg_preset') || 'cyber',
      speed: localStorage.getItem('dashboard_anim_speed') || 'active',
      size: localStorage.getItem('dashboard_particle_size') || 'nodes',
      themeName: localStorage.getItem('dashboard_color_theme') || 'cyberpunk',
    };

    const getColorPalette = (name, isL) => {
      switch (name) {
        case 'forest':
          return {
            colors: isL 
              ? ['hsl(142, 60%, 40%)', 'hsl(160, 70%, 35%)', 'hsl(120, 60%, 40%)']
              : ['hsl(142, 90%, 55%)', 'hsl(160, 95%, 50%)', 'hsl(120, 90%, 60%)'],
            orb1: 'hsla(142, 90%, 55%, 0.38)',
            orb2: 'hsla(160, 95%, 50%, 0.38)',
            orb3: 'hsla(120, 90%, 60%, 0.25)',
            lineBase: '16, 185, 129',
            mouseLineBase: isL ? '5, 150, 105' : '52, 211, 153',
            gridV: 'rgba(16, 185, 129, 0.08)',
            gridH: 'rgba(52, 211, 153, 0.08)'
          };
        case 'solar':
          return {
            colors: isL 
              ? ['hsl(38, 80%, 45%)', 'hsl(354, 75%, 45%)', 'hsl(15, 80%, 45%)']
              : ['hsl(38, 92%, 55%)', 'hsl(354, 85%, 55%)', 'hsl(15, 90%, 60%)'],
            orb1: 'hsla(38, 92%, 55%, 0.38)',
            orb2: 'hsla(354, 85%, 55%, 0.38)',
            orb3: 'hsla(15, 90%, 60%, 0.25)',
            lineBase: '239, 68, 68',
            mouseLineBase: isL ? '220, 38, 38' : '248, 113, 113',
            gridV: 'rgba(245, 158, 11, 0.08)',
            gridH: 'rgba(239, 68, 68, 0.08)'
          };
        case 'monochrome':
          return {
            colors: isL 
              ? ['hsl(240, 5%, 35%)', 'hsl(240, 4%, 45%)', 'hsl(240, 3%, 55%)']
              : ['hsl(240, 5%, 85%)', 'hsl(240, 4%, 75%)', 'hsl(240, 3%, 65%)'],
            orb1: 'hsla(240, 5%, 85%, 0.22)',
            orb2: 'hsla(240, 4%, 75%, 0.22)',
            orb3: 'hsla(240, 3%, 65%, 0.12)',
            lineBase: isL ? '0, 0, 0' : '255, 255, 255',
            mouseLineBase: isL ? '100, 100, 100' : '200, 200, 200',
            gridV: isL ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.04)',
            gridH: isL ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.04)'
          };
        case 'cyberpunk':
        default:
          return {
            colors: isL 
              ? ['hsl(263, 65%, 50%)', 'hsl(190, 75%, 45%)', 'hsl(325, 75%, 50%)']
              : ['hsl(263, 90%, 65%)', 'hsl(190, 95%, 50%)', 'hsl(325, 90%, 60%)'],
            orb1: 'var(--primary-glow)',
            orb2: 'var(--secondary-glow)',
            orb3: 'hsla(263, 90%, 65%, 0.25)',
            lineBase: isL ? '99, 102, 241' : '168, 85, 247',
            mouseLineBase: isL ? '99, 102, 241' : '6, 182, 212',
            gridV: 'rgba(168, 85, 247, 0.08)',
            gridH: 'rgba(6, 182, 212, 0.08)'
          };
      }
    };

    let speedMult = 1.0;
    let baseSizeRange = { min: 1.2, max: 3.4 };
    let particles = [];
    let palette = getColorPalette(config.themeName, isLightTheme);
    
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.55 * speedMult;
        this.vy = (Math.random() - 0.5) * 0.55 * speedMult;
        this.radius = Math.random() * (baseSizeRange.max - baseSizeRange.min) + baseSizeRange.min;
        this.color = palette.colors[Math.floor(Math.random() * palette.colors.length)];
        this.alpha = Math.random() * 0.4 + 0.35;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Mouse interaction (gentle attraction)
        const mouse = mouseRef.current;
        if (mouse.x > 0 && mouse.x < width && mouse.y > 0 && mouse.y < height) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 180) {
            const force = (180 - dist) / 3000;
            this.x += (dx / dist) * force;
            this.y += (dy / dist) * force;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace('hsl', 'hsla').replace(')', `, ${this.alpha})`);
        ctx.fill();
      }
    }

    const reinitParticles = () => {
      if (config.speed === 'slow') speedMult = 0.45;
      else if (config.speed === 'hyper') speedMult = 2.2;
      else speedMult = 1.0;

      if (config.size === 'dust') baseSizeRange = { min: 0.5, max: 1.5 };
      else if (config.size === 'rings') baseSizeRange = { min: 3.2, max: 6.5 };
      else baseSizeRange = { min: 1.2, max: 3.4 };

      palette = getColorPalette(config.themeName, isLightTheme);

      const density = 12000;
      let targetCount = Math.min(Math.floor((width * height) / density), 110);
      
      if (config.preset === 'orbs' || config.preset === 'grid' || config.preset === 'dark') {
        targetCount = 0;
      }

      particles = Array.from({ length: targetCount }, () => new Particle());
    };

    reinitParticles();

    const handleStyleChange = () => {
      config.preset = localStorage.getItem('dashboard_bg_preset') || 'cyber';
      config.speed = localStorage.getItem('dashboard_anim_speed') || 'active';
      config.size = localStorage.getItem('dashboard_particle_size') || 'nodes';
      config.themeName = localStorage.getItem('dashboard_color_theme') || 'cyberpunk';
      reinitParticles();
    };

    window.addEventListener('dashboard-style-changed', handleStyleChange);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      canvas.style.display = (config.preset === 'cyber' || config.preset === 'mesh') ? 'block' : 'none';

      const gridElement = containerRef.current ? containerRef.current.querySelector('.dashboard-tech-grid') : null;
      if (gridElement) {
        gridElement.style.display = (config.preset !== 'dark') ? 'block' : 'none';
        gridElement.style.backgroundImage = `
          linear-gradient(${palette.gridV} 1.5px, transparent 1.5px),
          linear-gradient(90deg, ${palette.gridH} 1.5px, transparent 1.5px)
        `;
      }

      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const parallax = parallaxRef.current;
      parallax.x += (parallax.targetX - parallax.x) * 0.05;
      parallax.y += (parallax.targetY - parallax.y) * 0.05;

      const showOrbs = (config.preset === 'cyber' || config.preset === 'orbs');
      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translate(${parallax.x * 35}px, ${parallax.y * 35}px)`;
        orb1Ref.current.style.background = palette.orb1;
        orb1Ref.current.style.display = showOrbs ? 'block' : 'none';
      }
      if (orb2Ref.current) {
        orb2Ref.current.style.transform = `translate(${parallax.x * -45}px, ${parallax.y * -45}px)`;
        orb2Ref.current.style.background = palette.orb2;
        orb2Ref.current.style.display = showOrbs ? 'block' : 'none';
      }
      if (orb3Ref.current) {
        orb3Ref.current.style.transform = `translate(${parallax.x * 20}px, ${parallax.y * -20}px)`;
        orb3Ref.current.style.background = palette.orb3;
        orb3Ref.current.style.display = showOrbs ? 'block' : 'none';
      }

      const maxDistance = 110;

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const alpha = (maxDistance - dist) / maxDistance * (isLightTheme ? 0.15 : 0.12);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${palette.lineBase}, ${alpha})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }

        if (mouse.x > 0 && mouse.x < width && mouse.y > 0 && mouse.y < height) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 180) {
            const alpha = (180 - dist) / 180 * (isLightTheme ? 0.35 : 0.45);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${palette.mouseLineBase}, ${alpha})`;
            ctx.lineWidth = 1.4;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('dashboard-style-changed', handleStyleChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseRef.current.targetX = x;
    mouseRef.current.targetY = y;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    parallaxRef.current.targetX = (x - centerX) / centerX;
    parallaxRef.current.targetY = (y - centerY) / centerY;
  };

  const handleMouseLeave = () => {
    mouseRef.current.targetX = -1000;
    mouseRef.current.targetY = -1000;
    parallaxRef.current.targetX = 0;
    parallaxRef.current.targetY = 0;
  };

  return (
    <section 
      id="dashboard" 
      className="section"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        paddingTop: 'calc(var(--header-height) + 60px)',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Interactive Tech Canvas */}
      <canvas 
        ref={canvasRef} 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Grid Pattern Overlay */}
      <div className="dashboard-tech-grid"></div>

      {/* Background glow blobs */}
      <div 
        ref={orb1Ref}
        className="dashboard-glow-orb dashboard-glow-orb-1"
        style={{
          top: '10%',
          left: '20%',
          width: '400px',
          height: '400px',
        }}
      ></div>
      <div 
        ref={orb2Ref}
        className="dashboard-glow-orb dashboard-glow-orb-2"
        style={{
          bottom: '10%',
          right: '15%',
          width: '350px',
          height: '350px',
        }}
      ></div>
      <div 
        ref={orb3Ref}
        className="dashboard-glow-orb dashboard-glow-orb-3"
        style={{
          top: '35%',
          left: '45%',
          width: '300px',
          height: '300px',
        }}
      ></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Header Block */}
        <div className="section-header" ref={headerRef} style={{ marginBottom: '4rem' }}>
          <p className={`section-subtitle reveal ${headerVis ? 'visible' : ''}`} style={{ fontSize: '0.9rem', letterSpacing: '0.2em' }}>
            Mony Team Registry
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
          {profilesList.map((profile, idx) => {
            const config = getProfileTheme(profile);
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
                  className="btn dash-card-btn" 
                  style={{
                    background: config.gradient,
                    color: 'white',
                    width: '100%',
                    boxShadow: `0 4px 15px ${config.glow}`,
                    border: 'none',
                    fontWeight: '700',
                    '--glow-color': config.glow
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
          transform: scale(1.08) rotate(2deg);
        }
        .card:hover .dash-avatar-ring {
          opacity: 0.85 !important;
          animation-duration: 14s !important;
        }
        .dash-card-btn {
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease !important;
        }
        .dash-card-btn svg {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card:hover .dash-card-btn {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 8px 25px var(--glow-color) !important;
        }
        .card:hover .dash-card-btn svg {
          transform: translateX(5px);
        }
      `}</style>
    </section>
  );
}

