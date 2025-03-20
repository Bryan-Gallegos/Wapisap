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
            console.error("Error obtaining roles.", error);
        }
    };

    // Get all users and count the amount in wich role
    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.results);

            // Count how many users there are for each role
            const countByRole = {};
            response.results.forEach(user => {
                countByRole[user.role] = (countByRole[user.role] || 0) + 1;
            });
            setRoleUserCount(countByRole);

        } catch (error) {
            console.error("Error getting users.", error);
        }
    };

    // Create role
    const handleSaveRole = async (values, { setSubmitting, resetForm }) => {
        try {
            if (selectedRole) {
                await updateRole(selectedRole.id, values);
                setNotification({ show: true, message: "Role updated correctly!" });
            } else {
                await createRole(values);
                setNotification({ show: true, message: "Role creating correctly!" });
            }

            fetchRoles();
            handleCloseModal();
            resetForm();
        } catch (error) {
            console.error("Error saving role", error);
            setNotification({ show: true, message: "Error saving role. Please try again." });
        }

        setSubmitting(false);
    };

    // Show details of role
    const handleShowViewRole = (role) => {
        const filteredUsers = users.filter(user => user.role === role.id);
        setSelectedRole({ ...role, users: filteredUsers });
        setShowModal(true);
    };

    // Show creation/editing mode
    const handleShowModal = (role) => {
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
                setNotification({ show: true, message: "Role eliminated correctly!" });
                fetchRoles();
                handleCloseDeleteModal();
            } catch (error) {
                console.error("Error deleting role", error);
                setNotification({ show: true, message: "Error deleting role. Please try again." });
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
                                placeholder="Search role..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Col>
                        <Col md={5}>
                            <Button variant="success" onClick={() => handleShowModal(null)}>
                                <FaPlus /> Create Role
                            </Button>
                        </Col>
                    </Row>

                    {/* Roles Table */}
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Rol Name</th>
                                <th>Number of Users</th>
                                <th>Actions</th>
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
                                                <FaEye /> View
                                            </Button>
                                            <Button variant="outline-primary" size="sm" onClick={() => handleShowModal(role)}>
                                                <FaEdit /> Edit
                                            </Button>
                                            <Button variant="outline-danger" size="sm" onClick={() => handleDeleteRole(role)}>
                                                <FaTrash /> Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>

                    {/* Pagination */}
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

            {/* Modal to view role details */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Role Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedRole && (
                        <div className="role-details">
                            <p><strong>ID:</strong> {selectedRole.id}</p>
                            <p><strong>Name:</strong> {selectedRole.name}</p>
                            <p><strong>Number of Users:</strong> {roleUserCount[selectedRole.id] || 0}</p>

                            {/* User section with the role */}
                            {selectedRole.users.length > 0 ? (
                                <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
                                    <h5>Users with this role:</h5>
                                    <ul style={{ listStyle: "none", padding: 0 }}>
                                        {selectedRole.users.map(user => (
                                            <li key={user.id} style={{ padding: "5px 0", borderBottom: "1px solid #eee" }}>
                                                {user.first_name} {user.last_name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p>There are no users with this role.</p>
                            )}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal to Create/Edit a Role */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedRole ? "Edit Role" : "Create New Role"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ name: selectedRole?.name || "" }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().required("The name of the role is mandatory"),
                        })}
                        onSubmit={handleSaveRole}
                    >
                        {({ values, handleChange, handleSubmit, errors, touched }) => (
                            <Form onSubmit={handleSubmit} className="modal-form">
                                <Form.Group className="mb-3">
                                    <Form.Label>Role Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        isInvalid={touched.name && !!errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                </Form.Group>

                                <div className="modal-buttons">
                                    <Button variant="secondary" onClick={handleCloseModal}>
                                        ❌ Cancel
                                    </Button>
                                    <Button variant="success" type="submit">
                                        💾 Save
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default Roles;
