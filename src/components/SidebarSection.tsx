import { useState } from 'react';
import { Nav, Accordion } from 'react-bootstrap';
import { FaAngleDown } from "react-icons/fa6";
import './styles/sidebar.css';

interface SidebarSectionProps {
    section: string;
    children: React.ReactNode;
}

export const SidebarSection = ({ section, children }: SidebarSectionProps) => {
    const [openSection, setOpenSection] = useState('');

    const handleSectionClick = (section: string) => {
        setOpenSection(openSection === section ? '' : section);
    };

    return (
        <Accordion defaultActiveKey="">
            <Nav.Link 
                className='sidebar-button' 
                onClick={() => handleSectionClick(section)}
            >
                {section} <FaAngleDown />
            </Nav.Link>
            <Accordion.Collapse 
                eventKey={section}
                in={openSection === section}
            >
                <Nav className="flex-column">
                    {children}
                </Nav>
            </Accordion.Collapse>
        </Accordion>
    );
};