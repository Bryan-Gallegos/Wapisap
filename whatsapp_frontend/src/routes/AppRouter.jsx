import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardAdmin from "../pages/Dashboard/Admin/DashboardAdmin";
import DashboardUser from "../pages/Dashboard/User/DashboardUser";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import WhatsApp from "../pages/Whatsapp/Whatsapp";
import Administration from "../pages/Administration/Administration";
import Profile from "../pages/Profile/Profile";
import Users from "../pages/Administration/Users/Users";
import Roles from "../pages/Administration/Roles/Roles";
import Plans from "../pages/Administration/Plans/Plans";
import Chatbots from "../pages/Administration/ChatBots/ChatBots";
import WhatsaapAccount from "../pages/Administration/WhatsappAccount/WhatsappAccount";
import Messages from "../pages/Administration/Messages/Messages";
import Permissions from "../pages/Administration/Permissions/Permissions";
import Instances from "../pages/Administration/Instances/Instances";
import Api from "../pages/Administration/Api/Api";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      {/* RUTAS PARA EL DASHBOARD */}
      <Route path="/dashboard/admin" element={<DashboardAdmin />} />
      <Route path="/dashboard/user" element={<DashboardUser />} />
      <Route path="" element={<Home />} />
      {/* RUTAS PARA TODOS */}
      <Route path="/profile" element={<Profile />} />
      {/* RUTAS PARA EL USUARIO */}
      <Route path="/whatsapp" element={<WhatsApp />} />
      {/* RUTAS PARA EL ADMINISTRADOR */}
      <Route path="/administration" element={<Administration />} />
      <Route path="/administration/users" element={<Users />} />
      <Route path="/administration/roles" element={<Roles />} />
      <Route path="/administration/plans" element={<Plans />} />
      <Route path="/administration/chatbots" element={<Chatbots />} />
      <Route path="/administration/whatsapp_accounts" element={<WhatsaapAccount />} />
      <Route path="/administration/messages" element={<Messages />} />
      <Route path="/administration/permissions" element={<Permissions />} />
      <Route path="/administration/instances" element={<Instances />} />
      <Route path="/administration/api" element={<Api />} />
      
    </Routes>
  );
};

export default AppRouter;
