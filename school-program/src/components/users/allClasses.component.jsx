import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FooterNavigation from '../FooterNavigation'; // ייבוא הקומפוננטה החדשה

const AllClasses = () => {
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

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
      margin: '20px',
      paddingTop: '45px',
      paddingRight: '100px',
      paddingLeft: '100px',
      flexDirection: 'column',
    },
    columnContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      width: '20%',
    },
    classBox: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
      padding: '10px',
    },
    classInfo: {
      flex: 1,
      textAlign: 'center',
    },
    classPoints: {
      flex: 1,
      textAlign: 'center',
      borderRight: '1px solid #ccc',

    },
    classText: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.columnContainer}>
        {columns.map((column, colIndex) => (
          <div key={colIndex} style={styles.column}>
            {column.map((classItem, index) => (
              <div key={index} style={styles.classBox}>
                <div style={styles.classInfo}>
                  <p style={styles.classText}>{classItem.class_name}</p>
                </div>
                <div style={styles.classPoints}>
                  <p style={styles.classText}>{classItem.total_points}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* זימון הקומפוננטה החדשה */}
      

      <div style={{ paddingTop: '70px' }}>
  <FooterNavigation />
</div>
      </div>
  );
};

export default AllClasses;
