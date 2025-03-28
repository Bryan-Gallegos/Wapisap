import { useEffect, useState } from "react";
import DashboardLayout from "../../../layouts/Dashboard/DashboardLayout";
import { Card } from "react-bootstrap";
import {
  getTotalUsers,
  getTotalPlans,
  getTotalWhatsAppAccounts,
  getTotalChatbots,
  getUserProfile,
} from "../../../services/api";
import { FaUsers, FaListAlt, FaWhatsapp, FaRobot } from "react-icons/fa";
import "./DashboardAdmin.css";

const DashboardAdmin = () => {
  const [stats, setStats] = useState({
    users: 0,
    plans: 0,
    whatsapp: 0,
    chatbots: 0,
  });
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, plans, whatsapp, chatbots, profileData] = await Promise.all([
          getTotalUsers(),
          getTotalPlans(),
          getTotalWhatsAppAccounts(),
          getTotalChatbots(),
          getUserProfile(),
        ]);
        setStats({ users, plans, whatsapp, chatbots });
        setProfile(profileData);
      } catch (error) {
        console.error("Error loading dashboard data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <h2 className="mb-4">
        <span role="img" aria-label="admin">🧑‍💼</span> General Administrator Panel
      </h2>

      <Card className="admin-welcome-card p-3 mb-4">
        <h5>Welcome, {profile?.first_name} {profile?.last_name}</h5>
        <p>Email: {profile?.email}</p>
        <p>Role: <strong>{profile?.role_name || "Administrator"}</strong></p>
      </Card>

      <div className="dashboard-admin-cards">
        <div className="stat-card stat-users">
          <div className="stat-icon"><FaUsers /></div>
          <div>{stats.users}</div>
          <p>Total Users</p>
        </div>
        <div className="stat-card stat-plans">
          <div className="stat-icon"><FaListAlt /></div>
          <div>{stats.plans}</div>
          <p>Available Plans</p>
        </div>
        <div className="stat-card stat-whatsapp">
          <div className="stat-icon"><FaWhatsapp /></div>
          <div>{stats.whatsapp}</div>
          <p>WhatsApp Accounts</p>
        </div>
        <div className="stat-card stat-chatbots">
          <div className="stat-icon"><FaRobot /></div>
          <div>{stats.chatbots}</div>
          <p>Total Chatbots</p>
        </div>
      </div>

      <Card className="admin-description-card mt-4">
        From this panel you can manage all the global functions of the system.
        Access the left side menu to manage users, roles, permissions, instances and more.
      </Card>
    </DashboardLayout>
  );
};

export default DashboardAdmin;
