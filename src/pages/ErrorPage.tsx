import { Layout } from "../layout/Layout";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Layout>
      <Container className="text-center py-5">
        <h1 className="display-1 fw-bold text-danger">Error 404</h1>
        <p className="lead">La página que estás buscando no fue encontrada.</p>
        <Button 
          onClick={handleGoHome} 
          variant="primary"
          className="mb-2 w-10 0 px-4 py-2 text-uppercase fw-bold shadow-sm border-0 rounded-pill bg-gradient bg-gradient hover-transition hover-shadow hover-translate-y-n3 hover-scale-lg transition-fast"
        >
            Volver al Inicio
        </Button>
      </Container>
    </Layout>
  );
};
