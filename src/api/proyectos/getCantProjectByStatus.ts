import { planificaTechApi } from "../baseApi";

export const getCantProjectsByStatus = async (id_empresa:number, estado_proyecto:string) => {
  const response = await planificaTechApi.get('proyectos/getCantProjectsByStatus', {
    params: {
      id_empresa: id_empresa,
      estado_proyecto: estado_proyecto
    }
  });
  return response.data[0].cantidad_proyectos;
};