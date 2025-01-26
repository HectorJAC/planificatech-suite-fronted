import { planificaTechApi } from "../baseApi";

export const getAllEmployeesNoPagination = async (id_empresa:number) => {
  const response =  await planificaTechApi.get('empleados/getAllEmployees', {
    params: {
      id_empresa: id_empresa
    }
  })
  return response.data;
};