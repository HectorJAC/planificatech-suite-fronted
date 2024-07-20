import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Image } from "react-bootstrap";
import { Layout } from "../layout/Layout";
import { getImageUrl } from "../helpers/getImageUrl";
import { CompanyProps } from "../interfaces/companyInteface";
import { findCompanyByDirector } from "../api/empresas/findCompanyByDirector";
import { CustomBasicModal } from "../components/CustomBasicModal";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {

    const navigate = useNavigate();
    const [companyData, setCompanyData] = useState<CompanyProps>();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        findCompanyByDirector()
            .then((response) => {
                setCompanyData(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (companyData?.id_empresa === undefined) {
            return;
        } else {
            axios.get(`${import.meta.env.VITE_API_URL}/departamentos/getDepartamentos`, {
                params: {
                    id_empresa: companyData?.id_empresa
                }
            })
            .then(() => {
                setShowModal(false);
            })
            .catch(() => {
                setShowModal(true);
            });
        }
    }, [companyData]);
    
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

            <CustomBasicModal 
                title="Su empresa no tiene departamentos"
                body="¿Desea crear un departamento ahora o hacerlo mas tarde?"
                secondaryButton="Crear departamento mas tarde"
                primaryButton="Crear departamento ahora"
                showModal={showModal}
                setShowModal={() => setShowModal(false)}
                onClick={() => navigate('/create_department')}
            />
        </Layout>
    );
};

