import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/main.component";
import AllClasses from "./components/users/allClasses.component";
import TopClasses from "./components/users/topClasses";
import YearGroups from "./components/users/yearGroups";
import PresentData from "./components/admin/presentData";
import Score from "./components/admin/scoreYearGroups";

function App() {
  return (
    <Router>
      <div style={{ textAlign: "center", margin: "50px auto" }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/all-classes" element={<AllClasses />} />
          <Route path="/top-classes" element={<TopClasses />} />
          <Route path="/year-groups" element={<YearGroups />} />
          <Route path="/present-data" element={<PresentData />} />
          <Route path="/score" element={<Score />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
