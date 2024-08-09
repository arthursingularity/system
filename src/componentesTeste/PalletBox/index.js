import "./palletbox.css";
import React, { useEffect, useState } from 'react';

function PalletBox({ values, onInputChange, onClose, isVisible }) {
    const [animationClass, setAnimationClass] = useState('');
    const [activeIcon, setActiveIcon] = useState(null);

    useEffect(() => {
        if (isVisible) {
            setAnimationClass('visible');
        } else {
            setAnimationClass('hide');
            // Aguardar o tempo da animação para remover a classe
            const timer = setTimeout(() => {
                setAnimationClass('');
            }, 230); // Ajuste este tempo para corresponder ao tempo de transição CSS
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

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
            const trimmedText = text.trim(); // Remove espaços extras
            onInputChange(index, trimmedText);
        }).catch(err => {
            console.error('Failed to paste text: ', err);
        });
    };

    return (
        <div className="flex justify-center items-center">
            <div className={`bg-stam-bg-3 palletBox absolute border border-stam-border p-4 ${animationClass}`}>
                <div className="border border-stam-border borders">
                    <div className="bg-stam-orange orangeBoxes absolute flex justify-center items-center rounded-2xl">
                        <p className="font-medium text-white text-6xl">3</p>
                    </div>
                    <div className="flex">
                        <div className="space-y-1">
                            {values.slice(0, 3).map((value, index) => (
                                <div className="relative" key={index}>
                                    <input
                                        value={value}
                                        onChange={(e) => onInputChange(index, e.target.value.trim())} // Remove espaços extras
                                        className="bg-stam-bg-3 inputProduct border border-stam-border caret-stam-orange rounded-full outline-none hover:border-stam-orange font-light text-white px-2"
                                        placeholder="Endereçar"
                                    />
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined text-stam-bg-3 cursor-pointer arrowPasteIcon absolute bg-stam-border rounded-full hover:bg-verde-lucro"
                                            onClick={() => handlePasteClick(index)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-stam-bg-3 bg-stam-border material-symbols-outlined bg-stam-bg-3 absolute cursor-pointer hover:bg-stam-vermelho rounded-full"
                                            onClick={() => handleClearClick(index)}
                                        >
                                            close
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className={`material-symbols-outlined pasteIcons text-stam-bg-3 absolute bg-stam-border rounded-full 
                                        ${activeIcon === index ? 'bg-verde-lucro text-black border-verde-lucro cursor-default' : 'cursor-pointer hover:bg-verde-lucro hover:text-stam-bg-3'}`}
                                            onClick={() => handleCopyClick(index)}
                                        >
                                            {activeIcon === index ? 'check' : 'content_copy'}
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
                                        onChange={(e) => onInputChange(index + 3, e.target.value.trim())} // Remove espaços extras
                                        className="bg-stam-bg-3 inputProduct2 border border-stam-border caret-stam-orange rounded-full outline-none hover:border-stam-orange font-light text-white px-2"
                                        placeholder="Endereçar"
                                    />
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined text-stam-bg-3 cursor-pointer arrowPasteIcon absolute bg-stam-border rounded-full hover:bg-verde-lucro"
                                            onClick={() => handlePasteClick(index + 3)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-stam-bg-3 bg-stam-border material-symbols-outlined bg-stam-bg-3 absolute cursor-pointer hover:bg-stam-vermelho rounded-full"
                                            onClick={() => handleClearClick(index + 3)}
                                        >
                                            close
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className={`material-symbols-outlined pasteIcons text-stam-bg-3 absolute bg-stam-border rounded-full 
                                        ${activeIcon === index + 3 ? 'bg-verde-lucro text-black border-verde-lucro cursor-default' : 'cursor-pointer hover:bg-verde-lucro hover:text-stam-bg-3'}`}
                                            onClick={() => handleCopyClick(index + 3)}
                                        >
                                            {activeIcon === index + 3 ? 'check' : 'content_copy'}
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
                                        onChange={(e) => onInputChange(index + 6, e.target.value.trim())} // Remove espaços extras
                                        className="bg-stam-bg-3 inputProduct2 border border-stam-border caret-stam-orange rounded-full outline-none hover:border-stam-orange font-light text-white px-2"
                                        placeholder="Endereçar"
                                    />
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined text-stam-bg-3 cursor-pointer arrowPasteIcon absolute bg-stam-border rounded-full hover:bg-verde-lucro"
                                            onClick={() => handlePasteClick(index + 6)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-stam-bg-3 bg-stam-border material-symbols-outlined bg-stam-bg-3 absolute cursor-pointer hover:bg-stam-vermelho rounded-full"
                                            onClick={() => handleClearClick(index + 6)}
                                        >
                                            close
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className={`material-symbols-outlined pasteIcons text-stam-bg-3 absolute bg-stam-border rounded-full 
                                        ${activeIcon === index + 6 ? 'bg-verde-lucro text-black border-verde-lucro cursor-default' : 'cursor-pointer hover:bg-verde-lucro hover:text-stam-bg-3'}`}
                                            onClick={() => handleCopyClick(index + 6)}
                                        >
                                            {activeIcon === index + 6 ? 'check' : 'content_copy'}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="border border-stam-border borders mt-3">
                    <div className="bg-stam-orange orangeBoxes absolute flex justify-center items-center rounded-2xl">
                        <p className="font-medium text-white text-6xl">2</p>
                    </div>
                    <div className="flex">
                        <div className="space-y-1">
                            {values.slice(9, 12).map((value, index) => (
                                <div className="relative" key={index + 9}>
                                    <input
                                        value={value}
                                        onChange={(e) => onInputChange(index + 9, e.target.value.trim())} // Remove espaços extras
                                        className="bg-stam-bg-3 inputProduct border border-stam-border caret-stam-orange rounded-full outline-none hover:border-stam-orange font-light text-white px-2"
                                        placeholder="Endereçar"
                                    />
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined text-stam-bg-3 cursor-pointer arrowPasteIcon absolute bg-stam-border rounded-full hover:bg-verde-lucro"
                                            onClick={() => handlePasteClick(index + 9)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-stam-bg-3 bg-stam-border material-symbols-outlined bg-stam-bg-3 absolute cursor-pointer hover:bg-stam-vermelho rounded-full"
                                            onClick={() => handleClearClick(index + 9)}
                                        >
                                            close
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className={`material-symbols-outlined pasteIcons text-stam-bg-3 absolute bg-stam-border rounded-full 
                                        ${activeIcon === index + 9 ? 'bg-verde-lucro text-black border-verde-lucro cursor-default' : 'cursor-pointer hover:bg-verde-lucro hover:text-stam-bg-3'}`}
                                            onClick={() => handleCopyClick(index + 9)}
                                        >
                                            {activeIcon === index + 9 ? 'check' : 'content_copy'}
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
                                        onChange={(e) => onInputChange(index + 12, e.target.value.trim())} // Remove espaços extras
                                        className="bg-stam-bg-3 inputProduct2 border border-stam-border caret-stam-orange rounded-full outline-none hover:border-stam-orange font-light text-white px-2"
                                        placeholder="Endereçar"
                                    />
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined text-stam-bg-3 cursor-pointer arrowPasteIcon absolute bg-stam-border rounded-full hover:bg-verde-lucro"
                                            onClick={() => handlePasteClick(index + 12)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-stam-bg-3 bg-stam-border material-symbols-outlined bg-stam-bg-3 absolute cursor-pointer hover:bg-stam-vermelho rounded-full"
                                            onClick={() => handleClearClick(index + 12)}
                                        >
                                            close
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className={`material-symbols-outlined pasteIcons text-stam-bg-3 absolute bg-stam-border rounded-full 
                                        ${activeIcon === index + 12 ? 'bg-verde-lucro text-black border-verde-lucro cursor-default' : 'cursor-pointer hover:bg-verde-lucro hover:text-stam-bg-3'}`}
                                            onClick={() => handleCopyClick(index + 12)}
                                        >
                                            {activeIcon === index + 12 ? 'check' : 'content_copy'}
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
                                        onChange={(e) => onInputChange(index + 15, e.target.value.trim())} // Remove espaços extras
                                        className="bg-stam-bg-3 inputProduct2 border border-stam-border caret-stam-orange rounded-full outline-none hover:border-stam-orange font-light text-white px-2"
                                        placeholder="Endereçar"
                                    />
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined text-stam-bg-3 cursor-pointer arrowPasteIcon absolute bg-stam-border rounded-full hover:bg-verde-lucro"
                                            onClick={() => handlePasteClick(index + 15)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-stam-bg-3 bg-stam-border material-symbols-outlined bg-stam-bg-3 absolute cursor-pointer hover:bg-stam-vermelho rounded-full"
                                            onClick={() => handleClearClick(index + 15)}
                                        >
                                            close
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className={`material-symbols-outlined pasteIcons text-stam-bg-3 absolute bg-stam-border rounded-full 
                                        ${activeIcon === index + 15 ? 'bg-verde-lucro text-black border-verde-lucro cursor-default' : 'cursor-pointer hover:bg-verde-lucro hover:text-stam-bg-3'}`}
                                            onClick={() => handleCopyClick(index + 15)}
                                        >
                                            {activeIcon === index + 15 ? 'check' : 'content_copy'}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="border border-stam-border borders mt-3">
                    <div className="bg-stam-orange orangeBoxes absolute flex justify-center items-center rounded-2xl">
                        <p className="font-medium text-white text-6xl">1</p>
                    </div>
                    <div className="flex">
                        <div className="space-y-1">
                            {values.slice(18, 21).map((value, index) => (
                                <div className="relative" key={index + 18}>
                                    <input
                                        value={value}
                                        onChange={(e) => onInputChange(index + 18, e.target.value.trim())} // Remove espaços extras
                                        className="bg-stam-bg-3 inputProduct border border-stam-border caret-stam-orange rounded-full outline-none hover:border-stam-orange font-light text-white px-2"
                                        placeholder="Endereçar"
                                    />
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined text-stam-bg-3 cursor-pointer arrowPasteIcon absolute bg-stam-border rounded-full hover:bg-verde-lucro"
                                            onClick={() => handlePasteClick(index + 18)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-stam-bg-3 bg-stam-border material-symbols-outlined bg-stam-bg-3 absolute cursor-pointer hover:bg-stam-vermelho rounded-full"
                                            onClick={() => handleClearClick(index + 18)}
                                        >
                                            close
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className={`material-symbols-outlined pasteIcons text-stam-bg-3 absolute bg-stam-border rounded-full 
                                        ${activeIcon === index + 18 ? 'bg-verde-lucro text-black border-verde-lucro cursor-default' : 'cursor-pointer hover:bg-verde-lucro hover:text-stam-bg-3'}`}
                                            onClick={() => handleCopyClick(index + 18)}
                                        >
                                            {activeIcon === index + 18 ? 'check' : 'content_copy'}
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
                                        onChange={(e) => onInputChange(index + 21, e.target.value.trim())} // Remove espaços extras
                                        className="bg-stam-bg-3 inputProduct2 border border-stam-border caret-stam-orange rounded-full outline-none hover:border-stam-orange font-light text-white px-2"
                                        placeholder="Endereçar"
                                    />
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined text-stam-bg-3 cursor-pointer arrowPasteIcon absolute bg-stam-border rounded-full hover:bg-verde-lucro"
                                            onClick={() => handlePasteClick(index + 21)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-stam-bg-3 bg-stam-border material-symbols-outlined bg-stam-bg-3 absolute cursor-pointer hover:bg-stam-vermelho rounded-full"
                                            onClick={() => handleClearClick(index + 21)}
                                        >
                                            close
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className={`material-symbols-outlined pasteIcons text-stam-bg-3 absolute bg-stam-border rounded-full 
                                        ${activeIcon === index + 21 ? 'bg-verde-lucro text-black border-verde-lucro cursor-default' : 'cursor-pointer hover:bg-verde-lucro hover:text-stam-bg-3'}`}
                                            onClick={() => handleCopyClick(index + 21)}
                                        >
                                            {activeIcon === index + 21 ? 'check' : 'content_copy'}
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
                                        onChange={(e) => onInputChange(index + 24, e.target.value.trim())} // Remove espaços extras
                                        className="bg-stam-bg-3 inputProduct2 border border-stam-border caret-stam-orange rounded-full outline-none hover:border-stam-orange font-light text-white px-2"
                                        placeholder="Endereçar"
                                    />
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined text-stam-bg-3 cursor-pointer arrowPasteIcon absolute bg-stam-border rounded-full hover:bg-verde-lucro"
                                            onClick={() => handlePasteClick(index + 24)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-stam-bg-3 bg-stam-border material-symbols-outlined bg-stam-bg-3 absolute cursor-pointer hover:bg-stam-vermelho rounded-full"
                                            onClick={() => handleClearClick(index + 24)}
                                        >
                                            close
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className={`material-symbols-outlined pasteIcons text-stam-bg-3 absolute bg-stam-border rounded-full 
                                        ${activeIcon === index + 24 ? 'bg-verde-lucro text-black border-verde-lucro cursor-default' : 'cursor-pointer hover:bg-verde-lucro hover:text-stam-bg-3'}`}
                                            onClick={() => handleCopyClick(index + 24)}
                                        >
                                            {activeIcon === index + 24 ? 'check' : 'content_copy'}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        className="bg-stam-orange fecharButton rounded-full px-20 py-1 font-medium absolute bottom-4"
                        onClick={onClose}
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PalletBox;
