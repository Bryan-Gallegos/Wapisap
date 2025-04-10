import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getContactGroupById, updateContactGroup, getUserProfile } from "../../../../services/api";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import Topbar from "../../../../components/Topbar/Topbar";
import WhatsappMenu from "../../../../components/WhatsAppMenu/WhatsAppMenu";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";

const EditContactGroup = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [status, setStatus] = useState("enable");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserProfile();
                setUser(userData);

                const expireDate = new Date(userData.expire_date);
                const today = new Date();

                if (expireDate < today) {
                    navigate("/dashboard/user");
                    return;
                }

                const groupData = await getContactGroupById(id);
                setName(groupData.name);
                setStatus(groupData.status);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !user) return;

        const payload = {
            name,
            status,
            user: user.id
        };

        try {
            await updateContactGroup(id, payload);
            navigate("/whatsapp_contact");
        } catch (error) {
            console.error("Error updating group", error);
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
                <Container className="edit-contact-form-container mt-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h5 className="mb-4">Update</h5>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Status</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Enable"
                                            value="enable"
                                            checked={status === "enable"}
                                            onChange={() => setStatus("enable")}
                                        />
                                        <Form.Check
                                            inline
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
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-between mt-4">
                                    <Button variant="dark" onClick={() => navigate("/whatsapp_contact")}>Back</Button>
                                    <Button type="submit" variant="primary">Update</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </div>
    );
};

export default EditContactGroup;
