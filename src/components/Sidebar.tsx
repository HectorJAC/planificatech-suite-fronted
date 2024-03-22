import { Nav } from 'react-bootstrap';
import { FaAngleDown } from "react-icons/fa6";
import './styles/sidebar.css';

export const Sidebar = () => {
    return (
        <div className="sidebar">
            <Nav className="flex-column">
                <Nav.Link className='sidebar-button'>Empresa <FaAngleDown /></Nav.Link>
                <Nav.Link className='sidebar-button'>Departamentos <FaAngleDown /></Nav.Link>
                <Nav.Link className='sidebar-button'>Empleados <FaAngleDown /></Nav.Link>
                <Nav.Link className='sidebar-button'>Proyectos <FaAngleDown /></Nav.Link>
                <Nav.Link className='sidebar-button'>Planes <FaAngleDown /></Nav.Link>
                <Nav.Link className='sidebar-button'>Gráficas <FaAngleDown /></Nav.Link>
            </Nav>
        </div>
    );
};
