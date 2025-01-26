import { planificaTechApi } from "../baseApi";

export const getTaskFromProject = async (id_tarea_proyecto:number) => {
  const response = await planificaTechApi.get('proyectos/getTaskProjectById', {
    params: {
      id_tarea_proyecto: id_tarea_proyecto
    }
  });
  return response.data;
};