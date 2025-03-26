import React, { useEffect, useState } from "react";
import { getInstances, createInstance, deleteInstance, getPlans, getWhatsAppAccounts } from "../../../services/api";
import { Container, Row, Col, Table, Button, Form, Modal, Pagination } from "react-bootstrap";
import { FaServer, FaPlus, FaTrash, FaEye } from "react-icons/fa";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import AdminMenu from "../../../components/AdminMenu/AdminMenu";
import { Formik } from "formik";
import * as Yup from "yup";
import "./Instances.css";

const Instances = () => {
    const [instances, setInstances] = useState([]);
    const [plans, setPlans] = useState([]);
    const [whatsappAccounts, setWhatsappAccounts] = useState([]);
    const [search, setSearch] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedInstance, setSelectedInstance] = useState(null);
    const [instanceToDelete, setInstanceToDelete] = useState(null);
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchInstances();
        fetchPlans();
        fetchWhatsAppAccounts();
    }, []);

    const fetchInstances = async () => {
        try {
            const response = await getInstances();
            setInstances(response.results || response);
        } catch (error) {
            console.error("Error getting instances", error);
        }
    };

    const fetchPlans = async () => {
        try {
            const response = await getPlans();
            setPlans(response.results || response);
        } catch (error) {
            console.error("Error getting plans", error);
        }
    };

    const fetchWhatsAppAccounts = async () => {
        try {
            const response = await getWhatsAppAccounts();
            setWhatsappAccounts(response.results || response);
        } catch (error) {
            console.error("Error fetching WhatsApp accounts", error);
        }
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        plan: Yup.string().required("Plan is required"),
        whatsapp: Yup.string().required("WhatsApp is required"),
    });


    const handleCreate = () => setShowCreateModal(true);
    const handleCloseCreateModal = () => setShowCreateModal(false);
    const handleShowView = (instance) => {
        setSelectedInstance(instance);
        setShowViewModal(true);
    };
    const handleCloseViewModal = () => {
        setSelectedInstance(null);
        setShowViewModal(false);
    };

    const handleShowDelete = (instance) => {
        setInstanceToDelete(instance);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setInstanceToDelete(null);
        setShowDeleteModal(false);
    };

    const showNotification = (message) => {
        setNotificationMessage(message);
        setShowNotificationModal(true);
    };

    const handleDeleteInstance = async () => {
        try {
            await deleteInstance(instanceToDelete.id);
            fetchInstances();
            handleCloseDeleteModal();
            showNotification("Instance deleted successfully.");
        } catch (error) {
            console.error(error);
            showNotification("Error deleting instance.");
        }
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const payload = {
                name: values.name,
                plan: values.plan,
                whatsapp: values.whatsapp,
                session_data: "{}"
            };

            await createInstance(payload);
            fetchInstances();
            handleCloseCreateModal();
            showNotification("Instance created successfully.");
        } catch (error) {
            console.error("Error creating instance", error.response?.data || error.message);
            showNotification("Error creating instance. Please try again.");
        }
        setSubmitting(false);
    };


    const filteredInstances = instances.filter((item) =>
        item.instance_key?.toLowerCase().includes(search.toLowerCase())
    );

    const paginated = filteredInstances.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="instances-page">
            <Sidebar />
            <div className="admin-menu-container">
                <AdminMenu />
            </div>
            <div className="admin-content">
                <Topbar />
                <Container fluid className="p-4">
                    <h2><FaServer color="purple" /> Instances</h2>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Control
                                placeholder="Search by name"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Col>
                        <Col md={3}>
                            <Button variant="success" onClick={handleCreate}>
                                <FaPlus /> Add Instance
                            </Button>
                        </Col>
                    </Row>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>Instance Key</td>
                                <td>WhatsApp Account</td>
                                <td>Created At</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.instance_key}</td>
                                    <td>{whatsappAccounts.find((wp) => wp.id === item.whatsapp)?.name || "N/A"} - {whatsappAccounts.find((wp) => wp.id === item.whatsapp)?.phone_number || "N/A"}</td>
                                    <td>{new Date(item.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <Button size="sm" variant="outline-info" onClick={() => handleShowView(item)}>
                                            <FaEye /> View
                                        </Button>{" "}
                                        <Button size="sm" variant="outline-danger" onClick={() => handleShowDelete(item)}>
                                            <FaTrash /> Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Pagination className="justify-content-center">
                        {[...Array(Math.ceil(filteredInstances.length / itemsPerPage)).keys()].map((num) => (
                            <Pagination.Item
                                key={num}
                                active={num + 1 === currentPage}
                                onClick={() => setCurrentPage(num + 1)}
                            >
                                {num + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Container>

                {/* Modal Create Instance */}
                <Modal show={showCreateModal} onHide={handleCloseCreateModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Instance</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={{ name: "", plan: "", whatsapp: "" }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ values, handleChange, handleSubmit, errors, touched }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            isInvalid={!!errors.name && touched.name}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Plan</Form.Label>
                                        <Form.Select
                                            name="plan"
                                            value={values.plan}
                                            onChange={handleChange}
                                            isInvalid={!!errors.plan && touched.plan}
                                        >
                                            <option value="">Select a Plan</option>
                                            {plans.map((plan) => (
                                                <option key={plan.id} value={plan.id}>
                                                    {plan.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">{errors.plan}</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>WhatsApp Account</Form.Label>
                                        <Form.Select
                                            name="whatsapp"
                                            value={values.whatsapp}
                                            onChange={handleChange}
                                            isInvalid={!!errors.whatsapp && touched.whatsapp}
                                        >
                                            <option value="">Select WhatsApp Account</option>
                                            {whatsappAccounts.map((wa) => (
                                                <option key={wa.id} value={wa.id}>
                                                    {wa.name || `Account ${wa.id}`}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">{errors.whatsapp}</Form.Control.Feedback>
                                    </Form.Group>

                                    <Modal.Footer>
                                        <Button variant="success" type="submit">Create</Button>
                                    </Modal.Footer>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                </Modal>

                {/* Modal View Instance */}
                <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>🔍 View Instance</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedInstance && (
                            <>
                                <p><strong>ID:</strong> {selectedInstance.id}</p>
                                <p><strong>Instance Key:</strong> {selectedInstance.instance_key}</p>
                                <p><strong>WhatsApp Account:</strong> {whatsappAccounts.find((wp) => wp.id === selectedInstance.whatsapp)?.name || "N/A"} - {whatsappAccounts.find((wp) => wp.id === selectedInstance.whatsapp)?.phone_number || "N/A"}</p>
                                <p><strong>Created At:</strong> {new Date(selectedInstance.created_at).toLocaleString()}</p>
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseViewModal}>Close</Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal Delete Instance */}
                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                    <Modal.Header>
                        <Modal.Title>⚠️ Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete the Instance <strong>{instanceToDelete?.instance_key}</strong>?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeleteModal}>Cancel</Button>
                        <Button variant="danger" onClick={handleDeleteInstance}>Delete</Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal Notification */}
                <Modal show={showNotificationModal} onHide={() => setShowNotificationModal(false)} centered>
                    <Modal.Header>
                        <Modal.Title>🔔 Notification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{notificationMessage}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => setShowNotificationModal(false)}>OK</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Instances;
