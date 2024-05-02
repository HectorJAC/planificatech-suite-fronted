import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import { Layout } from "../layout/Layout";
import { CustomAsterisk } from '../components/CustomAsterisk';
import { getImageUrl } from "../components/helpers/getImageUrl";
import { ModalAceptarCancelar } from "../components/ModalAceptarCancelar";

interface CompanyDataProps {
    id_empresa: number;
    nombre_empresa: string;
    rnc_empresa: string;
    logo_empresa: string;
    fecha_fundacion: string;
    direccion_empresa: string;
    numero_telefonico: string;
    correo_empresa: string;
}

export const EditCompanyPage = () => {
    const [companyData, setCompanyData] = useState<CompanyDataProps>({} as CompanyDataProps);
    const [showModalAceptarCancelar, setShowModalAceptarCancelar] = useState(false);

    useEffect(() => {
        const getCompanyData = async () => {
            axios.get(`${import.meta.env.VITE_API_URL}/empresas/findCompanyByDirector`, {
                params: {
                    id_director_general: localStorage.getItem('id')
                }
            })
            .then(response => {
                setCompanyData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        };
        getCompanyData();
    }, []);

    const handleShowModalAceptarCancelar = () => {
        setShowModalAceptarCancelar(true);
    };

    const handleCloseModalAceptarCancelar = () => {
        setShowModalAceptarCancelar(false);
    };

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     setCompanyData({
    //         ...companyData,
    //         [e.target.name]: e.target.value
    //     });
    // };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Obtenemos la ruta relativa del archivo
            const relativePath = file.name;
            setCompanyData(prevState => ({ ...prevState, logo_empresa: relativePath }));
        }
    };

    const handleFormSubmit = async () => {
        if (companyData.nombre_empresa === '' || companyData.rnc_empresa === '' || companyData.direccion_empresa === '' || companyData.numero_telefonico === '') {
            toast.error('Llenar los campos requeridos');
        } else {
            axios.put(`${import.meta.env.VITE_API_URL}/empresas/updateCompany`, {
                id_empresa: companyData.id_empresa,
                nombre_empresa: companyData.nombre_empresa,
                rnc_empresa: companyData.rnc_empresa,
                logo_empresa: companyData.logo_empresa,
                fecha_fundacion: companyData.fecha_fundacion,
                direccion_empresa: companyData.direccion_empresa,
                numero_telefonico: companyData.numero_telefonico,
                correo_empresa: companyData.correo_empresa,
                id_director_general: localStorage.getItem('id'),
            })
            .then((response) => {
                toast.success(`${response.data.message}`);
            })
            .catch((error) => {
                console.log(error);
            });

            // Cerrar el modal
            setShowModalAceptarCancelar(false);

            // Volver a cargar los datos de la empresa
            axios.get(`${import.meta.env.VITE_API_URL}/empresas/findCompanyByDirector`, {
                params: {
                    id_director_general: localStorage.getItem('id')
                }
            })
            .then(response => {
                setCompanyData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        }
    };

    return (
        <Layout>
            <Container>
                <h1>Editar empresa</h1>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label><CustomAsterisk /> Nombre de la empresa</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre_empresa"
                                    value={companyData.nombre_empresa}
                                    onChange={(e) => setCompanyData(prevState => ({ ...prevState, nombre_empresa: e.target.value }))}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label><CustomAsterisk /> RNC de la empresa</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="rnc_empresa"
                                    value={companyData.rnc_empresa}
                                    onChange={(e) => setCompanyData(prevState => ({ ...prevState, rnc_empresa: e.target.value }))}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label className="mt-3">Logo de la Empresa</Form.Label>
                                {
                                    companyData?.logo_empresa ? (
                                        <div>
                                            <Image 
                                            src={getImageUrl(companyData.logo_empresa)} 
                                            alt="Logo de la empresa" 
                                            fluid
                                            className="mb-2"
                                            />
                                            <Form.Control
                                                type="file"
                                                name="logo_empresa"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    ) : (
                                        <Form.Control
                                            type="file"
                                            name="logo_empresa"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    )
                                }
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label className="mt-3">Fecha de fundación</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="fecha_fundacion"
                                    value={companyData.fecha_fundacion}
                                    onChange={(e) => setCompanyData(prevState => ({ ...prevState, fecha_fundacion: e.target.value }))}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label className="mt-3"><CustomAsterisk /> Dirección de la empresa</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="direccion_empresa"
                                    value={companyData.direccion_empresa}
                                    onChange={(e) => setCompanyData(prevState => ({ ...prevState, direccion_empresa: e.target.value }))}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label className="mt-3"><CustomAsterisk /> Número telefónico</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="numero_telefonico"
                                    value={companyData.numero_telefonico}
                                    onChange={(e) => setCompanyData(prevState => ({ ...prevState, numero_telefonico: e.target.value }))}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label className="mt-3">Correo electrónico</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="correo_empresa"
                                    value={companyData.correo_empresa}
                                    onChange={(e) => setCompanyData(prevState => ({ ...prevState, correo_empresa: e.target.value }))}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    name="id_empresa"
                                    value={companyData.id_empresa}
                                    hidden
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button onClick={handleShowModalAceptarCancelar} className="mb-3">Guardar cambios</Button>
                </Form>

                <ModalAceptarCancelar 
                    show={showModalAceptarCancelar} 
                    onHide={handleCloseModalAceptarCancelar} 
                    onAceptar={handleFormSubmit} 
                    titulo="Guardar Cambios" 
                    mensaje="¿Estás seguro de guardar los cambios realizados?"
                />
            </Container>
            <ToastContainer />
        </Layout>
    );
};