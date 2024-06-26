import { Navbar, Nav } from 'react-bootstrap';
import { Logout } from '../components/Logout';
import { ProfileButton } from './ProfileButton';
import { PlanificaTechSuiteButton } from './PlanificaTechSuiteButton';
import './styles/header.css';

interface HeaderProps {
    companyName: string;
    userName: string;
}

export const Header = ({ companyName, userName }: HeaderProps) => {

    return (
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
            <Navbar.Brand className='navBar-title'><PlanificaTechSuiteButton /></Navbar.Brand>
            <Navbar.Collapse className="justify-content-between">
                <Nav>
                    <Nav.Item className='navBar-company'>{companyName}</Nav.Item>
                </Nav>
                <Nav>
                    <Nav.Item className="d-flex align-items-center">
                        <span style={{ marginRight: '2rem', fontSize: '1.5rem' }}>{userName}</span>
                        <div style={{ marginRight: '2rem' }}>
                            <ProfileButton />
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