// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Asegúrate de que la ruta sea correcta
import "./index.css"; // Si tienes estilos, asegúrate de importarlos

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
