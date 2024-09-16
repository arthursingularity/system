import './piecebox.css';
import { useState } from 'react';

function PieceBox({ description, image, imgSize, onClick }) {
    const [isBoxClicked, setIsBoxClicked] = useState(false);

    function toggleBoxClicked() {
        setIsBoxClicked(!isBoxClicked);
        if (onClick) onClick()
    }

    return (
        <div>
            <div
                className={`pieceBoxDiv mt-6 overflow-hidden rounded-xl bg-stam-bg-3 flex justify-center items-center px-2 border border-stam-border hover:border-stam-orange cursor-pointer 
                            ${isBoxClicked ? 'w-96 absolute z-50 h-96 top-0 left-96' : 'w-36 h-40'}`}
                onClick={toggleBoxClicked}
            >
                <div className={`${isBoxClicked ? 'space-y-8' : 'space-y-3'} block text-white`}>
                    <div className="flex justify-center">
                        <img src={image} className={`${imgSize} ${isBoxClicked ? 'w-64' : 'mt-1'}`}/>
                    </div>
                    <p className={`text-center ${isBoxClicked ? 'text-2xl font-regular' : 'text-sm font-thin'}`}>{description}</p>
                </div>
            </div>
        </div>
    );
}

export default PieceBox;
