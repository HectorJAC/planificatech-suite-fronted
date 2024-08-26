import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { 
  Container,
  Row, 
  Col, 
  Card, 
  Form, 
  Button
} from 'react-bootstrap';
import { Background } from '../components/Background';
import { CustomAsterisk } from '../components/CustomAsterisk';
import "react-toastify/dist/ReactToastify.css";
import { planificaTechApi } from '../api/baseApi';
import { getIdDirectorGeneral } from '../helpers/getLocalStorageData';
import { useCompanyStore } from '../store/companyStore';

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { onSetCompany } = useCompanyStore();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === '' || password === '') {
      toast.error('Todos los campos son requeridos');
    } else {
      axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        username: username,
        password: password
      })
        .then((response) => {
          localStorage.setItem('accesToken', response.data.accessToken);
          localStorage.setItem('username', response.data.username);
          localStorage.setItem('id_usuario', response.data.id_usuario);

          if (response.data.tipo_usuario === '1') {
            axios.get(`${import.meta.env.VITE_API_URL}/director_general/getDirectorGeneralByUserId`, {
              params: {
                id_usuario: response.data.id_usuario
              }
            })
              .then((response) => {
                localStorage.setItem('id', response.data.id_director_general);
    
                // Revisar si el director general tiene una empresa creada
                planificaTechApi.get('empresas/findCompanyByDirector', {
                  params: {
                    id_director_general: getIdDirectorGeneral()
                  }
                })
                  .then((response) => {
                    toast.success(`Bienvenido a ${response.data.nombre_empresa}`);
                    setTimeout(() => {
                      navigate('/');
                    }, 2000);
                    onSetCompany({ ...response.data });
                  })
                  .catch((error) => {
                    toast.info(`${error.response.data.message}`);
                    setTimeout(() => {
                      navigate('/new_company');
                    }, 2000);
                  });
              })
              .catch((error) => {
                toast.error(`${error.response.data.message}`);
              });
          } else if (response.data.tipo_usuario === '2') {
            axios.get(`${import.meta.env.VITE_API_URL}/gerentes/getGerenteByUserId`, {
              params: {
                id_usuario: localStorage.getItem('id_usuario')
              }
            })
              .then((response) => {
                localStorage.setItem('id', response.data.id_gerente);
                        
                // Revisar si el gerente pertenece a una empresa
                planificaTechApi.get('gerentes/getEmpresaByGerenteId', {
                  params: {
                    id_gerente: localStorage.getItem('id')
                  }
                })
                  .then((response) => {
                    toast.success(`Bienvenido a ${response.data.nombre_empresa}`);
                    setTimeout(() => {
                      navigate('/');
                    }, 2000);
                    onSetCompany({ ...response.data });
                  })
                  .catch((error) => {
                    toast.info(`${error.response.data.message}`);
                    setTimeout(() => {
                      navigate('/login');
                    }, 2000);
                  });
              })
              .catch((error) => {
                toast.error(`${error.response.data.message}`);
              });
          }
        })
        .catch((error) => {
          toast.error(`${error.response.data.message}`);
        });
    }
  };  
    
  const gotoForgetPassword = () => {
    navigate('/forget_password');
  };

  const gotoRegisterUser = () => {
    navigate('/register');
  };

  return (
    <Background> 
      <form onSubmit={handleLogin}>
        <Container fluid>
          <Row className='d-flex justify-content-center align-items-center'>
            <Col col='12'>
              <Card className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '480px' }}>
                <Card.Body className='p-5 w-100 d-flex flex-column'>
                  <img 
                    src="/logo.png" 
                    alt="PlanificaTech" 
                    className="img-fluid" 
                    style={{ height: '250px', width: '400px' }}
                  />

                  <Form.Group className='mb-4 w-100'>
                    <Form.Label><CustomAsterisk/> Usuario</Form.Label>
                    <Form.Control 
                      type='text' 
                      size="lg"  
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className='mb-4 w-100'>
                    <Form.Label><CustomAsterisk/> Contraseña</Form.Label>
                    <Form.Control 
                      type='password' 
                      size="lg"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button size='lg' className="mb-2 w-100" type='submit'>
                    Iniciar Sesión
                  </Button>

                  <Form.Text
                    className='text-center text-primary mb-3'
                    style={{ cursor: 'pointer' }}
                    onClick={gotoForgetPassword}
                  >
                    ¿Ha olvidado su contraseña?
                  </Form.Text>

                  <Form.Text
                    className='text-center text-primary'
                    style={{ cursor: 'pointer' }}
                    onClick={gotoRegisterUser}
                  >
                    ¿No tienes un usuario?, Crea uno
                  </Form.Text>
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
