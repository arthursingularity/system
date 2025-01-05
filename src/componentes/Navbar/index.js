import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './nav_bar.css';
import SuprimentosBox from '../SuprimentosBox';

function Navbar() {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const [isSuprimentosVisible, setIsSuprimentosVisible] = useState(false);
  const hideTimeoutRef = useRef(null);
  const [inputValue, setInputValue] = useState('')
  const [usuarios, setUsuarios] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [profilePic, setProfilePic] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [notificationsDiv, setNotificationsDiv] = useState(false)
  const [isHovered, setIsHovered] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/usuarios')
      .then(response => {
        setUsuarios(response.data);
        const storedLogin = localStorage.getItem('login');
        setLoggedInUser(storedLogin);

        const loggedUser = response.data.find(usuario => usuario.login === storedLogin);
        if (loggedUser) {
          setProfilePic(loggedUser.img)
          setNotifications(loggedUser.notifications)
        }
      })
      .catch(error => {
        console.error('Erro:', error);
      });

    const handleRouteChange = () => {
      setCurrentPage(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter2 = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsHovered(true);
  };

  const handleMouseLeave2 = () => {
    const id = setTimeout(() => {
      setIsHovered(false);
    }, 100);
    setTimeoutId(id);
  };

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    setIsSuprimentosVisible(true);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setIsSuprimentosVisible(false);
    }, 100);
  };

  function handleSearchPeopleInputChange(e) {
    setInputValue(e.target.value)
  }

  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario.name && usuario.name.toLowerCase().startsWith(inputValue.toLowerCase())
  );

  const handleUsuarioClick = (login) => {
    navigate(`/usuarios/${login}`);
    window.location.reload()
  };

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login')
  };

  function notificationsDivVisibility() {
    setNotificationsDiv(visibility => !visibility)
  }

  function handleDeleteNotification(notificationId) {
    const userId = usuarios.find(user => user.login === loggedInUser)._id;

    axios.delete(`http://localhost:4000/usuarios/${userId}/notifications/${notificationId}`)
      .then(response => {
        setNotifications(prevNotifications =>
          prevNotifications.filter(notification => notification.id !== notificationId)
        );
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('Erro ao deletar notificação:', error);
      });
  }

  return (
    <div>
      <nav className="font-light">
        <ul className="lista fixed flex z-50 justify-center items-center text-white list-none w-full bg-stam-bg-3 border-b border-stam-border">
          <li><a href='/'><img src='/imagens/systemlogo.png' id='logo' className="navbarLogo absolute w-24 z-20 left-5" alt='logoSymbol' /></a></li>
          <div className='md:flex hidden space-x-8 flex'>
            <li className='hover:text-stam-orange cursor-pointer'><a href='/'>Página inicial</a></li>
            {loggedInUser === "arthurm" && (
              <li className='hover:text-stam-orange cursor-pointer'>
                <a href='/administracao'>Administração</a>
              </li>
            )}
            <li className='hover:text-stam-orange cursor-pointer'><a href='/notificar'>Notificar</a></li>
            <li
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className={`flex hover:text-stam-orange cursor-pointer ${isSuprimentosVisible ? 'text-stam-orange' : 'hover:text-stam-orange'}`}>
                Suprimentos
                <span class="material-symbols-outlined keyboard_arrow_down">
                  keyboard_arrow_down
                </span>
                <SuprimentosBox
                  isVisible={isSuprimentosVisible}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </li>
            <li>
              <div>
                <div
                  className={`cursor-pointer hover:text-stam-orange flex ${isHovered ? 'text-stam-orange' : 'hover:text-stam-orange'}`}
                  onMouseEnter={handleMouseEnter2}
                  onMouseLeave={handleMouseLeave2}
                >
                  Produção
                  <span class="material-symbols-outlined keyboard_arrow_down">
                    keyboard_arrow_down
                  </span>
                </div>
                {isHovered && (
                  <div className='productionBox p-1.5 bg-stam-bg-3 fixed -ml-11 mt-4 rounded-xl border border-stam-border'
                    onMouseEnter={handleMouseEnter2}
                    onMouseLeave={handleMouseLeave2}>
                    <a href='/embalagem'>
                      <div className='flex items-center p-4 cursor-pointer hover:bg-stam-bg-4 rounded-lg'>
                        <span class="material-symbols-outlined keyboard_arrow_down">
                          package
                        </span>
                        <p className='ml-2 mr-2'>CPT - Embalagem</p>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </li>
            <li className='hover:text-stam-orange cursor-pointer'><a href='/componentes'>Componentes</a></li>
          </div>
        </ul>
        <ul className="lista3 fixed justify-center items-center flex list-none md:right-6 right-2 z-50 space-x-2">
          <div className='md:flex hidden'>
            <span className="material-symbols-outlined searchPeopleIcon absolute text-stam-border text-2xl z-40">
              search
            </span>
            <input
              className='searchUsers bg-stam-bg-3 border border-stam-border rounded-full outline-none caret-stam-orange pl-8 text-white hover:border-stam-orange'
              placeholder='Pessoas'
              value={inputValue}
              onChange={handleSearchPeopleInputChange}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^A-ZÀ-Úa-zà-ú\s]/g, '')
              }}
            >
            </input>
          </div>
          <span
            className='material-symbols-outlined relative notificationIcon text-white text-xl rounded-full px-1.5 py-0.5 mt-3 cursor-pointer border border-stam-border hover:bg-stam-bg-4'
            onClick={notificationsDivVisibility}
          >
            {notifications.length > 0 && (
              <div className='notificationRedDiv bg-stam-vermelho absolute rounded-full flex items-center justify-center'>
                <p className='notificationQuantity font-medium'>
                  {notifications.length}
                </p>
              </div>
            )}
            notifications
          </span>
          {notificationsDiv && (
            <div className='notificationDiv absolute bg-stam-bg-3 p-2 rounded-xl border border-stam-border z-50'>
              <p className='flex justify-center text-white font-medium py-1'>Notificações</p>
              {notifications.length < 1 && (
                <div>
                  <hr className='text-white px-3 py-1 border-1 border-stam-border mt-2' />
                  <p className='text-white px-3 py-1 font-thin'>Sem notificações por enquanto.</p>
                </div>
              )}
              {notifications
                .slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((notification, index) => (
                  <div key={index}>
                    {notifications.length >= 1 && (
                      <hr className='text-white px-3 py-1 border-1 border-stam-border mt-2' />
                    )}
                    <p className='flex items-center text-white'>
                      <div className='px-0.5'>
                        <span
                          className='closeNotificationIcon material-symbols-outlined cursor-pointer rounded-lg hover:bg-stam-bg-4 p-1.5'
                          onClick={() => handleDeleteNotification(notification.id)}
                        >close
                        </span>
                      </div>
                      <div
                        className='hover:bg-stam-bg-4 cursor-pointer rounded-lg w-full flex items-center'
                        onClick={() => {
                          handleUsuarioClick(notification.login);
                          notificationsDivVisibility();
                        }}>
                        <div className='notificationDiv2 text-base flex items-center space-x-4 pl-2.5 pt-2.5 pb-'>
                          <div className='absolute mb-2 border border-stam-orange p-1 rounded-full'>
                            <div className='rounded-full w-9 h-9 overflow-hidden'>
                              <img className='object-cover rounded-full w-9 h-9' src={notification.img} />
                            </div>
                          </div>
                          <div className='mb-2 pl-10 leading-none'>
                            <div dangerouslySetInnerHTML={{ __html: notification.message.replace(/\n/g, '<br />') }} />
                            <p className='mt-0.5 text-gray-400 text-sm'>
                              <span className='font-regular text-stam-orange'>
                                @{notification.login}
                                <strong className='text-gray-300 font-light'> - {notification.department}</strong>
                              </span>
                            </p>

                            <p className='text-xs font-light mt-0.5'>
                              {notification.createdAt}
                            </p>
                          </div>

                          <p className='font-medium'></p>
                        </div>

                      </div>
                    </p>
                  </div>
                ))}
            </div>
          )}
          <li>
            <div className='user md:bg-stam-orange text-black rounded-full cursor-pointer flex items-center space-x-1 pl-1 py-1 pr-2.5'
              onClick={() => handleUsuarioClick(loggedInUser)}>
              <div className='border border-stam-orange p-1 rounded-full md:p-0'>
                <div>
                  <img
                    src={profilePic || 'default_image_url'}
                    className='md:w-6 md:h-6 w-8 h-8 object-cover rounded-full' />
                </div>
              </div>
              <div className='font-medium md:flex hidden'>
                {loggedInUser}
              </div>
            </div>
            {inputValue && (
              <div className='overflow-hidden peopleSuggestion bg-stam-bg-3 absolute rounded-xl border border-stam-border text-white font-light pt-2'>
                <div className="overflow-y-auto h-full rounded-lg flex justify-center">
                  <table className='flex justify-center'>
                    <tbody>
                      {usuariosFiltrados.map(usuario => (
                        <tr key={usuario._id} className='hover:bg-stam-bg-4'>
                          <td
                            className="cursor-pointer rounded-lg w-48 h-12"
                            onClick={() => handleUsuarioClick(usuario.login)}
                          >
                            <div className='flex items-center ml-2 space-x-2'>
                              <div className='w-8 h-8 overflow-hidden rounded-full '>
                                <img className='object-cover' src={`${usuario.img}`} />
                              </div>
                              <div className='text-left'>
                                <div className='leading-none -mb-1 mt-1.5'>
                                  {usuario.name}
                                </div>
                                <div className='text-base font-thin text-gray-400'>
                                  {usuario.login}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </li>
          <span
            className="md:flex hidden material-symbols-rounded logout text-xl text-stam-border border border-stam-border rounded-full cursor-pointer hover:bg-texos-red hover:border-texos-red hover:text-white"
            onClick={handleLogout}
          >
            logout
          </span>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
