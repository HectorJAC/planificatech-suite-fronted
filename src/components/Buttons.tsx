import { Button } from "react-bootstrap";

export const EditButton = () => {
    return (
        <Button 
            variant="primary"
            style={{
                marginRight: '10px'
            }}
        >
            Editar
        </Button>
    );
};

export const DeleteButton = () => {
    return (
        <Button 
            variant="danger"
        >
            Inactivar
        </Button>
    )
};