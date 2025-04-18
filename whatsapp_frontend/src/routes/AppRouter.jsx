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
import WhatsAppProfile from "../pages/Whatsapp/Profiles/Profiles";
import BulkMessaging from "../pages/Whatsapp/BulkMessaging/BulkMessaging";
import CreateBulkMessaging from "../pages/Whatsapp/BulkMessaging/CreateBulkMessaging/CreateBulkMessaging";
import WhatsAppHistory from "../pages/Whatsapp/History/History";
import WhatsAppAutoresponder from "../pages/Whatsapp/AutoResponder/AutoResponder";
import WhatsAppQuickResponse from "../pages/Whatsapp/QuickResponse/QuickResponse";
import WhatsAppChatbot from "../pages/Whatsapp/Chatbot/Chatbot";
import WhatsAppLinkGenerator from "../pages/Whatsapp/LinkGenerator/LinkGenerator";
import WhatsAppApi from "../pages/Whatsapp/Api/Api";
import WhatsAppPollTemplate from "../pages/Whatsapp/PollTemplate/PollTemplate";
import WhatsAppContacts from "../pages/Whatsapp/Contacts/Contacts";
import CreateContactGroup from "../pages/Whatsapp/Contacts/CreateContactGroup/CreateContactGroup";
import EditContactGroup from "../pages/Whatsapp/Contacts/EditContactGroup/EditContactGroup";
import AddContactToContactGroup from "../pages/Whatsapp/Contacts/AddContactToContactGroup/AddContactToContactGroup";
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
      <Route path="/whatsapp_profile" element={<WhatsAppProfile />} />
      <Route path="/whatsapp_bulk" element={<BulkMessaging />} />
      <Route path="/whatsapp_bulk/create" element={<CreateBulkMessaging />} />
      <Route path="/whatsapp_history" element={<WhatsAppHistory />} />
      <Route path="/whatsapp_autoresponder" element={<WhatsAppAutoresponder />} />
      <Route path="/whatsapp_send_message" element={<WhatsAppQuickResponse />} />
      <Route path="/whatsapp_chatbot" element={<WhatsAppChatbot />} />
      <Route path="/whatsapp_link_generator" element={<WhatsAppLinkGenerator />} />
      <Route path="/whatsapp_api" element={<WhatsAppApi />} />
      <Route path="/whatsapp_poll_template" element={<WhatsAppPollTemplate />} />
      <Route path="/whatsapp_contact" element={<WhatsAppContacts />} />
      <Route path="/whatsapp_contact/create" element={<CreateContactGroup />} />
      <Route path="/whatsapp_contact/edit/:id" element={<EditContactGroup />} />
      <Route path="/whatsapp_contact/:groupId/contacts" element={<AddContactToContactGroup />} />
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
