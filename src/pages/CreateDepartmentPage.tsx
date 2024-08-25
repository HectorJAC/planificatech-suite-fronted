import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { Layout } from "../layout/Layout";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { DepartmentsProps, DepartmentProps } from "../interfaces/departmentInterface";
import { toast, ToastContainer } from "react-toastify";
import { CustomAsterisk } from "../components/CustomAsterisk";
import { GerentesProps } from "../interfaces/gerenteInterface";
import { Spinner } from "../components/Spinner";
import { CustomButton } from "../components/CustomButton";
import { ActivateIcon, EditIcon, InactiveIcon } from "../helpers/iconButtons";
import { useCompanyStore } from "../store/companyStore";
import { planificaTechApi } from "../api/baseApi";

export const CreateDepartmentPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [departments, setDepartments] = useState<DepartmentsProps>();
  const [searchDepartment, setSearchDepartment] = useState('');
  const [departmentData, setDepartmentData] = useState({} as DepartmentProps);
  const [gerentes, setGerentes] = useState<GerentesProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { company } = useCompanyStore();

  const getAllDepartments = useCallback((pageNumber = 1) => {
    if (company.id_empresa === undefined) {
      return;
    } else {
      setIsLoading(true);
      axios.get(`${import.meta.env.VITE_API_URL}/departamentos/getDepartamentos`, {
        params: {
          id_empresa: company.id_empresa,
          estado: 'ACTIVO',
          page: pageNumber,
          limit: 7
        }
      })
        .then((response) => {
          setDepartments(response.data);
          setCurrentPage(pageNumber);
          setTotalPages(response.data.totalPages);
          setIsLoading(false);
          return;
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [company.id_empresa]);

  useEffect(() => {
    getAllDepartments(1)
  }, [getAllDepartments]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/gerentes/getGerentesByCompany`, {
      params: {
        id_empresa: company.id_empresa
      }
    })
      .then((response) => {
        setGerentes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [showModal, company.id_empresa]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Limpiar los campos del modal
    setDepartmentData({} as DepartmentProps);
  };

  const handleGetDepartment = (id: number) => {
    axios.get(`${import.meta.env.VITE_API_URL}/departamentos/getOneDepartment`, {
      params: {
        id_departamento: id
      }
    })
      .then((response) => {
        setDepartmentData(response.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleSubmit = () => {
    if (departmentData.nombre_departamento === undefined || departmentData.presupuesto_asignado === undefined) {
      toast.error('Llenar los campos requeridos');
    } else if (departments?.departments.some(department => department.id_gerente === departmentData.id_gerente)) {
      toast.error('El gerente seleccionado ya esta asignado a otro departamento');
    } else {
      axios.post(`${import.meta.env.VITE_API_URL}/departamentos/createDepartment`, {
        id_empresa: company.id_empresa,
        nombre_departamento: departmentData.nombre_departamento,
        descripcion_departamento: departmentData.descripcion_departamento,
        presupuesto_asignado: departmentData.presupuesto_asignado,
        id_gerente: departmentData.id_gerente,
        estado: 'ACTIVO'
      })
        .then((response) => {
          toast.success(response.data.message);

          // Cerrar modal
          setShowModal(false);
          // Limpiar campos del formulario
          setDepartmentData({} as DepartmentProps);
          // Actualizar la lista de departamentos
          getAllDepartments();
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleUpdate = () => {
    if (departmentData.nombre_departamento === undefined || departmentData.presupuesto_asignado === undefined) {
      toast.error('Llenar los campos requeridos');
      return;
    } else {
      axios.put(`${import.meta.env.VITE_API_URL}/departamentos/updateDepartment`, {
        id_departamento: departmentData.id_departamento,
        nombre_departamento: departmentData.nombre_departamento,
        descripcion_departamento: departmentData.descripcion_departamento,
        presupuesto_asignado: departmentData.presupuesto_asignado,
        id_gerente: departmentData.id_gerente,
        estado: 'ACTIVO'
      })
        .then((response) => {
          toast.success(response.data.message);

          // Cerrar modal
          setShowModal(false);
          // Limpiar campos del formulario
          setDepartmentData({} as DepartmentProps);
          // Actualizar la lista de departamentos
          getAllDepartments();
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleInactive = (id: number) => {
    axios.put(`${import.meta.env.VITE_API_URL}/departamentos/inactivateDepartment`, {
      id_departamento: id
    })
      .then((response) => {
        setIsLoading(true);
        toast.success(response.data.message);
        getAllDepartments();
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleActive = (id: number) => {
    axios.put(`${import.meta.env.VITE_API_URL}/departamentos/activateDepartment`, {
      id_departamento: id
    })
      .then((response) => {
        setIsLoading(true);
        toast.success(response.data.message);
        getAllDepartments();
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handlePuestosInactivos = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/departamentos/getInactiveDepartamentos`, {
      params: {
        id_empresa: company.id_empresa
      }
    })
      .then((response) => {
        if (isCheckboxChecked === false) {
          setIsLoading(true);
          setDepartments(response.data);
          setIsLoading(false);
        } else {
          setIsLoading(true);
          getAllDepartments();
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearchDepartment = () => {
    setIsLoading(true);
    if (searchDepartment === '') {
      getAllDepartments();
    } else {
      planificaTechApi.get(`/departamentos/searchDepartment`, {
        params: {
          search: searchDepartment,
          id_empresa: company.id_empresa,
          estado: 'ACTIVO'
        }
      })
        .then((response) => {
          setDepartments(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setIsLoading(false);
        })
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      getAllDepartments(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      getAllDepartments(currentPage + 1);
    }
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
                    Crear Departamentos
                  </h1>
                </Col>
              </Row>

              <Row>
                <Col md={3}>
                  <Button 
                    variant="primary" 
                    style={{
                      marginBottom: '20px',
                      marginLeft: '20px'
                    }}
                    onClick={handleShowModal}
                  >
                    Nuevo Departamento
                  </Button>
                </Col>

                <Col md={9}>
                  <div className="input-group">
                    <Form.Control 
                      type="text" 
                      placeholder="Buscar Departamento" 
                      value={searchDepartment}
                      onChange={(e) => setSearchDepartment(e.target.value)}
                    />
                    <Button 
                      variant="primary" 
                      onClick={handleSearchDepartment}
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
                        label="Departamentos Inactivos"
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
                        <th>Departamento</th>
                        <th>Descripción</th>
                        <th>Presupuesto</th>
                        <th>Gerente</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        departments?.departments.map((department) => (
                          <tr key={department.id_departamento}>
                            <td>{department.id_departamento}</td>
                            <td>{department.nombre_departamento}</td>
                            <td>{department.descripcion_departamento}</td>
                            <td>{department.presupuesto_asignado}</td>
                            <td>
                              {
                                gerentes?.managers.map((gerente) => (
                                  department.id_gerente === gerente.id_gerente ? (
                                    gerente.nombres + ' ' + gerente.apellidos
                                  ) : null
                                ))
                              }
                            </td>
                            <td>{department.estado}</td>
                            <td>
                              <CustomButton
                                text='Editar'
                                placement='top'
                                disabled={department.estado === 'INACTIVO'} 
                                onclick={() => {
                                  handleShowModal()
                                  handleGetDepartment(department.id_departamento!)
                                }}
                                icon={<EditIcon />}
                                color="primary"
                                style={{marginRight: '10px'}}
                              />
                              {
                                department.estado === 'ACTIVO'
                                  ? (
                                    <CustomButton 
                                      text='Inactivar'
                                      placement='top'
                                      onclick={() => handleInactive(department.id_departamento!)}
                                      icon={<InactiveIcon />}
                                      color="danger"
                                    />
                                  )
                                  : (
                                    <CustomButton 
                                      text='Activar'
                                      placement='top'
                                      onclick={() => handleActive(department.id_departamento!)}
                                      icon={<ActivateIcon />}
                                      color="danger"
                                    />
                                  )
                              }
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                </Col>
              </Row>
              
              <Row>
                <Col className="d-flex justify-content-between align-items-center">
                  <Button 
                    variant="secondary" 
                    onClick={handlePreviousPage} 
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </Button>
                  <span>Página {currentPage} de {totalPages}</span>
                  <Button 
                    variant="secondary" 
                    onClick={handleNextPage} 
                    disabled={currentPage === totalPages}
                  >
                    Siguiente
                  </Button>
                </Col>
              </Row>
              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Crear Departamento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group>
                      <Form.Label><CustomAsterisk/> Nombre Departamento</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Nombre del departamento" 
                        value={departmentData.nombre_departamento}
                        onChange={(e) => setDepartmentData({...departmentData, nombre_departamento: e.target.value})}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label> Descripción Departamento</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3} 
                        placeholder="Descripción del departamento" 
                        value={departmentData.descripcion_departamento}
                        onChange={(e) => setDepartmentData({...departmentData, descripcion_departamento: e.target.value})}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label><CustomAsterisk/> Presupuesto Asignado</Form.Label>
                      <Form.Control 
                        type="number" 
                        placeholder="Presupuesto asignado al departamento" 
                        value={departmentData.presupuesto_asignado}
                        onChange={(e) => setDepartmentData({...departmentData, presupuesto_asignado: Number(e.target.value)})}
                      />
                    </Form.Group>

                    <Form.Group className='mb-4'>
                      <Form.Label> Gerente del departamento</Form.Label>
                      <Form.Select
                        onChange={(e) => setDepartmentData({...departmentData, id_gerente: Number(e.target.value)})}
                        value={
                          gerentes?.managers.filter((gerente) => gerente.id_gerente === departmentData.id_gerente)
                            ? departmentData.id_gerente
                            : ''
                        }
                      >
                        <option value="">--Seleccione una opcion--</option>
                        {
                          gerentes?.managers.map((gerente) => (
                            <option 
                              key={gerente.id_gerente} 
                              value={gerente.id_gerente}
                            >
                              {gerente.nombres + ' ' + gerente.apellidos}
                            </option>
                          ))
                        }
                      </Form.Select>
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
                    onClick={departmentData.id_departamento ? handleUpdate : handleSubmit}
                  >
                    {departmentData.id_departamento ? 'Actualizar' : 'Guardar'}
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
