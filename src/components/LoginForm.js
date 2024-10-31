// src/components/LoginForm.js
import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Limpiar error previo

    try {
      const response = await login(username, password);
      alert("Inicio de sesión exitoso");
      // Aquí puedes redirigir al usuario a otra página o actualizar el estado global
      navigate("/projects");
    } catch (error) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre de usuario:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}

export default LoginForm;