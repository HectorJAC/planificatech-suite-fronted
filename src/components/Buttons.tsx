import { FC } from "react";
import { Button } from "react-bootstrap";

interface ButtonProps {
    onclick?: () => void;
}

export const EditButton:FC<ButtonProps> = ({onclick}) => {
    return (
        <Button 
            variant="primary"
            style={{
                marginRight: '10px'
            }}
            onClick={onclick}
        >
            Editar
        </Button>
    );
};

export const DeleteButton:FC<ButtonProps> = ({onclick}) => {
    return (
        <Button 
            variant="danger"
            onClick={onclick}
        >
            Inactivar
        </Button>
    )
};