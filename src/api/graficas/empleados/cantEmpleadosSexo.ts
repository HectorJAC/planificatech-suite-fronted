import { planificaTechApi } from "../../baseApi";

interface ChartDataProps {
  sexo: string;
  cantidad_empleados: number;
}

export const cantEmpleadosSexo = async (id_empresa:number) => {
  try {
    const response = await planificaTechApi.get('/empleados/getEmployeesByGender', {
      params: {
        id_empresa: id_empresa
      }
    });
        
    return {
      labels: response.data.map((data: ChartDataProps) => data.sexo),
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
