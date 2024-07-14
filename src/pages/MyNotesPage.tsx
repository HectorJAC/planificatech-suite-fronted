import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Layout } from "../layout/Layout";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { DeleteButton, EditButton } from "../components/Buttons";
import { NotesModal } from "../components/NotesModal";
import { getNotesByUser } from "../api/notas/getNotesByUser";
import { NoteProps } from "../interfaces/notesInterface";
import { formatterDate } from "../helpers/formatters";

export const MyNotesPage = () => {
    const [notas, setNotas] = useState<NoteProps[]>([]);
    const [searchNota, setSearchNota] = useState('');
    const [searchResults, setSearchResults] = useState<NoteProps[]>([]);
    //const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const notesUser = () => {
        getNotesByUser()
        .then((response) => {
            setNotas(response);
        })
        .catch((error) => {
            console.log(error);
        }); 
    };

    useEffect(() => {
        notesUser();
    }, []);

    // const handlePuestosInactivos = () => {
    //     axios.get(`${import.meta.env.VITE_API_URL}/puestos/getPuestosInactivos`)
    //     .then((response) => {
    //         if (isCheckboxChecked === false) {
    //             setPuestos(response.data);
    //         } else {
    //             axios.get(`${import.meta.env.VITE_API_URL}/puestos/getPuestos`)
    //             .then((response) => {
    //                 setPuestos(response.data);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // };

    const handleSearchPuesto = () => {
        const results = notas.filter(nota => nota.titulo_nota?.toLowerCase().includes(searchNota.toLowerCase()));
        if (results.length > 0) {
            setSearchResults(results);
        } else {
            toast.error('No se encontraron resultados');
        }
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    return (
        <Layout>
            <Container>
                <Row>
                    <Col>
                        <h1 className="mt-3 mb-4">
                            Mis Notas
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
                            onClick={handleShowModal}
                        >
                            Crear Nueva Nota
                        </Button>
                    </Col>

                    <Col md={10}>
                        <div className="input-group">
                            <Form.Control 
                                type="text" 
                                placeholder="Buscar por Titulo de la Nota" 
                                value={searchNota}
                                onChange={(e) => setSearchNota(e.target.value)}
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

                {/* <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check 
                                    type="checkbox" 
                                    label="Puestos Inactivos" 
                                    checked={isCheckboxChecked}
                                    onClick={
                                        () => {
                                            setIsCheckboxChecked(!isCheckboxChecked);
                                            //handlePuestosInactivos();
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
                                    <th>Titulo</th>
                                    <th>Descripción</th>
                                    <th>Fecha Creación</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                            {searchResults.length > 0 ? (
                                    searchResults.map((nota) => (
                                        <tr key={nota.id_nota}>
                                            <td>{nota.titulo_nota}</td>
                                            <td>{nota.descripcion_nota}</td>
                                            <td>{formatterDate(nota.fecha_creacion_nota)}</td>
                                            <td>{nota.estado}</td>
                                            <td>
                                                <EditButton />
                                                <DeleteButton />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    notas.map((nota) => (
                                        <tr key={nota.id_nota}>
                                            <td>{nota.titulo_nota}</td>
                                            <td>{nota.descripcion_nota}</td>
                                            <td>{formatterDate(nota.fecha_creacion_nota)}</td>
                                            <td>{nota.estado}</td>
                                            <td>
                                                <EditButton />
                                                <DeleteButton />
                                            </td>
                                        </tr>
                                    ))
                                )
                            }
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <NotesModal 
                    showModal={showModal}
                    setShowModal={setShowModal}
                />

            </Container>
            <ToastContainer />
        </Layout>
    );
};