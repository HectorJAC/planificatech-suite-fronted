import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Layout } from "../layout/Layout";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { CustomButton } from "../components/CustomButton";
import { NotesModal } from "../components/NotesModal";
import { getNotesByUser } from "../api/notas/getNotesByUser";
import { NoteProps } from "../interfaces/notesInterface";
import { formatterDate } from "../helpers/formatters";
import axios from "axios";
import { Spinner } from "../components/Spinner";
import { DeleteIcon, EditIcon } from "../helpers/iconButtons";

export const MyNotesPage = () => {
  const [notas, setNotas] = useState<NoteProps[]>([]);
  const [searchNota, setSearchNota] = useState('');
  const [searchResults, setSearchResults] = useState<NoteProps[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const notesUser = useCallback(() => {
    setIsLoading(true);
    getNotesByUser()
      .then((response) => {
        setNotas(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      }); 
  }, []);

  useEffect((notesUser), [notesUser]);

  const handleSearchNote = () => {
    const results = notas.filter(nota => 
      nota.titulo_nota?.toLowerCase().includes(searchNota.toLowerCase()) ||
            nota.descripcion_nota?.toLowerCase().includes(searchNota.toLowerCase())
    );
    if (results.length > 0) {
      setSearchResults(results);
    } else {
      toast.error('No se encontraron resultados');
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleDeleteNote = (id: number) => {
    axios.delete(`${import.meta.env.VITE_API_URL}/notas/deleteNote`, {
      params: {
        id_nota: id
      }
    })
      .then((response) => {
        setIsLoading(true);
        toast.success(response.data.message);
        notesUser();
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
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
                      placeholder="Buscar por Titulo o Descripcion de la Nota" 
                      value={searchNota}
                      onChange={(e) => setSearchNota(e.target.value)}
                    />
                    <Button 
                      variant="primary" 
                      onClick={handleSearchNote}
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
                              <CustomButton
                                text='Editar'
                                placement='top' 
                                onclick={() => {
                                  handleShowModal()
                                  //handleGetPuesto(puesto.id_puesto!)
                                }}
                                icon={<EditIcon />}
                                color="primary"
                                style={{marginRight: '10px'}}
                              />
                              <CustomButton 
                                text='Eliminar'
                                placement='top'
                                onclick={() => handleDeleteNote(nota.id_nota!)}
                                icon={<DeleteIcon />}
                                color="danger"
                              />
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
                              <CustomButton
                                text='Editar'
                                placement='top' 
                                onclick={() => {
                                  handleShowModal()
                                  //handleGetPuesto(puesto.id_puesto!)
                                }}
                                icon={<EditIcon />}
                                color="primary"
                                style={{marginRight: '10px'}}
                              />
                              <CustomButton 
                                text='Eliminar'
                                placement='top'
                                onclick={() => handleDeleteNote(nota.id_nota!)}
                                icon={<DeleteIcon />}
                                color="danger"
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

              <NotesModal 
                showModal={showModal}
                setShowModal={setShowModal}
              />

            </Container>
          )
      }
      <ToastContainer />
    </Layout>
  );
};