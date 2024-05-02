import { Nav, Accordion } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './styles/sidebar.css';

export const Sidebar = () => {
    
    const navigate = useNavigate();

    return (
        <Accordion className="sidebar">
            <Accordion.Item eventKey="0">
                <Accordion.Header className="sidebar-header">Dashboard</Accordion.Header>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link onClick={() => navigate('/dashboard')}>Dashboard</Nav.Link>
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
                <Accordion.Header className="sidebar-header">Empresas</Accordion.Header>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link onClick={() => navigate('/edit_company')}>Editar Empresa</Nav.Link>
                </Accordion.Body>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link>Consultar Empresa</Nav.Link>
                </Accordion.Body>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link>Gráficas Empresa</Nav.Link>
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
                <Accordion.Header className="sidebar-header">Departamentos</Accordion.Header>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link>Crear Departamento</Nav.Link>
                </Accordion.Body>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link>Consultas Departamento</Nav.Link>
                </Accordion.Body>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link>Gráficas Departamento</Nav.Link>
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
                <Accordion.Header className="sidebar-header">Gerentes</Accordion.Header>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link>Crear Gerentes</Nav.Link>
                </Accordion.Body>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link>Consultas Gerentes</Nav.Link>
                </Accordion.Body>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link>Gráficas Gerentes</Nav.Link>
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
                <Accordion.Header className="sidebar-header">Empleados</Accordion.Header>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link onClick={() => navigate('/puestos')}>Creación/Consulta de Puestos</Nav.Link>
                </Accordion.Body>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link>Crear Empleados</Nav.Link>
                </Accordion.Body>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link>Consultas Empleados</Nav.Link>
                </Accordion.Body>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link>Gráficas Empleados</Nav.Link>
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
                <Accordion.Header className="sidebar-header">Proyectos</Accordion.Header>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link>Crear Proyectos</Nav.Link>
                </Accordion.Body>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link>Consultas Proyectos</Nav.Link>
                </Accordion.Body>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link>Gráficas Proyectos</Nav.Link>
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
                <Accordion.Header className="sidebar-header">Planes</Accordion.Header>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link>Crear Planes</Nav.Link>
                </Accordion.Body>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link>Consultas Planes</Nav.Link>
                </Accordion.Body>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link>Gráficas Planes</Nav.Link>
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="7">
                <Accordion.Header className="sidebar-header">Gráficas</Accordion.Header>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link onClick={() => navigate('/graphics')}>Generar Gráficas</Nav.Link>
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="8">
                <Accordion.Header className="sidebar-header">Utilidades</Accordion.Header>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link>Mis Notas</Nav.Link>
                </Accordion.Body>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link>Calendario</Nav.Link>
                </Accordion.Body>
            </Accordion.Item>

        </Accordion>
    );
};
