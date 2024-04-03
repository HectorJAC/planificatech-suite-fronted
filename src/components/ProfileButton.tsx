import { useNavigate } from 'react-router-dom';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';

export const ProfileButton = () => {
    const navigate = useNavigate();

    const goToProfile = () => {
        navigate('/profile');
    };

    const renderTooltip = (props:object) => (
        <Tooltip id="button-tooltip" {...props}>
            Perfil de usuario
        </Tooltip>
    );

    return (
        <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
        >
            <button onClick={goToProfile}>
                <FaUser 
                    size={20}
                />
            </button>
        </OverlayTrigger>
    );
};
