import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FooterNavigation from '../FooterNavigation';
import image from '../../images/image1.png';

const AllClasses = () => {
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const convertClassNameToHebrew = (className) => {
    const letterMap = {
      A: 'א', B: 'ב', C: 'ג', D: 'ד', E: 'ה', F: 'ו', G: 'ז', H: 'ח'
    };
    const [letter, number] = className.split('');
    const hebrewLetter = letterMap[letter] || letter;
    return `${hebrewLetter}'- ${number}`;
  };

  useEffect(() => {
    axios.get('http://localhost:3005/classes')
      .then(response => setClasses(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage(prevPage => (prevPage + 1) % Math.ceil(classes.length / 20));
    }, 20000);
    return () => clearInterval(interval);
  }, [classes.length]);

  const startIndex = currentPage * 20;
  const endIndex = startIndex + 20;
  const currentClasses = classes.slice(startIndex, endIndex);

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
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
      paddingTop: '20px', // הורדת הנתיב מעט למטה

    },
    titleContainer: {
      fontSize: '30px',
      fontWeight: 'bold',
      color: '#fff', // צבע טקסט לבן
      backgroundColor: '#7D3C98', // רקע סגול
      padding: '2px 8px', // ריווח בתוך התיבה
      borderRadius: '6px', // פינות מעוגלות
      textAlign: 'center',
      marginBottom: '20px',
      marginTop: '60px',
    },
    columnContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '15px',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      maxWidth: '800px',
    },
    classBox: {
      width: '90px',
      height: '120px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
    },
    outerCircle: {
      width: '85px',
      height: '85px',
      borderRadius: '50%',
      position: 'absolute',
      background: 'conic-gradient(from 180deg at 0.00% 100.00%, #285AC7 3deg, #A6BCFF 113deg, #C28AD4 207deg, #782DAA 349deg)',
      boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.25) inset',
    },
    innerCircle: {
      width: '75px',
      height: '75px',
      borderRadius: '50%',
      background: 'black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontSize: '26px',
      fontWeight: 'bold',
      position: 'relative',
      zIndex: 1,
    },
    pointsBox: {
      marginTop: '90px',
      background: '#782DAA',
      borderRadius: '16px',
      padding: '4px 8px',
      textAlign: 'center',
      color: 'white',
      fontSize: '18px',
      position: 'absolute',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.navigation}>
        <FooterNavigation />
      </div>
      <div style={styles.titleContainer}>כל הכיתות</div>
      <div style={styles.columnContainer}>
        {currentClasses.map((classItem, index) => (
          <div key={index} style={styles.classBox}>
            <div style={styles.outerCircle}></div>
            <div style={styles.innerCircle}>{convertClassNameToHebrew(classItem.class_name)}</div>
            <div style={styles.pointsBox}>{classItem.total_points} נקודות</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
