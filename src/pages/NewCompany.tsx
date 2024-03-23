//import { useState } from 'react';
//import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
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

export const NewCompany = () => {
    
    // const [username, setUsername] = useState<string>('');
    // const [password, setPassword] = useState<string>('');

    // const navigate = useNavigate();

    // const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     if (username === '' || password === '') {
    //         toast.error('Todos los campos son requeridos');
    //     } else {
    //         axios.post(`${import.meta.env.VITE_API_URL}/login`, {
    //             username: username,
    //             password: password
    //         })
    //         .then(response => {
    //             navigate('/home');
    //             localStorage.setItem('accesToken', response.data.accessToken);
    //         })
    //         .catch(error => {
    //             toast.error(`${error.response.data.message}`);
    //         });
    //     }
    // };  

    return (
        <Background style={{height: '100%'}}> 
            <form>
                <Container fluid>
                    <Row className='d-flex justify-content-center align-items-center'>
                        <Col col='12'>
                            <Card className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '1000px' }}>
                                <Card.Body className='p-5 w-100 d-flex flex-column'>
                                    <h1 className='text-center mb-4'>Crear Empresa</h1>
                                    <Form.Group className='mb-4 w-100'>
                                        <Form.Label>Nombre de la Empresa</Form.Label>
                                        <Form.Control 
                                            type='text'
                                            size="lg"  
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4 w-100'>
                                        <Form.Label>RNC de la empresa</Form.Label>
                                        <Form.Control 
                                            type='number' 
                                            size="lg"
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4 w-100'>
                                        <Form.Label>Fecha fundación de la empresa</Form.Label>
                                        <Form.Control 
                                            type='date' 
                                            size="lg"
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4 w-100'>
                                        <Form.Label>Dirección de la empresa</Form.Label>
                                        <Form.Control 
                                            type='text' 
                                            size="lg"
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4 w-100'>
                                        <Form.Label>Número Telefonico de la empresa</Form.Label>
                                        <Form.Control 
                                            type='number' 
                                            size="lg"
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4 w-100'>
                                        <Form.Label>Correo de la empresa</Form.Label>
                                        <Form.Control 
                                            type='email' 
                                            size="lg"
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4 w-100'>
                                        <Form.Label>Sector a la que pertenece la empresa</Form.Label>
                                        <Form.Select
                                            size="lg"
                                        >
                                            <option>Seleccione el sector</option>
                                            <option value="1">Tecnología</option>
                                            <option value="2">Educación</option>
                                            <option value="3">Salud</option>
                                            <option value="4">Finanzas</option>
                                            <option value="5">Turismo</option>
                                        </Form.Select>
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
