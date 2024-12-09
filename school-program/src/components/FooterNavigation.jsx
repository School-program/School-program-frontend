import React from 'react';
import { Link } from 'react-router-dom';

const FooterNavigation = () => {
  const styles = {
    navigation: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
    navLink: {
      margin: '0 15px',
      textDecoration: 'none',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#3498db', 
    },
  };

  return (
    <div style={styles.navigation}>
      <Link to="/" style={styles.navLink}>דף הבית</Link>
      <Link to="/all-classes" style={styles.navLink}>כל הכיתות</Link>
      <Link to="/top-classes" style={styles.navLink}>כיתות מובילות</Link>
      <Link to="/year-groups" style={styles.navLink}>שנתונים</Link>
    </div>
  );
};

export default FooterNavigation;
