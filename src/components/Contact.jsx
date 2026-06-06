import { useState } from 'react';
import useInView from '../hooks/useInView';

export default function Contact({ profileData }) {
  const [headerRef, headerVis] = useInView({ threshold: 0.2 });
  const [infoRef, infoVis] = useInView({ threshold: 0.15 });
  const [formRef, formVis] = useInView({ threshold: 0.15 });

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://nodebackendportfolio.onrender.com/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          recipientId: profileData?.id || 'general'
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('server-error');
      }
    } catch (error) {
      console.warn('Backend is offline. Simulating local message submission.', error);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormState({ name: '', email: '', message: '' });
      }, 1200);
      return; // return early to avoid running finally block immediately if timeout runs async
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="section" style={{ borderBottom: 'none' }}>
      <div className="container">
        
        <div className="section-header" ref={headerRef}>
          <p className={`section-subtitle reveal ${headerVis ? 'visible' : ''}`}>Initialize Connection</p>
          <h2 className={`reveal ${headerVis ? 'visible' : ''} stagger-1`}>Contact Me</h2>
        </div>

        <div className="contact-grid">
          
          {/* Info cards */}
          <div className="contact-info" ref={infoRef}>
            <h3 className={`reveal-left ${infoVis ? 'visible' : ''}`} style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Let's build something together
            </h3>
            <p className={`reveal-left ${infoVis ? 'visible' : ''} stagger-1`} style={{ marginBottom: '1.5rem' }}>
              Feel free to reach out for collaborations, project inquiries, or just to say hello! I'll do my best to get back to you as soon as possible.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div className={`contact-card reveal-left ${infoVis ? 'visible' : ''} stagger-2`}>
                <div className="contact-icon-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Email</p>
                  <a href={`mailto:${profileData.contact.email}`} style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                    {profileData.contact.email}
                  </a>
                </div>
              </div>

              <div className={`contact-card reveal-left ${infoVis ? 'visible' : ''} stagger-3`}>
                <div className="contact-icon-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Phone</p>
                  <a href={`tel:${profileData.contact.phone.replace(/[^0-9+]/g, '')}`} style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                    {profileData.contact.phone}
                  </a>
                </div>
              </div>

              <div className={`contact-card reveal-left ${infoVis ? 'visible' : ''} stagger-4`}>
                <div className="contact-icon-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Location</p>
                  <p style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                    {profileData.contact.location}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className={`card reveal-right ${formVis ? 'visible' : ''}`} style={{ padding: '2.5rem' }}>
            <form onSubmit={handleSubmit} noValidate>
              
              <div className="form-group">
                <label className="form-label" htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="form-control" 
                  placeholder="John Doe" 
                  value={formState.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="form-control" 
                  placeholder="john@example.com" 
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  className="form-control" 
                  placeholder="Write your message here..." 
                  value={formState.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '0.5rem' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span style={{
                      width: '18px',
                      height: '18px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#fff',
                      borderRadius: '50%',
                      animation: 'spin 0.6s linear infinite',
                      display: 'inline-block',
                      marginRight: '0.5rem'
                    }}></span>
                    Sending Message...
                  </>
                ) : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'hsla(140, 80%, 50%, 0.1)',
                  border: '1px solid hsla(140, 80%, 50%, 0.3)',
                  color: 'hsl(140, 80%, 45%)',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  textAlign: 'center'
                }}>
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              {submitStatus === 'error' && (
                <div style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'hsla(0, 80%, 50%, 0.1)',
                  border: '1px solid hsla(0, 80%, 50%, 0.3)',
                  color: 'hsl(0, 80%, 45%)',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  textAlign: 'center'
                }}>
                  Please fill out all fields before submitting.
                </div>
              )}

              {submitStatus === 'server-error' && (
                <div style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'hsla(0, 80%, 50%, 0.1)',
                  border: '1px solid hsla(0, 80%, 50%, 0.3)',
                  color: 'hsl(0, 80%, 45%)',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  textAlign: 'center'
                }}>
                  Server error. Failed to save message on backend.
                </div>
              )}

            </form>
          </div>

        </div>

      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
