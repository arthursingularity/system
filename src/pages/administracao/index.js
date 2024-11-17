import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../../componentes/Navbar'
import './ambient.css'

function Administracao() {
    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/usuarios')
            .then(response => {
                const sortedUsuarios = response.data.sort((a, b) => {
                    const nameA = a.fullName || '';
                    const nameB = b.fullName || '';
                    return nameA.localeCompare(nameB);
                });
                setUsuarios(sortedUsuarios)
            })
            .catch(error => {
                console.error('Erro:', error)
            });
    }, []);

    return (
        <div>
            <Navbar />
            <div className='flex justify-center'>
                <div className='absolute top-32 text-white font-light'>
                    <h1 className='font-regular text-3xl flex justify-center'>Usuários</h1>
                    <div className="overflow-hidden rounded-lg mt-14 border border-stam-border-2 border-b-dark-bg">
                        <table>
                            <thead>
                                <tr className='bg-stam-bg-3 border-b-stam-border-2 border-b'>
                                    <th className="py-3 font-light">Imagem</th>
                                    <th className="font-light">Nome</th>
                                    <th className="font-light">Login</th>
                                    <th className="font-light">Função</th>
                                    <th className="font-light">Setor</th>
                                    <th className="font-light">Email</th>
                                    <th className="font-light">ID</th>
                                    <th className="font-light">Criado em</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map(usuario => (
                                    <tr key={usuario._id} className="border-b border-stam-border-2 hover:bg-stam-bg-5 font-thin">
                                        <td className="px-7 py-2.5">
                                            <div className="flex justify-center">
                                                <img className="w-8 h-8 rounded-full object-cover" src={encodeURI(usuario.img)} alt='User Profile' />
                                            </div>
                                        </td>
                                        <td className="pr-6">
                                            <div className='font-light'>
                                                {usuario.fullName}
                                            </div>
                                        </td>
                                        <td className="px-3">{usuario.login}</td>
                                        <td className="px-5 font-light">{usuario.role}</td>
                                        <td className="px-5">{usuario.department}</td>
                                        <td className="px-5">{usuario.email}</td>
                                        <td className="px-3 text-xs">{usuario._id}</td>
                                        <td className="px-3 pr-5 text-xs">{usuario.createdAt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Administracao;
