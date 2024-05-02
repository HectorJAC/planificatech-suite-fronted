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
    const [nombreApellidoDirector, setNombreApellidoDirector] = useState<string>('');

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

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/director_general/getDirectorGeneral`, {
            params: {
                id_director_general: localStorage.getItem('id')
            }
        })
        .then((response) => {
            setNombreApellidoDirector(response.data.nombres + ' ' + response.data.apellidos);
        })
        .catch((error) => {
            console.log(`${error.response.data.message}`);
        });
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', zIndex: 1, marginLeft: '200px', marginTop: '50px' }}>
            <Header 
                companyName={nombreEmpresa} 
                userName={nombreApellidoDirector}
            />
            <div style={{ display: 'flex', flex: 1 }}>
                <Sidebar />
                {children}
            </div>
            <Footer />
        </div>
    );
};