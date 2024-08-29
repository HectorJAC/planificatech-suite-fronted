import { planificaTechApi } from "../baseApi";

export const getOneProjectDepartment = async (id_proyecto:number) => {
  const response = await planificaTechApi.get('proyectos/getProjectById', {
    params: {
      id_proyecto: id_proyecto
    }
  });
  return response.data;
};