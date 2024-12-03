import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/login';
import Home from './pages/home/home';
import Erro404 from './pages/erro404/erro404';
import Estoque from './pages/Estoque';
import Administracao from './pages/administracao';
import Usuarios from './pages/Usuarios';
import Register from './pages/register';
import ProtectedRoute from './componentes/ProtectedRoute';
import Notificar from './pages/notificar';
import ProgramacaoEstamparia from './pages/programacaoEstamparia';
import Embalagem from './pages/Embalagem';
import VibroAcabamento from './pages/vibroacabamento';
import Componentes from './pages/Componentes';

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
            path='/administracao' 
            element={
              <ProtectedRoute allowedUser="arthurm">
                <Administracao />
              </ProtectedRoute>
            } 
          />
          <Route
            path="/usuarios/:login"
            element={
              <ProtectedRoute>
                <Usuarios />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notificar"
            element={
              <ProtectedRoute>
                <Notificar />
              </ProtectedRoute>
            }
          />
          <Route
            path='/programacaoestamparia'
            element={
              <ProtectedRoute>
                <ProgramacaoEstamparia/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/embalagem'
            element={
              <ProtectedRoute>
                <Embalagem/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/embalagem/:code"
            element={
              <ProtectedRoute>
                <Embalagem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vibroacabamento"
            element={
                <VibroAcabamento />
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
