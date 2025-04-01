import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import Topbar from "../../../../components/Topbar/Topbar";
import WhatsappMenu from "../../../../components/WhatsAppMenu/WhatsAppMenu";
import { getUserProfile, getWhatsAppAccounts } from "../../../../services/api";
import { FaEnvelope } from "react-icons/fa";
import "./CreateBulkMessaging.css";

const CreateBulkMessaging = () => {
    const [user, setUser] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserProfile();
                setUser(userData);

                const today = new Date();
                const expireDate = new Date(userData.expire_date);
                if (expireDate < today) {
                    navigate("/dashboard/user");
                    return;
                }

                const allAccounts = await getWhatsAppAccounts();
                const filtered = allAccounts.filter(acc => acc.user === userData.id);
                setAccounts(filtered);
            } catch (error) {
                console.error("Error fetching user/accounts:", error);
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div className="bulk-create-page">
            <Sidebar />
            <div className="user-menu-container">
                <WhatsappMenu />
            </div>

            <div className="bulk-create-messaging-content">
                <Topbar />
                <Container className="p-4">
                    <h4 className="mb-4"><FaEnvelope color="#AA00FF" /> Bulk Messaging</h4>

                    <div className="bg-white p-4 rounded shadow-sm">
                        <h6 className="mb-4 fw-bold">Update campaign</h6>

                        <Form>
                            {/* Select WhatsApp Account */}
                            <Form.Group className="mb-3">
                                <Form.Label>Select WhatsApp accounts</Form.Label>
                                <Form.Select className="form-control shadow-sm">
                                    <option>Please select a profile</option>
                                    {accounts.map((acc) => (
                                        <option key={acc.id} value={acc.id}>
                                            {acc.name} ({acc.phone_number})
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            {/* Campaign name */}
                            <Form.Group className="mb-3">
                                <Form.Label>Campaign name</Form.Label>
                                <Form.Control type="text" placeholder="Enter campaign name" className="form-control shadow-sm" />
                            </Form.Group>

                            {/* Contact group */}
                            <Form.Group className="mb-3">
                                <Form.Label>Contact group</Form.Label>
                                <Form.Select className="form-control shadow-sm">
                                    <option>Select contact group</option>
                                </Form.Select>
                            </Form.Group>

                            {/* Tabs */}
                            <div className="mb-3 d-flex gap-2">
                                <Button variant="outline-primary" size="sm" className="btn btn-outline-primary shadow-sm">Text & Media</Button>
                                <Button variant="outline-secondary" size="sm" className="btn btn-outline-primary shadow-sm">List messages</Button>
                                <Button variant="outline-secondary" size="sm" className="btn btn-outline-primary shadow-sm">Poll</Button>
                            </div>

                            {/* Media */}
                            <Form.Group className="mb-3">
                                <Form.Label>Media file</Form.Label>
                                <div className="border p-3 bg-light text-center">
                                    <Button variant="light" className="btn btn-outline-primary shadow-sm">📁 File Manager</Button>
                                </div>
                            </Form.Group>

                            {/* Caption */}
                            <Form.Group className="mb-3">
                                <Form.Label>Caption</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Write a template" className="form-control shadow-sm" />
                                <small className="text-muted">
                                    Random message by Spintax & variables: %name%, %phone%
                                </small>
                            </Form.Group>

                            {/* Time and Schedule */}
                            <div className="bg-light p-3 rounded mb-3">
                                <Form.Label><strong>Time post</strong></Form.Label>
                                <Row>
                                    <Col md={6}>
                                        <Form.Control type="datetime-local" className="form-control shadow-sm" />
                                    </Col>
                                </Row>

                                <Row className="mt-3">
                                    <Col md={6}>
                                        <Form.Label>Interval min (sec)</Form.Label>
                                        <Form.Select className="form-control shadow-sm">
                                            <option>Select min second</option>
                                        </Form.Select>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Label>Interval max (sec)</Form.Label>
                                        <Form.Select className="form-control shadow-sm">
                                            <option>Select max second</option>
                                        </Form.Select>
                                    </Col>
                                </Row>

                                <div className="mt-3">
                                    <Form.Label>Schedule time</Form.Label>
                                    <div className="d-flex gap-3">
                                        <Button variant="outline-secondary" size="sm" className="btn btn-outline-primary shadow-sm">Daytime</Button>
                                        <Button variant="outline-secondary" size="sm" className="btn btn-outline-primary shadow-sm">Nighttime</Button>
                                        <Button variant="outline-secondary" size="sm" className="btn btn-outline-primary shadow-sm">Odd</Button>
                                        <Button variant="outline-secondary" size="sm" className="btn btn-outline-primary shadow-sm">Even</Button>
                                    </div>
                                    <Form.Select className="form-control shadow-sm">
                                        <option>Select time</option>
                                    </Form.Select>
                                </div>

                                <div className="text-danger small mt-2">
                                    Set empty to campaign run anytime
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="d-flex justify-content-between">
                                <Button
                                    variant="secondary"
                                    className="btn btn-outline-primary shadow-sm"
                                    onClick={() => navigate(-1)}
                                >
                                    Back
                                </Button>
                                <Button variant="primary" className="btn btn-outline-primary shadow-sm">📤 Schedule</Button>
                            </div>
                        </Form>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default CreateBulkMessaging;
