import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({children}: LayoutProps) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Header 
                companyName="Empresa XYZ" 
                userName={`${localStorage.getItem('username')}`}
            />
            <div style={{ display: 'flex', flex: 1 }}>
                <Sidebar />
                {children}
            </div>
            <Footer />
        </div>
    );
};