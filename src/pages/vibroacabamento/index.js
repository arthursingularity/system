import Navbar from "../../componentes/Navbar"
import ListaComponentes from "../../componentes/ListaComponentes";
import PieceTable from "../../componentes/PieceTable";
import AbBox from "../../componentesTeste/AbBox";
import PalletBox from "../../componentesTeste/PalletBox";
import { useState, useEffect, useRef } from "react";
import PalletBox2 from "../../componentesTeste/PalletBox2";
import SearchSuggestionVB from "../../componentes/SearchsuggestionVB/SearchsuggestionVB";

const boxIds = [
    'box46', 'box47', 'box48', 'box49', 'box50', 'box51', 'box52', 'box53',
    'box54', 'box55', 'box56', 'box57', 'box58', 'box599', 'box60', 'box61', 'box62', 'box63', 'box64', 'box65', 'box66',
    'box67', 'box68', 'box69', 'box70', 'box71', 'box72', 'box73', 'box74', 'box75', 'box76', 'box77', 'box78',
    'box79', 'box80', 'box81', 'box82', 'box83', 'box84', 'box85', 'box86', 'box87', 'box88', 'box44', 'box45',
    'box100'
];

function VibroAcabamento() {
    const [visiblePalletBox, setVisiblePalletBox] = useState(null);
    const [selectedLetterId, setSelectedLetterId] = useState('');
    const [inputValues, setInputValues] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [highlightedLetters, setHighlightedLetters] = useState({});
    const [isListaVisible, setIsListaVisible] = useState(false);
    const [inputBorderClass, setInputBorderClass] = useState('border-stam-border');
    const [resetState, setResetState] = useState(false);
    const [matchingInputPositions, setMatchingInputPositions] = useState({});
    const [isSearchSuggestionVisible, setIsSearchSuggestionVisible] = useState(true);
    const [searchResults, setSearchResults] = useState({});
    const estampariaTableRef = useRef(null);
    const [isMoved, setIsMoved] = useState(false);
    const [isPasting, setIsPasting] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const [isPieceVisible, setIsPieceVisible] = useState(false)
    const inputDescriptionRef = useRef(null);
    const [inputPieceDescription, setInputPieceDescription] = useState('');

    useEffect(() => {
        document.title = "Vibroacabamento";
    }, []);

    useEffect(() => {
        const storedValues = boxIds.reduce((acc, id) => {
            ['A', 'B', 'TRILHO'].forEach(letter => {
                const values = Array(27).fill('').map((_, i) => localStorage.getItem(`${id}-${letter}-${i}`) || '');
                acc[`${id}-${letter}`] = values;
            });
            return acc;
        }, {});

        setInputValues(storedValues);
    }, []);

    useEffect(() => {
        const handleShiftDown = (e) => {
            if (e.key === 'Shift') {
                handleModeDivClick();
            }
        };

        window.addEventListener('keydown', handleShiftDown);
        return () => { window.removeEventListener('keydown', handleShiftDown); };
    }, [isMoved]);

    const handleModeDivClick = () => {
        setIsMoved(!isMoved);
    };

    const focusInputInEstampariaTable = () => {
        if (estampariaTableRef.current) {
            estampariaTableRef.current.focusInput();
        }
    };

    const handleMenuClick = () => {
        focusInputInEstampariaTable();
        toggleListaVisibility();
    };

    const toggleListaVisibility = () => setIsListaVisible(prev => !prev);

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

    const handleSearch = () => {
        const trimmedSearchValue = searchValue.trim();

        if (trimmedSearchValue === '') {
            setInputBorderClass('border-stam-vermelho');
            return;
        }

        const highlighted = Object.entries(inputValues).reduce((acc, [letterId, values]) => {
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
    }, []);

    return (
        <div>
            <Navbar />
            <ListaComponentes visible={isListaVisible} toggleVisibility={toggleListaVisibility} ref={estampariaTableRef} />
            <div className="flex justify-center">
                <span class="material-symbols-outlined searchIconVB absolute text-stam-border text-2xl z-40">
                    search
                </span>
                {searchValue && (
                    <span
                        className="material-symbols-outlined z-40 clearDescriptionVB absolute text-white cursor-pointer rounded-full hover:bg-gray-600 p-1.5"
                        onClick={handleClearInput}
                    >
                        close
                    </span>
                )}
                <div className="flex justify-center items-center">
                    <div
                        className={`modeDiv absolute bg-stam-bg-3 z-30 flex justify-center border border-stam-border rounded-full h-8 cursor-pointer hover:border-stam-orange
                        ${isMoved ? 'border-stam-orange' : ''}`}
                        onClick={handleModeDivClick}>
                        <span
                            className={`material-symbols-outlined z-30 absolute left-0 filtrarNecessidadesIcon text-stam-bg-3 bg-stam-border rounded-full 
                            ${isMoved ? 'moved bg-stam-orange' : ''}`}
                        >
                            quick_reference_all
                        </span>
                    </div>
                </div>
                {searchValue && isSearchSuggestionVisible && <SearchSuggestionVB searchValue={searchValue} onSuggestionClick={handleSuggestionClick} />}
                <div className="menuDivVB flex justify-center space-x-2.5 bg-stam-bg-3 py-3 rounded-full z-20 absolute">
                    <span
                        className="material-symbols-outlined menuIconVB text-stam-bg-3 bg-stam-orange rounded-full hover:bg-stam-orange cursor-pointer"
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
                <div className={`bg-stam-bg-3 estoqueDivVB p-5 absolute border z-20 ${isMoved ? 'border-stam-orange' : 'border-stam-bg-3'}`}>
                    <div className="flex">
                        <div className="prateleira1VB flex space-x-1 absolute top-0">
                            {['box67', 'box68','box69'].map(boxId => (
                                <AbBox
                                    key={boxId}
                                    id={boxId}
                                    letter1="A"
                                    letter2="B"
                                    selectedLetterId={selectedLetterId}
                                    highlightedLetters={highlightedLetters}
                                    onClick={handleAbBoxClick}
                                    resetState={resetState}
                                />
                            ))}
                        </div>
                        <div className="prateleira1V flex space-x-1">
                            {['box47', 'box48'].map(boxId => (
                                <AbBox
                                    key={boxId}
                                    id={boxId}
                                    letter1="A"
                                    letter2="B"
                                    selectedLetterId={selectedLetterId}
                                    highlightedLetters={highlightedLetters}
                                    onClick={handleAbBoxClick}
                                    resetState={resetState}
                                />
                            ))}
                        </div>
                        <div className="prateleira2V flex space-x-1">
                            {['box49', 'box50', 'box51', 'box52', 'box53'].map(boxId => (
                                <AbBox
                                    key={boxId}
                                    id={boxId}
                                    letter1="A"
                                    letter2="B"
                                    selectedLetterId={selectedLetterId}
                                    highlightedLetters={highlightedLetters}
                                    onClick={handleAbBoxClick}
                                    resetState={resetState}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="prateleira7VB absolute flex space-x-1 -rotate-90">
                                {['box70', 'box71', 'box72'].map(boxId => (
                                    <AbBox
                                        key={boxId}
                                        id={boxId}
                                        letter1="A"
                                        letter2="B"
                                        selectedLetterId={selectedLetterId}
                                        highlightedLetters={highlightedLetters}
                                        onClick={handleAbBoxClick}
                                        resetState={resetState}
                                    />
                                ))}
                            </div>
                    <div className="prateleira9 flex space-x-1 absolute -right-4 mt-8">
                        {['box100'].map(boxId => (
                            <AbBox
                                props="rotate-90"
                                letterVisibility="hidden"
                                key={boxId}
                                id={boxId}
                                letter1="TRILHO"
                                selectedLetterId={selectedLetterId}
                                highlightedLetters={highlightedLetters}
                                onClick={handleAbBoxClick}
                                resetState={resetState}
                            />
                        ))}
                    </div>
                    <div className="block">
                        <div className="prateleira5VB flex space-x-1 absolute">
                            {['box66'].map(boxId => (
                                <AbBox
                                    key={boxId}
                                    id={boxId}
                                    letter1="A"
                                    letterVisibility="hidden"
                                    selectedLetterId={selectedLetterId}
                                    highlightedLetters={highlightedLetters}
                                    onClick={handleAbBoxClick}
                                    resetState={resetState}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex">
                        <div className="block">
                            <div className="prateleira4VB flex space-x-1 absolute">
                                {['box59', 'box60', 'box61', 'box62', 'box63', 'box64', 'box65'].map(boxId => (
                                    <AbBox
                                        key={boxId}
                                        id={boxId}
                                        letter1="B"
                                        letter2="A"
                                        selectedLetterId={selectedLetterId}
                                        highlightedLetters={highlightedLetters}
                                        onClick={handleAbBoxClick}
                                        resetState={resetState}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="block">
                            <div className="prateleira3VB flex space-x-1 mt-28">
                                {['box54', 'box55', 'box56', 'box57', 'box58'].map(boxId => (
                                    <AbBox
                                        key={boxId}
                                        id={boxId}
                                        letter1="B"
                                        letter2="A"
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
                            <PalletBox2
                                className="z-50"
                                values={inputValues[selectedLetterId] || Array(27).fill('')}
                                onInputChange={(index, value) => handleInputChange(index, value)}
                                onClose={handlePalletBoxClose}
                                isVisible={!!visiblePalletBox}
                                descricao={searchValue}
                                searchResults={searchResults}
                                handlePasteInput={handlePasteInput}
                                togglePieceTableVisibility={togglePieceTableVisibility}
                            />
                        }
                    </div>
                </div>
            </div>
            {!shouldHideBoxNumbersDiv && (
                <div className="boxNumbersDiv flex justify-center relative">
                    <div className="p1VBNumbers absolute font-light text-stam-border flex p2">
                        <p>1</p><p>2</p><p>3</p>
                    </div>
                    <div className="p7VBNumbers absolute font-light text-stam-border space-y-16">
                        <p>3</p><p>2</p><p>1</p>
                    </div>
                    <div className="absolute font-light text-stam-border flex p1 p1BoxNumbers">
                        <p>1</p><p>2</p>
                    </div>
                    <div className="absolute font-light text-stam-border flex p2">
                        <p className="ml-24">1</p><p>2</p><p>3</p><p>4</p><p>5</p>
                    </div>
                    <div className="prateleira4vbnumbers3 absolute font-light text-stam-border flex p4">
                        <p className="absolute p5BoxNumber">6</p>
                        <p>5</p><p>4</p><p>3</p><p>2</p><p>1</p>
                    </div>
                    <div className="prateleira4vbnumbers2 absolute font-light text-stam-border flex p3">
                        <p>7</p><p>6</p><p>5</p><p>4</p><p>3</p><p>2</p><p>1</p>
                    </div>
                    <div>
                        <div className="absolute rounded-3xl font-regular text-3xl text-stam-bg-4">
                            <p className="absolute extra z-30">EXTRA</p>
                            <p className="prateleira1 absolute left-0">1</p>
                            <p className="prateleira2 absolute left-14">2</p>
                            <p className="prateleira3vbnumbers2 absolute">3</p>
                            <p className="prateleira4vbnumbers absolute">4</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex justify-center">
                <div className="bg-estoque-bg estoqueBgVB absolute">
                    <div className="p-8 flex items-center space-x-2">
                        <span className="material-symbols-outlined SuprimentosBoxIcon text-white">
                            vibration
                        </span>
                        <p className="text-white font-thin text-lg">Vibroacabamento</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VibroAcabamento