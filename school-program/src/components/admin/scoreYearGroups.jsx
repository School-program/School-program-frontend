import React from "react";
import { useNavigate } from "react-router-dom";

function ScoreYearGroups() {
  const navigate = useNavigate();
  const yearGroups = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח"];

  const handleYearClick = (year) => {
    navigate(`/classes/${year}`);
  };

  return (
    <div style={styles.container}>
      {yearGroups.map((year) => (
        <div
          key={year}
          style={styles.box}
          onClick={() => handleYearClick(year)}
        >
          {year}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // 4 עמודות
    gap: "20px",
    justifyContent: "center",
    padding: "20px",
  },
  box: {
    width: "100px",
    height: "100px",
    backgroundColor: "#4CAF50",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default ScoreYearGroups;
