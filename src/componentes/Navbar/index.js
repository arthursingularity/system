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
            <li className='hover:text-stam-orange cursor-pointer'><a href='/componentes'>Componentes</a></li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
