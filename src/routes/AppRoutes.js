// src/routes/AppRoutes.js
import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "../pages/Login";
import Projects from "../pages/Projects"; // Importa el nuevo componente
import CheckBoards from "../pages/CheckBoards";
import CheckBoardAssignments from "../pages/CheckBoardAssignments";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<Projects />} /> {/* Nueva ruta para proyectos */}
        <Route path="/checkboards" element={<CheckBoards />} /> {/* Nueva ruta para checkboards */}
        <Route path="/checkboardsAssignment" element={<CheckBoardAssignments />} /> {/* Nueva ruta para asignaciones de checkboards */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;

