import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
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
import { useNotesStore } from "../store/notesStore";
import { CustomBasicModal } from "../components/CustomBasicModal";
import { planificaTechApi } from "../api/baseApi";
import { getIdUser } from "../helpers/getLocalStorageData";

export const MyNotesPage = () => {

  const { createNoteSuccess, onAddIdNota } = useNotesStore();

  const [notas, setNotas] = useState<NoteProps>();
  const [searchNota, setSearchNota] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idNota, setIdNota] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const notesUser = useCallback((pageNumber = 1) => {
    setIsLoading(true);
    getNotesByUser(pageNumber, 6)
      .then((response) => {
        setNotas(response); 
        setCurrentPage(pageNumber);
        setTotalPages(response.totalPages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      }); 
  }, []);

  useEffect(() => {
    notesUser(1)
  }, [notesUser]);

  useEffect(() => {
    if (createNoteSuccess) {
      notesUser();
    }
  }, [createNoteSuccess, notesUser])

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    notesUser();
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
        setShowDeleteModal(false)
        notesUser();
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setShowDeleteModal(false)
      });
  };

  const handleSearchNote = () => {
    setIsLoading(true);
    if (searchNota === '') {
      notesUser();
    } else {
      planificaTechApi.get(`/notas/searchNote`, {
        params: {
          search: searchNota,
          id_usuario: Number(getIdUser())
        }
      })
        .then((response) => {
          setNotas(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setIsLoading(false);
        })
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      notesUser(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      notesUser(currentPage + 1);
    }
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
                {
                  notas?.notesByUser.map((nota) => (
                    <Col md={4} key={nota.id_nota} className="mb-4">
                      <Card>
                        <Card.Body>
                          <Card.Title>{nota.titulo_nota}</Card.Title>
                          <Card.Text>
                            {nota.descripcion_nota}
                          </Card.Text>
                          <Card.Text>
                            {formatterDate(nota.fecha_creacion_nota)}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <CustomButton
                            placement="top" 
                            text="Editar"
                            icon={<EditIcon />}
                            color="primary"
                            onclick={() => {
                              handleShowModal()
                              onAddIdNota(nota.id_nota!)
                            }}
                            style={{marginRight: '70%'}} 
                          />
                          <CustomButton 
                            placement="top"
                            text="Eliminar"
                            icon={<DeleteIcon />}
                            color="danger"
                            onclick={() => {
                              setShowDeleteModal(true),
                              setIdNota(nota.id_nota!)
                            }}
                          />
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))
                }
              </Row>
              <Row>
                <Col className="d-flex justify-content-between align-items-center">
                  <Button 
                    variant="secondary" 
                    onClick={handlePreviousPage} 
                    disabled={currentPage === 1}
                  >
                Anterior
                  </Button>
                  <span>Página {currentPage} de {totalPages}</span>
                  <Button 
                    variant="secondary" 
                    onClick={handleNextPage} 
                    disabled={currentPage === totalPages}
                  >
                Siguiente
                  </Button>
                </Col>
              </Row>

              <NotesModal 
                showModal={showModal}
                setShowModal={setShowModal}
                onHide={handleCloseModal}
              />

              <CustomBasicModal 
                title="Eliminar Nota"
                body="¿Estás seguro que desea eliminar la nota?"
                secondaryButton="Cancelar"
                primaryButton="Aceptar"
                showModal={showDeleteModal}
                setShowModal={() => setShowDeleteModal(false)}
                onClick={() => handleDeleteNote(idNota)}
              />

            </Container>
          )
      }
      <ToastContainer />
    </Layout>
  );
};
