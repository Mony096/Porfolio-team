import { useState, useEffect } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import LoginGate from './components/LoginGate';
// import { profilesData as localProfilesData } from './data/profilesData';

function App() {
  const [profiles, setProfiles] = useState([]);
  const [authState, setAuthState] = useState(() => {
    let role = sessionStorage.getItem('auth_role');
    let passcode = sessionStorage.getItem('auth_passcode');
    let profileId = sessionStorage.getItem('auth_profile_id');
    
    if (!role || !passcode) {
      role = 'admin';
      passcode = 'admin123';
      profileId = null;
      sessionStorage.setItem('auth_role', 'admin');
      sessionStorage.setItem('auth_passcode', 'admin123');
      sessionStorage.setItem('admin_passcode', 'admin123');
    }
    return { role, passcode, profileId };
  });
  const [activeProfile, setActiveProfile] = useState(() => {
    let role = sessionStorage.getItem('auth_role');
    let profileId = sessionStorage.getItem('auth_profile_id');
    
    // If we just loaded and defaulted to admin, role is admin and activeProfile is null
    if (!role) {
      return null;
    }
    return role === 'employee' ? profileId : null;
  });
  const [isSlideMode, setIsSlideMode] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewAdmin, setViewAdmin] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  });

  // Fetch profiles from backend on mount
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('http://localhost:5005/api/profiles');
        if (response.ok) {
          const data = await response.json();
          setProfiles(data);
          console.log('Successfully connected to backend! Loaded dynamic profiles data.');
        } else {
          console.log('Backend returned error status. Using local static profiles data.');
          setProfiles([]);
        }
      } catch (error) {
        console.log('Backend is offline. Using local static profiles data.');
        setProfiles([]);
      }
    };
    fetchProfiles();
  }, []);

  // Sync theme changes with DOM :root element
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Intercept refresh / tab close actions
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = 'Are you sure you want to leave this page?';
      return 'Are you sure you want to leave this page?';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Sync state transitions with browser history stack
  useEffect(() => {
    if (!window.history.state) {
      window.history.replaceState({ page: 'home' }, '');
    }
    
    const currentState = window.history.state;
    if (activeProfile) {
      if (!currentState || currentState.page !== 'profile' || currentState.id !== activeProfile) {
        window.history.pushState({ page: 'profile', id: activeProfile }, '');
      }
    } else {
      if (currentState && currentState.page !== 'home') {
        window.history.pushState({ page: 'home' }, '');
      }
    }
  }, [activeProfile]);

  // Intercept Back/Forward buttons (PopState event)
  useEffect(() => {
    const handlePopState = (e) => {
      const state = e.state;
      if (state) {
        if (state.page === 'profile') {
          setActiveProfile(state.id);
        } else if (state.page === 'home') {
          setActiveProfile(null);
        }
      } else {
        // Exit warning prompt when navigating out of app context
        if (window.confirm('Are you sure you want to exit the Collective Portfolio Hub?')) {
          window.history.back();
        } else {
          // Restore mock history entry
          window.history.pushState(activeProfile ? { page: 'profile', id: activeProfile } : { page: 'home' }, '');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeProfile]);

  const handleLogin = (role, passcode, profileId, matchedProfile, isOffline = false) => {
    setAuthState({ role, passcode, profileId });
    sessionStorage.setItem('auth_role', role);
    sessionStorage.setItem('auth_passcode', passcode);
    if (role === 'admin') {
      sessionStorage.setItem('admin_passcode', passcode);
    }
    if (profileId) {
      sessionStorage.setItem('auth_profile_id', profileId);
      setActiveProfile(profileId);
    } else {
      sessionStorage.removeItem('auth_profile_id');
      setActiveProfile(null);
    }
    if (role === 'employee' && matchedProfile) {
      setProfiles(prev => ({
        ...prev,
        [profileId]: matchedProfile
      }));
    }
  };

  const handleLogout = () => {
    setAuthState(null);
    setActiveProfile(null);
    setViewAdmin(false);
    sessionStorage.removeItem('auth_role');
    sessionStorage.removeItem('auth_passcode');
    sessionStorage.removeItem('auth_profile_id');
    sessionStorage.removeItem('admin_passcode');
  };

  const profileData = activeProfile ? profiles[activeProfile] : null;

  const slides = profileData ? [
    { name: "Phase 1: Planning", title: "Scope & Objectives", component: <Hero profileData={profileData} /> },
    { name: "Phase 2: Requirements Analysis", title: "System Specifications", component: <About profileData={profileData} /> },
    { name: "Phase 3: Implementation", title: "Codebase & Work Logic", component: <Experience profileData={profileData} /> },
    { name: "Phase 4: Testing & Verification", title: "Functional Project Audits", component: <Projects profileData={profileData} /> },
    { name: "Phase 5: Maintenance", title: "Operation Logs & Contact", component: <Contact profileData={profileData} /> }
  ] : [];

  // Handle keyboard arrow navigation
  useEffect(() => {
    if (!profileData || !isSlideMode) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSlideMode, slides.length, profileData]);

  const handleSelectProfile = (id) => {
    setActiveProfile(id);
    setCurrentSlide(0);
  };

  const progressPercentage = slides.length > 0 ? ((currentSlide + 1) / slides.length) * 100 : 0;

  if (!authState) {
    return <LoginGate onLogin={handleLogin} />;
  }

  return (
    <>
      <Navbar 
        isSlideMode={isSlideMode} 
        setIsSlideMode={setIsSlideMode} 
        currentSlide={currentSlide} 
        setCurrentSlide={setCurrentSlide} 
        theme={theme}
        setTheme={setTheme}
        activeProfile={activeProfile}
        setActiveProfile={handleSelectProfile}
        viewAdmin={viewAdmin}
        setViewAdmin={setViewAdmin}
        authState={authState}
        onLogout={handleLogout}
      />

      {profileData === null ? (
        <>
          <main style={{ flexGrow: 1 }}>
            {viewAdmin ? (
              <AdminPanel profiles={profiles} setProfiles={setProfiles} onClose={() => setViewAdmin(false)} />
            ) : (
              <Dashboard onSelectProfile={handleSelectProfile} theme={theme} profiles={profiles} />
            )}
          </main>
          <Footer profileData={null} />
        </>
      ) : isSlideMode ? (
        <>
          {/* Top SDLC Progress Ribbon */}
          <div className="sdlc-progress-bar">
            <div className="sdlc-progress-fill" style={{ width: `${progressPercentage}%` }}></div>
          </div>

          <main className="slide-frame" style={{ flexGrow: 1 }}>
            <div className="container">
              {/* Active SDLC Banner */}
              <div className="slide-title-banner">
                {slides[currentSlide].name}: {slides[currentSlide].title}
              </div>
            </div>

            {/* Slide content container with key to trigger reset animations on change */}
            <div className="slide-content-wrapper" key={`${activeProfile}-${currentSlide}`}>
              {slides[currentSlide].component}
            </div>

            {/* Slide Controller Footer */}
            <div className="slide-controller">
              <div className="container slide-controls-inner">
                <button 
                  onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
                  disabled={currentSlide === 0}
                  className="btn btn-secondary"
                  style={{ opacity: currentSlide === 0 ? 0.4 : 1, padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  ← Prev Phase
                </button>

                <div className="slide-indicators">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`slide-dot ${currentSlide === idx ? 'active' : ''}`}
                      title={slides[idx].name}
                      aria-label={`Go to slide ${idx + 1}`}
                    ></button>
                  ))}
                </div>

                <button 
                  onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))}
                  disabled={currentSlide === slides.length - 1}
                  className="btn btn-primary"
                  style={{ opacity: currentSlide === slides.length - 1 ? 0.4 : 1, padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  Next Phase →
                </button>
              </div>
            </div>
          </main>
        </>
      ) : (
        <>
          <main style={{ paddingTop: 'var(--header-height)', flexGrow: 1 }}>
            <Hero profileData={profileData} />
            <About profileData={profileData} />
            <Experience profileData={profileData} />
            <Projects profileData={profileData} />
            <Contact profileData={profileData} />
          </main>
          <Footer profileData={profileData} />
        </>
      )}
    </>
  );
}

export default App;
