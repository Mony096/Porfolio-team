import { useState, useEffect } from 'react';

export default function Navbar({ 
  isSlideMode, 
  setIsSlideMode, 
  currentSlide, 
  setCurrentSlide, 
  theme, 
  setTheme,
  activeProfile,
  setActiveProfile
}) {
  const [isActive, setIsActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const closeMenu = () => {
    setIsActive(false);
  };

  const navItems = [
    { label: 'Home', slideIndex: 0, anchor: '#hero' },
    { label: 'About', slideIndex: 1, anchor: '#about' },
    { label: 'Experience', slideIndex: 2, anchor: '#experience' },
    { label: 'Projects', slideIndex: 3, anchor: '#projects' },
    { label: 'Contact', slideIndex: 4, anchor: '#contact' },
  ];

  return (
    <header className="header" style={{
      boxShadow: scrolled 
        ? (theme === 'light' ? '0 4px 20px rgba(0, 0, 0, 0.05)' : '0 10px 30px rgba(0, 0, 0, 0.35)') 
        : 'none'
    }}>
      <div className="container nav-container">
        <a 
          href={isSlideMode ? undefined : '#hero'} 
          className="logo" 
          onClick={(e) => {
            closeMenu();
            if (activeProfile) {
              e.preventDefault();
              setActiveProfile(null);
            }
          }}
          style={{ cursor: 'pointer' }}
        >
          {activeProfile ? (
            <>
              {activeProfile === 'mony' ? 'KUNMONY' : activeProfile === 'kimchan' ? 'KIMCHAN' : 'NIDA'}
            </>
          ) : (
            <>
              PORTFOLIO HUB
            </>
          )}
          <span className="logo-dot"></span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {activeProfile && (
            <>
              <nav>
                <ul className={`nav-links ${isActive ? 'active' : ''}`}>
                  {navItems.map((item, idx) => (
                    <li key={idx}>
                      <a 
                        href={isSlideMode ? undefined : item.anchor} 
                        className="nav-link"
                        onClick={(e) => {
                          closeMenu();
                          if (isSlideMode) {
                            e.preventDefault();
                            setCurrentSlide(item.slideIndex);
                          }
                        }}
                        style={{
                          color: isSlideMode && currentSlide === item.slideIndex ? 'var(--primary)' : 'inherit',
                          fontWeight: isSlideMode && currentSlide === item.slideIndex ? '700' : '500',
                          cursor: 'pointer'
                        }}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Slide Mode Toggle */}
              <div 
                className="mode-toggle-container"
                onClick={() => setIsSlideMode(!isSlideMode)}
                style={{ display: 'flex' }}
              >
                <span className="mode-toggle-label">Slide Mode</span>
                <label className="mode-toggle-switch" onClick={(e) => e.stopPropagation()}>
                  <input 
                    type="checkbox" 
                    checked={isSlideMode}
                    onChange={() => setIsSlideMode(!isSlideMode)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              {/* Return to Hub Button */}
              <button
                onClick={() => setActiveProfile(null)}
                className="btn btn-secondary"
                style={{
                  padding: '0.4rem 0.8rem',
                  fontSize: '0.8rem',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontWeight: '600',
                  borderRadius: '50px',
                  flexShrink: 0
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Return to Hub
              </button>
            </>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="theme-toggle-btn"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
            style={{
              background: 'transparent',
              border: '1px solid var(--card-border)',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              transition: 'var(--transition)',
              flexShrink: 0
            }}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {activeProfile && (
            <button 
              className="nav-toggle" 
              onClick={toggleMenu} 
              aria-label="Toggle Navigation"
              aria-expanded={isActive}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {isActive ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

