import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Layout } from "../layout/Layout";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CustomButton } from "../components/CustomButton";
import axios from "axios";
import { Spinner } from "../components/Spinner";
import { findCompanyByDirector } from "../api/empresas/findCompanyByDirector";
import { CompanyProps } from "../interfaces/companyInteface";
import { GerentesProps } from "../interfaces/gerenteInterface";
import { ViewIcon } from "../helpers/iconButtons";
import { DepartmentProps } from "../interfaces/departmentInterface";
import { GerentesModal } from "../components/GerentesModal";

export const GerentesPage = () => {
  const [gerentes, setGerentes] = useState<GerentesProps[]>([]);
  const [searchGerente, setSearchGerente] = useState('');
  const [searchResults, setSearchResults] = useState<GerentesProps[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyProps>();
  const [departments, setDepartments] = useState<DepartmentProps[]>([]);
  const [selectedGerenteId, setSelectedGerenteId] = useState<number | null>(null);

  useEffect(() => {
    findCompanyByDirector()
      .then((response) => {
        setCompanyData(response);
      })
      .catch(() => {});
  }, []);

  const getAllDepartments = useCallback(() => {
    if (companyData?.id_empresa === undefined) {
      return;
    } else {
      setIsLoading(true);
      axios.get(`${import.meta.env.VITE_API_URL}/departamentos/getDepartamentos`, {
        params: {
          id_empresa: companyData?.id_empresa,
          estado: 'ACTIVO'
        }
      })
        .then((response) => {
          setDepartments(response.data);
          setIsLoading(false);
          return;
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [companyData?.id_empresa]);

  useEffect(getAllDepartments, [getAllDepartments]);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${import.meta.env.VITE_API_URL}/gerentes/getGerentesByCompany`, {
      params: {
        id_empresa: companyData?.id_empresa
      }
    })
      .then((response) => {
        setGerentes(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [showModal, companyData?.id_empresa]);

  const handleSearchGerente = () => {
    const results = gerentes.filter(gerente => 
      gerente.nombres?.toLowerCase().includes(searchGerente.toLowerCase()) ||
            gerente.apellidos?.toLowerCase().includes(searchGerente.toLowerCase())
    );
    if (results.length > 0) {
      setSearchResults(results);
    } else {
      toast.error('No se encontraron resultados');
    }
  };

  const handleShowModal = (id_gerente: number) => {
    setSelectedGerenteId(id_gerente);
    setShowModal(true);
  };

  return (
    <Layout>
      {
        isLoading 
          ? (
            <Container>
              <Spinner />
            </Container>
          )
          : (
            <Container>
              <Row>
                <Col>
                  <h1 className="mt-3 mb-4">
                                    Listado de Gerentes
                  </h1>
                </Col>
              </Row>

              <Row
                className="mb-3"
              >
                <Col md={10}>
                  <div className="input-group">
                    <Form.Control 
                      type="text" 
                      placeholder="Buscar por Nombre del Gerente" 
                      value={searchGerente}
                      onChange={(e) => setSearchGerente(e.target.value)}
                    />
                    <Button 
                      variant="primary" 
                      onClick={handleSearchGerente}
                    >
                                        Buscar
                    </Button>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Cedula</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Número Telefonico</th>
                        <th>Departamento Asignado</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.length > 0 ? (
                        searchResults.map((gerente) => (
                          <tr key={gerente.id_gerente}>
                            <td>{gerente.correo}</td>
                            <td>{gerente.nombres} {gerente.apellidos}</td>
                            <td>{gerente.correo}</td>
                            <td>{gerente.numero_telefonico}</td>
                            {
                              departments.map((department) => {
                                if (gerente.id_gerente === department.id_gerente) {
                                  return (
                                    <td key={department.id_gerente}>
                                      {department.nombre_departamento}
                                    </td>
                                  );
                                }
                              })
                            }
                            <td>{gerente.estado}</td>
                            <th>Acciones</th>
                            <td>
                              <CustomButton 
                                text='Ver'
                                placement='top'
                                icon={<ViewIcon />}
                                onclick={() => handleShowModal(gerente.id_gerente!)}
                                color="primary"                                                   
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        gerentes.map((gerente) => (
                          <tr key={gerente.id_gerente}>
                            <td>{gerente.cedula}</td>
                            <td>{gerente.nombres} {gerente.apellidos}</td>
                            <td>{gerente.correo}</td>
                            <td>{gerente.numero_telefonico}</td>
                            {
                              departments.map((department) => {
                                if (gerente.id_gerente === department.id_gerente) {
                                  return (
                                    <td key={department.id_gerente}>
                                      {department.nombre_departamento}
                                    </td>
                                  );
                                }
                              })
                            }
                            <td>{gerente.estado}</td>
                            <td>
                              <CustomButton 
                                text='Ver'
                                placement='top'
                                icon={<ViewIcon />}
                                onclick={() => handleShowModal(gerente.id_gerente!)}
                                color="primary"    
                              />
                            </td>
                          </tr>
                        ))
                      )
                      }
                    </tbody>
                  </Table>
                </Col>
              </Row>

              <GerentesModal 
                showModal={showModal}
                setShowModal={setShowModal}
                idGerente={selectedGerenteId?.toString() || ''}
              />

            </Container>
          )
      }
      <ToastContainer />
    </Layout>
  );
};