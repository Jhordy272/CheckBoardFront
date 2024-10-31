// src/pages/Projects.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Aquí obtendrás el token, asegúrate de adaptarlo según cómo lo estés almacenando
  const token = localStorage.getItem("token"); // Suponiendo que guardas el token en localStorage

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8080/projects", {
          headers: {
            Authorization: `Bearer ${token}`, // Enviando el token en el encabezado
          },
        });
        setProjects(response.data);
      } catch (err) {
        setError("Error al cargar los proyectos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [token]); // Asegúrate de que el token esté en las dependencias

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Listado de Proyectos</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;

