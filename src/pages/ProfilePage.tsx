import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import { Layout } from "../layout/Layout";
import { CustomAsterisk } from '../components/CustomAsterisk';
import { Spinner } from "../components/Spinner";
import { ModalAceptarCancelar } from "../components/ModalAceptarCancelar";
import { CustomPasswordInput } from "../components/CustomPasswordInput";

interface UserDataProps {
    username: string;
    password: string;
    nombres: string;
    apellidos: string;
    cedula: number;
    lugar_nacimiento: string;
    fecha_nacimiento: string;
    direccion_residencia: string;
    numero_telefonico: number;
    correo: string;
    estado_civil: string;
    nivel_academico: string;
}

export const ProfilePage = () => {
    
    const [userData, setUserData] = useState<UserDataProps>({} as UserDataProps);
    const [editMode, setEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalAceptarCancelar, setShowModalAceptarCancelar] = useState(false);
    const [passwordData, setPasswordData] = useState({
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

    const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (passwordData.newPassword === '' || passwordData.newPassword === '') {
            toast.error('Todos los campos son requeridos');
        } else if (passwordData.newPassword === userData.password) {
            toast.error('La nueva contraseña no puede ser igual a la actual');
        } else if (passwordData.newPassword !== passwordData.newPassword) {
            toast.error('Las contraseñas no coinciden');
        } else {
            toast.success('Cambio de contraseña guardado exitosamente');
            // Colocar la nueva contraseña en el objeto userData
            setUserData(prevState => ({ ...prevState, password: passwordData.newPassword }));
            // Cerrar el modal y limpiar los campos
            handleCloseModal();
        }
    }; 

    const handleSave = () => {
        if (
            userData.username === '' || 
            userData.password === '' || 
            userData.nombres === '' || 
            userData.apellidos === '' || 
            userData.cedula === Number('') || 
            userData.fecha_nacimiento === '' || 
            userData.direccion_residencia === '' || 
            userData.numero_telefonico === Number('')
        ) {
            toast.error('Llenas los campos requeridos');
        } else {
            axios.put(`${import.meta.env.VITE_API_URL}/director_general/updateDirectorGeneral`, {
                id_director_general: localStorage.getItem('id'),
                username: userData.username,
                password: userData.password,
                nombres: userData.nombres,
                apellidos: userData.apellidos,
                cedula: userData.cedula,
                lugar_nacimiento: userData.lugar_nacimiento,
                fecha_nacimiento: userData.fecha_nacimiento,
                direccion_residencia: userData.direccion_residencia,
                numero_telefonico: userData.numero_telefonico,
                correo: userData.correo,
                estado_civil: userData.estado_civil,
                nivel_academico: userData.nivel_academico
            })
            .then((response) => {
                toast.success(`${response.data.message}`);
                setEditMode(false);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    };
    
    const handleCancel = () => {
        setShowModalAceptarCancelar(false);
        setEditMode(false);
        // Hacer una peticion get para traer los datos del usuario
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
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        // Limpiar los campos del modal
        setPasswordData({
            newPassword: '',
            repeatPassword: ''
        });
    };

    const handleShowModalAceptarCancelar = () => {
        setShowModalAceptarCancelar(true);
    };

    const handleCloseModalAceptarCancelar = () => {
        setShowModalAceptarCancelar(false);
    };

    return (
        <Layout>
            <Container>
                {
                    Object.keys(userData).length === 0 ? (
                        <Spinner />
                    ) : null
                }
                <h1 className="fw-bold text-black my-3">Perfil</h1>
                <Row>
                    <Col md={6}>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label><CustomAsterisk/> Nombre de Usuario</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    disabled 
                                    value={handleNull(userData.username)}
                                    onChange={(e) => setUserData(prevState => ({ ...prevState, username: e.target.value }))}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label><CustomAsterisk/> Nombres</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    disabled={!editMode}
                                    value={handleNull(userData.nombres)} 
                                    onChange={(e) => setUserData(prevState => ({ ...prevState, nombres: e.target.value }))}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label><CustomAsterisk/> Cedula</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    disabled={!editMode} 
                                    value={handleNull(userData.cedula)} 
                                    onChange={(e) => setUserData(prevState => ({ ...prevState, cedula: Number(e.target.value) }))}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Lugar de Nacimiento</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    disabled={!editMode} 
                                    value={handleNull(userData.lugar_nacimiento)} 
                                    onChange={(e) => setUserData(prevState => ({ ...prevState, lugar_nacimiento: e.target.value }))}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Estado Civil</Form.Label>
                                <Form.Select 
                                    disabled={!editMode}
                                    value={handleNull(userData.estado_civil)}
                                >
                                    <option value="soltero(a)">Soltero(a)</option>
                                    <option value="casado(a)">Casado(a)</option>
                                    <option value="viudo(a)">Viudo(a)</option>
                                    <option value="union libre">Unión Libre</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Nivel Académico</Form.Label>
                                <Form.Select 
                                    disabled={!editMode}
                                    value={handleNull(userData.nivel_academico)}
                                >
                                    <option value="primario">Primario</option>
                                    <option value="secundario">Secundario(Bachillerato)</option>
                                    <option value="universitario">Universitario</option>
                                    <option value="profesional">Profesional</option>
                                    <option value="diplomado">Diplomado</option>
                                    <option value="certificacion">Certificación</option>
                                    <option value="maestria">Maestría</option>
                                    <option value="doctorado">Doctorado</option>
                                    <option value="postgrado">Postgrado</option>
                                    <option value="tecnico">Técnico</option>
                                </Form.Select>
                            </Form.Group>

                            {/* Botones de editar y cancelar */}
                            <div className="d-flex justify-content-between mb-2">
                                {!editMode ? (
                                    <Button onClick={handleEdit}>Modo Edición</Button>
                                ) : (
                                    <>
                                        <Button onClick={handleSave} variant="primary">
                                            Guardar
                                        </Button>

                                        <Button onClick={handleShowModalAceptarCancelar} variant="secondary">
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
                                        type='password'
                                        disabled
                                        value={handleNull(userData.password)}
                                    />
                                    <Button 
                                        variant="secondary" 
                                        onClick={handleShowModal} 
                                        className="ms-2"
                                        disabled={!editMode}
                                    >
                                        Cambiar
                                    </Button>
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label><CustomAsterisk/> Apellidos</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    disabled={!editMode} 
                                    value={handleNull(userData.apellidos)} 
                                    onChange={(e) => setUserData(prevState => ({ ...prevState, apellidos: e.target.value }))}
                                />
                            </Form.Group>
                            
                            <Form.Group className="mb-3">
                                <Form.Label><CustomAsterisk/> Fecha de Nacimiento</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    disabled={!editMode} 
                                    value={handleNull(userData.fecha_nacimiento)} 
                                    onChange={(e) => setUserData(prevState => ({ ...prevState, fecha_nacimiento: e.target.value }))}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label><CustomAsterisk/> Direccion de Residencia</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    disabled={!editMode} 
                                    value={handleNull(userData.direccion_residencia)} 
                                    onChange={(e) => setUserData(prevState => ({ ...prevState, direccion_residencia: e.target.value }))}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label><CustomAsterisk/> Numero Telefonico</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    disabled={!editMode} 
                                    value={handleNull(userData.numero_telefonico)} 
                                    onChange={(e) => setUserData(prevState => ({ ...prevState, numero_telefonico: Number(e.target.value) }))}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    disabled={!editMode} 
                                    value={handleNull(userData.correo)} 
                                    onChange={(e) => setUserData(prevState => ({ ...prevState, correo: e.target.value }))}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>

                {/* Modal para cambiar contraseña */}
                <Modal show={showModal} onHide={handleCloseModal}>
                    <form onSubmit={handleChangePassword}>
                        <Modal.Header closeButton>
                            <Modal.Title>Cambiar Contraseña</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <CustomPasswordInput
                                nameLabel="Contraseña Actual" 
                                password={userData.password}
                                name="currentPassword"
                                readonly={true}
                            />

                            <CustomPasswordInput 
                                nameLabel="Nueva Contraseña"
                                password={passwordData.newPassword}
                                name="newPassword"
                                readonly={false}
                                onchange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            />

                            <CustomPasswordInput
                                nameLabel="Repetir Nueva Contraseña"
                                password={passwordData.repeatPassword}
                                name="repeatPassword"
                                readonly={false}
                                onchange={(e) => setPasswordData({ ...passwordData, repeatPassword: e.target.value })}
                            />

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type='submit'>Guardar</Button>
                            <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
                <ModalAceptarCancelar 
                    show={showModalAceptarCancelar} 
                    onHide={handleCloseModalAceptarCancelar} 
                    onAceptar={handleCancel} 
                    titulo="Cancelar" 
                    mensaje="¿Estás seguro de cancelar la operación?"
                />
            </Container>
            <ToastContainer />
        </Layout>
    );
}