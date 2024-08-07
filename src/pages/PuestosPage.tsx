import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, Table, Modal } from "react-bootstrap";
import { Layout } from "../layout/Layout";
import { toast, ToastContainer } from 'react-toastify';
import { CustomButton } from "../components/CustomButton";
import { CustomAsterisk } from "../components/CustomAsterisk";
import { Spinner } from "../components/Spinner";
import { ActivateIcon, EditIcon, InactiveIcon } from "../helpers/iconButtons";
import { UserProps } from "../interfaces/userInterface";
import { getIdUser } from "../helpers/getLocalStorageData";

interface PuestoProps {
    id_puesto: number;
    nombre_puesto: string;
    descripcion_puesto: string;
    id_usuario_creacion: number;
    id_usuario_actualizacion: number;
    estado: string;
}

export const PuestosPage = () => {
  const [puestos, setPuestos] = useState<PuestoProps[]>([]);
  const [searchPuesto, setSearchPuesto] = useState('');
  const [searchResults, setSearchResults] = useState<PuestoProps[]>([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [puestoData, setPuestoData] = useState({} as PuestoProps);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<UserProps[]>([]);

  const getUsers = useCallback(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/usuarios/getAllUsers`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(getUsers, [getUsers]);

  const getAllPuestos = useCallback(() => {
    setIsLoading(true);
    axios.get(`${import.meta.env.VITE_API_URL}/puestos/getPuestos`)
      .then((response) => {
        setPuestos(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(getAllPuestos, [getAllPuestos]);

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

  const handleCloseModal = () => {
    setShowModal(false);
    // Limpiar los campos del modal
    setPuestoData({} as PuestoProps);
  };

  const handleSubmit = () => {
    if (puestoData.nombre_puesto === undefined) {
      toast.error('Debe ingresar el nombre del puesto');
      return;
    } else {
      axios.post(`${import.meta.env.VITE_API_URL}/puestos/createPuesto`, {
        nombre_puesto: puestoData.nombre_puesto,
        descripcion_puesto: puestoData.descripcion_puesto,
        id_usuario_creacion: Number(getIdUser()),
        estado: 'ACTIVO'
      })
        .then((response) => {
          toast.success(response.data.message);

          // Cerrar modal
          setShowModal(false);

          // Actualizar lista de puestos
          setIsLoading(true);
          getAllPuestos();
          setIsLoading(false);
        })
        .catch((error) => {
          toast.error(error.data);
        });
    }
  };

  const handleUpdate = () => {
    if (puestoData.nombre_puesto === undefined) {
      toast.error('Debe ingresar el nombre del puesto');
      return;
    } else {
      axios.put(`${import.meta.env.VITE_API_URL}/puestos/updatePuesto`, {
        id_puesto: puestoData.id_puesto,
        nombre_puesto: puestoData.nombre_puesto,
        descripcion_puesto: puestoData.descripcion_puesto,
        id_usuario_actualizacion: Number(getIdUser()),
      })
        .then((response) => {
          toast.success(response.data.message);

          // Cerrar modal
          setShowModal(false);

          // Actualizar lista de puestos
          setIsLoading(true);
          getAllPuestos();
          setIsLoading(false);
        })
        .catch((error) => {
          toast.error(error.data);
        });
    }
  };

  const handleGetPuesto = (id_puesto: number) => {
    axios.get(`${import.meta.env.VITE_API_URL}/puestos/getPuesto`, {
      params: {
        id_puesto: id_puesto
      }
    })
      .then((response) => {
        setPuestoData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInactive = (id: number) => {
    axios.put(`${import.meta.env.VITE_API_URL}/puestos/inactivatePuesto`, {
      id_puesto: id
    })
      .then((response) => {
        setIsLoading(true);
        toast.success(response.data.message);
        getAllPuestos();
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleActive = (id: number) => {
    axios.put(`${import.meta.env.VITE_API_URL}/puestos/activatePuesto`, {
      id_puesto: id
    })
      .then((response) => {
        setIsLoading(true);
        toast.success(response.data.message);
        getAllPuestos();
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <Layout>
      {
        isLoading
          ? (
            <Container>
              <Spinner />
            </Container>
          )
          : (
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
                  <Table 
                    striped 
                    bordered 
                    hover 
                    responsive  
                  >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre Puesto</th>
                        <th>Descripción</th>
                        <th>Usuario Creación</th>
                        <th>Usuario Actualización</th>
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
                            {
                              users.map((user) => {
                                if (puesto.id_usuario_creacion === user.id_usuario) {
                                  return (
                                    <td key={user.id_usuario}>
                                      {user.username}
                                    </td>
                                  );
                                }
                              })
                            }
                            {
                              puesto.id_usuario_actualizacion === null
                                ? (
                                  <td>
                                    {'N/A'} 
                                  </td>
                                )
                                : (
                                  users.map((user) => {
                                    if (puesto.id_usuario_actualizacion === user.id_usuario) {
                                      return (
                                        <td key={user.id_usuario}>
                                          {user.username}
                                        </td>
                                      );
                                    }
                                  })
                                )
                            }
                            <td>{puesto.estado}</td>
                            <td>
                              <CustomButton
                                text='Editar'
                                placement='top' 
                                disabled={puesto.estado === 'INACTIVO'} 
                                onclick={() => {
                                  handleShowModal()
                                  handleGetPuesto(puesto.id_puesto!)
                                }}
                                icon={<EditIcon />}
                                color="primary"
                                style={{marginRight: '10px'}}
                              />
                              {
                                puesto.estado === 'ACTIVO'
                                  ? (
                                    <CustomButton 
                                      text='Inactivar'
                                      placement='top'
                                      onclick={() => handleInactive(puesto.id_puesto!)}
                                      icon={<InactiveIcon />}
                                      color="danger"
                                    />
                                  )
                                  : (
                                    <CustomButton 
                                      text='Activar'
                                      placement='top'
                                      onclick={() => handleActive(puesto.id_puesto!)}
                                      icon={<ActivateIcon />}
                                      color="danger"
                                    />
                                  )
                              }
                            </td>
                          </tr>
                        ))
                      ) : (
                        puestos.map((puesto, index) => (
                          <tr key={index}>
                            <td>{puesto.id_puesto}</td>
                            <td>{puesto.nombre_puesto}</td>
                            <td>{puesto.descripcion_puesto}</td>
                            {
                              users.map((user) => {
                                if (puesto.id_usuario_creacion === user.id_usuario) {
                                  return (
                                    <td key={user.id_usuario}>
                                      {user.username}
                                    </td>
                                  );
                                }
                              })
                            }
                            {
                              puesto.id_usuario_actualizacion === null
                                ? (
                                  <td>
                                    {'N/A'} 
                                  </td>
                                )
                                : (
                                  users.map((user) => {
                                    if (puesto.id_usuario_actualizacion === user.id_usuario) {
                                      return (
                                        <td key={user.id_usuario}>
                                          {user.username}
                                        </td>
                                      );
                                    }
                                  })
                                )
                            }
                            <td>{puesto.estado}</td>
                            <td style={{
                              display: 'flex',
                            }}>
                              <CustomButton
                                text='Editar'
                                placement='top' 
                                disabled={puesto.estado === 'INACTIVO'} 
                                onclick={() => {
                                  handleShowModal()
                                  handleGetPuesto(puesto.id_puesto!)
                                }}
                                icon={<EditIcon />}
                                color="primary"
                                style={{marginRight: '10px'}}
                              />
                              {
                                puesto.estado === 'ACTIVO'
                                  ? (
                                    <CustomButton 
                                      text='Inactivar'
                                      placement='top'
                                      onclick={() => handleInactive(puesto.id_puesto!)}
                                      icon={<InactiveIcon />}
                                      color="danger"
                                    />
                                  )
                                  : (
                                    <CustomButton 
                                      text='Activar'
                                      placement='top'
                                      onclick={() => handleActive(puesto.id_puesto!)}
                                      icon={<ActivateIcon />}
                                      color="danger"
                                    />
                                  )
                              }
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </Col>
              </Row>

              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Crear Puesto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group>
                      <Form.Label><CustomAsterisk /> Nombre Puesto</Form.Label>
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
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Cerrar
                  </Button>
                  <Button 
                    variant="primary" 
                    type="submit" 
                    onClick={puestoData.id_puesto ? handleUpdate : handleSubmit}
                  >
                    {puestoData.id_puesto ? 'Actualizar' : 'Guardar'}
                  </Button>
                </Modal.Footer>
              </Modal>
            </Container>
          )
      }
      <ToastContainer />
    </Layout>
  );
};