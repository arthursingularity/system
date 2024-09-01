import { useState } from 'react';
import Navbar from '../../componentes/Navbar';
import './ambient.css';

function Ambient() {
    const [isVisible, setIsVisible] = useState(false)

    function toggleVisibility() {
        setIsVisible(!isVisible)
    }

    return (
        <div>
            <Navbar />
            <div className='flex justify-center'>
                <div className='space-y-5'>
                    <button
                        className='mt-32 font-light text-white bg-stam-bg-3 rounded-full px-5 py-1 hover:bg-stam-bg-4'
                        onClick={toggleVisibility}
                        >Botão
                    </button>
                    <div className={`bg-stam-bg-3 w-36 h-36 duration-200 ${isVisible ? 'scale-100' : 'scale-0'}`}></div>
                </div>
            </div>
        </div>
    );
}

export default Ambient;
