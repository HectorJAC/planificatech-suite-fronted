import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import { Data } from "../dataChartjs/data";
import { BarChart } from "../components/BarChart";
import { Layout } from "../layout/Layout";

interface UserDataProps {
    nombres: string;
    apellidos: string;
}

Chart.register(CategoryScale);

export const HomePage = () => {
    
    const [userData, setUserData] = useState<UserDataProps>({} as UserDataProps);

    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.departamento),
        datasets: [
            {
                label: "Cant. empleaods",
                data: Data.map((data) => data.cantidad_empleados),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
            }
        ],
    });

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/director_general/getDirectorGeneral`, {
            params: {
                id_director_general: localStorage.getItem('id')
            }
        })
        .then((response) => {
            setUserData(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <Layout>
            <Container>
                <h1
                    style={{
                        marginTop: "20px",
                        marginBottom: "20px",
                        fontSize: "2rem",
                    }}
                >
                    Bienvenido a su Dashboard {userData.nombres} {userData.apellidos}
                </h1>

                <Row>

                    <Col md={12}>
                        <Button
                            style={{ marginBottom: "20px" }}
                            onClick={() => {
                                setChartData({
                                    labels: Data.map((data) => data.departamento),
                                    datasets: [
                                        {
                                            label: "Cant. empleados",
                                            data: Data.map((data) => data.cantidad_empleados),
                                            backgroundColor: "rgba(54, 162, 235, 0.6)",
                                        }
                                    ],
                                });
                            }}
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
