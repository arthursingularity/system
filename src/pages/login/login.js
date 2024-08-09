import React from 'react';
import { useNavigate } from 'react-router-dom';
import CampoTexto from "../../componentes/CampoTexto";
import CampoUser from '../../componentes/CampoEmail/CampoEmail';

function Login() {
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = "System - Entrar";
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <div>
      <img src="stam.svg" className="absolute w-16 left-5 top-5" alt="Logo" />
      <form className='flex justify-center items-center h-screen' onSubmit={handleSubmit}>
        <div className='border border-stam-border rounded-3xl px-16 py-8'>
          <div className='flex justify-center'>
            <img src='system-logo.png' className='w-36' alt="System Logo" />
          </div>
          <div className='flex justify-center'>
            <div className='block'>
              <h1 className='text-white font-medium text-3xl mt-7 mr-48 ml-2'>Login</h1>
              <p className='text-white font-thin text-base ml-2'>Vamos continuar de onde paramos?</p>
            </div>
          </div>
          <CampoUser nome="Usuário" />
          <CampoTexto nome="Senha" type="password" />
          <div className="flex justify-center">
            <button type="submit" className="bg-stam-orange rounded-full text-black w-64 py-2 mt-8 font-medium hover:bg-stam-dark-orange">
              Entrar
            </button>
          </div>
          <div className='flex justify-center'>
            <p className='font-thin text-white mt-12'>Desenvolvido por <span className='font-medium text-stam-orange'>Arthur</span></p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
