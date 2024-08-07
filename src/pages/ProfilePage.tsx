import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import { Layout } from "../layout/Layout";
import { CustomAsterisk } from '../components/CustomAsterisk';
import { CustomPasswordInput } from "../components/CustomPasswordInput";
import { getIdDirectorGeneral } from "../helpers/getLocalStorageData";
import { CustomBasicModal } from "../components/CustomBasicModal";
import { getDirectorGeneralById } from "../api/director_general/getDIrectorGeneralById";
import { getUserById } from "../api/usuarios/getUserById";
import { handleDataNull } from "../helpers/handleDataNull";
import { formatterDate } from "../helpers/formatters";

interface UserDataProps {
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

interface UserNamePassowrdProps {
    username: string;
    password: string;
}

export const ProfilePage = () => {
    
  const [namePassword, setNamePassword] = useState<UserNamePassowrdProps>({} as UserNamePassowrdProps);
  const [userData, setUserData] = useState<UserDataProps>({} as UserDataProps);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    repeatPassword: ''
  });

  useEffect(() => {
    getDirectorGeneralById()
      .then((response) => {
        setUserData(response);
      })
      .catch((error) => {
        console.log(error);
      });
    getUserById()
      .then((response) => {
        setNamePassword(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordData.newPassword === '' || passwordData.newPassword === '') {
      toast.error('Todos los campos son requeridos');
    } else if (passwordData.newPassword === namePassword.password) {
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
      namePassword.username === '' || 
            namePassword.password === '' || 
            userData.nombres === '' || 
            userData.apellidos === '' || 
            userData.cedula === Number('') || 
            userData.fecha_nacimiento === '' || 
            userData.direccion_residencia === '' || 
            userData.numero_telefonico === Number('')
    ) {
      toast.error('Llenar los campos requeridos');
    } else {
      axios.put(`${import.meta.env.VITE_API_URL}/director_general/updateDirectorGeneral`, {
        id_director_general: getIdDirectorGeneral(),
        username: namePassword.username,
        password: namePassword.password,
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
    setShowCancelModal(false);
    setEditMode(false);
    // Hacer una peticion get para traer los datos del usuario
    getDirectorGeneralById()
      .then((response) => {
        setUserData(response);
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

  const handleShowConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleShowCancelModal = () => {
    setShowCancelModal(true);
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
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
                  disabled 
                  value={handleDataNull(namePassword.username)}
                  onChange={(e) => setUserData(prevState => ({ ...prevState, username: e.target.value }))}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label><CustomAsterisk/> Nombres</Form.Label>
                <Form.Control 
                  type="text" 
                  disabled={!editMode}
                  value={handleDataNull(userData.nombres)} 
                  onChange={(e) => setUserData(prevState => ({ ...prevState, nombres: e.target.value }))}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label><CustomAsterisk/> Cedula</Form.Label>
                <Form.Control 
                  type="number" 
                  disabled={!editMode} 
                  value={handleDataNull(userData.cedula)} 
                  onChange={(e) => setUserData(prevState => ({ ...prevState, cedula: Number(e.target.value) }))}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Lugar de Nacimiento</Form.Label>
                <Form.Control 
                  type="text" 
                  disabled={!editMode} 
                  value={handleDataNull(userData.lugar_nacimiento)} 
                  onChange={(e) => setUserData(prevState => ({ ...prevState, lugar_nacimiento: e.target.value }))}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Estado Civil</Form.Label>
                <Form.Select 
                  disabled={!editMode}
                  value={handleDataNull(userData.estado_civil)}
                >
                  <option value="Soltero(a)">Soltero(a)</option>
                  <option value="Casado(a)">Casado(a)</option>
                  <option value="Viudo(a)">Viudo(a)</option>
                  <option value="Union Libre">Unión Libre</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nivel Académico</Form.Label>
                <Form.Select 
                  disabled={!editMode}
                  value={handleDataNull(userData.nivel_academico)}
                >
                  <option value="Primario">Primario</option>
                  <option value="Secundario">Secundario(Bachillerato)</option>
                  <option value="Universitario">Universitario</option>
                  <option value="Profesional">Profesional</option>
                  <option value="Diplomado">Diplomado</option>
                  <option value="Certificacion">Certificación</option>
                  <option value="Maestria">Maestría</option>
                  <option value="Doctorado">Doctorado</option>
                  <option value="Postgrado">Postgrado</option>
                  <option value="Tecnico">Técnico</option>
                </Form.Select>
              </Form.Group>

              {/* Botones de editar y cancelar */}
              <div className="d-flex justify-content-between mb-2">
                {!editMode ? (
                  <Button onClick={handleEdit}>Modo Edición</Button>
                ) : (
                  <>
                    <Button onClick={handleShowConfirmModal} variant="primary">
                                            Guardar
                    </Button>

                    <Button onClick={handleShowCancelModal} variant="secondary">
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
                    value={handleDataNull(namePassword.password)}
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
                  value={handleDataNull(userData.apellidos)} 
                  onChange={(e) => setUserData(prevState => ({ ...prevState, apellidos: e.target.value }))}
                />
              </Form.Group>
                            
              <Form.Group className="mb-3">
                <Form.Label><CustomAsterisk/> Fecha de Nacimiento</Form.Label>
                <Form.Control 
                  type="date"
                  placeholder="dd-mm-yyyy"  
                  disabled={!editMode} 
                  value={formatterDate(userData.fecha_nacimiento)} 
                  onChange={(e) => setUserData(prevState => ({ ...prevState, fecha_nacimiento: e.target.value }))}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label><CustomAsterisk/> Direccion de Residencia</Form.Label>
                <Form.Control 
                  type="text" 
                  disabled={!editMode} 
                  value={handleDataNull(userData.direccion_residencia)} 
                  onChange={(e) => setUserData(prevState => ({ ...prevState, direccion_residencia: e.target.value }))}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label><CustomAsterisk/> Numero Telefonico</Form.Label>
                <Form.Control 
                  type="number" 
                  disabled={!editMode} 
                  value={handleDataNull(userData.numero_telefonico)} 
                  onChange={(e) => setUserData(prevState => ({ ...prevState, numero_telefonico: Number(e.target.value) }))}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Correo</Form.Label>
                <Form.Control 
                  type="email" 
                  disabled={!editMode} 
                  value={handleDataNull(userData.correo)} 
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
                password={namePassword.password}
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
        <CustomBasicModal 
          title="Confirmación"
          body="¿Estás seguro que desea guardar los cambios?"
          secondaryButton="Cancelar"
          primaryButton="Aceptar"
          showModal={showConfirmModal}
          setShowModal={handleCloseConfirmModal}
          onClick={handleSave}
        />

        <CustomBasicModal 
          title="Cancelar"
          body="¿Estás seguro de cancelar la operación?"
          secondaryButton="Cancelar"
          primaryButton="Aceptar"
          showModal={showCancelModal}
          setShowModal={handleCloseCancelModal}
          onClick={handleCancel}
        />
      </Container>
      <ToastContainer />
    </Layout>
  );
}