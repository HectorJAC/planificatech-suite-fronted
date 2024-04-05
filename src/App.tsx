import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Login } from "./pages/Login";
import { HomePage } from "./pages/HomePage";
import { DashboardPage } from "./pages/DashboardPage";
import { ForgetPasswordPage } from "./pages/ForgetPasswordPage";
import { NewCompany } from "./pages/NewCompany";
import { ProfilePage } from "./pages/ProfilePage";
import { ErrorPage } from "./pages/ErrorPage";
import { PuestosPage } from "./pages/PuestosPage";
import { EditCompanyPage } from "./pages/EditCompanyPage";

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/forget_password' element={<ForgetPasswordPage />} />
          <Route element={<ProtectedRoute />} >
            <Route path='*' element={<ErrorPage />} />
            <Route path='/new_company' element={<NewCompany />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/puestos' element={<PuestosPage />} />
            <Route path='/edit_company' element={<EditCompanyPage />} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App;
