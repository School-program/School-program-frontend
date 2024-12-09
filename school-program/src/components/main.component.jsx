import React from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.row}>
        <button style={styles.button} onClick={() => navigate("/all-classes")}>
          הצגת כל הכיתות
        </button>
        <button style={styles.button} onClick={() => navigate("/top-classes")}>
          הכיתות המובילות
        </button>
        <button style={styles.button} onClick={() => navigate("/year-groups")}>
          הצגת השנתונים
        </button>
      </div>
      <div style={styles.row}>
        <button style={styles.button} onClick={() => navigate("/present-data")}>
          הצגת נתונים
        </button>
        <button style={styles.button} onClick={() => navigate("/score")}>
          ניקוד
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  row: {
    display: "flex",
    justifyContent: "center",
    gap: "20px", // רווח בין הכפתורים
    marginBottom: "20px",
  },
  button: {
    margin: "10px",
    padding: "15px 30px",
    fontSize: "18px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

export default Main;
