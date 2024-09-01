import './piecebox.css';
import { useState } from 'react';

function PieceBox({ description, image, imgSize, props, onClick }) {
    const [isBoxClicked, setIsBoxClicked] = useState(false);

    function toggleBoxClicked() {
        setIsBoxClicked(!isBoxClicked);
        if (onClick) onClick()
    }

    return (
        <div>
            <div
                className={`pieceBoxDiv mt-6 py-3 rounded-xl bg-stam-bg-3 px-2 border border-stam-border hover:border-stam-orange cursor-pointer 
                            ${isBoxClicked ? 'w-96 absolute z-50 h-96 top-0 left-96 flex justify-center items-center' : 'w-36 h-40'}`}
                onClick={toggleBoxClicked}
            >
                <div className={`${isBoxClicked ? 'space-y-9' : 'space-y-4'} block`}>
                    <div className="flex justify-center">
                        <img src={image} className={`${imgSize} ${isBoxClicked ? 'w-60' : 'mt-1'}`} alt='Piece Image' />
                    </div>
                    <p className={`font-light text-center text-white ${isBoxClicked ? 'text-2xl' : 'text-sm'}`}>{description}</p>
                </div>
            </div>
        </div>
    );
}

export default PieceBox;
