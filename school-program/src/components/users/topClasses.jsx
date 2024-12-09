import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FooterNavigation from '../FooterNavigation';

const TopClasses = () => {
  const [topClasses, setTopClasses] = useState([]);

  // קריאה ל-API להצגת 3 הכיתות המובילות
  useEffect(() => {
    axios.get('http://localhost:3005/classes/top-three')
      .then(response => setTopClasses(response.data))
      .catch(error => console.error('Error fetching top classes:', error));
  }, []);

  // אם יש פחות משלוש כיתות, נחזיר ריבועים ריקים
  const displayClasses = topClasses.slice(0, 3);

  return (
    <div style={styles.container}>
      <div style={styles.mainClassBox}>
        {displayClasses[0] && (
          <div style={styles.classBoxLarge}>
            <div style={styles.classInfo}>
              <p style={styles.classText}>{displayClasses[0].class_name}</p>
              <p style={styles.classPoints}>{displayClasses[0].total_points}</p>
            </div>
          </div>
        )}
      </div>
      <div style={styles.secondaryClassesContainer}>
        {displayClasses.slice(1).map((classItem, index) => (
          <div key={index} style={styles.classBoxSmall}>
            <div style={styles.classInfo}>
              <p style={styles.classText}>{classItem.class_name}</p>
              <p style={styles.classPoints}>{classItem.total_points}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ paddingTop: '300px' }}>
  <FooterNavigation />
</div>    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px',
  },
  mainClassBox: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '20px', // מרווח בין הריבועים
  },
  classBoxLarge: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '60%', // הריבוע המרכזי יותר רחב
    textAlign: 'center',
  },
  secondaryClassesContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  classBoxSmall: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '15px',
    width: '40%', // הריבועים הקטנים יותר צריכים להיות קטנים
    textAlign: 'center',
  },
  classInfo: {
    flex: 1,
    textAlign: 'center',
  },
  classText: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
  },
  classPoints: {
    fontSize: '18px',
    color: '#3498db',
  },
};

export default TopClasses;
