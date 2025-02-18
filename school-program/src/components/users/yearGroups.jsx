import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FooterNavigation from '../FooterNavigation';

const YearlyPoints = () => {
  const [yearlyPoints, setYearlyPoints] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3005/classes/yearly-points')
      .then(response => setYearlyPoints(response.data))
      .catch(error => console.error('Error fetching yearly points:', error));
  }, []);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '20px',
    },
    box: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '60%',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '15px',
      padding: '15px',
    },
    text: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
    },
  };

  return (
    <div style={styles.container}>
        <FooterNavigation />
      {yearlyPoints.slice(0, 8).map((item, index) => (
        <div key={index} style={styles.box}>
          <span style={styles.text}>{item.year}</span>
          <span style={styles.text}>{item.total_points}</span>
        </div>
      ))}
   <div style={{ paddingTop: '70px' }}>
</div>
    </div>
  );
};

export default YearlyPoints;
