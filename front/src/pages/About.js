import React from 'react';

const About = () => {
  return (
    <div style={styles.page}>
      <div style={styles.banner}>
        <h1 style={styles.bannerTitle}>Welcome to Food Corner 🍴</h1>
      </div>

      <div style={styles.content}>
        <h2 style={styles.heading}>Who We Are</h2>
        <p style={styles.text}>
          <strong>Food Corner</strong> is a vibrant destination for food lovers seeking flavor, freshness, and satisfaction. Whether you're in the mood for a traditional Indian thali or a quick snack, our kitchen is always buzzing with deliciousness.
        </p>

        <h2 style={styles.heading}>Our Promise</h2>
        <p style={styles.text}>
          We handcraft every meal with love using fresh, quality ingredients. We cater to both <strong>vegetarian</strong> and <strong>non-vegetarian</strong> tastes across breakfast, lunch, and dinner — ensuring you always find something to enjoy.
        </p>

        <h2 style={styles.heading}>Why Choose Us?</h2>
        <ul style={styles.list}>
          <li>✅ Freshly cooked meals daily</li>
          <li>✅ Veg & Non-Veg variety</li>
          <li>✅ Easy online ordering & fast delivery</li>
          <li>✅ Passionate chefs who love what they do</li>
        </ul>

        <p style={styles.signature}>With love, <br /><span style={{ color: '#ec4899' }}>The Food Corner Team ❤️</span></p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#1a202c',
    backgroundColor: '#fff',
    minHeight: '100vh',
  },
  banner: {
    backgroundImage: `url("https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1950&q=80")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
  },
  bannerTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
  },
  content: {
    maxWidth: '900px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#fefce8',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    animation: 'fadeIn 1s ease',
  },
  heading: {
    fontSize: '1.8rem',
    color: 'black',
    marginTop: '1.5rem',
    marginBottom: '0.5rem',
  },
  text: {
    fontSize: '1.1rem',
    lineHeight: 1.6,
    marginBottom: '1rem',
  },
  list: {
    listStyleType: 'none',
    paddingLeft: '0',
    fontSize: '1.05rem',
    lineHeight: 1.8,
    marginBottom: '2rem',
  },
  signature: {
    fontSize: '1.1rem',
    textAlign: 'right',
    marginTop: '2rem',
    fontStyle: 'italic',
  },
};

export default About;
