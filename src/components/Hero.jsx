import { useState, useEffect } from 'react';
import useInView from '../hooks/useInView';

function HeroTerminal({ terminal }) {
  const [lines, setLines] = useState([]);
  const [currentSnippetIdx, setCurrentSnippetIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const [isLightTheme, setIsLightTheme] = useState(false);

  // Monitor theme changes reactively
  useEffect(() => {
    setIsLightTheme(document.documentElement.classList.contains('light-theme'));

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsLightTheme(document.documentElement.classList.contains('light-theme'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const snippets = terminal?.snippets || [];
  const title = terminal?.title || 'node index.js';

  useEffect(() => {
    if (currentSnippetIdx >= snippets.length) {
      const timeout = setTimeout(() => {
        setLines([]);
        setCurrentSnippetIdx(0);
        setCurrentCharIdx(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const currentText = snippets[currentSnippetIdx];
    if (currentCharIdx < currentText.length) {
      const charTimeout = setTimeout(() => {
        setLines(prev => {
          const newLines = [...prev];
          if (newLines.length <= currentSnippetIdx) {
            newLines.push(currentText[currentCharIdx]);
          } else {
            newLines[currentSnippetIdx] = currentText.substring(0, currentCharIdx + 1);
          }
          return newLines;
        });
        setCurrentCharIdx(prev => prev + 1);
      }, 40);
      return () => clearTimeout(charTimeout);
    } else {
      const lineTimeout = setTimeout(() => {
        setCurrentSnippetIdx(prev => prev + 1);
        setCurrentCharIdx(0);
      }, 800);
      return () => clearTimeout(lineTimeout);
    }
  }, [currentSnippetIdx, currentCharIdx, snippets]);

  // Premium syntax highlighter helper
  const renderHighlightedLine = (line) => {
    if (!line) return null;
    
    if (line.includes('100% ONLINE') || line.includes('SUCCESS')) {
      return (
        <span style={{ color: isLightTheme ? '#2f855a' : '#9ece6a', fontWeight: '600' }}>
          {line}
        </span>
      );
    }

    const regex = /(const|import|from|new|await|console\.log|'[^']*'|"[^"]*"|\[[^\]]*\]|\{[^\}]*\})/g;
    const parts = line.split(regex);
    
    return parts.map((part, i) => {
      let style = { color: isLightTheme ? '#2d3748' : '#a9b1d6' };
      if (part === 'const' || part === 'new' || part === 'await' || part === 'import' || part === 'from') {
        style = { color: isLightTheme ? '#805ad5' : '#bb9af3', fontWeight: '700' };
      } else if (part === 'console.log') {
        style = { color: isLightTheme ? '#2b6cb0' : '#7aa2f7' };
      } else if ((part.startsWith("'") && part.endsWith("'")) || (part.startsWith('"') && part.endsWith('"'))) {
        style = { color: isLightTheme ? '#319795' : '#9ece6a' };
      } else if (part.startsWith('[') || part.startsWith('{')) {
        style = { color: isLightTheme ? '#dd6b20' : '#ff9e64' };
      }
      return <span key={i} style={style}>{part}</span>;
    });
  };

  return (
    <div style={{
      background: isLightTheme ? 'rgba(255, 255, 255, 0.7)' : 'hsla(240, 15%, 8%, 0.65)',
      border: '1px solid var(--card-border)',
      borderRadius: 'var(--radius-md)',
      padding: '0.75rem 1rem',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.75rem',
      color: isLightTheme ? '#2d3748' : '#a9b1d6',
      width: '100%',
      maxWidth: '380px',
      marginTop: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      backdropFilter: 'blur(10px)',
      boxShadow: isLightTheme ? '0 8px 30px rgba(0,0,0,0.06)' : '0 8px 30px rgba(0,0,0,0.2)',
      textAlign: 'left',
      transition: 'var(--transition)'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        borderBottom: isLightTheme ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.08)', 
        paddingBottom: '0.4rem', 
        marginBottom: '0.2rem' 
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f7768e' }}></span>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#e0af68' }}></span>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#9ece6a' }}></span>
        </div>
        <span style={{ fontSize: '0.7rem', color: isLightTheme ? '#7c8ba1' : '#565f89', fontWeight: '600' }}>{title}</span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minHeight: '90px' }}>
        {lines.map((line, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ color: isLightTheme ? '#a0aec0' : '#414868', userSelect: 'none', fontSize: '0.7rem' }}>{idx + 1}</span>
            <span>{renderHighlightedLine(line)}</span>
          </div>
        ))}
        {currentSnippetIdx < snippets.length && (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ color: isLightTheme ? '#a0aec0' : '#414868', userSelect: 'none', fontSize: '0.7rem' }}>{lines.length + 1}</span>
            <span style={{ height: '0.8rem', width: '2px', backgroundColor: isLightTheme ? '#3182ce' : '#7aa2f7', animation: 'blink 1s infinite' }}></span>
          </div>
        )}
      </div>
    </div>
  );
}

function MedicineDeskAnimation() {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [items, setItems] = useState([
    { name: 'Amoxicillin 500mg', status: '✓ DISPENSED', color: 'hsl(140, 80%, 45%)' },
    { name: 'Paracetamol 500mg', status: '✓ DISPENSED', color: 'hsl(140, 80%, 45%)' },
    { name: 'Cold-Chain Audit', status: '● 4.2°C SAFE', color: 'hsl(200, 100%, 60%)' },
    { name: 'SAP Invoice Sync', status: '⟳ IN QUEUE', color: 'hsl(35, 90%, 55%)' }
  ]);
  const [progress, setProgress] = useState(70);
  const [counter, setCounter] = useState(148);

  useEffect(() => {
    setIsLightTheme(document.documentElement.classList.contains('light-theme'));
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsLightTheme(document.documentElement.classList.contains('light-theme'));
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => prev + 1);
      setProgress(prev => {
        const next = prev + 5;
        return next > 100 ? 40 : next;
      });

      setItems(prev => {
        const next = [...prev];
        const first = next.shift();
        if (first.name === 'SAP Invoice Sync') {
          first.status = '✓ SYNCED';
          first.color = 'hsl(140, 80%, 45%)';
        } else if (first.name === 'Amoxicillin 500mg') {
          first.status = '✓ DISPENSED';
          first.color = 'hsl(140, 80%, 45%)';
        } else if (first.name === 'Cold-Chain Audit') {
          first.status = `● ${(3.5 + Math.random() * 2).toFixed(1)}°C SAFE`;
          first.color = 'hsl(200, 100%, 60%)';
        }
        
        next.push(first);
        
        const last = next[next.length - 1];
        if (last.name === 'SAP Invoice Sync') {
          last.status = '⟳ IN QUEUE';
          last.color = 'hsl(35, 90%, 55%)';
        }
        return next;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      background: isLightTheme ? 'rgba(255, 255, 255, 0.7)' : 'hsla(240, 15%, 8%, 0.65)',
      border: '1px solid var(--card-border)',
      borderRadius: 'var(--radius-md)',
      padding: '0.75rem 1rem',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.75rem',
      color: isLightTheme ? '#2d3748' : '#a9b1d6',
      width: '100%',
      maxWidth: '380px',
      marginTop: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      backdropFilter: 'blur(10px)',
      boxShadow: isLightTheme ? '0 8px 30px rgba(0,0,0,0.06)' : '0 8px 30px rgba(0,0,0,0.2)',
      textAlign: 'left',
      transition: 'var(--transition)'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        borderBottom: isLightTheme ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.08)', 
        paddingBottom: '0.4rem', 
        marginBottom: '0.2rem' 
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f7768e' }}></span>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#e0af68' }}></span>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#9ece6a' }}></span>
        </div>
        <span style={{ fontSize: '0.7rem', color: isLightTheme ? '#7c8ba1' : '#565f89', fontWeight: '600' }}>apothecary_ledger --live</span>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'stretch' }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '0.5rem',
          borderRight: isLightTheme ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.08)',
          paddingRight: '1.25rem',
          width: '95px',
          flexShrink: 0
        }}>
          <div style={{
            fontSize: '2.2rem',
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '45px',
            animation: 'float-med 3s ease-in-out infinite'
          }}>
            💊
          </div>
          
          <div style={{ textAlign: 'center', width: '100%' }}>
            <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.15rem', fontWeight: '600' }}>COLD CHAIN</span>
            <div style={{ height: '4px', width: '100%', background: isLightTheme ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'hsl(190, 95%, 50%)', transition: 'width 0.4s' }}></div>
            </div>
            <span style={{ fontSize: '0.65rem', color: 'hsl(190, 95%, 50%)', fontWeight: 'bold', display: 'block', marginTop: '0.25rem' }}>8.2°C SAFE</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flexGrow: 1, justifyContent: 'center' }}>
          {items.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem' }}>
              <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{item.name}</span>
              <span style={{ 
                color: item.color, 
                fontWeight: '700', 
                fontSize: '0.65rem',
                fontFamily: 'var(--font-mono)',
                backgroundColor: item.color.replace(')', ', 0.1)').replace('hsl', 'hsla'),
                padding: '0.1rem 0.4rem',
                borderRadius: '4px'
              }}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        borderTop: isLightTheme ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.08)',
        paddingTop: '0.4rem',
        marginTop: '0.2rem',
        fontSize: '0.65rem',
        color: 'var(--text-muted)'
      }}>
        <span>DISPATCHED TODAY: <strong style={{ color: 'var(--text-primary)' }}>{counter}</strong></span>
        <span>DESK: <strong style={{ color: 'var(--text-primary)' }}>OFFICE A</strong></span>
      </div>

      <style>{`
        @keyframes float-med {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(8deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}

function TeacherClassroomAnimation() {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [topics, setTopics] = useState([
    { name: 'HTML5 Semantics', status: '✓ COMPLETED', color: 'hsl(140, 80%, 45%)' },
    { name: 'CSS Flexbox Layouts', status: '✓ COMPLETED', color: 'hsl(140, 80%, 45%)' },
    { name: 'Adobe XD wireframes', status: '⟳ ACTIVE LESSON', color: 'hsl(35, 90%, 55%)' },
    { name: 'Excel Formula workshop', status: '💤 UPCOMING', color: 'hsl(200, 100%, 60%)' }
  ]);
  const [attendance, setAttendance] = useState(24);
  const [timerCount, setTimerCount] = useState(45);

  useEffect(() => {
    setIsLightTheme(document.documentElement.classList.contains('light-theme'));
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsLightTheme(document.documentElement.classList.contains('light-theme'));
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerCount(prev => (prev <= 5 ? 50 : prev - 1));
      setAttendance(prev => {
        const rand = Math.random();
        if (rand > 0.7 && prev < 25) return prev + 1;
        if (rand < 0.3 && prev > 22) return prev - 1;
        return prev;
      });

      setTopics(prev => {
        const next = [...prev];
        const first = next.shift();
        if (first.name === 'Adobe XD wireframes') {
          first.status = '✓ COMPLETED';
          first.color = 'hsl(140, 80%, 45%)';
        } else if (first.name === 'HTML5 Semantics') {
          first.status = '✓ COMPLETED';
          first.color = 'hsl(140, 80%, 45%)';
        } else if (first.name === 'CSS Flexbox Layouts') {
          first.status = '✓ COMPLETED';
          first.color = 'hsl(140, 80%, 45%)';
        } else if (first.name === 'Excel Formula workshop') {
          first.status = '⟳ ACTIVE LESSON';
          first.color = 'hsl(35, 90%, 55%)';
        }
        next.push(first);

        const last = next[next.length - 1];
        if (last.name === 'Excel Formula workshop') {
          last.status = '💤 UPCOMING';
          last.color = 'hsl(200, 100%, 60%)';
        }
        return next;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      background: isLightTheme ? 'rgba(255, 255, 255, 0.7)' : 'hsla(240, 15%, 8%, 0.65)',
      border: '1px solid var(--card-border)',
      borderRadius: 'var(--radius-md)',
      padding: '0.75rem 1rem',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.75rem',
      color: isLightTheme ? '#2d3748' : '#a9b1d6',
      width: '100%',
      maxWidth: '380px',
      marginTop: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      backdropFilter: 'blur(10px)',
      boxShadow: isLightTheme ? '0 8px 30px rgba(0,0,0,0.06)' : '0 8px 30px rgba(0,0,0,0.2)',
      textAlign: 'left',
      transition: 'var(--transition)'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        borderBottom: isLightTheme ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.08)', 
        paddingBottom: '0.4rem', 
        marginBottom: '0.2rem' 
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f7768e' }}></span>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#e0af68' }}></span>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#9ece6a' }}></span>
        </div>
        <span style={{ fontSize: '0.7rem', color: isLightTheme ? '#7c8ba1' : '#565f89', fontWeight: '600' }}>classroom_session --live</span>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'stretch' }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '0.5rem',
          borderRight: isLightTheme ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.08)',
          paddingRight: '1.25rem',
          width: '95px',
          flexShrink: 0
        }}>
          <div style={{
            fontSize: '2.2rem',
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '45px',
            animation: 'float-teacher 3s ease-in-out infinite'
          }}>
            🎓
          </div>
          
          <div style={{ textAlign: 'center', width: '100%' }}>
            <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.15rem', fontWeight: '600' }}>ATTENDANCE</span>
            <div style={{ height: '4px', width: '100%', background: isLightTheme ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(attendance / 25) * 100}%`, background: 'hsl(140, 80%, 45%)', transition: 'width 0.4s' }}></div>
            </div>
            <span style={{ fontSize: '0.65rem', color: 'hsl(140, 80%, 45%)', fontWeight: 'bold', display: 'block', marginTop: '0.25rem' }}>{attendance}/25 PRES</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flexGrow: 1, justifyContent: 'center' }}>
          {topics.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', fontSize: '0.7rem' }}>
              <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{item.name}</span>
              <span style={{ 
                color: item.color, 
                fontWeight: '700', 
                fontSize: '0.65rem',
                fontFamily: 'var(--font-mono)',
                backgroundColor: item.color.replace(')', ', 0.1)').replace('hsl', 'hsla'),
                padding: '0.1rem 0.4rem',
                borderRadius: '4px'
              }}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        borderTop: isLightTheme ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.08)',
        paddingTop: '0.4rem',
        marginTop: '0.2rem',
        fontSize: '0.65rem',
        color: 'var(--text-muted)'
      }}>
        <span>TIME REMAINING: <strong style={{ color: 'var(--text-primary)' }}>{timerCount} MIN</strong></span>
        <span>ROOM: <strong style={{ color: 'var(--text-primary)' }}>LAB 3B</strong></span>
      </div>

      <style>{`
        @keyframes float-teacher {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(-6deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}

export default function Hero({ profileData }) {
  const profileAvatar = profileData.avatar;
  const [heroRef, heroVisible] = useInView({ threshold: 0.1 });
  const vis = heroVisible ? 'visible' : '';

  return (
    <section id="hero" className="section hero-section" ref={heroRef} style={{
      paddingTop: 'calc(var(--header-height) + 40px)',
      display: 'flex',
      alignItems: 'center',
      minHeight: '80vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dynamic Background Glow Blobs */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '10%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'var(--primary-glow)',
        filter: 'blur(110px)',
        zIndex: -1,
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'var(--secondary-glow)',
        filter: 'blur(90px)',
        zIndex: -1,
        pointerEvents: 'none'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '3rem',
          alignItems: 'center'
        }}>
          
          {/* Left Column: Bio & Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }} className="hero-left">
            {/* Availability badge */}
            <div className={`reveal ${vis} stagger-1`} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: '50px',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              fontSize: '0.85rem',
              fontWeight: '600',
              color: 'var(--primary)',
              width: 'fit-content',
              fontFamily: 'var(--font-mono)'
            }}>
              <span className="pulse-dot" style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                backgroundColor: 'hsl(140, 80%, 50%)',
                display: 'inline-block',
                boxShadow: '0 0 8px hsl(140, 80%, 50%)'
              }}></span>
              {profileData.availability}
            </div>

            {/* Name */}
            <h1 className={`reveal ${vis} stagger-2`} style={{ lineHeight: '1.1', fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: '0' }}>
              Hi, I'm <span className="gradient-text">{profileData.name}</span>
            </h1>

            {/* Title */}
            <p className={`reveal ${vis} stagger-3`} style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
              fontWeight: '700',
              color: 'var(--text-primary)',
              lineHeight: '1.2',
              margin: '0',
              letterSpacing: '-0.01em'
            }}>
              {profileData.title}
            </p>

            {/* Tagline */}
            <p className={`reveal ${vis} stagger-4`} style={{
              fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
              margin: '0',
              maxWidth: '600px'
            }}>
              {profileData.tagline}
            </p>

            {/* Core Tech Stack Cards */}
            {Object.values(profileData.about?.skillsConsole || {}).filter(s => s && s.name && s.description).length > 0 && (
              <div className={`hero-stack-grid reveal ${vis} stagger-5`} style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(3, Object.values(profileData.about?.skillsConsole || {}).filter(s => s && s.name && s.description).length)}, 1fr)`,
                gap: '1rem',
                marginTop: '0.75rem',
                width: '100%'
              }}>
                {Object.values(profileData.about.skillsConsole)
                  .filter(skill => skill && skill.name && skill.description)
                  .map((skill, index) => {
                    const borderTopColor = skill.color || 'var(--primary)';
                    return (
                      <div key={index} className="hero-stack-card" style={{
                        background: 'var(--card-bg)',
                        border: '1px solid var(--card-border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem',
                        transition: 'var(--transition)',
                        cursor: 'default',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, height: '3px', width: '100%', background: borderTopColor }}></div>
                        <span style={{ fontSize: '0.8rem', color: borderTopColor, fontWeight: '700', fontFamily: 'var(--font-mono)' }}>{skill.type.toUpperCase()}</span>
                        <h4 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--text-primary)' }}>{skill.name}</h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.4' }}>{skill.description.substring(0, 65)}...</p>
                      </div>
                    );
                  })}
              </div>
            )}

            {/* CTA Buttons */}
            <div className={`reveal ${vis} stagger-6`} style={{
              display: 'flex',
              gap: '1.25rem',
              flexWrap: 'wrap',
              marginTop: '0.5rem'
            }}>
              <a href="#projects" className="btn btn-primary">
                View Work
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
              <a href={`mailto:${profileData.contact.email}`} className="btn btn-secondary">
                Get in Touch
              </a>
            </div>

            {/* Quick metrics */}
            <div className={`hero-metrics reveal ${vis} stagger-7`} style={{
              display: 'flex',
              gap: '2.5rem',
              marginTop: '2rem',
              flexWrap: 'wrap',
              borderTop: '1px solid var(--card-border)',
              paddingTop: '1.5rem'
            }}>
              {profileData.metrics.map((m, idx) => (
                <div key={idx}>
                  <p style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0', lineHeight: '1' }}>{m.value}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', margin: '0', marginTop: '0.35rem', textTransform: 'uppercase' }}>{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Animated Profile Image & Code Terminal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center', alignItems: 'center' }} className="hero-right">
            <div className={`avatar-frame reveal-scale ${vis} stagger-3`} style={{
              position: 'relative',
              width: 'clamp(240px, 30vw, 320px)',
              height: 'clamp(240px, 30vw, 320px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {/* Outer rotating/pulsing ring */}
              <div className="ring-pulse" style={{
                position: 'absolute',
                width: '108%',
                height: '108%',
                borderRadius: '50%',
                border: '2px dashed var(--primary)',
                opacity: '0.4'
              }}></div>

              {/* Inner glowing ring */}
              <div className="ring-glow" style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'var(--gradient-text)',
                padding: '4px',
                boxShadow: '0 0 25px var(--primary-glow)',
                zIndex: 1
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-color)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <img 
                    src={profileAvatar} 
                    alt={profileData.name} 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    className="avatar-img"
                  />
                </div>
              </div>
            </div>

            <div className={`reveal ${vis} stagger-5`} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              {profileData.type === 'medicine' || profileData.id === 'nida' ? (
                <MedicineDeskAnimation />
              ) : profileData.type === 'teacher' || profileData.id === 'kimchan' ? (
                <TeacherClassroomAnimation />
              ) : (
                <HeroTerminal terminal={profileData.terminal} />
              )}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 2.5rem !important;
          }
          .hero-left {
            align-items: center !important;
            text-align: center !important;
          }
          .hero-metrics {
            justify-content: center !important;
          }
        }
        @media (max-width: 600px) {
          .hero-stack-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .hero-stack-card:hover {
          transform: translateY(-5px);
          border-color: var(--card-border-hover) !important;
          box-shadow: 0 10px 20px var(--primary-glow);
        }
        .avatar-frame {
          animation: float 6s ease-in-out infinite;
        }
        .ring-pulse {
          animation: spin-pulse 20s linear infinite;
        }
        .pulse-dot {
          animation: pulse 1.8s ease-in-out infinite;
        }
        .avatar-img:hover {
          transform: scale(1.1) rotate(2deg);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes spin-pulse {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.03); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes pulse {
          0% { transform: scale(0.9); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.8; }
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
