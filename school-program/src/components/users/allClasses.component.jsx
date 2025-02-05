import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FooterNavigation from '../FooterNavigation'; // ייבוא הקומפוננטה החדשה
import image from '../../images/image.jpg';

const AllClasses = () => {
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

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
  
    const [letter, number] = className.split(''); // מפריד את האות והמספר
    const hebrewLetter = letterMap[letter] || letter; // ממיר לאות בעברית או מחזיר את המקור
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

  const splitIntoColumns = (data) => {
    const columns = [[], [], [], []];
    const columnCount = columns.length;
    const rows = Math.ceil(data.length / columnCount);

    for (let i = 0; i < data.length; i++) {
      const columnIndex = Math.floor(i / rows);
      columns[columnIndex].push(data[i]);
    }

    return columns;
  };

  const columns = splitIntoColumns(currentClasses);

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      paddingRight: '50px',  // הקטנה של הריווח
      paddingLeft: '50px',   // הקטנה של הריווח
      flexDirection: 'column',
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
    },
    columnContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: '95%',
      justifyContent: 'space-between',
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      width: '22%', // הקטנה של הרוחב של כל עמודה
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '25px', // הקטנה של הריווח
      borderRadius: '10px',
      backgroundColor: 'white', // צבע לבן
      width: '70%', // צמצום הרוחב של הריבוע הלבן
      marginLeft: '23.8%', 
    },
    classBox: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#D0F7FF', // רקע שחור
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '18px', // הקטנה של הריווח בין המלבנים
      padding: '5px', // הקטנה של הריווח בתוך המלבן
      border: '5px solid purple', // גבול סגול סביב כל מלבן
    },
    classInfo: {
      flex: 1,
      textAlign: 'center',
    },
    classPoints: {
      flex: 1,
      textAlign: 'center',
      borderRight: '3px solid purple',
    },
    classText: {
      fontSize: '24px',  // הקטנה של הגודל של הכיתוב
      fontWeight: 'bold',
      color: 'purple', // צבע לבן לכיתוב
    },
  };
  return (
    <div style={styles.container}>
      {/* הניתוב נמצא עכשיו למעלה */}
      <div style={{ paddingBottom: '20px' }}>
        <FooterNavigation />
      </div>
  
      {/* המלבן הלבן הגדול שמקיף את כל המלבנים */}
      <div style={styles.wrapper}>
        <div style={styles.columnContainer}>
          {columns.map((column, colIndex) => (
            <div key={colIndex} style={styles.column}>
              {column.map((classItem, index) => (
                <div key={index} style={styles.classBox}>
                  {/* עדכון סדר האלמנטים */}
                  <div style={styles.classPoints}>
                    <p style={styles.classText}>{classItem.total_points}</p>
                  </div>
                  <div style={styles.classInfo}>
                    <p style={styles.classText}>
                      {convertClassNameToHebrew(classItem.class_name)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  
};


export default AllClasses;
