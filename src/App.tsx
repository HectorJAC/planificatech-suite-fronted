import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Login } from "./pages/Login";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { DashboardPage } from "./pages/DashboardPage";
import { ForgetPasswordPage } from "./pages/ForgetPasswordPage";
import { NewCompany } from "./pages/NewCompany";
import { ProfilePage } from "./pages/ProfilePage";
import { ErrorPage } from "./pages/ErrorPage";
import { PuestosPage } from "./pages/PuestosPage";
import { EditCompanyPage } from "./pages/EditCompanyPage";
import { GraphicsPage } from "./pages/GraphicsPage";
import { MyNotesPage } from "./pages/MyNotesPage";
import { CreateDepartmentPage } from "./pages/CreateDepartmentPage";
import { GerentesPage } from "./pages/GerentesPage";
import { EmployeesPage } from "./pages/EmployeesPage";
import { CreateEmployeePage } from "./pages/CreateEmployeePage";
import { ConsultCompanyPage } from "./pages/ConsultCompanyPage";
import { GraficasEmpleadosPage } from "./pages/GraficasEmpleadosPage";
import { ProyectsPage } from "./pages/ProyectsPage";
import { GraphicsProjectsPage } from "./pages/GraphicsProjectsPage";
import { ConsultGraphicProjectPage } from "./pages/ConsultGraphicProjectPage";
import { CreateProjectPage } from "./pages/CreateProjectPage";
import { CreateProjectStepTwoPage } from "./pages/CreateProjectStepTwoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/forget_password' element={<ForgetPasswordPage />} />
        <Route element={<ProtectedRoute />} >
          <Route path='*' element={<ErrorPage />} />
          <Route path='/new_company' element={<NewCompany />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/puestos' element={<PuestosPage />} />
          <Route path='/edit_company' element={<EditCompanyPage />} />
          <Route path='/graphics' element={<GraphicsPage />} />
          <Route path='/my_notes' element={<MyNotesPage />} />
          <Route path='/create_department' element={<CreateDepartmentPage />} />
          <Route path='/list_managers' element={<GerentesPage />} />
          <Route path='/list_employees' element={<EmployeesPage />} />
          <Route path='/create_employee' element={<CreateEmployeePage />} />
          <Route path='/consult_company' element={<ConsultCompanyPage />} />
          <Route path='/graphics_employees' element={<GraficasEmpleadosPage />} />
          <Route path='/proyects' element={<ProyectsPage />} />
          <Route path='/graphics_projects' element={<GraphicsProjectsPage />} />
          <Route path='/consult_graphic_project' element={<ConsultGraphicProjectPage />} />
          <Route path='/create_project' element={<CreateProjectPage />} />
          <Route path='/create_project_step_two' element={<CreateProjectStepTwoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
