import './styles/background.css';

interface BackgroundProps {
    children: React.ReactNode;
    style: React.CSSProperties;
}

export const Background = ({ children, style }: BackgroundProps) => {
    return (
        <div className='fondo' style={style}>
            {children}
        </div>
    );
}