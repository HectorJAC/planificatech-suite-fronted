import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { Layout } from "../layout/Layout";
import { CustomAsterisk } from '../components/CustomAsterisk';
import axios from "axios";

interface UserDataProps {
    username: string;
    password: string;
    nombres: string;
    apellidos: string;
    cedula: number;
    lugar_nacimiento: string;
    fecha_nacimiento: string;
    direccion_residencia: string;
    numero_telefonico: string;
    correo: string;
    estado_civil: string;
    nivel_academico: string;
}

export const ProfilePage = () => {
    
    const [userData, setUserData] = useState<UserDataProps>({} as UserDataProps);
    const [editMode, setEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        repeatPassword: ''
    });

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/director_general/getDirectorGeneral`, {
            params: {
                id_director_general: localStorage.getItem('id')
            }
        })
        .then((response) => {
            setUserData(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    // Funcion por si uno de los datos del usuario es null que aparezca en el input como vacio
    const handleNull = (data: string | number) => {
        if (data === null) {
            return '';
        } else {
            return data;
        }
    };

    const handleSave = () => {
        console.log('Guardando cambios...');
    };
    
    const handleCancel = () => {
        setEditMode(false);
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (e: React.FormEvent<HTMLFormElement>) => {
        console.log(e);
    }

    const handleChangePassword = () => {
        // Lógica para cambiar la contraseña
        console.log('Cambiando contraseña...');
        handleCloseModal();
    };

    return (
        <Layout>
            <Container>
                <h1 className="fw-bold text-black my-3">Perfil</h1>
                <Row>
                    <Col md={6}>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label><CustomAsterisk/> Nombre de Usuario</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    disabled={!editMode} 
                                    value={handleNull(userData.username)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    disabled={!editMode}
                                    value={handleNull(userData.nombres)} 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Cedula</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    disabled={!editMode} 
                                    value={handleNull(userData.cedula)} 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Lugar de Nacimiento</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    disabled={!editMode} 
                                    value={handleNull(userData.lugar_nacimiento)} 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Estado Civil</Form.Label>
                                <Form.Select disabled={!editMode}>
                                    <option value="soltero(a)">Soltero(a)</option>
                                    <option value="casado(a)">Casado(a)</option>
                                    <option value="viudo(a)">Viudo(a)</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Nivel Académico</Form.Label>
                                <Form.Select disabled={!editMode}>
                                    <option value="primario">Primario</option>
                                    <option value="secundario">Secundario</option>
                                    <option value="bachiller">Bachiller</option>
                                    <option value="universitario">Universitario</option>
                                    <option value="profesional">Profesional</option>
                                </Form.Select>
                            </Form.Group>

                            {/* Botones de editar y cancelar */}
                            <div className="d-flex justify-content-between mb-2">
                                {!editMode ? (
                                    <Button onClick={handleEdit}>Editar</Button>
                                ) : (
                                    <>
                                        <Button onClick={handleSave} variant="primary">
                                            Guardar
                                        </Button>

                                        <Button onClick={handleCancel} variant="secondary">
                                            Cancelar
                                        </Button>
                                    </>
                                )}
                            </div>
                        </Form>
                    </Col>

                    <Col md={6}>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label><CustomAsterisk/> Contraseña</Form.Label>
                                <div className="d-flex align-items-center">
                                    <Form.Control 
                                        type="password" 
                                        disabled={!editMode} 
                                        value={handleNull(userData.password)} 
                                    />
                                    <Button variant="secondary" onClick={handleShowModal} className="ms-2">Cambiar</Button>
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    disabled={!editMode} 
                                    value={handleNull(userData.apellidos)} 
                                />
                            </Form.Group>
                            
                            <Form.Group className="mb-3">
                                <Form.Label>Fecha de Nacimiento</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    disabled={!editMode} 
                                    value={handleNull(userData.fecha_nacimiento)} 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Direccion de Residencia</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    disabled={!editMode} 
                                    value={handleNull(userData.direccion_residencia)} 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Number Telefonico</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    disabled={!editMode} 
                                    value={handleNull(userData.numero_telefonico)} 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    disabled={!editMode} 
                                    value={handleNull(userData.correo)} 
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>

                {/* Modal para cambiar contraseña */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Cambiar Contraseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Contraseña Actual</Form.Label>
                        <Form.Control
                            type="password"
                            name="currentPassword"
                            value={''}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nueva Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            name="newPassword"
                            value={''}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Repetir Nueva Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            name="repeatPassword"
                            value={''}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleChangePassword}>Guardar</Button>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
                </Modal.Footer>
            </Modal>
            </Container>
        </Layout>
    );
}