import { planificaTechApi } from "../baseApi";

export const createProject = async (
  nombre_proyecto:string,
  descripcion_proyecto:string,
  fecha_inicio:string,
  fecha_fin:string | null,
  presupuesto_asignado:number | null,
  tipo_proyecto:number,
  id_gerente:number,
  id_empresa:number,
  estado_proyecto:string,
) => {
  const response = await planificaTechApi.post('proyectos/createProject', {
    nombre_proyecto: nombre_proyecto,
    descripcion_proyecto: descripcion_proyecto,
    fecha_inicio: fecha_inicio,
    fecha_fin: fecha_fin,
    presupuesto_asignado: presupuesto_asignado,
    tipo_proyecto: tipo_proyecto,
    id_gerente: id_gerente,
    id_empresa: id_empresa,
    estado_proyecto: estado_proyecto,
    estado: 'ACTIVO'
  });
  return response.data;
};