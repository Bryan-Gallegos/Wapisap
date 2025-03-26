import React, { useEffect, useState } from "react";
import { getPlans, getPermissions, createPermission, updatePermission, createNewPermission, deletePermission } from "../../../services/api";
import { Container, Row, Col, Table, Button, Form, Modal, Pagination } from "react-bootstrap";
import { FaKey, FaPlus, FaTrash, FaEdit, FaEye } from "react-icons/fa";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import AdminMenu from "../../../components/AdminMenu/AdminMenu";
import { Formik } from "formik";
import * as Yup from "yup";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./Permissions.css";

const Permissions = () => {
    const [permissions, setPermissions] = useState([]);
    const [plans, setPlans] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedPlanFilter, setSelectedPlanFilter] = useState("");
    const [show, setShow] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPermission, setSelectedPermission] = useState(null);
    const [selectedPermissionDetails, setSelectedPermissionDetails] = useState(null);
    const [permissionToDelete, setPermissionToDelete] = useState(null);
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [permissionText, setPermissionText] = useState("");
    const [selectedPlan, setSelectedPlan] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchPermissions();
        fetchPlans();
    }, []);

    const fetchPermissions = async () => {
        try {
            const response = await getPermissions();
            setPermissions(response.results || response);
        } catch (error) {
            console.error("Error getting permissions", error);
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

    const handleShow = (permission) => {
        if (permission) {
            setSelectedPermission(permission);
            setPermissionText(permission.permission.name || "");
            setSelectedPlan(permission.plan || "");
        } else {
            setSelectedPermission(null);
            setPermissionText("");
            setSelectedPlan("");
        }
        setShow(true);
    };

    const handleClose = () => {
        setSelectedPermission(null);
        setPermissionText("");
        setSelectedPlan("");
        setShow(false);
    };

    const handleShowViewModal = (permission) => {
        setSelectedPermissionDetails(permission);
        setPermissionText(permission?.permission);
        setSelectedPlan(permission?.plan);
        setShowViewModal(true);
    };

    const handleCloseViewModal = () => {
        setSelectedPermissionDetails(null);
        setPermissionText("");
        setSelectedPlan("");
        setShowViewModal(false);
    };

    const handleShowDeletePermission = (permission) => {
        setPermissionToDelete(permission);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setPermissionToDelete(null);
        setShowDeleteModal(false);
    };

    const validationSchema = Yup.object().shape({
        permission: Yup.string().required("Permission is required"),
        plan: Yup.string().required("Plan is required"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            if (selectedPermission?.id) {
                const permissionPayload = { name: values.permission.trim() };
                await updatePermission(selectedPermission.permission.id, permissionPayload);

                showNotification("Permission upload successfully.");
            } else {
                const permissionPayload = { name: values.permission.trim() };
                const createdPermission = await createNewPermission(permissionPayload);

                const relationPayload = {
                    plan: values.plan,
                    permission_id: createdPermission.id
                };

                await createPermission(relationPayload);
                showNotification("Permission assigned to plan successfully.");
            }

            fetchPermissions();
            handleClose();
        } catch (error) {
            console.error("Error saving permission", error.response?.data || error.message);
            showNotification("Error saving permission. Please try again.");
        }

        setSubmitting(false);
    };

    const showNotification = (message) => {
        setNotificationMessage(message);
        setShowNotificationModal(true);
    };

    const handleDeletePermission = async () => {
        if (permissionToDelete) {
            try {
                await deletePermission(permissionToDelete.id);
                showNotification("Permission deleted successfully.");
                fetchPermissions();
                handleCloseDeleteModal();
            } catch (error) {
                showNotification("Error deleting permission. Please try again");
            }
        }
    };

    const filteredPermissions = permissions.filter((perm) =>
        (perm.permission?.name?.toLowerCase().includes(search.toLowerCase()) ||
            perm.plan?.name?.toLowerCase().includes(search.toLowerCase())) &&
        (selectedPlanFilter === "" || perm.plan === parseInt(selectedPlanFilter))
    );

    const paginationPermissions = filteredPermissions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(14);
        doc.text("Lista de Permisos", 14, 15);
      
        const data = filteredPermissions.map((perm) => [
          perm.id,
          perm.permission?.name || "",
          plans.find((p) => p.id === perm.plan)?.name || "N/A",
        ]);
      
        autoTable(doc, {
            startY: 20,
            head: [["#", "Permission", "Plan"]],
            body: data,
            styles: { fontSize: 10 },
            headStyles: { fillColor: [41, 128, 185] },
            alternateRowStyles: { fillColor: [245, 245, 245] },
            margin: { top: 10 }
          });
      
        doc.save("permissions.pdf");
        showNotification("✅ PDF generated correctly");
      };

    return (
        <div className="permissions-page">
            <Sidebar />
            <div className="admin-menu-container">
                <AdminMenu />
            </div>
            <div className="admin-content">
                <Topbar />
                <Container fluid className="p-4">
                    <h2><FaKey color="green" /> Permissions</h2>
                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Control
                                placeholder="Search by permission"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Col>

                        <Col md={2}>
                            <Form.Select
                                value={selectedPlanFilter}
                                onChange={(e) => setSelectedPlanFilter(e.target.value)}
                            >
                                <option value="">All Plans</option>
                                {plans.map((plan) => (
                                    <option key={plan.id} value={plan.id}>
                                        {plan.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>

                        <Col md={2}>
                            <Button variant="success" onClick={() => handleShow(null)}>
                                <FaPlus /> Add Permission
                            </Button>
                        </Col>

                        <Col md={2}>
                            <Button variant="outline-secondary" onClick={handleExportPDF}>
                                📄 Export to PDF
                            </Button>
                        </Col>
                    </Row>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>Permission</td>
                                <td>Plan</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {paginationPermissions.map((perm) => (
                                <tr key={perm.id}>
                                    <td>{perm.id}</td>
                                    <td>{perm.permission?.name}</td>
                                    <td>{plans.find((p) => p.id === perm.plan)?.name || "N/A"}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <Button size="sm" variant="outline-info" onClick={() => handleShowViewModal(perm)} title="View Details">
                                                <FaEye /> View
                                            </Button>{" "}
                                            <Button size="sm" variant="outline-primary" onClick={() => handleShow(perm)} title="Edit Permission">
                                                <FaEdit /> Edit
                                            </Button>
                                            <Button size="sm" variant="outline-danger" onClick={() => handleShowDeletePermission(perm)} title="Delete Permission">
                                                <FaTrash /> Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>


                    <Pagination className="justify-content-center">
                        {[...Array(Math.ceil(filteredPermissions.length / itemsPerPage)).keys()].map((num) => (
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

                {/* Modal View Permission */}
                <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>🔐 Permission Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedPermissionDetails && (
                            <div className="p-2">
                                <p><strong>ID:</strong> {selectedPermissionDetails.id}</p>
                                <p><strong>Permission:</strong> {selectedPermissionDetails.permission?.name}</p>
                                <p><strong>Plan:</strong> {plans.find(p => p.id === selectedPermissionDetails.plan)?.name || "N/A"}</p>
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
                        <Modal.Title>{selectedPermission?.id ? "Edit Permission" : "Create Permission"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                permission: selectedPermission?.permission.name || "",
                                plan: selectedPermission?.plan || "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ values, handleChange, handleSubmit, errors, touched }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Permission</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="permission"
                                            value={values.permission}
                                            onChange={handleChange}
                                            isInvalid={!!errors.permission && touched.permission}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.permission}</Form.Control.Feedback>
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

                                    <Modal.Footer className="d-flex justify-content-end">
                                        <Button variant="success" type="submit">Save</Button>
                                    </Modal.Footer>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
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
                        <Button variant="primary" onClick={() => setShowNotificationModal(false)}>Accept</Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal Delete Permission */}
                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                    <Modal.Header>
                        <Modal.Title>⚠️ Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {permissionToDelete && (
                            <p>Are you sure you want to delete the permission <strong>{permissionToDelete.permission?.name}</strong>?</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeleteModal}>❌ Cancel</Button>
                        <Button variant="primary" onClick={handleDeletePermission}>🗑 Delete</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Permissions;
