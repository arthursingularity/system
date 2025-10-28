import ListaComponentes from "../../componentes/ListaComponentes";
import Navbar from "../../componentes/Navbar";
import PieceTable from "../../componentes/PieceTable";
import SearchSuggestion from "../../componentes/Searchsuggestion";
import AbBox from "../../componentesTeste/AbBox";
import PalletBox from "../../componentesTeste/PalletBox";
import "./teste.css";
import { useState, useEffect, useRef } from "react";

const boxIds = [
    'box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'box7', 'box8', 'box9',
    'box10', 'box11', 'box12', 'box13', 'box14', 'box15', 'box16', 'box17', 'box18', 'box19', 'box20', 'box21',
    'box22', 'box23', 'box24', 'box25', 'box26', 'box27', 'box28', 'box29', 'box30', 'box31', 'box32', 'box33',
    'box34', 'box35', 'box36', 'box37', 'box38', 'box39', 'box40', 'box41', 'box42', 'box43', 'box44', 'box45',
    'box46'
];

const getCorredorFromBoxId = (boxId) => {
    if (["box1", "box2", "box3", "box4", "box5", "box6", "box7", "box8", "box9"].includes(boxId)) return "A";
    if (["box10", "box11", "box12", "box13", "box14", "box15", "box16", "box17", "box18", "box19"].includes(boxId)) return "B";
    if (["box20", "box21", "box22", "box23", "box24", "box25", "box26", "box27", "box28", "box29"].includes(boxId)) return "C";
    if (["box30", "box31", "box32", "box33", "box34", "box35", "box36", "box37", "box38", "box39", "box40", "box41"].includes(boxId)) return "D";
    if (["box42", "box43", "box44"].includes(boxId)) return "E";
    if (["box45", "box46"].includes(boxId)) return "X"; // ou TRILHO se quiser
    return "";
};

