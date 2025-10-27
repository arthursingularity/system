import "./palletbox.css";
import React, { useEffect, useState } from 'react';

function PalletBox({
    values,
    onInputChange,
    onClose,
    isVisible,
    descricao,
    togglePieceTableVisibility,
    updateStockPercentage,
    onCaixasInputChange,
    caixasValues,
    saldoValues,
    onSaldoInputChange,
    selectedColuna,
    corredor
}) {
    const [animationClass, setAnimationClass] = useState('');
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
            const matchedIndices = values
                .map((value, index) => (value.trim() === trimmedDescricao ? index : null))
                .filter(index => index !== null);
            setMatchingInputPositions(matchedIndices);
            setSearchTriggered(false);
        }
    }, [searchTriggered, descricao, values]);

    const handleCaixasInputChange = (index, value) => {
        const cleanedValue = value.replace(/\D/g, '');
        onCaixasInputChange(index, cleanedValue);
    };

    const handleClearClick = (index) => {
        onInputChange(index, '');
        onCaixasInputChange(index, '');
        onSaldoInputChange(index, '');
    };

    const handlePasteClick = (index) => {
        navigator.clipboard.readText()
            .then(text => {
                const cleanedText = text.replace(/\s{2,}/g, ' ').trim();
                onInputChange(index, cleanedText);
            })
            .catch(err => {
                console.error('Failed to paste text: ', err);
            });
    };

    const handleChange = (index, value) => {
        const cleanedValue = value.replace(/\s{2,}/g, ' ').trim();
        onInputChange(index, cleanedValue);
        updateStockPercentage();
    };

    const formatNumber = (value) => {
        if (!value) return '';
        const onlyDigits = String(value).replace(/\D/g, '');
        return onlyDigits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handleSaldoInputChange = (index, value) => {
        const raw = value.replace(/\D/g, '');
        onSaldoInputChange(index, raw); // envia sem pontos
    };

    const getInputProductClass = (value, descricao) => {
        const isMatch = value === descricao.trim() && value !== "";
        return `bg-stam-bg-3 pr-[26px] inputProduct border rounded-[10px] outline-none font-light text-white px-2 hover:border-stam-orange ${isMatch ? 'border-stam-border text-stam-orange font-semibold' : 'border-stam-border'
            }`;
    };

    const getInputProduct2Class = (value, descricao) => {
        const isMatch = value === descricao.trim() && value !== "";
        return `bg-stam-bg-3 pr-[26px] inputProduct2 border rounded-[10px] outline-none font-light text-white px-2 hover:border-stam-orange ${isMatch ? 'border-stam-border text-stam-orange font-semibold' : 'border-stam-border'
            }`;
    };

    const getInputSaldoClass = (value, descricao) => {
        const isMatch = value === descricao.trim() && value !== "";
        return `bg-stam-bg-3 placeholder-gray-600 inputSaldo border rounded-[10px] outline-none font-light text-white px-2 hover:border-stam-orange ${isMatch ? 'border-stam-border text-stam-orange font-semibold' : 'border-stam-border'
            }`;
    };

    const getCaixasInputClass = (value, descricao) => {
        const isMatch = value === descricao.trim() && value !== "";
        return `caixasInput placeholder-gray-600 rounded-[10px] font-light text-white bg-transparent border outline-none w-[37px] pl-2 caret-stam-orange ${isMatch ? 'font-semibold text-stam-orange' : 'border-stam-border hover:border-stam-orange'
            }`;
    };

    const getEnderecarDiv = (value, descricao) => {
        const isMatch = value === descricao.trim() && value !== "";
        return `enderecarBorders space-x-1 flex border p-1 rounded-[14px] ${isMatch ? 'font-semibold text-stam-orange' : 'border-stam-border hover:border-stam-orange'
            }`;
    };

    const getEnderecar2Div = (value, descricao) => {
        const isMatch = value === descricao.trim() && value !== "";
        return `flex border p-1 space-x-1 rounded-[14px] ml-1.5 ${isMatch ? 'font-semibold text-stam-orange' : 'border-stam-border hover:border-stam-orange'
            }`;
    };


    const isAnyInputMatchDescricao = (startIndex, endIndex) => {
        const trimmedDescricao = descricao.trim();
        return values.slice(startIndex, endIndex).some(value =>
            value.trim() !== '' && value.trim() === trimmedDescricao
        );
    };

    const totalcxN3 = caixasValues
        .slice(0, 9)
        .reduce((acc, val) => acc + (parseInt(val) || 0), 0);

    const totalcxN2 = caixasValues
        .slice(9, 18)
        .reduce((acc, val) => acc + (parseInt(val) || 0), 0);

    const totalcxN1 = caixasValues
        .slice(18, 27)
        .reduce((acc, val) => acc + (parseInt(val) || 0), 0);

    return (
        <div className="flex justify-center items-center z-50">
            <div className={`bg-stam-bg-3 palletBox absolute border border-stam-border p-2 ${animationClass}`}>
                <span
                    className="closePalletBox material-symbols-outlined z-30 absolute -right-2 -top-2 text-white hover:bg-stam-border rounded-full bg-stam-bg-4 p-1 cursor-pointer"
                    onClick={onClose}
                >
                    close
                </span>
                <div className={`Nivel3 border ${isAnyInputMatchDescricao(0, 9) ? 'border-stam-orange' : 'border-stam-border'} borders`}>
                    <div className="bg-stam-orange orangeBoxes absolute flex justify-center items-center rounded-xl border border-gray-500">
                        <div className="-space-y-1 mt-1">
                            <p className="font-medium text-white text-center text-4xl">N3</p>
                            <p className="font-bold text-black text-center text-[17px]">{totalcxN3} cxs</p>
                        </div>
                    </div>
                    <p className="absolute border border-gray-500 bottom-[305px] left-[18px] font-medium py-[4px] text-white text-[14px] tracking-tight bg-stam-bg-4 w-[75px] text-center rounded-[10px]">05<span className="text-stam-bg-4">.</span>{corredor}<span className="text-stam-bg-4">.</span>{selectedColuna}<span className="text-stam-bg-4">.</span>N3</p>
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
                                            value={formatNumber(saldoValues[index] || '')}
                                            onChange={(e) => handleSaldoInputChange(index, e.target.value)}
                                            className={getInputSaldoClass(value, descricao)}
                                            placeholder="Saldo"
                                        />
                                        <input
                                            value={caixasValues[index] || ''}
                                            className={getCaixasInputClass(value, descricao)}
                                            placeholder="CX"
                                            maxLength={2}
                                            onChange={(e) => handleCaixasInputChange(index, e.target.value)}
                                        />
                                    </div>
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined arrowPasteIcon p-1"
                                            onClick={() => handlePasteClick(index)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-white material-symbols-outlined absolute cursor-pointer p-1 rounded-full"
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
                                            value={formatNumber(saldoValues[index + 3] || '')}
                                            onChange={(e) => handleSaldoInputChange(index + 3, e.target.value)}
                                            className={getInputSaldoClass(value, descricao)}
                                            placeholder="Saldo"
                                        />
                                        <input
                                            value={caixasValues[index + 3]}
                                            className={getCaixasInputClass(value, descricao)}
                                            placeholder="CX"
                                            maxLength={2}
                                            onChange={(e) => handleCaixasInputChange(index + 3, e.target.value)}
                                        />
                                    </div>
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined arrowPasteIcon p-1"
                                            onClick={() => handlePasteClick(index + 3)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-white material-symbols-outlined absolute cursor-pointer p-1 rounded-full"
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
                                            value={formatNumber(saldoValues[index + 6] || '')}
                                            onChange={(e) => handleSaldoInputChange(index + 6, e.target.value)}
                                            className={getInputSaldoClass(value, descricao)}
                                            placeholder="Saldo"
                                        />
                                        <input
                                            value={caixasValues[index + 6]}
                                            className={getCaixasInputClass(value, descricao)}
                                            placeholder="CX"
                                            maxLength={2}
                                            onChange={(e) => handleCaixasInputChange(index + 6, e.target.value)}
                                        />
                                    </div>
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined arrowPasteIcon p-1"
                                            onClick={() => handlePasteClick(index + 6)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-white material-symbols-outlined absolute cursor-pointer p-1 rounded-full"
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
                <div className={`Nivel2 border ${isAnyInputMatchDescricao(9, 18) ? 'border-stam-orange' : 'border-stam-border'} borders mt-2`}>
                    <div className="bg-stam-orange orangeBoxes absolute flex justify-center items-center border border-gray-500 rounded-xl">
                        <div className="-space-y-1 mt-1">
                            <p className="font-medium text-white text-4xl text-center">N2</p>
                            <p className="font-bold text-black text-center text-[17px]">{totalcxN2} cxs</p>
                        </div>
                    </div>
                    <p className="absolute border border-gray-500 bottom-[163px] left-[18px] font-medium py-[4px] text-white text-[14px] tracking-tight bg-stam-bg-4 w-[75px] text-center rounded-[10px]">05<span className="text-stam-bg-4">.</span>{corredor}<span className="text-stam-bg-4">.</span>{selectedColuna}<span className="text-stam-bg-4">.</span>N2</p>
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
                                            value={formatNumber(saldoValues[index + 9] || '')}
                                            onChange={(e) => handleSaldoInputChange(index + 9, e.target.value)}
                                            className={getInputSaldoClass(value, descricao)}
                                            placeholder="Saldo"
                                        />
                                        <input
                                            value={caixasValues[index + 9]}
                                            className={getCaixasInputClass(value, descricao)}
                                            placeholder="CX"
                                            maxLength={2}
                                            onChange={(e) => handleCaixasInputChange(index + 9, e.target.value)}
                                        />
                                    </div>
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined arrowPasteIcon p-1"
                                            onClick={() => handlePasteClick(index + 9)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-white material-symbols-outlined absolute cursor-pointer p-1 rounded-full"
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
                                            value={formatNumber(saldoValues[index + 12] || '')}
                                            onChange={(e) => handleSaldoInputChange(index + 12, e.target.value)}
                                            className={getInputSaldoClass(value, descricao)}
                                            placeholder="Saldo"
                                        />
                                        <input
                                            value={caixasValues[index + 12]}
                                            className={getCaixasInputClass(value, descricao)}
                                            placeholder="CX"
                                            maxLength={2}
                                            onChange={(e) => handleCaixasInputChange(index + 12, e.target.value)}
                                        />
                                    </div>
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined arrowPasteIcon p-1"
                                            onClick={() => handlePasteClick(index + 12)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-white material-symbols-outlined absolute cursor-pointer p-1 rounded-full"
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
                                            value={formatNumber(saldoValues[index + 15] || '')}
                                            onChange={(e) => handleSaldoInputChange(index + 15, e.target.value)}
                                            className={getInputSaldoClass(value, descricao)}
                                            placeholder="Saldo"
                                        />
                                        <input
                                            value={caixasValues[index + 15]}
                                            className={getCaixasInputClass(value, descricao)}
                                            placeholder="CX"
                                            maxLength={2}
                                            onChange={(e) => handleCaixasInputChange(index + 15, e.target.value)}
                                        />
                                    </div>
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined arrowPasteIcon p-1"
                                            onClick={() => handlePasteClick(index + 15)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-white material-symbols-outlined absolute cursor-pointer p-1 rounded-full"
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
                <div className={`Nivel1 border ${isAnyInputMatchDescricao(18, 27) ? 'border-stam-orange' : 'border-stam-border'} borders mt-2`}>
                    <div className="bg-stam-orange orangeBoxes absolute flex justify-center text-center border border-gray-500 items-center rounded-xl">
                        <div className="-space-y-1 mt-1">
                            <p className="font-medium text-white text-center text-4xl">N1</p>
                            <p className="font-bold text-black text-center text-[17px] ">{totalcxN1} cxs</p>
                        </div>
                    </div>
                    <p className="absolute border border-gray-500 bottom-[20px] left-[18px] font-medium py-[4px] text-white text-[14px] tracking-tight bg-stam-bg-4 w-[75px] text-center rounded-[10px]">05<span className="text-stam-bg-4">.</span>{corredor}<span className="text-stam-bg-4">.</span>{selectedColuna}<span className="text-stam-bg-4">.</span>N1</p>
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
                                            value={formatNumber(saldoValues[index + 18] || '')}
                                            onChange={(e) => handleSaldoInputChange(index + 18, e.target.value)}
                                            className={getInputSaldoClass(value, descricao)}
                                            placeholder="Saldo"
                                        />
                                        <input
                                            value={caixasValues[index + 18]}
                                            className={getCaixasInputClass(value, descricao)}
                                            placeholder="CX"
                                            maxLength={2}
                                            onChange={(e) => handleCaixasInputChange(index + 18, e.target.value)}
                                        />
                                    </div>
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined arrowPasteIcon p-1"
                                            onClick={() => handlePasteClick(index + 18)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-white material-symbols-outlined absolute cursor-pointer p-1 rounded-full"
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
                                            value={formatNumber(saldoValues[index + 21] || '')}
                                            onChange={(e) => handleSaldoInputChange(index + 21, e.target.value)}
                                            className={getInputSaldoClass(value, descricao)}
                                            placeholder="Saldo"
                                        />
                                        <input
                                            value={caixasValues[index + 21]}
                                            className={getCaixasInputClass(value, descricao)}
                                            placeholder="CX"
                                            maxLength={2}
                                            onChange={(e) => handleCaixasInputChange(index + 21, e.target.value)}
                                        />
                                    </div>
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined arrowPasteIcon p-1"
                                            onClick={() => handlePasteClick(index + 21)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-white material-symbols-outlined absolute cursor-pointer p-1 rounded-full"
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
                                            value={formatNumber(saldoValues[index + 24] || '')}
                                            onChange={(e) => handleSaldoInputChange(index + 24, e.target.value)}
                                            className={getInputSaldoClass(value, descricao)}
                                            placeholder="Saldo"
                                        />
                                        <input
                                            value={caixasValues[index + 24]}
                                            className={getCaixasInputClass(value, descricao)}
                                            placeholder="CX"
                                            maxLength={2}
                                            onChange={(e) => handleCaixasInputChange(index + 24, e.target.value)}
                                        />
                                    </div>
                                    {!value && (
                                        <span
                                            className="material-symbols-outlined arrowPasteIcon p-1"
                                            onClick={() => handlePasteClick(index + 24)}
                                        >
                                            arrow_forward
                                        </span>
                                    )}
                                    {value && (
                                        <span
                                            className="clearEnderecamento text-white material-symbols-outlined absolute cursor-pointer p-1 rounded-full"
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
