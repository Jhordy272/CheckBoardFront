// src/routes/AppRoutes.js
import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "../pages/Login";
import Projects from "../pages/Projects"; // Importa el nuevo componente

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<Projects />} /> {/* Nueva ruta para proyectos */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;