function Estoque() {
    const [visiblePalletBox, setVisiblePalletBox] = useState(null);
    const [selectedLetterId, setSelectedLetterId] = useState('');
    const [inputValues, setInputValues] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [highlightedLetters, setHighlightedLetters] = useState({});
    const [isListaVisible, setIsListaVisible] = useState(false);
    const [isPieceVisible, setIsPieceVisible] = useState(false)
    const [inputBorderClass, setInputBorderClass] = useState('border-stam-border');
    const [resetState, setResetState] = useState(false);
    const [matchingInputPositions, setMatchingInputPositions] = useState({});
    const [isSearchSuggestionVisible, setIsSearchSuggestionVisible] = useState(true);
    const [searchResults, setSearchResults] = useState({});
    const estampariaTableRef = useRef(null);
    const [isMoved, setIsMoved] = useState(false);
    const [isPasting, setIsPasting] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const inputDescriptionRef = useRef(null);
    const [inputPieceDescription, setInputPieceDescription] = useState('');
    const [stockPercentage, setStockPercentage] = useState(0);
    const [caixasValues, setCaixasValues] = useState({});
    const [saldoValues, setSaldoValues] = useState({});
    const selectedBoxId = selectedLetterId.split('-')[0] || '';

    const MAX_BOXES = 6836;

    const updateStockPercentage = (allCaixasValues) => {
        const total = Object.values(allCaixasValues).reduce((acc, palletArray) => {
            const subtotal = palletArray.reduce((sum, val) => sum + (parseInt(val, 10) || 0), 0);
            return acc + subtotal;
        }, 0);

        const percentage = ((total / MAX_BOXES) * 100).toFixed(2);
        setStockPercentage(percentage);
    };

    useEffect(() => {
        updateStockPercentage(caixasValues);
    }, [caixasValues]);

    const handleCaixasChange = (palletId, index, value) => {
        setCaixasValues(prev => {
            const newValues = { ...prev };

            if (!newValues[palletId]) {
                newValues[palletId] = Array(27).fill("");
            }

            newValues[palletId][index] = value;
            return newValues;
        });
    };

    useEffect(() => {
        document.title = "Estoque Estamparia";
    }, []);

    useEffect(() => {
        const storedValues = boxIds.reduce((acc, id) => {
            ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
                '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
                '21', '22', '23', '24', 'A', 'B', 'TRILHO'].forEach(letter => {
                    const enderecarValues = Array(27).fill('').map((_, i) => localStorage.getItem(`${id}-${letter}-${i}`) || '');
                    const cxValues = Array(27).fill('').map((_, i) => localStorage.getItem(`${id}-${letter}-CX-${i}`) || '');
                    const saldoValues = Array(27).fill('').map((_, i) => localStorage.getItem(`${id}-${letter}-SALDO-${i}`) || '');

                    acc[`${id}-${letter}`] = enderecarValues;
                    if (!acc.cx) acc.cx = {};
                    if (!acc.saldo) acc.saldo = {};

                    acc.cx[`${id}-${letter}`] = cxValues;
                    acc.saldo[`${id}-${letter}`] = saldoValues;
                });
            return acc;
        }, {});

        setInputValues(storedValues);
        setCaixasValues(storedValues.cx);
        setSaldoValues(storedValues.saldo);
    }, []);

    const focusInputInEstampariaTable = () => {
        if (estampariaTableRef.current) {
            estampariaTableRef.current.focusInput();
        }
    };

    const handleMenuClick = () => {
        focusInputInEstampariaTable();
        toggleListaVisibility();
    };

    const toggleListaVisibility = () => setIsListaVisible(prev => !prev)

    const handleAbBoxClick = (id, letter) => {
        setVisiblePalletBox(id);
        setSelectedLetterId(`${id}-${letter}`);
    };

    const handleClearInput = () => {
        setSearchValue('')
        setInputBorderClass('border-stam-border')
        if (inputDescriptionRef.current) {
            inputDescriptionRef.current.focus()
        }
    };

    const handlePalletBoxClose = () => {
        setVisiblePalletBox(null);
        setSelectedLetterId('');

        if (!isMoved) {
            setHighlightedLetters(prev => {
                const { [selectedLetterId]: _, ...rest } = prev;
                return rest;
            });
        }
    };

    const handleInputChange = (index, value) => {
        const upperCaseValue = value.toUpperCase();
        const processedValue = isPasting ? upperCaseValue : upperCaseValue;

        setInputValues(prevValues => {
            const [boxId, letter] = selectedLetterId.split('-');
            const newValues = { ...prevValues };
            newValues[selectedLetterId][index] = processedValue;
            localStorage.setItem(`${boxId}-${letter}-${index}`, processedValue);
            return newValues;
        });
    };

    const handleCaixasInputChange = (index, value) => {
        const upperCaseValue = value.toUpperCase();
        const processedValue = isPasting ? upperCaseValue : upperCaseValue;

        setCaixasValues(prevValues => {
            const [boxId, letter] = selectedLetterId.split('-');
            const newValues = { ...prevValues };

            if (!newValues[selectedLetterId]) {
                newValues[selectedLetterId] = Array(27).fill('');
            }

            newValues[selectedLetterId][index] = processedValue;
            localStorage.setItem(`${boxId}-${letter}-CX-${index}`, processedValue);
            return newValues;
        });
    };

    // Armazenar input "Saldo"
    const handleSaldoInputChange = (index, value) => {
        const processedValue = value; // pode manter como número ou string

        setSaldoValues(prevValues => {
            const [boxId, letter] = selectedLetterId.split('-');
            const newValues = { ...prevValues };

            if (!newValues[selectedLetterId]) {
                newValues[selectedLetterId] = Array(27).fill('');
            }

            newValues[selectedLetterId][index] = processedValue;
            localStorage.setItem(`${boxId}-${letter}-SALDO-${index}`, processedValue);
            return newValues;
        });
    };

    const handleSearch = () => {
        const trimmedSearchValue = searchValue.trim();

        if (trimmedSearchValue === '') {
            setInputBorderClass('border-stam-vermelho');
            return;
        }

        const highlighted = Object.entries(inputValues)
            .filter(([_, values]) => Array.isArray(values))
            .reduce((acc, [letterId, values]) => {
                if (values.includes(trimmedSearchValue)) {
                    acc[letterId] = true;
                }
                return acc;
            }, {});

        if (Object.keys(highlighted).length === 0) {
            setInputBorderClass('border-stam-vermelho');
        } else {
            setHighlightedLetters(prev => {
                if (isMoved) {
                    return { ...prev, ...highlighted };
                }
                else {
                    return highlighted;
                }
            });
            setInputBorderClass('border-stam-border');
        }
    };

    const handleResetHighlightedBoxes = () => {
        setResetState(true);
        setHighlightedLetters({});
        setInputBorderClass('border-stam-border');
    };

    const handlePasteInput = (e) => {
        e.preventDefault();
        setIsPasting(true);
        const paste = e.clipboardData.getData('text');
        const processedText = cleanText(paste);
        setSearchValue(processedText.toUpperCase().trim());
        setIsPasting(false);
    };

    const cleanText = (text) => {
        return text.replace(/\s{2,}/g, ' ').trim();
    };

    const handleSuggestionClick = (descricao) => {
        navigator.clipboard.writeText(descricao)
            .then(() => {
                setSearchValue(descricao);
                setIsSearchSuggestionVisible(false);
            })
            .catch(err => {
                console.error('Falha ao copiar o texto: ', err);
            });
    };

    const handleDescricaoChange = (e) => {
        setIsSearchSuggestionVisible(true);
        setSearchValue(e.target.value.toUpperCase());
    };

    function togglePieceTableVisibility() {
        setIsPieceVisible(!isPieceVisible)
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isSearchSuggestionVisible) {
                if (e.key === 'Enter') {
                    const items = document.querySelectorAll('.suggestion-item');
                    const selectedItem = Array.from(items).find(item => item.classList.contains('bg-gray-700'));

                    if (selectedItem) {
                        const descricao = selectedItem.textContent || '';
                        handleSuggestionClick(descricao);
                    }
                } else if (e.key === 'ArrowDown') {
                    setSelectedItemIndex((prevIndex) => {
                        const items = document.querySelectorAll('.suggestion-item');
                        const newIndex = (prevIndex + 1) % items.length;
                        items.forEach((item, index) => {
                            item.classList.toggle('bg-gray-700', index === newIndex);
                        });
                        return newIndex;
                    });
                } else if (e.key === 'ArrowUp') {
                    setSelectedItemIndex((prevIndex) => {
                        const items = document.querySelectorAll('.suggestion-item');
                        const newIndex = (prevIndex - 1 + items.length) % items.length;
                        items.forEach((item, index) => {
                            item.classList.toggle('bg-gray-700', index === newIndex);
                        });
                        return newIndex;
                    });
                }
            } else if (e.key === 'Enter') {
                handleSearch();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [searchValue, isSearchSuggestionVisible]);


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (isListaVisible) {
                    toggleListaVisibility();
                } else if (isPieceVisible) {
                    setIsPieceVisible(!isPieceVisible);
                } else if (visiblePalletBox) {
                    handlePalletBoxClose();
                } else if (!isMoved) {
                    handleResetHighlightedBoxes();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isListaVisible, visiblePalletBox, isMoved, isPieceVisible]);

    const shouldHideBoxNumbersDiv = visiblePalletBox || isListaVisible;
    const shouldHidePrateleirasDiv = visiblePalletBox || isListaVisible;

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
        }
    };

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Tab') {
                event.preventDefault();
                if (inputDescriptionRef.current) {
                    inputDescriptionRef.current.focus();
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [])

    return (
        <div>
            <Navbar />
            <ListaComponentes visible={isListaVisible} toggleVisibility={toggleListaVisibility} ref={estampariaTableRef} />
            <div className="barraDePreenchimento flex justify-center">
                <div className="modeDiv z-50 absolute">
                    <p className="Preenchimento font-light text-white text-center">{stockPercentage}%</p>
                    <div className="progressBorder p-1 w-48 z-30 border border-stam-border rounded-full flex justify-start items-center overflow-hidden">
                        <div
                            className="h-2 bg-stam-orange rounded-full"
                            style={{ width: `${stockPercentage}%` }}
                        ></div>
                    </div>
                    <p className="text-white font-light text-center mt-1 tracking-wider text-[14px] text-slate-300">Preenchimento</p>
                </div>
            </div>

            <div className="flex justify-center">
                <span class="material-symbols-outlined searchIcon absolute text-stam-border text-[23px] z-40">
                    search
                </span>
                {searchValue && (
                    <span
                        className="material-symbols-outlined z-40 clearDescription text-white absolute cursor-pointer rounded-full hover:bg-gray-600 p-1.5"
                        onClick={handleClearInput}
                    >
                        close
                    </span>
                )}
                {searchValue && isSearchSuggestionVisible && <SearchSuggestion searchValue={searchValue} onSuggestionClick={handleSuggestionClick} />}
                <PieceTable isPieceVisible={isPieceVisible} togglePieceTableVisibility={togglePieceTableVisibility} />
                <div className="menuDiv border border-gray-700 flex justify-center space-x-2.5 bg-stam-bg-3 py-3 px-3 rounded-full z-20 absolute">
                    <span
                        className="material-symbols-outlined pieceIcon text-stam-bg-3 bg-stam-orange rounded-full hover:bg-stam-orange cursor-pointer"
                        onClick={togglePieceTableVisibility}
                    >
                        extension
                    </span>
                    <span
                        className="material-symbols-outlined menuIcon text-stam-bg-3 bg-stam-orange rounded-full hover:bg-stam-orange cursor-pointer"
                        onClick={handleMenuClick}
                    >
                        menu
                    </span>
                    <input
                        value={searchValue}
                        onChange={handleDescricaoChange}
                        onPaste={handlePasteInput}
                        onKeyDown={handleKeyDown}
                        ref={inputDescriptionRef}
                        className={`bg-stam-bg-3 inputDescription border ${inputBorderClass} pl-8 caret-stam-orange rounded-full outline-none hover:border-stam-orange font-light text-white px-2`}
                        placeholder="Descrição"
                    />
                    <button
                        className="localizarButton bg-stam-orange font-medium px-5 rounded-full no-focus-outline"
                        onClick={handleSearch}
                    >
                        Localizar
                    </button>
                </div>
            </div>
            <div className="boxes flex justify-center">
                <div className={`bg-stam-bg-3 estoqueDiv border p-5 absolute border z-20 ${isMoved ? 'border-stam-orange' : 'border-gray-700'}`}>
                    <div className="flex">
                        <div className="prateleira1 corredorA flex space-x-1 ml-10">
                            {[
                                { id: "box1", letters: ["01", "02"] },
                                { id: "box2", letters: ["03", "04"] },
                                { id: "box3", letters: ["05", "06"] },
                            ].map(({ id, letters }) => (
                                <AbBox
                                    key={id}
                                    id={id}
                                    letter1={letters[0]}
                                    letter2={letters[1]}
                                    selectedLetterId={selectedLetterId}
                                    highlightedLetters={highlightedLetters}
                                    onClick={handleAbBoxClick}
                                    resetState={resetState}
                                />
                            ))}
                        </div>
                        <div className="prateleira2 corredorA flex space-x-1 ml-64">
                            {[
                                { id: "box4", letters: ["07", "08"] },
                                { id: "box5", letters: ["09", "10"] },
                                { id: "box6", letters: ["12", "13"] },
                                { id: "box7", letters: ["14", "15"] },
                                { id: "box8", letters: ["15", "16"] },
                                { id: "box9", letters: ["17", "18"] },
                            ].map(({ id, letters }) => (
                                <AbBox
                                    key={id}
                                    id={id}
                                    letter1={letters[0]}
                                    letter2={letters[1]}
                                    selectedLetterId={selectedLetterId}
                                    highlightedLetters={highlightedLetters}
                                    onClick={handleAbBoxClick}
                                    resetState={resetState}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="prateleira9 flex space-x-1 -ml-9 mt-8">
                        {['box45'].map(boxId => (
                            <AbBox
                                props="-rotate-90"
                                letterVisibility="hidden"
                                key={boxId}
                                id={boxId}
                                letter1="TRILHO"
                                type="letterTrilho"
                                selectedLetterId={selectedLetterId}
                                highlightedLetters={highlightedLetters}
                                onClick={handleAbBoxClick}
                                resetState={resetState}
                            />
                        ))}
                    </div>
                    <div className="flex">
                        <div className="block">
                            <div className="corredorB prateleira3 flex space-x-1 ml-10 mt-8 -mb-3">
                                {[
                                    { id: "box10", letters: ["01", "02"] },
                                    { id: "box11", letters: ["03", "04"] },
                                    { id: "box12", letters: ["05", "06"] },
                                    { id: "box13", letters: ["07", "08"] },
                                ].map(({ id, letters }) => (
                                    <AbBox
                                        key={id}
                                        id={id}
                                        letter1={letters[0]}
                                        letter2={letters[1]}
                                        selectedLetterId={selectedLetterId}
                                        highlightedLetters={highlightedLetters}
                                        onClick={handleAbBoxClick}
                                        resetState={resetState}
                                    />
                                ))}
                            </div>
                            <div className="corredorC prateleira5 flex space-x-1 ml-10 mt-5">
                                {[
                                    { id: "box20", letters: ["01", "02"] },
                                    { id: "box21", letters: ["03", "04"] },
                                    { id: "box22", letters: ["05", "06"] },
                                    { id: "box23", letters: ["07", "08"] },
                                ].map(({ id, letters }) => (
                                    <AbBox
                                        key={id}
                                        id={id}
                                        letter1={letters[0]}
                                        letter2={letters[1]}
                                        selectedLetterId={selectedLetterId}
                                        highlightedLetters={highlightedLetters}
                                        onClick={handleAbBoxClick}
                                        resetState={resetState}
                                    />
                                ))}
                            </div>
                            <div className="prateleira10 flex space-x-1 -ml-9 mt-8">
                                {['box46'].map(boxId => (
                                    <AbBox
                                        props="-rotate-90"
                                        letterVisibility="hidden"
                                        key={boxId}
                                        id={boxId}
                                        letter1="TRILHO"
                                        type="letterTrilho"
                                        selectedLetterId={selectedLetterId}
                                        highlightedLetters={highlightedLetters}
                                        onClick={handleAbBoxClick}
                                        resetState={resetState}
                                    />
                                ))}
                            </div>
                            <div className="corredorD prateleira7 absolute flex space-x-1 mt-8 ml-10">
                                {[
                                    { id: "box30", letters: ["01", "02"] },
                                    { id: "box31", letters: ["03", "04"] },
                                    { id: "box32", letters: ["05", "06"] },
                                    { id: "box33", letters: ["07", "08"] },
                                    { id: "box34", letters: ["09", "10"] },
                                    { id: "box35", letters: ["11", "12"] },
                                    { id: "box36", letters: ["13", "14"] },
                                    { id: "box37", letters: ["15", "16"] },
                                    { id: "box38", letters: ["17", "18"] },
                                    { id: "box39", letters: ["19", "20"] },
                                    { id: "box40", letters: ["21", "22"] },
                                    { id: "box41", letters: ["23", "24"] },
                                ].map(({ id, letters }) => (
                                    <AbBox
                                        key={id}
                                        id={id}
                                        letter1={letters[0]}
                                        letter2={letters[1]}
                                        selectedLetterId={selectedLetterId}
                                        highlightedLetters={highlightedLetters}
                                        onClick={handleAbBoxClick}
                                        resetState={resetState}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="block">
                            <div className="corredorB prateleira4 flex space-x-1 ml-20 mt-8">
                                {[
                                    { id: "box14", letters: ["09", "10"] },
                                    { id: "box15", letters: ["11", "12"] },
                                    { id: "box16", letters: ["13", "14"] },
                                    { id: "box17", letters: ["15", "16"] },
                                    { id: "box18", letters: ["17", "18"] },
                                    { id: "box19", letters: ["19", "20"] },
                                ].map(({ id, letters }) => (
                                    <AbBox
                                        key={id}
                                        id={id}
                                        letter1={letters[0]}
                                        letter2={letters[1]}
                                        selectedLetterId={selectedLetterId}
                                        highlightedLetters={highlightedLetters}
                                        onClick={handleAbBoxClick}
                                        resetState={resetState}
                                    />
                                ))}
                            </div>
                            <div className="corredorE prateleira8 absolute flex space-x-1 rotate-90">
                                {[
                                    { id: "box42", letters: ["01", "02"] },
                                    { id: "box43", letters: ["03", "04"] },
                                    { id: "box44", letters: ["05", "06"] },
                                ].map(({ id, letters }) => (
                                    <AbBox
                                        key={id}
                                        id={id}
                                        letter1={letters[0]}
                                        letter2={letters[1]}
                                        selectedLetterId={selectedLetterId}
                                        highlightedLetters={highlightedLetters}
                                        onClick={handleAbBoxClick}
                                        resetState={resetState}
                                    />
                                ))}
                            </div>
                            <div className="corredorC prateleira6 flex space-x-1 mt-2 ml-20">
                                {[
                                    { id: "box24", letters: ["09", "10"] },
                                    { id: "box25", letters: ["11", "12"] },
                                    { id: "box26", letters: ["13", "14"] },
                                    { id: "box27", letters: ["15", "16"] },
                                    { id: "box28", letters: ["17", "18"] },
                                    { id: "box29", letters: ["19", "20"] },
                                ].map(({ id, letters }) => (
                                    <AbBox
                                        key={id}
                                        id={id}
                                        letter1={letters[0]}
                                        letter2={letters[1]}
                                        selectedLetterId={selectedLetterId}
                                        highlightedLetters={highlightedLetters}
                                        onClick={handleAbBoxClick}
                                        resetState={resetState}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        {visiblePalletBox &&
                            <PalletBox
                                palletId={selectedLetterId}
                                className="z-50"
                                values={inputValues[selectedLetterId] || Array(27).fill('')}
                                onInputChange={(index, value) => handleInputChange(index, value)}
                                onClose={handlePalletBoxClose}
                                isVisible={!!visiblePalletBox}
                                descricao={searchValue}
                                searchResults={searchResults}
                                handlePasteInput={handlePasteInput}
                                togglePieceTableVisibility={togglePieceTableVisibility}
                                updateStockPercentage={() => updateStockPercentage(caixasValues)}
                                caixasValues={caixasValues[selectedLetterId] || Array(27).fill('')}
                                saldoValues={saldoValues[selectedLetterId] || Array(27).fill('')}
                                onCaixasInputChange={(index, value) => handleCaixasInputChange(index, value)}
                                onSaldoInputChange={(index, value) => handleSaldoInputChange(index, value)}
                                selectedColuna={selectedLetterId.split('-')[1] || ''}
                                corredor={getCorredorFromBoxId(selectedBoxId)}
                            />
                        }
                    </div>
                </div>
            </div>
            {!shouldHideBoxNumbersDiv && (
                <div className="boxNumbersDiv flex justify-center">
                    <div className="absolute font-light text-stam-border flex p1">
                        <p>1</p><p>2</p><p>3</p>
                    </div>
                    <div className="absolute font-light text-stam-border flex p2">
                        <p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p>
                    </div>
                    <div className="absolute font-light text-stam-border flex p3">
                        <p>4</p><p>3</p><p>2</p><p>1</p>
                    </div>
                    <div className="absolute font-light text-stam-border flex p4">
                        <p>1</p><p className="ml-1">2</p><p>3</p><p>4</p><p>5</p><p>6</p>
                    </div>
                    <div className="absolute font-light text-stam-border flex p5">
                        <p>1</p><p>2</p><p>3</p><p>4</p>
                    </div>
                    <div className="absolute font-light text-stam-border flex p6">
                        <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p>
                    </div>
                    <div className="absolute font-light text-stam-border flex p7">
                        <p>1</p>
                        <p className="p7n2">2</p>
                        <p className="p7n3">3</p>
                        <p className="p7n4">4</p>
                        <p className="p7n5">5</p>
                        <p className="p7n6">6</p>
                        <p className="p7n7">7</p>
                        <p className="p7n8">8</p>
                        <p className="p7n9">9</p>
                        <p className="p7n10">10</p>
                        <p className="p7n11">11</p>
                        <p className="p7n12">12</p>
                    </div>
                    <div className="absolute font-light text-stam-border block p8">
                        <p>1</p><p>2</p><p>3</p>
                    </div>
                    <div>
                        <div className="absolute rounded-3xl font-regular text-4xl text-stam-bg-4">
                            <p className="prateleira1 absolute">A</p>
                            <p className="prateleira3 absolute">B</p>
                            <p className="prateleira5 absolute">C</p>
                            <p className="prateleiraSete absolute">D</p>
                            <p className="prateleiraOito absolute">E</p>
                            <p className="prateleirax absolute">X</p>
                            <p className="prateleiray absolute">Y</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex justify-center">
                <div className="bg-estoque-bg estoqueBg absolute border border-gray-700 rounded-3xl">
                    <div className="p-8 flex items-center space-x-1.5">
                        <span className="material-symbols-outlined SuprimentosBoxIcon text-white">
                            package_2
                        </span>
                        <p className="text-white font-thin text-lg">Estoque Estamparia</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Estoque;