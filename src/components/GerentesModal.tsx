import { FC, useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { GerentesProps } from "../interfaces/gerenteInterface";
import axios from "axios";

interface GerentesModalProps {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    idGerente: string;
}

export const GerentesModal:FC<GerentesModalProps> = ({showModal, setShowModal, idGerente}) => {
    const [gerenteData, setGerenteData] = useState<GerentesProps>({} as GerentesProps);

    useEffect(() => {
        showModal &&
        axios.get(`${import.meta.env.VITE_API_URL}/gerentes/getGerenteById`, {
            params: {
                id_gerente: idGerente
            }
        })
        .then((response) => {
            setGerenteData(response.data);
        })
    }, [idGerente, showModal]);

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Gerente: {gerenteData.nombres} {gerenteData.apellidos}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="mb-3">
                    <Col md={6}>
                        <strong>Sexo:</strong>
                        <p>{gerenteData.sexo}</p>
                    </Col>
                    <Col md={6}>
                        <strong>Fecha de nacimiento:</strong>
                        <p>{gerenteData.fecha_nacimiento}</p>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <strong>Lugar de Nacimiento:</strong>
                        <p>{gerenteData.lugar_nacimiento}</p>
                    </Col>
                    <Col md={6}>
                        <strong>Dirección de Residencia:</strong>
                        <p>{gerenteData.direccion_residencia}</p>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <strong>Estado Civil:</strong>
                        <p>{gerenteData.estado_civil}</p>
                    </Col>
                    <Col md={6}>
                        <strong>Correo:</strong>
                        <p>{gerenteData.correo}</p>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <strong>Teléfono:</strong>
                        <p>{gerenteData.numero_telefonico}</p>
                    </Col>
                    <Col md={6}>
                        <strong>Fecha de Ingreso a la Empresa:</strong>
                        <p>{gerenteData.fecha_ingreso_empresa}</p>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};