import React, { useState, useEffect } from "react";
import Popup from "./popup";

function ClassesView({ year }) {
  const [classesData, setClassesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  
  const convertClassNameToHebrew = (className) => {
    const letterMap = {
      A: 'א', B: 'ב', C: 'ג', D: 'ד', E: 'ה', F: 'ו', G: 'ז', H: 'ח'
    };
    const [letter, number] = className.split('');
    const hebrewLetter = letterMap[letter] || letter;
    return `${hebrewLetter}'${number}`;
  };
  const convertClassName = (className) => {
    const letterMap = {
      A: 'א', B: 'ב', C: 'ג', D: 'ד', E: 'ה', F: 'ו', G: 'ז', H: 'ח'
    };
    const [letter] = className.split('');
    const hebrewLetter = letterMap[letter] || letter;
    return `${hebrewLetter}`;
  };
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:3005/classes/by-year/${year.toUpperCase()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response not OK");
        }
        return response.json();
      })
      .then((data) => {
        // כאן תוכל להוסיף לוגיקה כדי לשדרג את הנתונים אם יש צורך
        // לדוגמה, אם אתה מקבל את הנקודות ממקום אחר, תוכל לשלב אותם פה
        setClassesData(data);  // עדכון עם הנתונים שהתקבלו
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching classes:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [year]);

  const handleClassClick = (className) => {
    setSelectedClass(className);
  };

  const closePopup = () => {
    setSelectedClass(null);
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      textAlign: "center",
      width: "95%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      marginTop: "5%"
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      marginTop: "20px",
    },
    circlesContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      maxWidth: "650px",
      marginTop: '6%'
    },
    topRow: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: "30px",
    },
    bottomRow: {
      display: "flex",
      justifyContent: "space-around",
      width: "75%",
    },
    classBox: {
      width: "140px",
      height: "180px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
      margin: "0 10px",
    },
    outerCircle: {
      width: "135px",
      height: "135px",
      borderRadius: "50%",
      position: "absolute",
      background: "#7D3C98",
      boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.25) inset",
      cursor: "pointer",
    },
    innerCircle: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      background: "black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontSize: "28px",
      fontWeight: "bold",
      position: "relative",
      cursor: "pointer",
    },
    pointsBox: {
      marginTop: "140px",
      background: "#7D3C98",
      borderRadius: "12px",
      padding: "4px 12px",
      minWidth: "80px",
      textAlign: "center",
      color: "white",
      fontSize: "18px",
      position: "absolute",
      fontWeight: "bold",
    },
    starIcon: {
      position: "absolute",
      top: "-10px",
      right: "-10px",
      color: "#FFD700",
      fontSize: "24px",
      zIndex: "2",
    }
  };

  if (loading) {
    return <div style={styles.container}>טוען נתונים...</div>;
  }

  if (error) {
    return <div style={styles.container}>שגיאה בטעינת נתונים: {error}</div>;
  }

  const firstRow = classesData.slice(0, 3);
  const secondRow = classesData.slice(3);

  const renderCircle = (cls) => {
    console.log(cls);
    
    const isHighPoints = cls.points >= 100;  // בדיקה אם יש הרבה נקודות
    
    return (
      <div key={cls.class_id} style={styles.classBox}>
        <div 
          style={styles.outerCircle} 
          onClick={() => handleClassClick(cls.class_name)}
        ></div>
        <div 
          style={styles.innerCircle}
          onClick={() => handleClassClick(cls.class_name)}
        >
          {convertClassNameToHebrew(cls.class_name)}
        </div>
        <div style={styles.pointsBox}>
          {cls.total_points} נקודות
        </div>
        
        {isHighPoints && (
          <div style={styles.starIcon}>★</div>
        )}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>כיתות {convertClassName(year)}'</h2>
      
      <div style={styles.circlesContainer}>
        <div style={styles.topRow}>
          {firstRow.map(cls => renderCircle(cls))}
        </div>
        
        <div style={styles.bottomRow}>
          {secondRow.map(cls => renderCircle(cls))}
        </div>
      </div>
      
      {selectedClass && <Popup className={selectedClass} onClose={closePopup} />}
    </div>
  );
}

export default ClassesView;
