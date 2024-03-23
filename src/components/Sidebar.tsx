import { Nav } from "react-bootstrap";
import { SidebarSection } from "./SidebarSection";
import './styles/sidebar.css';

export const Sidebar = () => {
    return (
        <div className="sidebar">
            <SidebarSection section="Empresas">
                <Nav.Link className="sidebar-subbutton">Editar Empresa</Nav.Link>
                <Nav.Link className="sidebar-subbutton">Consultas Empresa</Nav.Link>
            </SidebarSection>
            <SidebarSection section="Departamentos">
                <Nav.Link className="sidebar-subbutton">Crear Departamentos</Nav.Link>
                <Nav.Link className="sidebar-subbutton">Consultas Departamentos</Nav.Link>
            </SidebarSection>
            <SidebarSection section="Gerentes">
                <Nav.Link className="sidebar-subbutton">Crear Gerentes</Nav.Link>
                <Nav.Link className="sidebar-subbutton">Consultas Gerentes</Nav.Link>
            </SidebarSection>
            <SidebarSection section="Empleados">
                <Nav.Link className="sidebar-subbutton">Crear Empleados</Nav.Link>
                <Nav.Link className="sidebar-subbutton">Consultas Empleados</Nav.Link>
            </SidebarSection>
            <SidebarSection section="Proyectos">
                <Nav.Link className="sidebar-subbutton">Crear Proyectos</Nav.Link>
                <Nav.Link className="sidebar-subbutton">Consultas Proyectos</Nav.Link>
            </SidebarSection>
            <SidebarSection section="Planes">
                <Nav.Link className="sidebar-subbutton">Crear Planes</Nav.Link>
                <Nav.Link className="sidebar-subbutton">Consultas Planes</Nav.Link>
            </SidebarSection>
            <SidebarSection section="Gráficas">
                <Nav.Link className="sidebar-subbutton"></Nav.Link>
                <Nav.Link className="sidebar-subbutton"></Nav.Link>
            </SidebarSection>
        </div>
    );
};
