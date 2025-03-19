import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import {
    getTotalUsers,
    getTotalPlans,
    getTotalWhatsAppAccounts,
    getTotalChatbots,
    getRecentInvoices,
    getRecentUsers,
} from "../../services/api";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { FaUsers, FaCogs, FaRobot, FaWhatsapp } from "react-icons/fa";
import CountUp from "react-countup";
import "./Administration.css";  // Archivo de estilos

const Administration = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPlans, setTotalPlans] = useState(0);
    const [totalWhatsAppAccounts, setTotalWhatsAppAccounts] = useState(0);
    const [totalChatbots, setTotalChatbots] = useState(0);
    const [recentInvoices, setRecentInvoices] = useState([]);
    const [recentUsers, setRecentUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await getTotalUsers();
                setTotalUsers(users);

                const plans = await getTotalPlans();
                setTotalPlans(plans);

                const whatsappAccounts = await getTotalWhatsAppAccounts();
                setTotalWhatsAppAccounts(whatsappAccounts);

                const chatbots = await getTotalChatbots();
                setTotalChatbots(chatbots);

                const invoices = await getRecentInvoices();
                setRecentInvoices(invoices.results || invoices);  // Verifica si la API devuelve `results`

                const usersList = await getRecentUsers();
                setRecentUsers(usersList.results || usersList);  // Verifica si la API devuelve `results`
            } catch (error) {
                console.error("Error al cargar datos del dashboard", error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className="admin-page">
            {/* Sidebar */}
            <Sidebar />

            {/* Admin Menu */}
            <div className="admin-menu-container">
                <AdminMenu />
            </div>

            {/* Contenido Principal */}
            <div className="admin-content">
                <Topbar />
                <Container fluid className="p-4">
                    <h2>Admin Dashboard</h2>
                    <p>System overview and general metrics.</p>

                    {/* Resumen de métricas */}
                    <Row className="mb-4">
                        <Col md={3}>
                            <Card className="admin-card">
                                <Card.Body>
                                    <FaUsers size={40} color="#007bff" />
                                    <Card.Title>Total Users</Card.Title>
                                    <CountUp className="text-admin-card" start={0} end={totalUsers} duration={2} separator="," />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="admin-card">
                                <Card.Body>
                                    <FaCogs size={40} color="#28a745" />
                                    <Card.Title>Available Plans</Card.Title>
                                    <CountUp className="text-admin-card" start={0} end={totalPlans} duration={2} separator="," />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="admin-card">
                                <Card.Body>
                                    <FaWhatsapp size={40} color="#25d366" />
                                    <Card.Title>WhatsApp Accounts</Card.Title>
                                    <CountUp className="text-admin-card" start={0} end={totalWhatsAppAccounts} duration={2} separator="," />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="admin-card">
                                <Card.Body>
                                    <FaRobot size={40} color="#ff5733" />
                                    <Card.Title>Total Chatbots</Card.Title>
                                    <CountUp className="text-admin-card" start={0} end={totalChatbots} duration={2} separator="," />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Últimos registros */}
                    <Row>
                        <Col md={6}>
                            <h4>Latest Registered Users</h4>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentUsers.map((user, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{user.first_name} {user.last_name}</td>
                                            <td>{user.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>

                        <Col md={6}>
                            <h4>Latest Invoices</h4>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentInvoices.map((invoice, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{invoice.last_payment_date}</td>
                                            <td>${invoice.last_payment_amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Administration;
