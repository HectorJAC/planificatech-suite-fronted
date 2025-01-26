import { planificaTechApi } from "../baseApi";

export const deleteTaskFromProject = async (
  id_tarea_proyecto:number
) => {
  const response = await planificaTechApi.put('proyectos/inactivateTaskFromProject', {
    id_tarea_proyecto: id_tarea_proyecto,
    estado: 'INACTIVO'
  });
  return response.data;
};