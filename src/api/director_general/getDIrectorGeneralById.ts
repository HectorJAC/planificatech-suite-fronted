import { planificaTechApi } from "../baseApi";
import { getIdDirectorGeneral } from "../../utils/getLocalStorageData";

export const getDirectorGeneralById = async () => {
  const response = await planificaTechApi.get('director_general/getDirectorGeneral', {
    params: {
      id_director_general: getIdDirectorGeneral()
    }
  });
  return response.data;
};