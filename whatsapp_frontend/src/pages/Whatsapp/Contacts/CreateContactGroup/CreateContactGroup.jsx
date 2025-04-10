import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createContactGroup, getUserProfile } from "../../../../services/api";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import Topbar from "../../../../components/Topbar/Topbar";
import WhatsappMenu from "../../../../components/WhatsAppMenu/WhatsAppMenu";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";

import "./CreateContactGroup.css";

const CreateContactGroup = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [status, setStatus] = useState("enable");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserProfile();
                setUser(userData);

                const expireDate = new Date(userData.expire_date);
                const today = new Date();

                if (expireDate < today) {
                    navigate("/dashboard/user");
                    return;
                }
            } catch (error) {
                console.error("Error fetching user", error);
            }
        };

        fetchUser();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !user) return;

        const payload = {
            name,
            status,
            user: user.id,
        };

        try {
            await createContactGroup(payload);
            navigate("/whatsapp_contact");
        } catch (error) {
            console.error("Error creating group", error);
        }
    };

    return (
        <div className="whatsapp-contacts-page">
            <Sidebar />
            <div className="user-menu-container">
                <WhatsappMenu />
            </div>
            <div className="whatsapp-contacts-content">
                <Topbar />
                <Container className="create-contact-form-container d-flex justify-content-center align-items-center">
                    <Card className="create-contact-card w-100">
                        <Card.Body>
                            <h5 className="mb-4">Update</h5>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Status</Form.Label>
                                    <div className="d-flex gap-3 mt-2">
                                        <Form.Check
                                            type="radio"
                                            label="Enable"
                                            value="enable"
                                            checked={status === "enable"}
                                            onChange={() => setStatus("enable")}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Disable"
                                            value="disable"
                                            checked={status === "disable"}
                                            onChange={() => setStatus("disable")}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="mt-3">
                                    <Form.Label>Group contact name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter group name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="group-input"
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-between mt-4">
                                    <Button variant="dark" onClick={() => navigate("/whatsapp_contact")}>Back</Button>
                                    <Button type="submit" variant="primary">Submit</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </div>
    );
};

export default CreateContactGroup;
