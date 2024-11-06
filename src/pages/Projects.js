// src/pages/Projects.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

// Configura el modal para que se monte en el elemento raíz
Modal.setAppElement("#root");

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ id: "", name: "", division: "", manager: "", serviceLine: "" });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();
  

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

  const openModal1 = (project) => {
    setSelectedProject(project);
    setModalIsOpen1(true);
  };

  const closeModal1 = () => {
    setSelectedProject(null);
    setModalIsOpen1(false);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-center my-4">Listado de Proyectos</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID
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
            <th>Nombre
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
            <th>División
              <br />
              <input
                type="text"
                name="division"
                value={filters.division}
                onChange={handleFilterChange}
                placeholder="Filtrar por division"
                className="form-control"
              />
            </th>
            <th>Línea de Servicio
              <br />
              <input
                type="text"
                name="serviceLine"
                value={filters.serviceLine}
                onChange={handleFilterChange}
                placeholder="Filtrar por línea de servicio"
                className="form-control"
              />
            </th>
            <th>Gerente
              <br />
              <input
                type="text"
                name="manager"
                value={filters.manager}
                onChange={handleFilterChange}
                placeholder="Filtrar por gerente"
                className="form-control"
              />
            </th>
            <th>Detalles</th>
            <th>Editar</th>
            <th>Gestionar</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.name}</td>
              <td>{project.division.name}</td>
              <td>{project.serviceLine.name}</td>
              <td>{project.manager.username}</td>
              <td>
                <button onClick={() => openModal(project)} className="btn btn-primary">Ver detalles</button>
              </td>
              <td>
                <button onClick={() => openModal1(project)} className="btn btn-secondary">Editar</button>
              </td>
              <td>
                <button onClick={() => navigate("/Management")}>Ir a nueva ventana</button>
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
            <p><strong>Observaciones:</strong> {selectedProject.observations}</p>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal para editar el proyecto */}
      <Modal
        isOpen={modalIsOpen1}
        onRequestClose={closeModal1}
        contentLabel="Editar Proyecto"
        style={{
          content: {
            width: "400px",
            margin: "auto",
          },
        }}
      >
        {selectedProject && (
          <div>
            <h2>Editar Proyecto</h2>
            {/* Aquí puedes incluir formularios o campos editables para actualizar los detalles del proyecto */}
            <p><strong>Nombre:</strong> {selectedProject.name}</p>
            <p><strong>Fecha de inicio:</strong> {selectedProject.startDate}</p>
            <p><strong>Fecha de fin:</strong> {selectedProject.endDate}</p>
            <p><strong>Observaciones:</strong> {selectedProject.observations}</p>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => {/* Lógica de guardado */}}>Guardar</button>
              <button className="btn btn-secondary" onClick={closeModal1}>Cerrar</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Projects;
