import { planificaTechApi } from "../../baseApi";

interface ChartDataProps {
  estado_proyecto: string;
  cantidad_proyectos: number;
}

export const cantProyectosEstado = async (id_empresa:number) => {
  try {
    const response = await planificaTechApi.get('/proyectos/getProjectsByStatus', {
      params: {
        id_empresa: id_empresa
      }
    });
        
    return {
      labels: response.data.map((data: ChartDataProps) => data.estado_proyecto),
      datasets: [
        {
          label: "Cant. proyectos",
          data: response.data.map((data: ChartDataProps) => data.cantidad_proyectos),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        }
      ],
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
