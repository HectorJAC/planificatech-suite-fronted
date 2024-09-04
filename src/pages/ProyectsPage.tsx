import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Layout } from "../layout/Layout";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
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
import { planificaTechApi } from "../api/baseApi";
import { updateProject } from "../api/proyectos/updateProject";
import { getCantProjectsByStatus } from "../api/proyectos/getCantProjectByStatus";

export const ProyectsPage = () => {

  const navigate = useNavigate();
  const [proyects, setProyects] = useState<ProyectsProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [searchProject, setSearchProject] = useState('');
  const [cantProyectsTrabajando, setCantProyectsTrabajando] = useState();
  const [cantProyectsEspera, setCantProyectsEspera] = useState();
  const [cantProyectsFinalizado, setCantProyectsFinalizado] = useState();

  const { company } = useCompanyStore();
  const { onAddProject, onResetProject } = useProjectStore();

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

  const getCantProjectsTrabajando = useCallback(() => {
    getCantProjectsByStatus(company.id_empresa!, 'Trabajando')
      .then((response) => {
        setCantProyectsTrabajando(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [company.id_empresa]);

  const getCantProjectsEspera = useCallback(() => {
    getCantProjectsByStatus(company.id_empresa!, 'En Espera')
      .then((response) => {
        setCantProyectsEspera(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [company.id_empresa]);

  const getCantProjectsFinalizado = useCallback(() => {
    getCantProjectsByStatus(company.id_empresa!, 'Finalizado')
      .then((response) => {
        setCantProyectsFinalizado(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [company.id_empresa]);

  useEffect(getCantProjectsTrabajando, [getCantProjectsTrabajando]);
  useEffect(getCantProjectsEspera, [getCantProjectsEspera]);
  useEffect(getCantProjectsFinalizado, [getCantProjectsFinalizado]);

  const getCantProjects = () => {
    getCantProjectsTrabajando();
    getCantProjectsEspera();
    getCantProjectsFinalizado();
  };

  const handleShowModal = (id_gerente: number) => {
    setSelectedProjectId(id_gerente);
    setShowModal(true);
  };

  const goToEditProject = (id_proyecto:number) => {
    navigate('/create_project');
    onAddProject(id_proyecto);
  };

  const handleSearchProject = () => {
    setIsLoading(true);
    if (searchProject === '') {
      allProyects();
    } else {
      planificaTechApi.get('/proyectos/searchProject', {
        params: {
          search: searchProject
        }
      })
        .then((response) => {
          setProyects(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setIsLoading(false);
        })
    }
  };

  const changeStatusProject = (
    id_proyecto:number, 
    nombre_proyecto:string,
    descripcion_proyecto:string,
    fecha_inicio:string,
    fecha_fin:string,
    presupuesto_asignado:number,
    tipo_proyecto:number,
    id_gerente:number,
    id_empresa:number,
    estado_proyecto:string,
  ) => {
    updateProject(
      id_proyecto,
      nombre_proyecto,
      descripcion_proyecto,
      fecha_inicio,
      fecha_fin,
      presupuesto_asignado,
      tipo_proyecto,
      id_gerente,
      id_empresa,
      estado_proyecto,
    )
      .then(() => {
        toast.success('Proyecto actualizado con exito');
        getCantProjects();
        allProyects();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        getCantProjects();
        allProyects();
      });
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
            <Card.Text>
              Fecha Fin: {
                proyect.fecha_fin === null
                  ? 'Sin Fecha'
                  : formatterDate(proyect.fecha_fin)
              }
            </Card.Text>
            <Card.Text>
              Gerente Encargado: {proyect.nombre_gerente} {proyect.apellido_gerente}
            </Card.Text>
            {
              proyect.tipo_proyecto === 1
                ? (
                  <Card.Text>
                    Asignado a Departamento(s)
                  </Card.Text>
                )
                : (
                  <Card.Text>
                    Asignado a Empleado(s)
                  </Card.Text>
                )
            }
            <Card.Text>
              <Form.Select
                value={proyect.estado_proyecto}
                onChange={
                  (e: ChangeEvent<HTMLSelectElement>) => changeStatusProject(
                    proyect.id_proyecto!,
                    proyect.nombre_proyecto!,
                    proyect.descripcion_proyecto!,
                    proyect.fecha_inicio!,
                    proyect.fecha_fin!,
                    proyect.presupuesto_asignado!,
                    proyect.tipo_proyecto!,
                    proyect.id_gerente!,
                    proyect.id_empresa!,
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

  const gotoCreateProject = () => {
    onResetProject();
    navigate('/create_project');
  }

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
                onClick={gotoCreateProject}
              >
                Crear Proyecto
              </Button>
            </Col>

            <Col md={10}>
              <div className="input-group">
                <Form.Control
                  type="text"
                  placeholder="Buscar por ID o Titulo del Proyecto"
                  value={searchProject}
                  onChange={(e) => setSearchProject(e.target.value)}
                />
                <Button 
                  variant="primary" 
                  onClick={handleSearchProject}
                >
                  Buscar
                </Button>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <h3>En Espera ({cantProyectsEspera})</h3>
              <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
                {renderProyectsByStatus("En Espera")}
              </div>
            </Col>
            <Col md={4}>
              <h3>Trabajando ({cantProyectsTrabajando})</h3>
              <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
                {renderProyectsByStatus("Trabajando")}
              </div>
            </Col>
            <Col md={4}>
              <h3>Finalizado ({cantProyectsFinalizado})</h3>
              <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
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
