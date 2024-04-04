import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Layout } from "../layout/Layout";

interface PuestoProps {
    id_puesto: number;
    nombre_puesto: string;
    descripcion: string;
}

export const PuestosPage = () => {
    const [puestos, setPuestos] = useState<PuestoProps[]>([]);
    const [searchPuesto, setSearchPuesto] = useState('');
    const [searchResults, setSearchResults] = useState<PuestoProps[]>([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/puestos/getPuestos`)
        .then((response) => {
            setPuestos(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const handleSearchPuesto = () => {
        const results = puestos.filter(puesto => puesto.nombre_puesto.toLowerCase().includes(searchPuesto.toLowerCase()));
        setSearchResults(results);
    };

    return (
        <Layout>
            <Container>
                <Row>
                    <Col>
                        <h1 className="mt-3 mb-4">
                            Creación/Consulta de Puestos
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <Button 
                            variant="primary" 
                            style={{
                                marginBottom: '20px',
                                marginLeft: '20px'
                            }}
                        >
                            Crear Puesto
                        </Button>
                    </Col>

                    <Col md={10}>
                        <div className="input-group">
                            <Form.Control 
                                type="text" 
                                placeholder="Buscar Puesto" 
                                value={searchPuesto}
                                onChange={(e) => setSearchPuesto(e.target.value)}
                            />
                            <Button 
                                variant="primary" 
                                onClick={handleSearchPuesto}
                            >
                                Buscar
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults.length > 0 ? searchResults.map((puesto) => (
                        <tr key={puesto.id_puesto}>
                            <td>{puesto.id_puesto}</td>
                            <td>{puesto.nombre_puesto}</td>
                            <td>{puesto.descripcion}</td>
                            <td>
                                <Button 
                                    variant="primary" 
                                    style={{
                                        marginRight: '10px'
                                    }}
                                >
                                    Editar
                                </Button>
                                <Button variant="danger">
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    )) : puestos.map((puesto) => (
                        <tr key={puesto.id_puesto}>
                            <td>{puesto.id_puesto}</td>
                            <td>{puesto.nombre_puesto}</td>
                            <td>{puesto.descripcion}</td>
                            <td>
                                <Button 
                                    variant="primary" 
                                    style={{
                                        marginRight: '10px'
                                    }}
                                >
                                    Editar
                                </Button>
                                <Button variant="danger">
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};