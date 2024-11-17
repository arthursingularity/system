import './usuarios.css'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../componentes/Navbar'

function Usuarios() {
    const navigate = useNavigate()
    const { login } = useParams()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [followersDivVisibility, setFollowersDivVisibility] = useState(false)
    const [followingDivVisibility, setFollowingDivVisibility] = useState(false)
    const [loggedUserId, setLoggedUserId] = useState(null);
    const [loggedUserImg, setLoggedUserImg] = useState(null);
    const [loggedUserName, setLoggedName] = useState(null);
    const [loggedUserDepartment, setLoggedUserDepartment] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const loggedId = localStorage.getItem('loggedUserId');
        const loggedIdImg = localStorage.getItem('loggedUserImg');
        const loggedName = localStorage.getItem('loggedName');
        const loggedDepartment = localStorage.getItem('loggedDepartment');

        setLoggedUserImg(loggedIdImg)
        setLoggedUserId(loggedId);
        setLoggedName(loggedName)
        setLoggedUserDepartment(loggedDepartment)
    }, []);

    const storedLogin = localStorage.getItem('login')

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/usuarios/login/${login}`)
                setUser(response.data)
                setLoading(false)

                if (response.data.followers.some(follower => follower.login === storedLogin)) {
                    setIsFollowing(true);
                }
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        };

        fetchUserData();
    }, [login]);

    useEffect(() => {
        if (user) {
            document.title = `${user.name} (@${user.login})`;
        }
    }, [user]);

    const handleFollow = async () => {
        try {
            const response = await axios.post(`http://localhost:4000/usuarios/${user._id}/follow`, {
                followerId: loggedUserId,
                followerName: loggedUserName,
                followerLogin: storedLogin,
                followerImg: loggedUserImg,
                followerDepartment: loggedUserDepartment,
            });

            window.location.reload()

        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    const handleUnfollow = async () => {
        try {
            const response = await axios.post(`http://localhost:4000/usuarios/${user._id}/unfollow`, {
                followerId: loggedUserId,
            });
    
            setIsFollowing(false);
            window.location.reload();
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    function toggleFollowersDivVisibility() {
        setFollowersDivVisibility(prevVisibility => !prevVisibility);
    }

    function toggleFollowingDivVisibility() {
        setFollowingDivVisibility(prevFollowingVisibility => !prevFollowingVisibility);
    }

    function handleUsuarioClick(login) {
        navigate(`/usuarios/${login}`);
        setFollowersDivVisibility(false);
        setFollowingDivVisibility(false);
    };
    
    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (
        <div>
            <Navbar />
            <div className='flex justify-center items-center h-screen text-white font-light'>
                <div className='userBgDiv bg-estoque-bg p-7'>
                    <div className='flex justify-center'>
                        {followersDivVisibility && (
                            <div className='followersList absolute bg-stam-bg-3 border border-stam-border rounded-3xl overflow-hidden z-20 flex justify-center px-3'>
                                <div>
                                    <span
                                        className='closeFollowersList hover:bg-stam-bg-4 rounded-2xl px-2.5 py-1.5 cursor-pointer material-symbols-outlined z-10 text-3xl absolute right-1.5 top-1.5'
                                        onClick={toggleFollowersDivVisibility}
                                    >
                                        close
                                    </span>
                                </div>
                                <div>
                                    <div className='mt-5 relative'>
                                        <div className='flex justify-center'>
                                            <span className='searchFollowersIcon material-symbols-outlined absolute text-stam-border'>
                                                search
                                            </span>
                                            <input
                                                className='h-8 rounded-full outline-none bg-stam-bg-3 border border-stam-border caret-stam-orange pl-8'
                                                placeholder='Seguidores'
                                            />
                                        </div>
                                        <div className='flex justify-center'><hr className='hrFollowers border-0.5 border-stam-border mt-5' /></div>

                                    </div>
                                    <div className='pr-2 pl-2'>
                                        <div className='max-h-72 overflow-y-auto mt-4'>
                                            <table className='tabelaFollowers text-white flex justify-center'>
                                                <tbody>
                                                    {user.followers
                                                        .slice()
                                                        .sort((a, b) => a.name.localeCompare(b.name))
                                                        .map((follower) => (
                                                            <tr
                                                                key={follower._id}
                                                                className="cursor-pointer flex items-center hover:bg-stam-bg-4 rounded-xl"
                                                                onClick={() => handleUsuarioClick(follower.login)}
                                                            >
                                                                <td className='h-16 pl-3.5 pr-24 flex items-center space-x-2 overflow-hidden'>
                                                                    <div className='w-10 h-10 overflow-hidden rounded-full'>
                                                                        <img
                                                                            className="w-10 h-auto"
                                                                            src={follower.img}
                                                                            alt={follower.name}
                                                                        />
                                                                    </div>
                                                                    <div className='mt-1'>
                                                                        <p className="font-regular text-lg leading-none m-0">{follower.name}</p>
                                                                        <td className="font-light text-base text-gray-400 m-0">{follower.login}</td>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='flex justify-center'>
                        {followingDivVisibility && (
                            <div className='followersList absolute bg-stam-bg-3 border border-stam-border rounded-3xl overflow-hidden z-20 flex justify-center px-3'>
                                <div>
                                    <span
                                        className='closeFollowersList hover:bg-stam-bg-4 rounded-2xl px-2.5 py-1.5 cursor-pointer material-symbols-outlined z-10 text-3xl absolute right-1.5 top-1.5'
                                        onClick={toggleFollowingDivVisibility}
                                    >
                                        close
                                    </span>
                                </div>
                                <div>
                                    <div className='mt-5 relative'>
                                        <div className='flex justify-center'>
                                            <span className='searchFollowersIcon material-symbols-outlined absolute text-stam-border'>
                                                search
                                            </span>
                                            <input
                                                className='h-8 rounded-full outline-none bg-stam-bg-3 border border-stam-border caret-stam-orange pl-8'
                                                placeholder='Seguindo'
                                            />
                                        </div>
                                        <div className='flex justify-center'><hr className='hrFollowers border-0.5 border-stam-border mt-5' /></div>

                                    </div>
                                    <div className='pr-2 pl-2'>
                                        <div className='max-h-72 overflow-y-auto mt-4'>
                                            <table className='tabelaFollowers text-white flex justify-center'>
                                                <tbody>
                                                    {user.following
                                                        .slice()
                                                        .sort((a, b) => a.name.localeCompare(b.name))
                                                        .map((following) => (
                                                            <tr
                                                                key={following._id}
                                                                className="cursor-pointer flex items-center hover:bg-stam-bg-4 rounded-xl"
                                                                onClick={() => handleUsuarioClick(following.login)}
                                                            >
                                                                <td className='h-16 pl-3.5 pr-24 flex items-center space-x-2 overflow-hidden'>
                                                                    <div className='w-10 h-10 overflow-hidden rounded-full'>
                                                                        <img
                                                                            className="w-10 h-auto"
                                                                            src={following.img}
                                                                            alt={following.name}
                                                                        />
                                                                    </div>
                                                                    <div className='mt-1'>
                                                                        <p className="font-regular text-lg leading-none m-0">{following.name}</p>
                                                                        <td className="font-light text-base text-gray-400 m-0">{following.login}</td>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='bg-stam-bg-3 pl-8 pr-8 pt-6 pb-7 rounded-3xl space-y-6'>
                        <div className='space-x-8 flex items-center relative'>
                            <div className='bg-white w-44 h-44 rounded-xl overflow-hidden flex justify-center items-center'>
                                <img
                                    className="object-cover w-48 h-48"
                                    src={`${user.img}`}
                                    alt={`${user.img}`}
                                />
                            </div>
                            <div className='space-y-6 mb-1.5'>
                                <div>
                                    <p className='font-bold text-3xl flex items-center'>{user.fullName}</p>
                                    <p className='text-lg text-gray-300 font-thin leading-none m-0 tracking-wide'>@{user.login}</p>
                                </div>
                                <div>
                                    <p className='text-xl font-regular leading-none m-0'>{user.role}</p>
                                    <p className='text-xl text-gray-300 font-thin'>{user.department}</p>
                                </div>
                                <div className='flex items-center'>
                                    <div className='followDiv' style={{ display: user.login === storedLogin ? 'none' : 'flex' }}>
                                        {!isFollowing ? (
                                            <button
                                                className='buttonHover h-8 w-32 rounded-lg font-regular bg-stam-orange'
                                                onClick={handleFollow}>
                                                Seguir
                                            </button>
                                        ) : (
                                            <button
                                                className='buttonHover h-8 w-32 rounded-lg font-regular bg-stam-bg-4'
                                                onClick={handleUnfollow}>
                                                Seguindo
                                            </button>
                                        )}
                                    </div>
                                    {user.login === storedLogin && (
                                        <button className='h-8 w-32 rounded-lg font-regular border border-stam-border hover:bg-stam-bg-4 hover:border-stam-bg-4'>
                                            Editar Perfil
                                        </button>
                                    )}
                                    <div
                                        className='followersDiv cursor-pointer flex ml-7'
                                        onClick={toggleFollowersDivVisibility}
                                    >
                                        <p className='font-medium text-lg'>{user.followers.length}<strong className='font-thin text-gray-300'> Seguidores</strong></p>
                                    </div>
                                    <div
                                        className='followersDiv cursor-pointer ml-7'
                                        onClick={toggleFollowingDivVisibility}
                                    >
                                        <p className='font-medium text-lg'>{user.following.length}<strong className='font-thin text-gray-300'> Seguindo</strong></p>
                                    </div>
                                </div>
                            </div>
                            <div className='pl-14'>
                                <img className='system90 bg-stam-bg-4 absolute right-0 top-4' src='/system90.svg' />
                            </div>
                        </div>
                    </div>
                    {user.login === storedLogin && (
                        <div className='bg-stam-bg-3 p-7 rounded-3xl space-x-9 mt-8'>
                            <button className='buttonHover bg-stam-bg-4 w-80 font-light h-10 rounded-lg'>Adicionar educação</button>
                            <button className='buttonHover bg-stam-bg-4 w-80 font-light h-10 rounded-lg'>Adicionar carreira</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Usuarios;
