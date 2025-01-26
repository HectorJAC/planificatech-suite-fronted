import { planificaTechApi } from "../baseApi";

export const updateTaskFromProject = async (
  id_tarea_proyecto:number, 
  nombre_tarea_proyecto:string,
  descripcion_tarea_proyecto:string,
  fecha_inicio:string,
  fecha_fin:string,
  id_proyecto:number,
  estado_tarea_proyecto:string,
) => {
  const response = await planificaTechApi.put('proyectos/updateTaskFromProject', {
    id_tarea_proyecto: id_tarea_proyecto,
    nombre_tarea_proyecto: nombre_tarea_proyecto,
    descripcion_tarea_proyecto: descripcion_tarea_proyecto,
    fecha_inicio: fecha_inicio,
    fecha_fin: fecha_fin,
    id_proyecto: id_proyecto,
    estado_tarea_proyecto: estado_tarea_proyecto,
    estado: 'ACTIVO'
  });
  return response.data;
};