import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#222',
    color: '#fff',
    padding: '2rem 1rem',
    textAlign: 'center',
    marginTop: 'auto',
  };

  const contactStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    alignItems: 'center',
    fontSize: '0.9rem',
    lineHeight: '1.5',
  };

  const hrStyle = {
    width: '60%',
    border: '0.5px solid #444',
    margin: '1rem auto',
  };

  return (
    <footer style={footerStyle}>
      <h3 style={{ marginBottom: '1rem', color: '#00ffd5' }}>Contact Us</h3>
      <div style={contactStyle}>
        <p>Email: <a href="mailto:support@foodcorner.com" style={{ color: '#00ffd5', textDecoration: 'none' }}>support@foodcorner.com</a></p>
        <p>Phone: +91-9876543210</p>
        <p>Address: 123, Main Street, Food City</p>
      </div>
      <hr style={hrStyle} />
      <p style={{ fontSize: '0.8rem', color: '#aaa' }}>© {new Date().getFullYear()} Food Corner. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
