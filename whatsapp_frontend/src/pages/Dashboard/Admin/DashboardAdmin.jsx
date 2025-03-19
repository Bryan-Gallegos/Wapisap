import DashboardLayout from "../../../layouts/Dashboard/DashboardLayout";
import { Card } from "react-bootstrap";

const DashboardAdmin = () => {
  return(
    <DashboardLayout>
      <h1 className="mb-4">Panel de Administración</h1>
      <Card className="p-3">
        <p>Bienvenido al panel de Administración. Aquí puedes gestionar usuarios y configuraciones</p>
      </Card>
    </DashboardLayout>
  );
};

export default DashboardAdmin;