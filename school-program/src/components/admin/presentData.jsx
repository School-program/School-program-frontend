import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import FooterNavigation from '../FooterNavigation';
const DailyDataTable = () => {
  const [dailyData, setDailyData] = useState([]); // הנתונים שיוצגו בטבלה
  const [classFilter, setClassFilter] = useState(''); // סינון לפי כיתה
  const [dateFilter, setDateFilter] = useState(''); // סינון לפי תאריך
  const [loading, setLoading] = useState(false); // מצב טעינה
  const [noResults, setNoResults] = useState(false); // משתנה לניהול "אין תוצאות"

  const fetchData = async () => {
    setLoading(true);
    setNoResults(false); // איפוס הודעת "אין תוצאות"
    setDailyData([]); // איפוס הנתונים הקודמים, אם יש

    try {
      let url = 'http://localhost:3005/dailydata'; 

      // אם יש סינון גם לפי כיתה וגם לפי תאריך
      if (classFilter && dateFilter) {
        url = `http://localhost:3005/dailydata/byClassAndDate/${classFilter}/${dateFilter}`;
      }
      // אם יש רק סינון לפי כיתה
      else if (classFilter) {
        url = `http://localhost:3005/dailydata/byClass/${classFilter}`;
      }
      // אם יש רק סינון לפי תאריך
      else if (dateFilter) {
        url = `http://localhost:3005/dailydata/byDate/${dateFilter}`;
      }

      const response = await axios.get(url);
      
      if (response.data.length === 0) {
        setNoResults(true); // אם לא נמצאו תוצאות
      } else {
        setDailyData(response.data); // אם נמצאו תוצאות, עדכון הסטייט
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // שליפת הנתונים בכל פעם שיש שינוי בסינון
  useEffect(() => {
    fetchData();
  }, [classFilter, dateFilter]);

  return (
    <div className="container">
              <FooterNavigation />
      <h1>ניהול נתונים יומי</h1>

      {/* סינון לפי כיתה */}
      <label htmlFor="classFilter" >בחר כיתה:</label >
      <select
        id="classFilter"
        value={classFilter}
        onChange={(e) => setClassFilter(e.target.value)}
        style={{marginLeft:'30px'}}>
        <option value="">הצג הכל</option>
        {Array.from({ length: 8 }, (_, grade) => // יצירת כיתות א' עד ח'
          Array.from({ length: 5 }, (_, i) => { // יצירת כיתות 1 עד 5 בכל שנה
            const gradeLetter = String.fromCharCode(1488 + grade); // יצירת א', ב', ג', ד', ה', ו', ז', ח'
            const className = `${gradeLetter}${i + 1}`; // לדוג' א1, א2, א3, ...
            const serialNumber = grade * 5 + i + 1;
            return (
              <option key={className} value={serialNumber}>
                {`כיתה ${className}`}
              </option>
            );
          })
        )}
      </select>

      {/* סינון לפי תאריך */}
      <label htmlFor="dateFilter">בחר תאריך:</label>
      <input
        id="dateFilter"
        type="date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
      />

      {/* טבלת התוצאות */}
      {loading ? (
        <p>טוען נתונים...</p>
      ) : (
        <div>
          {noResults ? (
            <p>אין תוצאות עבור התאריך או הכיתה שבחרת</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>מספר רשומה</th>
                  <th>כיתה</th>
                  <th>תאריך</th>
                  <th>הרמת כסאות</th>
                  <th>טאטוא הכיתה</th>
                  <th>כיבוי אורות וסגירת חלונות</th>
                  <th>לוח נקי</th>
                  <th>סך הכל נקודות</th>
                </tr>
              </thead>
              <tbody>
                {dailyData.map((entry) => (
                  <tr key={entry.entry_id}>
                    <td>{entry.entry_id}</td>
                    <td>{entry.class_id}</td>
                    <td>{entry.entry_date}</td>
                    <td>{entry.chairs ? '✔️' : '❌'}</td>
                    <td>{entry.sweep ? '✔️' : '❌'}</td>
                    <td>{entry.lightswindows ? '✔️' : '❌'}</td>
                    <td>{entry.board ? '✔️' : '❌'}</td>
                    <td>{entry.total_points}</td>
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

export default DailyDataTable;
