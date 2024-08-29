import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Layout } from "../layout/Layout";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Spinner } from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import 'react-datepicker/dist/react-datepicker.css';
import { useProjectStore } from "../store/projectStore";
import { ProyectsProps } from "../interfaces/proyectsInterface";
import { AsignEmployeeProjectModal } from "../components/AsignEmployeeProjectModal";
import { DeleteIcon } from "../helpers/iconButtons";
import { CustomButton } from "../components/CustomButton";
import { formatterDate } from "../helpers/formatters";
import { getOneProjectData } from "../api/proyectos/getOneProjectData";
import { getEmployeesByProject } from "../api/proyectos/getEmployeesByProject";
import { getDepartmentsByProject } from "../api/proyectos/getDepartmentsByProject";
import { EmployeesProps } from "../interfaces/employeeInterface";
import { DepartmentsProps } from "../interfaces/departmentInterface";
import { GerentesProps } from "../interfaces/gerenteInterface";
import { planificaTechApi } from "../api/baseApi";
import { useCompanyStore } from "../store/companyStore";
import { AsignDepartmentProjectModal } from "../components/AsignDepartmentProjectModal";

export const CreateProjectStepTwoPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [oneProjectData, setOneProjectData] = useState<ProyectsProps>({} as ProyectsProps);
  const [showModal, setShowModal] = useState(false);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [employees, setEmployees] = useState<EmployeesProps>();
  const [departments, setDepartments] = useState<DepartmentsProps>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [gerentes, setGerentes] = useState<GerentesProps>();

  const { id_proyecto, onAddProject } = useProjectStore();
  const { company } = useCompanyStore();

  useEffect(() => {
    getOneProjectData(id_proyecto!)
      .then((response) => {
        setOneProjectData(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [id_proyecto]);

  const allEmployeeOrDepartment = useCallback((pageNumber = 1) => {
    if (oneProjectData.tipo_proyecto === 2) {
      setIsLoading(true);
      getEmployeesByProject(pageNumber, 5, id_proyecto!)
        .then((response) => {
          setEmployees(response);
          setCurrentPage(pageNumber);
          setTotalPages(response.totalPages);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    } else if (oneProjectData.tipo_proyecto === 1) {
      setIsLoading(true);
      getDepartmentsByProject(pageNumber, 5, id_proyecto!)
        .then((response) => {
          setDepartments(response);
          setCurrentPage(pageNumber);
          setTotalPages(response.totalPages);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, [id_proyecto, oneProjectData.tipo_proyecto]);

  useEffect(() => {
    allEmployeeOrDepartment(1);
  }, [allEmployeeOrDepartment]);

  useEffect(() => {
    planificaTechApi.get('/gerentes/getGerentesByCompany', {
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
  }, [company.id_empresa]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      allEmployeeOrDepartment(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      allEmployeeOrDepartment(currentPage + 1);
    }
  };

  const handleCreateProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddProject(id_proyecto);
    navigate('/');
  };

  const handleUpdateProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            <Form onSubmit={
              id_proyecto
                ? handleUpdateProject
                : handleCreateProject
            } style={{width: '100%'}}>
              <Container fluid>
                <Row>
                  <Col>
                    <h1 className="mt-3 mb-4">
                      {
                        id_proyecto
                          ? `Editar Proyecto - Paso 2 - Asignación: ${oneProjectData.id_proyecto} ${oneProjectData.nombre_proyecto}`
                          : 'Crear Proyecto - Paso 2 - Asignación'
                      }
                    </h1>
                  </Col>
                </Row>

                <Row className="mb-5">
                  <Col md={4}>
                    <Button 
                      variant="secondary" 
                      onClick={
                        oneProjectData.tipo_proyecto === 1
                          ? () => setShowDepartmentModal(true)
                          : () => setShowModal(true)
                      }
                    >
                      {oneProjectData.tipo_proyecto === 1 ? 'Asignar Departamento' : 'Asignar Empleado'}
                    </Button>
                  </Col>
                </Row>

                {
                  oneProjectData.tipo_proyecto === 2 
                    ? (
                      <>
                        <Row className="mb-5">
                          <Col>
                            <Table striped bordered hover>
                              <thead>
                                <tr>
                                  <th>ID Empleado</th>
                                  <th>Cedula</th>
                                  <th>Nombre</th>
                                  <th>Departamento</th>
                                  <th>Fecha Entrada Empresa</th>
                                  <th>Estado</th>
                                  <th>Acciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                {employees?.employees?.map((employee) => (
                                  <tr key={employee.id_empleado}>
                                    <td>{employee.id_empleado}</td>
                                    <td>{employee.cedula}</td>
                                    <td>{employee.nombres} {employee.apellidos}</td>
                                    <td>{employee.nombre_departamento}</td>
                                    <td>{formatterDate(employee.fecha_ingreso_empresa)}</td>
                                    <td>{employee.estado}</td>
                                    <td style={{ display: 'flex' }}>
                                      <CustomButton
                                        text='Eliminar Empleado'
                                        placement='top'
                                        icon={<DeleteIcon />}
                                        color="primary"
                                        style={{ marginRight: '10px' }} />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>

                        <Row className="mb-5">
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
                      </>
                    )
                    : (
                      <>
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
                                  departments?.departments?.map((department) => (
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
                                      <td style={{ display: 'flex' }}>
                                        <CustomButton
                                          text='Eliminar Departamento'
                                          placement='top'
                                          icon={<DeleteIcon />}
                                          color="primary"
                                          style={{ marginRight: '10px' }} 
                                        />
                                      </td>
                                    </tr>
                                  ))
                                }
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
              
                        <Row className="mb-5">
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
                      </>
                    )
                }

                <Row className="mb-5">
                  <Col md={4}>
                    <Button
                      variant="danger"
                      onClick={() => window.history.back()}
                    >
                      Atrás
                    </Button>
                  </Col>

                  <Col md={4}/>

                  <Col md={4}>
                    <Button 
                      type="submit"
                      variant="primary"
                    >
                      {id_proyecto ? 'Actualizar' : 'Continuar'}
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Form>
          )
      }
      <ToastContainer />

      <AsignEmployeeProjectModal 
        showModal={showModal} 
        onHide={() => setShowModal(false)}
        setShowModal={setShowModal}
      />

      <AsignDepartmentProjectModal 
        showModal={showDepartmentModal} 
        onHide={() => setShowDepartmentModal(false)}
        setShowModal={setShowDepartmentModal}
      />
    </Layout>
  );
};