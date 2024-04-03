import { useNavigate } from 'react-router-dom';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

export const PlanificaTechSuiteButton = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/home');
    };

    const renderTooltip = (props:object) => (
        <Tooltip id="button-tooltip" {...props}>
            Inicio
        </Tooltip>
    );

    return (
        <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
        >
            <div onClick={goToHome}>
                PlanificaTech Suite
            </div>
        </OverlayTrigger>
    );
};
