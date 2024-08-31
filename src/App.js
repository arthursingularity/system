import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login/login';
import Home from './pages/home/home';
import Erro404 from './pages/erro404/erro404';
import Tecnor from './pages/tecnor';
import Sobre from './pages/sobre';
import Estoque from './pages/Estoque';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='*' element={<Erro404/>}/>
          <Route path='/sobre' element={<Sobre/>}/>
          <Route path='/tecnor' element={<Tecnor/>}/>
          <Route path='/estoqueestamparia' element={<Estoque/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;