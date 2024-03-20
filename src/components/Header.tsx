import { Navbar, Nav } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import './styles/header.css';

interface HeaderProps {
    companyName: string;
    userName: string;
}

export const Header = ({ companyName, userName }: HeaderProps) => {
    return (
        <Navbar style={{
            backgroundColor: '#688BF9',
            color: 'black',
            paddingTop: '1rem',
            paddingRight: '1rem',
            paddingBottom: '1rem'
        }}>
            <Navbar.Toggle />
            <Navbar.Brand className='navBar-title'>PlanificaTech Suite</Navbar.Brand>
            <Navbar.Collapse className="justify-content-between">
                <Nav>
                    <Nav.Item className='navBar-company'>{companyName}</Nav.Item>
                </Nav>
                <Nav>
                    <Nav.Item className="d-flex align-items-center">
                        <span style={{ marginRight: '2rem' }}>{userName}</span>
                        <div style={{ marginRight: '2rem' }}>
                            <FaUser />
                        </div>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};