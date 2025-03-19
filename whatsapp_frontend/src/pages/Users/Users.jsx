import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import { getRoles, getUsers, deleteUser, createUser, updateUser, getPlans } from "../../services/api";
import { Container, Row, Col, Table, Button, Form, Modal, Pagination } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { FaPlus } from "react-icons/fa";
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
  const [showUserDetails, setShowUserDetails] = useState(null);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const usersPerPage = 5; // Tamaño de la paginación

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchPlans();
    fetchRolesList();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers(); // Obtiene todos los usuarios sin paginación
      setUsers(response.results || response);
    } catch (error) {
      console.error("Error al obtener usuarios", error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await getRoles(); // Llama a la API de roles
      const rolesMap = {};
      response.results.forEach(role => {
        rolesMap[role.id] = role.name;
      });
      setRoles(rolesMap);
    } catch (error) {
      console.error("Error al obtener los roles", error);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await getPlans(); // Llamar a la API de planes
      const plansMap = {};
      response.results.forEach(plan => {
        plansMap[plan.id] = plan.name; // Mapeamos ID -> Nombre
      });
      setPlans(plansMap);
    } catch (error) {
      console.error("Error al obtener los planes", error);
    }
  };

  const fetchRolesList = async () => {
    try {
      const response = await getRoles();
      if (response && Array.isArray(response.results)) { // Verificamos si es un array
        setRolesList(response.results);
      } else {
        setRolesList([]); // Evitamos que sea undefined
      }
    } catch (error) {
      console.error("Error al obtener el listado de roles", error);
      setRolesList([]); // En caso de error, mantenemos un array vacío
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      await deleteUser(userId);
      fetchUsers();
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

  // Validación con Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("El nombre de usuario es obligatorio"),
    first_name: Yup.string().required("El nombre es obligatorio"),
    last_name: Yup.string().required("El apellido es obligatorio"),
    email: Yup.string().email("Email inválido").required("El email es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
    role: Yup.string().required("El rol es obligatorio"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const userData = {
        username: values.username,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
        role: values.role,
        plan: values.plan || null,
        expire_date: values.expire_date || null,
      };

      if (selectedUser) {
        await updateUser(selectedUser.id, userData);
      } else {
        await createUser(userData);
      }
      fetchUsers();
      handleClose();
    } catch (error) {
      console.error("Error al guardar usuario", error);
    }
    setSubmitting(false);
  };

  // Paginación
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
          <h2>Users</h2>
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

                  {/* Rol con estilo */}
                  <td>
                    <span className={`role-badge role-${roles[user.role] || "default"}`}>
                      {roles[user.role] || "Sin rol"}
                    </span>
                  </td>

                  {/* Plan con estilo */}
                  <td>
                    <span className="plan-badge">
                      {plans[user.plan] || "Sin plan"}
                    </span>
                  </td>

                  {/* Expire Date con formato */}
                  <td>
                    <span className="expire-date-badge">
                      {user.expire_date ? new Date(user.expire_date).toLocaleDateString() : "Forever"}
                    </span>
                  </td>

                  {/* Acciones */}
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
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(user.id)}
                      >
                        🗑 Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>


          {/* Paginación */}
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

      {/* Modal de Agregar/Editar Usuario con Formik */}
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
                    <option value="">Selecciona un rol</option>
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
    </div>
  );
};

export default Users;
