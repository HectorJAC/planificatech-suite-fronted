import { useState } from 'react';
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
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
    
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_API_URL}/login`, {
            username: username,
            password: password
        })
        .then(response => {
            toast.success(`${response.data.message}`);
        })
        .catch(error => {
            toast.error(`${error.response.data.message}`);
        });
    };        

    return (
        <div style={{backgroundColor: '#3931d4'}}> 
            <form onSubmit={handleLogin}>
                <Container fluid>
                    <Row className='d-flex justify-content-center align-items-center h-100'>
                        <Col col='12'>
                            <Card className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                                <Card.Body className='p-5 w-100 d-flex flex-column'>
                                    <img 
                                        src="/public/logo.png" 
                                        alt="PlanificaTech" 
                                        className="img-fluid" 
                                        style={{ height: '250px', width: '400px' }}
                                    />

                                    <Form.Group className='mb-4 w-100'>
                                        <Form.Label>Usuario</Form.Label>
                                        <Form.Control type='text' size="lg" onChange={(e) => setUsername(e.target.value)}/>
                                    </Form.Group>

                                    <Form.Group className='mb-4 w-100'>
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control type='password' size="lg" onChange={(e) => setPassword(e.target.value)}/>
                                    </Form.Group>

                                    <Button size='lg' className="mb-4 w-100" type='submit'>
                                        Iniciar Sesión
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </form>
            <ToastContainer />
        </div>
    );
}
