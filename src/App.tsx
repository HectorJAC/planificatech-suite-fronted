import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Login } from "./pages/Login";
import { HomePage } from "./pages/HomePage";
import { ForgetPasswordPage } from "./pages/ForgetPasswordPage";
import { NewCompany } from "./pages/NewCompany";
import { ProfilePage } from "./pages/ProfilePage";
import { ErrorPage } from "./pages/ErrorPage";

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
            <Route path='/profile' element={<ProfilePage />} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App;
