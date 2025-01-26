import { planificaTechApi } from "../baseApi";

export const getAllProyects = async (id_empresa:number) => {
  const response = await planificaTechApi.get('proyectos/getAllProjects', {
    params: {
      id_empresa: id_empresa
    }
  });
  return response.data;
};