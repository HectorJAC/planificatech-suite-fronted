import { planificaTechApi } from "../baseApi";

export const addDepartmentToProject = async (id_proyecto:number, id_departamento:number) => {
  const response = await planificaTechApi.post('proyectos/addDepartmentToProject', {
    id_proyecto: id_proyecto,
    id_departamento: id_departamento,
    estado: 'ACTIVO'
  });
  return response.data;
};