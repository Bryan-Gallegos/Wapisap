import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import AdminMenu from "../../../components/AdminMenu/AdminMenu";
import { getRoles, getUsers, deleteUser, createUser, updateUser, getPlans } from "../../../services/api";
import { Container, Row, Col, Table, Button, Form, Modal, Pagination } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { FaPlus, FaUsers } from "react-icons/fa";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState({});
  const [rolesList, setRolesList] = useState([]);
  const [plans, setPlans] = useState({});
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [showEditExpireDate, setShowEditExpireDate] = useState(false);
  const [selectedUserExpireDate, setSelectedUserExpireDate] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showEditPlan, setShowEditPlan] = useState(false);
  const [selectedUserPlan, setSelectedUserPlan] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const usersPerPage = 5;

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchPlans();
    fetchRolesList();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response || []);
    } catch (error) {
      console.error("Error getting users", error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await getRoles();
      const rolesMap = {};
      (response || []).forEach(role => {
        rolesMap[role.id] = role.name;
      });
      setRoles(rolesMap);
    } catch (error) {
      console.error("Error getting roles", error);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await getPlans();
      const plansMap = {};
      (response || []).forEach(plan => {
        plansMap[plan.id] = plan.name;
      });
      setPlans(plansMap);
    } catch (error) {
      console.error("Error getting plans", error);
    }
  };

  const fetchRolesList = async () => {
    try {
      const response = await getRoles();
      if (response && Array.isArray(response)) {
        setRolesList(response);
      } else {
        setRolesList([]);
      }
    } catch (error) {
      console.error("Error getting roles list", error);
      setRolesList([]);
    }
  };

  const handleShow = (user) => {
    setSelectedUser(user);
    setShow(true);
  };

  const handleClose = () => {
    setSelectedUser(null);
    setShow(false);
  };

  const handleShowUserDetails = (user) => {
    setSelectedUserDetails(user);
    setShowUserDetails(true);
  };

  const handleCloseUserDetails = () => {
    setSelectedUserDetails(null);
    setShowUserDetails(false);
  };

  const handleShowEditExpireDate = (user) => {
    setSelectedUserExpireDate(user);
    setShowEditExpireDate(true);
  };

  const handleCloseEditExpireDate = () => {
    setSelectedUserExpireDate(null);
    setShowEditExpireDate(false);
  };

  const handleUpdateExpireDate = async (values, { setSubmitting }) => {
    try {
      const updatedUser = {
        expire_date: values.expire_date
      };

      await updateUser(selectedUserExpireDate.id, updatedUser);
      showNotification("Expiration date updated successfully.");
      fetchUsers();
      handleCloseEditExpireDate();
    } catch (error) {
      showNotification("Error updating expiration date.");
    }
    setSubmitting(false);
  };

  const handleShowDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteUser = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete.id);
        showNotification("User deleted successfully.");
        fetchUsers();
        handleCloseDeleteUser();
      } catch (error) {
        showNotification("Error deleting user.");
      }
    }
  };

  const showNotification = (message) => {
    setNotificationMessage(message);
    setShowNotificationModal(true);
  };

  const handleShowEditPlan = (user) => {
    setSelectedUserPlan(user);
    setShowEditPlan(true);
  };

  const handleCloseEditPlan = () => {
    setSelectedUserPlan(null);
    setShowEditPlan(false);
  };

  const handleUpdatePlan = async (values, { setSubmitting }) => {
    try {
      const updatedUser = { plan: values.plan };

      await updateUser(selectedUserPlan.id, updatedUser);
      showNotification("Plan updated successfully.");
      fetchUsers();
      handleCloseEditPlan();
    } catch (error) {
      showNotification("Error updating plan.");
    }

    setSubmitting(false);
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("The username is required"),
    first_name: Yup.string().required("The name is required"),
    last_name: Yup.string().required("The last name is required"),
    email: Yup.string().email("Invalid email").required("The email is required"),
    password: Yup.string().when("isNewUser", {
      is: true,
      then: (schema) => schema.required("The password is required")
    }),
    role: Yup.string().required("The role is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const userData = {
        username: values.username,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        role: values.role,
        plan: values.plan || null,
        expire_date: values.expire_date || null,
      };

      if (values.password) {
        userData.password = values.password;
      }

      if (selectedUser) {
        await updateUser(selectedUser.id, userData);
        showNotification("User updated successfully.");
      } else {
        await createUser(userData);
        showNotification("User created successfully.");
      }

      fetchUsers();
      handleClose();
    } catch (error) {
      console.error("Error saving user", error);
      showNotification("Error saving user.");
    }
    setSubmitting(false);
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    const matchesSearch =
      fullName.includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
  
    const matchesRole = selectedRole ? user.role === parseInt(selectedRole) : true;
    const matchesPlan = selectedPlan ? user.plan === parseInt(selectedPlan) : true;
  
    return matchesSearch && matchesRole && matchesPlan;
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="users-page">
      <Sidebar />
      <div className="admin-menu-container">
        <AdminMenu />
      </div>
      <div className="admin-content">
        <Topbar />
        <Container fluid className="p-4">
          <h2><FaUsers color="#007bff" /> Users</h2>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Search user..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>

            <Col md={3}>
              <Form.Select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                <option value="">Filter by Role</option>
                {rolesList.map((role) => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
                <option value="">Filter by Plan</option>
                {Object.entries(plans).map(([planId, planName]) => (
                  <option key={planId} value={planId}>{planName}</option>
                ))}
              </Form.Select>
            </Col>

            <Col md={2}>
              <Button variant="success" onClick={() => handleShow(null)}><FaPlus /> Create User</Button>
            </Col>
          </Row>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Plan</th>
                <th>Expire Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.first_name} {user.last_name}</td>
                  <td>{user.email}</td>

                  {/* Role with style */}
                  <td>
                    <span className={`role-badge role-${roles[user.role] || "default"}`}>
                      {roles[user.role] || "Sin rol"}
                    </span>
                  </td>

                  {/* Plan with style */}
                  <td>
                    <span className="plan-badge">
                      {plans[user.plan] || "Sin plan"}
                    </span>
                  </td>

                  {/* Expire Date with style and format date */}
                  <td>
                    <span className="expire-date-badge">
                      {user.expire_date ? new Date(user.expire_date + "T00:00:00").toLocaleDateString() : "Forever"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="action-buttons">
                      <Button
                        variant="outline-info"
                        size="sm"
                        onClick={() => handleShowUserDetails(user)}
                        title="View Details"
                      >
                        👁 View
                      </Button>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleShow(user)}
                        title="Edit User"
                      >
                        ✏️ Edit
                      </Button>
                      <Button
                        variant="outli-warning"
                        size="sm"
                        onClick={() => handleShowEditPlan(user)}
                        title="Edit Plan"
                      >
                        📜 Edit Plan
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleShowDeleteUser(user)}
                        title="Delete User"
                      >
                        🗑 Delete
                      </Button>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleShowEditExpireDate(user)}
                        title="Edit Expire Date"
                      >
                        ✏️ Edit Expire Date
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>


          {/* Pagination */}
          <Pagination className="custom-pagination">
            {[...Array(Math.ceil(filteredUsers.length / usersPerPage)).keys()].map(number => (
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

      {/* Add/Edit User Modal with Formik */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedUser ? "✏️ Edit User" : "➕ Create User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              username: selectedUser?.username || "",
              first_name: selectedUser?.first_name || "",
              last_name: selectedUser?.last_name || "",
              email: selectedUser?.email || "",
              password: "",
              role: selectedUser?.role || "",
              plan: selectedUser?.plan || null,
              expire_date: selectedUser?.expire_date || null,
              isNewUser: selectedUser ? false : true,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <Form onSubmit={handleSubmit} className="modal-form">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>👤 Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        isInvalid={touched.username && !!errors.username}
                      />
                      <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  {!selectedUser && (
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>🔒 Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          isInvalid={touched.password && !!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  )}
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>👤 First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="first_name"
                        value={values.first_name}
                        onChange={handleChange}
                        isInvalid={touched.first_name && !!errors.first_name}
                      />
                      <Form.Control.Feedback type="invalid">{errors.first_name}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>👤 Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="last_name"
                        value={values.last_name}
                        onChange={handleChange}
                        isInvalid={touched.last_name && !!errors.last_name}
                      />
                      <Form.Control.Feedback type="invalid">{errors.last_name}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>📧 Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>🛠 Role</Form.Label>
                  <Form.Select name="role" value={values.role} onChange={handleChange}>
                    <option value="">Select a role</option>
                    {rolesList.map((role) => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <div className="modal-buttons">
                  <Button variant="secondary" onClick={handleClose}>❌ Cancel</Button>
                  <Button variant="success" type="submit">💾 Save</Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      {/* Modal Edit Expire Date */}
      <Modal show={showEditExpireDate} onHide={handleCloseEditExpireDate} centered>
        <Modal.Header closeButton>
          <Modal.Title>📆 Edit Expire Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              username: selectedUserExpireDate?.username || "",
              password: "", // A password must be entered
              expire_date: selectedUserExpireDate?.expire_date || "",
            }}
            onSubmit={handleUpdateExpireDate}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="modal-form">

                {/* Username */}
                <Form.Group className="mb-3">
                  <Form.Label>👤 Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Expire Date */}
                <Form.Group className="mb-3">
                  <Form.Label>📅 Expire Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="expire_date"
                    value={values.expire_date}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="modal-buttons">
                  <Button variant="secondary" onClick={handleCloseEditExpireDate}>
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

      {/* View modal for viewing user data */}
      <Modal show={showUserDetails} onHide={handleCloseUserDetails} centered>
        <Modal.Header closeButton>
          <Modal.Title>👤 User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUserDetails && (
            <div className="user-details">
              <p><strong>👤 Username:</strong> {selectedUserDetails.username}</p>
              <p><strong>📧 Email:</strong> {selectedUserDetails.email}</p>
              <p><strong>👤 First Name:</strong> {selectedUserDetails.first_name}</p>
              <p><strong>👤 Last Name:</strong> {selectedUserDetails.last_name}</p>
              <p><strong>🛠 Role:</strong> {roles[selectedUserDetails.role] || "Sin rol"}</p>
              <p><strong>📜 Plan:</strong> {plans[selectedUserDetails.plan] || "Sin plan"}</p>
              <p><strong>🕒 Expire Date:</strong> {selectedUserDetails.expire_date ? new Date(selectedUserDetails.expire_date).toLocaleDateString() : "Forever"}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseUserDetails}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete modal to delete a user */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteUser} centered>
        <Modal.Header closeButton>
          <Modal.Title>❌ Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userToDelete && (
            <p>Are you sure you want to remove <strong>{userToDelete.first_name} {userToDelete.last_name}</strong>?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteUser}>
            ❌ Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            🗑 Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Notification */}
      <Modal show={showNotificationModal} onHide={() => {
        setShowNotificationModal(false);
      }} centered>
        <Modal.Header closeButton>
          <Modal.Title>🔔 Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{notificationMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => {
            setShowNotificationModal(false);
          }}>
            Accept
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Edit Plan */}
      <Modal show={showEditPlan} onHide={handleCloseEditPlan} centered>
        <Modal.Header closeButton>
          <Modal.Title>📜 Edit User Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              plan: selectedUserPlan?.plan || "",
            }}
            onSubmit={handleUpdatePlan}
          >
            {({ values, handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="modal-form">

                {/* Seleccionar Plan */}
                <Form.Group className="mb-3">
                  <Form.Label>📜 Select Plan</Form.Label>
                  <Form.Select name="plan" value={values.plan} onChange={handleChange}>
                    <option value="">Select a Plan</option>
                    {Object.keys(plans).map((planId) => (
                      <option key={planId} value={planId}>{plans[planId]}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <div className="modal-buttons">
                  <Button variant="secondary" onClick={handleCloseEditPlan}>
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

export default Users;
