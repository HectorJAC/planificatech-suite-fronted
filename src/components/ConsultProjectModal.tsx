import { FC, useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { formatterDate } from "../helpers/formatters";
import { ProyectsProps } from "../interfaces/proyectsInterface";
import { getOneProjectDepartment } from "../api/proyectos/getOneProjectDepartment";
import { getOneProjectData } from "../api/proyectos/getOneProjectData";
import { getOneProjectEmployee } from "../api/proyectos/getOneProjectEmployee";
import { useNavigate } from "react-router-dom";
import { useProjectStore } from "../store/projectStore";

interface ConsultProjectModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  idProyecto: number;
}

export const ConsultProjectModal: FC<ConsultProjectModalProps> = ({
  showModal, 
  setShowModal, 
  idProyecto
}) => {
  const navigate = useNavigate();
  const [oneProjectData, setOneProjectData] = useState<ProyectsProps>({} as ProyectsProps);
  const [projectData, setProjectData] = useState<ProyectsProps[]>([]);

  const { onAddProject } = useProjectStore();

  useEffect(() => {
    if (showModal) {
      getOneProjectData(idProyecto)
        .then((response) => {
          setOneProjectData(response);
        });
    }
  }, [idProyecto, showModal]);

  const projectDepartmentData = useCallback(() => {
    if (oneProjectData.tipo_proyecto === 1) {
      getOneProjectDepartment(idProyecto)
        .then((response) => {
          setProjectData(response);
        });
    } else {
      getOneProjectEmployee(idProyecto)
        .then((response) => {
          setProjectData(response);
        });
    }
  }, [idProyecto, oneProjectData.tipo_proyecto]);

  useEffect(projectDepartmentData, [projectDepartmentData]);

  const uniqueDepartment = projectData.filter(
    (department, index, self) =>
      index === self.findIndex((d) => d.id_departamento === department.id_departamento)
  );

  const uniqueEmployee = projectData.filter(
    (employee, index, self) =>
      index === self.findIndex((e) => e.id_empleado === employee.id_empleado)
  );

  const renderTasksByStatus = (status: string) => {
    // Filtrar tareas duplicadas por id_tarea_plan
    const uniqueTasks = projectData.filter(
      (task, index, self) =>
        index === self.findIndex((t) => t.id_tarea_plan === task.id_tarea_plan)
    );

    return uniqueTasks
      .filter((proyect) => proyect.estado_tarea_proyecto === status)
      .map((proyect) => (
        <Card key={proyect.id_tarea_plan} className="mb-4">
          <Card.Body>
            <Card.Title>{proyect.nombre_tarea_proyecto}</Card.Title>
            <Card.Text>{proyect.descripcion_tarea_proyecto}</Card.Text>
            <Card.Text>{proyect.estado_tarea_proyecto}</Card.Text>
          </Card.Body>
        </Card>
      ));
  };

  const gotoGraphicProject = () => {
    navigate('/consult_graphic_project');
    onAddProject(oneProjectData.id_proyecto!);
  };

  return (
    projectData
      .filter((proyect) => proyect.id_proyecto === idProyecto)
      .filter(
        (project, index, self) =>
          index === self.findIndex((p) => p.id_proyecto === project.id_proyecto)
      )
      .map((proyect) => (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered size="xl" key={proyect.id_proyecto}>
          <Modal.Header closeButton>
            <Modal.Title>
              Titulo Poyecto: {proyect.id_proyecto} - {proyect.nombre_proyecto}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="mb-3">
              <Col md={12}>
                <strong>Descripcion:</strong>
                <p>{proyect.descripcion_proyecto}</p>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <strong>Fecha Inicio:</strong>
                <p>{formatterDate(proyect.fecha_inicio)}</p>
              </Col>
              <Col md={6}>
                <strong>Fecha Fin:</strong>
                <p>{formatterDate(proyect.fecha_fin)}</p>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                {proyect.tipo_proyecto === 1 ? (
                  <>
                    <strong>Departamento(s) Asignado(s):</strong>
                    {
                      uniqueDepartment.map((project) => (
                        <p key={project.id_departamento}>{project.nombre_departamento}</p>
                      ))
                    }
                  </>
                ) : (
                  <>
                    <strong>Empleado(s) Asignado(s):</strong>
                    {
                      uniqueEmployee.map((project) => (
                        <p key={project.id_empleado}>{project.nombre_empleado} {project.apellido_empleado}</p>
                      ))
                    }
                  </>
                )}
              </Col>
              <Col md={6}>
                <strong>Gerente Asignado:</strong>
                <p>
                  {proyect.nombre_gerente} {proyect.apellido_gerente}
                </p>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <strong>Presupuesto Asignado:</strong>
                <p>{proyect.presupuesto_asigando}</p>
              </Col>
              <Col md={6}>
                <strong>Estado Proyecto:</strong>
                <p>{proyect.estado_proyecto}</p>
              </Col>
            </Row>

            <Modal.Header>
              <Modal.Title>Tareas</Modal.Title>
            </Modal.Header>

            <Row>
              <Col md={4}>
                <h3>En Espera</h3>
                <div style={{ maxHeight: "100%", overflowY: "scroll" }}>
                  {renderTasksByStatus("En Espera")}
                </div>
              </Col>
              <Col md={4}>
                <h3>Trabajando</h3>
                <div style={{ maxHeight: "100%", overflowY: "scroll" }}>
                  {renderTasksByStatus("Trabajando")}
                </div>
              </Col>
              <Col md={4}>
                <h3>Finalizado</h3>
                <div style={{ maxHeight: "100%", overflowY: "scroll" }}>
                  {renderTasksByStatus("Finalizado")}
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button variant="primary" onClick={gotoGraphicProject}>
              Ver Gráficas
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      ))
  );
};
