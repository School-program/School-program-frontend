import React, { useState } from "react";
import { addDailyDataAndUpdatePoints } from "../../apiService";

// פונקציה לקבלת התאריך המקומי ללא שעה
const getLocalDate = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // אתחול השעה ל-00:00
  return now.toLocaleDateString("en-CA"); // התאריך המקומי בפורמט YYYY-MM-DD
};

function Popup({ className, onClose }) {
  const [tasks, setTasks] = useState({
    chairs: false,
    sweep: false,
    lightswindows: false,
    board: false,
  });
  const [totalPoints, setTotalPoints] = useState(0);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

  const calculatePoints = (newTasks) => {
    const points = Object.values(newTasks).filter(Boolean).length * 10;
    setTotalPoints(points);
  };

  const handleCheckboxChange = (task) => {
    const newTasks = { ...tasks, [task]: !tasks[task] };
    setTasks(newTasks);
    calculatePoints(newTasks); // עדכון נקודות
  };

  const handleConfirm = () => {
    setShowConfirmationPopup(true); // מציג את הפופאפ של האישור הסופי
  };

  const finalizeConfirm = async () => {
    const cycleLetter = className[0];
    const classNumber = parseInt(className.slice(1), 10);
    const cycleNumber = cycleLetter.charCodeAt(0) - "א".charCodeAt(0) + 1;
    const classId = (cycleNumber - 1) * 5 + classNumber;

    const entry_date = getLocalDate();

    const data = {
      class_id: classId,
      entry_date: entry_date,
      ...tasks,
      total_points: totalPoints,
    };

    try {
      await addDailyDataAndUpdatePoints(data); // עדכון הנתונים בשרת

      // שמירה ב-localStorage עם התאריך הנכון
      localStorage.setItem(
        className,
        JSON.stringify({
          tasks,
          totalPoints,
          date: entry_date,
        })
      );

      setShowConfirmationPopup(false); // הסתרת הפופאפ
      onClose(); // סגירת הפופאפ הראשי
    } catch (error) {
      console.error("אירעה שגיאה בעדכון הנקודות:", error);
    }
  };

  const closeConfirmationPopup = () => {
    setShowConfirmationPopup(false); // סגירת פופאפ האישור
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h3>הוספת נקודות לכיתה {className}</h3>
        <div style={styles.tasks}>
          {["chairs", "sweep", "lightswindows", "board"].map((task) => (
            <label key={task} style={styles.label}>
              <input
                type="checkbox"
                checked={tasks[task]}
                onChange={() => handleCheckboxChange(task)} // עדכון בחירת המשימה
              />
              {task === "chairs" && "הרמת כסאות"}
              {task === "sweep" && "טאטוא הכיתה"}
              {task === "lightswindows" && "כיבוי אורות וסגירת חלונות"}
              {task === "board" && "לוח נקי"}
            </label>
          ))}
        </div>

        <p>סה"כ נקודות: {totalPoints}</p>

        <button onClick={handleConfirm}>אישור</button>
        <button onClick={onClose}>ביטול</button>
      </div>

      {showConfirmationPopup && (
        <div style={styles.confirmationOverlay}>
          <div style={styles.confirmationPopup}>
            <p>האם אתה בטוח שברצונך להוסיף {totalPoints} נקודות לכיתה {className}?</p>
            <button onClick={finalizeConfirm}>אישור</button>
            <button onClick={closeConfirmationPopup}>ביטול</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    width: "300px",
    textAlign: "center",
  },
  tasks: {
    margin: "10px 0",
  },
  label: {
    display: "block",
    marginBottom: "10px",
  },
  confirmationOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmationPopup: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    width: "300px",
    textAlign: "center",
  },
};

export default Popup;
