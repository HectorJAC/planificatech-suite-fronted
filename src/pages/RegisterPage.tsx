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

interface EmpresaProps {
    id_empresa: number;
    nombre_empresa: string;
}

export const RegisterPage = () => {

    const [usuario, setUsuario] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [nombre, setNombre] = useState<string>('');
    const [apellidos, setApellido] = useState<string>('');
    const [cedula, setCedula] = useState<number>();
    const [fechaNacimiento, setFechaNacimiento] = useState<string>();
    const [sexo, setSexo] = useState<string>('');
    const [lugarNacimiento, setLugarNacimiento] = useState<string>('');
    const [direccionResidencia, setDireccionResidencia] = useState<string>('');
    const [estadoCivil, setEstadoCivil] = useState<string>('');
    const [nivelAcademico, setNivelAcademico] = useState<string>('');
    const [numeroTelefonico, setNumeroTelefonico] = useState<number>();
    const [correoElectronico, setCorreoElectronico] = useState<string>('');
    const [puesto, setPuesto] = useState<string>('');
    const [empresa, setEmpresa] = useState<EmpresaProps[]>([]);

    const navigate = useNavigate();

    const handleSelectPuestoEmpresa = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPuesto(e.target.value);
        if (e.target.value === 'directorGeneral') {
            return null;
        } else if (e.target.value === 'gerente') {
            axios.get(`${import.meta.env.VITE_API_URL}/empresas/findAllCompany`)
            .then((response) => {
                setEmpresa(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                toast.error(`${error.response.data.message}`);
            });
        }
    };

    const handleSelectEmpresa = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const company = empresa.find((empresa) => empresa.id_empresa === parseInt(e.target.value));
        if (company) {
            setEmpresa([company]);
        }
    };

    const handleCreateCompany = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (usuario === '' || password === '' || nombre === '' || apellidos === '' || cedula === undefined || sexo === '' || numeroTelefonico === undefined) {
            toast.error('Llenar los campos requeridos');
        } else if (cedula.toString().length < 11 || cedula.toString().length > 11){
            toast.error('La cedula debe tener 11 digitos');
        } else if (puesto === 'directorGeneral') {
            axios.post(`${import.meta.env.VITE_API_URL}/director_general/createDirectorGeneral`, {
                username: usuario,
                password: password,
                nombres: nombre,
                apellidos: apellidos,
                cedula: cedula,
                fecha_nacimiento: fechaNacimiento,
                sexo: sexo,
                lugar_nacimiento: lugarNacimiento,
                direccion_residencia: direccionResidencia,
                estado_civil: estadoCivil,
                nivel_academico: nivelAcademico,
                numero_telefonico: numeroTelefonico,
                correo: correoElectronico,
                estado: 'ACTIVO'
            })
            .then((response) => {
                toast.success(`${response.data.message}`);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            })
            .catch((error) => {
                toast.error(`${error.response.data.message}`);
            });
        } else if (puesto === 'gerente') {
            console.log('Crear Gerente');
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

                            <Col md={4} className='mb-3'>
                                <Form.Text
                                    className='text-primary'
                                    style={{ cursor: 'pointer', fontSize: '1.3rem'}}
                                    onClick={gotoLogin}
                                >
                                    <FaAngleLeft/> Volver
                                </Form.Text>
                            </Col>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className='mb-4'>
                                        <Form.Label><CustomAsterisk/> Usuario</Form.Label>
                                        <Form.Control 
                                            type='text'
                                            value={usuario}
                                            onChange={(e) => setUsuario(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label><CustomAsterisk/> Nombres</Form.Label>
                                        <Form.Control 
                                            type='text'
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label><CustomAsterisk/> Cedula</Form.Label>
                                        <Form.Control 
                                            type='number'
                                            value={cedula}
                                            onChange={(e) => setCedula(Number(e.target.value))} 
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label>Sexo</Form.Label>
                                        <Form.Select
                                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSexo(e.target.value)}
                                        >
                                            <option value="">--Seleccione una opcion--</option>
                                            <option value="masculino">Masculino</option>
                                            <option value="femenino">Femenino</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label>Direccion de Residencia</Form.Label>
                                        <Form.Control 
                                            type='text'
                                            value={direccionResidencia}
                                            onChange={(e) => setDireccionResidencia(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label><CustomAsterisk/> Numero Telefonico</Form.Label>
                                        <Form.Control 
                                            type='number'
                                            value={numeroTelefonico}
                                            onChange={(e) => setNumeroTelefonico(Number(e.target.value))} 
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label>Correo Electronico</Form.Label>
                                        <Form.Control 
                                            type='text'
                                            value={correoElectronico}
                                            onChange={(e) => setCorreoElectronico(e.target.value)} 
                                        />
                                    </Form.Group>

                                        {
                                            puesto === 'gerente' && (
                                                <Form.Group className='mb-4'>
                                                    <Form.Label>Empresa</Form.Label>
                                                    <Form.Select
                                                        onChange={handleSelectEmpresa}
                                                    >
                                                        <option value="">--Seleccione una opcion--</option>
                                                        {
                                                            empresa.map((empresa) => (
                                                                <option 
                                                                    key={empresa.id_empresa} 
                                                                    value={empresa.id_empresa}
                                                                >
                                                                    {empresa.nombre_empresa}
                                                                </option>
                                                            ))
                                                        }
                                                    </Form.Select>
                                                </Form.Group>
                                            )
                                        }
                                    
                                </Col>

                                <Col md={6}>
                                    <Form.Group className='mb-4'>
                                        <Form.Label><CustomAsterisk/> Contraseña</Form.Label>
                                        <Form.Control 
                                            type='password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} 
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className='mb-4'>
                                        <Form.Label><CustomAsterisk/> Apellidos</Form.Label>
                                        <Form.Control 
                                            type='text'
                                            value={apellidos}
                                            onChange={(e) => setApellido(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label>Fecha de Nacimiento</Form.Label>
                                        <Form.Control 
                                            type='date'
                                            value={fechaNacimiento}
                                            onChange={(e) => setFechaNacimiento(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label>Lugar de Nacimiento</Form.Label>
                                        <Form.Control 
                                            type='text'
                                            value={lugarNacimiento}
                                            onChange={(e) => setLugarNacimiento(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label>Estado Civil</Form.Label>
                                        <Form.Select
                                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setEstadoCivil(e.target.value)}
                                        >
                                            <option value="">--Seleccione una opcion--</option>
                                            <option value="Soltero(a)">Soltero(a)</option>
                                            <option value="Casado(a)">Casado(a)</option>
                                            <option value="Viudo(a)">Viudo(a)</option>
                                            <option value="Union Libre">Unión Libre</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label>Nivel Academico</Form.Label>
                                        <Form.Select
                                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setNivelAcademico(e.target.value)}
                                        >
                                            <option value="">--Seleccione una opcion--</option>
                                            <option value="Primario">Primario</option>
                                            <option value="Secundario">Secundario(Bachillerato)</option>
                                            <option value="Universitario">Universitario</option>
                                            <option value="Profesional">Profesional</option>
                                            <option value="Diplomado">Diplomado</option>
                                            <option value="Certificacion">Certificación</option>
                                            <option value="Maestria">Maestría</option>
                                            <option value="Doctorado">Doctorado</option>
                                            <option value="Postgrado">Postgrado</option>
                                            <option value="Tecnico">Técnico</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label><CustomAsterisk/> Puesto en la empresa</Form.Label>
                                        <Form.Select
                                            onChange={handleSelectPuestoEmpresa}
                                        >
                                            <option value="">--Seleccione una opcion--</option>
                                            <option value="directorGeneral">Director General</option>
                                            <option value="gerente">Gerente</option>
                                        </Form.Select>
                                    </Form.Group>

                                    {
                                            puesto === 'gerente' && (
                                                <Form.Group className='mb-4'>
                                                    <Form.Label>Departamento</Form.Label>
                                                    <Form.Select>
                                                        <option value="">--Seleccione una opcion--</option>
                                                        <option value="administracion">Administracion</option>
                                                        <option value="contabilidad">Contabilidad</option>
                                                        <option value="finanzas">Finanzas</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            )
                                        }

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
