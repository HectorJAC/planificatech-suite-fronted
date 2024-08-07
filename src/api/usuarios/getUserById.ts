import { planificaTechApi } from "../baseApi";
import { getIdUser } from "../../helpers/getLocalStorageData";

export const getUserById = async () => {
  const response = await planificaTechApi.get('usuarios/getUser', {
    params: {
      id_usuario: getIdUser()
    }
  });
  return response.data;
};