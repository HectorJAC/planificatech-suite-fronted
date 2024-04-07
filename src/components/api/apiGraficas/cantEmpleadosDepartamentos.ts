import axios from "axios";

interface ChartDataProps {
    departamento: string;
    cantidad_empleados: number;
}

export const cantEmpleadosDepartamentos = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/departamentos/getEmpleadosPorDepartamento`);
        
        return {
            labels: response.data.map((data: ChartDataProps) => data.departamento),
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
