import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import axios from "axios";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import { BarChart } from "../components/BarChart";
import { Layout } from "../layout/Layout";

interface ChartDataProps {
    departamento: string;
    cantidad_empleados: number;
}

interface EmployeeDataProps {
    employees: {
        cedula: string;
        nombres: string;
        apellidos: string;
        nombre_departamento: string;
    }[]
}

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

    const [employees, setEmployees] = useState<EmployeeDataProps>();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(4);

    useEffect(() => {
        const getGraphData = async () => {
            axios.get(`${import.meta.env.VITE_API_URL}/departamentos/getEmpleadosPorDepartamento`)
            .then((response) => {
                setChartData({
                    labels: response.data.map((data: ChartDataProps) => data.departamento),
                    datasets: [
                        {
                            label: "Cant. empleados",
                            data: response.data.map((data: ChartDataProps) => data.cantidad_empleados),
                            backgroundColor: "rgba(54, 162, 235, 0.6)",
                        }
                    ],
                });
            })
            .catch((error) => {
                console.log(error);
            });
        };

        const getEmployees = async (page:number, limit:number) => {
            axios.get(`${import.meta.env.VITE_API_URL}/empleados/getAllEmployees`, {
                params: {
                    page: page,
                    limit: limit,
                }
            })
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        };

        getGraphData();
        getEmployees(page, limit);
    }, [page, limit]);

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
                                    ...dataset,
                                    backgroundColor: [dataset.backgroundColor],
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
                                    ...dataset,
                                    backgroundColor: [dataset.backgroundColor],
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
                                    ...dataset,
                                    backgroundColor: [dataset.backgroundColor],
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
                                    ...dataset,
                                    backgroundColor: [dataset.backgroundColor],
                                })),
                            }} 
                        />
                    </Col>

                    <Col md={6}>

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

                    <Col md={6}>

                        <Button
                            style={{ marginBottom: "20px" }}
                        >
                            Anterior
                        </Button>
                        <Button
                            style={{ marginBottom: "20px", marginLeft: "20px" }}
                        >
                            Siguiente
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

                </Row>
            </Container>
        </Layout>
    );
};
