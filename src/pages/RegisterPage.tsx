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

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [tipoUsuario, setTipoUsuario] = useState<string>('');
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
    const [empresa, setEmpresa] = useState<EmpresaProps[]>([]);
    const [fechaIngresoEmpresa, setFechaIngresoEmpresa] = useState<string>();

    const navigate = useNavigate();

    const handleSelectTipoUsuario = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTipoUsuario(e.target.value);
        if (e.target.value === '1') {
            return null;
        } else if (e.target.value === '2') {
            axios.get(`${import.meta.env.VITE_API_URL}/empresas/findAllCompany`)
            .then((response) => {
                setEmpresa(response.data);
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

    const handleCreateUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            toast.error('Las contraseñas no coinciden');
        } else if (tipoUsuario === '1') {
            if (username === '' || password === '' || repeatPassword === '' || nombre === '' || apellidos === '' || cedula === undefined || sexo === '' || numeroTelefonico === undefined) {
                toast.error('Llenar los campos requeridos');
            } else {
                axios.post(`${import.meta.env.VITE_API_URL}/usuarios/createUser`, {
                    username: username,
                    password: password,
                    tipo_usuario: tipoUsuario
                })
                .then(response => {
                    localStorage.setItem('id_usuario', response.data.usuario.id_usuario);
                    toast.success('Usuario y Contraseña guardados exitosamente');

                    axios.post(`${import.meta.env.VITE_API_URL}/director_general/createDirectorGeneral`, {
                        id_usuario: localStorage.getItem('id_usuario'),
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
                })
                .catch(error => {
                    toast.error(`${error.response.data.message}`);
                });
            }
        } else if (tipoUsuario === '2') {
            if (username === '' || password === '' || repeatPassword === '' || nombre === '' || apellidos === '' || cedula === undefined || sexo === '' || numeroTelefonico === undefined || empresa[0].id_empresa === undefined) {
                toast.error('Llenar los campos requeridos');
            } else {
                axios.post(`${import.meta.env.VITE_API_URL}/usuarios/createUser`, {
                    username: username,
                    password: password,
                    tipo_usuario: tipoUsuario
                })
                .then(response => {
                    localStorage.setItem('id_usuario', response.data.usuario.id_usuario);
                    toast.success('Usuario y Contraseña guardados exitosamente');

                    axios.post(`${import.meta.env.VITE_API_URL}/gerentes/createGerente`, {
                        id_usuario: localStorage.getItem('id_usuario'),
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
                        id_empresa: empresa[0].id_empresa,
                        fecha_ingreso_empresa: fechaIngresoEmpresa,
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
                })
                .catch(error => {
                    toast.error(`${error.response.data.message}`);
                });
            }
        } else {
            toast.error('Debe llenar el Tipo de Usuario');
        }
    };

    const gotoLogin = () => {
        navigate('/');
    };

    return (
        <Background> 
            <form onSubmit={handleCreateUser}>
                <Container fluid>
                    <Card className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '1000px' }}>
                        <Card.Body className='p-5 d-flex flex-column'>
                            <h1 className='text-center mb-4'>
                                Crear Usuario
                            </h1>

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
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label><CustomAsterisk/> Repita la Contraseña</Form.Label>
                                        <Form.Control 
                                            type='password'
                                            value={repeatPassword}
                                            onChange={(e) => setRepeatPassword(e.target.value)} 
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
                                        <Form.Label><CustomAsterisk/> Sexo</Form.Label>
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
                                        tipoUsuario === '2' && (
                                            <Form.Group className='mb-4'>
                                                <Form.Label><CustomAsterisk/> Fecha de Ingreso a la Empresa</Form.Label>
                                                <Form.Control 
                                                    type='date'
                                                    value={fechaIngresoEmpresa}
                                                    onChange={(e) => setFechaIngresoEmpresa(e.target.value)} 
                                                />
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
                                        <Form.Label><CustomAsterisk/> Seleccione el Tipo de Usuario</Form.Label>
                                        <Form.Select
                                            onChange={handleSelectTipoUsuario}
                                        >
                                            <option value="">--Seleccione una opcion--</option>
                                            <option value="1">Director General</option>
                                            <option value="2">Gerente</option>
                                        </Form.Select>
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

                                    {
                                        tipoUsuario === '2' && (
                                            <Form.Group className='mb-4'>
                                                <Form.Label><CustomAsterisk/> Empresa</Form.Label>
                                                <Form.Select
                                                    onChange={handleSelectEmpresa}
                                                    value={empresa[0]?.id_empresa}
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
