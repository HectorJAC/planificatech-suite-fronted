import { planificaTechApi } from "../baseApi";

export const getAllGerentesNoPagination = async (id_empresa:number) => {
  const response =  await planificaTechApi.get('gerentes/getAllManagersNoPagination', {
    params: {
      id_empresa: id_empresa
    }
  })
  return response.data;
};