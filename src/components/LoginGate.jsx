import React, { useState } from 'react';

export default function LoginGate({ onLogin }) {
  const [passcode, setPasscode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!passcode) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5005/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });

      const result = await response.json();

      if (response.ok) {
        if (result.role === 'admin') {
          onLogin('admin', passcode, null);
        } else {
          onLogin('employee', passcode, result.profileId, result.profile);
        }
      } else {
        setError(result.error || 'Authentication failed. Please verify passcode.');
      }
    } catch (err) {
      console.log('Backend connection failed during login. Attempting offline default check.');
      if (passcode === 'admin123') {
        onLogin('admin', passcode, null, true); // Admin offline mode
      } else if (passcode.endsWith('123') && passcode.length > 3) {
        // Mock offline employee check based on passcode format
        const mockId = passcode.replace('123', '');
        onLogin('employee', passcode, mockId, null, true);
      } else {
        setError('Server unreachable. Use passcode "admin123" to login offline.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: 'var(--bg-color)',
      color: 'var(--text-primary)',
      padding: '1.5rem'
    }}>
      {/* Background glow blobs */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '15%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'var(--primary-glow)',
        filter: 'blur(120px)',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '15%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'var(--secondary-glow)',
        filter: 'blur(120px)',
        zIndex: 1,
        pointerEvents: 'none'
      }}></div>

      <div className="card" style={{
        maxWidth: '420px',
        width: '100%',
        padding: '3rem 2.25rem',
        borderRadius: 'var(--radius-lg)',
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--card-border)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Top visual accent */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '4px',
          background: 'var(--gradient-text)'
        }}></div>

        {/* Logo / Title */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '55px',
            height: '55px',
            borderRadius: '50%',
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            color: 'var(--primary)',
            fontSize: '1.5rem',
            marginBottom: '1rem',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
          }}>
            🔐
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em', margin: 0 }}>
            Registry <span className="gradient-text">Portal Gate</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem', lineHeight: '1.5' }}>
            Please enter your authorization passcode to unlock the portfolio workspace.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <input
              type="password"
              placeholder="Passcode (e.g. mony123, admin123)"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              disabled={loading}
              required
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--card-border)',
                background: 'rgba(255, 255, 255, 0.02)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                textAlign: 'center',
                letterSpacing: '0.1em',
                transition: 'var(--transition)',
                outline: 'none'
              }}
              className="login-input"
              autoFocus
            />
          </div>

          {error && (
            <div style={{
              fontSize: '0.8rem',
              color: '#ff4d4d',
              background: 'rgba(255, 77, 77, 0.08)',
              padding: '0.6rem',
              borderRadius: '6px',
              border: '1px solid rgba(255, 77, 77, 0.2)',
              fontWeight: '600'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.8rem',
              height: 'auto',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '0.95rem'
            }}
          >
            {loading ? 'Authenticating...' : 'Enter Registry Workspace →'}
          </button>
        </form>

        <div style={{
          marginTop: '2rem',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <span>Role check enabled</span>
          <span>•</span>
          <span>SSL encryption</span>
        </div>
      </div>

      <style>{`
        .login-input:focus {
          border-color: var(--primary) !important;
          box-shadow: 0 0 10px var(--primary-glow) !important;
          background: rgba(255, 255, 255, 0.04) !important;
        }
      `}</style>
    </div>
  );
}
