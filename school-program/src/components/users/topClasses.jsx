import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FooterNavigation from '../FooterNavigation';
import image from '../../images/image1.png';
import star from '../../images/star.svg';

const TopClasses = () => {
  const [topClasses, setTopClasses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3005/classes/top-three')
      .then(response => setTopClasses(response.data))
      .catch(error => console.error('Error fetching top classes:', error));
  }, []);

  const convertClassNameToHebrew = (className) => {
    const letterMap = {
      A: 'א', B: 'ב', C: 'ג', D: 'ד', E: 'ה', F: 'ו', G: 'ז', H: 'ח'
    };
    
    const [letter, number] = className.split('');
    const hebrewLetter = letterMap[letter] || letter;
    return `${hebrewLetter}'${number}`;
  };
  
  const displayClasses = topClasses.slice(0, 3);

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      position: 'relative',
    },
    navigation: {
      position: 'absolute',
      top: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      textAlign: 'center',
      padding: '10px 0',
      backgroundColor: 'transparent',
      paddingTop: '20px',
    },
    titleContainer: {
      fontSize: '30px',
      fontWeight: 'bold',
      color: '#fff',
      backgroundColor: '#7D3C98',
      padding: '2px 8px',
      borderRadius: '6px',
      textAlign: 'center',
      marginBottom: '5px',
      marginTop: '0',
      position: 'absolute',
      top: '105px',
      zIndex: '2',
    },
    contentBox: {
      borderRadius: '20px',
      padding: '20px 30px 120px 30px',
      marginTop: '95px',
      width: '80%',
      maxWidth: '1200px',
    },
    classesContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '40px',
      marginTop: '50px',
    },
    classBox: {
      width: '180px',
      height: '220px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
    },
    outerCircle: {
      width: '180px',
      height: '180px',
      borderRadius: '50%',
      position: 'absolute',
      background: '#7D3C98',
      boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.25) inset',
    },
    innerCircle: {
      width: '160px',
      height: '160px',
      borderRadius: '50%',
      background: 'black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontSize: '60px',
      fontWeight: 'bold',
      position: 'relative',
      zIndex: 1,
    },
    pointsBox: {
      marginTop: '180px',
      background: '#7D3C98',
      borderRadius: '16px',
      padding: '4px 16px',
      minWidth: '120px',
      textAlign: 'center',
      color: 'white',
      fontSize: '27px',
      position: 'absolute',
      fontWeight: 'bold',
    },
    topStar: {
      position: 'absolute',
      top: '-35px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90px',
      height: '90px',
      zIndex: 2,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.navigation}>
        <FooterNavigation />
      </div>
      
      <div style={styles.titleContainer}>כיתות מובילות</div>
      
      <div style={styles.contentBox}>
        <div style={styles.classesContainer}>
          {displayClasses.map((classItem, index) => (
            <div key={index} style={styles.classBox}>
              {index === 0 && <img src={star} alt="Top Star" style={styles.topStar} />}
              <div style={styles.outerCircle}></div>
              <div style={styles.innerCircle}>{convertClassNameToHebrew(classItem.class_name)}</div>
              <div style={styles.pointsBox}>{classItem.total_points} נקודות</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopClasses;