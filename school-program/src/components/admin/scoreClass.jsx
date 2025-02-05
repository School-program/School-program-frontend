import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Popup from "./popup";

function Classes() {
  const { year } = useParams();
  const classes = [`${year}1`, `${year}2`, `${year}3`, `${year}4`, `${year}5`];
  const [selectedClass, setSelectedClass] = useState(null);
  const [completedClasses, setCompletedClasses] = useState({});

  useEffect(() => {
    const updatedClasses = {};
    const currentDate = new Date().toLocaleDateString("en-CA"); // התאריך המקומי

    // בודק את ה-localStorage לכל כיתה ומעדכן את הצבע
    classes.forEach((className) => {
      const storedData = localStorage.getItem(className);
      if (storedData) {
        const { date } = JSON.parse(storedData);
        // אם התאריך ב-localStorage שונה מהתאריך הנוכחי, יש להפסיק להציג את הצבע
        updatedClasses[className] = date === currentDate; 
      }
    });
    
    setCompletedClasses(updatedClasses);
  }, [classes]); // שינוי בכל שינוי ב-classes

  const handleClassClick = (className) => {
    setSelectedClass(className);
  };

  const closePopup = () => {
    setSelectedClass(null);
  };

  return (
    <div style={styles.container}>
      <h2>כיתות לשנתון {year}</h2>
      <div style={styles.classesContainer}>
        {classes.map((className) => (
          <div
            key={className}
            style={{
              ...styles.box,
              backgroundColor: completedClasses[className] ? "#4CAF50" : "#2196F3", // צבע ירוק אם כבר הוספו נקודות
            }}
            onClick={() => handleClassClick(className)}
          >
            {className}
          </div>
        ))}
      </div>
      {selectedClass && <Popup className={selectedClass} onClose={closePopup} />}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  classesContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    justifyContent: "center",
  },
  box: {
    width: "100px",
    height: "100px",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default Classes;
