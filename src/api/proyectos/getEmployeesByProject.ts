import { planificaTechApi } from "../baseApi";

export const getEmployeesByProject = async (page:number, limit:number, id_proyecto:number) => {
  const response =  await planificaTechApi.get('/proyectos/getEmployeesByProject', {
    params: {
      page: page,
      limit: limit,
      id_proyecto: id_proyecto,
    }
  });
  return response.data;
};