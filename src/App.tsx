import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Login } from "./pages/Login";
import { HomePage } from "./pages/HomePage";

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route element={<ProtectedRoute />} >
            <Route path='/home' element={<HomePage />} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App;
