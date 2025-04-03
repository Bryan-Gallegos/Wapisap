import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import WhatsappMenu from "../../../components/WhatsAppMenu/WhatsAppMenu";
import { getUserProfile, getWhatsAppAccounts } from "../../../services/api";
import { FaCheckCircle } from "react-icons/fa";
import empty from "../../../assets/empty.png";
import countries from "../../../utils/countries";
import "./QuickResponse.css";

const QuickResponse = () => {
    const [user, setUser] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(() =>
        countries.find(c => c.isoCode === "PE") || countries[0]
      );
    const countrySelectRef = useRef(null);
    const [selectSize, setSelectSize] = useState(1); // Controla el tamaño del select
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

                const allAccounts = await getWhatsAppAccounts();
                const filtered = allAccounts.filter(acc => acc.user === userData.id);
                setAccounts(filtered);

            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
        };

        fetchData();
    }, [navigate]);

    const getEmojiFlag = (countryCode) => {
        const codePoints = countryCode
          .toUpperCase()
          .split("")
          .map(char => 127397 + char.charCodeAt());
        return String.fromCodePoint(...codePoints);
      };
      

    return (
        <div className="whatsapp-quickresponse-page">
            <Sidebar />
            <div className="user-menu-container">
                <WhatsappMenu />
            </div>
            <div className="whatsapp-quickresponse-content">
                <Topbar />
                <Container className="p-4">
                    <h5 className="fw-bold"><FaCheckCircle color="#4CAF50" /> Quick Response</h5>
                    <p className="text-muted mb-4">Quick Response</p>

                    <Form.Select
                        className="mb-4 shadow-sm"
                        onChange={(e) => {
                            const selectedValue = e.target.value;
                            const account = accounts.find(acc => acc.id === parseInt(selectedValue));
                            setSelectedAccount(account);
                        }}
                        defaultValue=""
                    >
                        <option value="" disabled>Select WhatsApp account</option>
                        {accounts.map((acc) => (
                            <option key={acc.id} value={acc.id}>
                                {acc.name} (Standard)
                            </option>
                        ))}
                    </Form.Select>

                    {!selectedAccount ? (
                        <div className="text-center mt-5">
                            <img src={empty} alt="No data" width={250} />
                        </div>
                    ) : (
                        <div className="quickresponse-box bg-white p-4 rounded shadow-sm">
                            <h6 className="mb-3 fw-bold">Send Single Message</h6>

                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Send Message to</Form.Label>
                                    <div className="input-group" style={{ position: "relative" }}>

                                        {/* Flag that opens the select */}
                                        <span
                                            className="input-group-text"
                                            style={{ padding: "4px 10px", cursor: "pointer", zIndex: 3 }}
                                            onClick={() => {
                                                if (countrySelectRef.current) {
                                                    countrySelectRef.current.style.display = "block"; 
                                                    countrySelectRef.current.focus();
                                                }
                                            }}
                                        >
                                            <img
                                                src={`https://flagcdn.com/w40/${selectedCountry.isoCode.toLowerCase()}.png`}
                                                alt={selectedCountry.isoCode}
                                                width={24}
                                                height={16}
                                                style={{ objectFit: "cover" }}
                                            />
                                        </span>

                                        {/* Number input */}
                                        <Form.Control
                                            type="text"
                                            placeholder={selectedCountry.example}
                                            onFocus={() => {
                                                if (countrySelectRef.current) {
                                                    countrySelectRef.current.style.display = "none"; 
                                                }
                                            }}
                                        />

                                        {/* Select real with scroll limited to 5 */}
                                        <select
                                            ref={countrySelectRef}
                                            size={5}
                                            value={selectedCountry.isoCode}
                                            className="form-select"
                                            onChange={(e) => {
                                                const selected = countries.find(c => c.isoCode === e.target.value);
                                                setSelectedCountry(selected);
                                                countrySelectRef.current.style.display = "none"; 
                                            }}
                                            onBlur={() => {
                                                countrySelectRef.current.style.display = "none"; 
                                            }}
                                            style={{
                                                position: "absolute",
                                                top: "42px", 
                                                left: "0",
                                                zIndex: 999,
                                                width: "30%",
                                                display: "none",
                                            }}
                                        >
                                            {countries.map((country, i) => (
                                                <option key={`${country.isoCode}-${i}`} value={country.isoCode}>
                                                    {`${getEmojiFlag(country.isoCode)} ${country.name} (${country.dialCode})`}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </Form.Group>




                                <div className="mb-3 d-flex gap-2">
                                    <Button variant="outline-primary" size="sm">Text & Media</Button>
                                    <Button variant="outline-secondary" size="sm">List messages</Button>
                                    <Button variant="outline-secondary" size="sm">Poll</Button>
                                </div>

                                <Form.Group className="mb-3">
                                    <Form.Label>Media file</Form.Label>
                                    <div className="border p-3 bg-light text-center">
                                        <Button variant="light">📁 File Manager</Button>
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Template</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Write a Template" />
                                    <small className="text-muted">Random message by Spintax. Ej: {`{Hi|Hello|Hola}`}</small>
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

export default QuickResponse;