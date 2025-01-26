import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { getIdDirectorGeneral, getIdUser } from "../utils/getLocalStorageData";
import { planificaTechApi } from "../api/baseApi";
import { useCompanyStore } from "../store/companyStore";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({children}: LayoutProps) => {

  const [nombreApellidoUsuario, setNombreApellidoUsuario] = useState<string>('');
  const { company } = useCompanyStore();

  useEffect(() => {
    planificaTechApi.get('usuarios/getUser', {
      params: {
        id_usuario: getIdUser()
      }
    })
      .then((response) => {
        if (response.data.tipo_usuario === '1') {
          planificaTechApi.get('director_general/getDirectorGeneral', {
            params: {
              id_director_general: getIdDirectorGeneral()
            }
          })
            .then((response) => {
              setNombreApellidoUsuario(response.data.nombres + ' ' + response.data.apellidos);
            })
            .catch((error) => {
              console.log(`${error.response.data.message}`);
            });
        } else if (response.data.tipo_usuario === '2') {
          planificaTechApi.get('gerentes/getGerenteById', {
            params: {
              id_gerente: getIdDirectorGeneral()
            }
          })
            .then((response) => {
              setNombreApellidoUsuario(response.data.nombres + ' ' + response.data.apellidos);
            })
            .catch((error) => {
              console.log(`${error.response.data.message}`);
            });
        }
      })
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', zIndex: 1, marginLeft: '200px', marginTop: '50px' }}>
      <Header 
        companyName={company.nombre_empresa} 
        userName={nombreApellidoUsuario}
      />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        {children}
      </div>
      <Footer />
    </div>
  );
};