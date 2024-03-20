import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export const HomePage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Header 
                companyName="Empresa XYZ" 
                userName="Juan Perez"
            />
            <div style={{ display: 'flex', flex: 1 }}>
                <Sidebar />
                <div style={{ flex: 1, padding: '20px' }}>
                    <h1>Contenido</h1>
                </div>
            </div>
            <Footer />
        </div>
    );
};
