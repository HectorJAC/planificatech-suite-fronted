import { Accordion } from 'react-bootstrap';
import './styles/sidebar.css';
import { FC } from "react";

interface SidebarSectionProps {
    section: string;
    children: React.ReactNode;
    eventKey: string;
}

export const SidebarSection:FC<SidebarSectionProps> = ({ section, children, eventKey }) => {
    return (
        <Accordion className="sidebar">
            <Accordion.Item eventKey={eventKey}>
                <Accordion.Header className="sidebar-button">{section}</Accordion.Header>
                <Accordion.Body className="sidebar-subbutton">
                    {children}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};