import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import WhatsappMenu from "../../../components/WhatsAppMenu/WhatsAppMenu";
import { Container, Dropdown, Image, Card, Button } from "react-bootstrap";
import { getUserProfile, getWhatsAppAccounts, getInstances } from "../../../services/api";
import { FaWhatsapp, FaSignOutAlt } from "react-icons/fa";
import empty from "../../../assets/empty.png";
import "./Profiles.css";

const Profiles = () => {
    const [user, setUser] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [instances, setInstances] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserProfile();
                setUser(userData);

                const today = new Date();
                const expire = new Date(userData.expire_date);
                if (expire < today) {
                    navigate("/dashboard/user");
                    return;
                }
                
                const allAccounts = await getWhatsAppAccounts();
                const filteredAccounts = allAccounts.filter(acc => acc.user === userData.id);
                setAccounts(filteredAccounts);

                const allInstances = await getInstances();
                setInstances(allInstances);
            } catch (error) {
                console.error("Error loading profile data", error);
            }
        };

        fetchData();
    }, [navigate]);

    const getInstanceId = () => {
        if (!selectedAccount || !instances.length) return "N/A";
        const match = instances.find(inst => inst.whatsapp === selectedAccount.id);
        return match?.instance_key || "Not linked";
    };

    return (
        <div className="whatsapp-profiles-page">
            <Sidebar />
            <div className="user-menu-container">
                <WhatsappMenu />
            </div>

            <div className="whatsapp-profile-content">
                <Topbar />

                <Container className="p-4 text-center">
                    <h4 className="mb-2 text-start">
                        <FaWhatsapp className="me-2 text-success" /> Profile
                    </h4>
                    <p className="mb-4 text-muted text-start">Information WhatsApp Account</p>

                    {/* Selector centrado */}
                    <div className="d-flex justify-content-center mb-4">
                        <Dropdown onSelect={(key) => setSelectedAccount(accounts.find(a => a.id === parseInt(key)))}>
                            <Dropdown.Toggle variant="light" id="dropdown-whatsapp" style={{ minWidth: "320px", textAlign: "left" }}>
                                {selectedAccount
                                    ? (
                                        <div className="d-flex align-items-center">
                                            <Image
                                                src={selectedAccount.profile_picture || "https://cdn-icons-png.flaticon.com/512/124/124034.png"}
                                                roundedCircle
                                                width={25}
                                                height={25}
                                                className="me-2"
                                            />
                                            <span>{selectedAccount.name}</span>
                                        </div>
                                    )
                                    : "Select WhatsApp Account"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu style={{ minWidth: "320px" }}>
                                {accounts.map((acc) => (
                                    <Dropdown.Item key={acc.id} eventKey={acc.id} className="d-flex align-items-center">
                                        <Image
                                            src={acc.profile_picture || "https://cdn-icons-png.flaticon.com/512/124/124034.png"}
                                            roundedCircle
                                            width={25}
                                            height={25}
                                            className="me-2"
                                        />
                                        {acc.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    {/* Información de la cuenta */}
                    {selectedAccount ? (
                        <div className="d-flex justify-content-center">
                            <Card className="p-4 shadow-sm text-start" style={{ maxWidth: "500px", width: "100%" }}>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="d-flex align-items-center">
                                        <Image
                                            src={selectedAccount.profile_picture || "https://cdn-icons-png.flaticon.com/512/124/124034.png"}
                                            roundedCircle
                                            width={50}
                                            height={50}
                                            className="me-3"
                                        />
                                        <div>
                                            <h6 className="fw-bold mb-0">{selectedAccount.name}</h6>
                                            <small className="text-muted">{selectedAccount.phone_number}</small>
                                        </div>
                                    </div>
                                    <Button variant="outline-danger" size="sm">
                                        <FaSignOutAlt className="me-1" /> Logout
                                    </Button>
                                </div>

                                <ul className="list-unstyled">
                                    <li><strong>Instance ID:</strong> {getInstanceId()}</li>
                                    <li><strong>Access Token:</strong> {user?.access_token || "N/A"}</li>
                                </ul>

                                <p className="text-muted mt-4 small text-end">
                                    Last update: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                                </p>
                            </Card>
                        </div>
                    ) : (
                        <div className="text-center mt-5">
                            <img src={empty} alt="No account selected" width={150} />
                        </div>
                    )}
                </Container>
            </div>
        </div>
    );
};

export default Profiles;
