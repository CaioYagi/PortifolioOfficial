import React, { useState } from 'react';
import styles from '../styles/Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setSubmitStatus(''), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Contact</h2>
          <p className={styles.subtitle}>
            I'm open to new opportunities and collaborations. Feel free to reach out!
          </p>
          <div className={styles.titleUnderline}></div>
        </div>

        <div className={styles.content}>
          {/* Contact Info */}
          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Email</span>
              <a href="mailto:caioyagi@gmail.com" className={styles.link}>
                caioyag@gmail.com
              </a>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.label}>Location</span>
              <span className={styles.text}>Salto, São Paulo, Brazil</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.label}>LinkedIn</span>
              <a 
                href="https://www.linkedin.com/in/caio-hiroki-yagi/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.link}
              >
                Connect with me
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                  placeholder="Name"
                />
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                  placeholder="Email"
                />
              </div>

              <div className={styles.inputGroup}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className={styles.textarea}
                  placeholder="Message"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>

              {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                  Message sent successfully
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;