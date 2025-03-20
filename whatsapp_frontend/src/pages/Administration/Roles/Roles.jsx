import React, { useEffect, useState } from "react";
import { getRoles, getUsers, createRole, updateRole, deleteRole } from "../../../services/api";
import { Container, Row, Col, Table, Button, Form, Modal, Pagination } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaUsersCog, FaUserTag, FaEye } from "react-icons/fa";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import AdminMenu from "../../../components/AdminMenu/AdminMenu";
import { Formik } from "formik";
import * as Yup from "yup";
import "./Roles.css";

const Roles = () => {
    const [roles, setRoles] = useState([]); // List of roles
    const [users, setUsers] = useState([]); // List  of users
    const [search, setSearch] = useState(""); // Search
    const [roleUserCount, setRoleUserCount] = useState({}); // Number of users per role
    const [showModal, setShowModal] = useState(false); // Create/edit role mode
    const [selectedRole, setSelectedRole] = useState(null); // Selected role
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal to eliminate
    const [roleToDelete, setRoleToDelete] = useState(null); // Role to be eliminated
    const [notification, setNotification] = useState({ show: false, message: "" }); // Notification
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const rolesPerPage = 5; // Pagination


    useEffect(() => {
        fetchRoles();
        fetchUsers();
    }, []);

    // Get all roles and their users
    const fetchRoles = async () => {
        try {
            const response = await getRoles();
            setRoles(response.results);
        } catch (error) {
            console.error("Error obteniendo roles.", error);
        }
    };

    //Get all users and count the amount in wich role
    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.results);

            // Contar cuántos usuarios hay por cada rol
            const countByRole = {};
            response.results.forEach(user => {
                countByRole[user.role] = (countByRole[user.role] || 0) + 1;
            });
            setRoleUserCount(countByRole);

        } catch (error) {
            console.error("Error obteniendo usuarios.", error);
        }
    };

    // Show details of role
    const handleShowViewRole = (role) => {
        setSelectedRole(role);
        setShowModal(true);
    };

    // Show creation/editing mode
    const handleShowModal = (role = null) => {
        setSelectedRole(role);
        setShowModal(true);
    };

    // Close creation/editing mode
    const handleCloseModal = () => {
        setSelectedRole(null);
        setShowModal(false);
    };

    // Delete Role
    const handleDeleteRole = async () => {
        if (roleToDelete) {
            try {
                await deleteRole(roleToDelete.id);
                setNotification({ show: true, message: "¡Rol eliminado correctamente!" });
                fetchRoles();
                handleCloseDeleteModal();
            } catch (error) {
                console.error("Error eliminando rol", error);
                setNotification({ show: true, message: "Error eliminando rol. Intenta de nuevo." });
            }
        }
    };

    // Pagination
    const indexOfLastRole = currentPage * rolesPerPage;
    const indexOfFirstRole = indexOfLastRole - rolesPerPage;
    const currentRoles = roles.slice(indexOfFirstRole, indexOfLastRole);

    return (
        <div className="roles-page">
            <Sidebar />
            <div className="admin-menu-container">
                <AdminMenu />
            </div>
            <div className="admin-content">
                <Topbar />
                <Container fluid className="p-4">
                    <h2>
                        <FaUsersCog color="#007bff" /> Roles Management
                    </h2>
                    <Row className="mb-3">
                        <Col md={7}>
                            <Form.Control
                                type="text"
                                placeholder="Buscar rol..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Col>
                        <Col md={5}>
                            <Button variant="success" onClick={() => handleShowModal(null)}>
                                <FaPlus /> Crear Rol
                            </Button>
                        </Col>
                    </Row>

                    {/* Tabla de Roles */}
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre del Rol</th>
                                <th>Cantidad de Usuarios</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRoles.map((role) => (
                                <tr key={role.id}>
                                    <td>{role.id}</td>
                                    <td>{role.name}</td>
                                    <td>{roleUserCount[role.id] || 0}</td> 
                                    <td>
                                        <div className="action-buttons">
                                            <Button variant="outline-info" size="sm" onClick={() => handleShowViewRole(role)}>
                                                <FaEye /> Ver
                                            </Button>
                                            <Button variant="outline-primary" size="sm" onClick={() => handleShowModal(role)}>
                                                <FaEdit /> Editar
                                            </Button>
                                            <Button variant="outline-danger" size="sm" onClick={() => handleDeleteRole(role)}>
                                                <FaTrash /> Eliminar
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>

                    {/* Paginación */}
                    <Pagination className="custom-pagination">
                        {[...Array(Math.ceil(roles.length / rolesPerPage)).keys()].map(number => (
                            <Pagination.Item
                                key={number + 1}
                                active={number + 1 === currentPage}
                                onClick={() => setCurrentPage(number + 1)}
                            >
                                {number + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Container>
            </div>

            {/* Modal para ver detalles del rol */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles del Rol</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedRole && (
                        <div className="role-details">
                            <p><strong>ID:</strong> {selectedRole.id}</p>
                            <p><strong>Nombre:</strong> {selectedRole.name}</p>
                            <p><strong>Cantidad de Usuarios:</strong> {roleUserCount[selectedRole.id] || 0}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModal}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Roles;
