import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import WhatsappMenu from "../../../components/WhatsAppMenu/WhatsAppMenu";
import { getUserProfile, getWhatsAppAccounts } from "../../../services/api";
import { FaRobot } from "react-icons/fa";
import empty from "../../../assets/empty.png";
import "./Autoresponder.css";

const Autoresponder = () => {
    const [user, setUser] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [status, setStatus] = useState("disable"); 
const [recipient, setRecipient] = useState("all"); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserandAccounts = async () => {
            try {
                const userData = await getUserProfile();
                setUser(userData);

                const expireDate = new Date(userData.expoire_date);
                const today = new Date();

                if (expireDate < today) {
                    navigate("/dashboard/user");
                    return;
                }

                const allAccounts = await getWhatsAppAccounts();
                const filtered = allAccounts.filter(acc => acc.user === userData.id);
                setAccounts(filtered);

            } catch (error) {
                console.error("Error getting users and our accounts:", error);
            }
        };

        fetchUserandAccounts();
    }, [navigate]);

    return (
        <div className="whatsapp-autoresponder-page">
            <Sidebar />
            <div className="user-menu-container">
                <WhatsappMenu />
            </div>
            <div className="whatsaap-autoresponder-content">
                <Topbar />

                <Container className="p-4">
                    <h5 className="fw-hold"><FaRobot color="#43D97C" />  Autoresponder</h5>
                    <p className="text-muted mb-4">Send a pre-written message</p>

                    <Form.Select
                        className="mb-4 shadow-sm"
                        onChange={(e) => {
                            const selectedValue = e.target.value;
                            if (selectedValue === "all") {
                                setSelectedAccount({ id: "all", name: "All Accounts" });
                            } else {
                                const account = accounts.find(acc => acc.id === parseInt(selectedValue));
                                setSelectedAccount(account);
                            }
                        }}
                        defaultValue=""
                    >
                        <option value="" disabled>Select WhatsApp account</option>
                        <option value="all">Apply for all accounts</option>
                        {accounts.map((acc) => (
                            <option key={acc.id} value={acc.id}>
                                {acc.name}
                            </option>
                        ))}
                    </Form.Select>

                    {!selectedAccount && (
                        <div className="text-center mt-5">
                            <img src={empty} alt="Empty autoresponder" width={350} />
                        </div>
                    )}

                    {selectedAccount && (
                        <div className="autoresponder-box bg-white p-4 rounded shadow-sm">
                            <h6 className="mb-3 fw-bold">
                                Autoresponder for {selectedAccount.name}
                            </h6>

                            <Form>
                                {/* Status */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <div className="d-flex gap-4">
                                        <Form.Check
                                            type="radio"
                                            label="Enable"
                                            name="status"
                                            value="enable"
                                            checked={status === "enable"}
                                            onChange={(e) => setStatus(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Disable"
                                            name="status"
                                            value="disable"
                                            checked={status === "disable"}
                                            onChange={(e) => setStatus(e.target.value)}
                                        />
                                    </div>
                                </Form.Group>

                                {/* Sent to */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Sent to</Form.Label>
                                    <div className="d-flex gap-4">
                                        <Form.Check
                                            type="radio"
                                            label="All"
                                            name="recipient"
                                            value="all"
                                            checked={recipient === "all"}
                                            onChange={(e) => setRecipient(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Individual"
                                            name="recipient"
                                            value="individual"
                                            checked={recipient === "individual"}
                                            onChange={(e) => setRecipient(e.target.value)}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Group"
                                            name="recipient"
                                            value="group"
                                            checked={recipient === "group"}
                                            onChange={(e) => setRecipient(e.target.value)}
                                        />
                                    </div>
                                </Form.Group>


                                {/* Tabs without functionality */}
                                <div className="mb-3 d-flex gap-2">
                                    <Button variant="outline-primary" size="sm">Text & Media</Button>
                                </div>

                                {/* Media */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Media file</Form.Label>
                                    <div className="border p-3 bg-light text-center">
                                        <Button variant="light">📁 File Manager</Button>
                                    </div>
                                </Form.Group>

                                {/* Caption */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Caption</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Write a Template" />
                                    <small className="text-muted">Random message by Spintax. Ej: {`{Hi|Hello|Hola}`}</small>
                                </Form.Group>

                                {/* Resend */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Resubmit message only after (minute)</Form.Label>
                                    <Form.Select>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </Form.Select>
                                </Form.Group>

                                {/* Except contacts */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Except contacts</Form.Label>
                                    <Form.Control type="text" />
                                    <Form.Text className="text-muted">
                                        Validate example: 841234567890, 840123456789
                                    </Form.Text>
                                </Form.Group>

                                <div className="text-end">
                                    <Button variant="primary">📤 Submit</Button>
                                </div>
                            </Form>
                        </div>
                    )}
                </Container>
            </div>
        </div>
    );
};

export default Autoresponder;