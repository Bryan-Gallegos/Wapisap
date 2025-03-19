import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { getUserProfile, getPlanDetails, getBillingDetails } from "../../services/api";
import { Container, Card, Button, Form, Tabs, Tab } from "react-bootstrap";
import { FaUser, FaEnvelope, FaLock, FaCalendarCheck, FaCreditCard } from "react-icons/fa";
import planImg from "../../assets/plans.png";
import empty from "../../assets/empty.png";
import "./Profile.css";

const Profile = () => {
    const [planDetails, setPlanDetails] = useState([]);
    const [billingDetails, setBillingDetails] = useState([]);
    const [userProfile, setUserProfile] = useState({
        email: "",
        expire_date: "",
        first_name: "",
        id: "",
        last_name: "",
        plan: "",
        role: "",
        username: "",
    });
    const [loading, setLoading] = useState(true);

    const [activeTab, setActiveTab] = useState("account");

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await getUserProfile();
                setUserProfile(userData);
                if (userData.plan) {
                    const planData = await getPlanDetails(userData.plan);
                    setPlanDetails(planData);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener el perfil del usuario", error);
                setLoading(false);
            }
        };
        fetchUserProfile();

        const fetchBillingData = async () => {
            try {
                const billingData = await getBillingDetails();
                setBillingDetails(billingData);
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener los datos del billing", error);
                setLoading(false);
            }
        };
        fetchBillingData();
    }, []);

    return (
        <div className="profile-page">
            {/* Sidebar */}
            <Sidebar />

            {/* Contenido Principal */}
            <div className="content">
                <Topbar />
                <Container fluid className="profile-container">
                    <Card className="profile-card">
                        <Card.Body>
                            {/* Header del Perfil */}
                            <div className="profile-header">
                                <div className="avatar-placeholder">
                                    {userProfile?.profile_picture ? (
                                        <img
                                            src={userProfile.profile_picture}
                                            alt="User Avatar"
                                            className="avatar-img"
                                        />
                                    ) : (
                                        <div className="avatar-initials">
                                            {userProfile?.first_name?.charAt(0).toUpperCase() || ""}
                                            {userProfile?.last_name?.charAt(0).toUpperCase() || ""}
                                        </div>
                                    )}
                                </div>

                                <div className="profile-info">
                                    <h3 className="profile-name">{userProfile?.first_name} {userProfile?.last_name}</h3>
                                    <p className="profile-username"><FaUser /> @{userProfile?.username}</p>
                                    <p className="profile-email"><FaEnvelope /> {userProfile?.email}</p>
                                </div>
                            </div>

                            {/* Tabs de Opciones */}
                            <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="profile-tabs">
                                <Tab eventKey="account" title={
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FaUser style={{ color: '#1e90ff', fontSize: '20px', marginRight: '8px' }} />
                                        Account
                                    </div>}>
                                    <div className="tab-content">
                                        <h5>Account</h5>
                                        <Form.Group>
                                            <Form.Label>Fullname</Form.Label>
                                            <Form.Control type="text" value={`${userProfile?.first_name} ${userProfile?.last_name}`} readOnly />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="text" value={userProfile?.username} readOnly />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" value={userProfile?.email} readOnly />
                                        </Form.Group>

                                        <Button variant="success" className="edit-profile-btn">Edit Profile</Button>
                                    </div>
                                </Tab>

                                <Tab eventKey="password" title={
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FaLock style={{ color: '#007bff' }} /> {/* Ícono de candado */}
                                        Change Password
                                    </div>}>
                                    <div className="tab-content">
                                        <h5>Change Password</h5>
                                        <Form.Group>
                                            <Form.Label>New Password</Form.Label>
                                            <Form.Control type="password" placeholder="Enter new password" />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control type="password" placeholder="Confirm new password" />
                                        </Form.Group>

                                        <Button variant="primary" className="save-btn">Save Changes</Button>
                                    </div>
                                </Tab>

                                <Tab eventKey="plan" title={
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FaCalendarCheck style={{ color: '#28a745' }} />
                                        Plan
                                    </div>}>

                                    <div className="plan-container">
                                        {/* Sección del Plan */}
                                        <div className="plan-card">
                                            <img src={planImg} alt="Plan Icon" className="plan-icon" />
                                            <h5 className="plan-name">{planDetails.name}</h5>
                                            <p className="plan-type">Monthly Plan</p>
                                            <p className="plan-expiration"><strong>Expire date:</strong> {userProfile.expire_date ? userProfile.expire_date : "Forever"}</p>
                                            <Button variant="primary" className="upgrade-btn">Upgrade your plan</Button>
                                        </div>

                                        {/* Sección de Permisos */}
                                        <div className="plan-permissions">
                                            <h5>Permissions</h5>
                                            <h6>Whatsapp Tools</h6>
                                            <ul className="permissions-list">
                                                {["Bulk Messaging", "Message History", "Chatbot", "Autoresponder",
                                                    "List Message Template", "Poll Template", "API", "Quick Response",
                                                    "Link Generator", "Profile", "Report"].map((perm, index) => (
                                                        <li key={index} className="permission-item">
                                                            ✅ {perm}
                                                        </li>
                                                    ))}
                                            </ul>

                                            <h6>Advanced Features</h6>
                                            <ul className="permissions-list">
                                                {["Shortlink", "OpenAI", "File Manager"].map((perm, index) => (
                                                    <li key={index} className="permission-item">
                                                        ✅ {perm}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                </Tab>



                                <Tab eventKey="billing" title={
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FaCreditCard style={{ color: '#dc3545' }} />
                                        Billing
                                    </div>}>
                                    <div className="tab-content">
                                        <h5>Billing Info</h5>

                                        <div className="billing-container">
                                            <div className="billing-info">
                                                <div className="billing-field">
                                                    <label>Owner</label>
                                                    <input type="text" value={`${userProfile.first_name} ${userProfile.last_name}`} readOnly />
                                                </div>

                                                <div className="billing-field">
                                                    <label>Tax Number/ID</label>
                                                    <input type="text" value={billingDetails.tax_number || "No registrado"} readOnly />
                                                </div>

                                                <div className="billing-field">
                                                    <label>Address</label>
                                                    <input type="text" value={billingDetails.address || "No registrado"} readOnly />
                                                </div>

                                                <Button variant="primary" className="billing-submit">Submit</Button>
                                            </div>
                                        </div>

                                        <h5>Invoices</h5>
                                        <div className="invoice-container">
                                            {billingDetails.invoices && billingDetails.invoices.length > 0 ? (
                                                <table className="invoice-table">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Date</th>
                                                            <th>Plan</th>
                                                            <th>Amount (USD)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {billingDetails.invoices.map((invoice, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{invoice.date}</td>
                                                                <td>{invoice.plan}</td>
                                                                <td>${invoice.amount}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <div className="empty-invoices">
                                                    <img src={empty} alt="No Invoices" />
                                                    <p>No invoices available</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Tab>

                            </Tabs>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </div>
    );
};

export default Profile;
