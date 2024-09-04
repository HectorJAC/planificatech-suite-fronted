import { planificaTechApi } from "../baseApi";

export const getEmployees = async (page:number, limit:number, id_empresa:number) => {
  const response =  await planificaTechApi.get(`${import.meta.env.VITE_API_URL}/empleados/getAllEmployees`, {
    params: {
      page: page,
      limit: limit,
      id_empresa: id_empresa
    }
  })
  return response.data;
};