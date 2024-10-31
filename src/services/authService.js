// src/services/authService.js
const API_URL = "http://localhost:8080/auth/login";  // Cambia esta URL a la de tu backend

export async function login(username, password) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Error al iniciar sesión");
    }

    const data = await response.json();
    // Guardar token en el almacenamiento local o en algún contexto si es necesario
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function logout() {
  localStorage.removeItem("token");
}