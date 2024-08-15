import ListaComponentes from "../../componentes/ListaComponentes";
import Navbar from "../../componentes/Navbar";
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

function Estoque() {
    const [visiblePalletBox, setVisiblePalletBox] = useState(null);
    const [selectedLetterId, setSelectedLetterId] = useState('');
    const [inputValues, setInputValues] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [highlightedLetters, setHighlightedLetters] = useState({});
    const [isListaVisible, setIsListaVisible] = useState(false);
    const [inputBorderClass, setInputBorderClass] = useState('border-stam-border');
    const [resetState, setResetState] = useState(false);
    const [matchingInputPositions, setMatchingInputPositions] = useState({});
    const [searchResults, setSearchResults] = useState({});
    const estampariaTableRef = useRef(null);
    const [isMoved, setIsMoved] = useState(false);
    const [isPasting, setIsPasting] = useState(false);

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
        const handleEnterKey = (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        };

        window.addEventListener('keydown', handleEnterKey);
        return () => window.removeEventListener('keydown', handleEnterKey);
    }, [searchValue]);

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

    const handleResetAllInputs = () => {
        const confirmReset = window.confirm("Você tem certeza de que deseja apagar todos os endereçamentos? Esta ação não pode ser desfeita.");

        if (confirmReset) {
            const resetValues = boxIds.reduce((acc, id) => {
                ['A', 'B', 'TRILHO'].forEach(letter => {
                    acc[`${id}-${letter}`] = Array(27).fill('');
                });
                return acc;
            }, {});

            setInputValues(resetValues);

            boxIds.forEach(id => {
                ['A', 'B', 'TRILHO'].forEach(letter => {
                    Array(27).fill('').forEach((_, i) => localStorage.removeItem(`${id}-${letter}-${i}`));
                });
            });

            const resetHighlighted = boxIds.reduce((acc, id) => {
                ['A', 'B', 'TRILHO'].forEach(letter => {
                    acc[`${id}-${letter}`] = false;
                });
                return acc;
            }, {});

            setHighlightedLetters(resetHighlighted);
        }
    };

    const toggleListaVisibility = () => setIsListaVisible(prev => !prev);

    const handleAbBoxClick = (id, letter) => {
        setVisiblePalletBox(id);
        setSelectedLetterId(`${id}-${letter}`);
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            const cleanedText = cleanText(text);
            setSearchValue(cleanedText.toUpperCase().trim());
        } catch (error) {
            console.error('Falha ao acessar a área de transferência:', error);
        }
    };

    const handleClearInput = () => {
        setSearchValue('');
        setInputBorderClass('border-stam-border');
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

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (isListaVisible) {
                    toggleListaVisibility();
                } else if (visiblePalletBox) {
                    handlePalletBoxClose();
                } else if (!isMoved) {
                    handleResetHighlightedBoxes();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isListaVisible, visiblePalletBox, isMoved]);

    const shouldHideBoxNumbersDiv = visiblePalletBox || isListaVisible;

    return (
        <div>
            <Navbar />
            <ListaComponentes visible={isListaVisible} toggleVisibility={toggleListaVisibility} ref={estampariaTableRef} />
            <div className="flex justify-center">
                <span class="material-symbols-outlined codeIcon absolute text-stam-border text-2xl z-40">
                    numbers
                </span>
                <span class="material-symbols-outlined searchIcon absolute text-stam-border text-2xl z-40">
                    search
                </span>
                {searchValue && (
                    <span
                        className="material-symbols-outlined z-40 clearDescription text-stam-bg-3 bg-stam-border absolute cursor-pointer border border-stam-border hover:bg-stam-vermelho hover:border-stam-vermelho transition-all duration-150 rounded-full"
                        onClick={handleClearInput}
                    >
                        close
                    </span>
                )}
                <button
                    className="absolute colarButton bg-stam-bg-3 border border-stam-border rounded-full px-3 text-sm text-stam-border hover:bg-stam-border hover:text-white font-regular z-30"
                    onClick={handlePaste}
                >
                    Colar
                </button>
                <div className="flex justify-center items-center">
                    <div
                        className={`modeDiv absolute bg-stam-bg-3 z-50 flex justify-center border border-stam-border rounded-full h-8 cursor-pointer hover:border-stam-orange
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
                {!isListaVisible && !visiblePalletBox && (
                    <div className="justify-center">
                        <span
                            className="material-symbols-outlined z-30 resetButton absolute text-stam-border border border-stam-border rounded-full hover:bg-stam-vermelho cursor-pointer hover:border-stam-vermelho hover:text-black"
                            onClick={handleResetAllInputs}
                        >
                            delete_forever
                        </span>
                    </div>
                )}
                <div className="flex justify-center space-x-3 bg-stam-bg-3 py-3 menuDiv rounded-full z-20 absolute">
                    <span
                        className="material-symbols-outlined menuIcon text-stam-bg-3 bg-stam-orange rounded-full hover:bg-stam-orange cursor-pointer"
                        onClick={handleMenuClick}
                    >
                        menu
                    </span>
                    <input
                        className="bg-stam-bg-3 border border-stam-border rounded-full font-light pl-8 caret-stam-orange outline-none hover:border-stam-orange w-36 text-white"
                        placeholder="Código"
                    ></input>
                    <input
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value.toUpperCase().trim())}
                        onPaste={handlePasteInput}
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
                <div className={`bg-stam-bg-3 estoqueDiv p-5 absolute border z-20 ${isMoved ? 'border-stam-orange' : 'border-stam-bg-3'}`}>
                    <div className="flex">
                        <div className="prateleira1 flex space-x-1 ml-10">
                            {['box1', 'box2', 'box3'].map(boxId => (
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
                        <div className="prateleira2 flex space-x-1 ml-40">
                            {['box4', 'box5', 'box6', 'box7', 'box8', 'box9'].map(boxId => (
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
                    <div className="prateleira9 flex space-x-1 -ml-9 mt-8">
                        {['box45'].map(boxId => (
                            <AbBox
                                props="-rotate-90"
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
                    <div className="flex">
                        <div className="block">
                            <div className="prateleira3 flex space-x-1 ml-10 mt-8 -mb-3">
                                {['box10', 'box11', 'box12', 'box13'].map(boxId => (
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
                            <div className="prateleira5 flex space-x-1 ml-10 mt-5">
                                {['box20', 'box21', 'box22', 'box23'].map(boxId => (
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
                            <div className="prateleira10 flex space-x-1 -ml-9 mt-8">
                                {['box46'].map(boxId => (
                                    <AbBox
                                        props="-rotate-90"
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
                            <div className="prateleira7 absolute flex space-x-1 mt-8 ml-10">
                                {['box30', 'box31', 'box32', 'box33', 'box34', 'box35', 'box36', 'box37', 'box38', 'box39', 'box40', 'box41'].map(boxId => (
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
                            <div className="prateleira4 flex space-x-1 ml-20 mt-8">
                                {['box14', 'box15', 'box16', 'box17', 'box18', 'box19'].map(boxId => (
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
                            <div className="prateleira8 absolute flex space-x-1 rotate-90">
                                {['box42', 'box43', 'box44'].map(boxId => (
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
                            <div className="prateleira6 flex space-x-1 mt-2 ml-20">
                                {['box24', 'box25', 'box26', 'box27', 'box28', 'box29'].map(boxId => (
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
                    </div>
                    <div>
                        {visiblePalletBox &&
                            <PalletBox
                                className="z-50"
                                values={inputValues[selectedLetterId] || Array(27).fill('')}
                                onInputChange={(index, value) => handleInputChange(index, value)}
                                onClose={handlePalletBoxClose}
                                isVisible={!!visiblePalletBox}
                                descricao={searchValue}
                                searchResults={searchResults}
                                handlePasteInput={handlePasteInput}
                            />
                        }
                    </div>
                </div>
            </div>
            {!shouldHideBoxNumbersDiv && (
                <div className="boxNumbersDiv flex justify-center">
                    <div className="absolute font-light text-stam-border flex p1 flex">
                        <p>1</p><p>2</p><p>3</p>
                    </div>
                    <div className="absolute font-light text-stam-border flex p2 flex">
                        <p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p>
                    </div>
                    <div className="absolute font-light text-stam-border flex p3 flex">
                        <p>4</p><p>3</p><p>2</p><p>1</p>
                    </div>
                    <div className="absolute font-light text-stam-border flex p4 flex">
                        <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p>
                    </div>
                    <div className="absolute font-light text-stam-border flex p5 flex">
                        <p>1</p><p>2</p><p>3</p><p>4</p>
                    </div>
                    <div className="absolute font-light text-stam-border flex p6 flex">
                        <p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p>
                    </div>
                    <div className="absolute font-light text-stam-border flex p7 flex">
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
                </div>
            )}
            <div className="flex justify-center">
                <div className="bg-estoque-bg estoqueBg absolute rounded-3xl"></div>
            </div>
        </div>
    );
}

export default Estoque;