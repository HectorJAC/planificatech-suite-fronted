import { planificaTechApi } from "../../baseApi";

interface ChartDataProps {
  estado_tarea_proyecto: string;
  cantidad_tareas: number;
}

export const cantTareasPoryectoEstado = async (id_proyecto:number) => {
  try {
    const response = await planificaTechApi.get('/proyectos/getTasksProjectByStatus', {
      params: {
        id_proyecto: id_proyecto
      }
    });
        
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
