import "./palletbox.css";
import React, { useEffect, useState } from 'react';

function PalletBox({ values, onInputChange, onClose, isVisible, descricao, togglePieceTableVisibility, updateStockPercentage }) {
    const [animationClass, setAnimationClass] = useState('');
    const [activeIcon, setActiveIcon] = useState(null);
    const [matchingInputPositions, setMatchingInputPositions] = useState([]);
    const [searchTriggered, setSearchTriggered] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setAnimationClass('visible');
        } else {
            setAnimationClass('hide');
            const timer = setTimeout(() => {
                setAnimationClass('');
            }, 230);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    useEffect(() => {
        document.querySelectorAll('.caixasInput').forEach((input, index) => {
            const storedValue = localStorage.getItem(`caixasInputValue-${index}`);
            if (storedValue) {
                input.value = storedValue;
            }
        });
    }, []);

    const handleInputChange = (index, value) => {
        const cleanedValue = value.replace(/\D/g, '');
        localStorage.setItem(`caixasInputValue-${index}`, cleanedValue);
        updateStockPercentage();
    };

    useEffect(() => {
        if (searchTriggered) {
            const trimmedDescricao = descricao.trim();
            const matchedIndices = values.map((value, index) => value.trim() === trimmedDescricao ? index : null).filter(index => index !== null);
            setMatchingInputPositions(matchedIndices);
            setSearchTriggered(false);
        }
    }, [searchTriggered, descricao, values]);

    const handleClearClick = (index) => {
        onInputChange(index, '');
        const caixasInput = document.querySelectorAll('.caixasInput')[index];
        if (caixasInput) {
            caixasInput.value = '';
        }
        localStorage.removeItem(`caixasInputValue-${index}`);
        updateStockPercentage();
    };

    const handlePasteClick = (index) => {
        navigator.clipboard.readText().then(text => {
            const cleanedText = cleanInputValue(text);
            onInputChange(index, cleanedText);
        }).catch(err => {
            console.error('Failed to paste text: ', err);
        });
    };

    const handleChange = (index, value) => {
        const cleanedValue = cleanInputValue(value);
        onInputChange(index, cleanedValue);
        updateStockPercentage();
    };

    const cleanInputValue = (value) => {
        return value.replace(/\s{2,}/g, ' ').trim();
    };

    const isAnyInputMatchDescricao = (startIndex, endIndex) => {
        const trimmedDescricao = descricao.trim();
        return values.slice(startIndex, endIndex).some(value =>
            value.trim() !== '' && value.trim() === trimmedDescricao
        );
    };

    const getInputProductClass = (value, descricao) => {
        const isMatch = value === descricao.trim() && value !== "";
        return `bg-stam-bg-3 inputProduct border rounded-full outline-none font-light text-white px-2 hover:border-stam-orange ${isMatch ? 'border-stam-border text-stam-orange font-semibold' : 'border-stam-border'}`;
    };

    const getInputProduct2Class = (value, descricao) => {
        const isMatch = value === descricao.trim() && value !== "";
        return `bg-stam-bg-3 inputProduct2 border rounded-full outline-none font-light text-white px-2 hover:border-stam-orange ${isMatch ? 'border-stam-border text-stam-orange font-semibold' : 'border-stam-border'}`;
    };

    const getCaixasInputClass = (value, descricao) => {
        const isMatch = value === descricao.trim() && value !== "";
        return `caixasInput placeholder-gray-600 rounded-full font-light text-white bg-transparent border outline-none w-10 pl-2 ml-1 caret-stam-orange ${isMatch ? 'font-semibold text-stam-orange' : 'border-stam-border hover:border-stam-orange'}`;
    };

    const getEnderecarDiv = (value, descricao) => {
        const isMatch = value === descricao.trim() && value !== "";
        return `enderecarBorders flex border p-1 rounded-full ${isMatch ? 'font-semibold text-stam-orange' : 'border-stam-border hover:border-stam-orange'}`;
    };

    const getEnderecar2Div = (value, descricao) => {
        const isMatch = value === descricao.trim() && value !== "";
        return `flex border p-1 rounded-full ml-1.5 ${isMatch ? 'font-semibold text-stam-orange' : 'border-stam-border hover:border-stam-orange'}`;
    };

    return (
        <div className="flex justify-center items-center z-50">
            <div className={`bg-stam-bg-3 palletBox absolute border border-stam-border p-2 ${animationClass}`}>
                <span
                    className="closePalletBox material-symbols-outlined z-30 absolute right-0 top-0 text-white hover:bg-stam-border rounded-full bg-stam-bg-4 p-1 cursor-pointer"
                    onClick={onClose}
                >
                    close
                </span>
                <div className={`border ${isAnyInputMatchDescricao(0, 9) ? 'border-stam-orange' : 'border-stam-border'} borders`}>
                    <div className="bg-stam-orange orangeBoxes absolute flex justify-center items-center rounded-xl">
                        <p className="font-medium text-white text-6xl">3</p>
                    </div>
                    <div className="flex">
                        <div className="space-y-1">
                            {values.slice(0, 3).map((value, index) => (
                                <div className="relative" key={index}>
                                    <div className={getEnderecarDiv(value, descricao)}>
                                        <input
                                            value={value}
                                            onChange={(e) => handleChange(index, e.target.value.trim())}
                                            className={getInputProductClass(value, descricao)}
                                            placeholder="Endereçar"
                                        />
                                        <input
                                            className={getCaixasInputClass(value, descricao)}
                                            placeholder="CX"
                                            maxLength={2}
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                        />
                                    </div>
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined arrowPasteIcon p-1.5"
                                            onClick={() => handlePasteClick(index)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-white material-symbols-outlined absolute cursor-pointer p-1.5 rounded-full"
                                            onClick={() => {
                                                handleClearClick(index);
                                            }}
                                        >
                                            close
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="space-y-1">
                            {values.slice(3, 6).map((value, index) => (
                                <div className="relative" key={index + 3}>
                                    <div className={getEnderecar2Div(value, descricao)}>
                                        <input
                                            value={value}
                                            onChange={(e) => handleChange(index + 3, e.target.value.trim())}
                                            className={getInputProduct2Class(value, descricao)}
                                            placeholder="Endereçar"
                                        />
                                        <input
                                            className={getCaixasInputClass(value, descricao)}
                                            placeholder="CX"
                                            maxLength={2}
                                            onChange={(e) => handleInputChange(index + 3, e.target.value)}
                                        />
                                    </div>
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined arrowPasteIcon p-1.5"
                                            onClick={() => handlePasteClick(index + 3)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-white material-symbols-outlined absolute cursor-pointer p-1.5 rounded-full"
                                            onClick={() => {
                                                handleClearClick(index + 3)
                                            }}
                                        >
                                            close
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="space-y-1">
                            {values.slice(6, 9).map((value, index) => (
                                <div className="relative" key={index + 6}>
                                    <div className={getEnderecar2Div(value, descricao)}>
                                        <input
                                            value={value}
                                            onChange={(e) => handleChange(index + 6, e.target.value.trim())}
                                            className={getInputProduct2Class(value, descricao)}
                                            placeholder="Endereçar"
                                        />
                                        <input
                                            className={getCaixasInputClass(value, descricao)}
                                            placeholder="CX"
                                            maxLength={2}
                                            onChange={(e) => handleInputChange(index + 6, e.target.value)}
                                        />
                                    </div>
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined arrowPasteIcon p-1.5"
                                            onClick={() => handlePasteClick(index + 6)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-white material-symbols-outlined absolute cursor-pointer p-1.5 rounded-full"
                                            onClick={() => {
                                                handleClearClick(index + 6)
                                            }}
                                        >
                                            close
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={`border ${isAnyInputMatchDescricao(9, 18) ? 'border-stam-orange' : 'border-stam-border'} borders mt-2`}>
                    <div className="bg-stam-orange orangeBoxes absolute flex justify-center items-center rounded-xl">
                        <p className="font-medium text-white text-6xl">2</p>
                    </div>
                    <div className="flex">
                        <div className="space-y-1">
                            {values.slice(9, 12).map((value, index) => (
                                <div className="relative" key={index + 9}>
                                    <div className={getEnderecarDiv(value, descricao)}>
                                        <input
                                            value={value}
                                            onChange={(e) => handleChange(index + 9, e.target.value.trim())}
                                            className={getInputProductClass(value, descricao)}
                                            placeholder="Endereçar"
                                        />
                                        <input
                                            className={getCaixasInputClass(value, descricao)}
                                            placeholder="CX"
                                            maxLength={2}
                                            onChange={(e) => handleInputChange(index + 9, e.target.value)}
                                        />
                                    </div>
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined arrowPasteIcon p-1.5"
                                            onClick={() => handlePasteClick(index + 9)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-white material-symbols-outlined absolute cursor-pointer p-1.5 rounded-full"
                                            onClick={() => {
                                                handleClearClick(index + 9)
                                            }}
                                        >
                                            close
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="space-y-1">
                            {values.slice(12, 15).map((value, index) => (
                                <div className="relative" key={index + 12}>
                                    <div className={getEnderecar2Div(value, descricao)}>
                                        <input
                                            value={value}
                                            onChange={(e) => handleChange(index + 12, e.target.value.trim())}
                                            className={getInputProduct2Class(value, descricao)}
                                            placeholder="Endereçar"
                                        />
                                        <input
                                            className={getCaixasInputClass(value, descricao)}
                                            placeholder="CX"
                                            maxLength={2}
                                            onChange={(e) => handleInputChange(index + 12, e.target.value)}
                                        />
                                    </div>
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined arrowPasteIcon p-1.5"
                                            onClick={() => handlePasteClick(index + 12)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-white material-symbols-outlined absolute cursor-pointer p-1.5 rounded-full"
                                            onClick={() => {
                                                handleClearClick(index + 12)
                                            }}
                                        >
                                            close
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="space-y-1">
                            {values.slice(15, 18).map((value, index) => (
                                <div className="relative" key={index + 15}>
                                    <div className={getEnderecar2Div(value, descricao)}>
                                        <input
                                            value={value}
                                            onChange={(e) => handleChange(index + 15, e.target.value.trim())}
                                            className={getInputProduct2Class(value, descricao)}
                                            placeholder="Endereçar"
                                        />
                                        <input
                                            className={getCaixasInputClass(value, descricao)}
                                            placeholder="CX"
                                            maxLength={2}
                                            onChange={(e) => handleInputChange(index + 15, e.target.value)}
                                        />
                                    </div>
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined arrowPasteIcon p-1.5"
                                            onClick={() => handlePasteClick(index + 15)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-white material-symbols-outlined absolute cursor-pointer p-1.5 rounded-full"
                                            onClick={() => {
                                                handleClearClick(index + 15)
                                            }}
                                        >
                                            close
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={`border ${isAnyInputMatchDescricao(18, 27) ? 'border-stam-orange' : 'border-stam-border'} borders mt-2`}>
                    <div className="bg-stam-orange orangeBoxes absolute flex justify-center items-center rounded-xl">
                        <p className="font-medium text-white text-6xl">1</p>
                    </div>
                    <div className="flex">
                        <div className="space-y-1">
                            {values.slice(18, 21).map((value, index) => (
                                <div className="relative" key={index + 18}>
                                    <div className={getEnderecarDiv(value, descricao)}>
                                        <input
                                            value={value}
                                            onChange={(e) => handleChange(index + 18, e.target.value.trim())}
                                            className={getInputProductClass(value, descricao)}
                                            placeholder="Endereçar"
                                        />
                                        <input
                                            className={getCaixasInputClass(value, descricao)}
                                            placeholder="CX"
                                            maxLength={2}
                                            onChange={(e) => handleInputChange(index + 18, e.target.value)}
                                        />
                                    </div>
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined arrowPasteIcon p-1.5"
                                            onClick={() => handlePasteClick(index + 18)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-white material-symbols-outlined absolute cursor-pointer p-1.5 rounded-full"
                                            onClick={() => {
                                                handleClearClick(index + 18)
                                            }}
                                        >
                                            close
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="space-y-1">
                            {values.slice(21, 24).map((value, index) => (
                                <div className="relative" key={index + 21}>
                                    <div className={getEnderecar2Div(value, descricao)}>
                                        <input
                                            value={value}
                                            onChange={(e) => handleChange(index + 21, e.target.value.trim())}
                                            className={getInputProduct2Class(value, descricao)}
                                            placeholder="Endereçar"
                                        />
                                        <input
                                            className={getCaixasInputClass(value, descricao)}
                                            placeholder="CX"
                                            maxLength={2}
                                            onChange={(e) => handleInputChange(index + 21, e.target.value)}
                                        />
                                    </div>
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined arrowPasteIcon p-1.5"
                                            onClick={() => handlePasteClick(index + 21)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-white material-symbols-outlined absolute cursor-pointer p-1.5 rounded-full"
                                            onClick={() => {
                                                handleClearClick(index + 21)
                                            }}
                                        >
                                            close
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="space-y-1">
                            {values.slice(24, 27).map((value, index) => (
                                <div className="relative" key={index + 24}>
                                    <div className={getEnderecar2Div(value, descricao)}>
                                        <input
                                            value={value}
                                            onChange={(e) => handleChange(index + 24, e.target.value.trim())}
                                            className={getInputProduct2Class(value, descricao)}
                                            placeholder="Endereçar"
                                        />
                                        <input
                                            className={getCaixasInputClass(value, descricao)}
                                            placeholder="CX"
                                            maxLength={2}
                                            onChange={(e) => handleInputChange(index + 24, e.target.value)}
                                        />
                                    </div>
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined arrowPasteIcon p-1.5"
                                            onClick={() => handlePasteClick(index + 24)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-white material-symbols-outlined absolute cursor-pointer p-1.5 rounded-full"
                                            onClick={() => {
                                                handleClearClick(index + 24)
                                            }}
                                        >
                                            close
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PalletBox;
