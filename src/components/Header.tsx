import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { Logout } from '../components/Logout';
import './styles/header.css';

interface HeaderProps {
    companyName: string;
    userName: string;
}

export const Header = ({ companyName, userName }: HeaderProps) => {

    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/home');
    };

    return (
        <Navbar style={{
            backgroundColor: 'rgba(7,119,238,0.8374999658066351)',
            color: 'black',
            paddingRight: '1rem',
        }}>
            <Navbar.Toggle />
            <Navbar.Brand className='navBar-title' onClick={handleHome}>PlanificaTech Suite</Navbar.Brand>
            <Navbar.Collapse className="justify-content-between">
                <Nav>
                    <Nav.Item className='navBar-company'>{companyName}</Nav.Item>
                </Nav>
                <Nav>
                    <Nav.Item className="d-flex align-items-center">
                        <span style={{ marginRight: '2rem', fontSize: '1.5rem' }}>{userName}</span>
                        <div style={{ marginRight: '2rem' }}>
                            <FaUser 
                                size={25}
                            />
                        </div>
                        
                        <div style={{ marginRight: '2rem' }}>
                            <Logout />
                        </div>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};