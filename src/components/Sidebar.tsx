import { Nav } from 'react-bootstrap';
import './styles/sidebar.css';

export const Sidebar = () => {
    return (
        <div className="sidebar">
            <Nav className="flex-column">
                <Nav.Link className='sidebar-button'>Empresa</Nav.Link>
                <Nav.Link className='sidebar-button'>Departamentos</Nav.Link>
                <Nav.Link className='sidebar-button'>Empleados</Nav.Link>
                <Nav.Link className='sidebar-button'>Proyectos</Nav.Link>
                <Nav.Link className='sidebar-button'>Planes</Nav.Link>
                <Nav.Link className='sidebar-button'>Gráficas</Nav.Link>
            </Nav>
        </div>
    );
};
