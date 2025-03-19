import DashboardLayout from "../../../layouts/Dashboard/DashboardLayout";
import { Card } from "react-bootstrap";


const DashboardUser = () => {
  return (
    <DashboardLayout>
        <h1 className="mb-4">Panel de Usuario</h1>
        <Card className="p-3">
            <p>Bienvenido al panel de usuario. Aquí puedes ver tu información y acceder a tus datos.</p>
        </Card>
    </DashboardLayout>
);
};

export default DashboardUser;