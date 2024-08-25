import { planificaTechApi } from "../baseApi";
import { getIdUser } from "../../helpers/getLocalStorageData";

export const getNotesByUser = async (page:number, limit:number) => {
  const response = await planificaTechApi.get('notas/getNotesByUser', {
    params: {
      id_usuario: getIdUser(),
      page: page,
      limit: limit,
    }
  });
  return response.data;
};