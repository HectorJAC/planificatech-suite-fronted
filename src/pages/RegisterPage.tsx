import { useState, ChangeEvent } from 'react';
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


export const RegisterPage = () => {

    const [nombreEmpresa, setNombreEmpresa] = useState<string>('');
    const [rncEmpresa, setRncEmpresa] = useState<number>();
    const [logoEmpresa, setLogoEmpresa] = useState<string>('');
    const [fechaFundacion, setFechaFundacion] = useState<string>('');
    const [direccionEmpresa, setDireccionEmpresa] = useState<string>('');
    const [telefonoEmpresa, setTelefonoEmpresa] = useState<number>();
    const [correoEmpresa, setCorreoEmpresa] = useState<string>('');

    const navigate = useNavigate();

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const sector = sectores.find((sector) => sector.id_sector_empresa === parseInt(e.target.value));
        if (sector) {
            setSectores([sector]);
        }
    };

    const handleCreateCompany = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (nombreEmpresa === '' || rncEmpresa === undefined || fechaFundacion === '' || direccionEmpresa === '' || telefonoEmpresa === undefined || correoEmpresa === '') {
            toast.error('Todos los campos son requeridos');
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
                id_sector: sectores[0].id_sector_empresa,
                id_director_general: localStorage.getItem('id'),
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

    const gotoLogin = () => {
        navigate('/');
    };

    return (
        <Background> 
            <form onSubmit={handleCreateCompany}>
                <Container fluid>
                    <Card className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '1000px' }}>
                        <Card.Body className='p-5 d-flex flex-column'>
                            <h1 className='text-center mb-4'>Registrar Usuario</h1>

                            <Form.Text
                                className='text-primary mb-4'
                                style={{ cursor: 'pointer', fontSize: '1.3rem'}}
                                onClick={gotoLogin}
                            >
                                <FaAngleLeft/> Volver
                            </Form.Text>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className='mb-4'>
                                        <Form.Label><CustomAsterisk/> Usuario</Form.Label>
                                        <Form.Control 
                                            type='text'
                                            onChange={(e) => setNombreEmpresa(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label><CustomAsterisk/> Nombres</Form.Label>
                                        <Form.Control 
                                            type='text'
                                            onChange={(e) => setNombreEmpresa(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label><CustomAsterisk/> Cedula</Form.Label>
                                        <Form.Control 
                                            type='text'
                                            onChange={(e) => setNombreEmpresa(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label><CustomAsterisk/> Sexo</Form.Label>
                                        <Form.Control 
                                            type='text'
                                            onChange={(e) => setNombreEmpresa(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label><CustomAsterisk/> Direccion de Residencia</Form.Label>
                                        <Form.Control 
                                            type='text'
                                            onChange={(e) => setNombreEmpresa(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label><CustomAsterisk/> Numero Telefonico</Form.Label>
                                        <Form.Control 
                                            type='text'
                                            onChange={(e) => setNombreEmpresa(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label><CustomAsterisk/> Correo Electronico</Form.Label>
                                        <Form.Control 
                                            type='text'
                                            onChange={(e) => setNombreEmpresa(e.target.value)} 
                                        />
                                    </Form.Group>

                                </Col>

                                <Col md={6}>
                                    <Form.Group className='mb-4'>
                                        <Form.Label><CustomAsterisk/> Contraseña</Form.Label>
                                        <Form.Control 
                                            type='text'
                                            onChange={(e) => setNombreEmpresa(e.target.value)} 
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className='mb-4'>
                                        <Form.Label><CustomAsterisk/> Apellidos</Form.Label>
                                        <Form.Control 
                                            type='text'
                                            onChange={(e) => setNombreEmpresa(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label><CustomAsterisk/> Fecha de Nacimiento</Form.Label>
                                        <Form.Control 
                                            type='text'
                                            onChange={(e) => setNombreEmpresa(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label><CustomAsterisk/> Lugar de Nacimiento</Form.Label>
                                        <Form.Control 
                                            type='text'
                                            onChange={(e) => setNombreEmpresa(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label><CustomAsterisk/> Estado Civil</Form.Label>
                                        <Form.Control 
                                            type='text'
                                            onChange={(e) => setNombreEmpresa(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label><CustomAsterisk/> Nivel Academico</Form.Label>
                                        <Form.Control 
                                            type='text'
                                            onChange={(e) => setNombreEmpresa(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label><CustomAsterisk/> Director General o Gerente</Form.Label>
                                        <Form.Control 
                                            type='text'
                                            onChange={(e) => setNombreEmpresa(e.target.value)} 
                                        />
                                    </Form.Group>

                                </Col>
                            </Row>

                            <Button size='lg' className="mb-2 w-100" type='submit'>
                                Crear Usuario
                            </Button>
                        </Card.Body>
                    </Card>
                </Container>
            </form>
            <ToastContainer />
        </Background>
    );
}
