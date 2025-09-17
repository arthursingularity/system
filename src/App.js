import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/login';
import Home from './pages/home/home';
import Erro404 from './pages/erro404/erro404';
import Estoque from './pages/Estoque';
import Register from './pages/register';
import ProtectedRoute from './componentes/ProtectedRoute';
import VibroAcabamento from './pages/vibroacabamento';
import Componentes from './pages/Componentes';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/'
            element={
                <Home />
            }
          />
          <Route path='*' element={<Erro404 />} />
          <Route
            path='/estoqueestamparia'
            element={
                <Estoque />
            }
          />
          <Route
            path="/vibroacabamento"
            element={
                <VibroAcabamento />
            }
          />
          <Route
            path="/dashboard"
            element={
                <Dashboard />
            }
          />
          <Route
            path="/componentes"
            element={
                <Componentes />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
