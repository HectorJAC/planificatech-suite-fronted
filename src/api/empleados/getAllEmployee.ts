import { planificaTechApi } from "../baseApi";

export const getEmployees = async (page:number, limit:number) => {
  const response =  await planificaTechApi.get(`${import.meta.env.VITE_API_URL}/empleados/getAllEmployees`, {
    params: {
      page: page,
      limit: limit,
    }
  })
  return response.data;
};