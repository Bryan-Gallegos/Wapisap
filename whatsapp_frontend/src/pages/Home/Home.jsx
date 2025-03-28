import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaChartBar, FaUserCheck, FaRobot, FaWhatsapp } from "react-icons/fa";
import "./Home.css";
import CountUp from "react-countup";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-wrapper">
            <div className="hero-section text-center py-5">
                <Container>
                    <h1 className="display-4 fw-bold">
                        <span className="emoji">🤖</span> #1 Marketing Platform for WhatsApp
                    </h1>
                    <p className="lead text-muted">
                        Automate messages, manage accounts and maximize your results with our cloud-based tool.
                    </p>
                    <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
                        <Button variant="primary" size="lg" onClick={() => navigate("/login")}>
                            Log In
                        </Button>
                        <Button variant="dark" size="lg" onClick={() => navigate("/register")}>
                            Sign Up
                        </Button>
                    </div>
                </Container>
            </div>

            <Container className="features-section py-5">
                <Row className="g-4 text-center">
                    <Col md={3} sm={6}>
                        <Card className="stat-card bg-primary text-white">
                            <Card.Body>
                                <FaUserCheck size={36} />
                                <h2 className="mt-2 text-home-card">
                                    <CountUp end={7380} duration={2.5} separator="," />
                                </h2>
                                <p>Messages sent today</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={3} sm={6}>
                        <Card className="stat-card bg-success text-white">
                            <Card.Body>
                                <FaWhatsapp size={36} />
                                <h2 className="mt-2 text-home-card">
                                    <CountUp end={89} duration={2} suffix="%" />
                                </h2>
                                <p>Delivery rate</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={3} sm={6}>
                        <Card className="stat-card bg-info text-white">
                            <Card.Body>
                                <FaChartBar size={36} />
                                <h2 className="mt-2 text-home-card">
                                    <CountUp end={18985} duration={2.5} separator="," />
                                </h2>
                                <p>Total messages</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={3} sm={6}>
                        <Card className="stat-card bg-warning text-dark">
                            <Card.Body>
                                <FaRobot size={36} />
                                <h2 className="mt-2 text-home-card">
                                    <CountUp end={856} duration={2} separator="," />
                                </h2>
                                <p>Automatic responses</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <footer className="footer-section text-center py-4">
                <p className="text-muted">© {new Date().getFullYear()} Golden Shark. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
