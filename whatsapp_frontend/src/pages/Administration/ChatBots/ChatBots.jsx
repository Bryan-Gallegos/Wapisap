import React, { useEffect, useState } from "react";
import { getChatbots, createChatbot, updateChatbot, deleteChatbot, getUsers } from "../../../services/api";
import { Container, Row, Col, Table, Button, Form, Modal, Pagination } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaEye, FaRobot } from "react-icons/fa";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import AdminMenu from "../../../components/AdminMenu/AdminMenu";
import { Formik } from "formik";
import * as Yup from "yup";
import "./Chatbots.css";

const Chatbots = () => {
    const [chatbots, setChatbots] = useState([]);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [show, setShow] = useState(false);
    const [selectedChatbot, setSelectedChatbot] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedChatbotDetails, setSelectedChatbotDetails] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [chatbotToDelete, setChatbotToDelete] = useState(null);
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const chatbotsPerPage = 5;

    useEffect(() => {
        fetchChatbots();
        fetchUsers();
    }, []);

    const fetchChatbots = async () => {
        try {
            const response = await getChatbots();
            setChatbots(response.results);
        } catch (error) {
            console.error("Error obtaining chatbots", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.results);
        } catch (error) {
            console.error("Error obtaining users", error);
        }
    };

    const handleShow = (chatbot) => {
        setSelectedChatbot(chatbot);
        setShow(true);
    };

    const handleClose = () => {
        setSelectedChatbot(null);
        setShow(false);
    };

    const handleShowViewChatbot = (chatbot) => {
        setSelectedChatbotDetails(chatbot);
        setShowViewModal(true);
    };

    const handleCloseViewChatbot = () => {
        setSelectedChatbotDetails(null);
        setShowViewModal(false);
    };

    const handleShowDeleteChatbot = (chatbot) => {
        setChatbotToDelete(chatbot);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteChatbot = () => {
        setChatbotToDelete(null);
        setShowDeleteModal(false);
    };

    const handleDeleteChatbot = async () => {
        if (chatbotToDelete) {
            try {
                await deleteChatbot(chatbotToDelete.id);
                showNotification(`Chatbot "${chatbotToDelete.name}" successfully deleted.`);
                fetchChatbots();
                handleCloseDeleteChatbot();
            } catch (error) {
                showNotification("Error deleting chatbot. Please try again.");
            }
        }
    };

    const showNotification = (message) => {
        setNotificationMessage(message);
        setShowNotificationModal(true);
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("The name of chatbot is mandatory"),
        status: Yup.string().required("Status is required"),
        whatsapp: Yup.number().required("WhatsApp ID is required"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            if (selectedChatbot?.id) {
                await updateChatbot(selectedChatbot.id, values);
                showNotification("Chatbot updated successfully.");
            } else {
                await createChatbot(values);
                showNotification("Chatbot created successfully.");
            }

            fetchChatbots();
            handleClose();
        } catch (error) {
            console.error("Error saving chatbot", error.response?.data || error.message);
            showNotification("Error saving chatbot. Please try again.");
        }

        setSubmitting(false);
    };

    const indexOfLastChatbot = currentPage * chatbotsPerPage;
    const indexOfFirstChatbot = indexOfLastChatbot - chatbotsPerPage;
    const currentChatbots = chatbots.slice(indexOfFirstChatbot, indexOfLastChatbot);


    return (
        <div className="chatbots-page">
            <Sidebar />
            <div className="admin-menu-container">
                <AdminMenu />
            </div>
            <div className="admin-content">
                <Topbar />
                <Container fluid className="p-4">
                    <h2><FaRobot color="#0091EA" /> Chatbots</h2>
                    <Row className="mb-3">
                        <Col md={7}>
                            <Form.Control
                                type="text"
                                placeholder="Search chatbot..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Col>
                        <Col md={5}>
                            <Button variant="success" onClick={() => handleShow(null)}><FaPlus />Create Chatbot</Button>
                        </Col>
                    </Row>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Chatbot Name</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentChatbots.map((chatbot) => (
                                <tr key={chatbot.id}>
                                    <td>{chatbot.id}</td>
                                    <td>{chatbot.name}</td>
                                    <td>{chatbot.description}</td>
                                    <td>{chatbot.status}</td>
                                    <td>
                                        <Button variant="outline-info" size="sm" onClick={() => handleShowViewChatbot(chatbot)}>
                                            <FaEye /> View
                                        </Button>
                                        <Button variant="outline-primary" size="sm" onClick={() => handleShow(chatbot)}>
                                            <FaEdit /> Edit
                                        </Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleShowDeleteChatbot(chatbot)}>
                                            <FaTrash /> Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Pagination className="custom-pagination justify-content-center">
                        {Array.from({ length: Math.ceil(chatbots.length / chatbotsPerPage) }, (_, index) => (
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

            {/* Modal View Chatbot */}
            <Modal show={showViewModal} onHide={handleCloseViewChatbot} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Chatbot Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedChatbotDetails && (
                        <div>
                            <p><strong>ID:</strong> {selectedChatbotDetails.id}</p>
                            <p><strong>Name:</strong> {selectedChatbotDetails.name}</p>
                            <p><strong>Description:</strong> {selectedChatbotDetails.description}</p>
                            <p><strong>Status:</strong> {selectedChatbotDetails.status}</p>

                            {/* Aquí podríamos incluir una lista de usuarios si aplica */}
                            {selectedChatbotDetails.users && selectedChatbotDetails.users.length > 0 ? (
                                <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
                                    <h5>Users interacting with this chatbot:</h5>
                                    <ul style={{ listStyle: "none", padding: 0 }}>
                                        {selectedChatbotDetails.users.map(user => (
                                            <li key={user.id} style={{ padding: "5px 0", borderBottom: "1px solid #eee" }}>
                                                {user.first_name} {user.last_name} ({user.email})
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p>No users assigned to this chatbot.</p>
                            )}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseViewChatbot}>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Create/Edit Chatbot */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedChatbot?.id ? "Edit Chatbot" : "Create Chatbot"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            name: selectedChatbot?.name || "",
                            status: selectedChatbot?.status || "active",
                            whatsapp: selectedChatbot?.whatsapp || 1,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >

                        {({ values, handleChange, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Chatbot Name</Form.Label>
                                    <Form.Control type="text" name="name" value={values.name} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control as="select" name="status" value={values.status} onChange={handleChange}>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>WhatsApp ID</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="whatsapp"
                                        value={values.whatsapp}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Modal.Footer className="d-flex justify-content-end">
                                    <Button type="submit" variant="success">Save</Button>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>

            {/* Modal Delete Chatbot */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteChatbot} centered>
                <Modal.Header closeButton>
                    <Modal.Title>⚠️ Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {chatbotToDelete && (
                        <p>Are you sure you want to delete the chatbot <strong>{chatbotToDelete.name}</strong>? This action cannot be undone.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteChatbot}>❌ Cancel</Button>
                    <Button variant="danger" onClick={handleDeleteChatbot}>🗑 Delete</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Notification */}
            <Modal show={showNotificationModal} onHide={() => setShowNotificationModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>🔔 Notification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{notificationMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowNotificationModal(false)}>Accept</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
};

export default Chatbots