import './register.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Register() {
    const [login, setLogin] = useState('')
    const [name, setName] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [role, setRole] = useState('')
    const [department, setDepartment] = useState('')
    const [password, setPassword] = useState('')
    const [labelColor, setLabelColor] = useState('text-white')
    const [imageFile, setImageFile] = useState(null);
    const [emailLabelColor, setEmailLabelColor] = useState('text-white')
    const [loginInputBorderColor, setLoginInputBorderColor] = useState('border-stam-border')
    const [loginLabel, setLoginLabel] = useState('Login')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();
    const [inputError, setInputError] = useState({
        birthDate: false,
        login: false,
        name: false,
        fullName: false,
        email: false,
        role: false,
        department: false,
        password: false,
        image: false,
    });

    useEffect(() => {
        document.title = "System - Criar conta"
    }, [])

    const handleBirthDateChange = (e) => {
        let input = e.target.value.replace(/\D/g, '')
        if (input.length > 2) {
            input = input.slice(0, 2) + '/' + input.slice(2)
        }
        if (input.length > 5) {
            input = input.slice(0, 5) + '/' + input.slice(5)
        }
        setBirthDate(input)
    };

    const handleLoginChange = (e) => {
        const value = e.target.value.replace(/[^a-zA-Z]/g, '').toLowerCase()
        setLogin(value)
    };

    const capitalizeFirstLetter = (text) => {
        return text.split(' ').map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1)
        }).join(' ')
    };

    const handleCapitalizedChange = (e, setter) => {
        const value = e.target.value
        const capitalizedValue = capitalizeFirstLetter(value)
        setter(capitalizedValue)
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]); // Atualiza o estado com o arquivo selecionado
    };

    const validateForm = async (e) => {
        e.preventDefault()

        setInputError({
            birthDate: false,
            login: false,
            name: false,
            fullName: false,
            email: false,
            role: false,
            department: false,
            password: false,
            image: false,
        });

        let isValid = true

        if (!login) {
            setInputError(prev => ({ ...prev, login: true }))
            isValid = false;
        }
        if (!name) {
            setInputError(prev => ({ ...prev, name: true }))
            isValid = false;
        }
        if (!fullName) {
            setInputError(prev => ({ ...prev, fullName: true }))
            isValid = false;
        }
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setInputError(prev => ({ ...prev, email: true }))
            isValid = false;
        }
        if (!birthDate || birthDate.length < 10) {
            setInputError(prev => ({ ...prev, birthDate: true }))
            isValid = false;
        }
        if (!role) {
            setInputError(prev => ({ ...prev, role: true }))
            isValid = false;
        }
        if (!department) {
            setInputError(prev => ({ ...prev, department: true }))
            isValid = false;
        }
        if (!password || password.length < 10) {
            setInputError(prev => ({ ...prev, password: true }))
            isValid = false
        }
        if (!imageFile) { // Verifica se a imagem foi selecionada
            setInputError(prev => ({ ...prev, image: true }));
            isValid = false;
        }

        if (isValid) {
            try {
                const checkResponse = await axios.post('http://localhost:4000/check-login', { login: login.trim() });

                if (checkResponse.data.message === "Login disponível.") {
                    // Cria um FormData para enviar a imagem e os dados do usuário
                    const formData = new FormData();
                    formData.append('login', login.trim());
                    formData.append('name', name);
                    formData.append('fullName', fullName);
                    formData.append('email', email);
                    formData.append('birthDate', birthDate);
                    formData.append('role', role);
                    formData.append('department', department);
                    formData.append('password', password);
                    formData.append('image', imageFile); // Adiciona a imagem ao FormData

                    const response = await axios.post('http://localhost:4000/usuarios', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data' // Importante para enviar arquivos
                        }
                    });
                    alert("Usuário cadastrado com sucesso!");
                    navigate("/login");
                } else {
                    setLabelColor('text-stam-vermelho');
                    setLoginInputBorderColor('border-stam-vermelho');
                    setLoginLabel('Login já existente.');
                }

            } catch (error) {
                console.error(error);
                setLabelColor('text-stam-vermelho');
                setLoginInputBorderColor('border-stam-vermelho');
                setLoginLabel('Erro ao verificar o login.');
            }
        }
    }

    function clearLogin() {
        setLogin("")
    }

    function clearName() {
        setName("")
    }

    function clearFullName() {
        setFullName("")
    }

    function clearEmail() {
        setEmail("")
    }

    function clearBirthDate() {
        setBirthDate("")
    }

    function clearRole() {
        setRole("")
    }

    function clearDepartment() {
        setDepartment("")
    }

    function clearPassword() {
        setPassword("")
    }

    function togglePasswordVisibility() {
        setShowPassword(prev => !prev)
    }

    return (
        <div>
            <form className='flex justify-center items-center md:h-screen' onSubmit={validateForm}>
            <div className='signUpBackground border-0 rounded-none md:border md:border-stam-border md:rounded-3xl px-10 py-5 bg-stam-bg-5 space-y-2 w-full md:w-auto h-full md:h-auto'>
                    <div className='relative'>
                        <img src='/imagens/systemlogo.png' className='w-24 absolute right-0 top-3' alt="System Logo" />
                    </div>
                    <div>
                        <h1 className='text-white font-medium text-3xl mt-3'>Criar conta</h1>
                        <p className='text-white font-thin text-base'>Bem-vindo ao System!</p>
                    </div>
                    <div className='block md:flex items-center justify-center space-x-0 md:space-x-10'>
                        <div className='space-y-2 mt-5'>
                            <div className="flex justify-center items-center">
                                <div className='relative'>
                                    <label className={`${labelColor} mb-1 block font-light cursor-text`}>{loginLabel}</label>
                                    <input
                                        placeholder='arthurm(protheus)'
                                        type="text"
                                        maxLength={30}
                                        value={login}
                                        onChange={handleLoginChange}
                                        className={`bg-transparent border ${loginInputBorderColor} rounded-xl outline-none text-white w-64 px-3 py-2 font-thin hover:border-stam-orange caret-stam-orange ${inputError.login ? 'border-stam-vermelho' : ''}`}
                                    />
                                    {login !== "" && (
                                        <span className="clearRegisterUserInput material-symbols-outlined absolute mb-11 cursor-pointer text-white hover:bg-stam-bg-4 p-1 rounded-lg"
                                            onClick={clearLogin}
                                        >
                                            close
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className='relative'>
                                    <label className="text-white mb-1 block font-light cursor-text">Nome</label>
                                    <input
                                        placeholder='Arthur Alves'
                                        type="text"
                                        maxLength={30}
                                        value={name}
                                        onChange={(e) => handleCapitalizedChange(e, setName)}
                                        className={`bg-transparent border border-stam-border rounded-xl outline-none text-white w-64 px-3 py-2 font-thin hover:border-stam-orange caret-stam-orange ${inputError.name ? 'border-stam-vermelho' : ''}`}
                                    />
                                    {name !== "" && (
                                        <span className="clearRegisterUserInput material-symbols-outlined absolute mb-11 cursor-pointer text-white hover:bg-stam-bg-4 p-1 rounded-lg"
                                            onClick={clearName}
                                        >
                                            close
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className='relative'>
                                    <label className="text-white mb-1 block font-light cursor-text">Nome completo</label>
                                    <input
                                        placeholder='Arthur Alves Pereira Macêdo'
                                        type="text"
                                        maxLength={45}
                                        value={fullName}
                                        onChange={(e) => handleCapitalizedChange(e, setFullName)}
                                        className={`bg-transparent border border-stam-border rounded-xl outline-none text-white w-64 px-3 py-2 font-thin hover:border-stam-orange caret-stam-orange ${inputError.fullName ? 'border-stam-vermelho' : ''}`}
                                    />
                                    {fullName !== "" && (
                                        <span className="clearRegisterUserInput material-symbols-outlined absolute mb-11 cursor-pointer text-white hover:bg-stam-bg-4 p-1 rounded-lg"
                                            onClick={clearFullName}
                                        >
                                            close
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className='relative'>
                                    <label className={`${emailLabelColor} mb-1 block font-light cursor-text`}>Email</label>
                                    <input
                                        placeholder='arthur@gmail.com'
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`bg-transparent border border-stam-border rounded-xl outline-none text-white w-64 px-3 py-2 font-thin hover:border-stam-orange caret-stam-orange ${inputError.email ? 'border-stam-vermelho' : ''}`}
                                    />
                                    {email !== "" && (
                                        <span className="clearRegisterUserInput material-symbols-outlined absolute mb-11 cursor-pointer text-white hover:bg-stam-bg-4 p-1 rounded-lg"
                                            onClick={clearEmail}
                                        >
                                            close
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='space-y-2 mt-2.5 md:mt-5'>
                            <div className="flex justify-center items-center">
                                <div className='relative'>
                                    <label className="text-white mb-1 block font-light cursor-text">Data de nascimento</label>
                                    <input
                                        placeholder='dia/mês/ano'
                                        type="text"
                                        value={birthDate}
                                        onChange={handleBirthDateChange}
                                        maxLength={10}
                                        className={`bg-transparent border border-stam-border rounded-xl outline-none text-white w-64 px-3 py-2 font-thin hover:border-stam-orange caret-stam-orange ${inputError.birthDate ? 'border-stam-vermelho' : ''}`}
                                    />
                                    {birthDate !== "" && (
                                        <span className="clearRegisterUserInput material-symbols-outlined absolute mb-11 cursor-pointer text-white hover:bg-stam-bg-4 p-1 rounded-lg"
                                            onClick={clearBirthDate}
                                        >
                                            close
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-center items-center relative">
                                <div className='relative'>
                                    <label className="text-white mb-1 block font-light cursor-text">Função</label>
                                    <input
                                        placeholder='Auxiliar de Produção'
                                        type="text"
                                        maxLength={40}
                                        value={role}
                                        onChange={(e) => handleCapitalizedChange(e, setRole)}
                                        className={`bg-transparent border border-stam-border rounded-xl outline-none text-white w-64 px-3 py-2 font-thin hover:border-stam-orange caret-stam-orange ${inputError.role ? 'border-stam-vermelho' : ''}`}
                                    />
                                    {role !== "" && (
                                        <span className="clearRegisterUserInput material-symbols-outlined absolute mb-11 cursor-pointer text-white hover:bg-stam-bg-4 p-1 rounded-lg"
                                            onClick={clearRole}
                                        >
                                            close
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-center items-center relative">
                                <div className='relative'>
                                    <label className="text-white mb-1 block font-light cursor-text">Departamento/Setor</label>
                                    <input
                                        placeholder='Embalagem'
                                        type="text"
                                        maxLength={40}
                                        value={department}
                                        onChange={(e) => handleCapitalizedChange(e, setDepartment)}
                                        className={`bg-transparent border border-stam-border rounded-xl outline-none text-white w-64 px-3 py-2 font-thin hover:border-stam-orange caret-stam-orange ${inputError.department ? 'border-stam-vermelho' : ''}`}
                                    />
                                    {department !== "" && (
                                        <span className="clearRegisterUserInput material-symbols-outlined absolute mb-11 cursor-pointer text-white hover:bg-stam-bg-4 p-1 rounded-lg"
                                            onClick={clearDepartment}
                                        >
                                            close
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-center items-center relative">
                                <div className='relative'>
                                    <label className="text-white mb-1 block font-light cursor-text">Senha</label>
                                    <input
                                        placeholder='Mínimo 10 caracteres'
                                        type={showPassword ? 'text' : 'password'}
                                        maxLength={30}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`bg-transparent border border-stam-border rounded-xl outline-none text-white w-64 px-3 py-2 font-thin hover:border-stam-orange caret-stam-orange ${inputError.password ? 'border-stam-vermelho' : ''}`}
                                    />
                                    {password !== "" && (
                                        <span className="clearRegisterUserInput material-symbols-outlined absolute mb-11 cursor-pointer text-white hover:bg-stam-bg-4 p-1 rounded-lg"
                                            onClick={clearPassword}
                                        >
                                            close
                                        </span>
                                    )}
                                    {password !== "" && (
                                        <span className={`material-symbols-outlined absolute mb-11 cursor-pointer text-white hover:bg-stam-bg-4 p-1 rounded-lg ${showPassword ? 'text-stam-orange showHideRegisterIcon' : 'showHidePasswordRegisterIcon'}`}
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? 'visibility' : 'visibility_off'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='px-6 pt-4 flex justify-center'>
                        <div>
                            <label className={`mb-1 block font-light cursor-text ${inputError.image ? 'text-stam-vermelho' : 'text-white'}`}>{inputError.image ? 'A imagem é obrigatória.' : 'Foto de perfil (quadrada)'}</label>
                            <input
                                type='file'
                                accept="image/*"
                                onChange={handleImageChange}
                                className={`p-4 md:w-auto w-full rounded-xl border border-stam-border text-white hover:border-stam-orange cursor-pointer hover:bg-stam-bg-4 font-light ${inputError.image ? 'border-stam-vermelho' : ''}`}>
                            </input>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <p className={`${inputError.password ? 'flex' : 'hidden'} text-stam-vermelho font-light mt-2`}>A senha deve possuir no mínimo 10 caracteres.</p>
                    </div>
                    <div className='relative'>
                        <a href='/login'>
                            <span
                                className='material-symbols-rounded absolute text-stam-border border top-6 border-stam-border p-2 rounded-xl hover:bg-stam-orange hover:border-stam-orange hover:text-white cursor-pointer'>
                                arrow_back
                            </span>
                        </a>
                        <div className="flex justify-center">
                            <button type="submit" className="bg-stam-orange rounded-full w-52 md:w-64 py-2 mt-6 font-medium hover:bg-stam-dark-orange">
                                Cadastrar
                            </button>
                        </div>
                    </div>
                    <div className='flex justify-center pb-5 md:pb-0'>
                        <p className='font-thin text-white mt-2 text-sm'>Desenvolvido por <span className='font-medium text-stam-orange'>Arthur Alves</span></p>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;
