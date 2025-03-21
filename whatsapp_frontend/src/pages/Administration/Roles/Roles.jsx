import React, { useEffect, useState } from "react";
import { getRoles, getUsers, createRole, updateRole, deleteRole } from "../../../services/api";
import { Container, Row, Col, Table, Button, Form, Modal, Pagination } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaUsersCog, FaEye } from "react-icons/fa";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import AdminMenu from "../../../components/AdminMenu/AdminMenu";
import { Formik } from "formik";
import * as Yup from "yup";
import "./Roles.css";

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [show, setShow] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedRoleDetails, setSelectedRoleDetails] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [roleToDelete, setRoleToDelete] = useState(null);
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [roleUserCount, setRoleUserCount] = useState({});
    const [notificationMessage, setNotificationMessage] = useState("");
    const rolesPerPage = 5;

    useEffect(() => {
        fetchRoles();
        fetchUsers();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await getRoles();
            setRoles(response.results);
        } catch (error) {
            console.error("Error obtaining roles.", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.results);

            const countByRole = {};
            response.results.forEach(user => {
                countByRole[user.role] = (countByRole[user.role] || 0) + 1;
            });
            setRoleUserCount(countByRole);
        } catch (error) {
            console.error("Error getting users.", error);
        }
    };

    const handleShow = (role) => {
        setSelectedRole(role || { name: "" }); 
        setShow(true);
    };

    const handleClose = () => {
        setSelectedRole(null);
        setShow(false);
    };

    const handleShowViewRole = (role) => {
        const filteredUsers = users.filter(user => user.role === role.id);
        setSelectedRoleDetails({ ...role, users: filteredUsers });
        setShowViewModal(true);
    };

    const handleCloseViewRole = () => {
        setSelectedRoleDetails(null);
        setShowViewModal(false);
    };

    const handleShowDeleteRole = (role) => {
        setRoleToDelete(role);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteRole = () => {
        setRoleToDelete(null);
        setShowDeleteModal(false);
    };

    const handleDeleteRole = async () => {
        if (roleToDelete) {
            try {
                await deleteRole(roleToDelete.id);
                showNotification(`Role "${roleToDelete.name}" successfully deleted.`);
                fetchRoles();
                handleCloseDeleteRole();
            } catch (error) {
                showNotification("Error deleting role. Please try again.");
            }
        }
    };

    const showNotification = (message) => {
        setNotificationMessage(message);
        setShowNotificationModal(true);
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("The name of the role is mandatory"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            if (selectedRole?.id) {
                await updateRole(selectedRole.id, values);
                showNotification("Role updated successfully.");
            } else {
                await createRole(values);
                showNotification("Role created successfully.");
            }

            fetchRoles();
            handleClose();
        } catch (error) {
            console.error("Error saving role", error);
            showNotification("Error saving role. Please try again.");
        }

        setSubmitting(false);
    };

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
                    <h2><FaUsersCog color="green" /> Roles Management</h2>
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
                            <Button variant="success" onClick={() => handleShow(null)}><FaPlus /> Create Role</Button>
                        </Col>
                    </Row>

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
                                            <Button variant="outline-primary" size="sm" onClick={() => handleShow(role)}>
                                                <FaEdit /> Edit
                                            </Button>
                                            <Button variant="outline-danger" size="sm" onClick={() => handleShowDeleteRole(role)}>
                                                <FaTrash /> Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* Paginación */}
                    <Pagination className="custom-pagination justify-content-center">
                        {Array.from({ length: Math.ceil(roles.length / rolesPerPage) }, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Container>
            </div>

            {/* Modal View Role */}
            <Modal show={showViewModal} onHide={handleCloseViewRole} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Role Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedRoleDetails && (
                        <div>
                            <p><strong>ID:</strong> {selectedRoleDetails.id}</p>
                            <p><strong>Name:</strong> {selectedRoleDetails.name}</p>
                            <p><strong>Number of Users:</strong> {roleUserCount[selectedRoleDetails.id] || 0}</p>

                            {/* User section with the role */}
                            {selectedRoleDetails.users && selectedRoleDetails.users.length > 0 ? (
                                <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
                                    <h5>Users with this role:</h5>
                                    <ul style={{ listStyle: "none", padding: 0 }}>
                                        {selectedRoleDetails.users.map(user => (
                                            <li key={user.id} style={{ padding: "5px 0", borderBottom: "1px solid #eee" }}>
                                                {user.first_name} {user.last_name} ({user.email})
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p>No users are assigned to this role.</p>
                            )}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseViewRole}>Close</Button>
                </Modal.Footer>
            </Modal>


            {/* Modal Create/Edit Role */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedRole?.id ? "Edit Role" : "Create Role"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ name: selectedRole?.name || "" }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                {/* Separate the button field with margin */}
                                <Form.Group className="mb-4">
                                    <Form.Label>Role Name</Form.Label>
                                    <Form.Control type="text" name="name" value={values.name} onChange={handleChange} />
                                </Form.Group>

                                {/* Button aligned to the right */}
                                <Modal.Footer className="d-flex justify-content-end">
                                    <Button type="submit" variant="success">Save</Button>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>

            {/* Notificaction Modal */}
            <Modal show={showNotificationModal} onHide={() => setShowNotificationModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>🔔 Notification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{notificationMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowNotificationModal(false)}>OK</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal to delete a role */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteRole} centered>
                <Modal.Header closeButton>
                    <Modal.Title>⚠️ Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {roleToDelete && (
                        <p>Are you sure you want to delete the role <strong>{roleToDelete.name}</strong>? This action cannot be undone.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteRole}>
                        ❌ Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteRole}>
                        🗑  Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Roles;
