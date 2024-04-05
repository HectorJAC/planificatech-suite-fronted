import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import { Layout } from "../layout/Layout";
import { CustomAsterisk } from '../components/CustomAsterisk';

interface CompanyDataProps {
    id_empresa: number;
    nombre_empresa: string;
    rnc_empresa: string;
    logo_empresa: string;
    fecha_fundacion: string;
    direccion_empresa: string;
    numero_telefonico: string;
    correo_empresa: string;
    id_sector: number;
}

interface SectorEmpresaProps {
    id_sector_empresa: number;
    nombre_sector: string;
}

export const EditCompanyPage = () => {
    const [companyData, setCompanyData] = useState<CompanyDataProps>({} as CompanyDataProps);
    const [sectores, setSectores] = useState<SectorEmpresaProps[]>([]);

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

        const getSectors = async () => {
            axios.get(`${import.meta.env.VITE_API_URL}/sector_empresa`)
            .then((response) => {
                setSectores(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        };

        getCompanyData();
        getSectors();
    }, []);

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const sector = sectores.find((sector) => sector.id_sector_empresa === parseInt(e.target.value));
        if (sector) {
            setSectores([sector]);
        }
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

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (companyData.nombre_empresa === '' || companyData.rnc_empresa === '' || companyData.direccion_empresa === '' || companyData.numero_telefonico === '' || companyData.id_sector === 0) {
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
                id_sector: companyData.id_sector
            })
            .then((response) => {
                toast.success(`${response.data.message}`);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    };

    return (
        <Layout>
            <Container>
                <h1>Editar empresa</h1>
                <Form onSubmit={handleFormSubmit}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>ID de la empresa</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="id_empresa"
                                    value={companyData.id_empresa}
                                    disabled
                                />
                            </Form.Group>
                        </Col>
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
                                <Form.Label>Logo de la Empresa</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="logo_empresa"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Fecha de fundación</Form.Label>
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
                                <Form.Label><CustomAsterisk /> Dirección de la empresa</Form.Label>
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
                                <Form.Label><CustomAsterisk /> Número telefónico</Form.Label>
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
                                <Form.Label>Correo electrónico</Form.Label>
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
                        <Col md={6}>
                            <Form.Group className='mb-4 w-100'>
                                <Form.Label><CustomAsterisk/> Seleccionar Sector al que pertenece la Empresa</Form.Label>
                                <Form.Select onChange={handleSelect} value={companyData.id_sector}>
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
                        </Col>
                    </Row>
                    <Button type="submit">Guardar cambios</Button>
                </Form>
            </Container>
            <ToastContainer />
        </Layout>
    );
};