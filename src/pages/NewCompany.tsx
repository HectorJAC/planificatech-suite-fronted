import { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { 
  Container,
  Row, 
  Col, 
  Card, 
  Form, 
  Button
} from 'react-bootstrap';
import { FaAngleLeft } from "react-icons/fa6";
import { Background } from '../components/Background';
import { CustomAsterisk } from '../components/CustomAsterisk';
import "react-toastify/dist/ReactToastify.css";
import { getIdDirectorGeneral } from '../helpers/getLocalStorageData';
import { getDirectorGeneralById } from '../api/director_general/getDIrectorGeneralById';

export const NewCompany = () => {

  const [nombreEmpresa, setNombreEmpresa] = useState<string>('');
  const [rncEmpresa, setRncEmpresa] = useState<number>();
  const [logoEmpresa, setLogoEmpresa] = useState<string>('');
  const [fechaFundacion, setFechaFundacion] = useState<string>('');
  const [direccionEmpresa, setDireccionEmpresa] = useState<string>('');
  const [telefonoEmpresa, setTelefonoEmpresa] = useState<number>();
  const [correoEmpresa, setCorreoEmpresa] = useState<string>('');
  const [nombreApellidoDirector, setNombreApellidoDirector] = useState<string>('');

  useEffect(() => {
    getDirectorGeneralById()
      .then((response) => {
        setNombreApellidoDirector(response.data.nombres + ' ' + response.data.apellidos);
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`);
      });
  }, []);

  const navigate = useNavigate();

  const handleCreateCompany = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nombreEmpresa === '' || rncEmpresa === undefined || fechaFundacion === '' || direccionEmpresa === '' || telefonoEmpresa === undefined) {
      toast.error('Llenar los campos requeridos');
    } else if (rncEmpresa.toString().length < 9 || rncEmpresa.toString().length > 13){
      toast.error('El RNC debe tener entre 9 y 13 digitos');
    } else {
      axios.post(`${import.meta.env.VITE_API_URL}/empresas/createCompany`, {
        nombre_empresa: nombreEmpresa,
        rnc_empresa: rncEmpresa,
        logo_empresa: logoEmpresa,
        fecha_fundacion: fechaFundacion,
        direccion_empresa: direccionEmpresa,
        numero_telefonico: telefonoEmpresa,
        correo_empresa: correoEmpresa,
        id_director_general: getIdDirectorGeneral(),
        estado: 'ACTIVO'
      })
        .then((response) => {
          toast.success('Empresa registrada exitosamente');
          toast.success(`Bienvenido a ${response.data.empresa.nombre_empresa}`);
          setTimeout(() => {
            navigate('/home');
          }, 2000);
        })
        .catch((error) => {
          toast.error(`${error.response.data.message}`);
        });
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Obtenemos la ruta relativa del archivo
      const relativePath = file.name;
      setLogoEmpresa(relativePath);
    }
  };

  const gotoLogin = () => {
    navigate('/');
  };

  return (
    <Background> 
      <form onSubmit={handleCreateCompany}>
        <Container fluid>
          <Row className='d-flex justify-content-center align-items-center'>
            <Col col='12'>
              <Card className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '1000px' }}>
                <Card.Body className='p-5 w-100 d-flex flex-column'>
                  <h1 className='text-center mb-4'>Registrar Empresa</h1>

                  <Form.Text
                    className='text-primary mb-4'
                    style={{ cursor: 'pointer', fontSize: '1.3rem'}}
                    onClick={gotoLogin}
                  >
                    <FaAngleLeft/> Volver
                  </Form.Text>

                  <Form.Group className='mb-4 w-100'>
                    <Form.Label><CustomAsterisk/> Nombre de la Empresa</Form.Label>
                    <Form.Control 
                      type='text'
                      size="lg" 
                      onChange={(e) => setNombreEmpresa(e.target.value)} 
                    />
                  </Form.Group>

                  <Form.Group className='mb-4 w-100'>
                    <Form.Label><CustomAsterisk/> RNC de la empresa</Form.Label>
                    <Form.Control 
                      type='number' 
                      size="lg"
                      onChange={(e) => setRncEmpresa(parseInt(e.target.value))}
                    />
                  </Form.Group>

                  <Form.Group className='mb-4 w-100'>
                    <Form.Label>Logo de la Empresa</Form.Label>
                    <Form.Control
                      type="file"
                      name="logo_empresa"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Form.Group>

                  <Form.Group className='mb-4 w-100'>
                    <Form.Label>Fecha fundación de la empresa</Form.Label>
                    <Form.Control 
                      type='date' 
                      size="lg"
                      onChange={(e) => setFechaFundacion(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className='mb-4 w-100'>
                    <Form.Label><CustomAsterisk/> Dirección de la empresa</Form.Label>
                    <Form.Control 
                      type='text' 
                      size="lg"
                      onChange={(e) => setDireccionEmpresa(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className='mb-4 w-100'>
                    <Form.Label><CustomAsterisk/> Número Telefonico de la empresa</Form.Label>
                    <Form.Control 
                      type='number' 
                      size="lg"
                      onChange={(e) => setTelefonoEmpresa(parseInt(e.target.value))}
                    />
                  </Form.Group>

                  <Form.Group className='mb-4 w-100'>
                    <Form.Label>Correo de la empresa</Form.Label>
                    <Form.Control 
                      type='email' 
                      size="lg"
                      onChange={(e) => setCorreoEmpresa(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className='mb-4 w-100'>
                    <Form.Label><CustomAsterisk/> Director de la empresa</Form.Label>
                    <Form.Control 
                      type='email' 
                      size="lg"
                      disabled
                      value={nombreApellidoDirector}
                    />
                  </Form.Group>

                  <Button size='lg' className="mb-2 w-100" type='submit'>
                                        Crear Empresa
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </form>
      <ToastContainer />
    </Background>
  );
}
