import { Button, Col, Row, Table } from "react-bootstrap";
import { useCompanyStore } from "../store/companyStore";
import { FC, useCallback, useEffect, useState } from "react";
import { ProyectosEstadoProps } from "../interfaces/proyectsInterface";
import { planificaTechApi } from "../api/baseApi";

interface TableProjectsByStatusProps {
  estadoProyecto: string;
}

export const TableProjectsByStatus:FC<TableProjectsByStatusProps> = ({estadoProyecto}) => {
  const [projectStatusData, setProjectStatusData] = useState<ProyectosEstadoProps>({} as ProyectosEstadoProps);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { company } = useCompanyStore();

  const getAllProjectsStatus = useCallback((pageNumber:number = 1) => {
    planificaTechApi.get('/proyectos/getAllProjectsByStatus', {
      params: {
        page: pageNumber,
        limit: 4,
        id_empresa: company.id_empresa!,
        estado_proyecto: estadoProyecto,
      }
    })
      .then((response) => {
        setProjectStatusData(response.data);
        setCurrentPage(pageNumber);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [company.id_empresa, estadoProyecto]);

  useEffect(() => {
    getAllProjectsStatus(1)
  }, [getAllProjectsStatus]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      getAllProjectsStatus(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      getAllProjectsStatus(currentPage + 1);
    }
  };

  return (
    <>
      <Row>
        <Col>
          <h2>{`Proyectos en estado: ${estadoProyecto}`}</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID Proyecto</th>
                <th>Proyecto</th>
                <th>Estado</th>
                <th>Nombre Gerente</th>
                <th>Asignado a</th>
              </tr>
            </thead>
            <tbody>
              {
                projectStatusData.proyectosEstado?.map((project) => (
                  <tr key={project.id_proyecto}>
                    <td>{project.id_proyecto} </td>
                    <td>{project.nombre_proyecto} </td>
                    <td>{project.estado_proyecto}</td>
                    <td>{project.nombre_gerente} {project.apellido_gerente}</td>
                    {
                      project.tipo_proyecto === 1
                        ? <td>Departamento(s)</td>
                        : <td>Empleado(s)</td>
                    }
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
    </>
  );
};
