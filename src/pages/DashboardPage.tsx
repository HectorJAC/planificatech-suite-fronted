import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import Chart, { CategoryScale } from "chart.js/auto";
import { BarChart } from "../components/BarChart";
import { Layout } from "../layout/Layout";
import { planificaTechApi } from "../api/baseApi";
import { EmployeesProps } from "../interfaces/employeeInterface";
import { useCompanyStore } from "../store/companyStore";
import { cantProyectosEstado } from "../api/graficas/proyectos/cantProyectosEstado";
import { getUniqueRandomColor } from "../helpers/dataGraphs";
import { GraphicsProps } from "../interfaces/graphicsInterface";
import { cantEmpleadosDepartamentos } from "../api/graficas/departamentos/cantEmpleadosDepartamentos";
import { TableProjectsByStatus } from "../components/TableProjectsByStatus";

Chart.register(CategoryScale);

export const DashboardPage = () => {

  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "",
        data: [] as number[],
        backgroundColor: "",
      }
    ],
  });

  const [chartDataProyectos, setChartDataProyectos] = useState<GraphicsProps>({...chartData});
  const [employees, setEmployees] = useState<EmployeesProps>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const { company } = useCompanyStore();

  useEffect(() => {
    cantEmpleadosDepartamentos()
      .then((data) => {
        const usedColors = new Set<string>();
        const colors = data?.datasets[0]?.data.map(() => getUniqueRandomColor(usedColors)) || [];
        if (data) {
          setChartData({
            labels: data.labels,
            datasets: [
              {
                label: "Cant. empleados",
                data: data.datasets[0].data,
                backgroundColor: colors,
              }
            ],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const getEmployees = async (page:number, limit:number) => {
      planificaTechApi.get('/empleados/getAllEmployees', {
        params: {
          page: page,
          limit: limit,
          id_empresa: company.id_empresa!
        }
      })
        .then((response) => {
          setEmployees(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getEmployees(page, limit);
  }, [page, limit, company.id_empresa]);

  useEffect(() => {
    cantProyectosEstado(company.id_empresa!)
      .then((data) => {
        const usedColors = new Set<string>();
        const colors = data?.datasets[0]?.data.map(() => getUniqueRandomColor(usedColors)) || [];
        if (data) {
          setChartDataProyectos({
            labels: data.labels,
            datasets: [
              {
                label: "Cant. proyectos",
                data: data.datasets[0].data,
                backgroundColor: colors,
              }
            ],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [company.id_empresa]);

  return (
    <Layout>
      <Container className="mt-3">
        <Row>
          <Col md={12}>
            <Button
              style={{ marginBottom: "20px" }}
            >
              Actualizar
            </Button>
          </Col>

          <Col md={6} className="mb-3">
            <BarChart 
              title="Cantidad de empleados por departamentos"
              chartData={{
                labels: chartData.labels,
                datasets: chartData.datasets.map(dataset => ({
                  label: dataset.label,
                  data: dataset.data,
                  backgroundColor: dataset.backgroundColor as unknown as string[],
                })),
              }} 
            />
          </Col>

          <Col md={6} className="mb-3">
            <BarChart 
              title="Cantidad de empleados por departamentos"
              chartData={{
                labels: chartData.labels,
                datasets: chartData.datasets.map(dataset => ({
                  label: dataset.label,
                  data: dataset.data,
                  backgroundColor: dataset.backgroundColor as unknown as string[],
                })),
              }} 
            />
          </Col>

          <Col md={6} className="mb-3">
            <BarChart 
              title="Cantidad de proyectos por estado"
              chartData={{
                labels: chartDataProyectos.labels,
                datasets: chartDataProyectos.datasets.map(dataset => ({
                  label: dataset.label,
                  data: dataset.data,
                  backgroundColor: dataset.backgroundColor as unknown as string[],
                })),
              }} 
            />
          </Col>

          <Col md={6} className="mb-3">
            <BarChart 
              title="Cantidad de empleados por departamentos"
              chartData={{
                labels: chartData.labels,
                datasets: chartData.datasets.map(dataset => ({
                  label: dataset.label,
                  data: dataset.data,
                  backgroundColor: dataset.backgroundColor as unknown as string[],
                })),
              }} 
            />
          </Col>

          <Col md={6} className="mb-3">

            <Button
              style={{ marginBottom: "20px" }}
              onClick={() => setPage(page - 1)}
            >
              Anterior
            </Button>
            <Button
              style={{ marginBottom: "20px", marginLeft: "20px" }}
              onClick={() => setPage(page + 1)}
            >
              Siguiente
            </Button>
            <Button
              style={{ marginBottom: "20px", marginLeft: "20px" }}
              onClick={() => setLimit(limit)}
              hidden
            >
            </Button>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nombres y apellidos</th>
                  <th>Cedula</th>
                  <th>Departamento</th>
                </tr>
              </thead>
              <tbody>
                {
                  employees?.employees.map((employee) => (
                    <tr key={employee.cedula}>
                      <td>{employee.nombres} {employee.apellidos}</td>
                      <td>{employee.cedula}</td>
                      <td>{employee.nombre_departamento}</td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </Col>

          <Col md={6} className="mb-3">
            <TableProjectsByStatus 
              estadoProyecto='Trabajando'
            />
          </Col>

          <Col md={6} className="mb-3">
            <TableProjectsByStatus 
              estadoProyecto='En Espera'
            />
          </Col>

          <Col md={6} className="mb-3">
            <TableProjectsByStatus 
              estadoProyecto='Finalizado'
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};
