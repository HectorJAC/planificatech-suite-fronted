import { FC } from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface NotesModalProps {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
}

export const NotesModal:FC<NotesModalProps> = ({showModal, setShowModal}) => {
    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Crear Nota</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Titulo de la Nota</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Ingrese nombre de la nota" 
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            placeholder="Ingrese la descripción de la nota"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cerrar
                </Button>
                <Button variant="primary" type="submit">
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};