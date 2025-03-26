import React, { useEffect, useState } from "react";
import { getMessages, deleteMessage, getIntances, getWhatsAppAccounts } from "../../../services/api";
import { Container, Row, Col, Table, Button, Form, Modal, Pagination, Tab } from "react-bootstrap";
import { FaComments, FaEye, FaTrash } from "react-icons/fa";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import AdminMenu from "../../../components/AdminMenu/AdminMenu";
import "./Messages.css";


const Messages = () => {
    const [messages, setMesssages] = useState([]);
    const [whatsappAccounts, setWhatsappAccounts] = useState([]);
    const [instances, setInstances] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [messageToDelete, setMessageToDelete] = useState(null);
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const messagesPerPage = 10;

    useEffect(() => {
        fetchMessages();
        fetchIntances();
        fetchWhatsappAccounts();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await getMessages();
            setMesssages(response.results || response);
        } catch (error) {
            console.error("Error getting messages", error);
        }
    };

    const fetchIntances = async () => {
        try {
            const response = await getIntances();
            setInstances(response.results || response);
        } catch (error) {
            console.error("Error getting instances", error);
        }
    };

    const fetchWhatsappAccounts = async () => {
        try {
            const response = await getWhatsAppAccounts();
            setWhatsappAccounts(response.results || response);
        } catch (error) {
            console.error("Error getting whatsapp accounts", error);
        }
    };

    const handleShowViewModal = (message) => {
        setSelectedMessage(message);
        setShowViewModal(true);
    };

    const handleCloseViewModal = () => {
        setSelectedMessage(null);
        setShowViewModal(false);
    };

    const handleShowDeleteModal = (message) => {
        setMessageToDelete(message);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setMessageToDelete(null);
        setShowDeleteModal(false);
    };

    const handleDeleteMessage = async () => {
        if (messageToDelete) {
            try {
                await deleteMessage(messageToDelete.id);
                showNotification("Message deleted successfully.");
                fetchMessages();
                handleCloseDeleteModal();
            } catch (error) {
                showNotification("Error deleting message.");
            }
        }
    };

    const showNotification = (msg) => {
        setNotificationMessage(msg);
        setShowNotificationModal(true);
    };

    const filteredMessages = messages.filter((msg) =>
        msg.sender.toLowerCase().includes(search.toLowerCase()) ||
        msg.receiver.toLowerCase().includes(search.toLowerCase()) ||
        msg.message.toLowerCase().includes(search.toLowerCase())
    );

    const currentItems = filteredMessages.slice(
        (currentPage - 1) * messagesPerPage,
        currentPage * messagesPerPage
    );

    const processedMessages = currentItems.map((msg) => {
        const whatsappAccount = whatsappAccounts.find(acc => acc.id === msg.whatsapp);
        const instanceData = instances.find(inst => inst.id === msg.instance);

        return {
            ...msg,
            whatsapp_number: whatsappAccount?.phone_number || "N/A",
            instance_key: instanceData?.instance_key || "N/A"
        };
    });

    return (
        <div className="messages-page">
            <Sidebar />
            <div className="admin-menu-container">
                <AdminMenu />
            </div>
            <div className="admin-content">
                <Topbar />
                <Container fluid className="p-4">
                    <h2><FaComments color="#B71C1C" /> Messages</h2>
                    <Row className="mb-3">
                        <Col md={7}>
                            <Form.Control
                                type="text"
                                placeholder="Search message..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Col>
                    </Row>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>WhatsApp</th>
                                <th>Instance</th>
                                <th>Message</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {processedMessages.map((msg) => (
                                <tr key={msg.id}>
                                    <td>{msg.status}</td>
                                    <td>{msg.whatsapp_number}</td>
                                    <td>{msg.instance_key}</td>
                                    <td>{msg.message.length > 30 ? msg.message.slice(0, 30) + "..." : msg.message}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <Button size="sm" variant="outline-info" onClick={() => handleShowViewModal(msg)} title="View Details">
                                                <FaEye /> View
                                            </Button>{" "}
                                            <Button size="sm" variant="outline-danger" onClick={() => handleShowDeleteModal(msg)} title="Delete Message">
                                                <FaTrash /> Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Pagination className="justify-content-center">
                        {Array.from({ length: Math.ceil(filteredMessages.length / messagesPerPage) }, (_, i) => (
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

                {/* View Modal */}
                <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Message Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedMessage && (
                            <>
                                <p><strong>Receiver:</strong> {selectedMessage.receiver}</p>
                                <p><strong>Status:</strong> {selectedMessage.status}</p>
                                <p><strong>Type of Message:</strong> {selectedMessage.message_type}</p>
                                <p><strong>WhatsApp Account Number:</strong> {whatsappAccounts.find(acc => acc.id === selectedMessage?.whatsapp)?.phone_number || "N/A"}</p>
                                <p><strong>Instance Key:</strong> {instances.find(ins => ins.id === selectedMessage?.instance)?.instance_key || "N/A"}</p>
                                <p><strong>Message:</strong> {selectedMessage.message}</p>
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseViewModal}>Close</Button>
                    </Modal.Footer>
                </Modal>

                {/* Delete Modal */}
                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {messageToDelete && (
                            <p>Are you sure you want to delete this message from <strong>{messageToDelete.sender}</strong> to <strong>{messageToDelete.receiver}</strong>?</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeleteModal}>Cancel</Button>
                        <Button variant="danger" onClick={handleDeleteMessage}>Delete</Button>
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
        </div>
    );
};

export default Messages;