import { planificaTechApi } from "../baseApi";
import { getIdDirectorGeneral } from "../../helpers/getLocalStorageData";

export const findCompanyByDirector = async () => {
    const response = await planificaTechApi.get('empresas/findCompanyByDirector', {
        params: {
            id_director_general: getIdDirectorGeneral()
        }
    });
    return response.data;
};

