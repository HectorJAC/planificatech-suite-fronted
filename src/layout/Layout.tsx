import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { getIdDirectorGeneral } from "../helpers/getLocalStorageData";
import { planificaTechApi } from "../api/baseApi";
import { findCompanyByDirector } from "../api/empresas/findCompanyByDirector";
import { CompanyProps } from "../interfaces/companyInteface";

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({children}: LayoutProps) => {

  const [companyData, setCompanyData] = useState<CompanyProps>();
  const [nombreApellidoDirector, setNombreApellidoDirector] = useState<string>('');

  useEffect(() => {
    findCompanyByDirector()
      .then((response) => {
        setCompanyData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    planificaTechApi.get('director_general/getDirectorGeneral', {
      params: {
        id_director_general: getIdDirectorGeneral()
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
        companyName={companyData?.nombre_empresa} 
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