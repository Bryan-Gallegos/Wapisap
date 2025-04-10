import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import Topbar from "../../../../components/Topbar/Topbar";
import WhatsappMenu from "../../../../components/WhatsAppMenu/WhatsAppMenu";
import { Container, Button, Table, Form, Modal } from "react-bootstrap";
import emptyBox from "../../../../assets/empty.png";
import { getContactGroups, getUserProfile, createContact, getContacts, deleteContact } from "../../../../services/api";
import "./AddContactToContactGroup.css";

const AddContactToContactGroup = () => {
    const { groupId } = useParams();
    const navigate = useNavigate();

    const [contacts, setContacts] = useState([]);
    const [user, setUser] = useState(null);
    const [groupName, setGroupName] = useState("Loading...");
    const [showImportModal, setShowImportModal] = useState(false);
    const [importMode, setImportMode] = useState("form");
    const [newNumbers, setNewNumbers] = useState("");
    const [loadingContacts, setLoadingContacts] = useState([]);
    const [activeTab, setActiveTab] = useState("csv");
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [showResultModal, setShowResultModal] = useState(false);
    const [resultMessage, setResultMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserProfile();
                setUser(userData);

                const expireDate = new Date(userData.expire_date);
                if (expireDate < new Date()) {
                    navigate("/dashboard/user");
                    return;
                }

                const allGroups = await getContactGroups();
                const currentGroup = allGroups.find(group => group.id.toString() === groupId);
                setGroupName(currentGroup?.name || "Unknown Group");

                const allContacts = await getContacts();
                const filteredContacts = allContacts.filter(contact => contact.group.toString() === groupId);
                setContacts(filteredContacts);
            } catch (error) {
                console.error("Error cargando datos:", error);
            }
        };

        fetchData();
    }, [groupId]);

    const handleSubmitNumbers = async () => {
        const numbers = newNumbers.split('\n').map(num => num.trim()).filter(Boolean);

        setShowImportModal(false);
        setNewNumbers("");

        for (const number of numbers) {
            try {
                const tempId = `temp-${Date.now()}-${number}`;
                setContacts(prev => [
                    ...prev,
                    { id: tempId, phone_number: number, id_valid: null, params: "" },
                ]);

                const response = await createContact({
                    group: groupId,
                    phone_number: number,
                    is_valid: true,
                });

                setContacts(prev => [
                    ...prev.filter(c => c.id !== tempId),
                    {
                        id: response.id,
                        phone_number: response.phone_number,
                        is_valid: true,
                        params: response.params || "",
                    },
                ]);
            } catch (error) {
                console.error("❌ Error creating contact:", error);

                setContacts(prev => prev.filter(c => c.phone_number !== number));
            }
        }
    };

    const toggleSelectContact = (id) => {
        setSelectedContacts(prev =>
            prev.includes(id)
                ? prev.filter(cid => cid !== id)
                : [...prev, id]
        );
    };

    const handleDeleteSelectedContacts = async () => {
        if (selectedContacts.length === 0) return;

        let successCount = 0;
        let errorCount = 0;

        for (const id of selectedContacts) {
            try {
                await deleteContact(id);
                successCount++;
                setContacts(prev => prev.filter(c => c.id !== id));
            } catch (err) {
                errorCount++;
            }
        }

        setSelectedContacts([]);
        setResultMessage(
            `✅ ${successCount} contact(s) deleted. ${errorCount > 0 ? `❌ ${errorCount} error(s).` : ""}`
        );
        setShowResultModal(true);
    };

    return (
        <div className="whatsapp-addcontact-page">
            <Sidebar />
            <div className="user-menu-container">
                <WhatsappMenu />
            </div>
            <div className="whatsapp-addcontact-content">
                <Topbar />
                <Container fluid className="d-flex justify-content-center">
                    <div className="contact-group-container">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="section-title">{groupName}</h4>
                            <div className="button-group">
                                <Button variant="light" onClick={() => setShowImportModal(true)}>
                                    <i className="fas fa-upload"></i> Import
                                </Button>
                                <Button variant="danger" onClick={handleDeleteSelectedContacts}>
                                    <i className="fas fa-trash"></i>
                                </Button>
                                <Button variant="secondary" onClick={() => navigate(-1)}>
                                    <i className="fas fa-arrow-left"></i> Back
                                </Button>
                            </div>
                        </div>

                        <div className="search-wrapper mb-3">
                            <Form.Control type="text" placeholder="Search" />
                        </div>

                        <div className="contact-table-wrapper">
                            <Table responsive hover bordered className="contact-table">
                                <thead>
                                    <tr>
                                        <th><Form.Check /></th>
                                        <th>NO.</th>
                                        <th>PHONE NUMBER</th>
                                        <th>VALID?</th>
                                        <th>PARAMS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="no-data-cell">
                                                <img src={emptyBox} alt="No contacts" className="empty-image" />
                                            </td>
                                        </tr>
                                    ) : (
                                        contacts.map((contact, idx) => (
                                            <tr key={contact.id}>
                                                <td>
                                                    <Form.Check
                                                        checked={selectedContacts.includes(contact.id)}
                                                        onChange={() => toggleSelectContact(contact.id)}
                                                    />
                                                </td>
                                                <td>{idx + 1}</td>
                                                <td>{contact.phone_number}</td>
                                                <td>
                                                    {contact.is_valid === null ? (
                                                        <span style={{ color: "#03A9F4", fontWeight: "bold" }}>⏳</span>
                                                    ) : contact.is_valid ? (
                                                        <span style={{ color: "green" }}>✅</span>
                                                    ) : (
                                                        <span style={{ color: "red" }}>❌</span>
                                                    )}
                                                </td>
                                                <td>{contact.params}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </Table>
                        </div>

                        <div className="pagination-wrapper d-flex justify-content-center mt-3">
                            <Button variant="light" className="me-2">«</Button>
                            <Button variant="primary">1</Button>
                            <Button variant="light" className="ms-2">»</Button>
                        </div>
                    </div>
                </Container>

                {/* MODAL IMPORT */}
                <Modal show={showImportModal} onHide={() => setShowImportModal(false)} centered>
                    <Modal.Header closeButton className="mb-3">
                        <Modal.Title>
                            <i className="fas fa-database me-2 text-primary"></i> Import contact
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="import-tabs mb-3">
                            <Button
                                className={activeTab === "csv" ? "active" : ""}
                                onClick={() => setActiveTab("csv")}
                            >
                                UPLOAD CSV
                            </Button>
                            <Button
                                className={activeTab === "form" ? "active" : ""}
                                onClick={() => setActiveTab("form")}
                            >
                                VIA FORM
                            </Button>
                        </div>

                        {activeTab === "csv" && (
                            <div className="csv-upload-tab text-center">
                                <Button variant="light" className="w-100 mb-3">
                                    <i className="fas fa-download"></i> Example template
                                </Button>
                                <Button variant="success" className="w-100">
                                    <i className="fas fa-upload"></i> Upload CSV
                                </Button>
                            </div>
                        )}

                        {activeTab === "form" && (
                            <div className="form-upload-tab">
                                <Form.Group>
                                    <Form.Label><strong>Add multiple phone numbers</strong></Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={7}
                                        placeholder={`Validate example:\n841234567890\n840123456789\n+840123456798\n84123456789-1618177713@g.us`}
                                        value={newNumbers}
                                        onChange={(e) => setNewNumbers(e.target.value)}
                                    />
                                </Form.Group>
                                <div className="d-flex justify-content-between mt-3">
                                    <Button variant="dark" onClick={() => setShowImportModal(false)}>Back</Button>
                                    <Button variant="primary" onClick={handleSubmitNumbers}>Submit</Button>
                                </div>
                            </div>
                        )}
                    </Modal.Body>
                </Modal>

                <Modal show={showResultModal} onHide={() => setShowResultModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Elimination Result</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{resultMessage}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => setShowResultModal(false)}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    );
};

export default AddContactToContactGroup;
