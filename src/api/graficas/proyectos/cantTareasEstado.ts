import { planificaTechApi } from "../../baseApi";

interface ChartDataProps {
  estado_tarea_proyecto: string;
  cantidad_tareas: number;
}

export const cantTareasEstado = async () => {
  try {
    const response = await planificaTechApi.get('/proyectos/getAllTasksByStatus');
        
    return {
      labels: response.data.map((data: ChartDataProps) => data.estado_tarea_proyecto),
      datasets: [
        {
          label: "Cant. tareas",
          data: response.data.map((data: ChartDataProps) => data.cantidad_tareas),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        }
      ],
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
