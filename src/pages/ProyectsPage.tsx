import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Layout } from "../layout/Layout";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { CustomButton } from "../components/CustomButton";
import { formatterDate } from "../helpers/formatters";
import { Spinner } from "../components/Spinner";
import { DeleteIcon, EditIcon, ViewIcon } from "../helpers/iconButtons";
import { getAllProyects } from "../api/proyectos/getAllProyects";
import { useCompanyStore } from "../store/companyStore";
import { ProyectsProps } from "../interfaces/proyectsInterface";
import { ConsultProjectModal } from "../components/ConsultProjectModal";
import { useNavigate } from "react-router-dom";
import { useProjectStore } from "../store/projectStore";

export const ProyectsPage = () => {

  const navigate = useNavigate();
  const [proyects, setProyects] = useState<ProyectsProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const { company } = useCompanyStore();
  const { onAddProject } = useProjectStore();

  const allProyects = useCallback(() => {
    setIsLoading(true);
    getAllProyects(company.id_empresa!)
      .then((response) => {
        setProyects(response); 
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      }); 
  }, [company.id_empresa]);

  useEffect(allProyects, [allProyects]);

  const handleShowModal = (id_gerente: number) => {
    setSelectedProjectId(id_gerente);
    setShowModal(true);
  };

  const goToEditProject = (id_proyecto:number) => {
    navigate('/create_project');
    onAddProject(id_proyecto);
  };

  const renderProyectsByStatus = (status:string) => {
    return proyects
      .filter((proyect) => proyect.estado_proyecto === status)
      .map((proyect) => (
        <Card key={proyect.id_proyecto} className="mb-4">
          <Card.Body>
            <Card.Title>{proyect.nombre_proyecto}</Card.Title>
            <Card.Text>{proyect.descripcion_proyecto}</Card.Text>
            <Card.Text>Fecha Inicio: {formatterDate(proyect.fecha_inicio)}</Card.Text>
            <Card.Text>Fecha Fin: {formatterDate(proyect.fecha_fin)}</Card.Text>
            <Card.Text>Gerente Encargado: {proyect.nombre_gerente} {proyect.apellido_gerente}</Card.Text>
            {
              proyect.tipo_proyecto === 1
                ? (
                  <Card.Text>
                    Asigando a Departamento(s)
                  </Card.Text>
                )
                : (
                  <Card.Text>
                    Asignado a Empleado(s)
                  </Card.Text>
                )
            }
          </Card.Body>
          <Card.Footer>
            <CustomButton
              placement="top"
              text="Editar"
              icon={<EditIcon />}
              color="primary"
              style={{ marginRight: '30%' }}
              onclick={() => goToEditProject(proyect.id_proyecto!)}
            />
            <CustomButton
              placement="top"
              text="Ver"
              icon={<ViewIcon />}
              color="secondary"
              style={{ marginRight: '30%' }}
              onclick={() => handleShowModal(proyect.id_proyecto!)}
            />
            <CustomButton 
              placement="top"
              text="Eliminar"
              icon={<DeleteIcon />}
              color="danger"
            />
          </Card.Footer>
        </Card>
      ));
  };

  return (
    <Layout>
      {isLoading ? (
        <Container>
          <Spinner />
        </Container>
      ) : (
        <Container>
          <Row>
            <Col>
              <h1 className="mt-3 mb-4">Todos los Proyectos</h1>
            </Col>
          </Row>

          <Row>
            <Col md={2}>
              <Button
                variant="primary"
                style={{
                  marginBottom: "20px",
                  marginLeft: "20px",
                }}
                onClick={() => navigate('/create_project')}
              >
                Crear Proyecto
              </Button>
            </Col>

            <Col md={10}>
              <div className="input-group">
                <Form.Control
                  type="text"
                  placeholder="Buscar por ID o Titulo del Proyecto"
                  // value={searchNota}
                  // onChange={(e) => setSearchNota(e.target.value)}
                />
                <Button variant="primary" /* onClick={handleSearchNote} */>
                  Buscar
                </Button>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <h3>En Espera</h3>
              <div style={{ maxHeight: "100%", overflowY: "scroll" }}>
                {renderProyectsByStatus("En Espera")}
              </div>
            </Col>
            <Col md={4}>
              <h3>Trabajando</h3>
              <div style={{ maxHeight: "100%", overflowY: "scroll" }}>
                {renderProyectsByStatus("Trabajando")}
              </div>
            </Col>
            <Col md={4}>
              <h3>Finalizado</h3>
              <div style={{ maxHeight: "100%", overflowY: "scroll" }}>
                {renderProyectsByStatus("Finalizado")}
              </div>
            </Col>
          </Row>

          <ConsultProjectModal 
            showModal={showModal}
            setShowModal={setShowModal}
            idProyecto={selectedProjectId || 0}
          />
        </Container>
      )}
      <ToastContainer />
    </Layout>
  );
};
