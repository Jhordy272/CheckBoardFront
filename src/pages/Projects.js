// src/pages/Projects.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";

// Configura el modal para que se monte en el elemento raíz
Modal.setAppElement("#root");

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ id: "", name: "" });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8080/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data);
        setFilteredProjects(response.data);
      } catch (err) {
        setError("Error al cargar los proyectos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [token]);

  useEffect(() => {
    const filterData = () => {
      const filtered = projects.filter((project) =>
        Object.keys(filters).every((key) => {
          if (key === "division") {
            return project.division?.name
              ?.toLowerCase()
              .includes(filters[key].toLowerCase());
          }
          if (key === "serviceLine") {
            return project.serviceLine?.name
              ?.toLowerCase()
              .includes(filters[key].toLowerCase());
          }
          if (key === "manager") {
            return project.manager?.username
              ?.toLowerCase()
              .includes(filters[key].toLowerCase());
          }
          return project[key]
            ?.toString()
            .toLowerCase()
            .includes(filters[key].toLowerCase());
        })
      );
      setFilteredProjects(filtered);
    };

    filterData();
  }, [filters, projects]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setModalIsOpen(false);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-center my-4">Listado de Proyectos</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>
              ID
              <br />
              <input
                type="text"
                name="id"
                value={filters.id}
                onChange={handleFilterChange}
                placeholder="Filtrar por ID"
                className="form-control"
              />
            </th>
            <th>
              Nombre
              <br />
              <input
                type="text"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
                placeholder="Filtrar por nombre"
                className="form-control"
              />
            </th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.name}</td>
              <td>
                <button onClick={() => openModal(project)}>Ver detalles</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para ver los detalles del proyecto */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detalles del Proyecto"
        style={{
          content: {
            width: "400px",
            margin: "auto",
          },
        }}
      >
        {selectedProject && (
          <div>
            <h2>Detalles del Proyecto</h2>
            <p><strong>Nombre:</strong> {selectedProject.name}</p>
            <p><strong>Fecha de inicio:</strong> {selectedProject.startDate}</p>
            <p><strong>Fecha de fin:</strong> {selectedProject.endDate}</p>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Projects;