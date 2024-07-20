import axios from "axios";
import { FC, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { getIdUser } from "../helpers/getLocalStorageData";
import { CustomAsterisk } from "./CustomAsterisk";

interface NotesModalProps {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
}

interface NoteProps {
    tituloNota: string;
    descripcionNota: string;
}

export const NotesModal:FC<NotesModalProps> = ({showModal, setShowModal}) => {

    const [noteData, setNoteData] = useState<NoteProps>({
        tituloNota: '',
        descripcionNota: '',
    });

    // Función para obtener la fecha de creación de la nota
    const fechaCreacionNota = new Date().toLocaleDateString();

    const handleSaveNote = () => {
        if (noteData.tituloNota === '' || noteData.descripcionNota === '') {
            toast.error('Todos los campos son obligatorios');
            return;
        } else {
            axios.post(`${import.meta.env.VITE_API_URL}/notas/createNote`, {
                titulo_nota: noteData.tituloNota,
                descripcion_nota: noteData.descripcionNota,
                fecha_creacion_nota: fechaCreacionNota,
                id_usuario: getIdUser(),
                estado: 'ACTIVO'
            })
            .then((response) => {
                toast.success(`${response.data.message}`);
            })
            .catch((error) => {
                toast.error(`${error.response.data.message}`);
            });
    
            // Limpiar los campos del formulario
            setNoteData({
                tituloNota: '',
                descripcionNota: '',
            });
    
            // Cerrar el modal
            setShowModal(false);
        }
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Crear Nota</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label><CustomAsterisk /> Titulo de la Nota</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Ingrese el nombre de la nota" 
                            value={noteData.tituloNota}
                            onChange={(e) => setNoteData({...noteData, tituloNota: e.target.value})}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label><CustomAsterisk /> Fecha Creación de la Nota</Form.Label>
                        <Form.Control 
                            type="text" 
                            readOnly
                            placeholder="Fecha de Creación de la Nota"
                            value={fechaCreacionNota} 
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label><CustomAsterisk /> Descripción de la nota</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            placeholder="Ingrese la descripción de la nota"
                            value={noteData.descripcionNota}
                            onChange={(e) => setNoteData({...noteData, descripcionNota: e.target.value})}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cerrar
                </Button>
                <Button variant="primary" type="submit" onClick={handleSaveNote}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};