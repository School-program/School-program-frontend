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
      .join("'");
  };
  
  const displayClasses = topClasses.slice(0, 3);

  return (
    <div style={styles.container}>
        <div style={styles.Navigation}><FooterNavigation /></div>    

      {/* כותרת */}
      <h2 style={styles.title}>כיתות מובילות</h2>
      
      {/* התצוגה של הכיתות */}
      <div style={styles.classesContainer}>
      {displayClasses.map((classItem, index) => (
  <div key={index} style={styles.classCircle}>
    {index === 0 && <img src={star} alt="Top Star" style={styles.topStar} />} {/* הכוכב יופיע רק עבור המקום הראשון */}
    <div style={styles.classInfo}>
      <p style={styles.classText}>{convertClassNameToHebrew(classItem.class_name)}</p>
      <p style={styles.classPoints}>{classItem.total_points} נקודות</p>
    </div>
  </div>
))}

      </div>
      
      {/* תפריט תחתון */}
      <div style={{ paddingTop: '50px' }}>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  },
  active: {
    fontWeight: 'bold',
    color: '#7D3C98',
  },
  Navigation:{
    paddingTop: '20px', // הורדת הנתיב מעט למטה

  },

  title: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#fff', // צבע טקסט לבן
    backgroundColor: '#7D3C98', // רקע סגול
    padding: '2px 8px', // ריווח בתוך התיבה
    borderRadius: '6px', // פינות מעוגלות
    textAlign: 'center',
    marginBottom: '20px',
    // paddingTop: '10px', 
    marginTop: '60px',
  },

  classesContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px', // הגדלת המרווחים בין העיגולים
    width: '100%',
    marginTop: '150px', // הורדת העיגולים כלפי מטה
  },
  classCircle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '180px', // הגדלת העיגולים
    height: '180px', // הגדלת העיגולים
    borderRadius: '50%',
    backgroundColor: '#000',
    color: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    border: '7px solid #7D3C98',
    position: 'relative', // הוספת position relative
  },
  classInfo: {
    textAlign: 'center',
  },
  classText: {
    fontSize: '60px', // הגדלת הטקסט בתוך העיגול
    fontWeight: 'bold',
  },
  classPoints: {
    fontSize: '25px',
    backgroundColor: '#7D3C98',
    borderRadius: '10px',
    padding: '4px 11px',
    color: '#fff',
    fontWeight: 'bold',
    position: 'absolute',
    marginTop:'15px',
    transform: 'translate(-19%, -0.5%)', 
  },
  topStar: {
    position: 'absolute',
    top: '-50px', // מיקום הכוכב מעל העיגול
    left: '50%',
    transform: 'translateX(-50%)', // ממרכז את הכוכב אופקית
    width: '90px', // גודל הכוכב
    height: '90px',
    // filter: 'drop-shadow(0px 0px 5px gold)', // אפקט זוהר זהוב
  },
  
};


export default TopClasses;
