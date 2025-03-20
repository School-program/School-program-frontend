import React, { useState } from "react";
import SideNav from "./sideNav";
import ClassesView from "./classesView";
import FooterNavigation from "../FooterNavigationAdmin"
import img from "../../images/image1.png"

function ScoreYearGroups() {
  const [selectedYear, setSelectedYear] = useState("A");

  const styles = {
    appContainer: {
      fontFamily: 'Arial, sans-serif',
      direction: "rtl",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundImage: `url(${img})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
    },
    mainLayout: {
      flex: 1,
      display: "flex",
      overflow: "hidden",
    },
    contentArea: {
      flex: 1,
      padding: "20px",
      overflowY: "auto",
    },
       navigation: {
      position: 'absolute',
      top: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      textAlign: 'center',
      padding: '10px 0',
      backgroundColor: 'transparent',
      paddingTop: '20px',
    },
  };

  return (
    <div style={styles.appContainer}>
 <div style={styles.navigation}>
        <FooterNavigation />
      </div>
      
            <div style={styles.mainLayout}>
        <SideNav selectedYear={selectedYear} onSelectYear={setSelectedYear} />
        <div style={styles.contentArea}>
          <ClassesView year={selectedYear} />
        </div>
      </div>
    </div>
  );
}

export default ScoreYearGroups;