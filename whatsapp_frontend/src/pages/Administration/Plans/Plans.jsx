import React, { useEffect, useState } from "react";
import { getPlans, createPlan, updatePlan, deletePlan, getUsers } from "../../../services/api";
import { Container, Row, Col, Table, Button, Form, Modal, Pagination } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash, FaEye, FaDatabase } from "react-icons/fa";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import AdminMenu from "../../../components/AdminMenu/AdminMenu";
import { Formik } from "formik";
import * as Yup from "yup";
import "./Plans.css"

const Plans = () => {
    const [plans, setPlans] = useState([]);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [show, setShow] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedPlanDetails, setSelectedPlanDetails] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [planToDelete, setPlanToDelete] = useState(null);
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [planUserCount, setPlanUserCount] = useState({});
    const [notificationMessage, setNotificationMessage] = useState("");
    const plansPerPage = 5;

    useEffect(() => {
        fetchPlans();
        fetchUsers();
    }, []);

    const fetchPlans = async () => {
        try {
            const response = await getPlans();
            setPlans(response.results);
        } catch (error) {
            console.error("Error obtaining plans", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.results);

            const countByPlan = {};
            response.results.forEach(user => {
                countByPlan[user.plan] = (countByPlan[user.plan] || 0) + 1;
            });
            setPlanUserCount(countByPlan);
        } catch (error) {
            console.error("Error getting users.", error);
        }
    };

    const handleShow = (plan) => {
        setSelectedPlan(plan);
        setShow(true);
    };

    const handleClose = () => {
        setSelectedPlan(null);
        setShow(false);
    };

    const handleShowViewPlan = (plan) => {
        const filteredUsers = users.filter(user => user.plan === plan.id);
        setSelectedPlanDetails({ ...plan, users: filteredUsers});
        setShowViewModal(true);
    };

    const handleCloseViewPlan = () => {
        setSelectedPlanDetails(null);
        setShowViewModal(false);
    };

    const handleShowDeletePlan = (plan) => {
        setPlanToDelete(plan);
        setShowDeleteModal(true);
    };

    const handleCloseDeletePlan = () => {
        setPlanToDelete(null);
        setShowDeleteModal(false);
    };

    const handleDetelePlan = async () => {
        if (planToDelete) {
            try {
                await deletePlan(planToDelete.id);
                showNotification(`Plan "${planToDelete.name}" successfully deleted.`);
                fetchPlans();
                handleCloseDeletePlan();
            } catch (error) {
                showNotification("Error deleting plan. Please try again.");
            }
        }
    };

    const showNotification = (message) => {
        setNotificationMessage(message);
        setShowNotificationModal(true);
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("The name of plan is mandatory"),
        whatsapp_limit: Yup.number().required("Whatsapp limit is required"),
        message_limit: Yup.number().required("Message limit is required"),
        automated_replies: Yup.number().required("Automated replies limit is required"),
        simultaneous_campaigns: Yup.number().required("Simultaneous campaigns limit is required"),
        contact_groups: Yup.number().required("Contact groups limit is required"),
        contacts_per_group: Yup.number().required("Contacts per group limit is required"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const formattedValues = {
                ...values,
                whatsapp_limit: Number(values.whatsapp_limit),
                message_limit: Number(values.message_limit),
                automated_replies: Number(values.automated_replies),
                simultaneous_campaigns: Number(values.simultaneous_campaigns),
                contact_groups: Number(values.contact_groups),
                contacts_per_group: Number(values.contacts_per_group),
            };

            if (selectedPlan?.id) {
                await updatePlan(selectedPlan.id, formattedValues);
                showNotification("Plan updated successfully.");
            } else {
                await createPlan(formattedValues);
                showNotification("Plan created successfully.");
            }

            fetchPlans();
            handleClose();
        } catch (error) {
            console.error("Error saving plan", error.response?.data || error.message);
            showNotification("Error saving plan. Please try again.");
        }

        setSubmitting(false);
    };


    const indexOfLastPlan = currentPage * plansPerPage;
    const indexOfFirstPlan = indexOfLastPlan - plansPerPage;
    const currentPlans = plans.slice(indexOfFirstPlan, indexOfLastPlan);

    return (
        <div className="plans-page">
            <Sidebar />
            <div className="admin-menu-container">
                <AdminMenu />
            </div>
            <div className="admin-content">
                <Topbar />
                <Container fluid className="p-4">
                    <h2><FaDatabase color="#AA00FF"/> Plans</h2>
                    <Row className="mb-3">
                        <Col md={7}>
                            <Form.Control
                                type="text"
                                placeholder="Search plan..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Col>
                        <Col md={5}>
                            <Button variant="success" onClick={() => handleShow(null)}><FaPlus />Create Plan</Button>
                        </Col>
                    </Row>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Plan Name</th>
                                <th>Whatsapp Limit</th>
                                <th>Message Limit</th>
                                <th>Number of Users</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPlans.map((plan) => (
                                <tr key={plan.id}>
                                    <td>{plan.id}</td>
                                    <td>{plan.name}</td>
                                    <td>{plan.whatsapp_limit} account{plan.whatsapp_limit !== 1 ? "s" : ""}</td>
                                    <td>{plan.message_limit}</td>
                                    <td>{planUserCount[plan.id] || 0}</td>
                                    <td>
                                        <Button variant="outline-info" size="sm" onClick={() => handleShowViewPlan(plan)}>
                                            <FaEye /> View
                                        </Button>
                                        <Button variant="outline-primary" size="sm" onClick={() => handleShow(plan)}>
                                            <FaEdit /> Edit
                                        </Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleShowDeletePlan(plan)}>
                                            <FaTrash /> Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Pagination className="custom-pagination justify-content-center">
                        {Array.from({ length: Math.ceil(plans.length / plansPerPage) }, (_, index) => (
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
            {/* Modal View Plan */}
            <Modal show={showViewModal} onHide={handleCloseViewPlan} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Plan Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedPlanDetails && (
                        <div>
                            <p><strong>ID:</strong> {selectedPlanDetails.id}</p>
                            <p><strong>Name:</strong> {selectedPlanDetails.name}</p>
                            <p><strong>Whatsapp Limit:</strong> {selectedPlanDetails.whatsapp_limit}</p>
                            <p><strong>Message Limit:</strong> {selectedPlanDetails.message_limit}</p>
                            <p><strong>Automated Replies:</strong> {selectedPlanDetails.automated_replies}</p>
                            <p><strong>Simultaneous Campaigns:</strong> {selectedPlanDetails.simultaneous_campaigns}</p>
                            <p><strong>Contact Groups:</strong> {selectedPlanDetails.contact_groups}</p>
                            <p><strong>Contacts per Group:</strong> {selectedPlanDetails.contacts_per_group}</p>
                            <p><strong>Number of Users:</strong> {planUserCount[selectedPlanDetails.id] || 0}</p>
                            {selectedPlanDetails.users && selectedPlanDetails.users.length > 0 ? (
                                <div style={{maxHeight:"300px", overflowY: "auto", border:"1px solid #ccc", padding:"10px", borderRadius:"5px"}}>
                                    <h5>Users with this plan:</h5>
                                    <ul style={{listStyle: "none", padding: 0}}>
                                        {selectedPlanDetails.users.map(user => (
                                            <li key={user.id} style={{padding: "5px 0", borderBottom: "1px solid #eee"}}>
                                                {user.first_name} {user.last_name} ({user.email})
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            ): (
                                <p>No users are assigned to this plan</p>
                            )}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseViewPlan}>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Create/Edit Plan */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedPlan?.id ? "Edit Plan" : "Create Plan"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            name: selectedPlan?.name || "",
                            whatsapp_limit: selectedPlan?.whatsapp_limit || 1,
                            message_limit: selectedPlan?.message_limit || 100,
                            automated_replies: selectedPlan?.automated_replies || 100,
                            simultaneous_campaigns: selectedPlan?.simultaneous_campaigns || 2,
                            contact_groups: selectedPlan?.contact_groups || 50,
                            contacts_per_group: selectedPlan?.contacts_per_group || 2000,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Plan Name</Form.Label>
                                    <Form.Control type="text" name="name" value={values.name} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>WhatsApp Limit</Form.Label>
                                    <Form.Control type="number" name="whatsapp_limit" value={values.whatsapp_limit} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Message Limit</Form.Label>
                                    <Form.Control type="number" name="message_limit" value={values.message_limit} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Automated Replies</Form.Label>
                                    <Form.Control type="number" name="automated_replies" value={values.automated_replies} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Simultaneous Campaigns</Form.Label>
                                    <Form.Control type="number" name="simultaneous_campaigns" value={values.simultaneous_campaigns} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Contact Groups</Form.Label>
                                    <Form.Control type="number" name="contact_groups" value={values.contact_groups} onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Contacts per Group</Form.Label>
                                    <Form.Control type="number" name="contacts_per_group" value={values.contacts_per_group} onChange={handleChange} />
                                </Form.Group>

                                {/* Botón de guardar alineado a la derecha */}
                                <Modal.Footer className="d-flex justify-content-end">
                                    <Button type="submit" variant="success">Save</Button>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>


            {/* Modal Delete Plan */}
            <Modal show={showDeleteModal} onHide={handleCloseDeletePlan} centered>
                <Modal.Header closeButton>
                    <Modal.Title>⚠️ Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {planToDelete && (
                        <p>Are you sure want to delete the plan <strong>{planToDelete.name}</strong>? This action cannot be undone.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeletePlan}>❌ Cancel</Button>
                    <Button variant="danger" onClick={handleDetelePlan}>🗑 Delete</Button>
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
    );
};

export default Plans;