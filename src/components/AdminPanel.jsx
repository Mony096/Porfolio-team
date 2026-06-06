import React, { useState, useEffect } from 'react';

export default function AdminPanel({ profiles, setProfiles, onClose }) {
  const [authorized, setAuthorized] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profiles'); // 'profiles' | 'messages' | 'style'
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  // Dashboard Background Animation States
  const [stylePreset, setStylePreset] = useState(() => localStorage.getItem('dashboard_bg_preset') || 'cyber');
  const [styleColorTheme, setStyleColorTheme] = useState(() => localStorage.getItem('dashboard_color_theme') || 'cyberpunk');
  const [styleAnimSpeed, setStyleAnimSpeed] = useState(() => localStorage.getItem('dashboard_anim_speed') || 'active');
  const [styleParticleSize, setStyleParticleSize] = useState(() => localStorage.getItem('dashboard_particle_size') || 'nodes');

  // Editing / Creating Profile States
  const [editingProfile, setEditingProfile] = useState(null); // null means list view, 'new' means creating, profileObj means editing
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Form Fields State
  const [id, setId] = useState('');
  const [profilePasscode, setProfilePasscode] = useState('');
  const [profileType, setProfileType] = useState('developer');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [avatar, setAvatar] = useState('/placeholder.png');
  const [availability, setAvailability] = useState('Available');
  const [metrics, setMetrics] = useState([{ value: '', label: '' }]);
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactLocation, setContactLocation] = useState('');
  const [aboutIntro, setAboutIntro] = useState('');
  const [aboutBio, setAboutBio] = useState('');
  const [secondarySkills, setSecondarySkills] = useState('');
  const [languages, setLanguages] = useState('');
  
  // Education List State
  const [educationList, setEducationList] = useState([{ school: '', degree: '', period: '' }]);

  // Projects List State
  const [projectsList, setProjectsList] = useState([{ title: '', description: '', tech: '', color: 'linear-gradient(135deg, hsl(263, 90%, 65%) 0%, hsl(190, 95%, 50%) 100%)', icon: '⚡' }]);

  // Experiences List State
  const [experiencesList, setExperiencesList] = useState([{ date: '', role: '', company: '', highlightsText: '', highlightsTags: '', tech: '' }]);

  // Skills Console State
  const [skillReactName, setSkillReactName] = useState('React JS');
  const [skillReactLevel, setSkillReactLevel] = useState(90);
  const [skillReactDesc, setSkillReactDesc] = useState('');
  const [skillReactCaps, setSkillReactCaps] = useState('');

  const [skillFlutterName, setSkillFlutterName] = useState('Flutter');
  const [skillFlutterLevel, setSkillFlutterLevel] = useState(85);
  const [skillFlutterDesc, setSkillFlutterDesc] = useState('');
  const [skillFlutterCaps, setSkillFlutterCaps] = useState('');

  const [skillNodeName, setSkillNodeName] = useState('Node JS');
  const [skillNodeLevel, setSkillNodeLevel] = useState(85);
  const [skillNodeDesc, setSkillNodeDesc] = useState('');
  const [skillNodeCaps, setSkillNodeCaps] = useState('');

  // Auto-login if passcode is in sessionStorage
  useEffect(() => {
    const cached = sessionStorage.getItem('admin_passcode');
    if (cached) {
      handleAuth(cached);
    }
  }, []);

  const handleAuth = async (code) => {
    setError('');
    try {
      const response = await fetch('http://localhost:5005/api/messages', {
        headers: { 'x-admin-passcode': code }
      });
      if (response.status === 401) {
        setError('Invalid Admin Passcode');
        sessionStorage.removeItem('admin_passcode');
      } else if (response.ok) {
        setAuthorized(true);
        setPasscode(code);
        sessionStorage.setItem('admin_passcode', code);
        setIsOfflineMode(false);
      } else {
        setError(`Server returned status: ${response.status}`);
      }
    } catch (err) {
      console.log('Server unreachable during auth, entering offline mock mode if passcode is default');
      if (code === 'admin123') {
        setAuthorized(true);
        setPasscode(code);
        setIsOfflineMode(true);
      } else {
        setError('Backend is offline. Enter default passcode "admin123" to authorize locally.');
      }
    }
  };

  // Fetch Messages when authorized
  useEffect(() => {
    if (authorized) {
      fetchMessages();
    }
  }, [authorized]);

  const fetchMessages = async () => {
    setMessagesLoading(true);
    try {
      const response = await fetch('http://localhost:5005/api/messages', {
        headers: { 'x-admin-passcode': passcode }
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data.reverse()); // Show newest first
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_passcode');
    setAuthorized(false);
    setPasscode('');
  };

  const handleDeleteMessage = async (msgId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    
    if (isOfflineMode) {
      setMessages(prev => prev.filter(m => m.id !== msgId));
      return;
    }

    try {
      const response = await fetch(`http://localhost:5005/api/messages/${msgId}`, {
        method: 'DELETE',
        headers: {
          'x-admin-passcode': passcode
        }
      });
      if (response.ok) {
        setMessages(prev => prev.filter(m => m.id !== msgId));
      } else {
        const errData = await response.json();
        alert(`Failed to delete message: ${errData.error}`);
      }
    } catch (err) {
      alert('Failed to connect to backend server to delete message.');
    }
  };

  // Initialize Form for Editing or Creating
  const startEditProfile = (profile) => {
    setFormError('');
    setFormSuccess('');
    if (profile === 'new') {
      setEditingProfile('new');
      setId('');
      setName('');
      setTitle('');
      setTagline('');
      setAvatar('/placeholder.png');
      setAvailability('Available for New Opportunities');
      setProfileType('developer');
      setProfilePasscode('');
      setMetrics([{ value: '', label: '' }]);
      setContactEmail('');
      setContactPhone('');
      setContactLocation('');
      setAboutIntro('');
      setAboutBio('');
      setSecondarySkills('');
      setLanguages('');
      setEducationList([{ school: '', degree: '', period: '' }]);
      setProjectsList([{ title: '', description: '', tech: '', color: 'linear-gradient(135deg, hsl(263, 90%, 65%) 0%, hsl(190, 95%, 50%) 100%)', icon: '⚡' }]);
      setExperiencesList([{ date: '', role: '', company: '', highlightsText: '', highlightsTags: '', tech: '' }]);
      
      setSkillReactName('React JS');
      setSkillReactLevel(90);
      setSkillReactDesc('');
      setSkillReactCaps('');
      setSkillFlutterName('Flutter');
      setSkillFlutterLevel(85);
      setSkillFlutterDesc('');
      setSkillFlutterCaps('');
      setSkillNodeName('Node JS');
      setSkillNodeLevel(85);
      setSkillNodeDesc('');
      setSkillNodeCaps('');
    } else {
      setEditingProfile(profile);
      setId(profile.id);
      setName(profile.name || '');
      setTitle(profile.title || '');
      setTagline(profile.tagline || '');
      setAvatar(profile.avatar || '');
      setAvailability(profile.availability || '');
      setProfileType(profile.type || 'developer');
      setProfilePasscode(profile.passcode || '');
      
      // Load lists or fallback
      setMetrics(profile.metrics && profile.metrics.length > 0 ? profile.metrics : [{ value: '', label: '' }]);
      setContactEmail(profile.contact?.email || '');
      setContactPhone(profile.contact?.phone || '');
      setContactLocation(profile.contact?.location || '');
      setAboutIntro(profile.about?.intro || '');
      setAboutBio(profile.about?.bio || '');
      setSecondarySkills(profile.about?.secondarySkills?.join(', ') || '');
      setLanguages(profile.about?.languages?.join(', ') || '');
      
      setEducationList(profile.about?.education && profile.about.education.length > 0 
        ? profile.about.education 
        : [{ school: '', degree: '', period: '' }]);

      // Projects
      setProjectsList(profile.projects && profile.projects.length > 0
        ? profile.projects.map(p => ({
            title: p.title || '',
            description: p.description || '',
            tech: Array.isArray(p.tech) ? p.tech.join(', ') : p.tech || '',
            color: p.color || '',
            icon: p.icon || ''
          }))
        : [{ title: '', description: '', tech: '', color: '', icon: '' }]);

      // Experiences
      setExperiencesList(profile.experiences && profile.experiences.length > 0
        ? profile.experiences.map(exp => ({
            date: exp.date || '',
            role: exp.role || '',
            company: exp.company || '',
            highlightsText: exp.highlights?.map(h => h.text).join('\n') || '',
            highlightsTags: exp.highlights?.map(h => h.tags?.join(',')).filter(Boolean).join('; ') || '',
            tech: exp.tech?.join(', ') || ''
          }))
        : [{ date: '', role: '', company: '', highlightsText: '', highlightsTags: '', tech: '' }]);

      // Skill Console
      const sc = profile.about?.skillsConsole || {};
      setSkillReactName(sc.react?.name || 'React JS');
      setSkillReactLevel(sc.react?.level || 90);
      setSkillReactDesc(sc.react?.description || '');
      setSkillReactCaps(sc.react?.capabilities?.join('\n') || '');

      setSkillFlutterName(sc.flutter?.name || 'Flutter');
      setSkillFlutterLevel(sc.flutter?.level || 85);
      setSkillFlutterDesc(sc.flutter?.description || '');
      setSkillFlutterCaps(sc.flutter?.capabilities?.join('\n') || '');

      setSkillNodeName(sc.node?.name || 'Node JS');
      setSkillNodeLevel(sc.node?.level || 80);
      setSkillNodeDesc(sc.node?.description || '');
      setSkillNodeCaps(sc.node?.capabilities?.join('\n') || '');
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!id || !name) {
      setFormError('ID and Name are required.');
      return;
    }

    // Process lists and values into structured payload
    const processedMetrics = metrics.filter(m => m.value && m.label);
    const processedSecondarySkills = secondarySkills.split(',').map(s => s.trim()).filter(Boolean);
    const processedLanguages = languages.split(',').map(l => l.trim()).filter(Boolean);
    const processedEducation = educationList.filter(edu => edu.school && edu.degree);
    
    const processedProjects = projectsList
      .filter(p => p.title)
      .map(p => ({
        title: p.title,
        description: p.description,
        tech: p.tech.split(',').map(t => t.trim()).filter(Boolean),
        color: p.color || 'linear-gradient(135deg, hsl(263, 90%, 65%) 0%, hsl(190, 95%, 50%) 100%)',
        icon: p.icon || '⚡'
      }));

    const processedExperiences = experiencesList
      .filter(exp => exp.role && exp.company)
      .map(exp => {
        const textLines = exp.highlightsText.split('\n').map(t => t.trim()).filter(Boolean);
        const tagsGroups = exp.highlightsTags.split(';').map(t => t.trim());
        
        const highlights = textLines.map((text, index) => {
          const groupTags = tagsGroups[index] 
            ? tagsGroups[index].split(',').map(tag => tag.trim()).filter(Boolean) 
            : [];
          return { text, tags: groupTags };
        });

        return {
          date: exp.date,
          role: exp.role,
          company: exp.company,
          highlights,
          tech: exp.tech.split(',').map(t => t.trim()).filter(Boolean)
        };
      });

    const skillsConsole = {
      react: {
        name: skillReactName,
        type: 'Frontend Web',
        color: 'hsl(195, 100%, 50%)',
        level: Number(skillReactLevel),
        description: skillReactDesc,
        capabilities: skillReactCaps.split('\n').map(c => c.trim()).filter(Boolean)
      },
      flutter: {
        name: skillFlutterName,
        type: 'Mobile Development',
        color: 'hsl(200, 100%, 60%)',
        level: Number(skillFlutterLevel),
        description: skillFlutterDesc,
        capabilities: skillFlutterCaps.split('\n').map(c => c.trim()).filter(Boolean)
      },
      node: {
        name: skillNodeName,
        type: 'Backend & Middleware',
        color: 'hsl(120, 80%, 45%)',
        level: Number(skillNodeLevel),
        description: skillNodeDesc,
        capabilities: skillNodeCaps.split('\n').map(c => c.trim()).filter(Boolean)
      }
    };

    const payload = {
      id: id.toLowerCase().trim(),
      name,
      title,
      tagline,
      avatar,
      availability,
      passcode: profilePasscode,
      type: profileType,
      metrics: processedMetrics,
      terminal: editingProfile === 'new' 
        ? { title: 'node index.js', snippets: [`const dev = new Developer('${name}');`, `dev.skills = ['React', 'Node.js'];`, `console.log('ONLINE');`] }
        : editingProfile.terminal || { title: 'node index.js', snippets: [] },
      about: {
        intro: aboutIntro,
        bio: aboutBio,
        skillsConsole,
        secondarySkills: processedSecondarySkills,
        education: processedEducation,
        languages: processedLanguages
      },
      experiences: processedExperiences,
      projects: processedProjects,
      contact: {
        email: contactEmail,
        phone: contactPhone,
        location: contactLocation
      }
    };

    if (isOfflineMode) {
      // Offline mode simulation
      const newProfiles = { ...profiles };
      newProfiles[payload.id] = payload;
      setProfiles(newProfiles);
      setFormSuccess('Profile saved successfully (Offline Simulation Mode)');
      setTimeout(() => setEditingProfile(null), 1500);
      return;
    }

    try {
      const isNew = editingProfile === 'new';
      const url = isNew 
        ? 'http://localhost:5005/api/profiles'
        : `http://localhost:5005/api/profiles/${id}`;
      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        setFormSuccess(isNew ? 'Profile created successfully!' : 'Profile updated successfully!');
        
        // Update local profiles list state
        const newProfiles = { ...profiles };
        newProfiles[payload.id] = result.profile || payload;
        setProfiles(newProfiles);

        setTimeout(() => {
          setEditingProfile(null);
        }, 1500);
      } else {
        setFormError(result.error || 'Server rejected updates.');
      }
    } catch (err) {
      setFormError('Failed to connect to backend server to save.');
    }
  };

  const handleDeleteProfile = async (profileId) => {
    if (!window.confirm(`Are you absolutely sure you want to delete the profile "${profileId}"? This action cannot be undone.`)) {
      return;
    }

    if (isOfflineMode) {
      const newProfiles = { ...profiles };
      delete newProfiles[profileId];
      setProfiles(newProfiles);
      alert('Profile deleted (Offline Simulation Mode)');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5005/api/profiles/${profileId}`, {
        method: 'DELETE',
        headers: {
          'x-admin-passcode': passcode
        }
      });

      if (response.ok) {
        const newProfiles = { ...profiles };
        delete newProfiles[profileId];
        setProfiles(newProfiles);
        alert('Profile deleted successfully.');
      } else {
        const result = await response.json();
        alert(`Error: ${result.error}`);
      }
    } catch (err) {
      alert('Failed to connect to backend server to delete.');
    }
  };

  // List field helper additions
  const addMetric = () => setMetrics([...metrics, { value: '', label: '' }]);
  const removeMetric = (index) => setMetrics(metrics.filter((_, idx) => idx !== index));

  const addEdu = () => setEducationList([...educationList, { school: '', degree: '', period: '' }]);
  const removeEdu = (index) => setEducationList(educationList.filter((_, idx) => idx !== index));

  const addProj = () => setProjectsList([...projectsList, { title: '', description: '', tech: '', color: 'linear-gradient(135deg, hsl(263, 90%, 65%) 0%, hsl(190, 95%, 50%) 100%)', icon: '⚡' }]);
  const removeProj = (index) => setProjectsList(projectsList.filter((_, idx) => idx !== index));

  const addExp = () => setExperiencesList([...experiencesList, { date: '', role: '', company: '', highlightsText: '', highlightsTags: '', tech: '' }]);
  const removeExp = (index) => setExperiencesList(experiencesList.filter((_, idx) => idx !== index));

  if (!authorized) {
    return (
      <section className="section" style={{
        paddingTop: 'calc(var(--header-height) + 60px)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '2.5rem 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(150, 100, 255, 0.1)',
              color: 'var(--primary)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h2>Admin Authorization</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Please enter the passcode to access administration settings.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleAuth(passcode); }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <input
                type="password"
                placeholder="Passcode (e.g. admin123)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--card-border)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  textAlign: 'center'
                }}
                autoFocus
              />
            </div>
            
            {error && (
              <p style={{ color: '#ff4d4d', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1rem', fontWeight: '600' }}>
                {error}
              </p>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Unlock Panel
            </button>
          </form>

          <button onClick={onClose} style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            width: '100%',
            textAlign: 'center',
            marginTop: '1.5rem',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}>
            Cancel
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="section" style={{
      paddingTop: 'calc(var(--header-height) + 40px)',
      minHeight: '85vh',
      color: 'var(--text-primary)'
    }}>
      <style>{`
        @keyframes badge-pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 77, 77, 0.6); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 5px rgba(255, 77, 77, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 77, 77, 0); }
        }
        .inquiry-badge {
          animation: badge-pulse 2.2s infinite;
        }
      `}</style>
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        {/* Admin Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          borderBottom: '1px solid var(--card-border)',
          paddingBottom: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', margin: 0 }}>
              Admin <span className="gradient-text">Control Center</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
              {isOfflineMode ? (
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>⚠️ OFFLINE SIMULATION MODE (Actions local only)</span>
              ) : (
                'Connected dynamically to portfolio API server.'
              )}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => setActiveTab('profiles')}
              className={`btn ${activeTab === 'profiles' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              Profiles
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`btn ${activeTab === 'messages' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ 
                padding: '0.5rem 1.25rem', 
                fontSize: '0.85rem',
                position: 'relative'
              }}
            >
              Inquiries
              {messages.length > 0 && (
                <span 
                  className="inquiry-badge"
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    background: '#ff4d4d',
                    color: 'white',
                    borderRadius: '50%',
                    fontSize: '0.65rem',
                    fontWeight: 'bold',
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(255, 77, 77, 0.4)',
                    border: '1px solid var(--bg-color)',
                    zIndex: 10
                  }}
                >
                  {messages.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('style')}
              className={`btn ${activeTab === 'style' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              Dashboard Style
            </button>
            <button
              onClick={handleLogout}
              className="btn"
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.85rem',
                border: '1px solid rgba(255, 77, 77, 0.4)',
                background: 'rgba(255, 77, 77, 0.05)',
                color: '#ff4d4d'
              }}
            >
              Lock
            </button>
            <button
              onClick={onClose}
              className="btn btn-secondary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              Exit
            </button>
          </div>
        </div>

        {/* Tab 1: Profiles Management */}
        {activeTab === 'profiles' && editingProfile === null && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3>Manage Portfolios ({Object.keys(profiles || {}).length})</h3>
              <button 
                onClick={() => startEditProfile('new')}
                className="btn btn-primary"
                style={{ padding: '0.5rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <span>+ Create Member Profile</span>
              </button>
            </div>

            {/* Profile Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1.5rem'
            }}>
              {Object.values(profiles || {}).map((profile) => (
                <div key={profile.id} className="card" style={{
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  borderLeft: '4px solid var(--primary)',
                  position: 'relative'
                }}>
                  <img 
                    src={profile.avatar || '/placeholder.png'} 
                    alt={profile.name} 
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1px solid var(--card-border)'
                    }}
                  />
                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <h4 style={{ margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {profile.name}
                    </h4>
                    <p style={{ margin: '0.1rem 0 0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      ID: <code>{profile.id}</code> — {profile.title}
                    </p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => startEditProfile(profile)}
                        className="btn btn-secondary"
                        style={{ padding: '0.3rem 0.75rem', fontSize: '0.8rem', height: '30px' }}
                      >
                        Edit / Patch
                      </button>
                      <button 
                        onClick={() => handleDeleteProfile(profile.id)}
                        className="btn"
                        style={{
                          padding: '0.3rem 0.75rem',
                          fontSize: '0.8rem',
                          height: '30px',
                          border: '1px solid rgba(255, 77, 77, 0.3)',
                          background: 'transparent',
                          color: '#ff4d4d'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Editor View (Add / Edit) */}
        {activeTab === 'profiles' && editingProfile !== null && (
          <div className="card" style={{ padding: '2.5rem 2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>
                {editingProfile === 'new' ? 'Create Team Profile' : `Edit Profile: ${id}`}
              </h3>
              <button 
                onClick={() => setEditingProfile(null)}
                className="btn btn-secondary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
              >
                ← Back to List
              </button>
            </div>

            <form onSubmit={handleSaveProfile}>
              
              {/* Profile Config Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>
                    Profile ID (Lowercase slugs, e.g. "mony", "david") *
                  </label>
                  <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    disabled={editingProfile !== 'new'}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.8rem',
                      borderRadius: '6px',
                      border: '1px solid var(--card-border)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      color: 'var(--text-primary)',
                      opacity: editingProfile !== 'new' ? 0.6 : 1
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.8rem',
                      borderRadius: '6px',
                      border: '1px solid var(--card-border)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>
                    Professional Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lead Full Stack Developer"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.8rem',
                      borderRadius: '6px',
                      border: '1px solid var(--card-border)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>
                    Profile Layout Type *
                  </label>
                  <select
                    value={profileType}
                    onChange={(e) => setProfileType(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.8rem',
                      borderRadius: '6px',
                      border: '1px solid var(--card-border)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      color: 'var(--text-primary)',
                      height: '38px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="developer" style={{ background: '#222', color: '#fff' }}>Developer</option>
                    <option value="medicine" style={{ background: '#222', color: '#fff' }}>Medicine</option>
                    <option value="teacher" style={{ background: '#222', color: '#fff' }}>Teacher</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>
                    Access Passcode *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. mony123"
                    value={profilePasscode}
                    onChange={(e) => setProfilePasscode(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.8rem',
                      borderRadius: '6px',
                      border: '1px solid var(--card-border)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              </div>

              {/* Tagline & Avatar */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>
                    Hero Tagline description
                  </label>
                  <input
                    type="text"
                    placeholder="Short description overlay..."
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.8rem',
                      borderRadius: '6px',
                      border: '1px solid var(--card-border)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>
                    Avatar Image path
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. /mony1.png"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.8rem',
                      borderRadius: '6px',
                      border: '1px solid var(--card-border)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>
                    Availability Status
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Available for Projects"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.8rem',
                      borderRadius: '6px',
                      border: '1px solid var(--card-border)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              </div>

              {/* Metrics (e.g. Years Experience, etc.) */}
              <div style={{ marginBottom: '1.5rem', border: '1px dashed var(--card-border)', padding: '1rem', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Dashboard metrics badges</label>
                  <button type="button" onClick={addMetric} className="btn" style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem', border: '1px solid var(--card-border)' }}>
                    + Add Metric
                  </button>
                </div>
                {metrics.map((metric, index) => (
                  <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="text"
                      placeholder="Value (e.g. 4+ or SAP)"
                      value={metric.value}
                      onChange={(e) => {
                        const newM = [...metrics];
                        newM[index].value = e.target.value;
                        setMetrics(newM);
                      }}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        borderRadius: '4px',
                        border: '1px solid var(--card-border)',
                        background: 'rgba(255, 255, 255, 0.01)',
                        color: 'var(--text-primary)'
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Label (e.g. Years Experience)"
                      value={metric.label}
                      onChange={(e) => {
                        const newM = [...metrics];
                        newM[index].label = e.target.value;
                        setMetrics(newM);
                      }}
                      style={{
                        flex: 2,
                        padding: '0.5rem',
                        borderRadius: '4px',
                        border: '1px solid var(--card-border)',
                        background: 'rgba(255, 255, 255, 0.01)',
                        color: 'var(--text-primary)'
                      }}
                    />
                    {metrics.length > 1 && (
                      <button type="button" onClick={() => removeMetric(index)} style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '1.2rem' }}>
                        &times;
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Contact Information */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>Contact Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.8rem',
                      borderRadius: '6px',
                      border: '1px solid var(--card-border)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>Contact Phone</label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.8rem',
                      borderRadius: '6px',
                      border: '1px solid var(--card-border)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>Location</label>
                  <input
                    type="text"
                    value={contactLocation}
                    onChange={(e) => setContactLocation(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.8rem',
                      borderRadius: '6px',
                      border: '1px solid var(--card-border)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              </div>

              {/* Bio & Intro */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>
                  About: Intro sentence
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bridging complex backend databases with modern responsive user flows."
                  value={aboutIntro}
                  onChange={(e) => setAboutIntro(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.8rem',
                    borderRadius: '6px',
                    border: '1px solid var(--card-border)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    color: 'var(--text-primary)',
                    marginBottom: '1rem'
                  }}
                />

                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>
                  About: Detailed Biography Text
                </label>
                <textarea
                  rows="4"
                  value={aboutBio}
                  onChange={(e) => setAboutBio(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.8rem',
                    borderRadius: '6px',
                    border: '1px solid var(--card-border)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                    lineHeight: '1.5'
                  }}
                ></textarea>
              </div>

              {/* Lists: Secondary Skills, Languages & Education */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>
                    Secondary Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="HTML5, Git, SQL, SAP OData"
                    value={secondarySkills}
                    onChange={(e) => setSecondarySkills(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.8rem',
                      borderRadius: '6px',
                      border: '1px solid var(--card-border)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>
                    Languages Spoken (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Khmer - Native, English - Fluent"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.8rem',
                      borderRadius: '6px',
                      border: '1px solid var(--card-border)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              </div>

              {/* Education section */}
              <div style={{ marginBottom: '1.5rem', border: '1px dashed var(--card-border)', padding: '1rem', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Education Timeline</label>
                  <button type="button" onClick={addEdu} className="btn" style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem', border: '1px solid var(--card-border)' }}>
                    + Add Education
                  </button>
                </div>
                {educationList.map((edu, index) => (
                  <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="text"
                      placeholder="School"
                      value={edu.school}
                      onChange={(e) => {
                        const newE = [...educationList];
                        newE[index].school = e.target.value;
                        setEducationList(newE);
                      }}
                      style={{
                        flex: 2,
                        padding: '0.5rem',
                        borderRadius: '4px',
                        border: '1px solid var(--card-border)',
                        background: 'rgba(255, 255, 255, 0.01)',
                        color: 'var(--text-primary)'
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Degree / Study"
                      value={edu.degree}
                      onChange={(e) => {
                        const newE = [...educationList];
                        newE[index].degree = e.target.value;
                        setEducationList(newE);
                      }}
                      style={{
                        flex: 2,
                        padding: '0.5rem',
                        borderRadius: '4px',
                        border: '1px solid var(--card-border)',
                        background: 'rgba(255, 255, 255, 0.01)',
                        color: 'var(--text-primary)'
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Period (e.g. 2019-2023)"
                      value={edu.period}
                      onChange={(e) => {
                        const newE = [...educationList];
                        newE[index].period = e.target.value;
                        setEducationList(newE);
                      }}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        borderRadius: '4px',
                        border: '1px solid var(--card-border)',
                        background: 'rgba(255, 255, 255, 0.01)',
                        color: 'var(--text-primary)'
                      }}
                    />
                    {educationList.length > 1 && (
                      <button type="button" onClick={() => removeEdu(index)} style={{ background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '1.2rem' }}>
                        &times;
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Skills Console Customizations */}
              <div style={{ marginBottom: '2rem', border: '1px solid var(--card-border)', padding: '1.5rem', borderRadius: '8px', background: 'rgba(255,255,255,0.01)' }}>
                <h4 style={{ margin: '0 0 1rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>Skills Console Configuration</h4>
                
                {/* React Skill */}
                <div style={{ marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px dashed var(--card-border)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '0.5rem' }}>
                    <input type="text" value={skillReactName} onChange={(e) => setSkillReactName(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-primary)', fontWeight: 'bold' }} />
                    <input type="number" min="0" max="100" value={skillReactLevel} onChange={(e) => setSkillReactLevel(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-primary)', textAlign: 'center' }} />
                  </div>
                  <textarea placeholder="Skill description..." rows="2" value={skillReactDesc} onChange={(e) => setSkillReactDesc(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-primary)', marginBottom: '0.5rem', fontFamily: 'inherit' }}></textarea>
                  <textarea placeholder="Capabilities (one per line)..." rows="2" value={skillReactCaps} onChange={(e) => setSkillReactCaps(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}></textarea>
                </div>

                {/* Flutter Skill */}
                <div style={{ marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px dashed var(--card-border)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '0.5rem' }}>
                    <input type="text" value={skillFlutterName} onChange={(e) => setSkillFlutterName(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-primary)', fontWeight: 'bold' }} />
                    <input type="number" min="0" max="100" value={skillFlutterLevel} onChange={(e) => setSkillFlutterLevel(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-primary)', textAlign: 'center' }} />
                  </div>
                  <textarea placeholder="Skill description..." rows="2" value={skillFlutterDesc} onChange={(e) => setSkillFlutterDesc(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-primary)', marginBottom: '0.5rem', fontFamily: 'inherit' }}></textarea>
                  <textarea placeholder="Capabilities (one per line)..." rows="2" value={skillFlutterCaps} onChange={(e) => setSkillFlutterCaps(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}></textarea>
                </div>

                {/* Node Skill */}
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '0.5rem' }}>
                    <input type="text" value={skillNodeName} onChange={(e) => setSkillNodeName(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-primary)', fontWeight: 'bold' }} />
                    <input type="number" min="0" max="100" value={skillNodeLevel} onChange={(e) => setSkillNodeLevel(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-primary)', textAlign: 'center' }} />
                  </div>
                  <textarea placeholder="Skill description..." rows="2" value={skillNodeDesc} onChange={(e) => setSkillNodeDesc(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-primary)', marginBottom: '0.5rem', fontFamily: 'inherit' }}></textarea>
                  <textarea placeholder="Capabilities (one per line)..." rows="2" value={skillNodeCaps} onChange={(e) => setSkillNodeCaps(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}></textarea>
                </div>
              </div>

              {/* Experiences Section */}
              <div style={{ marginBottom: '1.5rem', border: '1px dashed var(--card-border)', padding: '1rem', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <label style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>Experiences timeline items</label>
                  <button type="button" onClick={addExp} className="btn" style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem', border: '1px solid var(--card-border)' }}>
                    + Add Experience
                  </button>
                </div>
                {experiencesList.map((exp, index) => (
                  <div key={index} style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '6px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--card-border)', position: 'relative' }}>
                    
                    <button type="button" onClick={() => removeExp(index)} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '1.2rem' }}>
                      &times;
                    </button>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <input type="text" placeholder="Date (e.g. 2023 - Present)" value={exp.date} onChange={(e) => {
                        const newE = [...experiencesList]; newE[index].date = e.target.value; setExperiencesList(newE);
                      }} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-primary)' }} />
                      
                      <input type="text" placeholder="Role (e.g. Developer)" value={exp.role} onChange={(e) => {
                        const newE = [...experiencesList]; newE[index].role = e.target.value; setExperiencesList(newE);
                      }} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-primary)' }} />
                      
                      <input type="text" placeholder="Company (e.g. BizDimension)" value={exp.company} onChange={(e) => {
                        const newE = [...experiencesList]; newE[index].company = e.target.value; setExperiencesList(newE);
                      }} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-primary)' }} />
                    </div>

                    <div style={{ marginBottom: '0.5rem' }}>
                      <textarea placeholder="Highlights (One sentence per line)..." rows="2" value={exp.highlightsText} onChange={(e) => {
                        const newE = [...experiencesList]; newE[index].highlightsText = e.target.value; setExperiencesList(newE);
                      }} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-primary)', fontFamily: 'inherit' }}></textarea>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <input type="text" placeholder="Highlight tags matching highlights (semicolon separated; e.g. React,SAP; Flutter,SQLite)" value={exp.highlightsTags} onChange={(e) => {
                        const newE = [...experiencesList]; newE[index].highlightsTags = e.target.value; setExperiencesList(newE);
                      }} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-primary)', fontSize: '0.8rem' }} />

                      <input type="text" placeholder="Overall tech tags (comma separated; e.g. React JS, Flutter, Node)" value={exp.tech} onChange={(e) => {
                        const newE = [...experiencesList]; newE[index].tech = e.target.value; setExperiencesList(newE);
                      }} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-primary)', fontSize: '0.8rem' }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Projects Section */}
              <div style={{ marginBottom: '1.5rem', border: '1px dashed var(--card-border)', padding: '1rem', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <label style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>Portfolio projects items</label>
                  <button type="button" onClick={addProj} className="btn" style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem', border: '1px solid var(--card-border)' }}>
                    + Add Project
                  </button>
                </div>
                {projectsList.map((proj, index) => (
                  <div key={index} style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '6px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--card-border)', position: 'relative' }}>
                    
                    <button type="button" onClick={() => removeProj(index)} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'transparent', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '1.2rem' }}>
                      &times;
                    </button>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <input type="text" placeholder="Project Title" value={proj.title} onChange={(e) => {
                        const newP = [...projectsList]; newP[index].title = e.target.value; setProjectsList(newP);
                      }} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-primary)', fontWeight: 'bold' }} />
                      
                      <input type="text" placeholder="Color Gradient" value={proj.color} onChange={(e) => {
                        const newP = [...projectsList]; newP[index].color = e.target.value; setProjectsList(newP);
                      }} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-primary)', fontSize: '0.85rem' }} />
                      
                      <input type="text" placeholder="Icon Emoji (e.g. ⚡)" value={proj.icon} onChange={(e) => {
                        const newP = [...projectsList]; newP[index].icon = e.target.value; setProjectsList(newP);
                      }} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-primary)', textAlign: 'center' }} />
                    </div>

                    <div style={{ marginBottom: '0.5rem' }}>
                      <input type="text" placeholder="Tech labels (comma separated; e.g. React JS, Node JS, SAP)" value={proj.tech} onChange={(e) => {
                        const newP = [...projectsList]; newP[index].tech = e.target.value; setProjectsList(newP);
                      }} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-primary)', fontSize: '0.85rem' }} />
                    </div>

                    <div>
                      <textarea placeholder="Project detailed description..." rows="2" value={proj.description} onChange={(e) => {
                        const newP = [...projectsList]; newP[index].description = e.target.value; setProjectsList(newP);
                      }} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.1)', color: 'var(--text-primary)', fontFamily: 'inherit' }}></textarea>
                    </div>
                  </div>
                ))}
              </div>

              {/* Feedbacks */}
              {formError && (
                <div style={{ padding: '1rem', background: 'rgba(255, 77, 77, 0.1)', border: '1px solid #ff4d4d', color: '#ff4d4d', borderRadius: '6px', marginBottom: '1.5rem', fontWeight: '600' }}>
                  {formError}
                </div>
              )}
              {formSuccess && (
                <div style={{ padding: '1rem', background: 'rgba(46, 204, 113, 0.1)', border: '1px solid #2ecc71', color: '#2ecc71', borderRadius: '6px', marginBottom: '1.5rem', fontWeight: '600' }}>
                  {formSuccess}
                </div>
              )}

              {/* Submit Buttons */}
              <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--card-border)', paddingTop: '1.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flexGrow: 1 }}>
                  {editingProfile === 'new' ? 'Create Profile' : 'Save Changes'}
                </button>
                <button type="button" onClick={() => setEditingProfile(null)} className="btn btn-secondary" style={{ flexGrow: 1 }}>
                  Cancel
                </button>
              </div>

            </form>
          </div>
        )}

        {/* Tab 2: Contact messages reader */}
        {activeTab === 'messages' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3>Contact Form Messages ({messages.length})</h3>
              <button 
                onClick={fetchMessages} 
                className="btn btn-secondary"
                disabled={messagesLoading}
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
              >
                {messagesLoading ? 'Loading...' : 'Refresh'}
              </button>
            </div>

            {messages.length === 0 ? (
              <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                {messagesLoading ? 'Loading inquiries...' : 'No contact form submissions received yet.'}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {messages.map((msg) => (
                  <div key={msg.id} className="card" style={{ padding: '1.5rem 2rem', position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>
                      <div>
                        <h4 style={{ margin: 0 }}>Subject: {msg.subject}</h4>
                        <p style={{ margin: '0.15rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                          From: <strong>{msg.name}</strong> (<code>{msg.email}</code>)
                        </p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                            For: {msg.recipientId}
                          </span>
                          <button
                            onClick={() => handleDeleteMessage(msg.id)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#ff4d4d',
                              cursor: 'pointer',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.2rem',
                              border: '1px solid rgba(255, 77, 77, 0.2)',
                              backgroundColor: 'rgba(255, 77, 77, 0.05)',
                              transition: 'all 0.2s ease'
                            }}
                            title="Delete Inquiry"
                          >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <p style={{
                      whiteSpace: 'pre-wrap',
                      margin: 0,
                      lineHeight: '1.6',
                      color: 'var(--text-primary)',
                      fontSize: '0.95rem'
                    }}>
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Style Settings */}
        {activeTab === 'style' && (
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.75rem' }}>
              Collective Hub Style Manager
            </h3>
            <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Customize the dashboard background preset, speed, particle size, and color themes. These settings are applied globally and instantly refresh the dashboard animation layer.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
              {/* Preset Selection */}
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  Background Style Preset
                </label>
                <select
                  value={stylePreset}
                  onChange={(e) => {
                    localStorage.setItem('dashboard_bg_preset', e.target.value);
                    setStylePreset(e.target.value);
                    window.dispatchEvent(new Event('dashboard-style-changed'));
                  }}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.8rem',
                    borderRadius: '6px',
                    border: '1px solid var(--card-border)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="cyber" style={{ background: '#222', color: '#fff' }}>Cyber Matrix (Full)</option>
                  <option value="orbs" style={{ background: '#222', color: '#fff' }}>Ambient Orbs (Orbs & Grid)</option>
                  <option value="mesh" style={{ background: '#222', color: '#fff' }}>Data Mesh (Particles & Grid)</option>
                  <option value="grid" style={{ background: '#222', color: '#fff' }}>Minimal Grid</option>
                  <option value="dark" style={{ background: '#222', color: '#fff' }}>Dark Space (Clean)</option>
                </select>
              </div>

              {/* Color Theme Selection */}
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  Dashboard Color Palette
                </label>
                <select
                  value={styleColorTheme}
                  onChange={(e) => {
                    localStorage.setItem('dashboard_color_theme', e.target.value);
                    setStyleColorTheme(e.target.value);
                    window.dispatchEvent(new Event('dashboard-style-changed'));
                  }}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.8rem',
                    borderRadius: '6px',
                    border: '1px solid var(--card-border)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="cyberpunk" style={{ background: '#222', color: '#fff' }}>Retro Cyberpunk (Purple & Cyan)</option>
                  <option value="forest" style={{ background: '#222', color: '#fff' }}>Neon Forest (Emerald & Green)</option>
                  <option value="solar" style={{ background: '#222', color: '#fff' }}>Solar Flares (Crimson & Amber)</option>
                  <option value="monochrome" style={{ background: '#222', color: '#fff' }}>Monochrome Code (Slate & Grey)</option>
                </select>
              </div>

              {/* Animation Speed Selection */}
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  Animation Speed
                </label>
                <select
                  value={styleAnimSpeed}
                  onChange={(e) => {
                    localStorage.setItem('dashboard_anim_speed', e.target.value);
                    setStyleAnimSpeed(e.target.value);
                    window.dispatchEvent(new Event('dashboard-style-changed'));
                  }}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.8rem',
                    borderRadius: '6px',
                    border: '1px solid var(--card-border)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="slow" style={{ background: '#222', color: '#fff' }}>Slow & Subtle</option>
                  <option value="active" style={{ background: '#222', color: '#fff' }}>Tech Active (Normal)</option>
                  <option value="hyper" style={{ background: '#222', color: '#fff' }}>Hyper Drive (Fast)</option>
                </select>
              </div>

              {/* Particle Size Selection */}
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  Particle Size Scale
                </label>
                <select
                  value={styleParticleSize}
                  onChange={(e) => {
                    localStorage.setItem('dashboard_particle_size', e.target.value);
                    setStyleParticleSize(e.target.value);
                    window.dispatchEvent(new Event('dashboard-style-changed'));
                  }}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.8rem',
                    borderRadius: '6px',
                    border: '1px solid var(--card-border)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="dust" style={{ background: '#222', color: '#fff' }}>Fine Dust</option>
                  <option value="nodes" style={{ background: '#222', color: '#fff' }}>Digital Nodes (Normal)</option>
                  <option value="rings" style={{ background: '#222', color: '#fff' }}>Glow Rings (Large)</option>
                </select>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Settings stored locally in browser storage.
              </span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
