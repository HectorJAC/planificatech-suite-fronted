import { useEffect, useState } from "react";
import { Layout } from "../layout/Layout";
import { Container } from "react-bootstrap";
import axios from "axios";

interface UserDataProps {
    nombres: string;
    apellidos: string;
}

export const HomePage = () => {
    
    const [userData, setUserData] = useState<UserDataProps>({} as UserDataProps);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/director_general/getDirectorGeneral`, {
            params: {
                id_director_general: localStorage.getItem('id')
            }
        })
        .then((response) => {
            setUserData(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <Layout>
            <Container>
                <h1
                    style={{
                        marginTop: "20px",
                        fontSize: "2rem",
                    }}
                >
                    Bienvenido {userData.nombres} {userData.apellidos}
                </h1>
            </Container>
        </Layout>
    );
};
