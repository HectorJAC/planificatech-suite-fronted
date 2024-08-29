import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Layout } from "../layout/Layout";
import { ChangeEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "../components/Spinner";
import { CustomAsterisk } from "../components/CustomAsterisk";
import { useNavigate } from "react-router-dom";
import { CustomBasicModal } from "../components/CustomBasicModal";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useProjectStore } from "../store/projectStore";
import { ProyectsProps } from "../interfaces/proyectsInterface";
import { getOneProjectData } from "../api/proyectos/getOneProjectData";
import { useCompanyStore } from "../store/companyStore";
import { getAllGerentesNoPagination } from "../api/gerentes/getAllGerentesNoPagination";
import { GerenteProps } from "../interfaces/gerenteInterface";

export const CreateProjectPage = () => {
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [projectData, setProjectData] = useState({} as ProyectsProps);
  const [gerentes, setGerentes] = useState<GerenteProps[]>([]);

  const { id_proyecto, onResetProject, onAddProject } = useProjectStore();
  const { company } = useCompanyStore();

  useEffect(() => {
    getOneProjectData(id_proyecto!)
      .then((response) => {
        setProjectData(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [id_proyecto]);

  useEffect(() => {
    getAllGerentesNoPagination(company.id_empresa!)
      .then((response) => {
        setGerentes(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [company.id_empresa]);
  
  const goBack = () => {
    onResetProject();
    navigate('/proyects');
  };

  const handleStartDateChange = (date:any) => {
    if (date !== null) {
      setProjectData(prevState => ({
        ...prevState,
        fecha_inicio: date
      }));
    } else {
      toast.info('Ingrese una fecha')
    }
  };

  const handleEndDateChange = (date:any) => {
    if (date !== null) {
      setProjectData(prevState => ({
        ...prevState,
        fecha_fin: date
      }));
    } else {
      toast.info('Ingrese una fecha')
    }
  };

  const handleCreateProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddProject(projectData.id_proyecto!);
    navigate('/create_project_step_two');
  };

  const handleUpdateProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // onAddProject(projectData.id_proyecto!);
    navigate('/create_project_step_two');
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
                        projectData.id_proyecto
                          ? `Editar Proyecto - Paso 1 - Datos Generales: ${projectData.id_proyecto} ${projectData.nombre_proyecto}`
                          : 'Crear Proyecto - Paso 1 - Datos Generales'
                      }
                    </h1>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <Form.Group className='mb-4'>
                      <Form.Label><CustomAsterisk/> Id Proyecto</Form.Label>
                      <Form.Control 
                        type='text'
                        disabled
                        value={projectData.id_proyecto}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label><CustomAsterisk/> Fecha de Inicio</Form.Label>
                      <br />
                      <DatePicker
                        selected={
                          projectData.fecha_inicio 
                            ? new Date(projectData.fecha_inicio)
                            : null
                        }
                        // required
                        onChange={handleStartDateChange}
                        dateFormat="dd/MM/yyyy"
                        className="form-control"
                        placeholderText="dd/mm/yyyy"
                        customInput={
                          <Form.Control 
                            type="text"
                            // required
                            value={projectData.fecha_inicio}
                            onChange={handleStartDateChange}
                          />
                        }
                      />
                    </Form.Group>

                    <Form.Group className='mb-4'>
                      <Form.Label><CustomAsterisk/> Presupuesto Asignado</Form.Label>
                      <Form.Control 
                        type='number'
                        // required
                        value={projectData.presupuesto_asigando}
                        onChange={(e) => setProjectData(prevState => ({ ...prevState, presupuesto_asigando: Number(e.target.value) }))}
                      />
                    </Form.Group>

                    <Form.Group className='mb-4'>
                      <Form.Label><CustomAsterisk/> Gerente Encargado</Form.Label>
                      <Form.Select
                        value={projectData.id_gerente}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                          setProjectData({
                            ...projectData,
                            id_gerente: Number(e.target.value)
                          });
                        }}
                      >
                        <option value="">Seleccione un Gerente</option>
                        {
                          gerentes.map((gerente) => (
                            <option key={gerente.id_gerente} value={gerente.id_gerente}>
                              {gerente.nombres} {gerente.apellidos}
                            </option>
                          ))
                        }
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group className='mb-4'>
                      <Form.Label><CustomAsterisk/> Nombre Proyecto</Form.Label>
                      <Form.Control 
                        type='text'
                        value={projectData.nombre_proyecto}
                        onChange={(e) => setProjectData(prevState => ({ ...prevState, nombre_proyecto: e.target.value }))} 
                        // required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label><CustomAsterisk/> Fecha Fin</Form.Label>
                      <br />
                      <DatePicker
                        selected={
                          projectData.fecha_fin 
                            ? new Date(projectData.fecha_fin )
                            : null
                        }
                        // required
                        onChange={handleEndDateChange}
                        dateFormat="dd/MM/yyyy"
                        className="form-control"
                        placeholderText="dd/mm/yyyy"
                        customInput={
                          <Form.Control 
                            type="text"
                            // required
                            value={projectData.fecha_fin }
                            onChange={handleEndDateChange}
                          />
                        }
                      />
                    </Form.Group>

                    <Form.Group className='mb-4'>
                      <Form.Label><CustomAsterisk/> Estado Proyecto</Form.Label>
                      <Form.Select
                        // required
                        value={projectData.estado_proyecto}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setProjectData(prevState => ({ ...prevState, estado_proyecto: e.target.value }))}
                      >
                        <option value="En Espera">En Espera</option>
                        <option value="Trabajando">Trabajando</option>
                        <option value="Finalizado">Finalizado</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group className='mb-4'>
                      <Form.Label><CustomAsterisk/> Descripcion Proyecto</Form.Label>
                      <textarea
                        className="form-control"
                        // required
                        value={projectData.descripcion_proyecto}
                        onChange={(e) => setProjectData(prevState => ({ ...prevState, descripcion_proyecto: e.target.value }))}
                      />
                    </Form.Group>

                    <Form.Group className='mb-4'>
                      <Form.Label><CustomAsterisk/> Tipo Proyecto</Form.Label>
                      <Form.Select
                        // required
                        value={projectData.tipo_proyecto}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setProjectData(prevState => ({ ...prevState, tipo_proyecto: Number(e.target.value) }))}
                      >
                        <option value="">--Seleccione una opcion--</option>
                        <option value="1">Departamentos</option>
                        <option value="2">Empleados</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className='mb-4'>
                      <Form.Label> Estado</Form.Label>
                      <Form.Control 
                        disabled
                        type='text'
                        value={projectData.estado}
                        onChange={(e) => setProjectData(prevState => ({ ...prevState, estado: e.target.value }))}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-5">
                  <Col md={4}>
                    <Button
                      variant="danger"
                      onClick={() => setShowCancelModal(true)}
                    >
                    Cancelar
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

                <CustomBasicModal 
                  title="Cancelar Operación"
                  body="¿Desea volver atras? Se perderán los datos ingresados."
                  secondaryButton="Cancelar"
                  primaryButton="Aceptar"
                  showModal={showCancelModal}
                  setShowModal={() => setShowCancelModal(false)}
                  onClick={goBack}
                />
              </Container>
            </Form>
          )
      }
      <ToastContainer />
    </Layout>
  );
};