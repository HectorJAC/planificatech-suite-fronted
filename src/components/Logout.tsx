import { useNavigate } from 'react-router-dom';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { SlLogout } from "react-icons/sl";

export const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Eliminar el token de acceso del almacenamiento local
        localStorage.removeItem('accesToken');
        localStorage.removeItem('username');
        localStorage.removeItem('id');

        // Redirigir al usuario a la página de inicio de sesión
        navigate('/');
    };

    const renderTooltip = (props:object) => (
        <Tooltip id="button-tooltip" {...props}>
            Cerrar sesión
        </Tooltip>
    );

    return (
        <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
        >
            <button onClick={handleLogout}>
                <SlLogout />
            </button>
        </OverlayTrigger>
    );
};
