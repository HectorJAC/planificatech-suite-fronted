import { planificaTechApi } from "../baseApi";

export const getOneProjectData = async (id_proyecto:number) => {
  const response = await planificaTechApi.get('proyectos/getOneProject', {
    params: {
      id_proyecto: id_proyecto
    }
  });
  return response.data;
};