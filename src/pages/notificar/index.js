import Navbar from "../../componentes/Navbar"
import { useEffect, useState } from "react"
import axios from 'axios';
import './notificar.css'

function Notificar() {
    const [departmentValue, setDepartmentValue] = useState('');
    const [roleValue, setRoleValue] = useState('');
    const [userInputValue, setUserInputValue] = useState('')
    const [usuarios, setUsuarios] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [loggedUserId, setLoggedUserId] = useState(null);
    const [loggedUserImg, setLoggedUserImg] = useState(null);
    const [loggedUserName, setLoggedName] = useState(null);
    const [loggedUserLogin, setLoggedLogin] = useState(null);
    const [loggedUserDepartment, setLoggedUserDepartment] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const loggedId = localStorage.getItem('loggedUserId');
        const loggedIdImg = localStorage.getItem('loggedUserImg');
        const loggedName = localStorage.getItem('loggedName');
        const loggedNameLogin = localStorage.getItem('login');
        const loggedDepartment = localStorage.getItem('loggedDepartment');

        setLoggedUserImg(loggedIdImg)
        setLoggedUserId(loggedId)
        setLoggedName(loggedName)
        setLoggedUserDepartment(loggedDepartment)
        setLoggedLogin(loggedNameLogin)
    }, []);

    const departments = [
        'PCP', 'Suprimentos', 'Guarnição', 'Montagem A',
        'Montagem B', 'Montagem C', 'Embalagem', 'Expedição', 'Galvanoplastia', 'Estamparia'
    ];

    const roles = [
        'Analista de Suprimentos', 'Apontador de Produção', 'Auxiliar de Produção', 'Encarregado de Produção', 'Analista de Qualidade', 'Analista de Processos'
    ];

    const departmentsFiltrados = departments
        .filter(departments => departments.toLowerCase().includes(departmentValue.toLowerCase()))
        .sort((a, b) => a.localeCompare(b));

    const rolesFiltrados = roles
        .filter(roles => roles.toLowerCase().includes(roleValue.toLowerCase()))
        .sort((a, b) => a.localeCompare(b));

    function handleInputChange(type, value) {
        if (type === 'department') {
            setDepartmentValue(value);
            setRoleValue('');
            setUserInputValue('');
        } else if (type === 'role') {
            setRoleValue(value);
            setDepartmentValue('');
            setUserInputValue('');
        } else if (type === 'user') {
            setUserInputValue(value);
            setDepartmentValue('');
            setRoleValue('');
        }
        setShowSuggestions(true)
    }

    useEffect(() => {
        axios.get('http://localhost:4000/usuarios')
            .then(response => {
                setUsuarios(response.data)
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }, []);

    const usuariosFiltrados = usuarios.filter(usuario =>
        usuario.name && usuario.name.toLowerCase().startsWith(userInputValue.toLowerCase())
    );

    useEffect(() => {
        document.title = "Notificar";
    }, []);

    const handleNotification = async (e) => {
        e.preventDefault();

        try {
            const notificationData = {
                senderId: loggedUserId,
                senderName: loggedUserName,
                senderLogin: loggedUserLogin,
                senderImg: loggedUserImg,
                senderDepartment: loggedUserDepartment,
                receiverLogin: userInputValue,
                receiverDepartment: departmentValue,
                receiverRole: roleValue,
                message: message,
            };

            await axios.post('http://localhost:4000/notifications', notificationData);

            alert('Notificação enviada com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar a notificação:', error);
            alert('Falha ao enviar a notificação.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center h-screen">
                <div className="p-5 bg-estoque-bg userBgDiv">
                    <div className="bg-stam-bg-3 p-5 rounded-3xl">
                        <h1 className="text-white font-regular text-4xl flex justify-center">Enviar notificação</h1>
                        <form className="flex space-x-8 mt-9" onSubmit={handleNotification}>
                            <div className="space-y-3 bg-stam-bg-7 p-6 rounded-xl text-white">
                                <p className="text-xl font-regular">Filtrar por</p>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Setor/departamento"
                                        value={departmentValue}
                                        onChange={(e) => handleInputChange('department', e.target.value)}
                                        className="border border-gray-400 rounded-lg pl-2 w-52 h-9 outline-none bg-transparent hover:border-stam-orange font-light caret-stam-orange">
                                    </input>
                                    {departmentValue && showSuggestions && (
                                        <div className="overflow-hidden bg-stam-bg-7 absolute rounded-xl border border-gray-400 text-white font-light w-52 p-1.5">
                                            <div className="overflow-y-auto rounded-lg flex justify-center">
                                                <table className='Setores flex justify-center'>
                                                    <tbody>
                                                        {departmentsFiltrados.length > 0 ? (
                                                            departmentsFiltrados.map((departments, index) => (
                                                                <tr key={index} className='hover:bg-gray-600'>
                                                                    <td
                                                                        className="cursor-pointer rounded-lg w-52 h-10"
                                                                        onClick={() => {
                                                                            setDepartmentValue(departments);
                                                                            setShowSuggestions(false);
                                                                        }}
                                                                    >
                                                                        {departments}
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td className="text-center w-52 h-10 text-gray-300">
                                                                    Setor não encontrado.
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Função"
                                        value={roleValue}
                                        onChange={(e) => handleInputChange('role', e.target.value)}
                                        className="border border-gray-400 rounded-lg pl-2 w-52 h-9 outline-none bg-transparent hover:border-stam-orange font-light caret-stam-orange">
                                    </input>
                                    {roleValue && showSuggestions && (
                                        <div className="overflow-hidden bg-stam-bg-7 absolute rounded-xl border border-gray-400 text-white font-light w-52 p-1.5">
                                            <div className="overflow-y-auto rounded-lg flex justify-center">
                                                <table className='Setores flex justify-center'>
                                                    <tbody>
                                                        {rolesFiltrados.length > 0 ? (
                                                            rolesFiltrados.map((roles, index) => (
                                                                <tr key={index} className='hover:bg-gray-600'>
                                                                    <td
                                                                        className="cursor-pointer rounded-lg w-52 h-10"
                                                                        onClick={() => {
                                                                            setRoleValue(roles);
                                                                            setShowSuggestions(false);
                                                                        }}
                                                                    >
                                                                        {roles}
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td className="text-center w-52 h-10 text-gray-300">
                                                                    Função não encontrada.
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Usuário"
                                        value={userInputValue}
                                        onChange={(e) => handleInputChange('user', e.target.value)}
                                        className="border border-gray-400 rounded-lg pl-2 w-52 h-9 outline-none bg-transparent hover:border-stam-orange font-light caret-stam-orange">
                                    </input>
                                    {userInputValue && showSuggestions && (
                                        <div className="overflow-hidden bg-stam-bg-7 absolute rounded-xl border border-gray-400 text-white font-light w-52 p-1.5">
                                            <div className="overflow-y-auto h-full rounded-lg flex justify-center">
                                                <table className='flex justify-center'>
                                                    <tbody>
                                                        {usuariosFiltrados.length > 0 ? (
                                                            usuariosFiltrados.map(usuario => (
                                                                <tr key={usuario._id} className='hover:bg-gray-600'>
                                                                    <td
                                                                        className="cursor-pointer rounded-lg w-52"
                                                                        onClick={() => {
                                                                            setUserInputValue(usuario.login)
                                                                            setShowSuggestions(false)
                                                                        }}
                                                                    >
                                                                        <div className='flex items-center ml-2 space-x-2'>
                                                                            <div className="border border-stam-orange p-1 rounded-full">
                                                                                <div className='w-8 h-8 overflow-hidden rounded-full '>
                                                                                    <img className='object-cover' src={`${usuario.img}`} />
                                                                                </div>
                                                                            </div>
                                                                            <div className='text-left'>
                                                                                <div className='leading-none -mb-1 mt-1.5 font-regular'>
                                                                                    {usuario.name}
                                                                                </div>
                                                                                <div className='leading-none mt-1 text-sm font-regular text-stam-orange'>
                                                                                    @{usuario.login}
                                                                                </div>
                                                                                <p className="leading-none font-thin text-sm mb-1.5 text-gray-300">{usuario.department}</p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td className="text-center w-52 h-10 text-gray-300">
                                                                    Usuário não encontrado.
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-3 bg-stam-bg-7 p-6 rounded-xl text-white font-regular">
                                    <p className="text-xl">Mensagem</p>
                                    <div>
                                        <textarea
                                            placeholder="Mensagem da notificação"
                                            value={message} onChange={(e) => setMessage(e.target.value)}
                                            className="border border-gray-400 rounded-lg pl-2 pt-1 w-52 h-16 outline-none bg-transparent hover:border-stam-orange font-light caret-stam-orange">
                                        </textarea>
                                    </div>
                                </div>
                                <button type="submit" className="buttonHover py-1.5 w-64 bg-stam-orange rounded-full font-medium">Notificar</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Notificar