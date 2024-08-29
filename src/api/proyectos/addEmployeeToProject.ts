import { planificaTechApi } from "../baseApi";

export const addEmployeeToProject = async (id_proyecto:number, id_empleado:number) => {
  const response = await planificaTechApi.post('proyectos/addEmployeeToProject', {
    id_proyecto: id_proyecto,
    id_empleado: id_empleado,
    estado: 'ACTIVO'
  });
  return response.data;
};