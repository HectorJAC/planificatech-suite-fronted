import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Layout } from "../layout/Layout";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useProjectStore, useTaskSuccessStore } from "../store/projectStore";
import { ProyectsProps } from "../interfaces/proyectsInterface";
import { getOneProjectData } from "../api/proyectos/getOneProjectData";
import { getOneProjectDepartment } from "../api/proyectos/getOneProjectDepartment";
import { getOneProjectEmployee } from "../api/proyectos/getOneProjectEmployee";
import { formatterDate } from "../helpers/formatters";
import { AsignTaskProjectModal } from "../components/AddTaskToProjectModal";
import { CustomButton } from "../components/CustomButton";
import { DeleteIcon, EditIcon } from "../helpers/iconButtons";
import { updateTaskFromProject } from "../api/proyectos/updateTaskFromProject";
import { deleteTaskFromProject } from "../api/proyectos/deleteTaskFromProject";

export const CreateProjectStepThreePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [oneProjectData, setOneProjectData] = useState<ProyectsProps>({} as ProyectsProps);
  const [showModal, setShowModal] = useState(false);
  const [projectData, setProjectData] = useState<ProyectsProps[]>([]);

  const { id_proyecto, onAddProject, onAddTaskProject } = useProjectStore();
  const { addingTaskSuccess, resetAddingTaskSuccess } = useTaskSuccessStore();

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

  const projectDepartmentData = useCallback(() => {
    if (oneProjectData.tipo_proyecto === 1) {
      getOneProjectDepartment(id_proyecto)
        .then((response) => {
          setProjectData(response);
        });
    } else {
      getOneProjectEmployee(id_proyecto)
        .then((response) => {
          setProjectData(response);
        });
    }
  }, [id_proyecto, oneProjectData.tipo_proyecto]);

  useEffect(projectDepartmentData, [projectDepartmentData]);

  useEffect(() => {
    if (addingTaskSuccess) {
      projectDepartmentData();
    }
  }, [addingTaskSuccess, projectDepartmentData]);

  const handleCreateProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddProject(id_proyecto);
    navigate('/proyects');
    resetAddingTaskSuccess();
  };

  const handleUpdateProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/proyects');
    resetAddingTaskSuccess();
  };

  const goBack = () => {
    window.history.back()
    resetAddingTaskSuccess();
  };

  const goExit = () => {
    navigate('/proyects');
    resetAddingTaskSuccess();
  };

  const changeStatusTask = (
    id_tarea_proyecto:number, 
    nombre_tarea_proyecto:string,
    descripcion_tarea_proyecto:string,
    fecha_inicio:string,
    fecha_fin:string,
    id_proyecto:number,
    estado_tarea_proyecto:string,
  ) => {
    updateTaskFromProject(
      id_tarea_proyecto, 
      nombre_tarea_proyecto,
      descripcion_tarea_proyecto,
      fecha_inicio,
      fecha_fin,
      id_proyecto,
      estado_tarea_proyecto,
    )
      .then(() => {
        toast.success('Tarea actualizada con exito');
        projectDepartmentData();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        projectDepartmentData();
      });
  };

  const showModalForEditTask = (id_tarea_proyecto:number) => {
    setShowModal(true);
    onAddTaskProject(id_tarea_proyecto);
  };

  const handleDeleteTask = (id_tarea_proyecto:number) => {
    deleteTaskFromProject(id_tarea_proyecto)
      .then((response) => {
        toast.success(response.message);
        projectDepartmentData();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        projectDepartmentData();
      });
  };

  const renderTasksByStatus = (status: string) => {
    const uniqueTasks = projectData.filter(
      (task, index, self) =>
        index === self.findIndex((t) => t.id_tarea_proyecto === task.id_tarea_proyecto
        && t.estado === 'ACTIVO'
        )
    );

    return uniqueTasks
      .filter((proyect) => proyect.estado_tarea_proyecto === status)
      .map((proyect) => (
        <Card key={proyect.id_tarea_proyecto} className="mb-4">
          <Card.Body>
            <Card.Title>{proyect.nombre_tarea_proyecto}</Card.Title>
            <Card.Text>{proyect.descripcion_tarea_proyecto}</Card.Text>
            <Card.Text>Fecha Inicio: {formatterDate(proyect.fecha_inicio_tarea_proyecto)}</Card.Text>
            <Card.Text>
              Fecha Fin: {
                proyect.fecha_fin === null
                  ? 'Sin Fecha'
                  : formatterDate(proyect.fecha_fin_tarea_proyecto)
              }
            </Card.Text>
            <Card.Text>
              <Form.Select
                value={proyect.estado_tarea_proyecto}
                onChange={
                  (e: ChangeEvent<HTMLSelectElement>) => changeStatusTask(
                    proyect.id_tarea_proyecto!,
                    proyect.nombre_tarea_proyecto!,
                    proyect.descripcion_tarea_proyecto!,
                    proyect.fecha_inicio_tarea_proyecto!,
                    proyect.fecha_fin_tarea_proyecto!,
                    proyect.id_proyecto!,
                    e.target.value
                  )
                }
              >
                <option value="En Espera">En Espera</option>
                <option value="Trabajando">Trabajando</option>
                <option value="Finalizado">Finalizado</option>
              </Form.Select>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <CustomButton
              text='Editar'
              placement='top' 
              icon={<EditIcon />}
              color="primary"
              style={{marginRight: '70%'}}
              onclick={() => showModalForEditTask(proyect.id_tarea_proyecto!)}
            />
            <CustomButton 
              placement="top"
              text="Eliminar"
              icon={<DeleteIcon />}
              color="danger"
              onclick={() => handleDeleteTask(proyect.id_tarea_proyecto!)}
            />
          </Card.Footer>
        </Card>
      ));
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
                          ? `Editar Proyecto - Paso 3 - Creación de Tareas: ${oneProjectData.id_proyecto} - ${oneProjectData.nombre_proyecto}`
                          : 'Crear Proyecto - Paso 3 - Creación de Tareas'
                      }
                    </h1>
                  </Col>
                </Row>

                <Row className="mb-5">
                  <Col md={4}>
                    <Button 
                      variant="secondary" 
                      onClick={() => setShowModal(true)}
                    >
                      Crear Tarea
                    </Button>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <h3>En Espera</h3>
                    <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
                      {renderTasksByStatus("En Espera")}
                    </div>
                  </Col>
                  <Col md={4}>
                    <h3>Trabajando</h3>
                    <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
                      {renderTasksByStatus("Trabajando")}
                    </div>
                  </Col>
                  <Col md={4}>
                    <h3>Finalizado</h3>
                    <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
                      {renderTasksByStatus("Finalizado")}
                    </div>
                  </Col>
                </Row>

                <Row className="mb-5">
                  <Col md={4}>
                    <Button
                      variant="danger"
                      onClick={goBack}
                    >
                      Atrás
                    </Button>
                  </Col>

                  <Col md={4}/>

                  <Col md={4}>
                    <Button 
                      type="submit"
                      variant="secondary"
                      hidden={!id_proyecto}
                      style={{marginRight: '5px'}}
                      onClick={goExit}
                    >
                      Salir
                    </Button>
                    <Button 
                      type="submit"
                      variant="primary"
                    >
                      Finalizar
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Form>
          )
      }
      <AsignTaskProjectModal
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <ToastContainer />
    </Layout>
  );
};