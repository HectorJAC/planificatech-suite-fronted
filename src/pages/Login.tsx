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
    Button,
    
} from 'react-bootstrap';
import { Background } from '../components/Background';
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
    
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (username === '' || password === '') {
            toast.error('Todos los campos son requeridos');
        } else {
            axios.post(`${import.meta.env.VITE_API_URL}/login`, {
                username: username,
                password: password
            })
            .then(response => {
                navigate('/home');
                localStorage.setItem('accesToken', response.data.accessToken);
            })
            .catch(error => {
                toast.error(`${error.response.data.message}`);
            });
        }
    };  
    
    const gotoForgetPassword = () => {
        navigate('/forget_password');
    };

    return (
        <Background style={{height: '100vh'}}> 
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
                                        <Form.Label>Usuario</Form.Label>
                                        <Form.Control 
                                            type='text' 
                                            size="lg"  
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4 w-100'>
                                        <Form.Label>Contraseña</Form.Label>
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
                                        className='text-center text-primary'
                                        style={{ cursor: 'pointer' }}
                                        onClick={gotoForgetPassword}
                                    >
                                        ¿Ha olvidado su contraseña?
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
