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
  const [users, setUsers] = useState([]); // USERS BY API
  const [roles, setRoles] = useState({}); //ROLES BY API
  const [rolesList, setRolesList] = useState([]); //ROLELIST BY API
  const [plans, setPlans] = useState({}); //PLANS BY API
  const [search, setSearch] = useState(""); //SEARCH USER
  const [show, setShow] = useState(false); //SHOW MODAL CREATE/EDIT USER
  const [selectedUser, setSelectedUser] = useState(null); //USER SELECTED
  const [currentPage, setCurrentPage] = useState(1); //CURRENT PAGE OF PAGINATION
  const [showUserDetails, setShowUserDetails] = useState(false); //VARIABLE FOR VIEW USER
  const [selectedUserDetails, setSelectedUserDetails] = useState(null); //VARIABLE FOR USER SELECTED FOR VIEW USER
  const [showEditExpireDate, setShowEditExpireDate] = useState(false); //VARIABLE FOR EDIT EXPIRE DATE
  const [selectedUserExpireDate, setSelectedUserExpireDate] = useState(null); //VARIABLE FOR USER SELECTED FOR EDIT EXPIRE DATE
  const [showDeleteModal, setShowDeleteModal] = useState(false); //SHOW MODAL DELETE USER
  const [userToDelete, setUserToDelete] = useState(null); //VARIABLE USER FOR DELETED
  const [showNotificationModal, setShowNotificationModal] = useState(false); //SHOW MODAL NOTIFICATION
  const [notificationMessage, setNotificationMessage] = useState(""); //MESSAGE FOR NOTIFICATION
  const [showEditPlan, setShowEditPlan] = useState(false); //SHOW MODAL EDIT PLAN
  const [selectedUserPlan, setSelectedUserPlan] = useState(null); //VARIABLE FOR USER SELECTED FOR EDIT PLAN
  const usersPerPage = 5; // Pagination size

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchPlans();
    fetchRolesList();
  }, []);

  //Function to obtain all users
  const fetchUsers = async () => {
    try {
      const response = await getUsers(); // Gets all users without paging
      setUsers(response.results || response);
    } catch (error) {
      console.error("Error getting users", error);
    }
  };

  //Function to get all roles (only the name)
  const fetchRoles = async () => {
    try {
      const response = await getRoles(); // Call the role API
      const rolesMap = {};
      response.results.forEach(role => {
        rolesMap[role.id] = role.name;
      });
      setRoles(rolesMap);
    } catch (error) {
      console.error("Error getting roles", error);
    }
  };

  //Function to obtain all plans
  const fetchPlans = async () => {
    try {
      const response = await getPlans(); // Calling the Plans API
      const plansMap = {};
      response.results.forEach(plan => {
        plansMap[plan.id] = plan.name; // Map ID -> Name
      });
      setPlans(plansMap);
    } catch (error) {
      console.error("Error getting plans", error);
    }
  };

  //Function to obtain the list of roles
  const fetchRolesList = async () => {
    try {
      const response = await getRoles();
      if (response && Array.isArray(response.results)) { // We check if it is an array
        setRolesList(response.results);
      } else {
        setRolesList([]); // Evitamos que sea undefined
      }
    } catch (error) {
      console.error("Error obtaining the list of roles", error);
      setRolesList([]); // In case of error, we keep an empty array
    }
  };

  // Handle to display the Add/Edit modal
  const handleShow = (user) => {
    setSelectedUser(user);
    setShow(true);
  };

  // Handle to close the Add/Edit modal
  const handleClose = () => {
    setSelectedUser(null);
    setShow(false);
  };

  // Handles for View Details Modal
  const handleShowUserDetails = (user) => {
    setSelectedUserDetails(user);
    setShowUserDetails(true);
  };

  const handleCloseUserDetails = () => {
    setSelectedUserDetails(null);
    setShowUserDetails(false);
  };

  // Handles for the Edit Expire Date Modal
  const handleShowEditExpireDate = (user) => {
    setSelectedUserExpireDate(user);
    setShowEditExpireDate(true);
  };

  const handleCloseEditExpireDate = () => {
    setSelectedUserExpireDate(null);
    setShowEditExpireDate(false);
  };

  // Function to change the expire_date
  const handleUpdateExpireDate = async (values, { setSubmitting }) => {
    try {
      // Only send the fields that actually change
      const updatedUser = {
        expire_date: values.expire_date  // We only send expire_date
      };

      await updateUser(selectedUserExpireDate.id, updatedUser);
      showNotification("Expiration date correctly updated.");
      fetchUsers();  // Reload users
      handleCloseEditExpireDate();  // Close modal
    } catch (error) {
      showNotification("Error updating the expiration date.");
    }
    setSubmitting(false);
  };

  // Handles to delete a user
  const handleShowDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteUser = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
  }

  // Delete a user function
  const handleDeleteUser = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete.id);
        showNotification("User successfully deleted.");
        fetchUsers();
        handleCloseDeleteUser();
      } catch (error) {
        showNotification("Error deleting user. Please try again.");
      }
    }
  };

  // Function for displaying notification (accepted or rejected)
  const showNotification = (message) => {
    setNotificationMessage(message);
    setShowNotificationModal(true);
  };

  // Handles to edit plan
  const handleShowEditPlan = (user) => {
    setSelectedUserPlan(user);
    setShowEditPlan(true);
  };

  const handleCloseEditPlan = () => {
    setSelectedUserPlan(null);
    setShowEditPlan(false);
  };

  // Function for change the plan of user
  const handleUpdatePlan = async (values, { setSubmitting }) => {
    try {
      const updatedUser = { plan: values.plan };

      await updateUser(selectedUserPlan.id, updatedUser);
      showNotification("Plan updated successfully.");
      fetchUsers();
      handleCloseEditPlan();
    } catch (error) {
      showNotificationModal("Error updating plan.");
    }

    setSubmitting(false);
  };

  // Validation with Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("The username is required"),
    first_name: Yup.string().required("The name is required"),
    last_name: Yup.string().required("The last_name is required"),
    email: Yup.string().email("Invalid Email").required("The email is required"),
    password: Yup.string()
      .when("isNewUser", {
        is: true,
        then: (schema) => schema.required("The password is required")
      }),
    role: Yup.string().required("The role is required"),
  });

  // Function for sending data
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

      // If the user has entered a password, we send it to
      if (values.password) {
        userData.password = values.password;
      }

      if (selectedUser) {
        await updateUser(selectedUser.id, userData);
        showNotification("User updated correctly.");
      } else {
        await createUser(userData);
        showNotification("User created correctly.");
      }

      fetchUsers();
      handleClose();
    } catch (error) {
      console.error("Error saving user", error);
      showNotification("Error saving user. Please try again.");
    }
    setSubmitting(false);
  };


  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

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
            <Col md={7}>
              <Form.Control
                type="text"
                placeholder="Search user..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
            <Col md={5}>
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
              {users.map((user) => (
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
                      >
                        👁 View
                      </Button>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleShow(user)}
                      >
                        ✏️ Edit
                      </Button>
                      <Button
                        variant="outli-warning"
                        size="sm"
                        onClick={() => handleShowEditPlan(user)}
                      >
                        📜 Edit Plan
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleShowDeleteUser(user)}
                      >
                        🗑 Delete
                      </Button>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleShowEditExpireDate(user)}
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
            {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map(number => (
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
          <Button variant="danger" onClick={handleCloseUserDetails}>Cerrar</Button>
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
