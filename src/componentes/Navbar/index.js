import { useState, useEffect, useRef } from 'react';
import './nav_bar.css';
import SuprimentosBox from '../SuprimentosBox';

function Navbar() {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const [isSuprimentosVisible, setIsSuprimentosVisible] = useState(false);
  const hideTimeoutRef = useRef(null);

  useEffect(() => {
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

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    setIsSuprimentosVisible(true);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setIsSuprimentosVisible(false);
    }, 200); // 200 milissegundos de atraso
  };

  return (
    <div>
      <nav className="navegação">
        <ul className="lista fixed z-50 justify-center items-center flex text-white list-none w-full bg-stam-bg-3 font-light">
          <li><a href='/'><img src='system-logo.png' id='logo' className="navbarLogo absolute w-24 z-20 left-5" alt='logoSymbol' /></a></li>
          <li className={`options ${currentPage === '/sobre' ? 'active' : ''}`}><a href='/sobre'>Sobre</a></li>
          <li className={`options ${currentPage === '/tecnor' ? 'active' : ''}`}><a href='/tecnor'>Tecnor</a></li>
          <li
            className={`options ${currentPage === '/suprimentos' ? 'active' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-haspopup="true"
            aria-expanded={isSuprimentosVisible}
          >
            <div className='flex'>
              Suprimentos
              <span class="material-symbols-outlined keyboard_arrow_down">
                keyboard_arrow_down
              </span>
            </div>
          </li>
          <li className={`options ${currentPage === '/proposta' ? 'active' : ''}`}><a href='/proposta'>Proposta</a></li>
        </ul>
        <ul className="lista3 fixed justify-center items-center flex list-none right-16 font-medium z-50">
          <li className='user font-medium bg-stam-orange rounded-full'>ARTHURM</li>
        </ul>
        <ul className="lista3 mr-4 fixed justify-center items-center flex list-none right-0 font-medium z-50">
          <a href='/login'>
            <span className="material-symbols-rounded logout text-xl text-stam-border border border-stam-border rounded-full cursor-pointer hover:bg-texos-red hover:border-texos-red hover:text-white">
              logout
            </span>
          </a>
        </ul>
      </nav>
      <SuprimentosBox
        isVisible={isSuprimentosVisible}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}

export default Navbar;
