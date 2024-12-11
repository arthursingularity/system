import "./palletbox.css";
import React, { useEffect, useState } from 'react';

function PalletBox({ values, onInputChange, onClose, isVisible, descricao, togglePieceTableVisibility }) {
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
        if (searchTriggered) {
            const trimmedDescricao = descricao.trim();
            const matchedIndices = values.map((value, index) => value.trim() === trimmedDescricao ? index : null).filter(index => index !== null);
            setMatchingInputPositions(matchedIndices);
            setSearchTriggered(false);
        }
    }, [searchTriggered, descricao, values]);

    const handleCopyClick = (index) => {
        const textToCopy = values[index];
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    setActiveIcon(index);
                    setTimeout(() => {
                        setActiveIcon(null);
                    }, 1000);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        }
    };

    const handleClearClick = (index) => {
        onInputChange(index, '');
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
        return `bg-stam-bg-3 inputProduct border border-stam-border rounded-full outline-none font-light text-white px-2 ${value === descricao.trim() && value !== "" ? 'text-stam-orange font-semibold' : ''
            }`;
    };

    const getInputProduct2Class = (value, descricao) => {
        return `bg-stam-bg-3 inputProduct2 border border-stam-border rounded-full outline-none font-light text-white px-2 ${value === descricao.trim() && value !== "" ? 'text-stam-orange font-semibold' : ''
            }`;
    };

    return (
        <div className="flex justify-center items-center z-50">
            <div className={`bg-stam-bg-3 palletBox absolute border border-stam-border p-4 ${animationClass}`}>
                <span
                    className="closePalletBox material-symbols-outlined absolute right-2 top-2 text-white hover:bg-stam-border rounded-full bg-stam-bg-4 p-1 cursor-pointer"
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
                                    <input
                                        value={value}
                                        onChange={(e) => handleChange(index, e.target.value.trim())}
                                        className={getInputProductClass(value, descricao)}
                                        placeholder="Endereçar"
                                    />
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
                                    <input
                                        value={value}
                                        onChange={(e) => handleChange(index + 3, e.target.value.trim())}
                                        className={getInputProduct2Class(value, descricao)}
                                        placeholder="Endereçar"
                                    />
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
                                    <input
                                        value={value}
                                        onChange={(e) => handleChange(index + 6, e.target.value.trim())}
                                        className={getInputProduct2Class(value, descricao)}
                                        placeholder="Endereçar"
                                    />
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
                <div className={`border ${isAnyInputMatchDescricao(9, 18) ? 'border-stam-orange' : 'border-stam-border'} borders mt-3`}>
                    <div className="bg-stam-orange orangeBoxes absolute flex justify-center items-center rounded-xl">
                        <p className="font-medium text-white text-6xl">2</p>
                    </div>
                    <div className="flex">
                        <div className="space-y-1">
                            {values.slice(9, 12).map((value, index) => (
                                <div className="relative" key={index + 9}>
                                    <input
                                        value={value}
                                        onChange={(e) => handleChange(index + 9, e.target.value.trim())}
                                        className={getInputProductClass(value, descricao)}
                                        placeholder="Endereçar"
                                    />
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
                                    <input
                                        value={value}
                                        onChange={(e) => handleChange(index + 12, e.target.value.trim())}
                                        className={getInputProduct2Class(value, descricao)}
                                        placeholder="Endereçar"
                                    />
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
                                    <input
                                        value={value}
                                        onChange={(e) => handleChange(index + 15, e.target.value.trim())}
                                        className={getInputProduct2Class(value, descricao)}
                                        placeholder="Endereçar"
                                    />
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
                <div className={`border ${isAnyInputMatchDescricao(18, 27) ? 'border-stam-orange' : 'border-stam-border'} borders mt-3`}>
                    <div className="bg-stam-orange orangeBoxes absolute flex justify-center items-center rounded-xl">
                        <p className="font-medium text-white text-6xl">1</p>
                    </div>
                    <div className="flex">
                        <div className="space-y-1">
                            {values.slice(18, 21).map((value, index) => (
                                <div className="relative" key={index + 18}>
                                    <input
                                        value={value}
                                        onChange={(e) => handleChange(index + 18, e.target.value.trim())}
                                        className={getInputProductClass(value, descricao)}
                                        placeholder="Endereçar"
                                    />
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
                                    <input
                                        value={value}
                                        onChange={(e) => handleChange(index + 21, e.target.value.trim())}
                                        className={getInputProduct2Class(value, descricao)}
                                        placeholder="Endereçar"
                                    />
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
                                    <input
                                        value={value}
                                        onChange={(e) => handleChange(index + 24, e.target.value.trim())}
                                        className={getInputProduct2Class(value, descricao)}
                                        placeholder="Endereçar"
                                    />
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
