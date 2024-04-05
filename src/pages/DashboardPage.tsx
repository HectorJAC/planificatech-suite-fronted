import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import { BarChart } from "../components/BarChart";
import { Layout } from "../layout/Layout";

interface ChartDataProps {
    departamento: string;
    cantidad_empleados: number;
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

    useEffect(() => {
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
    }, []);

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

                    <Col md={6}>
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
                </Row>
            </Container>
        </Layout>
    );
};
