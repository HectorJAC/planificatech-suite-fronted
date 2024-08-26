import { planificaTechApi } from "../../baseApi";

interface ChartDataProps {
  puesto: string;
  cantidad_empleados: number;
}

export const cantEmpleadosPuestos = async () => {
  try {
    const response = await planificaTechApi.get('/puestos/getEmpleadosPorPuesto');
        
    return {
      labels: response.data.map((data: ChartDataProps) => data.puesto),
      datasets: [
        {
          label: "Cant. empleados",
          data: response.data.map((data: ChartDataProps) => data.cantidad_empleados),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        }
      ],
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
