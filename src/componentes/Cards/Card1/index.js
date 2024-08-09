import './Card1.css';
import { useState } from 'react';
import CardTexto from '../CardTexto';
import CardEtiqueta from '../CardEtiqueta';

function Card1() {
    const [isCardTextoVisible, setIsCardTextoVisible] = useState(false);

    const toggleCardTextoVisibility = () => {
        setIsCardTextoVisible(!isCardTextoVisible);
    };

    const handleVoltar = () => {
        setIsCardTextoVisible(false);
    };

    return (
        <div>
            <div className="card1 bg-stam-bg-3 rounded-3xl flex justify-center items-center relative">
                <span 
                    className={`material-symbols-outlined addButton text-white hover:text-stam-orange cursor-pointer ${isCardTextoVisible ? 'hidden' : ''}`}
                    onClick={toggleCardTextoVisibility}
                >
                    add
                </span>
                <CardTexto visibilidade={isCardTextoVisible ? 'flex' : 'hidden'} onVoltar={handleVoltar}/>
                <CardEtiqueta/>
            </div>
        </div>
    );
}

export default Card1;
