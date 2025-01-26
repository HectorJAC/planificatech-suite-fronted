import { planificaTechApi } from "../baseApi";

export const addTaskToProject = async (
  nombre_tarea_proyecto: string,
  descripcion_tarea_proyecto: string,
  fecha_inicio_tarea_proyecto: string,
  fecha_fin_tarea_proyecto: string,
  id_proyecto: number,
  estado_tarea_proyecto: string,
) => {
  const response = await planificaTechApi.post('proyectos/addTaskToProject', {
    nombre_tarea_proyecto,
    descripcion_tarea_proyecto,
    fecha_inicio_tarea_proyecto,
    fecha_fin_tarea_proyecto,
    id_proyecto,
    estado_tarea_proyecto,
    estado: 'ACTIVO'
  });
  return response.data;
};