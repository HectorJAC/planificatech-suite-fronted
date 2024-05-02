import { Navbar, Nav } from 'react-bootstrap';
import './styles/header.css';
import { CustomTooltip } from './CustomTooltip';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { SlLogout } from "react-icons/sl";
import { FaNoteSticky } from "react-icons/fa6";
import { NotesModal } from './NotesModal';
import { useState } from 'react';

interface HeaderProps {
    companyName: string;
    userName: string;
}

export const Header = ({ companyName, userName }: HeaderProps) => {

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const openNotesModal = () => {
        setShowModal(true);
    };

    const goToHome = () => {
        navigate('/home');
    };

    const goToProfile = () => {
        navigate('/profile');
    }

    const handleLogout = () => {
        // Eliminar el token de acceso del almacenamiento local
        localStorage.removeItem('accesToken');
        localStorage.removeItem('username');
        localStorage.removeItem('id');

        // Redirigir al usuario a la página de inicio de sesión
        navigate('/');
    };

    return (
        <>
            <Navbar style={{
                backgroundColor: 'rgba(7,119,238,0.8374999658066351)',
                color: 'black',
                paddingRight: '1rem',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 3,
                width: '100%',
            }}>
                <Navbar.Toggle />
                <Navbar.Brand className='navBar-title'>
                    <CustomTooltip
                        text="Inicio"
                        placement="bottom"
                        onClick={goToHome}
                        style={{border: 'none', backgroundColor: 'transparent'}}
                    >
                        <span className='navBar-title'>PlanificaTech Suite</span>
                    </CustomTooltip>
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-between">
                    <Nav>
                        <Nav.Item className='navBar-company'>{companyName}</Nav.Item>
                    </Nav>
                    <Nav>
                        <Nav.Item className="d-flex align-items-center">
                            <span style={{ marginRight: '2rem', fontSize: '1.5rem' }}>{userName}</span>
                            <div style={{ marginRight: '2rem' }}>
                                <CustomTooltip
                                    text="Crear nota"
                                    placement="bottom"
                                    onClick={openNotesModal}
                                >
                                    <FaNoteSticky size={20} />
                                </CustomTooltip>
                            </div>

                            <div style={{ marginRight: '2rem' }}>
                                <CustomTooltip
                                    text="Perfil de usuario"
                                    placement="bottom"
                                    onClick={goToProfile}
                                >
                                    <FaUser size={20} />
                                </CustomTooltip>
                            </div>
                            
                            <div style={{ marginRight: '2rem' }}>
                                <CustomTooltip
                                    text="Cerrar sesión"
                                    placement="bottom"
                                    onClick={handleLogout}
                                >
                                    <SlLogout size={20} />
                                </CustomTooltip>
                            </div>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <NotesModal 
                showModal={showModal}
                setShowModal={setShowModal}
            />
        </>
    );
};