import React, { useState, useEffect } from "react";
import { addDailyDataAndUpdatePoints } from "../../apiService";

const getLocalDate = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now.toLocaleDateString("en-CA");
};

const convertClassNameToHebrew = (className) => {
  const letterMap = {
    A: 'א', B: 'ב', C: 'ג', D: 'ד', E: 'ה', F: 'ו', G: 'ז', H: 'ח'
  };
  const [letter, number] = className.split('');
  const hebrewLetter = letterMap[letter] || letter;
  return `${hebrewLetter}'${number}`;
};

function Popup({ className, onClose, onConfirm }) {
  const [tasks, setTasks] = useState({
    chairs: false,
    sweep: false,
    lightswindows: false,
    board: false,
  });
  const [totalPoints, setTotalPoints] = useState(0);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(className));
    if (savedData && savedData.date === getLocalDate()) {
      setTasks(savedData.tasks);
      setTotalPoints(savedData.totalPoints);
    }
  }, [className]);

  const handleCheckboxChange = (task) => {
    const newTasks = { ...tasks, [task]: !tasks[task] };
    setTasks(newTasks);
    setTotalPoints(Object.values(newTasks).filter(Boolean).length * 10);
  };

  const handleConfirm = () => {
    setShowConfirmationPopup(true);
  };

  const finalizeConfirm = async () => {
    const entry_date = getLocalDate();
    const cycleLetter = className[0];
    const classNumber = parseInt(className.slice(1), 10);
    const cycleNumber = cycleLetter.charCodeAt(0) - "A".charCodeAt(0) + 1;
    const classId = (cycleNumber - 1) * 5 + classNumber;

    const data = {
      class_id: classId,
      entry_date,
      ...tasks,
      total_points: totalPoints,
    };

    try {
      await addDailyDataAndUpdatePoints(data);
      localStorage.setItem(
        className,
        JSON.stringify({ tasks, totalPoints, date: entry_date })
      );
      if (onConfirm) {
        onConfirm(className);
      }
    } catch (error) {
      console.error("שגיאה בעדכון הנקודות:", error);
    } finally {
      setShowConfirmationPopup(false);
      onClose();
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h3 style={styles.title}>הוספת נקודות לכיתה {convertClassNameToHebrew(className)}</h3>
        <div style={styles.taskList}>
          {[{ key: "chairs", label: "הרמת כסאות", color: "#ff7043" },
            { key: "sweep", label: "טאטוא הכיתה", color: "#9ccc65" },
            { key: "lightswindows", label: "כיבוי אורות וסגירת חלונות", color: "#5c6bc0" },
            { key: "board", label: "לוח נקי", color: "#ab47bc" },
          ].map(({ key, label, color }) => (
            <label key={key} style={{ ...styles.taskLabel, color }}>
              <input
                type="checkbox"
                checked={tasks[key]}
                onChange={() => handleCheckboxChange(key)}
              />
              {label}
            </label>
          ))}
        </div>

        <p style={styles.totalPoints}>סה"כ נקודות: {totalPoints}</p>

        <button style={styles.confirmButton} onClick={handleConfirm}>
          הוספת נקודות
        </button>
        <button style={styles.cancelButton} onClick={onClose}>
          ביטול
        </button>
      </div>

      {showConfirmationPopup && (
        <div style={styles.overlay}>
          <div style={styles.confirmationPopup}>
            <p>האם אתה בטוח שברצונך להוסיף {totalPoints} נקודות לכיתה {convertClassNameToHebrew(className)}?</p>
            <button style={styles.confirmButton} onClick={finalizeConfirm}>
              אישור
            </button>
            <button style={styles.cancelButton} onClick={() => setShowConfirmationPopup(false)}>
              ביטול
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  overlay: { fontFamily: 'Arial, sans-serif', position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" },
  popup: { fontFamily: 'Arial, sans-serif', backgroundColor: "#e3f2fd", padding: "20px", borderRadius: "12px", textAlign: "center", width: "320px", border: "5px solid purple" },
  title: { fontFamily: 'Arial, sans-serif', fontSize: "30px", fontWeight: "bold", color: "#3f51b5", marginBottom: "30px" },
  taskList: { fontFamily: 'Arial, sans-serif', marginBottom: "10px" },
  taskLabel: { fontFamily: 'Arial, sans-serif', display: "flex", alignItems: "center", gap: "10px", fontSize: "25px", marginBottom: "8px" },
  totalPoints: { fontFamily: 'Arial, sans-serif', fontSize: "30px", fontWeight: "bold" },
  confirmButton: { fontFamily: 'Arial, sans-serif', backgroundColor: "#4CAF50", color: "white", padding: "10px", borderRadius: "8px", cursor: "pointer", margin: "5px" },
  cancelButton: { fontFamily: 'Arial, sans-serif', backgroundColor: "#f44336", color: "white", padding: "10px", borderRadius: "8px", cursor: "pointer", margin: "5px" },
  confirmationPopup: { fontFamily: 'Arial, sans-serif', backgroundColor: "white", padding: "20px", borderRadius: "10px", textAlign: "center", width: "300px" },
};

export default Popup;
