import { planificaTechApi } from "../baseApi";

export const getProjectsEmployees = async (id_proyecto:number) => {
  const response = await planificaTechApi.get('proyectos/getProjectsEmployees', {
    params: {
      id_proyecto: id_proyecto
    }
  });
  return response.data;
};