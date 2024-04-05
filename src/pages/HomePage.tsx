import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Image } from "react-bootstrap";
import { Layout } from "../layout/Layout";

interface CompanyDataProps {
    logo_empresa?: string;
}

export const HomePage = () => {

    const [companyData, setCompanyData] = useState<CompanyDataProps>();
    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/empresas/findCompanyByDirector`, {
            params: {
                id_director_general: localStorage.getItem('id')
            }
        })
        .then((response) => {
            setCompanyData(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const getImageUrl = (imageName: string) => {
        // Reemplaza "images" con la ruta base donde se almacenan tus imágenes
        return `/public/${imageName}`;
    };
    
    return (
        <Layout>
            <Container className="mt-3 d-flex justify-content-center align-items-center">
                {companyData?.logo_empresa && (
                    <Image 
                        src={getImageUrl(companyData.logo_empresa)} 
                        alt="Logo de la empresa" 
                        fluid
                    />
                )}
            </Container>
        </Layout>
    );
};

