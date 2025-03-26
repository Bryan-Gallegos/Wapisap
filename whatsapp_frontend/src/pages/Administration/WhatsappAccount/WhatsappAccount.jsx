import React, { useEffect, useState } from "react";
import { getWhatsAppAccounts, createWhatsAppAccount, updateWhatsAppAccount, getUsers, deleteWhatsAppAccount } from "../../../services/api";
import { Container, Row, Col, Table, Button, Form, Modal, Pagination } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaEye, FaWhatsapp } from "react-icons/fa";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import AdminMenu from "../../../components/AdminMenu/AdminMenu";
import { Formik } from "formik";
import * as Yup from "yup";
import "./WhatsappAccount.css";

const WhatsaapAccount = () => {
    const [accounts, setAccounts] = useState([]);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [show, setShow] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showViewModal, setShowViewModal] = useState(false);
    const [accountToDelete, setAccountToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [selectedAccountDetails, setSelectedAccountDetails] = useState(null);
    const accountsPerPage = 5;

    useEffect(() => {
        fetchAccounts();
        fetchUsers();
    }, []);

    const fetchAccounts = async () => {
        try {
            const response = await getWhatsAppAccounts();
            setAccounts(response.results || response);
        } catch (error) {
            console.error("Error getting Whatsapp Accounts", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.results || response);
        } catch (error) {
            console.error("Error getting users", error);
        }
    };

    const getUserFullName = (userId) => {
        const user = users.find(u => u.id === userId);
        return user ? `${user.first_name} ${user.last_name}` : "N/A";
    };

    const handleShow = (account) => {
        setSelectedAccount(account);
        setShow(true);
    };

    const handleClose = () => {
        setSelectedAccount(null);
        setShow(false);
    };

    const handleShowDeleteWhatsappAccount = (account) => {
        setAccountToDelete(account);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteWhatsappAccount = () => {
        setAccountToDelete(null);
        setShowDeleteModal(false);
    };

    const handleShowViewModal = (account) => {
        setSelectedAccountDetails(account);
        setShowViewModal(true);
    };

    const handleCloseViewModal = () => {
        setSelectedAccountDetails(null);
        setShowViewModal(false);
    };

    const handleDeleteWhatsappAccount = async () => {
        if (accountToDelete) {
            try {
                await deleteWhatsAppAccount(accountToDelete.id);
                showNotification("WhatsApp Account deleted.");
                fetchAccounts();
                handleCloseDeleteWhatsappAccount();
            } catch (error) {
                showNotification("Error deleting WhatApp Account.");
            }
        }
    };

    const showNotification = (message) => {
        setNotificationMessage(message);
        setShowNotificationModal(true);
    };

    const validationSchema = Yup.object().shape({
        phone_number: Yup.string().required("Phone number is required"),
        name: Yup.string(),
        status: Yup.string().required("Status is required"),
        user: Yup.number().required("User is required"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            if (selectedAccount?.id) {
                await updateWhatsAppAccount(selectedAccount.id, values);
                showNotification("Account updated successfully.");
            } else {
                await createWhatsAppAccount(values);
                showNotification("Account created successfully.");
            }

            fetchAccounts();
            handleClose();
        } catch (error) {
            console.error("Error saving account", error.response?.data || error.message);
            showNotification("Error saving account.");
        }

        setSubmitting(false);
    };

    const filteredAccounts = accounts.filter((account) => {
        const phoneMatch = account.phone_number.includes(search);
        const userMatch = selectedUser ? account.user === parseInt(selectedUser) : true;
        const statusMatch = selectedStatus ? account.status === selectedStatus : true;

        return phoneMatch && userMatch && statusMatch;
    });

    const currentItems = filteredAccounts.slice(
        (currentPage - 1) * accountsPerPage,
        currentPage * accountsPerPage
    );

    return (
        <div className="whatsapp-accounts-page">
            <Sidebar />
            <div className="admin menu-container">
                <AdminMenu />
            </div>
            <div className="admin-content">
                <Topbar />
                <Container fluid className="p-4">
                    <h2><FaWhatsapp color="green" /> WhatsApp Accounts</h2>
                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Control
                                type="text"
                                placeholder="Search by phone number..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Col>

                        <Col md={3}>
                            <Form.Select
                                value={selectedUser}
                                onChange={(e) => setSelectedUser(e.target.value)}
                            >
                                <option value="">All Users</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.first_name} {user.last_name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>

                        <Col md={3}>
                            <Form.Select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </Form.Select>
                        </Col>

                        <Col md={2}>
                            <Button variant="success" onClick={() => handleShow(null)}>
                                <FaPlus /> Create Account
                            </Button>
                        </Col>
                    </Row>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Phone Number</th>
                                <th>Status</th>
                                <th>User</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((account) => (
                                <tr key={account.id}>
                                    <td>{account.id}</td>
                                    <td>{account.phone_number}</td>
                                    <td>{account.status}</td>
                                    <td>{getUserFullName(account.user)}</td>
                                    <td>
                                        <Button size="sm" variant="outline-info" onClick={() => handleShowViewModal(account)} title="View Details">
                                            <FaEye /> View
                                        </Button>{" "}
                                        <Button size="sm" variant="outline-primary" onClick={() => handleShow(account)} title="Edit WhatsappAccount">
                                            <FaEdit /> Edit
                                        </Button>{" "}
                                        <Button size="sm" variant="outline-danger" onClick={() => handleShowDeleteWhatsappAccount(account)} title="Delete Whatsapp Account">
                                            <FaTrash /> Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Pagination className="justify-content-center">
                        {Array.from({ length: Math.ceil(filteredAccounts.length / accountsPerPage) }, (_, i) => (
                            <Pagination.Item
                                key={i + 1}
                                active={i + 1 === currentPage}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Container>
            </div>

            {/* Modal View */}
            <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>WhatsApp Account Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedAccountDetails && (
                        <div>
                            <p><strong>ID:</strong> {selectedAccountDetails.id}</p>
                            <p><strong>Phone Number:</strong> {selectedAccountDetails.phone_number}</p>
                            <p><strong>Status:</strong> {selectedAccountDetails.status}</p>
                            <p><strong>Name:</strong> {selectedAccountDetails.name || "N/A"}</p>
                            <p><strong>User:</strong> {getUserFullName(selectedAccountDetails.user)}</p>
                            {selectedAccountDetails.profile_picture && (
                                <div>
                                    <strong>Profile Picture:</strong><br />
                                    <img src={selectedAccountDetails.profile_picture} alt="Profile" width="100" />
                                </div>
                            )}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseViewModal}>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Create/Edit */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedAccount?.id ? "Edit Account" : "Create Account"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            phone_number: selectedAccount?.phone_number || "",
                            status: selectedAccount?.status || "active",
                            user: selectedAccount?.user || "",
                            name: selectedAccount?.name || "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control name="phone_number" value={values.phone_number} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control as="select" name="status" value={values.status} onChange={handleChange}>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Name (optional)</Form.Label>
                                    <Form.Control name="name" value={values.name} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>User</Form.Label>
                                    <Form.Control as="select" name="user" value={values.user} onChange={handleChange}>
                                        <option value="">-- Select User --</option>
                                        {users.map(user => (
                                            <option key={user.id} value={user.id}>
                                                {user.first_name} {user.last_name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Modal.Footer>
                                    <Button type="submit" variant="success">Save</Button>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>

            {/* Modal Delete */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteWhatsappAccount} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {accountToDelete && (
                        <p>Are you sure you want to delete <strong>{accountToDelete.phone_number}</strong>?</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteWhatsappAccount}>Cancel</Button>
                    <Button variant="danger" onClick={handleDeleteWhatsappAccount}>Delete</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Notification */}
            <Modal show={showNotificationModal} onHide={() => setShowNotificationModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Notification</Modal.Title>
                </Modal.Header>
                <Modal.Body>{notificationMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowNotificationModal(false)}>OK</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default WhatsaapAccount;