import { planificaTechApi } from "../baseApi";
import { getIdUser } from "../../helpers/getLocalStorageData";

export const getNotesByUser = async () => {
    const response = await planificaTechApi.get('notas/getNotesByUser', {
        params: {
            id_usuario: getIdUser()
        }
    });
    return response.data;
};