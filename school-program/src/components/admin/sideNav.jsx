import React from "react";

function SideNav({ selectedYear, onSelectYear }) {
  const yearGroups = ["A", "B", "C", "D", "E", "F", "G", "H"];

  // מיפוי הכיתות לאותיות בעברית
  const yearLabels = {
    A: "א",
    B: "ב",
    C: "ג",
    D: "ד",
    E: "ה",
    F: "ו",
    G: "ז",
    H: "ח",
  };

  const styles = {
    sideNav: {
      fontFamily: 'Arial, sans-serif',
      width: "60px",
      backgroundColor: "#8a2be2",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "10px 0",
      gap: "10px",
      color: "white",
      marginTop: "30px",

    },
    sideNavItem: {
      cursor: "pointer",
      padding: "8px 10px",
      borderRadius: "4px",
      textAlign: "center",
      fontWeight: "bold",
      transition: "0.3s",

    },
    active: {
      backgroundColor: "#4b0e6f",
    },
  };

  return (
    <div style={styles.sideNav}>
      {yearGroups.map((year) => {
        const isActive = selectedYear === year;
        return (
          <div
            key={year}
            style={{
              ...styles.sideNavItem,
              ...(isActive ? styles.active : {}),
            }}
            onClick={() => onSelectYear(year)}
          >
            {yearLabels[year]} {/* מציג בעברית */}
          </div>
        );
      })}
    </div>
  );
}

export default SideNav;
