import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { Layout } from "../layout/Layout";
import { useEffect, useState } from "react";
import { findCompanyByDirector } from "../api/empresas/findCompanyByDirector";
import { CompanyProps } from "../interfaces/companyInteface";
import axios from "axios";
import { DepartmentProps } from "../interfaces/departmentInterface";
import { toast, ToastContainer } from "react-toastify";
import { CustomAsterisk } from "../components/CustomAsterisk";
import { GerentesProps } from "../interfaces/gerenteInterface";

export const CreateDepartmentPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [companyData, setCompanyData] = useState<CompanyProps>();
    const [departments, setDepartments] = useState<DepartmentProps[]>([]);
    const [searchResults, setSearchResults] = useState<DepartmentProps[]>([]);
    const [searchDepartment, setSearchDepartment] = useState('');
    const [departmentData, setDepartmentData] = useState({} as DepartmentProps);
    const [gerentes, setGerentes] = useState<GerentesProps[]>([]);

    useEffect(() => {
        findCompanyByDirector()
            .then((response) => {
                setCompanyData(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/departamentos/getDepartamentos`, {
            params: {
                id_empresa: companyData?.id_empresa
            }
        })
        .then((response) => {
            setDepartments(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [companyData?.id_empresa]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/gerentes/getGerentesByCompany`, {
            params: {
                id_empresa: companyData?.id_empresa
            }
        })
        .then((response) => {
            setGerentes(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [showModal, companyData?.id_empresa]);

    const handleSearchDepartment = () => {
        const results = departments.filter(department => department.nombre_departamento?.toLowerCase().includes(searchDepartment.toLowerCase()));
        if (results.length > 0) {
            setSearchResults(results);
        } else {
            toast.error('No se encontraron resultados');
        }
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleSelectGerente = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const manager = gerentes.find((gerente) => gerente.id_gerente === parseInt(e.target.value));
        if (manager) {
            setGerentes([manager]);
        }
    };

    return (
        <Layout>
            <Container>
                <Row>
                    <Col>
                        <h1 className="mt-3 mb-4">
                            Crear Departamentos
                        </h1>
                    </Col>
                </Row>

                <Row>
                    <Col md={3}>
                        <Button 
                            variant="primary" 
                            style={{
                                marginBottom: '20px',
                                marginLeft: '20px'
                            }}
                            onClick={handleShowModal}
                        >
                            Nuevo Departamento
                        </Button>
                    </Col>

                    <Col md={9}>
                        <div className="input-group">
                            <Form.Control 
                                type="text" 
                                placeholder="Buscar Departamento" 
                                value={searchDepartment}
                                onChange={(e) => setSearchDepartment(e.target.value)}
                            />
                            <Button 
                                variant="primary" 
                                onClick={handleSearchDepartment}
                            >
                                Buscar
                            </Button>
                        </div>
                    </Col>
                </Row>

                {/* <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check 
                                    type="checkbox" 
                                    label="Puestos Inactivos"
                                    checked={isCheckboxChecked}
                                    onChange={
                                        () => {
                                            setIsCheckboxChecked(!isCheckboxChecked);
                                            handlePuestosInactivos();
                                        }
                                    }
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row> */}

                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Departamento</th>
                                    <th>Descripción</th>
                                    <th>Presupuesto</th>
                                    <th>Gerente</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.length > 0 ? (
                                    searchResults.map((department, index) => (
                                        <tr key={index}>
                                            <td>{department.id_departamento}</td>
                                            <td>{department.nombre_departamento}</td>
                                            <td>{department.nombre_departamento}</td>
                                            <td>{department.id_gerente}</td>
                                            <td>{department.estado}</td>
                                        </tr>
                                    ))
                                ) : (
                                    departments.map((department, index) => (
                                        <tr key={index}>
                                            <td>{department.id_departamento}</td>
                                            <td>{department.nombre_departamento}</td>
                                            <td>{department.nombre_departamento}</td>
                                            <td>{department.id_gerente}</td>
                                            <td>{department.estado}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Crear Departamento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label><CustomAsterisk/> Nombre Departamento</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Nombre del departamento" 
                                    value={departmentData.nombre_departamento}
                                    onChange={(e) => setDepartmentData({...departmentData, nombre_departamento: e.target.value})}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label><CustomAsterisk/> Descripción Departamento</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={3} 
                                    placeholder="Descripción del departamento" 
                                    value={departmentData.descripcion_departamento}
                                    onChange={(e) => setDepartmentData({...departmentData, descripcion_departamento: e.target.value})}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label><CustomAsterisk/> Presupuesto Asignado</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="Presupuesto asignado al departamento" 
                                    value={departmentData.presupuesto_asignado}
                                    onChange={(e) => setDepartmentData({...departmentData, presupuesto_asignado: Number(e.target.value)})}
                                />
                            </Form.Group>

                            <Form.Group className='mb-4'>
                                <Form.Label><CustomAsterisk/> Gerente del departamento</Form.Label>
                                <Form.Select
                                    onChange={handleSelectGerente}
                                >
                                    <option value="">--Seleccione una opcion--</option>
                                    {
                                        gerentes.map((gerente) => (
                                            <option 
                                                key={gerente.id_gerente} 
                                                value={gerente.nombres + ' ' + gerente.apellidos}
                                            >
                                                {gerente.nombres + ' ' + gerente.apellidos}
                                            </option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cerrar
                        </Button>
                        <Button variant="primary" type="submit" onClick={() => console.log('Creado')}>
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
            <ToastContainer />
        </Layout>
    );
};
