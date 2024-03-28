import { useEffect, useState } from 'react';
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

interface SectorEmpresaProps {
    id_sector_empresa: number;
    nombre_sector: string;
}

export const NewCompany = () => {

    const [nombreEmpresa, setNombreEmpresa] = useState<string>('');
    const [rncEmpresa, setRncEmpresa] = useState<number>();
    const [fechaFundacion, setFechaFundacion] = useState<string>('');
    const [direccionEmpresa, setDireccionEmpresa] = useState<string>('');
    const [telefonoEmpresa, setTelefonoEmpresa] = useState<number>();
    const [correoEmpresa, setCorreoEmpresa] = useState<string>('');
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
                    <Row className='d-flex justify-content-center align-items-center'>
                        <Col col='12'>
                            <Card className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '1000px' }}>
                                <Card.Body className='p-5 w-100 d-flex flex-column'>
                                    <h1 className='text-center mb-4'>Registrar Empresa</h1>

                                    <Form.Text
                                        className='text-primary mb-4'
                                        style={{ cursor: 'pointer' }}
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
                                        <Form.Label><CustomAsterisk/> Seleccionar Sector al que pertenece la Empresa</Form.Label>
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
                                        <Form.Label><CustomAsterisk/> Director de la empresa</Form.Label>
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
