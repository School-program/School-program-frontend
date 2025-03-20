import React from 'react';
import { Link } from 'react-router-dom';

const FooterNavigation = () => {
  const styles = {
    navigation: {
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
    navLink: {
      fontFamily: 'Arial, sans-serif',
      margin: '0 15px',
      textDecoration: 'none',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#000', 
    },
  };

  return (
    <div style={styles.navigation}>
      <Link to="/" style={styles.navLink}>דף הבית</Link>
      <Link to="/all-classes" style={styles.navLink}>כל הכיתות</Link>
      <Link to="/top-classes" style={styles.navLink}>כיתות מובילות</Link>
      <Link to="/year-groups" style={styles.navLink}>שנתונים</Link>
      <Link to="/present-data" style={styles.navLink}>נתונים</Link>
      <Link to="/score" style={styles.navLink}>ניקוד</Link>

    </div>
  );
};

export default FooterNavigation;
