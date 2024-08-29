export interface ProyectsProps {
  id_proyecto?: number;
  nombre_proyecto?: string;
  descripcion_proyecto?: string;
  fecha_inicio?: string;
  fecha_fin?: string;
  presupuesto_asigando?: number;
  tipo_proyecto?: number;
  id_empresa?: number;
  estado_proyecto?: string;
  estado?: string;

  id_tarea_plan?: number;
  nombre_tarea_proyecto?: string;
  descripcion_tarea_proyecto?: string;
  estado_tarea_proyecto?: string;
  id_departamento?: number;
  nombre_departamento?: string;
  id_gerente?: number;
  nombre_gerente?: string;
  apellido_gerente?: string;
  id_empleado?: number;
  nombre_empleado?: string;
  apellido_empleado?: string;
  cedula_empleado?: number;
  fecha_ingreso_empleado?: string;
  estado_empleado?: string;
}

export interface ProyectosEmpleadosProps {
  id_proyecto_empleado?: number;
  id_empleado?: number;
  id_proyecto?: number;
  id_gerente?: number;
  estado?: string;
}