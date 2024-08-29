import { planificaTechApi } from "../baseApi";

export const getOneProjectEmployee = async (id_proyecto:number) => {
  const response = await planificaTechApi.get('proyectos/getProjectEmployeeById', {
    params: {
      id_proyecto: id_proyecto
    }
  });
  return response.data;
};