import { useState, useEffect } from 'react';

export default function Navbar({ 
  isSlideMode, 
  setIsSlideMode, 
  currentSlide, 
  setCurrentSlide, 
  theme, 
  setTheme,
  activeProfile,
  setActiveProfile,
  viewAdmin,
  setViewAdmin,
  authState,
  onLogout
}) {
  const [isActive, setIsActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const [showEmployeeMessages, setShowEmployeeMessages] = useState(false);
  const [employeeMessages, setEmployeeMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);

  const fetchEmployeeMessages = async () => {
    if (!authState || authState.role !== 'employee') return;
    setMessagesLoading(true);
    try {
      const response = await fetch(`https://nodebackendportfolio.onrender.com/api/messages/${authState.profileId}`, {
        headers: { 'x-employee-passcode': authState.passcode }
      });
      if (response.ok) {
        const data = await response.json();
        setEmployeeMessages(data.reverse());
      }
    } catch (error) {
      console.error('Failed to fetch employee messages:', error);
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleDeleteMessage = async (msgId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      const response = await fetch(`https://nodebackendportfolio.onrender.com/api/messages/${msgId}`, {
        method: 'DELETE',
        headers: {
          'x-employee-passcode': authState.passcode
        }
      });
      if (response.ok) {
        setEmployeeMessages(prev => prev.filter(m => m.id !== msgId));
      } else {
        const errData = await response.json();
        alert(`Failed to delete message: ${errData.error}`);
      }
    } catch (error) {
      alert('Failed to connect to backend server to delete message.');
    }
  };

  useEffect(() => {
    if (showEmployeeMessages) {
      fetchEmployeeMessages();
    }
  }, [showEmployeeMessages]);

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
            if (authState?.role === 'admin') {
              if (activeProfile) {
                e.preventDefault();
                setActiveProfile(null);
              }
              if (viewAdmin) {
                setViewAdmin(false);
              }
            }
          }}
          style={{ cursor: authState?.role === 'admin' ? 'pointer' : 'default' }}
        >
          {activeProfile ? (
            <>
              {activeProfile.toUpperCase()}
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
              {authState?.role === 'admin' && (
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
              )}
            </>
          )}

          {!activeProfile && (
            <button
              onClick={() => setViewAdmin(!viewAdmin)}
              className="theme-toggle-btn"
              title={viewAdmin ? "Back to Portfolios" : "Open Admin Panel"}
              style={{
                padding: '0.4rem 0.8rem',
                fontSize: '0.85rem',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: '600',
                borderRadius: '50px',
                flexShrink: 0,
                border: viewAdmin ? '1px solid var(--primary)' : '1px solid var(--card-border)',
                background: viewAdmin ? 'rgba(150, 100, 255, 0.1)' : 'transparent',
                color: viewAdmin ? 'var(--primary)' : 'var(--text-primary)',
                cursor: 'pointer',
                width: 'auto'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>{viewAdmin ? "Hub" : "Admin"}</span>
            </button>
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

          {/* Employee Messages Button */}
          {authState && authState.role === 'employee' && (
            <button
              onClick={() => setShowEmployeeMessages(true)}
              className="theme-toggle-btn"
              title="My Messages"
              style={{
                padding: '0.4rem 0.8rem',
                fontSize: '0.85rem',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: '600',
                borderRadius: '50px',
                flexShrink: 0,
                border: '1px solid var(--card-border)',
                background: 'transparent',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                width: 'auto'
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>Messages</span>
            </button>
          )}



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

      {/* Employee Messages Modal */}
      {showEmployeeMessages && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }} onClick={() => setShowEmployeeMessages(false)}>
          <div style={{
            maxWidth: '650px',
            width: '100%',
            maxHeight: '80vh',
            background: 'var(--bg-color)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            overflowY: 'auto',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>
                Received Messages ({employeeMessages.length})
              </h3>
              <button 
                onClick={() => setShowEmployeeMessages(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>

            {messagesLoading ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>Loading inquiries...</div>
            ) : employeeMessages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>No messages received yet.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {employeeMessages.map((msg) => (
                  <div key={msg.id} style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <span>From: <strong>{msg.name}</strong> ({msg.email})</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span>{new Date(msg.createdAt).toLocaleString()}</span>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#ff4d4d',
                            cursor: 'pointer',
                            padding: '1px 6px',
                            borderRadius: '3px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            border: '1px solid rgba(255, 77, 77, 0.2)',
                            backgroundColor: 'rgba(255, 77, 77, 0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.15rem'
                          }}
                          title="Delete Message"
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      Subject: {msg.subject}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

