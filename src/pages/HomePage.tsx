import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Image } from "react-bootstrap";
import { Layout } from "../layout/Layout";
import { getImageUrl } from "../helpers/getImageUrl";
import { CustomBasicModal } from "../components/CustomBasicModal";
import { useNavigate } from "react-router-dom";
import { useCompanyStore } from "../store/companyStore";

export const HomePage = () => {

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { company } = useCompanyStore();

  useEffect(() => {
    if (company.id_empresa === undefined) {
      return;
    } else {
      axios.get(`${import.meta.env.VITE_API_URL}/departamentos/getDepartamentos`, {
        params: {
          id_empresa: company.id_empresa
        }
      })
        .then(() => {
          setShowModal(false);
        })
        .catch(() => {
          setShowModal(true);
        });
    }
  }, [company]);
    
  return (
    <Layout>
      <Container className="mt-3 d-flex justify-content-center align-items-center">
        {company.logo_empresa && (
          <Image 
            src={getImageUrl(company.logo_empresa)} 
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

