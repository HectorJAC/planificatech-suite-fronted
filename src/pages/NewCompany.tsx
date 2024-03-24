import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { 
    Container,
    Row, 
    Col, 
    Card, 
    Form, 
    Button,
    
} from 'react-bootstrap';
import { FaAngleLeft } from "react-icons/fa6";
import { Background } from '../components/Background';
import "react-toastify/dist/ReactToastify.css";

interface SectorEmpresaProps {
    id_sector_empresa: number;
    nombre_sector: string;
}

export const NewCompany = () => {

    const [sectores, setSectores] = useState<SectorEmpresaProps[]>([]);
    const navigate = useNavigate();
    
    // Traer los datos de los sectores de las empresas
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/sector_empresa`)
        .then((response) => {
            setSectores(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
    };

    const gotoLogin = () => {
        navigate('/');
    };

    return (
        <Background style={{height: '100%'}}> 
            <form>
                <Container fluid>
                    <Row className='d-flex justify-content-center align-items-center'>
                        <Col col='12'>
                            <Card className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '1000px' }}>
                                <Card.Body className='p-5 w-100 d-flex flex-column'>
                                    <h1 className='text-center mb-4'>Crear Empresa</h1>

                                    <Form.Text
                                        className='text-primary mb-4'
                                        style={{ cursor: 'pointer' }}
                                        onClick={gotoLogin}
                                    >
                                        <FaAngleLeft/> Volver
                                    </Form.Text>

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
                                        <Form.Label>Seleccionar Sector al que pertenece la Empresa</Form.Label>
                                        <Form.Select size="lg" onChange={handleSelect}>
                                            <option key="default" value="">Seleccione un sector</option>
                                            {
                                                sectores.map((sector) => (
                                                    <option 
                                                        key={sector.id_sector_empresa} 
                                                        value={sector.id_sector_empresa}
                                                    >
                                                        {sector.nombre_sector}
                                                    </option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className='mb-4 w-100'>
                                        <Form.Label>Director de la empresa</Form.Label>
                                        <Form.Control 
                                            type='email' 
                                            size="lg"
                                            disabled
                                            value={`${localStorage.getItem('username')}`}
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
