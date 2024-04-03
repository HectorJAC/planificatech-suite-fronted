import { Button, Modal } from "react-bootstrap";

interface ModalAceptarCancelarProps {
  show: boolean;
  onHide: () => void;
  onAceptar: () => void;
  titulo: string;
  mensaje: string;
}

export const ModalAceptarCancelar: React.FC<ModalAceptarCancelarProps> = ({
  show,
  onHide,
  onAceptar,
  titulo,
  mensaje,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{mensaje}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onAceptar}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};