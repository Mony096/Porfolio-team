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
import { profilesData } from './data/profilesData';

function App() {
  const [activeProfile, setActiveProfile] = useState(null);
  const [isSlideMode, setIsSlideMode] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  });

  // Sync theme changes with DOM :root element
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const profileData = activeProfile ? profilesData[activeProfile] : null;

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
      />

      {profileData === null ? (
        <>
          <main style={{ flexGrow: 1 }}>
            <Dashboard onSelectProfile={handleSelectProfile} theme={theme} />
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
