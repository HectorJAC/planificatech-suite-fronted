import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Layout } from "../layout/Layout";
import { CustomBasicModal } from "../components/CustomBasicModal";
import { useNavigate } from "react-router-dom";
import { useCompanyStore } from "../store/companyStore";
import { CustomImage } from "../components/CustomImage";
import { planificaTechApi } from "../api/baseApi";

export const HomePage = () => {

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { company } = useCompanyStore();

  useEffect(() => {
    if (company.id_empresa === undefined) {
      return;
    } else {
      planificaTechApi.get('/departamentos/getDepartamentos', {
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
          <Row>
            <Col md={24}>
              <CustomImage 
                imageData={company?.logo_empresa}
                alt="Logo de la empresa"
                style={{ width: "100%", height: "auto" }}
              />
            </Col>
          </Row>
        )}
      </Container>

      <CustomBasicModal 
        title="Su empresa no tiene departamentos"
        body="¿Desea crear un departamento ahora?"
        secondaryButton="Crear departamento mas tarde"
        primaryButton="Crear departamento ahora"
        showModal={showModal}
        setShowModal={() => setShowModal(false)}
        onClick={() => navigate('/create_department')}
      />
    </Layout>
  );
};

