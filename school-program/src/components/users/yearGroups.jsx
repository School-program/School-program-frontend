import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FooterNavigation from '../FooterNavigation';
import image from '../../images/image.jpg';
import star from '../../images/star.svg';


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
      background: 'linear-gradient(90deg, #6A0DAD, #A658E8)', // רקע סגול דינמי
      padding: '2px 8px', // ריווח בתוך התיבה
      borderRadius: '6px', // פינות מעוגלות
      textAlign: 'center',
      width: 'fit-content', // מתאימים את הרוחב לפי התוכן של הכותרת
      marginLeft: 'auto', // ממורכז אוטומטית
      marginRight: 'auto', // ממורכז אוטומטית
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // הוספת צל לכותרת
    },

    box: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '65%',
      backgroundColor: 'white',
      borderRadius: '24px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '12px',
      padding: '15px',
      border: '2px solid #7D3C98',
      background: 'linear-gradient(90deg,rgb(124, 61, 242), #A658E8,rgb(147, 77, 204) 33%, white 33%)', // שליש מלבן סגול ושלוש אחריו לבן
    },

    text: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#333', // ברירת מחדל לשחור
    },

    textPurple: {
      fontSize: '25px',
      fontWeight: 'bold',
      marginLeft: '12%',
      color: '#fff', // צבע לבן עבור הטקסט בחלק הסגול
      textShadow: '0 0 3px black, 0 0 5px black',
    },

    textWhite: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#000', // צבע שחור עבור הטקסט בחלק הלבן
    },

    Navigation: {
      paddingTop: '20px', // הורדת הנתיב מעט למטה
    },
    topStar: {
      position: 'absolute',
      top: '16%', // מיקום הכוכב מעל העיגול
      left: '38%',
      width: '80px', // גודל הכוכב
      height: '80px',

    },
  };



  return (
    <div style={styles.container}>
      <div style={styles.Navigation}><FooterNavigation /></div>
      <h2 style={styles.title}>שנתונים </h2>
      <div style={styles.boxOll}>
        {yearlyPoints.slice(0, 8).map((item, index) => (
          <div key={index} style={styles.box}>
            {index === 0 && <img src={star} alt="Top Star" style={styles.topStar} />} {/* הכוכב יופיע רק עבור המקום הראשון */}
            <span style={styles.textPurple}> {item.total_points}</span> {/* טקסט לבן עבור החלק הסגול */}
            <span style={styles.textWhite}> 'כיתות {convertClassNameToHebrew(item.year)} </span> {/* טקסט שחור עבור החלק הלבן */}
          </div>
        ))}
      </div>

    </div>
  );
};

export default YearlyPoints;
