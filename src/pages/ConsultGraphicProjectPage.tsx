import { useEffect, useState } from "react";
import { Container, Row, Col, Accordion, Form } from "react-bootstrap";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import { BarChart } from "../components/BarChart";
import { Layout } from "../layout/Layout";
import { getUniqueRandomColor } from "../helpers/dataGraphs";
import { cantTareasPoryectoEstado } from "../api/graficas/proyectos/cantTareasPoyectoEstado";
import { useProjectStore } from "../store/projectStore";
import { FaAngleLeft } from "react-icons/fa";
import { getOneProjectData } from "../api/proyectos/getOneProjectData";
import { ProyectsProps } from "../interfaces/proyectsInterface";

// interface GraphicsProps {
//   labels: string[];
//   datasets: {
//     label: string;
//     data: number[];
//     backgroundColor: string;
//   }[];
// }

Chart.register(CategoryScale);

export const ConsultGraphicProjectPage = () => {

  const [oneProjectData, setOneProjectData] = useState<ProyectsProps>({} as ProyectsProps);
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

  const { id_proyecto } = useProjectStore();

  useEffect(() => {
    cantTareasPoryectoEstado(id_proyecto)
      .then((data) => {
        const usedColors = new Set<string>();
        const colors = data?.datasets[0]?.data.map(() => getUniqueRandomColor(usedColors)) || [];
        if (data) {
          setChartData({
            labels: data.labels,
            datasets: [
              {
                label: "Cant. tareas",
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
  }, [id_proyecto]);

  useEffect(() => {
    getOneProjectData(id_proyecto)
      .then((response) => {
        setOneProjectData(response);
      });
  }, [id_proyecto,]);

  return (
    <Layout>
      <Container className="mt-3">

        <Row>
          <Col>
            <Form.Text
              className='text-primary mb-4'
              style={{ cursor: 'pointer' }}
              onClick={() => window.history.back()}
            >
              <FaAngleLeft/> Volver
            </Form.Text>
            <h1 className="mt-3 mb-4">
              Gráficas del Proyecto: {oneProjectData.nombre_proyecto}
            </h1>
          </Col>
        </Row>

        <Row>
          <Col className="mb-3">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header className="sidebar-header">Cantidad de Tareas del Proyecto por Estado</Accordion.Header>
                <Accordion.Body>
                  <BarChart 
                    title="Cantidad de tareas del proyecto por estado"
                    chartData={{
                      labels: chartData.labels,
                      datasets: chartData.datasets.map(dataset => ({
                        label: dataset.label,
                        data: dataset.data,
                        backgroundColor: dataset.backgroundColor as unknown as string[],
                      })),
                    }} 
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>

      </Container>
    </Layout>
  );
};
