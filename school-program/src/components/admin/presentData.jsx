import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import FooterNavigation from '../FooterNavigationAdmin';



const DailyDataTable = () => {
  const [dailyData, setDailyData] = useState([]);
  const [classFilter, setClassFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setNoResults(false);
    setDailyData([]);

    try {
      let url = 'http://localhost:3005/dailydata';

      if (classFilter && dateFilter) {
        url = `http://localhost:3005/dailydata/byClassAndDate/${classFilter}/${dateFilter}`;
      } else if (classFilter) {
        url = `http://localhost:3005/dailydata/byClass/${classFilter}`;
      } else if (dateFilter) {
        url = `http://localhost:3005/dailydata/byDate/${dateFilter}`;
      }
      
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await axios.get(url, {
        headers: {
          authorization: token,
        },
      });
      
      if (response.data.length === 0) {
        setNoResults(true);
      } else {
        setDailyData(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [classFilter, dateFilter]);

  // פונקציה להמרת מספר כיתה לפורמט א-1
  const formatClassId = (classId) => {
    // הנחה שמספר הכיתה הוא מספר סידורי כפי שביקשת
    const grade = Math.ceil(classId / 5);
    const classNum = ((classId - 1) % 5) + 1;
    
    // המרת המספר לאות בעברית (א, ב, וכו')
    const gradeLetter = String.fromCharCode(1488 + grade - 1);
    
    return `${gradeLetter}-${classNum}`;
  };



  return (
    <div style={styles.container}>
      <div style={styles.Navigation}><FooterNavigation /></div>

      <h1 style={styles.title}>נתונים</h1>
      
      <div style={styles.filterBox}>
        <div style={styles.filterItem}>
          <label htmlFor="classFilter" style={styles.filterLabel}>בחר כיתה:</label>
          <select
            id="classFilter"
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            style={styles.select}
          >
            <option value="">כל הכיתות</option>
            {Array.from({ length: 8 }, (_, grade) => 
              Array.from({ length: 5 }, (_, i) => {
                const gradeLetter = String.fromCharCode(1488 + grade);
                const className = `${gradeLetter}${i + 1}`;
                const serialNumber = grade * 5 + i + 1;
                return (
                  <option key={className} value={serialNumber}>
                    {`כיתה ${className}`}
                  </option>
                );
              })
            )}
          </select>
        </div>
        
        <div style={styles.filterItem}>
          <label htmlFor="dateFilter" style={styles.filterLabel}>בחר תאריך:</label>
          <input
            id="dateFilter"
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={styles.input}
          />
        </div>
      </div>

      {loading ? (
        <p>טוען נתונים...</p>
      ) : (
        <div>
          {noResults ? (
            <p>אין תוצאות עבור התאריך או הכיתה שבחרת</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>מספר רשומה</th>
                  <th style={styles.tableHeader}>כיתה</th>
                  <th style={styles.tableHeader}>תאריך</th>
                  <th style={styles.tableHeader}>הרמת כסאות</th>
                  <th style={styles.tableHeader}>טאטוא כיתה</th>
                  <th style={styles.tableHeader}>כיבוי אורות וסגירת חלונות</th>
                  <th style={styles.tableHeader}>לוח נקי</th>
                  <th style={styles.tableHeader}>סך הכל נקודות</th>
                </tr>
              </thead>
              <tbody>
                {dailyData.map((entry) => (
                  <tr key={entry.entry_id} style={styles.tableRow}>
                    <td style={styles.tableCell}>{entry.entry_id}</td>
                    <td style={styles.tableCell}>{formatClassId(entry.class_id)}</td>
                    <td style={styles.tableCell}>{(entry.entry_date)}</td>
                    <td style={styles.tableCell}>
                      {entry.chairs ? <span style={{color: 'purple'}}>✔️</span> : <span style={{color: 'red'}}>❌</span>}
                    </td>
                    <td style={styles.tableCell}>
                      {entry.sweep ? <span style={{color: 'purple'}}>✔️</span> : <span style={{color: 'red'}}>❌</span>}
                    </td>
                    <td style={styles.tableCell}>
                      {entry.lightswindows ? <span style={{color: 'purple'}}>✔️</span> : <span style={{color: 'red'}}>❌</span>}
                    </td>
                    <td style={styles.tableCell}>
                      {entry.board ? <span style={{color: 'purple'}}>✔️</span> : <span style={{color: 'red'}}>❌</span>}
                    </td>
                    <td style={styles.tableCell}>{entry.total_points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      
    </div>
  );

};
const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      width: '100%',
      margin: '0',
      direction: 'rtl',
      backgroundColor: '#D0F7FF', // רקע תכלת בהיר
      
    },
  header: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
    gap: '10px',
  },
  filterItem: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '15px',
  },
  select: {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  input: {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  table: {
    width: '85%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    margin: '0 auto',
    
  },
  tableHeader: {
    backgroundColor: '#b57edc', // סגול כמו בתמונה
    color: 'white',
    padding: '12px',
    textAlign: 'center',
  },
  tableRow: {
    backgroundColor: 'white',
    borderBottom: '1px solid #eee',
  },
  tableCell: {
    padding: '10px',
    textAlign: 'center',
    borderBottom: '1px solid #eee',
  },
  filterLabel: {
    fontWeight: 'bold',
    marginLeft: '5px',
  },
   filterBox: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '8px',
    marginBottom: '20px',
    maxWidth: '40%', // מצמצם את הרוחב כך שיתאים לסינון בלבד
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    fontSize: '30px',
    fontWeight: 'bold',

    color: '#fff', // צבע טקסט לבן
    backgroundColor: '#7D3C98', // רקע סגול
    padding: '2px 8px', // ריווח בתוך התיבה
    borderRadius: '6px', // פינות מעוגלות
    textAlign: 'center',
    width: 'fit-content', // מתאימים את הרוחב לפי התוכן של הכותרת
    marginLeft: 'auto', // ממורכז אוטומטית
    marginRight: 'auto', // ממורכז אוטומטית
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // הוספת צל לכותרת
    marginTop: '3%'
  },
  
  Navigation: {
    paddingTop: '20px', // הורדת הנתיב מעט למטה
  },
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px',
    padding: '10px',
  },
  navItem: {
    padding: '10px 15px',
    fontWeight: 'bold',
    cursor: 'pointer',
  }
};
export default DailyDataTable;