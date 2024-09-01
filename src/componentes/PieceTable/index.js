import PieceBox from '../PieceBox';
import './piecetable.css';
import { useState } from 'react';

function PieceTable({ isPieceVisible }) {
    const [inputValue, setInputValue] = useState('');
    const [boxClicked, setBoxClicked] = useState(false);

    function handleInputChange(event) {
        const upperCaseValue = event.target.value.toUpperCase();
        setInputValue(upperCaseValue);
    }

    function handleBoxClick() {
        setBoxClicked(!boxClicked);
    }

    return (
        <div>
            <div className='flex justify-center'>
                <div className={`pieceTableDiv flex justify-center absolute bg-stam-bg-3 z-30 border border-stam-border duration-300 p-5 ${isPieceVisible ? 'scale-100' : 'scale-0'}`}>
                        <div className='block overflow-hidden overflow-y-auto overflow-x-hidden'>
                            <div className='flex justify-center'>
                                <input
                                    className='inputPieceDescription bg-stam-bg-3 border border-stam-border w-80 outline-none caret-stam-orange rounded-full text-white pl-3 font-light'
                                    placeholder='Descrição'
                                    value={inputValue}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <div className='flex space-x-4'>
                                    <PieceBox description={"LINGUETA 1008 GRANDE"} imgSize={"w-20"} image={"./lingueta1008grande.svg"} onClick={handleBoxClick} />
                                    <PieceBox description={"TAMPA LINGUETA 2002/2004"} imgSize={"w-16"} image={"./tampalingueta2002.svg"} onClick={handleBoxClick} />
                                    <PieceBox description={"ESPELHO 804"} imgSize={"w-20"} image={"./espelho804.svg"} onClick={handleBoxClick} />
                                    <PieceBox description={"ESPELHO 1801"} imgSize={"w-20"} image={"./espelho1801.svg"} onClick={handleBoxClick} />
                                    <PieceBox description={"ESPELHO 1801 - INOX 430"} imgSize={"w-20"} image={"./espelho1801inox.svg"} onClick={handleBoxClick} />
                                    <PieceBox description={"ESPELHO 804 - INOX 430"} imgSize={"w-20"} image={"./espelho804inox.svg"} onClick={handleBoxClick} />
                                    <PieceBox description={"TAMPA LINGUETA 2002/2004"} imgSize={"w-16"} image={"./tampalingueta2002.svg"} onClick={handleBoxClick} />
                                    <div className={`blurPieceTableBg absolute bg-stam-bg-3 z-30 border border-stam-border ${boxClicked ? 'visible' : 'invisible'}`}></div>
                                </div>
                                <div className='flex space-x-4'>
                                    <PieceBox description={"LINGUETA 1008 GRANDE"} imgSize={"w-20"} image={"./lingueta1008grande.svg"} onClick={handleBoxClick} />
                                    <PieceBox description={"TAMPA LINGUETA 2002/2004"} imgSize={"w-16"} image={"./tampalingueta2002.svg"} onClick={handleBoxClick} />
                                    <PieceBox description={"ESPELHO 804"} imgSize={"w-20"} image={"./espelho804.svg"} onClick={handleBoxClick} />
                                    <PieceBox description={"ESPELHO 1801"} imgSize={"w-20"} image={"./espelho1801.svg"} onClick={handleBoxClick} />
                                    <PieceBox description={"TAMPA LINGUETA 2002/2004"} imgSize={"w-16"} image={"./tampalingueta2002.svg"} onClick={handleBoxClick} />
                                    <PieceBox description={"TAMPA LINGUETA 2002/2004"} imgSize={"w-16"} image={"./tampalingueta2002.svg"} onClick={handleBoxClick} />
                                    <PieceBox description={"TAMPA LINGUETA 2002/2004"} imgSize={"w-16"} image={"./tampalingueta2002.svg"} onClick={handleBoxClick} />
                                </div>
                                <div className='flex space-x-4'>
                                    <PieceBox description={"LINGUETA 1008 GRANDE"} imgSize={"w-20"} image={"./lingueta1008grande.svg"} onClick={handleBoxClick} />
                                    <PieceBox description={"TAMPA LINGUETA 2002/2004"} imgSize={"w-16"} image={"./tampalingueta2002.svg"} onClick={handleBoxClick} />
                                    <PieceBox description={"ESPELHO 804"} imgSize={"w-20"} image={"./espelho804.svg"} onClick={handleBoxClick} />
                                    <PieceBox description={"ESPELHO 1801"} imgSize={"w-20"} image={"./espelho1801.svg"} onClick={handleBoxClick} />
                                    <PieceBox description={"TAMPA LINGUETA 2002/2004"} imgSize={"w-16"} image={"./tampalingueta2002.svg"} onClick={handleBoxClick} />
                                    <PieceBox description={"TAMPA LINGUETA 2002/2004"} imgSize={"w-16"} image={"./tampalingueta2002.svg"} onClick={handleBoxClick} />
                                    <PieceBox description={"TAMPA LINGUETA 2002/2004"} imgSize={"w-16"} image={"./tampalingueta2002.svg"} onClick={handleBoxClick} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default PieceTable;
