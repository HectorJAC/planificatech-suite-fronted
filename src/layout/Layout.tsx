import { useEffect, useState } from "react";
import axios from "axios";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({children}: LayoutProps) => {

    const [nombreEmpresa, setNombreEmpresa] = useState<string>('');

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/empresas/findCompanyByDirector`, {
            params: {
                id_director_general: localStorage.getItem('id')
            }
        })
        .then(response => {
            setNombreEmpresa(response.data.nombre_empresa);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Header 
                companyName={`${nombreEmpresa}`} 
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