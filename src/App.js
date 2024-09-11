import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login/login';
import Home from './pages/home/home';
import Erro404 from './pages/erro404/erro404';
import Estoque from './pages/Estoque';
import Ambient from './pages/Ambient';
import Embalagem from './pages/Embalagem';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='*' element={<Erro404/>}/>
          <Route path='/estoqueestamparia' element={<Estoque/>}/>
          <Route path='/ambient' element={<Ambient/>}/>
          <Route path='/embalagem' element={<Embalagem/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;