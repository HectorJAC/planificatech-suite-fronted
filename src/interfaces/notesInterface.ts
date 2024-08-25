export interface NoteProps {
    currentPage?: number;
    pageSize?: number;
    totalNotesByUser?: number;
    totalPages?: number;
    notesByUser: {
        id_nota?: number;
        titulo_nota?: string;
        descripcion_nota?: string;
        fecha_creacion_nota?: string;
        estado?: string;
    }[];
}

export interface OneNoteProps {
    id_nota?: number;
    titulo_nota?: string;
    descripcion_nota?: string;
    fecha_creacion_nota?: string;
    estado?: string;
}