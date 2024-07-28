import { Nav, Accordion } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './styles/sidebar.css';
import { FC, useEffect, useState } from "react";
import { useUI } from "../context/useUI";
import { getUserById } from "../api/usuarios/getUserById";

interface UserProps {
    username: string;
    password: string;
    tipo_usuario: string;
}

export const Sidebar:FC = () => {
    
    const navigate = useNavigate();
    const { state, dispatch } = useUI();
    const [user, setUser] = useState<UserProps>({} as UserProps);

    const handleSectionClick = (section: string) => {
        dispatch({ type: 'SET_OPEN_SECTION', payload: state.openSection === section ? null : section });
    };

    useEffect(() => {
        getUserById()
            .then((response) => {
                setUser(response);
            })
    }, []);

    return (
        <Accordion className="sidebar" activeKey={state.openSection} onSelect={(eventKey) => handleSectionClick(eventKey as string)}>
            <Accordion.Item eventKey="0">
                <Accordion.Header className="sidebar-header">Dashboard</Accordion.Header>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link onClick={() => navigate('/dashboard')}>Dashboard</Nav.Link>
                </Accordion.Body>
            </Accordion.Item>

            {
                user.tipo_usuario === '1' && (
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
                )
            }

            <Accordion.Item eventKey="2">
                <Accordion.Header className="sidebar-header">Departamentos</Accordion.Header>
                {
                    user.tipo_usuario === '1' && (
                        <Accordion.Body className="sidebar-body">
                            <Nav.Link onClick={() => navigate('/create_department')}>Crear Departamento</Nav.Link>
                        </Accordion.Body>
                    )
                }
                {
                    user.tipo_usuario === '2' && (
                        <Accordion.Body className="sidebar-body">
                            <Nav.Link onClick={() => navigate('/create_department')}>Mi Departamento</Nav.Link>
                        </Accordion.Body>
                    )
                }
                <Accordion.Body className="sidebar-body">
                    <Nav.Link>Consultas Departamento</Nav.Link>
                </Accordion.Body>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link>Gráficas Departamento</Nav.Link>
                </Accordion.Body>
            </Accordion.Item>

            {
                user.tipo_usuario === '1' && (
                    <Accordion.Item eventKey="3">
                        <Accordion.Header className="sidebar-header">Gerentes</Accordion.Header>
                        <Accordion.Body className="sidebar-body">
                            <Nav.Link onClick={() => navigate('/list_managers')}>Consultas Gerentes</Nav.Link>
                        </Accordion.Body>
                        <Accordion.Body className="sidebar-body">
                            <Nav.Link>Gráficas Gerentes</Nav.Link>
                        </Accordion.Body>
                    </Accordion.Item>
                )
            }

            <Accordion.Item eventKey="4">
                <Accordion.Header className="sidebar-header">Empleados</Accordion.Header>
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
                <Accordion.Header className="sidebar-header">Reportes</Accordion.Header>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link>Crear Reporte</Nav.Link>
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="9">
                <Accordion.Header className="sidebar-header">Utilidades</Accordion.Header>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link onClick={() => navigate('/my_notes')}>Mis Notas</Nav.Link>
                </Accordion.Body>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link>Calendario</Nav.Link>
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="10">
                <Accordion.Header className="sidebar-header">Configuracion</Accordion.Header>
                <Accordion.Body className="sidebar-body">
                    <Nav.Link onClick={() => navigate('/puestos')}>Creación/Consulta de Puestos</Nav.Link>
                </Accordion.Body>
            </Accordion.Item>

        </Accordion>
    );
};
