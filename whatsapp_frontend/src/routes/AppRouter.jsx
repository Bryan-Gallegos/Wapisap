import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "../layouts/Dashboard/DashboardLayout";
import DashboardAdmin from "../pages/Dashboard/Admin/DashboardAdmin";
import DashboardUser from "../pages/Dashboard/User/DashboardUser";
import Login from "../pages/Login/Login";
import WhatsApp from "../pages/Whatsapp/Whatsapp";
import Administration from "../pages/Administration/Administration";
import Profile from "../pages/Profile/Profile";
import Users from "../pages/Users/Users";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* RUTAS PARA EL DASHBOARD */}
      <Route path="/dashboard/admin" element={<DashboardAdmin />} />
      <Route path="/dashboard/user" element={<DashboardUser />} />
      <Route path="" element={<Login />} />
      {/* RUTAS PARA TODOS */}
      <Route path="/profile" element={<Profile />} />
      {/* RUTAS PARA EL USUARIO */}
      <Route path="/whatsapp" element={<WhatsApp />} />
      {/* RUTAS PARA EL ADMINISTRADOR */}
      <Route path="/administration" element={<Administration />} />
      <Route path="/administration/users" element={<Users />} />
    </Routes>
  );
};

export default AppRouter;
