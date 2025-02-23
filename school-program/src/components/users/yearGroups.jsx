import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FooterNavigation from '../FooterNavigation';
import image from '../../images/image.jpg';

const YearlyPoints = () => {
  const [yearlyPoints, setYearlyPoints] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3005/classes/yearly-points')
      .then(response => setYearlyPoints(response.data))
      .catch(error => console.error('Error fetching yearly points:', error));
  }, []);

  // פונקציה להמרת אותיות באנגלית לאותיות בעברית
  const convertClassNameToHebrew = (className) => {
    const letterMap = {
      A: 'א',
      B: 'ב',
      C: 'ג',
      D: 'ד',
      E: 'ה',
      F: 'ו',
      G: 'ז',
      H: 'ח'
    };

    return className
      .split('')
      .map(letter => letterMap[letter] || letter)
      .join("");
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
    },
    boxOll: {
      marginLeft: '38%',
    },
    title: {
      fontSize: '30px',
      fontWeight: 'bold',
      color: '#fff', // צבע טקסט לבן
      backgroundColor: '#7D3C98', // רקע סגול
      padding: '2px 8px', // ריווח בתוך התיבה
      borderRadius: '6px', // פינות מעוגלות
      textAlign: 'center',
      marginTop: '2%',
      width: 'fit-content', // מתאימים את הרוחב לפי התוכן של הכותרת
      marginLeft: 'auto', // ממורכז אוטומטית
      marginRight: 'auto', // ממורכז אוטומטית
    },
    
    box: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '80%',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '15px',
      padding: '15px',
    },
    text: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#333',
    },
    Navigation:{
      paddingTop: '20px', // הורדת הנתיב מעט למטה
  
    },
  
  };

  return (
    <div style={styles.container}>
        <div style={styles.Navigation}><FooterNavigation /></div>   
        <h2 style={styles.title}>שנתונים </h2> 
        <div style={styles.boxOll}>
        {yearlyPoints.slice(0, 8).map((item, index) => (
          <div key={index} style={styles.box}>
            <span style={styles.text}> {item.total_points}</span>
            <span style={styles.text}> 'כיתות {convertClassNameToHebrew(item.year)} </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YearlyPoints;
