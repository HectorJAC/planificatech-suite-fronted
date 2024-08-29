import { Accordion } from "react-bootstrap";
import './styles/sidebar.css';
import { FC, useEffect, useState } from "react";
import { useUI } from "../context/useUI";
import { getUserById } from "../api/usuarios/getUserById";
import { CustomSideBarItem } from "./CustomSideBarItem";

interface UserProps {
  username: string;
  password: string;
  tipo_usuario: string;
}

export const Sidebar:FC = () => {
    
  const { state, dispatch } = useUI();
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const handleSectionClick = (section: string) => {
    dispatch({ type: 'SET_OPEN_SECTION', payload: state.openSection === section ? null : section });
  };

  const handleActiveOption = (option: string) => {
    dispatch({ type: 'SET_ACTIVE_OPTION', payload: option });
  };

  useEffect(() => {
    getUserById()
      .then((response) => {
        setUser(response);
      })
  }, []);

  return (
    <Accordion className="sidebar" activeKey={state.openSection} onSelect={(eventKey) => handleSectionClick(eventKey as string)}>
      <Accordion.Item eventKey="0">
        <Accordion.Header className="sidebar-header">Dashboard</Accordion.Header>
        <CustomSideBarItem 
          linkText="Dashboard"
          linkPath="/dashboard"
          activeOption={state.activeOption}
          handleActiveOption={() => handleActiveOption('Dashboard')}
        />
      </Accordion.Item>

      {
        user.tipo_usuario === '1' && (
          <Accordion.Item eventKey="1">
            <Accordion.Header className="sidebar-header">Empresas</Accordion.Header>
            <CustomSideBarItem 
              linkText="Editar Empresa"
              linkPath="/edit_company"
              activeOption={state.activeOption}
              handleActiveOption={() => handleActiveOption('Editar Empresa')}
            />
            <CustomSideBarItem 
              linkText="Consultar Empresa"
              linkPath="/consult_company"
              activeOption={state.activeOption}
              handleActiveOption={() => handleActiveOption('Consultar Empresa')}
            />
          </Accordion.Item>
        )
      }

      <Accordion.Item eventKey="2">
        <Accordion.Header className="sidebar-header">Reuniones</Accordion.Header>
        <CustomSideBarItem 
          linkText="Programar Reunion"
          linkPath="/"
          activeOption={state.activeOption}
          handleActiveOption={() => handleActiveOption('Programar Reunion')}
        />
        <CustomSideBarItem 
          linkText="Confirmar Reunion"
          linkPath="/"
          activeOption={state.activeOption}
          handleActiveOption={() => handleActiveOption('Confirmar Reunion')}
        />
      </Accordion.Item>

      <Accordion.Item eventKey="3">
        <Accordion.Header className="sidebar-header">Departamentos</Accordion.Header>
        {
          user.tipo_usuario === '1' && (
            <CustomSideBarItem 
              linkText="Crear Departamento"
              linkPath="/create_department"
              activeOption={state.activeOption}
              handleActiveOption={() => handleActiveOption('Crear Departamento')}
            />
          )
        }
        {
          user.tipo_usuario === '2' && (
            <CustomSideBarItem 
              linkText="Mi Departamento"
              linkPath="/"
              activeOption={state.activeOption}
              handleActiveOption={() => handleActiveOption('Mi Departamento')}
            />
          )
        }
        <CustomSideBarItem 
          linkText="Consultas Departamento"
          linkPath="/"
          activeOption={state.activeOption}
          handleActiveOption={() => handleActiveOption('Consultas Departamento')}
        />
      </Accordion.Item>

      {
        user.tipo_usuario === '1' && (
          <Accordion.Item eventKey="4">
            <Accordion.Header className="sidebar-header">Gerentes</Accordion.Header>
            <CustomSideBarItem 
              linkText="Consultas Gerentes"
              linkPath="/list_managers"
              activeOption={state.activeOption}
              handleActiveOption={() => handleActiveOption('Consultas Gerentes')}
            />
            <CustomSideBarItem 
              linkText="Despedir Gerente"
              linkPath="/"
              activeOption={state.activeOption}
              handleActiveOption={() => handleActiveOption('Despedir Gerente')}
            />
          </Accordion.Item>
        )
      }

      <Accordion.Item eventKey="5">
        <Accordion.Header className="sidebar-header">Empleados</Accordion.Header>
        <CustomSideBarItem 
          linkText="Crear Empleados"
          linkPath="/list_employees"
          activeOption={state.activeOption}
          handleActiveOption={() => handleActiveOption('Crear Empleados')}
        />
        <CustomSideBarItem 
          linkText="Gráficas Empleados"
          linkPath="/graphics_employees"
          activeOption={state.activeOption}
          handleActiveOption={() => handleActiveOption('Gráficas Empleados')}
        />
      </Accordion.Item>

      <Accordion.Item eventKey="6">
        <Accordion.Header className="sidebar-header">Proyectos</Accordion.Header>
        <CustomSideBarItem 
          linkText="Crear Proyectos"
          linkPath="/proyects"
          activeOption={state.activeOption}
          handleActiveOption={() => handleActiveOption('Crear Proyectos')}
        />
        <CustomSideBarItem 
          linkText="Gráficas Proyectos"
          linkPath="/graphics_projects"
          activeOption={state.activeOption}
          handleActiveOption={() => handleActiveOption('Gráficas Proyectos')}
        />
      </Accordion.Item>

      <Accordion.Item eventKey="7">
        <Accordion.Header className="sidebar-header">Gráficas</Accordion.Header>
        <CustomSideBarItem 
          linkText="Generar Gráficas"
          linkPath="/graphics"
          activeOption={state.activeOption}
          handleActiveOption={() => handleActiveOption('Generar Gráficas')}
        />
      </Accordion.Item>

      <Accordion.Item eventKey="8">
        <Accordion.Header className="sidebar-header">Utilidades</Accordion.Header>
        <CustomSideBarItem 
          linkText="Crear Reporte"
          linkPath="/"
          activeOption={state.activeOption}
          handleActiveOption={() => handleActiveOption('Crear Reporte')}
        />
        <CustomSideBarItem 
          linkText="Mis Notas"
          linkPath="/my_notes"
          activeOption={state.activeOption}
          handleActiveOption={() => handleActiveOption('Mis Notas')}
        />
        <CustomSideBarItem 
          linkText="Calendario"
          linkPath="/"
          activeOption={state.activeOption}
          handleActiveOption={() => handleActiveOption('Calendario')}
        />
        <CustomSideBarItem 
          linkText="Creación/Consulta de Puestos"
          linkPath="/puestos"
          activeOption={state.activeOption}
          handleActiveOption={() => handleActiveOption('Creación/Consulta de Puestos')}
        />
      </Accordion.Item>
    </Accordion>
  );
};
