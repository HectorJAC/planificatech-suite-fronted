import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, Table, Modal } from "react-bootstrap";
import { Layout } from "../layout/Layout";
import { toast, ToastContainer } from 'react-toastify';
import { EditButton, DeleteButton } from "../components/Buttons";

interface PuestoProps {
    id_puesto: number;
    nombre_puesto: string;
    descripcion_puesto: string;
    estado: string;
}

export const PuestosPage = () => {
    const [puestos, setPuestos] = useState<PuestoProps[]>([]);
    const [searchPuesto, setSearchPuesto] = useState('');
    const [searchResults, setSearchResults] = useState<PuestoProps[]>([]);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [puestoData, setPuestoData] = useState({} as PuestoProps);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/puestos/getPuestos`)
        .then((response) => {
            setPuestos(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const handlePuestosInactivos = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/puestos/getPuestosInactivos`)
        .then((response) => {
            if (isCheckboxChecked === false) {
                setPuestos(response.data);
            } else {
                axios.get(`${import.meta.env.VITE_API_URL}/puestos/getPuestos`)
                .then((response) => {
                    setPuestos(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleSearchPuesto = () => {
        const results = puestos.filter(puesto => puesto.nombre_puesto.toLowerCase().includes(searchPuesto.toLowerCase()));
        if (results.length > 0) {
            setSearchResults(results);
        } else {
            toast.error('No se encontraron resultados');
        }
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleSubmit = () => {
        if (puestoData.nombre_puesto === '') {
            toast.error('Debe ingresar el nombre del puesto');
        } else {
            axios.post(`${import.meta.env.VITE_API_URL}/puestos/createPuesto`, {
                nombre_puesto: puestoData.nombre_puesto,
                descripcion_puesto: puestoData.descripcion_puesto,
                estado: 'ACTIVO'
            })
            .then((response) => {
                toast.success(response.data.message);
            })
            .catch((error) => {
                console.log(error);
            });
            
            // Cerrar modal
            setShowModal(false);

            // Actualizar lista de puestos
            axios.get(`${import.meta.env.VITE_API_URL}/puestos/getPuestos`)
            .then((response) => {
                setPuestos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    };

    return (
        <Layout>
            <Container>
                <Row>
                    <Col>
                        <h1 className="mt-3 mb-4">
                            Creación/Consulta de Puestos
                        </h1>
                    </Col>
                </Row>

                <Row>
                    <Col md={2}>
                        <Button 
                            variant="primary" 
                            style={{
                                marginBottom: '20px',
                                marginLeft: '20px'
                            }}
                            onClick={handleShowModal}
                        >
                            Crear Puesto
                        </Button>
                    </Col>

                    <Col md={10}>
                        <div className="input-group">
                            <Form.Control 
                                type="text" 
                                placeholder="Buscar Puesto" 
                                value={searchPuesto}
                                onChange={(e) => setSearchPuesto(e.target.value)}
                            />
                            <Button 
                                variant="primary" 
                                onClick={handleSearchPuesto}
                            >
                                Buscar
                            </Button>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check 
                                    type="checkbox" 
                                    label="Puestos Inactivos"
                                    checked={isCheckboxChecked}
                                    onChange={
                                        () => {
                                            setIsCheckboxChecked(!isCheckboxChecked);
                                            handlePuestosInactivos();
                                        }
                                    }
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre Puesto</th>
                                    <th>Descripción</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.length > 0 ? (
                                    searchResults.map((puesto, index) => (
                                        <tr key={index}>
                                            <td>{puesto.id_puesto}</td>
                                            <td>{puesto.nombre_puesto}</td>
                                            <td>{puesto.descripcion_puesto}</td>
                                            <td>{puesto.estado}</td>
                                            <td>
                                                <EditButton />
                                                <DeleteButton />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    puestos.map((puesto, index) => (
                                        <tr key={index}>
                                            <td>{puesto.id_puesto}</td>
                                            <td>{puesto.nombre_puesto}</td>
                                            <td>{puesto.descripcion_puesto}</td>
                                            <td>{puesto.estado}</td>
                                            <td>
                                                <EditButton />
                                                <DeleteButton />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Crear Puesto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Nombre Puesto</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Ingrese nombre del puesto" 
                                    value={puestoData.nombre_puesto}
                                    onChange={(e) => setPuestoData({...puestoData, nombre_puesto: e.target.value})}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={3} 
                                    placeholder="Ingrese descripción del puesto" 
                                    value={puestoData.descripcion_puesto}
                                    onChange={(e) => setPuestoData({...puestoData, descripcion_puesto: e.target.value})}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cerrar
                        </Button>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
            <ToastContainer />
        </Layout>
    );
};