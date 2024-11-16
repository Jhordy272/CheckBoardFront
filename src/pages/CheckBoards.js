// src/pages/Management.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

// Configura el modal para que se monte en el elemento raíz
Modal.setAppElement("#root");

const CheckBoards = () => {
    const location = useLocation();
    const [checkboards, setCheckBoards] = useState([]);
    const [filteredCheckBoards, setFilteredCheckBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ id: "" });
    const [selectedCheckBoard, setSelectedCheckBoard] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const projectId = location.state?.projectId;

    useEffect(() => {
        const fetchCheckBoards = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/checkboard/byProject/${projectId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCheckBoards(response.data);
                setFilteredCheckBoards(response.data);
            } catch (err) {
                setError("Error al cargar los checkBoards.");
            } finally {
                setLoading(false);
            }
        };
        fetchCheckBoards();
    }, [token, projectId]);

    useEffect(() => {
        const filterData = () => {
            const filtered = checkboards.filter((checkboard) =>
                Object.keys(filters).every((key) => {
                    return checkboard[key]
                        ?.toString()
                        .toLowerCase()
                        .includes(filters[key].toLowerCase());
                })
            );
            setFilteredCheckBoards(filtered);
        };

        filterData();
    }, [filters, checkboards]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const openModal = (checkBoard) => {
        setSelectedCheckBoard(checkBoard);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedCheckBoard(null);
        setModalIsOpen(false);
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;
    return (
        <div>
            <h1 className="text-center my-4">Listado de CheckBoards</h1>
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
                                placeholder="Filtrar por Nombre"
                                className="form-control"
                            />
                        </th>
                        <th>Proyecto</th>
                        <th>Ver Detalles</th>
                        <th>Gestionar</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCheckBoards.map((checkboard) => (
                        <tr key={checkboard.id}>
                            <td>{checkboard.id}</td>
                            <td>{checkboard.name}</td>
                            <td>{checkboard.project.name}</td>
                            <td>
                                <button onClick={() => openModal(checkboard)} className="btn btn-secondary">Ver detalles</button>
                            </td>
                            <td>
                                <button onClick={() => navigate("/checkboardsAssignment", { state: { checkboardId: checkboard.id } })} className="btn btn-secondary">Gestionar</button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
            {/* Modal para ver los detalles del proyecto */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Detalles del CheckBoard"
                style={{
                    content: {
                        width: "400px",
                        margin: "auto",
                    },
                }}
            >
                {selectedCheckBoard && (
                    <div>
                        <h2>Detalles del Proyecto</h2>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default CheckBoards;