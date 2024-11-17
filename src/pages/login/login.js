import './login.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const clearInput = () => {
    setUser("");
  }

  function clearPasswordInput() {
    setPassword("");
  }

  function handleChange(event) {
    const value = event.target.value.toLowerCase();
    const regex = /^[a-z]*$/;

    if (regex.test(value) || value === "") {
      setUser(value);
    }
  }

  function handlePasswordChange(event) {
    const value = event.target.value;
    setPassword(value);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  }

  useEffect(() => {
    document.title = "System - Entrar";

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch('http://localhost:4000/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: user,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('loggedUserId', data.user.id);
        localStorage.setItem('login', user);
        localStorage.setItem('loggedUserImg', data.user.img);
        localStorage.setItem('loggedName', data.user.name);
        localStorage.setItem('loggedDepartment', data.user.department);
        navigate('/');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setMessage('Erro ao fazer login. Tente novamente mais tarde.');
    }
  }

  return (
    <div>
      <form className='flex justify-center items-center h-screen' onSubmit={handleSubmit}>
        <div className='border border-stam-border rounded-3xl px-12 py-8 bg-stam-bg-5'>
          <div className='flex justify-center'>
            <img src='/imagens/systemlogo.png' className='w-32 mt-2' alt="System Logo" />
          </div>
          <div className='flex justify-center'>
            <div className='block'>
              <h1 className='text-white font-medium text-3xl mt-7 mr-48 ml-2'>Login</h1>
              <p className='text-white font-thin text-base ml-2'>Vamos continuar de onde paramos?</p>
            </div>
          </div>
          <div className="flex justify-center items-center mt-7">
            <div>
              <label className="text-white block mb-1 font-light cursor-text">Login</label>
              <input
                type="text"
                value={user}
                onChange={handleChange}
                className="bg-transparent border border-stam-border rounded-xl outline-none text-white w-64 px-3 py-2 font-thin hover:border-stam-orange caret-stam-orange"
              />
              <div className="flex justify-center items-center relative">
                {user !== "" && (
                  <span className="clearUserInput material-symbols-outlined absolute mb-11 cursor-pointer text-white hover:bg-stam-bg-4 p-1 rounded-lg"
                    onClick={clearInput}
                  >
                    close
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div>
              <label className="text-white block mb-1 font-light mt-3 cursor-text">Senha</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                className="bg-transparent border border-stam-border rounded-xl outline-none text-white w-64 px-3 py-2 font-thin hover:border-stam-orange caret-stam-orange"
              />
              {password !== "" && (
                <div className="flex justify-center items-center relative">
                  <span className={`showHidePasswordLoginIcon material-symbols-outlined absolute mb-11 cursor-pointer text-white hover:bg-stam-bg-4 p-1 rounded-lg ${showPassword ? 'text-stam-orange showPasswordLoginIcon' : ''}`}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                  <span className="clearUserInput material-symbols-outlined absolute mb-11 cursor-pointer text-white hover:bg-stam-bg-4 p-1 rounded-lg"
                    onClick={clearPasswordInput}
                  >
                    close
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className='flex justify-center mt-3'>
            <p className='text-stam-vermelho font-regular'>{message}</p>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="bg-stam-orange rounded-full text-black w-64 py-2 mt-8 font-medium hover:bg-stam-dark-orange">
              Entrar
            </button>
          </div>
          <a href='/register'>
            <div className="flex justify-center text-white font-light mt-5 buttonHover cursor-pointer">
              <p>Não possui cadastro? <span className='font-medium text-stam-orange'>Criar conta</span></p>
            </div>
          </a>
          <div className='flex justify-center'>
            <p className='font-thin text-white text-sm mt-7'>Desenvolvido por <span className='font-medium text-stam-orange'>Arthur Alves</span></p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;